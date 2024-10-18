use axum::http::header;
use axum::response::{IntoResponse, Response};
use axum::Json;
use axum_extra::headers::{ContentType, ETag, HeaderMapExt};
use bytes::Bytes;
use reqwest::StatusCode;
use serde_json::json;

const APPLICATION_JSON_MEDIA_TYPE: &str = "application/json";

pub(crate) enum CachedResponse<T>
where
    T: IntoResponse,
{
    Fresh(T),
    NotModified,
}

impl<T> IntoResponse for CachedResponse<T>
where
    T: IntoResponse,
{
    fn into_response(self) -> Response {
        match self {
            CachedResponse::Fresh(response) => response.into_response(),
            CachedResponse::NotModified => (StatusCode::NOT_MODIFIED, "").into_response(),
        }
    }
}

/// Content of proxied response from HowLongToBeat
#[derive(Debug, Clone)]
pub(crate) struct HltbProxiedResponse {
    /// Content of the response from HLTB
    pub content: Bytes,
    pub etag: ETag,
}

impl IntoResponse for HltbProxiedResponse {
    fn into_response(self) -> Response {
        let mut headers = header::HeaderMap::new();
        headers.typed_insert(self.etag);
        headers.typed_insert(ContentType::json());

        (headers, self.content).into_response()
    }
}

/// Error type for the REST layer
#[derive(Debug, Clone)]
pub(crate) enum AppError {
    /// Generic type error
    Unknown(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        match self {
            AppError::Unknown(msg) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": msg })),
            )
                .into_response(),
        }
    }
}

/// Conversion from `color_eyre::eyre::Error` to `AppError` to support the `?` operator
impl From<color_eyre::eyre::Error> for AppError {
    fn from(e: color_eyre::eyre::Error) -> Self {
        AppError::Unknown(e.to_string())
    }
}
