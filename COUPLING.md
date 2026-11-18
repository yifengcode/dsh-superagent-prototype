# Temporary coupling with the backend

This repository is the **management panel** half of the former `dsh-superagent-prototype` monorepo.

## Split

| Area | Repo |
| --- | --- |
| DSH plugin runtime, Engine, Sources, Executor | [`dsh-superagent-backend`](https://github.com/yifengcode/dsh-superagent-backend) *(create if missing)* |
| Web panel (`src/client`) | this repo |
| Legacy monorepo (unchanged source) | [`dsh-superagent-prototype`](https://github.com/yifengcode/dsh-superagent-prototype) |

## Shared contracts (keep in sync)

Thin copies under this repo must stay aligned with the backend originals:

- `src/app/api.ts` — route names + `TICKET_FILTERS` / `THREAD_FILTERS` (response types are intentionally loose here)
- `src/admission.ts`, `src/limits.ts`, `src/setup.ts`, `src/navigation.ts`
- `src/core/errors.ts`, `src/core/reasons.ts`, `src/core/stage.ts` (type only)
- `src/sources/host.ts` (`HEALTH_TEXT`), `src/sources/kind.ts` (panel field types)
- `src/infra/text.ts` (`fill`)

## Combined DSH install

The backend package historically exported `./client` from the same bundle. Until a published dependency wires them:

1. Build this repo (`pnpm build` → `lib/client.js`).
2. Point the backend install at that artifact (copy, `pnpm link`, or a future npm dependency on `dsh-superagent-frontend`).

Panel integration tests that need a live host remain in the backend / legacy monorepo; this repo keeps unit tests for panel modules.

## Typecheck

`pnpm check` runs unit tests and the client build. `pnpm typecheck` still expects the
authoritative backend view types behind `src/app/api.ts`; this package keeps a loose
Api contract so the panel can build alone. Restore strict typing by extracting a shared
`contracts` package (or re-vendoring backend view modules) before relying on `tsc`.
