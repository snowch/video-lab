# Independent route-focus checker

Copyright © 2026 Christopher Snow.

Reviewer: ci_focus_checker. No product or test changes authored. Reviewed the diff and built bundle `course-CXOutNrr.js` served on port 4191.

## Verdict

No blockers found. The change fixes an actual focus-stealing race without weakening the failed keyboard assertion or adding retries. Route focus/scroll is now completed in React's layout phase, after target DOM exists and before a visible interactive frame. Ordinary initial-page focus, subsequent main focus, canonical legacy URLs and section scrolling remain working in the checked cases.

## Built checks

An independent Playwright harness ran in Chromium desktop (1440×1000) and Pixel 7 emulation, each in light and dark themes:

- Direct load and reload of both Video containers and Pixel formats focus their H1.
- Keyboard Enter on desktop and touch activation on phone follow the playback-check link and focus `#check-playback`.
- Browser Back returns to the reference and focuses its H1.
- Direct entry and reload of the playback-check deep link focus its heading.
- A fresh ordinary course overview does not force main focus; a subsequent ordinary reference navigation focuses main.
- Old `#/module-2/failureExperiment` canonicalises to `#/edit/reference/failureExperiment`; the actual section appears at the viewport top (within one pixel in all four cases).
- No horizontal document overflow and no page errors in those cases.
- The independent held-animation-frame reproduction now retains manual link focus after releasing queued callbacks; Enter reaches and focuses the checklist. Zero route frames remain pending, as expected from the synchronous fix.

All four matrix cases passed. Screenshots were captured for all four; desktop-light and phone-dark screenshots were visually inspected. The focused heading and procedure are readable in each inspected image. This review does not claim full-course visual reinspection, native-device testing or measured contrast ratios.

Harness and exact measurements: `/workspace/scratch/ci-focus/checker.mjs`, `checker-results.json`, `checker.log`; screenshots in the same directory.

## Adjudication and scope

The investigation's causal finding is accepted: old deferred animation-frame focus could override learner-selected link focus. The new deterministic regression exercises that mechanism; retaining the normal navigation/Back/draft regression also checks the ordinary interaction path. A longer timeout, click-only replacement or CI retry would not repair the defect and is correctly avoided.

The route layout effect is small and synchronous; it does no media processing or network work. DOM targets are rendered synchronously by the current route components. No new prose is introduced, so a separate prose draft is unnecessary. Command execution, media validation and the full browser suite remain the builder/CI validation responsibility; this checker did not rerun all those tests.
