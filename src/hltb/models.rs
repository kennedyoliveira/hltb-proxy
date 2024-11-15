use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct QueryOptions {
    pub search_type: String,
    pub search_terms: Vec<String>,
    pub search_page: u32,
    /// Page size
    pub size: u32,
    pub use_cache: bool,
    pub search_options: SearchOptions,
}

impl QueryOptions {
    /// Basic search game by title using the default parameters
    /// like in the site when you query a game
    pub(crate) fn new(game_title: &str, page: usize) -> Self {
        let search_terms = game_title
            .trim()
            .split(" ")
            .map(|s| s.to_string())
            .collect();

        Self {
            search_type: String::from("games"),
            search_terms,
            search_page: page as u32,
            size: 20,
            use_cache: true,
            search_options: SearchOptions::default(),
        }
    }

    pub(crate) fn get_title(&self) -> String {
        self.search_terms.join(" ")
    }
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[derive(Default)]
pub(crate) struct SearchOptions {
    pub games: GamesOptions,
    pub users: UsersOptions,
    pub lists: ListsOptions,
    pub filter: String,
    pub sort: u32,
    pub randomizer: u32,
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct GamesOptions {
    pub user_id: u32,
    pub platform: String,
    pub sort_category: String,
    pub range_category: String,
    pub range_time: RangeTime,
    pub gameplay: Gameplay,
    pub range_year: RangeYear,
    pub modifier: String,
}

impl Default for GamesOptions {
    fn default() -> Self {
        Self {
            user_id: 0,
            platform: String::from(""),
            sort_category: String::from("popular"),
            range_category: String::from("main"),
            range_time: RangeTime::default(),
            gameplay: Gameplay::default(),
            range_year: RangeYear::default(),
            modifier: String::from(""),
        }
    }
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct UsersOptions {
    pub sort_category: String,
}

impl Default for UsersOptions {
    fn default() -> Self {
        Self {
            sort_category: String::from("postcount"),
        }
    }
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ListsOptions {
    sort_category: String,
}

impl Default for ListsOptions {
    fn default() -> Self {
        Self {
            sort_category: String::from("follows"),
        }
    }
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[derive(Default)]
pub(crate) struct RangeTime {
    min: Option<String>,
    max: Option<String>,
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[derive(Default)]
pub(crate) struct Gameplay {
    perspective: String,
    flow: String,
    genre: String,
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[derive(Default)]
pub(crate) struct RangeYear {
    min: String,
    max: String,
}

// Default from site as of 2024/10/03
