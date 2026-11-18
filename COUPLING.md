# Temporary coupling with the frontend

This repository is the **plugin runtime** half of the former `dsh-superagent-prototype` monorepo.

## Split

| Area | Repo |
| --- | --- |
| DSH plugin runtime, Engine, Sources, Executor | this repo |
| Web panel (`src/client`) | [`dsh-superagent-frontend`](https://github.com/yifengcode/dsh-superagent-frontend) *(create if missing)* |
| Legacy monorepo (unchanged source) | [`dsh-superagent-prototype`](https://github.com/yifengcode/dsh-superagent-prototype) |

## `./client` export

`package.json` still declares `exports["./client"]` → `lib/client.js` for DeepSeek Harness compatibility. This repo no longer builds that file. Until `dsh-superagent-frontend` is published and wired as a dependency:

```bash
# after building the frontend package
cp ../dsh-superagent-frontend/lib/client.js lib/client.js
# or: pnpm link ../dsh-superagent-frontend and re-export
```

The `dsh.client.inject` list remains here so a combined install keeps the same panel injects; long-term it should move to the frontend package metadata.

## Shared contracts (backend is source of truth)

Frontend vendors thin copies of:

- `src/app/api.ts` (filters + routes; frontend loosens response types)
- `src/admission.ts`, `src/limits.ts`, `src/setup.ts`, `src/navigation.ts`
- `src/core/errors.ts`, `src/core/reasons.ts`, `src/core/stage.ts`
- `src/sources/host.ts` (`HEALTH_TEXT`), `src/sources/kind.ts` (field types)
- `src/infra/text.ts` (`fill`)

Change those here first, then sync the frontend copies.
