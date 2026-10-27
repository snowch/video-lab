# Validation and merge

Copyright © 2026 Christopher Snow.

## Final behaviour and review

Notebook lessons automatically prepare only their declared practice assets after restoration and any active operation. Existing names and drafts are preserved; provided bytes are verified before addition. Preparation can be cancelled by navigation, times out per file, and offers explicit retry after failure or deletion. It works with saved offline assets and session-only storage. Reading does not load WASM or execute commands. The optional two-minute clip is available through an overview download link, without being added to every first-lesson workspace.

Separate drafting, built learner review, sceptic adjudication and final checking are recorded in 02–06. One minor duplicate-status finding was fixed; stale manual-loading instructions were removed. The checker accepted the final copy addenda and found no unresolved defect. The builder also inspected the final phone source section. Independent evidence includes an import during another tab's download, active-command navigation, session-only storage, edited captions/drafts, actual ffprobe, 200% text and offline existing media.

## Checks on 27 October 2026

- Strict TypeScript and production build passed. Focused automatic-preparation tests passed in desktop-light, phone-dark and Firefox: 23 passed, four configured skips (27.4 seconds).
- Two early full-check attempts were intentionally interrupted for the review status fix and final source-copy sweep. They are not claimed as full passes; logs are `check-before-status-fix.log` and `check-before-copy-cleanup.log`.
- Final `npm run check` passed formatting, copyright, platform integrity, TypeScript, all 25 unit files / 110 tests, native media and 51 notebook command references, visual media verification, production build and offline bundle. Browser results: 368 passed, 57 configured skips and five failures in 17.5 minutes. The full command exited 1.
- Those five failures were one obsolete Files-dialog expectation in all five projects: it expected an empty file list after entering a lesson. The required automatic loading now correctly adds bunny-short.mp4. Updated only that test to retain the empty overview check and assert exactly one practice-video row after the first lesson becomes ready. Other assertions remain intact. The independent checker verified this expectation against the built app; no product change was made after the final full run.
- After that test correction, strict TypeScript passed and `npx playwright test tests/files-cleanup.spec.ts --grep 'Files is a single header utility'` passed all five projects (11.5 seconds). Thus all 373 browser cases have passing results across the final full run and corrected targeted rerun; this is not represented as an uninterrupted green full-gate run. The 57 skips are configured project-specific exclusions.
- Final formatting and `git diff --check` passed.

All logs and focused review artifacts are under `/workspace/scratch/automatic-practice/`; initial Files-expectation traces are preserved in `old-empty-expectation/`. The regression cases cover required-only loading, execution gating during pending preparation, failures/corruption, retry, existing files/drafts, route cancellation, concurrent tabs, cold offline preparation, deliberate deletion, timeout and storage capacity. Existing actual command, offline/update and file-management coverage remains in place.

Reviewed main publication is authorised by the owner's standing instruction. Only this slice is staged; unrelated `docs/notes/learner-audit-2026-10-18/` remains untouched. Hosted quality/deployment workflows run after the push; no hosted or live pass is claimed here.
