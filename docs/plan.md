# Video Lab — course plan

Copyright © 2026 Christopher Snow.

**Issue 5, 23 October 2026:** [Prototype fidelity and progressive concepts](notes/issue-5/plan.md) supersedes the old task-per-file-action presentation. Get video → Inspect → Edit → Build → Publish uses one focused instruction/action/result layout, verified minimal first cuts, and later concepts introduced when needed. Old route IDs, controlled reference evidence and learner storage are retained. UX fidelity and concept prerequisites are explicit independent-review gates.

**Course-wide workbench migration, 23 October 2026:** [the migration slice](notes/course-workbench/plan.md) extends the approved native-command/editor/builder approach to all five available production routes and both detailed references. Browser actions use app controls, ordinary probes start bare, actual logs remain raw and structured reports are explicit. Production practice uses Mousepad; fixed reference data and saved work are preserved. [Quality and public deployment verification](notes/course-workbench/08-deployment.md) close the migration. The sections below record the previous implementation history where they describe invented workspace commands.

**Raw CLI output, 23 October 2026:** the owner requested authentic command output as the primary result. The [presentation revision](notes/raw-cli-output/plan.md) removes derived metadata badges and result headings, exposes actual JSON/logs directly, and moves browser wrapper diagnostics into optional help. The default command is bare `ffprobe SOURCE`; `-of json` is optional for structured reports.

**Working command workbench, 23 October 2026:** the owner approved the proposed interface, rejected using the course as sample footage and asked for actual WASM execution. The [live workbench slice](notes/live-workbench/plan.md) connects that three-step interface to the existing real runner and persistent workspace, with an original recording of Mousepad. It remains available at the preview URL; historical course routes and progress are preserved.

**Historical UX prototype, 23 October 2026:** after finding invented workspace commands confusing, the owner requested a standalone HTML mockup of ordinary file controls plus authentic FFmpeg/ffprobe commands and an optional mobile/tablet builder. The [prototype slice](notes/command-ux/plan.md) is an isolated three-step usability trial with disclosed simulated execution. It does not yet replace the production curriculum below.

**CLI-first revision, 23 October 2026:** the owner requires the labs to be CLI rather than GUI. The reviewed and deployed production path now uses editable commands against real FFmpeg/ffprobe WASM and persistent browser files. See [the implementation/review plan](notes/cli/plan.md). Existing fixed-fixture references and saved work remain. Validation and deployment for this revision are recorded separately under `notes/cli/`; the historical closure below applies to the prior interface.

**Previous status, 23 October 2026:** the initial five-step capture-to-export path is implemented. Independent review, the final local/CI quality gates and public deployment verification have passed; [the acceptance ledger](notes/issue-3/acceptance.md) records closure evidence. The [redesign record](notes/curriculum-redesign.md) explains the individual retained sections and migration.

## Purpose and prerequisites

Help a software or data engineer make a short demo whose action and result a viewer can understand. The learner needs ordinary browser/file skills; ordinary terminal familiarity is required for the command-led labs. Media terms are introduced beside the operation that needs them. Capture is optional: a labelled original recording supports the same real edit/export path.

The initial completion outcome is a playable edited MP4, the source-linked command/recipe, and a viewer-centred review. Reading a provided output does not establish that an edit was executed. Publishing here means preparing and checking a downloadable deliverable; the course does not upload it to a hosting account.

## Curriculum and routes

| # | Module | Current outcome | Status / canonical route |
| --- | --- | --- | --- |
| 0 | Capture your first software demo | Record one action, replay/download, or import/adopt a source. | Implemented · `#/capture` |
| 1 | How a video file is created | Encode supplied pictures, add synthetic audio, inspect actual MP4s. | Implemented · `#/build` |
| 2 | Inspect and prepare real media | Probe the selected file; compare actual content with intended capture. | Implemented · `#/inspect` |
| 3 | Cut and join: tell the story | Trim one or two ranges, reset/join/encode and download a real edit recipe. | Implemented · `#/edit` |
| 4 | Make the action readable | Crop, zoom, pace and add minimal callouts. | Planned |
| 5 | Make the sound clear | Improve narration, levels, noise and timing. | Planned |
| 6 | Compression and picture quality | Compare encoded size, detail and screen-text readability. | Planned |
| 7 | Captions, overlays and automation | Add and validate captions and overlays. | Planned |
| 8 | Export, publish and verify | Complete the initial demo: replay/download actual output and recipe, check intended sound, readability, size and playback elsewhere. | Implemented initial checkpoint · `#/publish` |
| 9 | AI-assisted production | Review assisted transcripts, captions and edit proposals against actual media. | Planned, optional |
| 10 | Final project | Integrate later production techniques in a further complete demo. | Planned |

The initial path is **0 → 1 → 2 → 3 → 8**, not a requirement to wait for advanced modules. Build is a separate structure experiment. It preserves the capture/import/adopted recording as the project source; it does not turn that recording into a three-picture filmstrip. Inspect may examine experiment outputs explicitly, while Edit uses the project source.

## Actual evidence and interaction choices

