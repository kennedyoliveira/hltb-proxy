#!/usr/bin/env just --justfile

set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

[doc('Install utilities that are required for running the project tasks')]
install-prereqs:
    cargo install cargo-nextest --locked

[doc('Build a release version of the app')]
release:
    cargo build --release

[doc('Run Clippy linter')]
lint:
    cargo clippy

[doc('Fix linter issues')]
fix:
    cargo fix
    cargo fmt

[doc('Run tests')]
test:
    cargo nextest run

[doc('Run the app in development mode, can pass arguments')]
run *args:
    cargo run --bin hltb-proxy -- {{args}}

[doc('Build a docker image')]
docker-build:
    docker build -t kennedyoliveira/hltb-proxy .

[doc('Create a docker buildx instance, only required to run once if one not available')]
docker-buildx:
    docker buildx create --driver docker-container --use

[doc('Build a multiarch docker image')]
docker-build-multiarch:
    docker buildx build --platform linux/amd64,linux/arm64 -t kennedyoliveira/hltb-proxy .

prepare-release:
    git-cliff --bump -o CHANGELOG.md