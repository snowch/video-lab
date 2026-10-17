# Video Lab: From Frames to Finished Demos

Copyright © 2026 Christopher Snow.

An interactive course for software and data engineers making clearer demonstrations. This branch implements the introduction and **Module 0: What is a digital video?** Modules 1–9 are explicitly planned and not implemented.

Module 0 uses an original browser-app recording, genuine H.264/AAC MP4, recorded ffprobe evidence and extracted frames. The player, frame inspector, streams diagram, prediction, failure experiment and graded inspection challenge work without a remote service. The challenge has useful failed-test feedback, five progressive hints, retries, reset and locally saved work regraded on reload.

## Run and check

Node 24 and native FFmpeg/ffprobe are required for the full check. On a machine where browser system dependencies can be installed:

```sh
npm ci
npx playwright install --with-deps chromium firefox
npm run dev
npm run check
```

Open the URL Vite prints with `/video-lab/`. `npm run check` is exactly the command CI runs: formatting, source copyright, unedited platform copy, strict typecheck, model/schema/term/reference tests, required native media verification, production build and Playwright. `npm run build && npm run preview` serves the production bundle. Browser tests cover Chromium desktop/phone in light/dark plus desktop Firefox; WebKit/Safari are not yet a verified baseline.

See [media provenance and commands](docs/notes/module-0/media/README.md), [sources and licences](docs/sources.md), [module plan](docs/notes/module-0-plan.md), and [independent review records](docs/notes/module-0/review/).

## Shared platform

`platform/` is an unchanged copy of `snowch/learning-platform`, with the upstream commit and file hashes in `platform/SOURCE.json`. To update, clone that repository, make and commit any upstream changes there, then run:

```sh
node scripts/sync-platform.mjs ../learning-platform
node scripts/sync-platform.mjs --check
```

Do not edit the copied platform. The course provides its shell, original prose, figures, media model and grader separately.

## GitHub Pages

The Vite base path is `/video-lab/`; hash routes support direct lesson links, reloads and back/forward navigation on static hosting. The Pages workflow runs the full check before uploading `dist/` and deploying. It runs on pushes to the requested base branch `codex/intro-module-0`, and can be dispatched once GitHub recognises the workflow on the repository's default branch.

In **Settings → Pages**, select **GitHub Actions** as the source. The `github-pages` environment must permit deployment from `codex/intro-module-0`. This repository currently permits only `main` (observed through the GitHub API on 17 October 2026). That protection blocks deployment from the requested branch. This task leaves `main` and the environment protection unchanged. After the PR is reviewed and merged into its requested base, the owner must permit that base branch in **Settings → Environments → github-pages → Deployment branches** for the workflow to deploy.

The intended address is https://snowch.github.io/video-lab/ . Deployment is not claimed until the workflow succeeds and the live page is inspected. Local checks and independent reviews use the production build.
