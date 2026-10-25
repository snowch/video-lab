# Overview bar: validation and deployment

Copyright © 2026 Christopher Snow.

Implemented and deployed on 25 October 2026 in `f45476ede73c3b86c80fd5350fb6782561227bdd`. The separate copy, reader, sceptic, resolution and independent checker records are 01–05. No blocker remains in this bounded change. The pre-existing enlarged-text Files-dialog wrapping observation is retained as Low in those records; this slice does not claim to redesign that dialog.

## Required checks

`npm run check` passed locally: formatting, copyright, shared-platform sync, TypeScript, **85 unit tests across 21 files**, native media/command verification, production/offline build, and **287 browser tests passed, 38 project-specific skips** (10.3 minutes). Full log: `/workspace/scratch/overview-bar/check.log`.

Both hosted workflows passed the same gate and Pages deployed successfully:

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40234048187): 85 unit tests; 287 browser tests passed, 38 skipped (16.8 minutes).
- [Pages deployment](https://github.com/snowch/video-lab/actions/runs/40234048188): 85 unit tests; 287 browser tests passed, 38 skipped (17.0 minutes), then successful deployment.

The focused regressions and independent 12-case desktop/tablet/phone review are recorded in 04–05. The checker also verified a real persisted Blob after navigation and reload, clipped initial loading feedback, and concurrent unsafe-storage warning with an active command and functioning keyboard cancellation. No test was newly skipped or weakened to obtain acceptance.

## Published checks

Public release metadata and embedded identity agree:

- Source: `f45476ede73c3b86c80fd5350fb6782561227bdd`.
- Build: `4bea9898ecf0961ed55dc6f291f114d3f20fd4375d084832ff81bca87a421834`.
- Complete offline copy: 49,042,047 bytes.

Fresh public Chromium checks passed at desktop 1440×1000 light, tablet 820×1180 dark, phone 393×851 light/dark and narrow phone 320×568 light. Each checked the missing overview toolbar, quiet idle status, Files opening with Escape focus restoration, all 24 unique page links under ten chapters, actual non-first/final-page navigation and return, static lesson navigation and the recording appendix. The overview also had no horizontal overflow at 200% root text, with page links at least 44px tall. Public screenshots were taken after scrolling back to the introduction. These are browser viewport and enlarged-text checks, not physical-device or browser-zoom claims.

## Saved app and offline work

The persistent public profile used actual Check for updates → Update → Restart to update actions from build `16b6042692eafa9b73889a64c356389854a71556749e0777fc9c03f5d2128e55` to the published build above. All nine stored file SHA-256 hashes and all four complete cell records were unchanged.

After closing the browser process and reopening with networking disabled, the new overview still had no toolbar. Files opened from the introduction and returned focus after Escape; a lesson link and Course overview return worked offline. Idle status remained visually clipped. The compact app-status header, verified Saved offline state and expanded source identity remained correct. File hashes and cell records were again unchanged.

Exact hashes, release identity, screenshots and executable checks are in `/workspace/scratch/overview-bar/public-update.json`, `public-results.json`, the associated scripts/logs and screenshots. Hosted logs are `ci-quality.log` and `ci-pages.log` in the same external evidence directory. None of those browser profiles or screenshots are product assets. The unrelated learner-audit directory was not staged or altered. This evidence-only commit does not change the deployed app identity.
