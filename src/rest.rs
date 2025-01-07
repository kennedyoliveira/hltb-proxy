use crate::hltb::client::SearchKey;
use crate::hltb::QueryOptions;
use crate::http::{AppError, CachedResponse, HltbProxiedResponse};
use crate::{AppState, ReplaceKeyQueryArgs};
use axum::extract::{Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::{get, post, put};
use axum::{Json, Router};
use axum_extra::headers::{ETag, IfNoneMatch};
use axum_extra::TypedHeader;
use blake2::digest::{Update, VariableOutput};
use blake2::Blake2bVar;
use serde::{Deserialize, Serialize};
use std::str::FromStr;
use tracing::warn;

#[derive(Debug, Clone, Deserialize)]
struct SearchQueryParams {
    q: String,
    page: Option<u32>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct HealthStatus {
    /// Application version
    version: String,
}

impl Default for HealthStatus {
    fn default() -> Self {
        Self {
            version: env!("CARGO_PKG_VERSION").to_string(),
        }
    }
}

pub(crate) fn routes() -> Router<AppState> {
    let router = Router::new()
        .route("/v1/search", post(post_search_handler))
        .route("/v1/search", get(get_search_handler))
        .route("/v1/search_key", get(get_key_handler))
        .route("/health", get(health_handler));

    // this is mostly for test purposes
    // should not be on release
    #[cfg(debug_assertions)]
    let router = router.route("/v1/search_key", put(replace_key_handler));

    router
}

async fn post_search_handler(
    State(app_state): State<AppState>,
    TypedHeader(if_none_match): TypedHeader<IfNoneMatch>,
    Json(query_options): Json<QueryOptions>,
) -> Result<CachedResponse<HltbProxiedResponse>, AppError> {
    let search_results = app_state.hltb.query(&query_options).await?;
    let etag = create_etag(&search_results)?;

    if if_none_match.precondition_passes(&etag) {
        Ok(CachedResponse::Fresh(HltbProxiedResponse {
            content: search_results,
            etag,
        }))
    } else {
        Ok(CachedResponse::NotModified)
    }
}

async fn get_search_handler(
    State(app_state): State<AppState>,
    TypedHeader(if_none_match): TypedHeader<IfNoneMatch>,
    Query(query_params): Query<SearchQueryParams>,
) -> Result<CachedResponse<HltbProxiedResponse>, AppError> {
    let query_options = QueryOptions::new(&query_params.q, query_params.page.unwrap_or(1) as usize);
    let search_results = app_state.hltb.query(&query_options).await?;
    let etag = create_etag(&search_results)?;

    if if_none_match.precondition_passes(&etag) {
        Ok(CachedResponse::Fresh(HltbProxiedResponse {
            content: search_results,
            etag,
        }))
    } else {
        Ok(CachedResponse::NotModified)
    }
}

async fn get_key_handler(State(state): State<AppState>) -> impl IntoResponse {
    match state.hltb.get_search_key().await {
        Ok(key) => key.key.into_response(),
        Err(e) => {
            warn!("Failed to get search key: {:?}", e);
            StatusCode::NOT_FOUND.into_response()
        }
    }
}

async fn replace_key_handler(
    State(state): State<AppState>,
    Query(args): Query<ReplaceKeyQueryArgs>,
) -> StatusCode {
    state
        .hltb
        .replace_search_key(SearchKey {
            key: args.key,
            api_path: args.api_path,
        })
        .await;
    StatusCode::NO_CONTENT
}

async fn health_handler() -> Json<HealthStatus> {
    Json(HealthStatus::default())
}

fn create_etag(content: &[u8]) -> color_eyre::Result<ETag> {
    let mut hasher = Blake2bVar::new(16).expect("16 is a valid output size");

    let mut buf = [0u8; 16];
    hasher.update(content);
    hasher.finalize_variable(&mut buf)?;

    let etag = hex::encode(buf);
    Ok(ETag::from_str(&format!("\"{}\"", etag))?)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::hltb::HowLongToBeat;
    use axum_extra::headers::Header;
    use axum_test::TestServer;
    use tracing::info;
    use tracing_test::traced_test;

    #[test]
    fn test_create_etag() {
        let content = b"test";
        let etag = create_etag(content).expect("etag should be created correctly");

        assert_eq!(
            etag,
            ETag::from_str("\"44a8995dd50b6657a037a7839304535b\"").unwrap()
        );
    }

    #[tokio::test]
    #[traced_test]
    async fn test_query_without_etag() -> color_eyre::Result<()> {
        let router = Router::new().merge(routes()).with_state(AppState {
            hltb: HowLongToBeat::default(),
        });

        let server = TestServer::builder()
            .http_transport()
            .build(router)
            .expect("test server should initialize correctly");

        let resp = server
            .reqwest_get("/v1/search?q=chrono%20trigger")
            .send()
            .await?;

        let status_code = resp.status();
        let headers = resp.headers().to_owned();
        let body = resp.text().await?;

        println!("Body: {}", body);

        assert_eq!(status_code, StatusCode::OK);
        assert_ne!(headers.get("etag"), None);

        Ok(())
    }

    #[tokio::test]
    #[traced_test]
    async fn test_get_query_with_etag() -> color_eyre::Result<()> {
        let router = Router::new().merge(routes()).with_state(AppState {
            hltb: HowLongToBeat::default(),
        });

        let server = TestServer::builder()
            .http_transport()
            .build(router)
            .expect("test server should initialize correctly");

        info!("Sending first request to get ETag");
        let first_resp = server
            .reqwest_get("/v1/search?q=chrono%20trigger")
            .send()
            .await?;

        let status_code = first_resp.status();
        let headers = first_resp.headers().to_owned();
        let body = first_resp.text().await?;

        println!("Body: {}", body);

        assert_eq!(status_code, StatusCode::OK);

        let etag = headers.get(ETag::name()).expect("ETag should be present");

        info!("Sending second request with ETag, should be Not Modified");
        let second_resp = server
            .reqwest_get("/v1/search?q=chrono%20trigger")
            .header("If-None-Match", etag)
            .send()
            .await?;

        let status_code = second_resp.status();
        assert_eq!(status_code, StatusCode::NOT_MODIFIED);

        Ok(())
    }

    #[tokio::test]
    #[traced_test]
    async fn test_post_query_with_etag() -> color_eyre::Result<()> {
        let router = Router::new().merge(routes()).with_state(AppState {
            hltb: HowLongToBeat::default(),
        });

        let server = TestServer::builder()
            .http_transport()
            .build(router)
            .expect("test server should initialize correctly");

        info!("Sending first request to get ETag");
        let query_options = QueryOptions::new("chrono trigger", 1);
        let first_resp = server
            .reqwest_post("/v1/search")
            .header("Content-Type", "application/json")
            .body(serde_json::to_string(&query_options)?)
            .send()
            .await?;

        let status_code = first_resp.status();
        let headers = first_resp.headers().to_owned();
        let body = first_resp.text().await?;

        println!("Body: {}", body);

        assert_eq!(status_code, StatusCode::OK);

        let etag = headers.get(ETag::name()).expect("ETag should be present");

        info!("Sending second request with ETag, should be Not Modified");
        let second_resp = server
            .reqwest_post("/v1/search")
            .body(serde_json::to_string(&query_options)?)
            .header("If-None-Match", etag)
            .header("Content-Type", "application/json")
            .send()
            .await?;

        let status_code = second_resp.status();
        assert_eq!(status_code, StatusCode::NOT_MODIFIED);

        Ok(())
    }
}
