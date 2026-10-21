# Curriculum redesign — record, understand, edit, publish

Copyright © 2026 Christopher Snow.

**Status:** Phase 1 written redesign for issue #3, produced before substantial code as the issue requires. It is a design record, not evidence that redesigned lessons exist. Code changes are separate phases listed at the end.

**Date:** 21 October 2026.

This document redesigns Video Lab around creating a complete software demo. It supersedes the feature-driven module list in `docs/plan.md`. The current implementation — Module 0 (media inspection) and Module 2 (cutting and joining), both complete, reviewed and deployed — is an asset, not a constraint: its fixtures, verified measurements, graders and browser components are reused where they serve the new journey, and retired where they impose the old order.

## 1. Learner persona, prerequisites and success criteria

**Persona.** A technically experienced software or data engineer who writes and runs real software and wants to make clear, high-quality software demonstrations. Comfortable with a terminal, files and basic code; no prior video capture, editing, FFmpeg, codec or audio knowledge is assumed.

**Prerequisites.** An ordinary modern browser. Optional, clearly labelled: a microphone, and a desktop where native FFmpeg capture commands can be tried. Screen capture is not a prerequisite for completing the course — a labelled pre-recorded fixture carries learners who cannot capture.

**End-of-course success criteria.** The capstone is a **complete demo**: the learner records (or adopts the labelled fallback of) a short screen demonstration of one real software action, builds a small MP4 from source pictures and sound to understand file structure, inspects their own real recording, makes one meaningful edit to it, and finishes with a shareable, verified, playable file plus a reproducible edit recipe and a viewer-centred self-review. A learner who completes the course can answer: *what did I record, what does the file contain, what did I change, and how do I know the result works?*

## 2. Current-to-proposed content map

Current state: `docs/plan.md` lists ten feature-driven modules; Module 0 (`what-is-video`, inspection of a pre-recorded build-queue MP4) and Module 2 (`cutting-and-joining`, copy/encode cuts, joins, clocks) are implemented, reviewed and deployed. Module 1 is planned and absent. The home page (`src/content/home.strings.ts`) presents modules 0 and 2 as available and 1, 3–9 as planned.

### Module 0 — "What is a digital video?" (deployed)

| Element | Disposition | Rationale |
| --- | --- | --- |
| Fixture: `public/media/build-queue.mp4` (10 s, 960×540, H.264 + AAC, original scripted browser capture) | **Retain** as the shared demo throughout the course | It is a real, verified, small, legible recording of one software action with a visible result. Capture → inspect → build → cut → export all operate on this one story. |
| Frame stills `public/media/frames/000–119.jpg` and `src/media/fixture.json` measurements | **Retain**, relocated into the inspection lesson and reused as the filmstrip source for the file-building lesson | Verified, provenance-recorded evidence. The filmstrip lesson needs exactly these real frames. |
| Recorded `ffprobe` evidence (`docs/notes/module-0/media/`, `public/media/ffprobe.json`) | **Retain**, relocated | Real inspection evidence reused in "Inspect real media". |
| `Explorer` interactive (player, frame slider, extracted still, PTS/time-base readout) | **Revise and relocate** to the inspection lesson (new step 2) | Sound, real, reusable; but its PTS-tick arithmetic must not open the course. It appears after the learner has a recording and a reason to locate a picture. |
| `Streams` diagram (file branching into two streams, interval counts) | **Revise and relocate** to the file-building lesson (new step 1) | Correctly explains container versus streams; belongs next to building an MP4, where the vocabulary is motivated. Trim to container/stream/codec only. |
| `Prediction` (does muting remove the audio stream?) | **Retain the pattern, relocate** to the inspection lesson | A good inspect-before-assuming exercise. Keep as a prediction interactive there. |
| `Failure` experiment (picture index ≠ sample position) | **Retain, relocate** to inspection; keep low priority | Genuine misconception, real evidence. Teach after the learner has inspected, not before. |
| "Inspection record" graded challenge (six fields: stream indexes, container, codec, frame at a time, its PTS) | **Retain, relocate** to inspection, re-graded against the learner's own capture where supported | Grading against the fixed fixture stays as the fallback path; where the learner has a real capture, the same challenge grades measured properties of *their* file via real parsing. |
| `Reflection` (optional local notes) | **Retain** as the platform pattern in every lesson | Not graded; keep. |
| Early PTS/sample/time-base arithmetic in the opening sections | **Retire from the opening** | The current lesson front-loads ticks and time bases before the learner has a file or a question. The new journey introduces each fact when an editing decision needs it. |
| Lesson position: module 0, first in course | **Relocate** to step 2 of the new journey | Inspection is powerful once you hold a real recording; it is abstract as an opener. |

