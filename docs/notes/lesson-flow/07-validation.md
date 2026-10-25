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

## GitHub checks and deployment

Reviewed source commit: `415bc39aaa02f0825cdbbeec273cb7da7d1593e3`.

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40202216509), job 121195588613: success, 80 unit tests, 266 browser passes / 29 skips, browser duration 14.9 minutes.
- [Deploy GitHub Pages](https://github.com/snowch/video-lab/actions/runs/40202216563), build job 121195587866: success, 80 unit tests, 266 browser passes / 29 skips, browser duration 11.6 minutes. Deploy job 121199690857 completed successfully.
- `ci-evidence.json` records count/size lines from the actual completed GitHub job logs, obtained through the connected GitHub tools.

## Actual public saved and fresh app verification

Both actual public Chromium and Firefox runs passed at published build `8e49b837e134f8c64cbe11c9b4f5e754c3361e334ba2e39e588c42ea6cbc333d`, source commit `415bc39aaa02f0825cdbbeec273cb7da7d1593e3`.

Chromium used the complete earlier saved app: Check for updates → Update → Restart to update. Its earlier prediction and review survived under optional Notes. All six pre-existing workspace file hashes remained identical. Firefox used a fresh persistent profile and downloaded the complete app. Both matched the running identity to the actual public release metadata.

Each browser process was then fully closed and relaunched with network disabled before navigation. The new lessons and saved notes opened offline. Both executed a genuine three-second FFmpeg cut, passed the measured property check, and downloaded the output. Native ffprobe independently measured three seconds and FFmpeg fully decoded each downloaded file. Offline source selection and the join page also worked. Both completed runs recorded no page errors.

Committed public JSON evidence includes release identity, real output probes and the Chromium preserved hashes; `evidence/public-phone.png` shows the published phone page. Scratch scripts/logs are in `/workspace/scratch/lesson-flow/`. The final evidence commit changes documentation only and intentionally skips CI so the application continues to identify the reviewed source commit above.