- Capture is a real consent-based browser recording with correctly named MIME-derived output, lifecycle cleanup and a provided-source fallback. Optional native commands are separate: only Linux/X11 and managed Chromium virtual-display capture were actually executed; other command forms received source review.
- Build runs single-thread FFmpeg WASM to encode real original stills 000/048/072, then AAC-encode the synthetic sound while copying video into MP4. The stills show initial state, sorted result and later hold, not a continuous click/action. Changing presentation rate requires new bytes; stale audio output is invalidated.
- Inspect runs real ffprobe on explicit request. A missing declared duration remains missing; observed packet timing is labelled separately, including uncertain final hold. Audio absence is compared with intention, not treated as an automatic fault.
- Edit operates on the actual source, with one or two half-open ranges, reset clocks, optional concatenation and encoding. It preserves the source, invalidates stale exports and supplies actual output measurements, command and recipe.
- Publish provides replay, MP4/recipe downloads and a checklist. It does not automatically certify another device's playback or a viewer's understanding.
- Capture, encode/mux and edit-pipeline diagrams are static explanatory shapes. The Build filmstrip is static source evidence with a calculated output schedule. Recorded reference players select verified output files; their clock comparison is an explicitly mathematical model. No diagram pretends to be a live processor or measured waveform.

## Architecture and compatibility

React/TypeScript/Vite uses the unchanged shared lesson platform through checked-copy sync. Original reference lesson IDs `what-is-video` and `cutting-and-joining` and saved challenge keys remain. Canonical routes use names; old `#/module-0[/section]` maps to `#/inspect/reference[/section]`, and old `#/module-2[/section]` to `#/edit/reference[/section]`. The same numeric string is never repurposed for the new module number. Reference graders remain tied to fixed fixtures, not learner recordings.

The pinned core 0.12.10 actually includes ffprobe. Wrapper 0.12.15 and util 0.12.2 are pinned; the core is loaded only by explicit processing or additional offline-tool saving. Probe output is validated against real JSON/streams/format/errors, including the documented pinned return sentinel; encoder output requires success, bytes and a valid real probe. [The spike](notes/issue-3/wasm-spike.md) is the capability evidence.

Processing and media stay local. One operation runs at a time; cancel/navigation terminates it and supports retry. Exercise imports are bounded to 20 MiB; learners select times and output settings in their actual commands. The engine has separate 32 MiB total-input and 120-second processing bounds. Project media uses browser storage with explicit session-only fallback and clear-project control. Download important work.

Offline lessons and the approximately 32.4 MB additional processing package have separate manifests/readiness. Encoder and optional comparison media are excluded from the baseline. Installation does not imply either download is complete. GPL/MIT notices and exact source references accompany the shipped optional core.

## Delivery and remaining work

The Issue 3 owner request authorises the complete initial path while allowing advanced modules 4–7 and 9–10 to remain planned. The first produced demo now belongs to Publish, module 8; the later Final project does not make that outcome provisional.

Separate verified-fact drafting and outline review preceded implementation. The built reader completed an actual provided-source → Build → Inspect → Edit → Publish run and recorded findings, not blanket approval. The sceptic and checker independently verify ranked fixes, including actual downloaded recipes and the sparse-picture timing regression. The historical Issue 3 local `npm run check` passed 54 unit and 105 browser tests (the subsequent CLI revision passes 69 unit and 125 browser tests); [public Pages verification](notes/issue-3/deployment.md) confirms the worker/core paths, actual capture/processing and offline upgrade. See [reviews](notes/issue-3/review/) and [acceptance](notes/issue-3/acceptance.md).

Later production topics must arrive as independent tested slices. Do not describe future filter/audio/caption/AI controls as implemented. Use primary sources and original teaching; the photographed tutorial is a topic inspiration, not a repository source to copy.


## Command workspace

All available production and reference routes share one command workspace. `capture`/`stop` use browser screen sharing/MediaRecorder, `import` uses the browser chooser, `sample` loads the labelled original source, and `fixtures` loads the separate structure experiment. Learners type `ffmpeg` and JSON `ffprobe` commands, read actual logs, change arguments and compare output bytes. `ls`, `play`, `download`, `rm`, `clear`, `help` and `cancel` are labelled workspace conveniences, not a simulated operating-system shell. No parameter forms generate hidden media commands. Media replay, permissions, navigation and installation remain normal browser UI.

`reference build` and `reference edit` retain clearly labelled provided output comparisons without claiming a tool ran. `comparison` opts into the credited Big Buck Bunny excerpt. These do not count as learner-generated exports.

Workspace storage migrates existing project media once without clearing its source database. Twelve working files (media, reports and notes) plus twelve recipes (twenty-four files total) share a 32 MiB budget; individual files/outputs are bounded to 20 MiB and processing to 120 seconds. Native command semantics replace the old GUI's fixed range/duration/picture-size validation. An execution recipe records the exact command/arguments and hashes of all workspace input files; `-i` identifies actual referenced inputs. The browser adapter supports one output and JSON probe reports, no shell pipelines/redirection/expansion. Cancellation/navigation terminate workers and release capture tracks. A failed or cancelled operation retains previous saved files, and replacement requires explicit `-y`.

The all-labs extension is specified in [its plan](notes/all-labs-cli/plan.md). Original reference section links now open command activities. `ffprobe -o FILE.json` saves an actual report; `cat`, `note`, `hint`, `solution`, `check` and `progress` provide command-led teaching, artifact checks and preserved achievement history. Inspection checks real metadata/frame timestamps and source provenance; edit checks real streams, timing, dimensions and decoded picture order against the controlled source. Old answer-based achievements remain distinct from new artifact checks.

The [guided-labs slice](notes/guided-labs/plan.md) replaces long instruction/terminal round trips with current-task navigation throughout all available labs. Manual task navigation does not certify success; real artifact checks and archived achievements remain separate. Contextual help is concise, with `help all` retaining the full reference. Browser capture capability determines the initial instruction path; it never bypasses permissions or silently loads media.
