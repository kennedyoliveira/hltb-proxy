# How long to beat API Proxy

A simple proxy to How Long to Beat API that supports in memory caching and CORS.

The HLTB api seems to require a key to perform the search, and this key keeps rotating
this proxy will try to automatically find the correct key and use it.

## Usage

You can download one of the binaries from the release page or build it yourself,
or use the docker image.

Example:

```bash
docker container run -p 8080:8080 kennedyoliveira/hltb-proxy
```

## Endpoints

Currently supported endpoints

### /v1/search

This endpoint will search for a game, it supports a `POST` and `GET` version, the response is the same exactly response
as the HLTB API, it will just be cached instead of always querying the service and support CORS (Cross-Origin Resource
Sharing).

#### GET

The get version is a simplified version with the query parameters:

- `q`: The query to search for, ex: `chrono trigger`
- `page`: The page number to fetch starting from `1`

This can be used even from the browser.

#### POST

This version support the same parameters as the actual search API from How Long to Beat,
you can send the json payload with all the options:

```json
{
  "searchType": "games",
  "searchTerms": [
    "final",
    "fantasy",
    "vii"
  ],
  "searchPage": 1,
  "size": 20,
  "searchOptions": {
    "games": {
      "userId": 0,
      "platform": "",
      "sortCategory": "popular",
      "rangeCategory": "main",
      "rangeTime": {
        "min": null,
        "max": null
      },
      "gameplay": {
        "perspective": "",
        "flow": "",
        "genre": ""
      },
      "rangeYear": {
        "min": "",
        "max": ""
      },
      "modifier": ""
    },
    "users": {
      "sortCategory": "postcount"
    },
    "lists": {
      "sortCategory": "follows"
    },
    "filter": "",
    "sort": 0,
    "randomizer": 0
  },
  "useCache": true
}
```

Response sample for querying `Chrono Trigger`:

```json
{
  "color": "blue",
  "title": "",
  "category": "games",
  "count": 3,
  "pageCurrent": 1,
  "pageTotal": 1,
  "pageSize": 20,
  "data": [
    {
      "game_id": 1705,
      "game_name": "Chrono Trigger",
      "game_name_date": 0,
      "game_alias": "Chrono Trigger iOS, Chrono Trigger DS, Ключ Времени",
      "game_type": "game",
      "game_image": "Chrono_Trigger.jpg",
      "comp_lvl_combine": 0,
      "comp_lvl_sp": 1,
      "comp_lvl_co": 0,
      "comp_lvl_mp": 0,
      "comp_main": 83342,
      "comp_plus": 95391,
      "comp_100": 150858,
      "comp_all": 94723,
      "comp_main_count": 657,
      "comp_plus_count": 1248,
      "comp_100_count": 231,
      "comp_all_count": 2136,
      "invested_co": 55550,
      "invested_mp": 0,
      "invested_co_count": 2,
      "invested_mp_count": 0,
      "count_comp": 4908,
      "count_speedrun": 4,
      "count_backlog": 7198,
      "count_review": 1964,
      "review_score": 91,
      "count_playing": 90,
      "count_retired": 314,
      "profile_popular": 590,
      "release_world": 1995
    },
    {
      "game_id": 21650,
      "game_name": "Chrono Trigger: Crimson Echoes",
      "game_name_date": 0,
      "game_alias": "",
      "game_type": "hack",
      "game_image": "ChronoTriggerCrimsonEchoes.png",
      "comp_lvl_combine": 0,
      "comp_lvl_sp": 1,
      "comp_lvl_co": 0,
      "comp_lvl_mp": 0,
      "comp_main": 79200,
      "comp_plus": 107820,
      "comp_100": 0,
      "comp_all": 88740,
      "comp_main_count": 1,
      "comp_plus_count": 2,
      "comp_100_count": 0,
      "comp_all_count": 3,
      "invested_co": 0,
      "invested_mp": 0,
      "invested_co_count": 0,
      "invested_mp_count": 0,
      "count_comp": 7,
      "count_speedrun": 0,
      "count_backlog": 41,
      "count_review": 4,
      "review_score": 75,
      "count_playing": 0,
      "count_retired": 2,
      "profile_popular": 8,
      "release_world": 2009
    },
    {
      "game_id": 73888,
      "game_name": "Chrono Trigger: Prophet's Guile",
      "game_name_date": 0,
      "game_alias": "",
      "game_type": "hack",
      "game_image": "73888_Chrono_Trigger_Prophets_Guile.jpg",
      "comp_lvl_combine": 0,
      "comp_lvl_sp": 1,
      "comp_lvl_co": 0,
      "comp_lvl_mp": 0,
      "comp_main": 6300,
      "comp_plus": 6720,
      "comp_100": 0,
      "comp_all": 6580,
      "comp_main_count": 2,
      "comp_plus_count": 1,
      "comp_100_count": 0,
      "comp_all_count": 3,
      "invested_co": 0,
      "invested_mp": 0,
      "invested_co_count": 0,
      "invested_mp_count": 0,
      "count_comp": 6,
      "count_speedrun": 0,
      "count_backlog": 4,
      "count_review": 2,
      "review_score": 55,
      "count_playing": 0,
      "count_retired": 0,
      "profile_popular": 0,
      "release_world": 2007
    }
  ],
  "userData": [],
  "displayModifier": null
}
```

### GET /v1/search_key

Return the current key being used to perform the search.