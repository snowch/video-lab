# Early notebook source audit

Copyright © 2026 Christopher Snow.

Independent source audit of the first 13 notebook pages, in the teaching order defined by `src/notebook/structure.ts`. Read AGENTS.md and `01-plan.md`, every authored field on these pages (including hints and check limits), their actual worked/starter/reference commands, and the surrounding rendering and figure copy. This is a source review, not a claim of built-site validation. No production files, tests or commits were changed.

## Coverage: 13 of 13 assigned pages

| Order | Page | Teaching-context result |
| --- | --- | --- |
| 1 | `first-edit/shorten` | Concrete five-second example, three-second practice, named source/output, explanation of `-i`/`-t`, replay and sound criteria. No retained gap. |
| 2 | `first-edit/start` | Start plus duration explained with arithmetic; practice asks for an end position deliberately, then supplies progressive subtraction hints and source comparison. No retained gap. |
| 3 | `inside-video/inspect` | Bare ffprobe command, annotated supplied report, definitions and exact practice fields to read. No retained gap in this page; shared optional codec guide is audited separately. |
| 4 | `inside-video/streams` | Explicit `-an`/`-vn`, output log section, full source duration and distinction between absent audio and silent audio. No retained gap. |
| 5 | `frames-time/rate` | Input/output pace distinction, filter syntax, known frame counts, named comparison and specific motion/sound effects. No retained gap. |
| 6 | `frames-time/timestamps` | Time base/ticks defined, mixed audio/video output explained, supplied successive video times identified, two-interval calculation scaffolded. No retained gap. |
| 7 | `image-video/hold` | Loop placement/value and finite duration taught; pixel format has a working default and an optional reference. No retained gap. |
| 8 | `image-video/sequence` | Supplied-file exercise and timing are actionable; optional preparation of personal pictures has retained finding E1. |
| 9 | `image-video/animation` | Supplied drawing rate/output frame rate distinction, visible arc and repeated-frame arithmetic are actionable; personal-sequence pixel-format requirement is part of E1. |
| 10 | `image-video/overlay` | Alpha, canvas coordinates, default placement and 40-pixel practice explained; optional SVG workflow gives concrete dimensions/export/import/replacement/replay steps. No retained gap. |
| 11 | `cut-join/copy` | Decoder/encoder/copy distinction, concrete supported combination, mapping-log evidence and replay criteria supplied. No retained gap. |
| 12 | `cut-join/keyframes` | Choice between copy and rebuilding justified by dependencies; known limitations and recorded durations distinguished from visual start checks. No retained gap. |
| 13 | `cut-join/join` | Inputs, graph ordering, stream labels, maps and concat fields explained; explicit cut times and sound criteria. Other-file preparation is a scope boundary, not a retained gap. |

## Ranked retained findings

### E1 — Medium: optional personal-image sequence requires preparation without a complete starting procedure or inspection check

Evidence:

- `src/notebook/pages/image-sequence.ts:9`: “For your own pictures, prepare matching dimensions and PNG format, then give them consecutive numbered names. Files supports renaming; importing unrelated pictures does not prepare a sequence.”
- `src/notebook/pages/image-animation.ts:13`: “Keep the canvas size fixed, draw successive positions and export matching PNGs … export all drawings with matching dimensions and pixel format.”

The supplied exercises work and need no expansion. The personal-image guidance, however, asks the learner to perform a media preparation operation it does not show. The nearby supplied size gives a reasonable size to reuse; the missing part is a preparation method for differently shaped personal photos. The animation paragraph does name an external drawing tool and fixed canvas, so the remaining gap there is narrower: the learner is told to ensure a matching pixel format, but has no export setting or inspection criterion. PNG is a file format and does not itself establish equal pixel formats across files. The earlier hold page defines pixel format; that definition explains the concept but does not teach how to inspect or prepare these input images.

Context checked before retention:

- The pages precede the framing chapter. Earlier lessons do not show resizing/cropping/padding arbitrary personal still images.
- Files supports import, rename and previews; it has no picture resize/convert operation or displayed pixel-format inspector. Renaming to `.png` is not conversion. The existing warning correctly prevents that misconception but does not provide the positive next action.
- Linked optional format/pixel-format guides explain storage, transparency and formats, rather than a personal-sequence preparation procedure.
- The later optional SVG workflow is a useful local precedent: it gives an external-editor path, a concrete canvas size, a precise export instruction and a visible check without becoming an editor manual.

