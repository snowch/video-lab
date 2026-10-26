# Implementation

Copyright © 2026 Christopher Snow.

The notebook copy schema now accepts optional further-reading page IDs and an authored title. Only Chapter 2’s first page opts in. The renderer uses existing destination page titles and chapter order to construct native anchors, avoiding duplicated titles/numbers. The group appears after the page’s practice, before notes and normal continuation. It uses the existing touch-sized link list styling. No collapsed control or new panel is added.

The existing notebook verification script rejects missing and self-referencing destinations before build. InlineText, learner input and raw tool output are unchanged. No new automated tests were added for this small reversible navigation addition; independent built-page navigation review and the existing full quality gate provide verification.

Draft: separate GPT-6.1 Sol / medium agent. Learner, sceptic and final checker: separate GPT-6.1 Sol / high agents per the repository workflow and referenced authoring guidance.

## Accepted navigation finding

Reader R1 and the independent sceptic confirmed that notebook page slugs were treated as legacy section anchors by the app route effect. Those nonexistent anchors skipped normal scroll/focus handling, opening destination lessons at the source's deep scroll position. The minimal fix gates legacy section handling on the absence of a notebook route. This also corrects sibling notebook index/pager navigation. Existing archive section handling remains unchanged. Back returns the correct page and retained drafts; as with the app's existing non-section navigation, it may reset to the page beginning rather than restoring the link's old position.

A meaningful browser regression was added for all three codec links, keyboard focus, fully visible destination headings, Back/drafts, sibling Next/Previous and overview-to-lesson navigation. The first focused run passed 6 and failed 4 because the new test demanded numeric scrollY 0: Chromium focuses main at Y 87/131 while its heading is fully visible. The assertion now tests the actual requirement (the whole heading visible and main focused); no product change was needed for this test correction. Final focused command `npx playwright test tests/course-index.spec.ts`: 10 passed in 11.1 seconds.

The first full gate was intentionally stopped after the scoped navigation defect was confirmed (unit/content/media/build passed; browser suite incomplete). It is not a passing full check. The full gate is rerun after the fix.
