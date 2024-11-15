use crate::hltb::models::QueryOptions;
use crate::hltb::Error;
use bytes::Bytes;
use color_eyre::eyre::bail;
use log::{error, warn};
use prometheus::{register_histogram, Histogram};
use regex::Regex;
use scraper::{Html, Selector};
use std::fmt::{Display, Formatter};
use std::sync::LazyLock;
use tracing::{debug, info, instrument, trace};

pub(crate) const BASE_URL: &str = "https://howlongtobeat.com";
pub(crate) const USER_AGENT: &str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

#[derive(Debug, Clone, Eq, PartialEq)]
struct ScriptTag {
    src: Option<String>,
    file_name: Option<String>,
    id: Option<String>,
    type_: Option<String>,
    async_: bool,
}

impl Display for ScriptTag {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "<script ")?;

        if self.async_ {
            write!(f, "async ")?;
        }

        if let Some(type_) = &self.type_ {
            write!(f, "type=\"{}\" ", type_)?;
        }

        if let Some(id) = &self.id {
            write!(f, "id=\"{}\" ", id)?;
        }

        if let Some(src) = &self.src {
            write!(f, "src=\"{}\" ", src)?;
        }

        write!(f, "/>")
    }
}

impl ScriptTag {
    fn new(src: Option<String>, id: Option<String>, type_: Option<String>, async_: bool) -> Self {
        let file_name = src
            .as_deref()
            .and_then(|s| s.split("/").last().map(|s| s.to_owned()));
        Self {
            src,
            file_name,
            id,
            type_,
            async_,
        }
    }

    /// Check if the script tag source url is relative to the site
    /// i.e. it starts with a `/`
    fn is_src_relative(&self) -> bool {
        self.src
            .as_deref()
            .map(|s| s.starts_with("/"))
            .unwrap_or_default()
    }

    fn get_file_name(&self) -> Option<&str> {
        self.file_name.as_deref()
    }
}