### Module 2 — "Cutting and joining" (deployed)

| Element | Disposition | Rationale |
| --- | --- | --- |
| Fixture set `public/media/module-2/` (copy/encode cuts, join variants, boundary stills, `evidence.json`) and `scripts/module2-media.mjs` | **Retain** | Real FFmpeg-generated outputs with measured boundary pictures. Reused in the new "Cut and join" lesson (new step 3). |
| `CutSource`, `CutPrediction`, `CutExplorer` (requested versus actual cuts, keyframe behaviour) | **Retain, relocate** to step 3 | This is the strongest existing material: real outputs, real stills, genuine copy-versus-encode trade-off. |
| `JoinExplorer` (arrange clips, hold the result) | **Retain, relocate** to step 3 | Real join outputs with measured stills. |
| `ClockExperiment` (calculated source/output clock model) | **Revise** | Honestly labelled as a calculated model — keep that labelling. In the new journey it follows a real cut of the learner's own recording. |
| "Edit plan" graded challenge (method, order, reset, times) | **Retain, relocate** to step 3 | Grader and feedback are reusable; re-anchor to the learner's recording story. |
| Lesson position: module 2, with a `prerequisites: ["what-is-video"]` gate | **Relocate** to step 3; prerequisite becomes the capture and build lessons | The old gate pointed at a lesson that was itself misplaced; the new gate follows the artefact. |
| Recap of inspection vocabulary in the opening sections | **Retire** | The new order makes the recap unnecessary; inspection precedes cutting. |

### Home page and platform copy

| Element | Disposition | Rationale |
| --- | --- | --- |
| `home.strings.ts` intro, audience, outcome, plan list | **Revise** | Must promise a record → understand → edit → publish journey and show only implemented modules as available. No "Module 1 missing" copy; no prerequisites pointing at retired routes. |
| `ui.strings.ts` shared labels | **Retain**, extended | Existing labels are reviewed; new capture/encoder labels follow the same pattern. |
| Offline support (`src/offline/`, `scripts/build-offline.mjs`) | **Retain**, extended | Baseline offline manifest must exclude the WASM core and optional media; encoding offline becomes an explicit opt-in with accurate size and readiness reporting. |
| Installable app metadata (`public/manifest.webmanifest`, icons) | **Retain** | Unaffected by the redesign. |

## 3. Proposed module order, outcomes and dependencies

The issue's recommended journey is adopted with two recorded adjustments: (a) the optional AI module is kept at the end as planned-not-built rather than promised; (b) "Make the action readable" and "Make the sound clear" are ordered readability-first because a demo whose picture cannot be read fails before its audio matters, and because crop/zoom decisions are made on the picture the learner has already cut. Everything else follows the issue's table.

