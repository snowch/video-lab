# Independent reader and copy pass — lesson alignment

Copyright © 2026 Christopher Snow.

Reviewed the existing built site at `http://127.0.0.1:4173/video-lab/` on 26 October 2026, before the alignment fix was built. This reviewer did not edit product code or rebuild the site. The review covers layout and the wording implicated in the report; it does not claim to revalidate media facts or run every processing command.

## Route and evidence

The page titled **“Read the file description”** has ID `inside-video/inspect` and URL `#/learn/inside-video/inspect`. The source route parser does not recognise `inside` as a chapter: the literal abbreviated route `#/learn/inside` falls back to the first chapter. Review used the actual page ID, rather than attributing the inspection page to that abbreviated address.

Browser measurements cover all 24 available notebook pages at desktop 1440 × 1000, tablet 1024 × 900 and phone 390 × 844, in light and dark themes: 144 page/viewport/theme observations. Additional target-page checks at 768, 820 and 834 pixels wide in both themes reproduce the more specific tablet complaint. No document-level horizontal overflow was measured in the 144-page sweep.

Scripts, measurements and screenshots are in `/workspace/scratch/lesson-alignment/reader/`:

- `review.mjs`, `measurements.json` and `batch-measurements.json`: all 24 pages; `workflows/batch` is in the second measurement file because it is defined using a nested `page(...)` call.
- `tablets.mjs` and `tablets.json`: additional tablet widths.
- `tablet820-light-inside.png` and `tablet820-dark-inside.png`: reproduced source-action placement.
- `desktop-light-inside-video-inspect.png`, `tablet-light-inside-video-inspect.png`, and `phone-dark-inside-video-inspect.png`: comparison across sizes.
- `tablet-{light,dark}-<chapter>-<page>.png`: full-page baseline images for every notebook page.

## Findings

### R1 — medium: source setup action separates from its instruction at some tablet widths

At 820 pixels, **“Load the files for this page. Existing files are kept.”** starts at x=20 and occupies a 567.42-pixel paragraph box. **“Load practice files”** starts at x=603.42 and is 180.89 pixels wide. The button sits beside the short instruction at the outer edge of the lesson, rather than following its text in the reading column. The same placement occurs at 834 pixels in both themes.

This is breakpoint-sensitive: at 768 pixels the action wraps to the left beneath the note; at 1024 and 1440 pixels the note joins the source name row and the action again wraps left. The floating placement is real, but is not universal across all tablets. Direction: give the source label/name, explanatory note and action a stable reading order and put the loading action beneath its instruction. Keep the existing wording and file-preservation promise.

### R2 — medium: the tool label is detached from the cell heading

On the inspection page, **“Inspect without editing”** ends at x=221.38 in the 820-pixel viewport, while **“ffprobe”** begins at x=739.34. The 517.96-pixel gap makes the tool label look like unrelated page metadata. **“Try it yourself”** has the same problem. At 1440 pixels the worked heading ends at x=401.38 while the tool label begins at x=1179.34.

Every available page uses the same cell-header layout, so the separation recurs for **“ffmpeg”** and **“ffprobe”** in worked and practice cells. Direction: keep the tool label close to the heading and allow sensible wrapping for long headings. Phone currently hides this label at widths below 600 pixels; there is no detached badge in the checked phone view.

### R3 — medium: shared prose and work areas form inconsistent right edges

On the target page at 1440 pixels, the concept column is 567.42 pixels wide while the command editor is 1040 pixels wide. At 1024 pixels those widths are 567.42 and 984; at 820 they are 567.42 and 780. Their left edges agree, but the wide editor, checks, notes, source preview region and page navigation extend well beyond the explanatory reading column. The tool label emphasises the distant outer edge. The result is a visibly narrow reading strip beside broad unused lesson space.

All 24 pages share this structure; the mismatch is present across all ten chapters and both themes. It also affects pages with diagrams, explanatory option lists and the native script section. At 390 pixels the measured concept and editor widths both become 358 pixels, and this particular mismatch disappears.

Direction: use a consistent, centred lesson column for the prose and its related actions, editor, diagrams, results, notes and continuation. Preserve the existing readable prose measure and make command/log content wrap or scroll inside its own component as appropriate. Avoid solving the mismatch by stretching paragraphs across the existing 1040-pixel work area.

## Full-page coverage

Reviewed the shared geometry and complete tablet screenshots for:

| Chapter | Pages |
| --- | --- |
| first-edit | shorten, start |
| inside-video | inspect, streams |
| frames-time | rate, timestamps |
| cut-join | copy, keyframes, join |
| framing | scale, crop, pad |
| sound | level, fade |
| text | title, subtitles |
| quality | quality, speed |
| export | format, faststart, verify, decode |
| workflows | reuse, batch |

The checked light and dark layouts have the same geometry. The phone versions retain the same lesson substance and show wrapped action rows without horizontal page scrolling. This review found no separate page-specific alignment defect that requires a new layout pattern.

## Separate copy/drafting judgement

Verified the relevant strings in `src/notebook/ui.strings.ts`, `src/notebook/pages/inside-video-inspect.ts` and the rendered page. **“Practice source”**, **“Load the files for this page. Existing files are kept.”**, **“Load practice files”**, **“Inspect without editing”**, **“Try it yourself”**, and **“ffprobe”** correctly describe their current roles. The introductory command is visibly `ffprobe bunny-short.mp4`, and the explanation says it reports the file contents without creating an edited copy. None of the reported layout problems supplies evidence that this wording needs changing.

Recommendation: no copy changes for this slice. Use layout changes to repair proximity and column consistency. Keep the lesson text, commands, options and learning checks intact. This is a distinct copy review from the builder's CSS implementation; no replacement prose is needed.
