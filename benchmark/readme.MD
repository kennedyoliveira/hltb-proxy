# Benchmark

Run benchmarks with Grafana k6, `k6 run benchmark.js`.

There are 2 benchmarks available:

## smoke.js

This is a basic and quick benchmark that will test if the API is up and running and the script is correct.

## benchmark.js

This will hammer the API to find its limits.


# Results

As of 2024-10-11, using fly.io machine with 1 shared cpu and 256 mb of ram, the API can handle about 150 requests per second with a 95 percentile of 705 ms, with about 100 concurrent connections. 