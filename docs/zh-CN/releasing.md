# 包发布说明

## 维护者流程

1. 先执行 `pnpm changeset`
2. 合并 changeset PR
3. 由 release workflow 自动升级版本并发布到 npm

## 需要的 GitHub Secrets

- `NPM_TOKEN`：具备 publish 权限的 npm token

## 手动兜底发布

```bash
pnpm version-packages
pnpm release:publish
```
