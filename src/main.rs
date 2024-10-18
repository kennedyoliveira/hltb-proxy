use crate::hltb::{HltbClient, HowLongToBeat};
use axum::http::Method;
use axum::Router;
use axum_otel_metrics::HttpMetricsLayerBuilder;
use bytes::Bytes;
use clap::Parser;
use dotenvy::dotenv;
use moka::future::Cache;
use serde::Deserialize;
use std::time::Duration;
use tokio::net::TcpListener;
use tower_http::compression::CompressionLayer;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::{DefaultMakeSpan, DefaultOnRequest, DefaultOnResponse, TraceLayer};
use tracing::level_filters::LevelFilter;
use tracing::{debug, info, Level};
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;
use tracing_subscriber::{EnvFilter, Registry};

pub(crate) mod hltb;
pub(crate) mod http;
pub(crate) mod rest;

#[derive(Parser, Debug)]
struct CacheArgs {
    /// Maximum allowed entries in the cache
    #[clap(long, default_value = "10000", env = "HLTB_PROXY_CACHE_MAX_SIZE")]
    cache_max_size: u64,
    /// Time to live for cache entries in seconds, entries will be evicted after this time
    #[clap(long, default_value = "3600", env = "HLTB_PROXY_CACHE_TTL")]
    cache_ttl: u64,
}

#[derive(Parser, Debug)]
#[clap(version, about)]
struct Args {
    /// Host that will be used to bind the server
    #[arg(long, default_value = "0.0.0.0", env = "HLTB_PROXY_HOST")]
    host: String,
    /// Port that will be used to bind the server
    #[arg(long, default_value = "8080", env = "HLTB_PROXY_PORT", value_parser = clap::value_parser!(u16).range(1..)
    )]
    port: u16,
    /// Enable human-readable logs with colorful output
    #[arg(long, default_value = "false", env = "HLTB_PROXY_HUMAN_READABLE_LOG")]
    human_readable_log: bool,
    #[command(flatten)]
    cache: CacheArgs,
    /// Enable compression for responses, should be disabled if a reverse proxy is used
    #[arg(long, default_value = "false", env = "HLTB_PROXY_ENABLE_COMPRESSION")]
    enable_compression: bool,
}

#[derive(Debug, Clone)]
pub(crate) struct AppState {
    hltb: HowLongToBeat,
}

#[derive(Debug, Clone, Deserialize)]
struct ReplaceKeyQueryArgs {
    key: String,
}

#[tokio::main]
async fn main() -> color_eyre::Result<()> {
    color_eyre::install().ok();
    dotenv().ok();

    let args = Args::parse();

    let (async_console, _console_guard) = tracing_appender::non_blocking(std::io::stdout());

    let console = if args.human_readable_log {
        Some(
            tracing_subscriber::fmt::layer()
                .compact()
                .with_writer(async_console.clone())
                .with_thread_names(true)
                .with_thread_ids(true),
        )
    } else {
        None
    };

    let console_logfmt = if !args.human_readable_log {
        Some(
            tracing_logfmt::builder()
                .with_timestamp(true)
                .with_level(true)
                .with_target(true)
                .with_location(false)
                .with_module_path(false)
                .with_span_name(true)
                .with_span_path(false)
                .layer()
                .with_writer(async_console),
        )
    } else {
        None
    };

    let default_log_filter = EnvFilter::builder()
        .with_default_directive(LevelFilter::INFO.into())
        .from_env_lossy()
        .add_directive("hyper=off".parse()?)
        .add_directive("h2=off".parse()?)
        .add_directive("selectors=error".parse()?)
        .add_directive("html5ever=error".parse()?)
        .add_directive("reqwest=error".parse()?);

    Registry::default()
        .with(console)
        .with(console_logfmt)
        .with(default_log_filter)
        .init();

    let metrics = HttpMetricsLayerBuilder::new()
        .with_registry(prometheus::default_registry().to_owned())
        .build();

    let cache: Cache<String, Bytes> = Cache::builder()
        .max_capacity(args.cache.cache_max_size)
        .time_to_live(Duration::from_secs(args.cache.cache_ttl)) // 1 hour
        .build();

    let hltb = HowLongToBeat::new(HltbClient::default(), cache);

    let app_state = AppState { hltb };

    let mut router = Router::new().merge(rest::routes()).merge(metrics.routes());

    if args.enable_compression {
        debug!("Enabling response compression");
        router = router.layer(
            CompressionLayer::new()
                .gzip(true)
                .br(true)
                .deflate(true)
                .zstd(true),
        );
    }

    let app = router
        .layer(metrics)
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::new().level(Level::INFO))
                .on_request(DefaultOnRequest::new().level(Level::INFO))
                .on_response(DefaultOnResponse::new().level(Level::INFO)),
        )
        .layer(
            CorsLayer::new()
                .allow_methods([Method::GET, Method::POST])
                .allow_origin(Any),
        )
        .with_state(app_state);

    let address = format!("{}:{}", args.host, args.port);
    debug!("Binding to: {}", address);
    let listener = TcpListener::bind(&address).await?;

    info!("Listening on: {}", address);
    axum::serve(listener, app)
        .with_graceful_shutdown(async {
            tokio::signal::ctrl_c().await.ok();
        })
        .await?;

    Ok(())
}
