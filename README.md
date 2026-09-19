# openkt-landing

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

Pushes to `main` fire a GitHub webhook that starts the AWS CodeBuild project
`openkt-landing-build` (us-east-1, account 724772068721). It runs
[`buildspec.yml`](buildspec.yml): lint, typecheck, `npm run build`, then
`wrangler pages deploy out --project-name=openkt-landing --branch=main`.
The Cloudflare credentials come from AWS Secrets Manager
(`openkt-staging/cloudflare_pages_token`, `openkt-staging/cloudflare_account_id`).

The Cloudflare Pages project `openkt-landing` serves `openkt.ai`. The
`/install.sh` and `/skill` paths are handled by a Cloudflare router Worker
outside this repo; Pages serves everything else.

## Content

Copy derives from `docs/product.md` in the OpenKT repository. Outbound URLs
(GitHub, the MCP endpoint, the Mac download) live in
[`src/lib/site.ts`](src/lib/site.ts). The paste-in setup prompt is
[`public/setup-prompt.md`](public/setup-prompt.md), a verbatim copy of the
OpenKT repository's `plugin/SETUP_PROMPT.md`; the page reads it at build time
and it is also served at `openkt.ai/setup-prompt.md`.

## Repo layout

```
src/
  app/                 Next.js App Router entry (layout, page, globals.css)
  components/          Reveal, CopyableCommand, CopyBlock
  lib/site.ts          Outbound URLs and the Mac install prompt
e2e/                   Playwright specs for the live landing
buildspec.yml          CodeBuild: lint, typecheck, build, wrangler pages deploy
next.config.ts         output: "export" — static HTML build
playwright.config.ts   Playwright runner config (see e2e/)
```

The landing holds no state and calls no API.

## History

This site was extracted from `masti-ai/openkt` at commit
[`0926eb1`](https://github.com/masti-ai/openkt/commit/0926eb1) (`ok-sx8g8`)
and split into its own repo at `ok-mufoi`. See `git log` for the original
authoring history.

## License

MIT — see [LICENSE](LICENSE).
