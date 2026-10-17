# Validation and delivery record

Copyright © 2026 Christopher Snow.

## Executed checks

17 October 2026, managed Linux workspace, Node v24.19.0, FFmpeg/ffprobe 7.1.5, locked npm dependencies. `npm run check` passed after applying the ranked review fixes. That exact command is used in `.github/workflows/ci.yml` and before Pages deployment.

| Check inside the entry point | Actual result |
| --- | --- |
| `npx prettier --check .` | Passed. Platform copy and prose Markdown retain their own formatting. |
| `node scripts/copyright.mjs` | Passed for original source headers. |
| `node scripts/sync-platform.mjs --check` | Passed; 35 copied files match the recorded upstream commit hashes. |
| `npx tsc --noEmit` | Passed with strict mode, unchecked indexed access and verbatim module syntax. |
| `npm run test` | 2 files, 7 passing tests: model facts/boundaries, schema, term gate, model registration, reference success and meaningful failure cases. |
| `npm run media:verify` | Passed: committed media SHA-256, 2 streams, all 120 picture timestamps, all 469 audio blocks and all 120 stills checked against native decoding. Public raw output also matches the committed measurement record. No native checks skipped. |
| `npm run build` | Passed. Non-fatal dependency comment/tree-shaking warnings and bundle-size advisory remain; runtime bundle about 253 kB gzip, with no remote runtime/WASM load. |
| `npm run test:browser` | 25 passed: Chromium desktop light/dark, Chromium Pixel 7 emulation light/dark, Firefox desktop. Playback, inspection, stream interval, prediction, failure feedback, five hints, retries, regraded persistence, reset, reflection, navigation, theme persistence, no horizontal overflow, control sizes, screenshots and preview-load failure. Phone cases use touch taps for theme and frame stepping. |

The initial implementation also passed [GitHub Quality checks, run 39021515785](https://github.com/snowch/video-lab/actions/runs/39021515785). The PR checks expose the later run for the final pushed revision; do not infer a later revision's remote result from that initial run.

The separate reader and sceptic ran their own page and media checks; `01-reader.md` and `02-sceptic.md` distinguish those from the builder's checks. `05-checker.md` records the fresh checker's actual observations of the revised build. All four roles are genuine separate agents; no self-review is presented as independent validation.

## Screenshots

Five screenshots in `screenshots/` come from the rebuilt production page at `/video-lab/`, using Playwright Chromium: introduction at 1440 × 1000/light, explorer at desktop/light, stream diagram at desktop/dark, and explorer/challenge at 390 × 844/dark with touch enabled. Element screenshots include the whole selected interactive. The challenge is shown before answers are entered. No screenshots are mock-ups.

## Initial delivery limitations and blockers

This section records the initial PR delivery state. The owner subsequently authorised deployment directly to `main`, and the Pages workflow was updated to use the already-permitted branch. See PR #2 for the subsequent deployment and live-site result.

- Pages is configured with GitHub Actions, but the `github-pages` environment permits deployment only from `main` (GitHub API inspected on 17 October 2026). This task must use `codex/intro-module-0` as its base and leave `main` unchanged. The environment protection was preserved. The public course address returned HTTP 404 when checked. Deployment is configured but **not deployed or live-verified**; README specifies the owner setting needed after review/merge into the requested base.
- Playwright WebKit downloaded, but could not launch because the workspace lacks its GTK/Graphene/Harfbuzz/Manette/Hyphen/GLES libraries. `npx playwright install-deps` could not install them without root authentication. No WebKit/Safari check is claimed. Browser coverage uses Chromium and Firefox; phone coverage is emulation, not physical-device or screen-reader certification.
- Media regeneration is deterministic at the source-action/timing level, not promised byte-identical across OS, font, browser and encoder versions. The committed file is verified by hash and independent decoding; exact generation versions/commands are retained.

An initial browser test timeout came from using an exact text-label locator for a select; role/name selection corrected the test, after which challenge tests passed. A later test-loading failure exposed the need for Node's explicit JSON import attribute after UI strings began using measured model values; that import was corrected before the passing final check. Neither failure is omitted from the history or counted as a pass.