Suggested concise fix: keep the personal-image extension optional and give one concrete path. Use a fixed 640 × 360 canvas in one image/drawing editor, arrange each picture on that canvas and export every frame with the same PNG colour-mode/bit-depth settings and consecutive names. Preserve the source pictures. For differently shaped photos, say to fit the whole photo inside the canvas and retain the surrounding space rather than asking learners to choose an unexplained transformation. Add an inspection action using the already-taught bare ffprobe command on each imported PNG; identify the width × height and pixel-format text on the Video line and require those values to match. Verify the suggested export/inspection wording against actual tool output before drafting it. Do not imply that the output `-pix_fmt yuv420p` repairs arbitrary input-sequence incompatibilities.

This is one shared preparation gap across two pages, not two separate defects. Priority is below the requested codec/export decision fix because it affects an optional personal-media extension, not the graded supplied-file path.

## Rejected candidates and why

- **Every “compare” needs more detail.** Rejected. The early pages normally name the files, moment, interval or property and expected difference. Rate comparison asks for larger motion steps with unchanged sound pace; slideshow comparison names picture order and change times; cut comparisons name the exact source time. These are observable instructions, not outsourcing a decision.
- **Exact cut matching needs frame-step UI or another probe command.** Rejected for this task. Replay uses native video controls, source playback is available beside the lesson, and start/end times are explicit. The course correctly says duration alone cannot verify the selected source moment. More precise frame tooling would be a feature request, not necessary to make the current novice action understandable.
- **The first edit must explain H.264/AAC encoders immediately.** Rejected. Its goal is a minimal duration edit; file/input/output and `.mp4` are explained. Inside-video and later chapters introduce the media mechanisms progressively. This audit does not demand that an early working default become a codec-choice lesson.
- **The second streams example omits `-i` from its option list.** Rejected. The full actual command is rendered in its editable cell; the first example teaches the shared input. The second option list explains changed/new parts. No command construction depends on guessing a missing command.
- **Mixed timestamp output prevents the timing exercise.** Rejected. The worked text explicitly identifies a run of successive video times near the end and warns against subtracting every adjacent mixed entry. Practice uses video summary values, names the first stream and shows both the seconds and tick calculations through hints.
- **Stream-copy container compatibility is an unexplained destination choice.** Rejected on `cut-join/copy`. The lesson names the actual combination: MP4 with H.264 and AAC. It gives an editable working command and asks for another supplied MP4, not independent compatibility research. Broader codec selection belongs in the separately assigned shared guide/export audit.
- **“Other files may need preparation” in join must teach normalisation.** Rejected. The paragraph explains exactly why the supplied pair can join directly: sizes, rates, audio layouts and zero starts. Both worked and practice tasks use that prepared pair. It does not instruct the learner to prepare arbitrary files or promise a universal join command. Adding a full normalisation workflow would exceed this page's requested operation.
- **The 40-pixel overlay check needs an automatic drawing-position measure.** Rejected. The coordinates and their direction are taught, the supplied drawings are visible, the expected relative placement is stated, and the check limit accurately discloses what is manual. The optional SVG workflow also has explicit export dimensions, transparency and replay criteria.
- **Brand-registry advice is unexplained mandatory external research.** Rejected. It is in a collapsed optional metadata explanation, identifies the registry and exact object to look up, and is unnecessary to describe the supplied file. The text also explains why brand declarations do not prove conformance.

## Rendering context inspected

Read `Notebook.tsx`, `Cell.tsx`, `FileManager.tsx`, `ExampleDiagram.tsx`, `visuals/ConceptVisual.tsx`, `visuals/InspectDiagrams.tsx`, `visuals/ImageVisual.tsx`, and the relevant inspection/time/image/media/SVG/UI string files. Confirmed source preview/source selection, complete editable commands, actual inline result replay/download, option definitions, observations, progressive hints/reference commands and explicit check limits. Figure captions distinguish supplied examples/models from the learner's output. This source context rejects gaps that would appear if only page option excerpts were read; it does not substitute for the later independent built-page review.

No checks run: this change records an audit only. Unrelated untracked notes were preserved.
