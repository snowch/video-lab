# Runtime exit adapter — Actions and published verification

Copyright © 2026 Christopher Snow.

Date: 25 October 2026. Published application source: `8f7e514b758ee1abacf3007b4ea4abc9e21567c3`. Published build: `bf77fa6e12c15e8faec8a48099a65d3e3219ca913698df3781f7528fe17b9f8b`. Release complete-download size: 49,040,090 bytes. This record is a later evidence-only commit; it does not change the deployed application.

## Hosted gates

Both workflows completed successfully without reruns or bypasses:

- [Quality checks 40214380238](https://github.com/snowch/video-lab/actions/runs/40214380238), job 121232242784: 21 unit-test files, 85 tests; 272 browser cases passed, 38 intentional project skips, browser duration 16.1 minutes.
- [Pages 40214380146](https://github.com/snowch/video-lab/actions/runs/40214380146), build job 121232242583: the same full gate, 85 unit tests and 272 browser cases passed, 38 skips, browser duration 16.6 minutes. Deploy job 121236620566 succeeded.

The builder independently read the completed job logs and checked the actual release JSON and embedded running-build identifier on the public site.

## Published fresh-browser checks

Ran `/workspace/scratch/runtime-abort/public-check.mjs` against `https://snowch.github.io/video-lab/` with the expected source SHA above. Chromium tablet 820 × 1180 and phone 393 × 851, light/dark: all four actual runs of `ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4` completed, kept raw output without `Aborted()` or the historical note, and replayed inline. Downloaded videos were all 297,302 bytes with SHA-256 `4ecf1f3f52c8e817ee3f01cb4d5d7694f10caf66627552cb531b356190855556`, video/audio streams and native duration 5.000000 seconds. Full native FFmpeg decode passed for each. There was no page overflow. Inspected the tablet-light and phone-dark screenshots.

On the published tablet-light page, missing input, unknown option and missing ffprobe input all failed with the actual tool error. A valid bare ffprobe subsequently succeeded. Complete offline download included the separately manifested adapter; after disconnecting and reloading into a new worker, the exact command completed cleanly offline. Synthetic legacy records remained unchanged until rerun, then the fresh result no longer showed the historical note. Evidence, raw logs, screenshots and downloaded media: `/workspace/scratch/runtime-abort/public/`.

## Existing saved-app update

Ran `/workspace/scratch/runtime-abort/public-update.mjs` against the persistent Chromium profile retained from earlier public reviews. Its initial build was `96625ec3e81d10bd634e05f62bfa628fd47ce2c0945c9d8f146b428dc7a8f3ce`. Used the actual App status Check for updates → Update → Restart to update controls. Verified all eight saved file hashes and all three complete cell records were unchanged, complete offline readiness was true and the embedded running identity matched the new release.

Closed the browser process, reopened the persistent profile with network disabled before navigation, and again verified the new build and unchanged saved work. Then deliberately reran the reported five-second command offline: it completed without the abort line/note, and the downloaded video passed native stream/duration inspection and full decode. The rerun intentionally updates that cell record; preservation assertions precede it. Evidence: `/workspace/scratch/runtime-abort/public-update.json`, `public-update.log`, `public-offline.log`, `public-offline-first-cut.mp4` and `public-updated-phone.png`.

These public checks used Chromium and emulated viewports, not physical Android hardware. Firefox passed the real-core local and hosted regression suites. The independent built checker and sceptic are separate reviewers; these additional public checks were performed by the builder and are not represented as another independent review.
