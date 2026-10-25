# Notebook readability — separate prose draft

Copyright © 2026 Christopher Snow.

This is the separate `readability_prose` drafting pass required by `AGENTS.md`, using the builder's verified fact brief. It is an authoring record, not an independent built-page review.

## Scope and draft

Changed only `src/notebook/pages/first-edit-shorten.ts` and `src/notebook/pages/first-edit-start.ts`. No commands, filenames, page IDs, checks or storage behaviour changed. Other pages remain for the agreed course-wide audit after integration.

The opening page now has exactly three option entries:

- `-i bunny-short.mp4` — Read the source
- `-t 5` — Keep the opening five seconds
- `first-cut.mp4` — Save the new video

Its short context retains FFmpeg as a command-line media tool, source/input, new file/output, duration and the MP4 filename extension. The replay instruction and result explanation retain picture and sound at their original pace. Independent practice still asks for the opening three seconds, with five hints and the existing check limitation.

The source introduction identifies Big Buck Bunny as an animated short film rather than assuming the learner knows it. The start page distinguishes start from duration once, removes the duplicate worked introduction, and retains the important placement rule: post-input `-ss` reads picture and sound and discards the material before the requested start. This avoids introducing decoding terminology before the later codec lessons. Its output-clock explanation remains separate from the selected source positions. Source second 2 plus four seconds still reaches source second 6; practice remains source seconds 1–4.

## Recommended UI labels

These are the labels agreed during integration; this drafter reviewed their wording but did not edit UI strings or structure.

- `Planned cut · 0–5 s (5 s)` for the explanatory timeline. The positions and duration represent the current supported command before execution.
- `Keep · bunny-short.mp4 · 8 s` identifies the kept span, input filename and full source duration alongside the timeline.
- `Original example notes` for static options and observations when the command differs from the example. The dynamic planned cut stays outside those notes.
- `Run` for command execution; retain `Command output` for genuine raw tool output.
- `Replay` for the actual produced media, keeping its filename visible.

Avoid an extra paragraph repeating the selected range if the labelled timeline already displays it. Command, Run and raw output should remain contiguous; this copy does not require an explanatory block between them.

## Sources and factual boundaries

- Builder's verified brief: supplied `bunny-short.mp4` is eight seconds; worked commands are `ffmpeg -i bunny-short.mp4 -t 5 first-cut.mp4` and `ffmpeg -i bunny-short.mp4 -ss 2 -t 4 later.mp4`; first practice is three seconds. Current simple-command timeline is conditional on a hash-verified supplied input, and unsupported options hide it.
- `docs/notes/notebook/01-plan.md` and `media.json`: source provenance, licence and measured supplied-media properties.
- `docs/notes/notebook/commands.json` and `commands-wasm.json`: both exact worked commands occur in recorded native/browser evidence. This pass inspected those records' command identities; it did not rerun processing or certify new media measurements.
- Existing verified start-page explanation supplies the post-input `-ss` decoding/discarding distinction; the shortened text preserves that mechanism and does not generalise it to input seeking or stream-copy cuts.

The timeline is an explanatory model of the recognised current command, not rendered media or evidence that a run succeeded. The fixed goal, static source note and static options describe the supplied exercise; arbitrary edited commands do not inherit those claims. A duration/stream check cannot establish the selected content or audibility, so replay remains necessary. No independent review of these edits or all-page readability audit is claimed here; the builder owns integration, built-page reader/sceptic/checker review and full required checks.

Draft validation: `npx prettier --check src/notebook/pages/first-edit-shorten.ts src/notebook/pages/first-edit-start.ts docs/notes/readability/02-prose.md` passed. No tests or built-site review were run by this prose drafter.

## Export picture-storage follow-up

The reader and sceptic identified the `export/format` pixel-format option as a dense row introducing several concepts at once. This follow-up changes only `src/notebook/pages/export-format.ts`: the connected concept prose now introduces Y/luma, U and V colour differences, planes as arrays of samples, the planar `p` suffix, 8-bit samples and two-axis 4:2:0 sampling before the command. The option row states the concrete choice: “Store the output pictures as yuv420p.” The explanation occurs once rather than being repeated in the row.

The original limits remain: colour sampling does not set picture dimensions or frame rate; chroma subsampling can soften fine coloured edges; this encode is not an isolated comparison of that effect. The source already has the chosen formats, and successful browser playback does not establish compatibility with the destination player. No commands, exercises, technical checks or explanatory models changed.

Read the current page, `src/notebook/structure.ts` export/format entry and canonical `docs/notes/notebook/media.json`, `commands.json` and `commands-wasm.json`. The supplied source metadata records H.264, yuv420p and eight seconds; native and WASM records contain the unchanged `compatible.mp4` command with libx264, yuv420p and AAC. This is a relocation and clarification of the existing verified concepts, not a new processing or compatibility claim. No tests or processing runs were made for this prose-only follow-up; the builder owns integrated validation and independent checking.
