use axum::http::header;
use axum::response::{IntoResponse, Response};
use axum::Json;
use bytes::Bytes;
use reqwest::StatusCode;
use serde_json::json;

const APPLICATION_JSON_MEDIA_TYPE: &str = "application/json";

/// Content of proxied response from HowLongToBeat
#[derive(Debug, Clone)]
pub(crate) struct HtlbProxiedResponse {
    /// Content of the response from HLTB
    pub content: Bytes,
}

impl IntoResponse for HtlbProxiedResponse {
    fn into_response(self) -> Response {
        (
            [(header::CONTENT_TYPE, APPLICATION_JSON_MEDIA_TYPE)],
            self.content,
        )
            .into_response()
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
