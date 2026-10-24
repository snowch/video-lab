# Video Lab: From Frames to Finished Demos

Copyright © 2026 Christopher Snow.

The [command workbench](https://snowch.github.io/video-lab/optional/command-workbench.html) is a working three-step lab: choose a recording, inspect it and create an edited video. It uses the approved touch-friendly command builder alongside directly editable FFmpeg/ffprobe commands, executed locally in WebAssembly. File setup and downloads use app buttons. The practice recording demonstrates Find and Replace in the independent Mousepad text editor. [Implementation and review](docs/notes/live-workbench/plan.md) and [media provenance](media-source/mousepad/README.md) document this slice; the existing full course and reference routes remain available. The historical simulated prototype can be regenerated into `docs/notes/command-ux/archive/` with `node docs/notes/command-ux/build.mjs`; it no longer overwrites the working route.

The production labs are command-line workspaces. Type and run real FFmpeg/ffprobe WASM commands, inspect logs and actual files, and download the output plus an execution recipe. Source selection uses practice media or file import. The optional recording appendix covers native FFmpeg and device recorders outside the app.

Make a short software demo: record or adopt an original recording, inspect it, remove waiting, and download an actual edited MP4 with its command and recipe. The command-first path is independently reviewed, tested and deployed; its [plan and review evidence](docs/notes/cli/plan.md) records 69 unit tests, 125 browser tests, Pages deployment and real installed-app upgrade verification. See the [acceptance ledger](docs/notes/issue-3/acceptance.md) and [public release evidence](docs/notes/issue-3/deployment.md).

| Chapter | Route | What you learn and practise |
| --- | --- | --- |
| 1 · Choose your source video | `#/capture` | Choose a source and plan the starting state, action and evidence its viewer needs. |
| 2 · Inspect your video | `#/inspect` | Interpret duration, streams, codec and dimensions; distinguish metadata from what needs replay. |
| 3 · Trim and join clips | `#/edit` | Compare real edits, predict timing, understand encoding and joins, then create and defend an independent cut. |
| 4 · Build video from pictures | `#/build` | Predict a still-picture schedule, encode it, combine sound and explain what the separate experiment demonstrates. |
| 5 · Export and verify | `#/publish` | Select an actual deliverable, keep inputs and recipe, and distinguish technical, outside-player and viewer checks. |

Each chapter has a stated purpose and outcome, progressive explanations and an independent practice task with five optional hints. Self-review drafts persist separately from measured execution evidence and can be downloaded. Timing and picture-rate figures are explanatory models; comparison videos are identified as supplied, verified edits. Lesson bookmarks use `#/CHAPTER/lesson/ID`, with browser back/forward support. A native CLI command does not establish editorial quality or viewer understanding.

The five numbered chapters are the available course. Later framing, sound, compression, captions, AI and extended-project topics remain clearly marked as planned outside that sequence. Processing stays in the browser. Viewing a provided result does not produce a project export.

The original inspection and cut/join lessons remain detailed, graded references at `#/inspect/reference` and `#/edit/reference`. Both now use the same real command workspace, with fixed teaching sources, saved ffprobe reports and checks of actual output artifacts. Use Hint 1 through Hint 5, Show reference command and Save note. Earlier achievements shows executed artefact checks separately from earlier answer-based achievements. Old `#/module-0` and `#/module-2` bookmarks, including section links, redirect to these references. Existing lesson IDs and saved challenge work are retained.

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

`npm run check` is the same entry point CI runs. It covers formatting, copyright, the unchanged shared-platform copy, strict TypeScript, unit/schema/term/reference tests, native verification of original, cut/join and journey fixtures, the production build, and Playwright. The journey browser tests execute real WASM encode, mux, probe and edit operations rather than supplying invented outputs. Removal tests ensure browser capture APIs are never called and recordings saved by earlier versions remain usable. Separate [native capture evidence](docs/notes/capture-guide/01-facts.md) records the terminal example; older browser-capture notes are historical. A test's presence is not a claim that the final integrated check has passed; consult the acceptance ledger.

Processing uses pinned single-thread `@ffmpeg/core` 0.12.10, wrapper 0.12.15 and util 0.12.2. The build copies the unmodified core into `dist/encoder/0.12.10/`, publishes notices and source references, and generates its hashed manifest. It is not loaded merely by opening a lesson. [The compatibility spike](docs/notes/issue-3/wasm-spike.md) records actual Chromium/Firefox encoding, playback and probing, including missing-duration handling for real WebM recordings.

Workspace files are limited to 20 MiB each and 32 MiB combined, with up to twelve working files plus twelve execution recipes. Commands select timing and dimensions directly; processing has a 120-second limit. Record with native FFmpeg or a device recorder outside the app, then import the source. The optional [recording guide](https://snowch.github.io/video-lab/#/appendix/recording) gives platform-specific instructions. Browser screen recording has been removed; no sharing or microphone permission is requested. Earlier saved recordings are retained. Native Windows/macOS command forms are source-reviewed, while the Linux/X11 example has virtual-desktop execution evidence.

## Using the command labs

Enter a genuine `ffmpeg` or `ffprobe` command in **Command** and press Enter or **Run command**. Shift+Enter continues the same command; Up/Down recalls one-line history. **Build command** offers editable arguments for touch devices. Its complete command stays visible; replacing a typed draft is explicit and the previous draft can be restored.

Start ordinary inspection with `ffprobe FILENAME` and read its actual Duration and Stream lines. Use `-of json` when the task needs structured packet/frame fields or a saved report. Tool output is raw; workspace feedback and optional browser diagnostics are separate. The pinned ffprobe wrapper's -1 return is validated using private JSON evidence and never presented as native exit status zero.

The workspace is not an operating-system shell: no pipes, redirection, variable expansion or folders. Quote filter graphs. Existing outputs require `-y`; source inputs are protected. File setup, replay, Read, Download, Delete, hints, notes and checks use app controls. Recipes retain the exact command and hashes of all workspace inputs, including unrelated files; read `-i` to identify actual dependencies. Legacy media is copied once without clearing its original store or reference achievements.

Production practice media is an original twelve-second silent recording of Mousepad Find and Replace, with extracted stills for the separate Build experiment. Detailed references retain explicitly labelled fixed fixtures for their exact timestamp and decoded-picture checks. [Migration plan and review records](docs/notes/course-workbench/plan.md) document the course-wide change. No advanced planned module is claimed as implemented.

## Offline access and app installation

Open **App status** beneath the header on either app entry. The closed control always shows the running commit/build and keeps an available or prepared update visible. **Version** checks the same-origin deployed release, not GitHub main. A check only reads small metadata; it never starts a large app download. Choose **Update** to prepare verified assets, **Later** to defer, and **Restart to update** when every open Video Lab window is ready. Processing, composition, unsaved notes and non-durable files block restart. Routes and saved work remain. Closing every window does not activate a prepared update in the new protocol.

In **Offline access**, **Download for offline use** saves lessons, practice/reference media, pictures, styles, fonts and FFmpeg/ffprobe tools together (about 42 MB, with the actual shipped total shown). Wait for **Available offline**. Registration alone is not readiness: each required asset is verified. Progress counts saved and verified bytes, including reusable files. Cancelled/interrupted saves offer **Resume download**; corrupt or missing assets can be repaired. An update of a complete save retains its completeness; an online-only update does not automatically save the processing tools.

**Remove offline copy** asks for confirmation and clears only Video Lab's download caches. Imported/generated media, recipes, drafts, notes, answers, achievements and sibling apps remain. The lightweight controlling registration is retained so current online tabs can safely download again; it does not count as an offline copy. Installation remains separate: **Add a Video Lab icon** offers its native prompt or one relevant instruction. An installed app window shows installed status.

The [release/storage contract](docs/app-status-contract.md), [facts and independent reviews](docs/notes/issue-6/01-facts.md) document the implementation and migration. Older clients cannot join the new safe restart handshake: save work and close those old windows, then reopen online. Their complete downloads are migrated and verified rather than deleting user data. Later updates use the explicit restart protocol.

Browser storage can be cleared or evicted, private sessions are temporary, and external links/native tools need their own connectivity/setup. Download important sources, outputs and recipes; there is no account synchronisation or permanent-backup promise. Use the production HTTPS/localhost preview for worker/offline testing. Icons remain original and reproducible with `node scripts/generate-icons.mjs`.

## Media, rights and evidence

The build-queue app, original capture, synthetic tone and original diagrams have reproducible sources. Native fixture verification checks real media and extracted pictures. The optional Big Buck Bunny comparison is loaded only by the Load optional comparison control: a five-second, 86,088-byte H.264/AAC excerpt, credited to © 2008 Blender Foundation, licensed CC BY 3.0. It is outside the baseline offline download and is never presented as the learner's recording. [The provenance record](docs/notes/issue-3/media/big-buck-bunny.json) pins the official source archive, transformation and hashes.

FFmpeg is now also distributed as an optional browser core, declared GPL-2.0-or-later; its wrapper/util are MIT. Distributed notices, exact source references and licence boundaries are described in [sources and licences](docs/sources.md). Earlier native-only FFmpeg statements no longer describe this implementation.

## Shared platform

`platform/` is an unchanged copy of `snowch/learning-platform`; `platform/SOURCE.json` records upstream commit and hashes. Make upstream changes in its own repository, then copy through the documented workflow:

```sh
node scripts/sync-platform.mjs ../learning-platform
node scripts/sync-platform.mjs --check
```

The course owns its shell, prose, source/processing features, models and graders separately.

## GitHub Pages

The base path is `/video-lab/`; named hash routes support static hosting, reloads and browser navigation. In **Settings → Pages**, choose **GitHub Actions**. The deployment workflow checks the app before publishing `dist/` from `main`; manual dispatch is supported. The owner has authorised reviewed main deployments. Workflow success and a live-site check establish deployment, not this configuration note. The verified Issue 3 release, workflow results and exact tested app hash are recorded in the [deployment record](docs/notes/issue-3/deployment.md).

Course: https://snowch.github.io/video-lab/

## Guided command tasks

Each available lab now keeps one current task beside the command workspace on desktop and immediately before it on phones. Previous/Next changes instructions only; inspect results yourself. Get video consistently offers the practice source and file import. Recording instructions are optional and use tools outside the app. Replay/download tasks use an existing source recording's actual filename.

Use this command copies a native example into the editor; browser actions appear as buttons. Workspace usage, background explanations and task navigation are expandable. All original detailed reference sections remain available as individual tasks, including old section bookmarks and browser history.
