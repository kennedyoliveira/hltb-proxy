# Stop if any command fail
$ErrorActionPreference = "Stop"

# Generate the changelog and bump version
git-cliff --bump -o CHANGELOG.md

# Get the bumped version and remove the 'v' prefix
$version = git-cliff --bumped-version | ForEach-Object { $_ -replace '^v', '' }

# Display the new version
Write-Host "New version is $version"

# Update the Cargo.toml with the new version
cargo set-version $version

# Add files to git staging area
Write-Host "Adding changed files to git"
git add CHANGELOG.md Cargo.toml Cargo.lock

# Commit the changes
git commit -m "chore(release): prepare for $version"

# Tag the release
Write-Host "Tagging the release"
git tag -a "v$version" -m "v$version"

# Output message to push changes
Write-Host "Release prepared, run 'git push --follow-tags' to push the changes"