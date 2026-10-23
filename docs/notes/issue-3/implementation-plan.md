# Issue 3 — implementation and acceptance ledger

Copyright © 2026 Christopher Snow.

Owner instruction, 23 October 2026: implement issue #3 fully. The issue allows later advanced modules to remain planned; its complete initial path is the delivery contract. Existing production stays usable throughout development. Follow the separate fact brief → prose draft → built learner review → sceptic → ranked fixes → checker workflow.

## Learner and outcome

Prerequisites: files, terminal, basic code, browser. No video terminology. Produce a short playable software demo, retain the action and readable result, download its real MP4 and edit recipe, and verify it before sharing. Screen capture is optional through a labelled original recording fallback. All media stays local to the browser.

## Reader-facing wireframe

| Step | What the learner sees and does | Evidence and next artefact |
| --- | --- | --- |
| Capture | Open the original build-queue scene. Plan initial state → Sort → readable result. Start only by explicit click, choose surface, stop, replay and download. Optional shared audio is explicitly requested. Unsupported/denied capture offers the labelled original fallback. | Real MediaRecorder blob with actual MIME, dimensions/track information; persists locally across steps. |
| Build a file | Three labelled original stills with time labels. Static pictures → encoder → video stream, sound → encoder → audio stream, both → MP4 schematic. Explicitly load the local encoder, encode pictures to video-only MP4, inspect it, then add a tiny synthetic WAV and inspect both streams. Change frame rate and rerun. | Actual generated output bytes and real probe, duration/size/codec/stream evidence; playable download. |
| Inspect | Load the learner's capture or labelled original. Run real inspection only on request. Interpret measured container, picture dimensions and audio presence to diagnose a capture issue. Existing detailed frame/timing explorer is available as reference after the practical task. | Actual recording and actual inspection; fixed recorded frame evidence remains explicitly tied to its fixture. |
| Edit | Keep action and result; enter one or two source ranges, trim/encode actual input bytes, optionally join the kept ranges. Show the exact command, real probe and playable downloadable result. Existing controlled copy/encode examples explain keyframe boundaries. | Real edited MP4 from the selected recording; edit recipe and measured output. |
| Publish checkpoint | Replay the output, check text/action/result, audio expectations, playback elsewhere and file size. Download video, recipe and viewer-centred review. This is the initial complete-demo capstone; further production topics are marked planned. | Complete playable demo and reproducible recipe. |

## Architecture and limits

Canonical routes use names (`#/capture`, `#/build`, `#/inspect`, `#/edit`, `#/publish`) to avoid ambiguous renumbering. Old `#/module-0` and `#/module-2` links map to inspection/editing, including surviving section anchors. Existing lesson IDs and localStorage progress keys are unchanged. New artefacts live in IndexedDB, with clear storage-failure/session behaviour and an explicit clear-project action. Capture and worker cleanup run on unmount/navigation; pending permission results are disposed if abandoned.

Pinned single-thread encoder is built to same-origin versioned assets, loaded only on explicit processing. Verify real encode/mux/probe before relying on it. One job at a time; bounded input size, duration and output dimensions; cancellation terminates the worker and supports retry. Baseline offline manifests exclude the core and optional recognised sample. A separate explicit encoder download uses the existing service worker's scoped cache management; report lesson readiness and encoder readiness separately.

## Acceptance ledger (close only with evidence)

- [ ] Written redesign, per-existing-section disposition, static/interactive audit, independent outline review and real compatibility spike.
- [ ] Producer-first home/navigation and five usable steps, future modules honestly planned.
- [ ] Capture lifecycle, MIME negotiation, real replay/download, denied/unsupported/share-ended handling, all tracks stopped.
- [ ] Actual stills → video MP4 → audio/mux MP4, measured probe and input-change rerun.
- [ ] Own-recording inspection and real edit/export with labelled fallback.
- [ ] Meaningful static accessible filmstrip and encoding/muxing diagrams.
- [ ] Existing measured lesson evidence, grading, stored work and bookmarks preserved.
- [ ] Optional small attributed provenance-pinned Big Buck Bunny excerpt outside baseline download.
- [ ] Explicit offline encoder package/readiness and baseline reading without encoder download.
- [ ] Capture, encoding, probing, errors/cancel/retry, migration, offline, responsive/keyboard tests and full CI gate.
- [ ] Independent built reader → sceptic → fixes → checker; genuine screenshots/outputs and honest limits.
- [ ] Main deployment and live worker/core/media verification.
