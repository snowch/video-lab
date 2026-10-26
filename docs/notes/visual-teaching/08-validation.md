# Visual teaching — release validation

Copyright © 2026 Christopher Snow.

Product commit: `be33f75552b2d808e43dbcf06a396dab03f3ce14`.

## Final quality gate

The final `npm run check` ran alone against the reviewed source. Earlier
interrupted runs, including a shared-fixture collision that caused two failures,
are recorded in `06-resolution.md`; they are not presented as successful gates.
Final local result: exit 0; 24 unit-test files / 93 tests passed; browser suite
299 passed, 41 skipped (10.5 minutes), across desktop/phone light/dark Chromium
and Firefox. Skips are the suite’s declared project-specific exclusions. No
failed or interrupted tests remain in this final run. The gate includes formatting, copyright, shared
platform integrity, strict TypeScript, unit tests, native media/fact verification,
lesson contracts, build and Chromium/Firefox browser tests.

The new native media verifier checks committed asset hashes, measured source
stream/timestamp facts, subtitle cues, complete quality encodes and lossless
comparison crops. It does not require distinct native encoder builds to produce
byte-identical new output. The independent visual/control/offline checker is
recorded separately in `07-checker.md`.

## Hosted checks

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40386742046): success; 93 unit tests and 299 browser tests passed, 41 browser skips (17.1 minutes).
- [Pages build and deployment](https://github.com/snowch/video-lab/actions/runs/40386742089): success; 93 unit tests and 299 browser tests passed, 41 browser skips (12.6 minutes).

Both workflows run the full repository gate before a Pages release is published.
The hosted source/measurements link returned HTTP 200 and contained the committed
854-pixel source width and both measured quality file sizes. This resolves the
checker's environment-specific inability to fetch that external link.

## Published app and saved-copy update

Published at `https://snowch.github.io/video-lab/`, source commit above, build
`4940c6381ea9703946da8f0248179b2ec756487c29063ea6ff49c0ab263cda47`.
The complete offline manifest is 50,880,209 bytes.

Ran `node /workspace/scratch/visual-teaching/public.mjs` with the full source SHA:
exit 0. Six fresh Chromium contexts (desktop, tablet and phone; light/dark;
320–1440 pixels) loaded all 24 page routes. Verified published and embedded
identity, loaded new images, exact annotated source dimensions, aligned lesson
content, source-control positioning, no horizontal document overflow, Files
Escape/focus restoration, enlarged text and source loading. Inspected the saved
public phone screenshot. These are browser emulations, not physical-device tests.

Ran `node /workspace/scratch/visual-teaching/public-update.mjs` with the full SHA:
exit 0. Used the actual saved app's Check for updates → Update → Restart to update
controls, from the previous `9b56087…` build. All nine file SHA-256 hashes and all
four complete saved cell records remained unchanged. Closed the browser process,
relaunched the same profile disconnected, and verified the new build, course
navigation, Files keyboard restoration, compact status and source/quality image
loading offline. The source image retained its measured 854-pixel width and the
quality crops their 256-pixel width. The exact annotated stream excerpt was
present offline. This complements the checker's hash verification of all eight
new offline assets; it does not claim running every possible lesson offline.

The live source link and all public checks used normal TLS verification through
the configured proxy. No certificate bypass or test-only service worker was used.

Validation scripts, console logs, screenshots and JSON results are retained
outside the repository at `/workspace/scratch/visual-teaching/`. The separate
reader/sceptic/checker evidence is linked from this directory's other records.
The unrelated learner-audit directory was left untouched.
