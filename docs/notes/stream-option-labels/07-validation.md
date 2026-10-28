# Validation and unmerged delivery

Copyright © 2026 Christopher Snow.

On 28 October 2026, the frozen three-file product change passed `npm run check` (exit 0): formatting, copyright and shared-platform checks, strict TypeScript, 26 unit-test files / 113 tests, recorded-media and teaching verification, production/offline build and the full browser matrix. Browser result: **389 passed, 71 configured skips, no failures**, 16.7 minutes. Desktop light/dark, phone light/dark and Firefox were included. Log: `/workspace/scratch/stream-option-labels/check.log`.

The earlier focused `npx playwright test tests/visual-teaching.spec.ts` passed 12 cases with 3 configured skips across the same five projects. The first full-gate attempt stopped on formatting of temporary review artifacts mistakenly created under repository scratch; moving them outside the repo resolved this. The subsequent complete full gate above passed without retrying a failed browser test.

Separate copy, learner, sceptic and final checker records are in 02–06. The final checker read the actual built page before the rationale, addressing the learner review's transparently recorded informed-read limitation. All reviewers found both paths clear and no factual or layout defect. This is a static diagram/label change; commands, media and learner state are unchanged.

The owner explicitly requested **do not merge**. The change is saved on `codex/stream-option-mnemonics`; it is not merged, pushed to main or deployed. The unrelated untracked `docs/notes/learner-audit-2026-10-18/` directory is excluded. The late validation note receives a separate formatting check; no product edit followed the successful gate.
