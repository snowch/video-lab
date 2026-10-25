# Validation and publication

Copyright © 2026 Christopher Snow.

## Executed checks

- Strict TypeScript, production builds and `node scripts/verify-notebook.mjs` passed. The validator covers ten chapters, 24 pages, all 51 canonical native/WASM commands and supplied asset hashes/media facts. Diagram source durations are checked against recorded media.
- Six changed practice references were executed with native FFmpeg/ffprobe and the actual browser WASM tools. Generated browser files were downloaded, independently inspected and fully decoded. Canonical evidence is updated in `../notebook/commands.json` and `commands-wasm.json`.
- Initial focused notebook suite: 14 passed, 21 project skips, 54.9 seconds. It covers real media processing, raw output, stale evidence, archive storage, note preservation and all-page reflow.
- First full `npm run check`: formatting, types, 80 unit tests, media checks and build passed; the reused review preview stopped during browser tests. The run was interrupted after 69 connection failures, two interrupted, 24 skipped, 77 unrun and 123 passed. Its result remains a failed/interrupted attempt.
- Second full `npm run check`: 80 unit tests; 265 browser passes, 29 project skips, one failure in 10.1 minutes. The existing release test installed a malformed response after opening App status; the automatic open check could replace Check for updates with Retry before the test clicked. The test now installs the response before opening and observes the actual automatic check. Product App status code is unchanged.
- `npx playwright test tests/release.spec.ts --repeat-each=2`: 20 passed in 1.1 minutes after the test-order fix. The independent checker also reproduced the automatic-check sequence and recovery against the built application.

The final complete quality run and publication results are appended after completion. Logs are retained under `/workspace/scratch/lesson-flow/`.

## Independent built evidence

`06-checker.md` and the committed evidence record all 24 pages across desktop/phone and actual light/dark themes, normal and doubled text. The measured maximum editor-to-Run gap is 52.39 CSS pixels normally and 168.22 pixels at doubled text; no page overflows horizontally. Earlier prediction/review storage survives as optional Notes. Real keyboard/builder execution, clipboard, downloads, source selection, progressive hints and the native handoff were exercised. A final 96-state pass verifies the source-header fix; 32 multi-source states keep the header and player names aligned.

The checker explicitly limits claims: Chromium/browser-emulated phone dimensions, not physical-device testing; sample output properties and real decoding do not grade aesthetics, gain, subtitle meaning or another player's compatibility.

## Publication verification preparation

Before publication, an actual saved public Chromium app at build `e49b105a4dee5952e0d92304c89710a848be87fde48f68d88450abfd0bf2e6be` was opened and earlier prediction/review notes saved through its existing UI. Existing workspace file hashes were recorded in `/workspace/scratch/lesson-flow/public-before.json` for comparison after the explicit update. The exact observed build identity in that JSON is authoritative.

## Accepted local run

Final `npm run check` completed with exit status 0: formatting, copyright/platform integrity, strict TypeScript, 19 unit files / **80 unit tests**, recorded media/reference validation, production build and **266 browser passes / 29 deliberate project skips in 9.6 minutes**. This run includes the final source-label assertion and deterministic release-test setup. Log: `/workspace/scratch/lesson-flow/check-accepted.log`. It does not overwrite the failed earlier attempts recorded above.

`git diff --check` passed. Separate page drafting, reader, sceptic, ranked-fix and final built checker records are complete. Publication and public saved-app verification follow this reviewed source commit.
