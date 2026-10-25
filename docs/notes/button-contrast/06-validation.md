# Primary-button contrast — validation and publication

Copyright © 2026 Christopher Snow.

Application source commit: `8275a934e4bb25c06a037bc021ba41da44a2bcbe`.

## Local gate

`npm run check` completed successfully: formatting, copyright, shared-platform sync, strict typecheck, 85 tests in 21 unit-test files, native media/command/lesson verification, production build and Playwright. Browser result: **277 passed, 38 intentional project skips in 10.3 minutes**, across desktop/phone Chromium light/dark and Firefox. Log: `/workspace/scratch/button-contrast/check-accepted.log`. The newly added regression passed all five projects. Before the CSS fix, the same regression failed against the previous built page at its light-theme hover contrast assertion (approximately 1.08:1), confirming it detects the reported defect.

The independent reader, sceptic and built checker completed before source publication and found no blockers. The local gate and hosted gates run in parallel; Pages remains gated by its complete successful check. No source gate is bypassed. This later evidence-only record adds the completed hosted and public results below.


## Hosted gates

Both complete gates passed without retries or bypasses:

- [Quality run 40220653166](https://github.com/snowch/video-lab/actions/runs/40220653166), job 121251302962: 85 unit tests, 277 browser cases passed, 38 intentional skips; browser duration 11.1 minutes.
- [Pages run 40220653090](https://github.com/snowch/video-lab/actions/runs/40220653090), build job 121251302924: 85 unit tests, 277 browser cases passed, 38 intentional skips; browser duration 17.3 minutes. Deploy job 121255899258 succeeded.

Read the actual completed job logs. Published source is the application commit above; published build is `c5e0416895dc046b810a6483d610cb531030912d078e7e9fdb11ec074b288028`, with complete-download size 49,040,198 bytes. This note does not change the published application.

## Published checks

Ran `/workspace/scratch/button-contrast/public-check.mjs` with the expected application SHA against `https://snowch.github.io/video-lab/`. Four fresh Chromium contexts: tablet 820 × 1180 and phone 393 × 851, each light/dark and touch-enabled. Each checked release JSON against the embedded running identity, loaded practice media and ran the exact reported five-second command. After completion, Run was enabled and retained the corrected hovered palette and brightness filter; the primary next link had the same palette. Light uses background rgb(18, 105, 94) and text rgb(245, 247, 243); dark uses background rgb(130, 221, 195) and text rgb(16, 37, 31), each brightness(0.94). Inspected the published tablet-light and phone-dark Run screenshots. Results and screenshots are outside the repository in `/workspace/scratch/button-contrast/`.

The persistent saved app used actual Check for updates → Update → Restart to update controls, verified its existing files and cell records unchanged, then closed the browser process and reopened offline before running the command. The initial script reached the final colour check but incorrectly assumed light mode despite the retained dark theme. A corrected rerun recognised the already updated build, again checked preservation (nine files and four cell records), reopened offline, completed a real encode and verified the theme-appropriate post-run hover colours. The downloaded five-second audio/video output passed native ffprobe and full FFmpeg decode. No product code changed during this harness correction.

The fresh-context script's initial pre-run colour snapshot was also taken before practice-file loading finished, so it compared a disabled loading button with the correctly enabled completed button. Added an explicit enabled-state wait, then all four fresh contexts passed. Initial failure logs remain beside the corrected run logs; these were test-harness assumptions, not discarded product findings.

Evidence: `public-results.json`, `public-check.log`, `public-update.json`, `public-update.log`, the `*-first.log` records and `public-*-run.png` screenshots under `/workspace/scratch/button-contrast/`. These final public checks were performed by the builder; independent review is separately recorded in 02, 03 and 05. Physical tablets/phones and WebKit are not claimed.
