# Overview bar: implementation and ranked resolution

Copyright © 2026 Christopher Snow.

The overview no longer renders a toolbar or links to itself. Its existing Files control sits beside Start chapter 1, uses the same file manager and count, and restores focus to its current opener. Lesson pages retain a plain Course overview/Files navigation row. The row has no card background, divider or sticky behaviour.

Ordinary loading/saved feedback retains its existing polite live status but is visually clipped, without occupying a permanent strip. Working and saving feedback remains conditional. The actual unsaved-work warning is independent of transient activity and visible on home and lessons even during processing. Active-command navigation/cancellation, notices, storage, file operations, command records, restart guards, the compact app header and all course links are unchanged.

The separate draft reused existing strings; no new learner-facing prose was introduced. Focused regressions passed: `npx playwright test tests/course-index.spec.ts tests/notebook.spec.ts --grep 'one course index|earlier files|optional notes'` — 7 passed, 8 existing project-specific skips. Existing saved/session-only status assertions now target the new status container. Added checks cover the absent overview toolbar, quiet idle status, real home Files dialog/focus return, retained contextual storage note, and the visible unsafe-storage warning after returning home. Existing real saved-draft/notes and navigation assertions remain.

The reader found no blocker. The sole retained Low observation is word-wrapping in the existing Files dialog header at narrow phone width with 200% text. The sceptic reproduced it and confirmed that the dialog CSS predates this slice, that there is no document/dialog overflow, and that the controls remain usable. It is deferred outside this narrow overview-bar change; no claim is made that the inherited dialog layout was redesigned. No implementation fix was required by the reader/sceptic review.

Final checker, full quality gate and published/saved-app verification are recorded separately. External scripts, screenshots and logs are under `/workspace/scratch/overview-bar/`; unrelated learner-audit notes are not part of this change.
