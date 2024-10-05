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

This endpoint will search for a game, it supports a `POST` and `GET` version.

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
### GET /v1/search_key

Return the current key being used to perform the search.