# Video Lab: From Frames to Finished Demos

Copyright © 2026 Christopher Snow.

An interactive course for software and data engineers making clearer demonstrations. The introduction, **Module 0: What is a digital video?** and **Module 2: Cutting and joining** are implemented. Module 1 and Modules 3–9 remain planned. Module 2 supplies its own short FFmpeg introduction and links to Module 0 for media fundamentals.

Module 0 uses an original browser-app recording, genuine H.264/AAC MP4, recorded ffprobe evidence and extracted frames. The player, frame inspector, streams diagram, prediction, failure experiment and graded inspection challenge work without a remote service. The challenge has useful failed-test feedback, five progressive hints, retries, reset and locally saved work regraded on reload.

Module 2 compares six real stream-copy/encoded cuts and four real joined outputs from the same original recording. Learners inspect boundary pictures, arrange clips, compare source and output clocks, and complete a six-field edit challenge. The browser selects verified pre-generated results; it does not run FFmpeg or render arbitrary edits.

See the [Module 2 plan](docs/notes/module-2-plan.md), [media commands and verification](docs/notes/module-2/media/README.md), and [independent reviews](docs/notes/module-2/review/).

## Run and check

Node 24 and native FFmpeg/ffprobe are required for the full check. On a machine where browser system dependencies can be installed:

```sh
npm ci
npx playwright install --with-deps chromium firefox
npm run dev
npm run check
```

Open the URL Vite prints with `/video-lab/`. `npm run check` is exactly the command CI runs: formatting, source copyright, unedited platform copy, strict typecheck, model/schema/term/reference tests, required native verification of both modules’ media, production build and Playwright. `npm run build && npm run preview` serves the production bundle. Browser tests cover Chromium desktop/phone in light/dark plus desktop Firefox; WebKit/Safari are not yet a verified baseline.

See [media provenance and commands](docs/notes/module-0/media/README.md), [sources and licences](docs/sources.md), [module plan](docs/notes/module-0-plan.md), and [independent review records](docs/notes/module-0/review/).

## Use offline

Open [Video Lab](https://snowch.github.io/video-lab/) while connected. Expand **Use Video Lab offline**, choose **Download for offline use**, and keep the page open until it reports that the complete copy is ready. Both available modules, all recordings and pictures, challenges and local notes then work offline, including reopening a saved lesson URL in the same browser. The current bundle is about 9 MB before transfer compression.

Use **Check for updates** while connected. A complete update offers **Reload to use update**; other open Video Lab tabs reload too. Already saved challenge work, notes and theme remain in this browser. External source links require a connection. Browser storage can be cleared or evicted, and private sessions are temporary; this is not a backup or synchronisation service.

Offline saving uses standard service workers and Cache Storage on HTTPS (or localhost). It is enabled only after requesting a download. For local offline testing use `npm run build && npm run preview`, not the development server. The build generates `dist/sw.js` and `dist/offline-manifest.json` from all production assets. Native video seeking is served from complete saved recordings using HTTP byte ranges. No additional runtime dependency is installed. See [offline plan](docs/notes/offline-plan.md) and [review records](docs/notes/offline/review/).

## Shared platform

`platform/` is an unchanged copy of `snowch/learning-platform`, with the upstream commit and file hashes in `platform/SOURCE.json`. To update, clone that repository, make and commit any upstream changes there, then run:

```sh
node scripts/sync-platform.mjs ../learning-platform
node scripts/sync-platform.mjs --check
```

Do not edit the copied platform. The course provides its shell, original prose, figures, media model and grader separately.

## GitHub Pages

The Vite base path is `/video-lab/`; hash routes support direct lesson links, reloads and back/forward navigation on static hosting. The Pages workflow runs the full check before uploading `dist/` and deploying. It runs on pushes to `main` and supports manual dispatch from Actions.

In **Settings → Pages**, select **GitHub Actions** as the source. The existing `github-pages` environment permits `main`, so its deployment protection is retained. On 17 October 2026 the owner authorised deploying the reviewed implementation directly to `main`, superseding the initial project-branch-only delivery constraint.

The course address is https://snowch.github.io/video-lab/ . The **Deploy GitHub Pages** workflow reports each deployment result; [PR #2](https://github.com/snowch/video-lab/pull/2) records the live-site verification. Deployment success is established by the workflow and live check, not by this configuration note.
