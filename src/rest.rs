use crate::hltb::QueryOptions;
use crate::AppState;
use axum::extract::{Query, State};
use axum::http::header;
use axum::response::IntoResponse;
use axum::routing::{get, post};
use axum::{Json, Router};
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
struct SearchQueryParams {
    q: String,
    page: Option<u32>,
}

pub(crate) fn routes() -> Router<AppState> {
    Router::new()
        .route("/v1/search", post(post_search_handler))
        .route("/v1/search", get(get_search_handler))
}

async fn post_search_handler(State(app_state): State<AppState>,
                             Json(query_options): Json<QueryOptions>) -> impl IntoResponse {
    let search_results = app_state.hltb.query(&query_options).await.unwrap();

    (
        [
            (header::CONTENT_TYPE, "application/json"),
        ],
        search_results
    )
}

async fn get_search_handler(State(app_state): State<AppState>,
                            Query(query_params): Query<SearchQueryParams>) -> impl IntoResponse {
    let query_options = QueryOptions::new(&query_params.q, query_params.page.unwrap_or(1) as usize);
    let search_results = app_state.hltb.query(&query_options).await.unwrap();
    (
        [
            (header::CONTENT_TYPE, "application/json"),
        ],
        search_results
    )
}