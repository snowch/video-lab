# Fresh learner review: reference card and optional SVG workflow

Copyright © 2026 Christopher Snow.

Reviewed 28 October 2026 by an independent reader agent against the built preview at `http://127.0.0.1:4187/video-lab/`. Read `01-facts.md` for scope; did not inspect production implementation or change it. Used standalone Node scripts importing installed Playwright, without Playwright CLI or global setup.

## Result

No justified blocking or minor learner findings in this slice. No fixes proposed. The following quoted observations explain that conclusion rather than inventing defects.

| Quoted page text | Severity | Observation and direction |
| --- | --- | --- |
| “Appendices and reference” / “Optional guides to terms, codecs, formats and recording your own source.” | None | The single unnumbered card visibly follows chapter 11 and matches the chapter-card treatment. Its four links remain separate and clearly named; keep this grouping. |
| “Use your own SVG drawing (optional)” / “After the supplied practice” | None | The heading is easy to identify while reading the overlay page and explicitly separates this extension from the supplied task. It does not require installing a drawing editor to continue the course; keep the optional wording and placement. |
| “SVG can describe vector shapes: lines and curves stored as drawing instructions.” | None | Defines the relevant prior concept when introduced. “Can describe” does not claim SVG contains only vector content. |
| “Export the entire page or canvas as a PNG at 854 × 480 pixels with a transparent background.” | None | Specifies export dimensions, transparency and full-canvas positioning. The adjacent warning that white is opaque makes the effect on footage understandable. |
| “In the existing worked command, replace annotation.png … and annotated.mp4 with a new output name” | None | Gives a concrete adaptation while preserving supplied filenames. I followed it with `my-annotation.png` and `my-annotated.mp4`; actual browser FFmpeg completed successfully. |
| “The practice check is for the supplied annotation; use the replay to assess your own drawing.” | None | Clearly bounds automated assessment and gives an appropriate observation task for arbitrary artwork. |

## Browser evidence

Evidence directory: `/workspace/scratch/reference-svg/reader/`.

- `review.mjs` and `matrix.json`: desktop 1440 × 1000 and phone 390 × 844, each in light and dark via the app theme control. The reference card and SVG section were visually inspected in screenshots. No horizontal overflow on overview, overlay or the four reference destinations in any combination.
- All four overview links opened the expected routes and headings: `#/glossary`, `#/appendix/codecs`, `#/appendix/formats`, `#/appendix/recording`. Browser Back returned to overview every time. The overlay “Media file formats (optional)” link opened formats and browser Back returned to overlay in all four combinations.
- `*-references.png`, `*-svg.png` and `*-focus.png` record the matrix. Initial focus checks were programmatic; they establish focusability and Enter activation, not visible keyboard focus.
- `keyboard.mjs` additionally used real Shift+Tab/Tab on all four overview links and the overlay formats link in desktop light. `desktop-light-keyboard-reference.png` and `desktop-light-keyboard-svg.png` show visible focus rings. A later theme-toggle lookup in that supplementary script timed out, so its remaining keyboard combinations are unverified; this is a harness limitation, not evidence of a page defect. The main four-combination navigation/layout run completed successfully.
- `my-annotation.svg` is an original tiny arrow/ring drawing. Browser rendering produced transparent `my-annotation.png` at 854 × 480. `imported.png` shows it imported through Files beside preserved `annotation.png` and `bunny-short.mp4`.
- Ran `ffmpeg -i bunny-short.mp4 -i my-annotation.png -filter_complex overlay my-annotated.mp4` in the existing worked cell. `run-result.txt` records “Command completed”, the RGBA PNG input, 854 × 480 output video and source audio mapping. `files-result.txt`, `custom-command-result.png` and `output-files.png` record the generated output and preserved supplied inputs.

## Limits

This is a focused reader review, not a full course regression run. Export was browser-rendered from an original SVG rather than performed in Inkscape; external editor menus differ. The real adapted command was exercised on desktop light. No claim is made here to have listened to sound or played the generated custom output end to end. Its FFmpeg log verifies the audio stream and encoded output; the optional prose correctly directs the learner to assess appearance and sound themselves. No production edits or commits made.
