# dsh-superagent-frontend

> Split from [`dsh-superagent-prototype`](https://github.com/yifengcode/dsh-superagent-prototype). Research prototype for reference only — see the legacy README for the product disclaimer.

DSH **web management panel** (`src/client`) for [dsh-superagent](https://github.com/yifengcode/dsh-superagent-backend). It talks to the backend over the management HTTP API and renders the Superagent sidebar UI.

## Setup

```bash
pnpm install
pnpm check   # typecheck + unit tests + client build
```

`pnpm build` writes `lib/client.js` (DSH module-loader bundle).

## Docs

- [docs/005-panel.md](docs/005-panel.md) — panel behavior
- [COUPLING.md](COUPLING.md) — temporary shared contracts with the backend

## License

[MIT](LICENSE)
