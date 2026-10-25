# Overview controls: final checks and deployment

Copyright © 2026 Christopher Snow.

Implemented and deployed on 25 October 2026 in `2e997cb07f0ef1dfb45a9908b1cb1a07b951ca38`. The final scope includes the owner's subsequent clarification: no Files button on the overview, plain Files without a count in lessons, and no routine Saved in this browser on this device message in the page or live-status output. Contextual storage information remains inside Files; actual failed-save warnings and active-operation controls remain available.

## Required gate

`npm run check` passed locally: formatting, copyright, shared-platform sync, strict TypeScript, **85 unit tests across 21 files**, native media/command verification, production/offline build and **287 browser tests passed, 38 project-specific skips** (10.3 minutes). Full log: `/workspace/scratch/overview-final/check.log`.

The same complete gate passed on both hosted workflows:

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40237085824): 85 unit tests; 287 browser tests passed, 38 skipped (13.8 minutes).
- [Pages deployment](https://github.com/snowch/video-lab/actions/runs/40237085865): 85 unit tests; 287 browser tests passed, 38 skipped (16.6 minutes), then successful deployment.

No new test exclusions were introduced. The focused regression results and the independent reader/sceptic/checker evidence are recorded in 01–05. The introduced Back/dialog focus issue is fixed and independently checked for both ordinary dismissal and dirty-edit recovery. Tests for saved commands and notes now inspect actual stored IndexedDB records rather than the removed status sentence.

## Published app

Fresh public metadata and the embedded running identity agree:

- Source: `2e997cb07f0ef1dfb45a9908b1cb1a07b951ca38`.
- Build: `140ef64474b4d7958e762809e1391c4fe01bc6746f94d88746bd127b47a90b2d`.
- Complete offline download: 49,041,884 bytes.

Public Chromium checks passed at desktop 1440×1000 light, tablet 820×1180 dark, phone 393×851 light/dark and narrow phone 320×568 light. Each verifies no home toolbar or accessible Files button, an empty settled workspace status, all 24 distinct page links, actual non-first/final-page navigation, lesson Files with its exact plain label, the contextual storage note, Escape focus restoration and return to the overview. Enlarged overview text at 200% has no horizontal overflow and page links remain at least 44px tall. Fresh-entry screenshots show the final introduction without the extra controls. These are browser viewport/enlarged-text checks, not physical-device or full assistive-technology claims.

## Saved app and offline work

A persistent public profile updated from build `4bea9898ecf0961ed55dc6f291f114d3f20fd4375d084832ff81bca87a421834` using the actual Check for updates → Update → Restart to update actions. All nine stored file SHA-256 hashes and all four complete command/cell records were unchanged.

The browser process was closed and reopened with networking disabled. The new overview still had no toolbar, Files button or routine saved text. Lesson navigation worked offline, the plain Files button opened the existing file manager with saved media present, Escape returned focus to that button, and returning to the overview again exposed no Files button. The independent App status offline/readiness/identity behaviour remained correct. The same file hashes and complete cell records were unchanged after the offline relaunch.

External evidence is retained in `/workspace/scratch/overview-final/`: `public-check.mjs`, `public-results.json`, `public-update.mjs`, `public-update.json`, `public-capture.mjs`, screenshots and logs; exact saved-file hashes are in `public-update.json`. Hosted logs are `ci-quality.log` and `ci-pages.log`. Browser profiles and screenshots were not staged. The unrelated learner-audit directory was not altered or staged. This evidence-only commit does not change the deployed app identity.
