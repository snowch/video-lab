# Independent final checker: visual format references

Copyright © 2026 Christopher Snow.

Checked 29 October 2026 by a separate agent who made neither the implementation nor the ranked fixes. Read `AGENTS.md`, `01-plan-facts.md`, `03-reader.md`, `04-sceptic.md` and `05-fixes.md`. No production files edited and no commit made. **R1 and R2 pass final verification; no substantive factual or usability blocker found in this slice.**

## Actual built-site evidence

Used the installed Playwright library from standalone Node scripts against `http://127.0.0.1:4188/video-lab/`, without invoking the repository's Playwright CLI while the builder's targeted suite was running. Tested the actual routes `#/appendix/formats`, `#/appendix/formats/video-containers` and `#/appendix/formats/pixel-formats` at desktop 1440 × 1000 and touch phone 390 × 844, each in rendered light and dark themes.

The initial complete matrix loaded `assets/course-BAnKRss6.js`. Captured and visually inspected all twelve full-page screenshots, sampling states, alpha states and opened details. After the builder removed the last repeated renaming clause from the encoding note, independently reloaded and recaptured the container page in all four contexts. Those final container checks loaded **`assets/course-Bnt87bNx.js`**. The later change was one prose-clause removal; earlier pixel/control and overview evidence remains applicable.

Evidence and reproduction scripts are in `/workspace/scratch/visual-formats/checker/`:

- `check.mjs` and `observations.json`: complete page/viewport/theme matrix, controls, computed styles, reloads and enlarged-text checks; `<page>-<device>-<theme>.png` and related state screenshots.
- `navigation.mjs` and `navigation.json`: real home/reference/lesson links, focus, pointer alpha, touch, command draft survival and element-local magnifier screenshot coordinates.
- `latest-container.mjs` and `latest-container.json`: latest-bundle R2 prose assertions and `video-containers-<device>-<theme>-latest.png` screenshots.
- `magnifier-<device>-<theme>.png`: original-resolution rendered source/enlargement, used for independent screenshot pixel comparisons.

## Ranked fixes

**R1 — verified.** The source is a 4 × 4 illustrative picture with the top-left 2 × 2 group outlined. Its first, second, fifth and sixth source cells match the four enlarged cells in the same row-major order. All four viewport/theme combinations have identical computed background colours. Independently sampled interior pixels from each element-local screenshot also match exactly, rather than merely comparing shared model values:

| Position | Source and enlarged screenshot RGB |
| --- | --- |
| Top left | 167, 204, 186 |
| Top right | 244, 211, 154 |
| Bottom left | 56, 100, 76 |
| Bottom right | 113, 150, 76 |

The selection visibly encloses those four positions, and the caption accurately identifies the model as an illustrative enlargement. The original source/enlargement inconsistency is resolved.

**R2 — verified on the final bundle.** There is one complete remux definition before the stream-copy diagram. The former repeated “Remuxing writes encoded streams…” definition is absent. The Extension block contains the sole renaming warning: “Renaming a file does not convert its bytes.” The separate note retains both unique facts: “Changing a codec requires encoding. An output suffix can help FFmpeg choose its writer.” The comparison still carries H.264 and AAC unchanged from MP4 into Matroska, with compatibility and receiving-player qualifications. Visually checked the latest container screenshots as well as asserting the actual rendered text.

## Controls, reading and navigation

- Pointer clicks and phone taps select all three sampling modes; native keyboard ArrowLeft changes 4:2:0 → 4:2:2 → 4:4:4. The visible status text updates with the selected pattern. Actual DOM counts are Y/U/V = 4/4/4, 4/2/2 and 4/1/1. Computed row/column layouts show the expected horizontal and vertical grouping. Y remains a 2 × 2 grid with unchanged dimensions in every mode: approximately 161.80 px square on desktop and 105.33 px square on phone. The caption explicitly retains picture width/height and limits the diagrams to counts/grouping.
- The alpha range's actual keyboard values 0, 0.95 and 1 agree with both foregrounds' computed CSS opacity. The visible numeric label reports 0.00 transparent, 0.95 partly transparent and 1.00 opaque. Screenshots show the foreground absent at zero, nearly opaque at 0.95 and opaque at one. Pointer/touch at a quarter of the slider also changes its actual value. The two backgrounds remain visible comparison contexts, and the caption accurately identifies CSS rendering rather than a codec measurement.
- “Precision and storage layout” opens with Enter and pointer/touch, revealing the planar/precision explanations and format examples. Essential definitions and instructions precede the primary controls; the collapsed detail is optional.
- Followed the course overview's direct Video containers link, containers → pixel formats → media formats → Explore video containers, and the real “Read the file description” lesson link. Settled routes/headings are correct; reference navigation focuses the h1. Direct page entry and reload work for all three routes in all four contexts.
- Authored a distinct command draft in the actual inspection lesson for each viewport/theme context, used the course overview and pixel-reference links, then browser Back twice. Each draft survived Back and lesson reload. No command execution was needed.
- No horizontal page overflow in any of the twelve normal-size combinations or after setting the document root font size to 200% (computed 32 px). Enlarged-text screenshots retain wrapping and legible content; the phone diagrams preserve their learning substance. This is a text-enlargement check, not a claim to have tested every browser's native zoom implementation.
- No page errors observed. Reference reading and this unexecuted lesson-draft navigation requested no `/encoder/` assets, FFmpeg core or WASM payloads. The navigation checks used fresh normal service-worker contexts; the complete screenshot matrix blocked service workers to inspect the current build directly.

## Scope and limitations

The retained conceptual qualifications remain useful: stream boxes show membership rather than byte positions; sampling grids show counts/grouping rather than measured colours or chroma siting; CSS opacity is explicitly distinct from codec alpha behaviour. The three focused reference pages introduce their required terms before the corresponding diagrams. No extra learning prerequisite or contradictory mechanism found.

Commands run for this review: `node /workspace/scratch/visual-formats/checker/check.mjs`, `node /workspace/scratch/visual-formats/checker/navigation.mjs` and `node /workspace/scratch/visual-formats/checker/latest-container.mjs`, plus local Pillow screenshot-pixel inspection. A first navigation harness run used an ambiguous heading selector that matched both h1 and h2; scoping it to level 1 corrected the harness and the complete rerun passed. An initial screenshot sampling attempt used viewport coordinates against full-page captures; element-local captures corrected that coordinate mismatch, and all four independent pixel comparisons passed.

This is independent final browser verification of the slice and ranked fixes. It does not assert the full `npm run check`, CI result or deployment; those remain the builder's separately recorded quality gate.
