# Visual-reference validation

Copyright © 2026 Christopher Snow.

Separate prose drafting and independent built learner/sceptic/final checker records are 02–06 in this directory. Reviews cover the actual desktop and touch-phone pages in light/dark, all controls and focused references. The diagrams are source-checked explanatory models; transparency is an actual CSS demonstration. No new encode, codec benchmark or media-processing result is claimed.

Local commands:

- `npx prettier --check .`: passed before final review records; formatting rechecked on final committed files.
- `npx tsc --noEmit`: passed.
- `npm test`: 119 tests passed across 28 files, including three sampling-pattern cases.
- `npm run build`: passed; 225 local offline assets. No external illustration dependencies or processing downloads merely reading.
- `npx playwright test tests/format-visuals.spec.ts tests/formats-images.spec.ts -g 'format references separate|pixel-format references|image sources, touch|saved image chapter'`: 16 passed, four intentional non-desktop skips, 34.1 seconds. Includes unchanged old option-reference URLs, focused headings, saved edited command on Back, source/enlargement colour correspondence, keyboard radio/range controls, actual opacity, unchanged luma dimensions, 200% text/no overflow, no encoder download, and opening both focused pages offline.

Intermediate draft/selector failures and their fixes are recorded in 05-fixes.md; they are not final validation results. The final copy-only removal of a repeated rename warning was independently rechecked on the rebuilt container page; the sampling/control behaviour did not change.

Final reading-width follow-up: add direct article paragraphs to the existing 62ch text-width rule so opening prose aligns with the diagrams on desktop. Rebuilt and reran `npx playwright test tests/format-visuals.spec.ts`: all five projects passed, 14.7 seconds. The independent checker rechecks this one-rule change separately. Initial CI was deliberately superseded for this CSS adjustment, not reported as a pass or product failure.

Full `npm run check`, including media facts and the whole browser suite, must pass on the final PR revision before merging. The PR records permanent CI links, exact full-suite results and merge status. No full local suite pass is claimed; the targeted local checks above are distinguished from the full CI gate.