| # | Module | Outcome | Concepts introduced | Evidence the learner manipulates | Why interactive, not static |
| --- | --- | --- | --- | --- | --- |
| 0 | **Capture your first software demo** | Record 5–15 s of one visible software action with a clear start and result; replay and download it; notice dead time and legibility | screen capture, `getDisplayMedia`, `MediaRecorder`, WebM versus MP4, capture hygiene | the learner's own real recording bytes; a labelled pre-recorded fallback where capture is unsupported | Capture itself is a real API operation; no static diagram can produce the learner's artefact |
| 1 | **How a video file is created** | Build a real video-only MP4 from three original pictures, add real audio, mux, and inspect the result | pictures over time, encoding versus muxing, container, `-framerate`, ffmpeg.wasm | real `ffmpeg.wasm` runs in a worker; the produced MP4's actual probed bytes | Encoding and probing are real computations on real bytes; a canned result would be a simulation |
| 2 | **Inspect and prepare real media** | Read container/stream/timing evidence from the learner's own recording; diagnose a practical capture problem | ffprobe, streams, codecs, duration, frame rate; PTS/time base only when a cut question needs it | the learner's recording plus the retained verified fixture; recorded and live probe output | Inspection reads real files; the prediction and failure experiments test real misconceptions |
| 3 | **Cut and join: tell the story** | Keep the action and result, remove dead time, compare accurate cuts with copying, review the edited output | stream copy versus re-encode, keyframes, cut points, concat, output timeline | retained real FFmpeg cut/join outputs and boundary stills; the learner's recording | The copy/encode and join explorers compare real outputs; the difference is only visible by playing real files |
| 4 | **Make the action readable** | Crop, zoom, frame and pace so UI and terminal text can be read; add minimal callouts | crop, scale, pacing, callouts, readability of small text | real filter runs on the learner's recording; before/after stills from real output | The improvement is visible only in the actual rendered pictures |
| 5 | **Make the sound clear** | Understand microphone/system audio basics, levels and noise; inspect and improve a real recording | audio capture options, levels, noise, narration sync | the learner's recording's real audio stream; measured level evidence | Audio problems are heard and measured; static prose cannot demonstrate them |
| 6 | **Compression and picture quality** | Compare resolution, codec settings and bitrate; choose trade-offs that keep text readable | bitrate, CRF/quality settings, resolution, codec | real encoded variants of the same source, measured size and stills | Comparisons require real encodes; sizes and artefacts cannot be predicted honestly |
| 7 | **Captions, overlays and automation** | Construct and validate understandable captions/overlays; introduce filter graphs as needed | subtitles, overlays, filter chains | real filtergraph runs; validated caption output | Building a caption track is a real operation on real bytes |
| 8 | **Export, publish and verify** | Produce a usable deliverable; verify playback, sound, captions and size | export profiles, delivery formats, verification | the learner's finished file, probed and played back | Verification is a real check of the produced artefact |
| 9 | **AI-assisted production (optional)** | Use transcripts and suggested edits while evaluating hallucinated text, timing errors and meaning | transcription, assisted editing, human review | transcript text against the learner's real recording | Judging an edit requires comparing it with the real media |
| 10 | **Final project** | Record and produce a complete concise technical demo with a reproducible edit recipe and a viewer-centred self-review | the whole journey, integrated | the learner's complete demo artefact and recipe | The capstone is a real produced work |

**Dependencies.** 0 → 1 → 2 → 3 form the required vertical slice and each hands the learner a real artefact to the next: own recording → understanding of what a file is → verified inspection of that recording → first real edit. 4–8 each improve the same demo and each ends with a downloadable, inspectable artefact. 9 is optional and depends on 8. 10 depends on all of 0–8.

**Static-versus-interactive audit (summary).** Interactions are justified only where they operate on real bytes: capture (real API), encoding/muxing/probing (real WASM), inspection (real files), cut/join comparisons (real outputs), readability/quality/caption improvements (real filter runs), verification (real playback and probe). Everything else is static: the capture pipeline is one labelled static image (visible app → selected display → browser recorder → output file → playback); encode-versus-mux is a static two-lane schematic; MP4 boxes, if introduced, get a static conceptual diagram explicitly labelled "not a literal byte map", with any byte-level view coming from verified parsing of the produced file. No animated recorders, moving stream diagrams, sliders without consequence, or pseudo-processors.

## 4. The shared demo and its artefact story

**Demo brief.** One original browser scene — the existing build-queue app (`media-source/demo.html`): an initial list of three builds, one Sort action, a readable result (payments is the longest at 61 s). Legible at 960×540, small on disk, already scripted for reproducible capture.

**One story across chapters.** The learner's own capture of this (or their own) app is the running artefact: captured in step 0, understood structurally in step 1 (by building a small MP4 from the same scene's real frames), inspected in step 2, cut in step 3, made readable in step 4, made clear in step 5, compressed deliberately in step 6, captioned in step 7, exported and verified in step 8, and finished as the capstone in step 10.

