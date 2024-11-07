#!/usr/bin/env just --justfile

# Just can be installed with `cargo install just --locked` command
# or `cargo binstall just`

set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

[private]
default:
    just --list --unsorted

# install the required dependencies to build/release the project
[private]
install-rust-prereqs:
    cargo binstall cargo-nextest cargo-edit git-cliff --locked --no-confirm

[windows]
[private]
install-prereqs-other:
    choco install openssl --yes
    Set-ExecutionPolicy Unrestricted -Scope Process; iex (iwr "https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.ps1").Content

[linux]
[private]
install-prereqs-other:
    sudo apt-get install -y libssl-dev openssl jq build-essential
    curl -L --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash

[macos]
[private]
install-prereqs-other:
    brew install openssl jq

[doc('Install utilities that are required for running the project tasks')]
install-prereqs: install-prereqs-other install-rust-prereqs

[group('lint')]
[doc('Run Clippy linter')]
lint:
    cargo clippy

[group('lint')]
[doc('Fix linter issues')]
fix:
    cargo fix
    cargo fmt

[doc('Build a release version of the app')]
build:
    cargo build --release

[doc('Run tests')]
test:
    cargo nextest run

[doc('Run the app in development mode, can pass arguments')]
run *args:
    cargo run --bin hltb-proxy -- {{args}}

[group('docker')]
[doc('Build a docker image')]
docker-build tag="latest":
    docker build -t kennedyoliveira/hltb-proxy:{{tag}} .

[group('docker')]
[doc('Create a docker buildx instance, only required to run once if one not available')]
docker-buildx:
    docker buildx create --driver docker-container --use

[group('docker')]
[doc('Build a multiarch docker image')]
docker-build-multiarch:
    docker buildx build --platform linux/amd64,linux/arm64 -t kennedyoliveira/hltb-proxy .

[group('release')]
[linux]
[doc('Generate changelog, update version, and tag repository')]
prepare-release:
    git-cliff --bump -o CHANGELOG.md
    mkdir -p target
    git-cliff --bumped-version | sed 's/^v//' > target/version
    echo "New version is $(cat target/version)"
    cargo set-version $(cat target/version)
    echo "Adding changed files to git"
    git add CHANGELOG.md Cargo.toml Cargo.lock
    git commit -m "chore(release): prepare for $(cat target/version)"
    echo "Tagging the release"
    git tag -a "v$(cat target/version)" -m "v$(cat target/version)"

    echo "Release prepared, run 'git push --follow-tags' to push the changes"

[group('release')]
[windows]
[doc('Generate changelog, update version, and tag repository')]
prepare-release:
    .\prepare-release.ps1

[group('release')]
[doc('Generate changelog for unreleased changes')]
changelog:
    git-cliff --bump --unreleased
