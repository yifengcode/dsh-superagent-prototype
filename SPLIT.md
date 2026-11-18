# Repository split (frontend / backend)

This monorepo remains the **legacy source**. The code has been prepared as two history-preserving branches ready to become separate GitHub repositories under `yifengcode`:

| Half | Intended repo | Prepared branch on this remote | Contents |
| --- | --- | --- | --- |
| Frontend | https://github.com/yifengcode/dsh-superagent-frontend | `split/frontend` | DSH web panel (`src/client`), thin shared contracts, panel unit tests |
| Backend | https://github.com/yifengcode/dsh-superagent-backend | `split/backend` | Plugin runtime (Engine, Sources, Executor, management API), non-panel tests |

## Manual step required

The Cursor GitHub App token for this run **cannot create new repositories** (`createRepository` / `POST /user/repos` rejected). Someone with create access on `yifengcode` (erfeng code / yi feng) should run:

```bash
gh repo create yifengcode/dsh-superagent-frontend --public \
  --description "dsh-superagent management panel (DSH web client)"
gh repo create yifengcode/dsh-superagent-backend --public \
  --description "dsh-superagent DSH plugin runtime (Engine, Sources, Executor)"

# Grant the Cursor GitHub App access to both new repos, then push:
git fetch origin split/frontend split/backend
git push https://github.com/yifengcode/dsh-superagent-frontend 'refs/remotes/origin/split/frontend:refs/heads/main'
git push https://github.com/yifengcode/dsh-superagent-backend 'refs/remotes/origin/split/backend:refs/heads/main'
```

Do **not** force-push or delete this monorepo.

## Temporary coupling

See `COUPLING.md` on each split branch. Backend still declares `exports["./client"]` for Harness compatibility; `lib/client.js` is built in the frontend package until a published dependency wires them. Frontend keeps loose Api response types so it typechecks/builds without vendoring the full backend view graph.

## Verification (on each split branch)

- Frontend: `pnpm install && pnpm test && pnpm build` → `lib/client.js`
- Backend: `pnpm install && pnpm typecheck && pnpm test && pnpm build` (one pre-existing flaky Feishu health assertion may fail when run in isolation; same on this monorepo)