**Fixture provenance.** Existing fixtures are original and provenance-recorded: `scripts/generate-media.mjs` (Playwright capture of `media-source/demo.html`, 120 frames at 12 fps → `build-queue.mp4`, native FFmpeg libx264/AAC encode; generation record in `docs/notes/module-0/media/generation.json`, raw `ffprobe.json` committed) and `scripts/module2-media.mjs` (cut/join variants, stills, `evidence.json`, SHA-256 pinned). New fixtures required by the redesign:

- **Filmstrip sources** for step 1: three original stills from the existing verified frame set (e.g. frames 000, 048, 072 — before the action, the action, the result), reused from `public/media/frames/`, plus a tiny deterministic synthetic WAV generated and committed with its script (clearly labelled synthetic, not narration).
- **Labelled pre-recorded original** for step 0's fallback: the existing `build-queue.mp4` itself, presented as "a pre-recorded original you did not capture", never as the learner's capture.
- **Optional Big Buck Bunny excerpt** (step 6, secondary sample): a reproducibly derived short low-resolution excerpt from the official Blender Foundation release, with exact source URL, CC BY 3.0 licence and attribution, transformation commands, codec/container facts, file size and SHA-256 recorded in `docs/sources.md`; lazy-loaded opt-in with stated size; never bundled at baseline and never the first thing the learner studies. Sources: https://peach.blender.org/download/ and https://peach.blender.org/about/.

**Native-versus-browser strategy.** Browser capture uses `getDisplayMedia` + `MediaRecorder` under a secure context, started only on an explicit learner click; output is honestly named (often WebM — never labelled MP4 merely because the course later teaches MP4). In-browser encoding/muxing/inspection uses real `ffmpeg.wasm` in a worker. Native desktop FFmpeg capture is a clearly optional, separately verified "record on your own computer" section: Windows `gdigrab`, macOS `avfoundation` with real device selection, Linux `x11grab`, plus an honest Wayland alternative (portal/PipeWire/OBS or a capture-file workflow) where direct device capture does not work. `ffmpeg.wasm` never implies desktop capture capability. No remote uploads, accounts or arbitrary shell execution.

## 5. Before/after lesson-outline review

**Before (current Module 0 opener).** A learner meets vocabulary — stream, frame, PTS, sample, channel, container, codec, time base, CFR/VFR, ffprobe — in the lesson's `introduces` list before touching any media, then inspects a recording they did not make, in a lesson whose premise ("what is a digital video?") answers a question the learner has not yet asked. A sceptical reviewer's findings: assumed prior vocabulary; PTS-tick arithmetic before any reason to locate a picture; a fixed fixture the learner cannot relate to their own work; "Module 1" shown as planned with no path to it.

**After (new step 0 opener).** The learner is asked to record 5–15 seconds of one software action, watches it back, and notices dead time and legibility. Vocabulary arrives only when an observed problem needs a name. A fresh learner's expected findings, to be verified in Phase 2 review: no assumed vocabulary; a real artefact from the first minutes; an honest fallback where capture is unsupported. A sceptical reviewer's expected challenges, to be answered in the build: does the fallback honestly label itself; does the recorder stop all tracks on stop/deny/navigation; is WebM named WebM; is the WASM core never downloaded before an explicit Run.

**Replaced simulations.** No candidate animations or simulations are carried over. The capture pipeline, encode/mux relationship and MP4 box concepts are static labelled diagrams; the clock experiment remains a calculated model and is labelled as such; every processing claim is backed by real bytes.

## 6. Incremental implementation and migration plan

**Phase 1 — this document.** Pedagogy and architecture: this redesign, the current-to-target map, a reader-facing wireframe of the first three steps, the static-versus-interactive audit (§3), the privacy/capture support matrix, and a WASM compatibility spike (pinned `@ffmpeg/ffmpeg` 0.12.15 / `@ffmpeg/core` 0.12.10 / `@ffmpeg/util` 0.12.2; verify libx264/AAC/MP4-muxer availability on the pinned single-thread core before authoring UI; verify it runs on GitHub Pages under `/video-lab/`, not only in Vite dev). No bulk rewriting. **Checkpoint:** this document reviewed; spike results recorded under `docs/notes/`.

