# Single course index — final validation

Copyright © 2026 Christopher Snow.

Application source: `14dba64fcd69fb47f61e70f017a06fb0f5b864a9`.

## Local gate

The full `npm run check` passed: formatting, copyright, shared-platform sync, strict typechecking, all 85 tests in 21 unit-test files, native media/command/lesson verification, production build and browser suite. Playwright: **282 passed, 38 intentional project skips, 10.2 minutes**, across desktop/phone Chromium light/dark and Firefox. Log: `/workspace/scratch/course-index/check-accepted.log`. The new index regression passed all five projects.

The independent reader, sceptic and final built checker completed before source publication and found no introduced blockers. Local and hosted full gates run in parallel; Pages publication remains gated by its successful complete check. No gate was bypassed. Hosted and public results follow in this later evidence-only record.


## Hosted gates and deployment

- [Quality run 40226171756](https://github.com/snowch/video-lab/actions/runs/40226171756), job 121267899210: success; 85 unit tests, 282 browser cases passed, 38 intentional skips, browser duration 16.9 minutes.
- [Pages run 40226171889](https://github.com/snowch/video-lab/actions/runs/40226171889), attempt 2 build job 121270131368: success; the complete gate passed with 85 unit tests, 282 browser cases passed, 38 skips, browser duration 16.7 minutes. Deploy job 121276109961 succeeded.

Pages attempt 1 was cancelled during unusually slow Ubuntu FFmpeg-package downloads, before application checks ran (job 121267899856). Its completed log confirms slow package transfer, rather than an application test failure. Restarted the whole workflow on a fresh runner. Attempt 2 completed dependency setup and all checks; no gate was skipped. The separate quality run was not cancelled. Read both successful jobs' actual completed logs and checked successful deployment status.

Published source: `14dba64fcd69fb47f61e70f017a06fb0f5b864a9`; build: `2415dec11befe2ec2320ba2904cf67c4dd25139d9d875f7d2326a8a970d00ccb`; complete-download size: 49,038,330 bytes. This later evidence-only commit does not change the published application.

## Published index and saved-app checks

Ran `/workspace/scratch/course-index/public-check.mjs` against the expected published source. Four fresh Chromium contexts passed: desktop light 1440 × 1000, tablet dark 820 × 1180, phone light/dark 393 × 851. Verified release metadata against the embedded running build; ten chapter groups, 24 unique direct page links, plain chapter headings and no Chapters button/sidebar/dialog. Actual second-page and final-page links reached their expected pages and returned through Course overview. The recording guide link worked and browser Back returned to the index. All page links remained at least 44px high and the index had no horizontal overflow at doubled root font size. Inspected the published phone-light screenshot. Results, scripts and screenshots: `/workspace/scratch/course-index/public-results.json`, `public-check.mjs`, `public-check.log`, `public-*.png`.

Ran `/workspace/scratch/course-index/public-update.mjs` with the existing persistent saved-app profile. Its old build was `c5e0416895dc046b810a6483d610cb531030912d078e7e9fdb11ec074b288028`. Used actual Check for updates → Update → Restart to update controls, confirmed the new embedded identity and complete offline readiness, and compared all nine saved file hashes and four complete cell records unchanged.

Closed the browser process and reopened the profile offline before navigation. The new index displayed all 24 links without duplicate chapter navigation. Followed the second page link to `first-edit/start`, returned to the index, and again confirmed every saved file and cell record unchanged. Evidence: `public-update.json`, `public-update.log` and `public-updated-phone.png` under `/workspace/scratch/course-index/`. Both public scripts exited 0 on their first run.

Public checks used Chromium viewport emulation, not physical devices or WebKit. Firefox passed the local and hosted regression suites. Public checks were performed by the builder; the separate reader, sceptic and final checker are recorded independently in 02, 03 and 05. The pre-existing destination-focus limitation remains explicitly documented there.
