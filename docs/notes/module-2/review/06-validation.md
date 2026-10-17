# Module 2 validation

Copyright © 2026 Christopher Snow.

Builder validation on 17 October 2026, after the P1/P2 teaching fixes. Independent review results are recorded separately; this report does not substitute for the checker.

## Required quality command

`npm run check` passed with exit status 0. This is the same entry point used by CI and the Pages build. It ran:

- Repository formatting, source copyright and unchanged platform-copy checks.
- Strict TypeScript checking.
- Four Vitest files, **14 tests passed**: Module 0 contracts remain intact; Module 2 timing, boundary ownership, invalid intervals, schema, combined term gate, model names and six-field grading pass.
- Module 0 native verification: source SHA, two streams, 120 video timestamps, 469 audio blocks and every extracted still.
- `node scripts/module2-media.mjs`: controlled source and **10 real outputs**, SHA/stream/timestamp/audio-block records, every decoded output picture mapped to its intended source picture, and **28 extracted stills** verified.
- Vite production build.
- **50 Playwright cases passed** in 35.6 seconds: ten tests in each of Chromium desktop light/dark, Pixel 7 Chromium phone light/dark and Firefox desktop. Five tests per project cover Module 0; five cover Module 2.

The final complete builder log is `/workspace/scratch/module2/final-check.log` in the execution workspace. Earlier media generation was verified by `node scripts/module2-media.mjs --generate`; its exact media commands/tool versions are committed in `../media/generation.json`. Source-to-output values used in the challenge and timeline are pinned by model tests.

## Browser substance

Module 2 automation plays the source and every selectable cut/join output, checks measured first/last/join labels, opens recorded evidence, changes both clock arrangements, exercises prediction errors and correction, and verifies challenge errors, five hints, reference success, edit/retry, saved work, reset and lesson-state isolation. It tests reflection storage/clear, prerequisite/home/section/back navigation, themes, keyboard radio selection, no page overflow/errors and failed-media fallback. The independent learner and checker add actual rendered-page/visual review and native control checks with their exact limits recorded in their own reports.

## Release boundary and limits

The Pages workflow deploys only after repeating the same quality command on `main`; the owner has authorised direct publication. Public deployment and live-site checks are performed after pushing and reported with the delivery. This local report does not assert a remote deployment result.

Known non-blocking build advisories: Vite's main bundle size warning and dependency annotation warnings. The implementation adds no external runtime service or new dependency. Safari/WebKit, physical phones and screen-reader operation are not verified. No claim is made that the browser performs new cuts/joins, that browser seeking identifies exact decoded frames, or that all sources share the fixture's keyframes/audio timing. Real speech and arbitrary uploads remain outside this lesson.