**Phase 2 — first runnable learner path.** Real capture exercise with labelled fallback fixture; then the tiny real frames → MP4 → audio/mux → probe exercise with on-demand WASM in a worker; navigation between them; graceful mobile/offline fallback; first-run copy updated. **Checkpoints:** unit tests for capture state logic, command building and grading; Playwright tests for permission denial, share-ended, download/playback, audio-absent, WASM load/run/probe/failure/retry; `npm run check` green; Pages deployment verified.

**Phase 3 — revise and reconnect existing lessons.** Reposition the retained Module 0 inspection material and Module 2 cut/join material into steps 2 and 3; update `docs/plan.md`, `src/content/home.strings.ts`, lesson metadata, objectives, term gates, cross-links and progress migration; demonstrate an actual short edited result. **Checkpoints:** measured media and grading checks still pass; old routes and stored progress handled; full check and Pages verification.

**Phase 4 — remaining course.** Steps 4–10 in independently tested slices, each with the reader → sceptic → ranked fixes → checker workflow and dated records under `docs/notes/`. Planned modules are explicitly labelled until implemented.

**Migration and compatibility.**

- Stored progress is keyed `${book}:v1:${lessonId}` in localStorage (`platform/lesson-runtime/src/state.ts`). Lesson IDs `what-is-video` and `cutting-and-joining` are **kept** for the relocated lessons, so existing progress, hint counts and reflection notes survive the renumbering. Completion is recomputed by grading, never read from storage, so re-gating prerequisites cannot fake or lose completion.
- Routes are `#/module-<n>`; the module numbers change. A route/redirect map sends `#/module-0` and `#/module-2` to the relocated lessons' new module numbers, and any other old bookmark to the home page with an explanation, never a mysterious blank. Bookmarks to lesson sections (`#/module-0/investigation`) map by section kind where the section survives, otherwise to the lesson start.
- The home page module list is regenerated from the new order; available modules are shown as available only when implemented, planned modules labelled planned. No "Module 1 missing" copy remains.
- The offline baseline manifest (`scripts/build-offline.mjs`) must exclude the FFmpeg WASM core and optional media from the default download; offline encoding is a separate explicit opt-in that reports its own size and readiness, with version/cache invalidation through the existing `src/offline/worker.ts`. Basic reading and existing lessons never download the core.

**Test and deployment checkpoints (cross-cutting).** `npm run check` (prettier, copyright, platform sync, strict typecheck, unit tests, recorded-media facts, lesson schema, term gate, reference challenges, build, Playwright) is the single entry point and must stay green at every phase. CI additionally proves at least one real WASM encode and one real mux + probe in the production build with bounded fixture size. Browser tests cover phone/tablet/desktop widths, light/dark, keyboard and touch, permission denied, share-ended, unsupported MIME, cancelled encode, offline without core, and stale-cache upgrade. A deployed GitHub Pages run verifies worker/core paths and capture behaviour; cross-browser and device limitations are recorded honestly, never claimed from emulation alone.

## 7. Risks and open decisions

- **WASM core size and Pages hosting.** The single-thread core is several MB; it must be version-pinned, same-origin, lazily loaded on explicit Run, and excluded from the baseline offline manifest. The Phase 1 spike records the measured size and load behaviour before UI is authored.
- **ffprobe in WASM.** The stock `@ffmpeg/core` build does not ship an ffprobe binary; inspection of produced files uses either a verified real parser in TypeScript or a separately verified core build. This is a spike decision, not an assumption.
- **Codec support is build-specific.** libx264/AAC/MP4 support must be confirmed on the actual pinned build; the UI teaches only what the pinned build demonstrably does.
- **Capture support varies.** Some mobile browsers and all non-secure contexts lack `getDisplayMedia`; the labelled fixture path must be first-class, not a failure state.
- **Big Buck Bunny excerpt.** Optional; only with pinned provenance, attribution and a stated download size. If provenance cannot be pinned cleanly, the module uses original fixtures instead.
