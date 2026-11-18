# dsh-superagent-backend

> Split from [`dsh-superagent-prototype`](https://github.com/yifengcode/dsh-superagent-prototype). Research prototype for reference only — see the legacy README for the product disclaimer.

DSH **plugin runtime** for dsh-superagent: GitHub/Feishu sources, Policy, Tickets, Executor sessions, and the management HTTP API. The sidebar panel lives in [`dsh-superagent-frontend`](https://github.com/yifengcode/dsh-superagent-frontend).

## Setup

Ask a coding agent to follow [SETUP.md](SETUP.md), or:

```bash
pnpm install
pnpm check   # typecheck + tests + plugin build
```

For a full DeepSeek Harness install that includes the panel, also build the frontend and place `lib/client.js` as described in [COUPLING.md](COUPLING.md).

## Documentation

Numbered docs in [`docs/`](docs/) — start with [000 Philosophy](docs/000-philosophy.md). Panel UX: see the frontend repo's `docs/005-panel.md`.

## License

[MIT](LICENSE)