/// Regex for extracting the api key in js script,
/// currently has the format `"/api/search/somekey"`
/// and this appears in the site script files as
/// `await fetch("/api/search/".concat("7b0f03b2").concat("54cc3099")`
static SEARCH_API_KEY_REGEX: LazyLock<Regex> = LazyLock::new(|| {
    debug!("Initializing search key regex");
    Regex::new(r#""/api/search/"(\.concat\("([^"]+)"\))+"#).expect("Regex should be valid")
});

/// Regex for extracting the parameters of the concat function from
/// found via `SEARCH_API_KEY_REGEX`, since there can be multiple
/// this will extract all of them
static API_KEY_PARTS_REGEX: LazyLock<Regex> = LazyLock::new(|| {
    debug!("Initializing search key parts regex");
    Regex::new(r#"\.concat\("([^"]+)"\)"#).expect("Regex should be valid")
});

static SEARCH_KEY_HISTOGRAM: LazyLock<Histogram> = LazyLock::new(|| {
    debug!("Registering search key histogram");
    register_histogram!(
        "hltb_search_key_fetch_duration",
        "Duration to fetch search key"
    )
    .expect("Histogram should be registered")
});

#[derive(Debug, Clone)]
pub(crate) struct HltbClient {
    http_client: reqwest::Client,
}

impl HltbClient {
    #[allow(dead_code)]
    pub(crate) fn new(http_client: reqwest::Client) -> Self {
        Self { http_client }
    }

    /// Query the HLTB API.
    /// - `search_key`: The search key to use to query the API, see [`Self::find_search_key`] to get it.
    /// - `query_options`: The options to use to query the API.
    #[instrument(skip(self, search_key, query_options))]
    pub(crate) async fn query(
        &self,
        search_key: &str,
        query_options: &QueryOptions,
    ) -> Result<Bytes, Error> {
        debug!(
            ?search_key,
            "Querying HLTB API with options: {:?}", query_options
        );

        let title = query_options.get_title();
        let referer = format!("{}/?q={}", BASE_URL, urlencoding::encode(&title));
        let url = format!("{}/api/search/{}", BASE_URL, search_key);
        let body = serde_json::to_string(query_options)?;

        debug!(
            ?url,
            ?referer,
            "Sending POST request to HLTB API at {}: {}",
            url,
            body
        );

        let resp = self
            .http_client
            .post(url)
            .header("Content-Type", "application/json")
            .header("Accept", "application/json")
            .header("Referer", referer)
            .header("User-Agent", USER_AGENT)
            .body(body)
            .send()
            .await?;

        let status_code = resp.status();
        let is_error = !status_code.is_success();

        if is_error {
            return Err(Error::Api {
                status_code,
                body: resp.text().await?,
            });
        }

        Ok(resp.bytes().await?)
    }

    /// HLTB uses a search key to make scrapping the API a bit more difficult,
    /// the key is also changed from time to time, this function will try to find
    /// the search key in the scripts of the page.
    #[instrument(skip(self))]
    pub(crate) async fn find_search_key(&self) -> Result<Option<String>, Error> {
        let _timer = SEARCH_KEY_HISTOGRAM.start_timer();

        info!("Finding search key");
        let index_page = self
            .http_client
            .get(BASE_URL)
            .header("User-Agent", USER_AGENT)
            .send()
            .await?
            .error_for_status()?
            .text()
            .await?;

        trace!("Loaded index page: {}", index_page);

        let mut scripts = Self::find_scripts(&index_page);

        // The search key is in some of the scripts
        // from observation it seems to be in the script that starts with "_app-somehash"
        // we will use it as a heuristic to find the search key
        // but if not found we will search all of the scripts eventually, just trying to minimize
        // the amount of unnecessary calls

        debug!("Found {} scripts: {:?}", scripts.len(), scripts);
        info!("Searching for search key in scripts");
        if let Some(idx) = scripts.iter().position(Self::is_app_script) {
            info!(
                "Found the script with name starting with '_app' at index {}",
                idx
            );
            let script = scripts.remove(idx);

            match self.search_key(&script).await {
                Ok(Some(search_key)) => {
                    info!("Found search key in script {}", script);
                    return Ok(Some(search_key));
                }
                Ok(None) => {
                    info!("Failed to find search key in script {}", script);
                }
                Err(e) => {
                    error!("Failed to search key in script {}: {}", script, e);
                }
            }
        }

        info!("Searching for search key in relative scripts");
        // first search in the non absolute urls, because the absolute ones
        // are likely third party stuff and won't have the search key
        let mut i = 0;
        while i < scripts.len() {
            if scripts[i].is_src_relative() {
                match self.search_key(&scripts[i]).await {
                    Ok(Some(search_key)) => {
                        info!("Found search key in script {}", scripts[i]);
                        return Ok(Some(search_key));
                    }
                    Ok(None) => {
                        info!("Search key not found in script {}", scripts[i]);
                    }
                    Err(e) => {
                        error!("Failed to search key in script {}: {}", scripts[i], e);
                    }
                }

                // remove already processed ones
                scripts.remove(i);
            }

            i += 1;
        }

        info!("Searching for search key in all scripts");
        for script in &scripts {
            match self.search_key(script).await {
                Ok(Some(search_key)) => {
                    info!("Found search key in script {}", script);
                    return Ok(Some(search_key));
                }
                Ok(None) => {
                    info!("Search key not found in script {}", script);
                }
                Err(e) => {
                    error!("Failed to search key in script {}: {}", script, e);
                }
            }
        }

        warn!("Failed to find search key in any script");

        Ok(None)
    }

    fn is_app_script(script: &ScriptTag) -> bool {
        match script.get_file_name() {
            Some(file_name) => file_name.to_lowercase().contains("_app"),
            None => false,
        }
    }

    #[instrument(skip(self, script_tag))]
    async fn search_key(&self, script_tag: &ScriptTag) -> color_eyre::Result<Option<String>> {
        let Some(script_url) = script_tag.src.as_deref() else {
            bail!("Script tag does not have a source URL");
        };

        let script_url = if script_tag.is_src_relative() {
            &format!("{}{}", BASE_URL, script_url)
        } else {
            script_url
        };

        info!("Fetching script content from {}", script_url);
        let script_content = self
            .http_client
            .get(script_url)
            .header("User-Agent", USER_AGENT)
            .send()
            .await?
            .error_for_status()?
            .text()
            .await?;

        Ok(Self::find_search_key_in_script(&script_content).map(|s| s.to_owned()))
    }

    fn find_search_key_in_script(script_content: &str) -> Option<String> {
        // The idea here is to match the whole call to the function, and then extract the parts
        SEARCH_API_KEY_REGEX
            .captures(script_content)
            .and_then(|function_chain| {
                // cap(0) is the whole function call, like "/api/search".concat("a1").concat("b2")
                function_chain.get(0).and_then(|m| {
                    API_KEY_PARTS_REGEX
                        .captures_iter(m.as_str())
                        .filter_map(|cap| cap.get(1).map(|m| m.as_str().to_owned()))
                        .reduce(|mut acc, s| {
                            acc.push_str(&s);
                            acc
                        })
                })
            })
    }

    fn find_scripts(html: &str) -> Vec<ScriptTag> {
        let doc = Html::parse_document(html);

        let javascript_selectors =
            Selector::parse("script").expect("static selector should not fail");
        doc.select(&javascript_selectors)
            .map(|script| {
                let src = script.value().attr("src").map(|s| s.to_owned());
                let id = script.value().attr("id").map(|s| s.to_owned());
                let type_ = script.value().attr("type").map(|s| s.to_owned());
                let async_ = script.value().attr("async").is_some();

                ScriptTag::new(src, id, type_, async_)
            })
            .collect()
    }
}

impl Default for HltbClient {
    fn default() -> Self {
        Self {
            http_client: reqwest::Client::builder()
                .gzip(true)
                .build()
                .expect("Default client should not fail to created"),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tracing_test::traced_test;

    #[tokio::test]
    #[traced_test]
    async fn test_find_search_key() {
        let client = HltbClient::default();
        let search_key = client.find_search_key().await.unwrap();

        println!("{:?}", search_key);
        assert!(search_key.is_some());

        info!("Testing if the search key is correct");

        let resp = client
            .query(&search_key.unwrap(), &QueryOptions::new("final fantasy", 1))
            .await
            .unwrap();
        println!("{}", String::from_utf8_lossy(&resp));
        // sometimes it simply replies as {}, so needs to be bigger than 2
        assert!(resp.len() > 2);
    }

    #[test]
    fn test_find_scripts() {
        let index_page_content = include_str!("../../resources/tests/index_page.html");
        let script_urls = HltbClient::find_scripts(index_page_content);

        for script_url in &script_urls {
            println!("{:?}", script_url);
        }

        assert_eq!(script_urls.len(), 13);
    }

    #[test]
    fn test_extract_search_key_from_script() {
        let script_content = include_str!("../../resources/tests/_app-hash.js");
        let search_key = HltbClient::find_search_key_in_script(script_content);

        println!("{:?}", search_key);

        assert_eq!(search_key, Some(String::from("5fe4b12e81a8fb4c")));
    }
}
