# Video Lab — course plan

Copyright © 2026 Christopher Snow.

**Status, 23 October 2026:** the initial five-step capture-to-export path is implemented. The final local quality gate has passed; reviewed deployment and public verification follow in the release record; [the acceptance ledger](notes/issue-3/acceptance.md) records closure evidence. The [redesign record](notes/curriculum-redesign.md) explains the individual retained sections and migration.

## Purpose and prerequisites

Help a software or data engineer make a short demo whose action and result a viewer can understand. The learner needs ordinary browser/file skills; terminal and code familiarity help with optional command evidence. Media terms are introduced beside the operation that needs them. Capture is optional: a labelled original recording supports the same real edit/export path.

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

Processing and media stay local. One operation runs at a time; cancel/navigation terminates it and supports retry. Exercise imports are bounded to 20 MiB; editing requires inspected timing within 30 seconds and supported dimensions. The engine has separate 32 MiB total-input and 120-second processing bounds. Project media uses browser storage with explicit session-only fallback and clear-project control. Download important work.

Offline lessons and the approximately 32.4 MB additional processing package have separate manifests/readiness. Encoder and optional comparison media are excluded from the baseline. Installation does not imply either download is complete. GPL/MIT notices and exact source references accompany the shipped optional core.

## Delivery and remaining work

The Issue 3 owner request authorises the complete initial path while allowing advanced modules 4–7 and 9–10 to remain planned. The first produced demo now belongs to Publish, module 8; the later Final project does not make that outcome provisional.

Separate verified-fact drafting and outline review preceded implementation. The built reader completed an actual provided-source → Build → Inspect → Edit → Publish run and recorded findings, not blanket approval. The sceptic and checker independently verify ranked fixes, including actual downloaded recipes and the sparse-picture timing regression. The final local `npm run check` passed 54 unit and 105 browser tests; public Pages verification is recorded after deployment. See [reviews](notes/issue-3/review/) and [acceptance](notes/issue-3/acceptance.md).

Later production topics must arrive as independent tested slices. Do not describe future filter/audio/caption/AI controls as implemented. Use primary sources and original teaching; the photographed tutorial is a topic inspiration, not a repository source to copy.
