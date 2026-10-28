# Formats and image video — independent built-site reader review

Copyright © 2026 Christopher Snow.

Separate reader agent, 28 October 2026. Read `AGENTS.md`, then the actual built lessons before author facts or rationale. Used an independently started preview on port 4181 and standalone Chromium Playwright scripts; no product edits, rebuild, Playwright CLI/global setup or commit. This records the original build reviewed before the builder's pending copy/credit fixes; verification of the rebuilt fixes belongs to the checker.

## Findings

### F1 — medium: overlay position syntax is a missing practice prerequisite

On `#/learn/image-video/overlay`, the concept correctly explains that “The x coordinate increases to the right; y increases downwards.” The worked option is only `-filter_complex overlay`, described as placing the canvas at default `x=0, y=0`. Practice then asks the learner to “change the filter’s position settings” to shift 40 pixels right.

Neither concept nor worked example shows how to write those settings. The syntax first appears in hint four: “Write the coordinates after overlay=, separated by a colon: 40:0.” A learner who understands the coordinate concept still has to request four hints to discover the required punctuation, or already know FFmpeg's filter syntax. The general rule and the exercise answer arrive together.

Direction: teach the general `overlay=x:y` notation and parameter order before practice, leaving the learner to choose the values. Preserve the short worked command and explicit default position. Evidence: `overlay.txt`, `overlay-hints.txt`, `overlay-hints.png`, and phone/desktop overlay screenshots under the artifact directory below. This is a teaching prerequisite finding, not an execution failure; `overlay=40:0` genuinely produced the shifted output.

### F2 — low: unrelated Bunny credits compete with the actual image provenance

The hold, sequence and animation pages end with “Big Buck Bunny © 2008 Blender Foundation” and an explanation of excerpts, downmixed sound and subtitle text, although these pages use a photograph or original drawings and produce silent video. On the photograph page, this competes with the correct, prominent Hannes Röst/CC BY-SA credit. On the drawing pages it adds an unrelated source immediately after exercises about original drawings.

The source notes make the real origins recoverable, so this is not an established false attribution. It is avoidable provenance ambiguity and reading noise. Direction: render the Bunny asset credit on pages actually using those assets, while retaining the photograph credit/licence and original-drawing provenance. Evidence: `hold.txt`, `sequence.txt`, `animation.txt` and their full-page screenshots.

No other justified finding. The sequence source note's own-image preparation advice is conditional and useful for understanding consecutive names. Moving it after the worked example would be an editorial option, not a necessary fix established by this review.

## Executed coverage

Artifacts are outside the repository at `/workspace/scratch/formats-images/reader/`. `run.mjs` and `results.json` record all four `#/learn/image-video/{hold,sequence,animation,overlay}` pages at desktop 1440 × 1000 and phone 393 × 851, each light/dark: 16 page/layout cases, each with real worked and corrected-practice WASM execution. All 32 runs completed, all 16 corrected-practice metadata checks passed, inline video replay advanced, and no uncaught page error or horizontal document overflow was observed.

Used the command builders, changed the duration/input rate/overlay filter, selected Apply to command, checked the complete resulting editor command, ran it, copied the worked command and downloaded its `.sh` record. Source preview controls, numbered source thumbnails, actual image loads, wrapped output, first hint, reference-command disclosure, Files dialog and output downloads were exercised. The first harness pass switched away from edited builder values without applying them; the unchanged starters consequently ran and the duration/rate checks correctly rejected the first three tasks. This was a reviewer workflow mistake, not a builder defect. The overlay starter passed its metadata check, consistent with the page's explicit warning that placement is not measured. Corrected runs used Apply and passed. Earlier starter observations remain in `starter-results.json`.

Downloaded all eight desktop-light worked/practice videos. Native `ffprobe -v error -show_format -show_streams -of json <file>` independently measured:

| Lesson | Worked / practice duration | Video frame counts | Other properties |
| --- | --- | --- | --- |
| Photograph | 5 / 3 seconds | 125 / 75 | 640 × 360, 25 fps, no audio |
| Slideshow | 6 / 3 seconds | 144 / 72 | 640 × 360, 24 fps, no audio |
| Animation | 2 / 1 seconds | 48 / 24 | 640 × 360, 24 fps, no audio |
| Overlay | 8 / 8 seconds | 192 / 192 | 854 × 480, 24 fps, video and audio |

All eight decoded successfully with native `ffmpeg -v error -xerror -i <file> -f null -`. Extracted actual first/end frames with native FFmpeg and visually inspected representative outputs: the photograph remains a photograph; sequence/animation end at the right-hand ball; the overlay retains the orange marks and the practice marks visibly move right. `native-summary.json` and `*-worked/practice-start/end.png` preserve that evidence. Browser replay was brief and muted; this does not claim full-duration viewing or audible review. Native full-file decode and audio-stream presence do not establish subjective sound quality.

On phone dark, `files.mjs` downloaded an actual drawing PNG, imported those bytes as `my-drawing.png`, renamed it through Files to `mine-01.png` and opened its 640 × 360 preview. `files.json` and `files-import-preview.png` record this. Broader folder/ZIP/deletion operations were not retested as part of this slice.

`guide.mjs`/`guide.json` cover `#/appendix/formats` in all four viewport/theme combinations, plus glossary searches for Alpha channel, Image sequence, Raster image and Vector graphic, each Learn more link and browser Back. Formats links to the codec guide, file-inspection lesson, photograph lesson and export lesson landed on their intended routes. External source links were inspected as references, not all fetched or independently audited. Course pages were reached directly and through these internal links; every footer Next/Previous control was not independently exercised.

## Learning and visual assessment

The progression photograph → slow sequence → authored animation → overlay has useful changed examples and practice. Loop versus finite duration, input versus output rate, repeated copies versus new positions, canvas coordinates and alpha are explained where needed. “The fps filter does not draw intermediate motion” is supported by the source drawings and real generated outputs. Source thumbnails are expressly labelled as supplied pictures, not fabricated timing measurements or processed frames. Actual output video is produced only by running the commands.

The formats guide distinguishes extension, container and codec, and says “These are general format choices, not a list of formats this notebook can create.” It keeps import/storage, processing and preview capabilities separate, includes destination testing and alpha-loss limitations, and labels external sources as requiring a connection. The new glossary definitions link back to useful concrete lessons.

Full-page and cell screenshots were captured for every lesson/layout combination; representative screenshots across all four lessons, both sizes and both themes were visually inspected. Phone controls wrap while retaining the complete command, raw result and replay; source sequences remain distinguishable. The formats cards stack on phone. No additional legibility, clipping or fabricated-media issue was established.

Limits: Chromium and simulated phone input only; no physical touch, screen-reader, Firefox, new offline/update run, import of an independently authored sequence, exhaustive keyboard traversal or full subjective audiovisual comparison. Existing shared app controls were sampled as described, not claimed exhaustively revalidated. The separate sceptic and checker must adjudicate findings and rebuilt fixes; this reader did not author the implementation.
