pub(crate) mod client;
pub(crate) mod models;

use std::sync::LazyLock;
use async_recursion::async_recursion;
pub(crate) use client::HltbClient;
pub(crate) use models::*;

use blake2::Blake2bVar;
use blake2::digest::{Update, VariableOutput};
use color_eyre::eyre::bail;
use log::{info, warn};
use moka::future::Cache;
use prometheus::{register_counter_vec, CounterVec};
use reqwest::StatusCode;
use thiserror::Error;
use tracing::{debug, error, instrument};

static CACHE_HIT: LazyLock<CounterVec> = LazyLock::new(|| {
    debug!("Registering cache hit counter");
    register_counter_vec!("hltb_cache_hit", "Number of cache hits", &["cache", "type"]).unwrap()
});

#[derive(Debug, Error)]
pub(crate) enum Error {
    /// Failed to call the HowLongToBeat API
    #[error("Failed to call HowLongToBeat API, status code: {status_code}")]
    Api {
        status_code: StatusCode,
        body: String,
    },
    /// Generic error for reqwest
    #[error(transparent)]
    Reqwest(#[from] reqwest::Error),
    /// Failed to serialize request body
    #[error(transparent)]
    Serialization(#[from] serde_json::Error),
}

#[derive(Debug, Clone)]
pub(crate) struct HowLongToBeat {
    hltb_client: HltbClient,
    cache: Cache<String, String>,
}

const SEARCH_KEY_CACHE_KEY: &str = "search_key";

impl HowLongToBeat {
    pub(crate) fn new(hltb_client: HltbClient, cache: Cache<String, String>) -> Self {
        Self {
            hltb_client,
            cache,
        }
    }

    #[instrument(skip_all)]
    pub(crate) async fn replace_search_key(&self, new_key: &str) {
        self.cache.entry_by_ref(SEARCH_KEY_CACHE_KEY)
            .and_upsert_with(|value| async move {
                debug!("Replacing search key {:?} with {:?}", value, new_key);
                new_key.to_string()
            })
            .await;
    }

    #[instrument(skip_all)]
    pub(crate) async fn query(&self, query_options: &QueryOptions) -> color_eyre::Result<String> {
        self.query_with_depth(query_options, 0).await
    }

    #[instrument(skip_all)]
    #[async_recursion]
    async fn query_with_depth(&self, query_options: &QueryOptions, depth: usize) -> color_eyre::Result<String> {
        let search_key = self.get_search_key().await?;

        let cache_key = format!("{}-{}", "query", Self::create_cache_key(&serde_json::to_string(query_options)?)?);

        let cache_entry = self.cache.entry_by_ref(&cache_key).or_try_insert_with(async {
            self.hltb_client.query(&search_key, query_options).await
        }).await;

        match cache_entry {
            Ok(entry) => {
                if entry.is_fresh() {
                    CACHE_HIT.with_label_values(&["query", "miss"]).inc();
                } else {
                    CACHE_HIT.with_label_values(&["query", "hit"]).inc();
                }

                Ok(entry.into_value())
            }
            Err(e) => {
                match &*e {
                    Error::Api { status_code, body: _ } if status_code == &StatusCode::NOT_FOUND => {
                        if depth >= 2 {
                            bail!("Failed to call HLTB API status = NOT_FOUND, exausted retries")
                        }

                        warn!("Failed to call HLTB API status = NOT_FOUND, invalidating search key");
                        self.cache.invalidate(SEARCH_KEY_CACHE_KEY).await;
                        self.query_with_depth(query_options, depth + 1).await
                    }
                    _ => {
                        bail!("Failed to call HLTB Api: {}", e)
                    }
                }
            }
        }
    }

    async fn get_search_key(&self) -> color_eyre::Result<String> {
        let search_key = self.cache.optionally_get_with_by_ref(SEARCH_KEY_CACHE_KEY, async {
            info!("Searching for search_key");
            self.hltb_client.find_search_key().await.unwrap_or_else(|e| {
                error!("Failed to find search key: {:?}", e);
                None
            })
        }).await;

        let Some(search_key) = search_key else {
            bail!("Failed to find search key");
        };

        Ok(search_key)
    }

    fn create_cache_key(object: &str) -> color_eyre::Result<String> {
        let mut hasher = Blake2bVar::new(16).expect("16 is a valid output size");

        let mut buf = [0u8; 16];
        hasher.update(object.as_bytes());
        hasher.finalize_variable(&mut buf)?;
        Ok(hex::encode(buf))
    }
}