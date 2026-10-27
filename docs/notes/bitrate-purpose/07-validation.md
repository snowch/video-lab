# Validation and publication

Copyright © 2026 Christopher Snow.

## Local gate

`npm run check` exited 0 on 27 October 2026. Log: `/workspace/scratch/bitrate-purpose/check.log`.

- Formatting, copyright, unchanged shared platform, strict TypeScript: passed.
- 25 unit test files, 110 tests: passed.
- Native media, 10 chapters / 24 pages / 51 notebook commands, visual facts and asset provenance: passed.
- Production build and complete offline bundle: passed.
- Browser suite: 336 passed, 49 configured skips, 17.0 minutes. No failure or rerun in the full gate.

Only an existing navigation-test selector changed, matching the expanded “More on codecs and compression (optional)” heading. No test is added merely to repeat authored prose. Existing native verification pins the numeric excerpt; existing browser tests verify raw output and supplied guide remain separate and the cross-references navigate correctly.

Separate learner, sceptic and final built checker records are 03–06. Reader and checker observed desktop/phone, light/dark and 200% text; final checker also awaited successful CRF26 technical grading. These independent reviews do not claim subjective hearing/quality certification.

The patch preserves commands, raw logs, media, file storage, route IDs and offline protocols. No platform changes. Unrelated untracked `docs/notes/learner-audit-2026-10-18/` is excluded. Publication uses the owner’s standing reviewed-main authorisation. Hosted and public results follow.

## Hosted publication

Product commit: `751de99200da9ed0be1d6fb79f44a29cc874df2c` (reviewed main push).

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40479988767): success; 110 unit tests and 336 browser tests passed, 49 configured skips; browser duration 18.5 minutes.
- [Pages](https://github.com/snowch/video-lab/actions/runs/40479988800): build and deployment success; its full gate passed the same 110 unit / 336 browser tests with 49 configured skips; browser duration 14.2 minutes.
- No failed run or retry. Scratch `quality.log`, `quality-result.json`, `pages.log` and `pages-result.json` hold the retrieved logs/status. The workspace briefly disconnected after public verification; the GitHub connector independently confirmed final quality success, then the recovered workspace saved the CLI log as well. No product change resulted from that interruption.

## Public verification

`node /workspace/scratch/bitrate-purpose/public.mjs 751de99200da9ed0be1d6fb79f44a29cc874df2c` exited 0 against `https://snowch.github.io/video-lab/` after deployment, with normal TLS verification and the configured proxy.

Four fresh contexts: desktop 1440×1000 light/dark, phone 390×844 light and 320×800 dark. Actual theme attributes checked. Each confirmed the published commit and running build `534769feaf1b992795d786056fe4c4cf4d794f60172df056e960106906649663`, MP4 provenance/reader caveat, bitrate purpose and quality limitation, the actual optional Chapter 8 link, target CRF/bitrate explanation and Back navigation. Both pages fit the viewport at normal and 200% root text size.

Desktop light also executed actual `ffprobe bunny-action.mp4`: raw output reported six seconds, while the clearly supplied guide retained its eight-second, 352 kb/s example. No teaching markup entered the raw log. Four public guide screenshots and `public-results.json` are under `/workspace/scratch/bitrate-purpose/`; the root visually inspected the phone-light screenshot. Public offline upgrade was not repeated for this copy-only change; full automated suites cover that existing behaviour.

This final evidence-only update does not alter the published app or require redeployment.
