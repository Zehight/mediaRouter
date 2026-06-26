# Contributing

Thanks for considering a contribution.

## Development

```bash
pnpm install
pnpm test
pnpm -r build
```

## Changes

- Keep shared request shapes stable across providers.
- Put provider-specific switches in `providerOptions`.
- Add or update tests when behavior changes.
- Prefer small, reviewable pull requests.

## Release Flow

This repository uses Changesets.

```bash
pnpm changeset
pnpm version-packages
```

Package publishing is automated through GitHub Actions once the release pull request is merged.
