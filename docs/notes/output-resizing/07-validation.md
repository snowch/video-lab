# Output resizing — validation and delivery

Copyright © 2026 Christopher Snow.

28 October 2026. Implemented on `codex/issue-7-output-resizing`, following the separately completed stream-option commit `80267fb`. No merge, push or deployment was performed. Issue 7 stays open pending delivery to main. Issue 1 was explicitly closed at the owner's request, with its completed/superseded scope and successful main CI/Pages evidence recorded in the closing comment.

## Checks executed

- `npx tsc --noEmit` and `npm run build`: passed.
- `npx playwright test tests/output-resize.spec.ts`: 17 passed, three configured skips, 39.3 seconds. Chromium desktop/phone light/dark plus Firefox; touch-only cases skip the three non-phone projects.
- `npx playwright test tests/output-resize.spec.ts tests/workbench.spec.ts`: 37 passed, three configured skips, 1.7 minutes. Expanded report-height coverage and the existing real-media/offline workbench regressions passed.
- `npm run check`: exit 0. Formatting, copyright, shared-platform integrity, strict TypeScript, 26 unit-test files / 113 tests, recorded/native media checks, native teaching/notebook/visual/codec verification, production build/offline bundle and complete browser suite passed. Browser result: **406 passed, 74 configured skips, zero failures, 17.7 minutes**, across desktop light/dark, phone light/dark and Firefox.
- `git diff --check` and final formatting of the completed review records: passed.

Full output: `/workspace/scratch/output-resize/check.log`. Focused/expanded outputs: `targeted.log` and `regression.log` in that same external scratch directory. Only one Playwright CLI suite ran at a time. Independent reviewers used standalone browser scripts and separately started previews; their evidence is outside the repository.

## Independent review and limits

Separate copy, built learner, technical sceptic and final checker passes are recorded in notes 02–06. No change-specific finding required a product fix. Checks include real ffprobe, pointer/keyboard bounds, release/cancellation/capture loss, mouse/touch/pen input, scrolling, text selection, exact raw text and command-draft invariance, retained height on rerun, separate JSON-report/log sizing, quiet-output hiding, light/dark, phone/tablet/desktop and doubled text. Hardware touch/stylus and a screen reader were not tested; browser-driven input is identified as such in the records.

The checker separately documented an existing optional-workbench navigation overflow at 200% document CSS zoom on a narrow phone. The same overflow occurs before output/resize controls exist; normal phone layouts and genuinely doubled output text fit. That unrelated layout was not changed or represented as fixed. See note 06 for evidence and exact dimensions.

The selected height belongs to the mounted pane; persistence across navigation/reload is deliberately not added. Raw logs, processing, storage and lesson content are unchanged by resizing.
