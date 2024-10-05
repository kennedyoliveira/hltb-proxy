use crate::hltb::QueryOptions;
use crate::{AppState, ReplaceKeyQueryArgs};
use axum::extract::{Query, State};
use axum::http::{header, StatusCode};
use axum::response::IntoResponse;
use axum::routing::{get, post, put};
use axum::{Json, Router};
use log::warn;
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
struct SearchQueryParams {
    q: String,
    page: Option<u32>,
}

pub(crate) fn routes() -> Router<AppState> {
    let router = Router::new()
        .route("/v1/search", post(post_search_handler))
        .route("/v1/search", get(get_search_handler))
        .route("/v1/search_key", get(get_key_handler));

    // this is mostly for test purposes
    // should not be on release
    #[cfg(debug_assertions)]
    let router = router.route("/v1/search_key", put(replace_key_handler));

    router
}

async fn post_search_handler(
    State(app_state): State<AppState>,
    Json(query_options): Json<QueryOptions>,
) -> impl IntoResponse {
    let search_results = app_state.hltb.query(&query_options).await.unwrap();

    ([(header::CONTENT_TYPE, "application/json")], search_results)
}

async fn get_search_handler(
    State(app_state): State<AppState>,
    Query(query_params): Query<SearchQueryParams>,
) -> impl IntoResponse {
    let query_options = QueryOptions::new(&query_params.q, query_params.page.unwrap_or(1) as usize);
    let search_results = app_state.hltb.query(&query_options).await.unwrap();
    ([(header::CONTENT_TYPE, "application/json")], search_results)
}

async fn get_key_handler(State(state): State<AppState>) -> impl IntoResponse {
    match state.hltb.get_search_key().await {
        Ok(key) => key.into_response(),
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
    state.hltb.replace_search_key(&args.key).await;
    StatusCode::NO_CONTENT
}
