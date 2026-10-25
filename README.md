# Video Lab: Editing with FFmpeg

Copyright © 2026 Christopher Snow.

[Open the course](https://snowch.github.io/video-lab/). Ten chapters teach video editing with real, editable FFmpeg/ffprobe commands executed locally in WebAssembly. Twenty-four concept pages put each command beside its explanation, followed by actual output/replay, a specific observation and one independent practice task with five hints. Optional Notes retain earlier predictions and reviews. Timelines and connection diagrams explain examples without claiming to measure learner outputs. The optional command builder supports touch devices; raw tool output remains visible.

| Chapter | First page |
| --- | --- |
| 1 · Your first edit | `#/learn/first-edit/shorten` |
| 2 · Inside a video file | `#/learn/inside-video/inspect` |
| 3 · Frames and time | `#/learn/frames-time/rate` |
| 4 · Cut and join | `#/learn/cut-join/copy` |
| 5 · Shape the picture | `#/learn/framing/scale` |
| 6 · Work with sound | `#/learn/sound/level` |
| 7 · Titles and subtitles | `#/learn/text/title` |
| 8 · Compression and quality | `#/learn/quality/quality` |
| 9 · Export and verify | `#/learn/export/format` |
| 10 · Repeatable workflows | `#/learn/workflows/reuse` |

The credited, low-resolution two-minute Big Buck Bunny excerpt includes original sound, with eight- and six-second companion clips for quick mobile exercises. Preparation, licence, hashes and native measurements are recorded in [media provenance](docs/notes/notebook/media.json). The course ships its subtitle example and licensed font, including in the complete offline download.

This is a browser notebook, not JupyterLite or a Unix shell. Cells run FFmpeg or ffprobe; ordinary Files controls import, create folders, rename/move/copy, preview, edit text, delete with confirmation and download individual files or a ZIP retaining paths. Batch scripts are explicitly for an installed FFmpeg and POSIX terminal, and are never claimed to execute in the browser.

Files and cell commands/results use the separate `video-lab-notebook` IndexedDB database. Each window retains its own drafts. Changed commands or input/output hashes mark results stale. Property checks use executed files and state their limits; a passed duration/stream check cannot establish editorial quality, gain, subtitle meaning or native-script execution. Page records can be downloaded as JSON; this is an export, not an import/synchronisation feature.

Earlier production/reference links and the optional standalone workbench remain explicitly archived. **Files → Earlier work** opens that course at `#/earlier`; original `#/capture`, `#/inspect`, `#/edit`, `#/build`, `#/publish`, reference section links and module aliases remain valid. Earlier files are copied once without deleting originals or changing old databases, drafts and achievements. The optional device/native recording guide remains available at `#/appendix/recording`.

[Implementation plan and review evidence](docs/notes/notebook/01-plan.md) records the new scope. [Lesson-flow revision](docs/notes/lesson-flow/01-plan.md) records the subsequent per-page teaching and interface review. The historical notes below describe archived features where labelled.

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

The notebook workspace allows 64 files, 20 MiB each and 32 MiB combined. One command can read up to twelve inputs. Archived workspaces retain their earlier twelve-file/twelve-recipe limits. Commands select timing and dimensions directly; processing has a 120-second limit. Record with native FFmpeg or a device recorder outside the app, then import the source. The optional [recording guide](https://snowch.github.io/video-lab/#/appendix/recording) gives platform-specific instructions. Browser screen recording has been removed; no sharing or microphone permission is requested. Earlier saved recordings are retained. Native Windows/macOS command forms are source-reviewed, while the Linux/X11 example has virtual-desktop execution evidence.

## Using the command labs

Enter a genuine `ffmpeg` or `ffprobe` command in **Command** and press Enter or **Run command**. Shift+Enter continues the same command; Up/Down recalls one-line history. **Build command** offers editable arguments for touch devices. Its complete command stays visible; replacing a typed draft is explicit and the previous draft can be restored.

Start ordinary inspection with `ffprobe FILENAME` and read its actual Duration and Stream lines. Use `-of json` when the task needs structured packet/frame fields or a saved report. Tool output is raw; workspace feedback and optional browser diagnostics are separate. The pinned ffprobe wrapper's -1 return is validated using private JSON evidence and never presented as native exit status zero.

The workspace is not an operating-system shell: no pipes, redirection, variable expansion or folders. Quote filter graphs. Existing outputs require `-y`; source inputs are protected. File setup, replay, Read, Download, Delete, hints, notes and checks use app controls. Recipes retain the exact command and hashes of all workspace inputs, including unrelated files; read `-i` to identify actual dependencies. Legacy media is copied once without clearing its original store or reference achievements.

Production practice media is an original twelve-second silent recording of Mousepad Find and Replace, with extracted stills for the separate Build experiment. Detailed references retain explicitly labelled fixed fixtures for their exact timestamp and decoded-picture checks. [Migration plan and review records](docs/notes/course-workbench/plan.md) document the course-wide change. No advanced planned module is claimed as implemented.

## Offline access and app installation

Open **App status** beneath the header on either app entry. The closed control always shows the running commit/build and keeps an available or prepared update visible. **Version** checks the same-origin deployed release, not GitHub main. A check only reads small metadata; it never starts a large app download. Choose **Update** to prepare verified assets, **Later** to defer, and **Restart to update** when every open Video Lab window is ready. Processing, composition, unsaved notes and non-durable files block restart. Routes and saved work remain. Closing every window does not activate a prepared update in the new protocol.

In **Offline access**, **Download for offline use** saves lessons, practice/reference media, pictures, styles, fonts and FFmpeg/ffprobe tools together (about 49 MB, with the actual shipped total shown). Wait for **Available offline**. Registration alone is not readiness: each required asset is verified. Progress counts saved and verified bytes, including reusable files. Cancelled/interrupted saves offer **Resume download**; corrupt or missing assets can be repaired. An update of a complete save retains its completeness; an online-only update does not automatically save the processing tools.

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

## Archived guided command tasks

Each available lab now keeps one current task beside the command workspace on desktop and immediately before it on phones. Previous/Next changes instructions only; inspect results yourself. Get video consistently offers the practice source and file import. Recording instructions are optional and use tools outside the app. Replay/download tasks use an existing source recording's actual filename.

Use this command copies a native example into the editor; browser actions appear as buttons. Workspace usage, background explanations and task navigation are expandable. All original detailed reference sections remain available as individual tasks, including old section bookmarks and browser history.
