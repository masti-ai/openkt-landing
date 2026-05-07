# openkt-landing

[![Deploy to Cloudflare Pages](https://github.com/masti-ai/openkt-landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/masti-ai/openkt-landing/actions/workflows/deploy.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Static marketing site for [openkt.ai](https://openkt.ai). Built with
Next.js (`output: "export"`) and Tailwind, deployed to Cloudflare Pages.

This repo is decoupled from [`masti-ai/openkt`](https://github.com/masti-ai/openkt)
(the dashboard + BFF monorepo) so:

- Marketing-team changes don't trigger application rebuilds.
- The landing surface stays up even when the dashboard is mid-deploy.
- Cloudflare Pages can connect directly to this repo for native git auto-deploys.
- Smaller dependency surface and faster CI.

## Local development

```bash
npm ci
npm run dev          # localhost:3100 — hot reload
npm run build        # writes static HTML+CSS+JS to ./out
npm run preview      # serve ./out locally on :3100
npm run lint         # eslint
npm run test:e2e     # playwright against a local build
```

The build output is a static bundle under `./out/`. There is no Node runtime
on the production edge — Cloudflare Pages serves the bundle as-is.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs
`npm run build` and uploads `./out` to Cloudflare Pages via Wrangler.

Required GitHub Actions secrets (set on this repo, not on `masti-ai/openkt`):

| Secret | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token with `Pages:Edit` permission for the openkt-landing project |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID hosting the openkt-landing Pages project |

The Cloudflare Pages project is named `openkt-landing` and is bound to the
apex zone via Cloudflare DNS — `openkt.ai` and `www.openkt.ai` resolve to
the Pages deployment. The `infra/cloudflare/openkt-router` Worker on
[`masti-ai/openkt`](https://github.com/masti-ai/openkt) handles
`/install.sh`, `/cli/*`, and a redirect rule for app-shaped paths
(`/dashboard`, `/signin`, …) to `app.openkt.ai`. Pages serves everything
else.

## Repo layout

```
src/
  app/                 Next.js App Router entry (layout, page, globals.css)
  components/          Reveal, InstallTabs, CopyableCommand, PilotContact
  lib/api.ts           Browser-side helper for the pilot-contact endpoint
e2e/                   Playwright specs for the live landing
.github/workflows/
  deploy.yml           Cloudflare Pages deploy on push to main
next.config.ts         output: "export" — static HTML build
playwright.config.ts   Playwright runner config (see e2e/)
```

The pilot-contact form posts to the BFF at `https://api.openkt.ai/v1/pilot-contact`;
the landing itself never holds state.

## History

This site was extracted from `masti-ai/openkt` at commit
[`0926eb1`](https://github.com/masti-ai/openkt/commit/0926eb1) (`ok-sx8g8`)
and split into its own repo at `ok-mufoi`. See `git log` for the original
authoring history.

## License

MIT — see [LICENSE](LICENSE).
