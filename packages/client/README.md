# @miragari/client

Stateless client runtime for routing media generation requests across provider
plugins.

## Install

```bash
npm install @miragari/client
```

## What this package includes

- request normalization
- provider registry
- async polling and wait helpers
- image batch splitting
- profile and defaults support

## Typical use case

Use `@miragari/client` when you want the router runtime without the built-in
providers. If you want the batteries-included entrypoint, prefer
`@miragari/providers`.

## Example

```ts
import { MediaRouter } from "@miragari/client"
```

## Related docs

- Repository overview: <https://github.com/Zehight/mediaRouter>
- English docs: <https://github.com/Zehight/mediaRouter/blob/main/docs/en/getting-started.md>
- 中文文档: <https://github.com/Zehight/mediaRouter/blob/main/docs/zh-CN/getting-started.md>
