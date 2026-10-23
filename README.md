# Video Lab: From Frames to Finished Demos

Copyright © 2026 Christopher Snow.

Make a short software demo: record or adopt an original recording, inspect it, remove waiting, and download an actual edited MP4 with its command and recipe. The initial path is implemented; Issue 3's final verification and deployment are in progress. See the [acceptance ledger](docs/notes/issue-3/acceptance.md) for evidence and outstanding checks.

| Step | Route | What you do |
| --- | --- | --- |
| 0 · Capture | `#/capture` | Record one action with the browser's chooser, import an MP4/WebM, or adopt the labelled original fallback. |
| 1 · Build | `#/build` | Run a separate experiment: encode three provided pictures into video, add synthetic sound, then inspect and download the actual files. This does not convert the project recording. |
| 2 · Inspect | `#/inspect` | Measure the selected file and compare its pictures and optional sound with your intention. |
| 3 · Edit | `#/edit` | Keep one or two source ranges, run a real trim/reset/join/encode, then replay the output. |
| 8 · Publish | `#/publish` | Review and download the edited MP4 and source-linked recipe; check playback, readability, sound expectations and file size before sharing. |

Modules 4–7 and 9–10 remain planned. Publish is the initial complete-demo checkpoint; it does not require those later modules. Processing stays in the browser. Viewing a provided result supports reading and comparison but does not produce a project export.

The original inspection and cut/join lessons remain detailed, graded references at `#/inspect/reference` and `#/edit/reference`. Their recorded measurements and challenges still use their own fixed fixtures. Old `#/module-0` and `#/module-2` bookmarks, including section links, redirect to these references. Existing lesson IDs and saved challenge work are retained.

## Run and check

Use Node 24 and native FFmpeg/ffprobe for the full check:

```sh
npm ci
npx playwright install --with-deps chromium firefox
npm run dev
```

Open the printed Vite URL under `/video-lab/`. For a production preview:

```sh
npm run build
npm run preview
```

`npm run check` is the same entry point CI runs. It covers formatting, copyright, the unchanged shared-platform copy, strict TypeScript, unit/schema/term/reference tests, native verification of original, cut/join and journey fixtures, the production build, and Playwright. The journey browser tests execute real WASM encode, mux, probe and edit operations rather than supplying invented outputs. Capture tests include controlled lifecycle scenarios; separate [native/browser capture evidence](docs/notes/issue-3/native-capture.md) records a real virtual-desktop run. A test's presence is not a claim that the final integrated check has passed; consult the acceptance ledger.

Processing uses pinned single-thread `@ffmpeg/core` 0.12.10, wrapper 0.12.15 and util 0.12.2. The build copies the unmodified core into `dist/encoder/0.12.10/`, publishes notices and source references, and generates its hashed manifest. It is not loaded merely by opening a lesson. [The compatibility spike](docs/notes/issue-3/wasm-spike.md) records actual Chromium/Firefox encoding, playback and probing, including missing-duration handling for real WebM recordings.

The capture exercise stops at 15 seconds and limits output to 20 MiB. Imported exercise files are limited to 20 MiB; editing requires inspected timing within 30 seconds and the supported picture-size bound. Browser/device recording support varies. Windows, macOS, physical phones and actual microphone/system-audio permissions are not certified by Linux browser emulation. Use the provided original source when capture is unavailable; real editing still requires working processing tools.

## Offline access and app installation

While connected, expand **Offline access and app installation**, choose **Download for offline use**, and wait until the complete lesson copy is ready. This saves the lessons, original recordings, recorded references, pictures, styles and fonts. It excludes `encoder/` and `optional/`.

For offline processing, first finish the lesson download, then explicitly save the additional processing tools from the journey's tools panel. The pinned package and notices total **32,367,068 bytes**, about **32.4 MB**, separate from lesson readiness. Without those tools, saved reading and recorded comparisons remain useful, but viewing a reference is not an executed edit. Offline saving uses a service worker over HTTPS or localhost; test the production preview rather than the development server.

**Check for updates** downloads a complete new lesson copy before offering **Reload to use update**. Other open Video Lab tabs reload too. Existing saved challenge work, notes and theme remain local. Browser storage may be cleared or evicted, private sessions are temporary, and external source links need internet. Project media is stored locally when available; if storage fails, the UI says session-only. Download important source files, outputs and recipes; there is no account synchronisation or permanent-backup promise.

The same disclosure contains **Add a Video Lab icon**. A real browser installation prompt is offered only when available; otherwise, use the browser-specific instructions. Installation does not itself save lessons or processing tools. Icons are original and reproducible with `node scripts/generate-icons.mjs`. See the [offline](docs/notes/offline-plan.md) and [installation](docs/notes/install-plan.md) records.

## Media, rights and evidence

The build-queue app, original capture, synthetic tone and original diagrams have reproducible sources. Native fixture verification checks real media and extracted pictures. The optional Big Buck Bunny comparison is loaded only by a Publish-page click: a five-second, 86,088-byte H.264/AAC excerpt, credited to © 2008 Blender Foundation, licensed CC BY 3.0. It is outside the baseline offline download and is never presented as the learner's recording. [The provenance record](docs/notes/issue-3/media/big-buck-bunny.json) pins the official source archive, transformation and hashes.

FFmpeg is now also distributed as an optional browser core, declared GPL-2.0-or-later; its wrapper/util are MIT. Distributed notices, exact source references and licence boundaries are described in [sources and licences](docs/sources.md). Earlier native-only FFmpeg statements no longer describe this implementation.

## Shared platform

`platform/` is an unchanged copy of `snowch/learning-platform`; `platform/SOURCE.json` records upstream commit and hashes. Make upstream changes in its own repository, then copy through the documented workflow:

```sh
node scripts/sync-platform.mjs ../learning-platform
node scripts/sync-platform.mjs --check
```

The course owns its shell, prose, capture/processing features, models and graders separately.

## GitHub Pages

The base path is `/video-lab/`; named hash routes support static hosting, reloads and browser navigation. In **Settings → Pages**, choose **GitHub Actions**. The deployment workflow checks the app before publishing `dist/` from `main`; manual dispatch is supported. The owner has authorised reviewed main deployments. Workflow success and a live-site check establish deployment, not this configuration note. The current Issue 3 release remains pending final check and deployment verification in the acceptance ledger.

Course: https://snowch.github.io/video-lab/
