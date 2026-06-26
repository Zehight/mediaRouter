# Releasing Packages

## Maintainer flow

1. Create a changeset with `pnpm changeset`
2. Merge the changeset pull request
3. Let the release workflow version packages and publish to npm

## Required GitHub secrets

- `NPM_TOKEN`: npm token with publish permission

## Manual fallback

```bash
pnpm version-packages
pnpm release:publish
```
