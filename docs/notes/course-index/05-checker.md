<!-- Copyright © 2026 Christopher Snow -->

# Course index: independent final checker

25 October 2026. Separate checker agent; did not implement the change. Read
`AGENTS.md`, the verified brief, reader review, sceptic review and integration
record. Inspected the final product diff and the existing built preview at
`http://127.0.0.1:4173/video-lab/`; no product edits, rebuilds or preview restarts.

## Result

Pass for this bounded single-index change. No introduced blocker identified.
The reader's no-blocker conclusion agrees with independent built observations.
The sceptic's explanation of the pre-existing notebook destination-focus
limitation is supported by unchanged routing/effect code. Defer that separate
accessibility issue; do not claim this change fixes destination focus.

## Independent built checks

Ran `node /workspace/scratch/course-index/checker/check.mjs` and
`node /workspace/scratch/course-index/checker/layout.mjs`, both exit 0. Each
script used the existing preview and fresh isolated Chromium browser contexts.

At 1440 × 1000, 768 × 1024 and 393 × 851, light and dark:

- All 24 unique page links were present; no Chapters button, sidebar or menu
  remained. Normal page-link targets measured at least 44 CSS px high.
- Actually clicked the second page and the final page in chapter ten, observing
  the expected page IDs. Clicked Next and Previous and observed the destination
  page IDs. Used toolbar Course overview and browser Back through the real
  navigation history.
- Opened Files using Enter and closed it using Escape; focus returned to its
  trigger. Enter on an index link opened the expected lesson.
- Edited the first worked command; imported `checker.txt` through Files.
  Navigated via overview and the last page, returned using browser Back, then
  reloaded. The exact edited command survived. Reopening the imported file
  showed its original body, `checker content`, unchanged.
- Measured no document overflow at normal and 200% root font size. Inspected
  full-page captures and selected viewport captures, including phone dark and
  tablet light at 200%. Enlarged phone titles wrap heavily but remain readable
  and operable without clipping. At desktop normal size, content measured
  1040 CSS px wide, with equal 200 px outer margins at a 1440 px viewport.

Separate direct loads rendered the expected headings at
`#/learn/workflows/batch`, chapter-only `#/learn/framing`, legacy `#/capture`
and `#/module-0/frames`. These establish representative route compatibility;
they are not exhaustive checks of legacy exercises.

The source diff preserves existing chapter/page titles and summaries, page
IDs, previous/next links, workspace ownership and storage code. The recording
appendix's existing label is relocated intact. Reader and sceptic separately
followed the relocated appendix link successfully. Progress, App status,
offline/restart guards and processing code are unchanged; this checker did not
re-execute their full behavioural suites.

## Evidence and limits

Scripts, `results.json`, six full-page normal and six enlarged screenshots,
and six enlarged viewport captures are outside the repository under
`/workspace/scratch/course-index/checker/`. Review findings are based on the
built page and source diff, not solely the author's test claims. Only this
review note was written in the repository; unrelated notes were preserved.

This independent check is bounded Chromium coverage, not a screen-reader,
Firefox, native zoom or full-quality-gate claim. Root-font enlargement is the
200% mechanism used here. The builder owns the five-project focused browser
run and full `npm run check` results; this pass did not duplicate that suite.
