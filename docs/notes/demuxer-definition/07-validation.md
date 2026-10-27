# Validation and merge

Copyright © 2026 Christopher Snow.

The approved paragraph received separate drafting, built learner review, sceptic adjudication and final built checking in 02–06. No findings required changes. The builder also inspected the phone screenshot. The only product change is the Chapter 2 introduction string; commands, media, controls and raw output are unchanged.

## Checks on 27 October 2026

- `npm run build`: passed; the actual preview was used for independent review.
- `npm run check`: formatting, copyright, platform integrity, strict TypeScript, all 25 unit files / 110 tests, native media/reference commands, visual media verification, production build and offline bundle passed. Browser results: 335 passed, 49 configured skips, one failure in 17.0 minutes. The full command therefore exited 1, not a clean full-gate pass.
- The single failure was `tests/files-cleanup.spec.ts:65`, desktop-dark, waiting for the download event for an imported text file. It exercises the course-overview Files dialog, not the edited lesson. The initial trace and error context are retained in `/workspace/scratch/demuxer-definition/initial-download-timeout/`. No file-management code or test was changed to make it pass.
- After the full suite finished, `npx playwright test tests/files-cleanup.spec.ts --project=desktop-dark --grep 'imported files preview and download'` passed: 1 test, 6.4 seconds. The timeout did not reproduce on this targeted rerun; its cause is not established. This result does not erase the initial failure.
- `npx prettier --check docs/notes/demuxer-definition docs/plan.md src/notebook/pages/inside-video-inspect.ts` and `git diff --check`: passed.

Logs are under `/workspace/scratch/demuxer-definition/`: `build.log`, `check.log` and `download-rerun.log`. The existing tests provide coverage; no new test merely mirroring prose was added. No product edits followed the independent reviews or test run.

The owner explicitly requested adding the approved definition and merging. The standing authorisation permits reviewed changes directly on `main`. Unrelated `docs/notes/learner-audit-2026-10-18/` remains untracked and untouched. Hosted checks and deployment run after the push; no hosted or live pass is claimed here.
