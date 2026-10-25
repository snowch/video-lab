# Independent built checker

Copyright © 2026 Christopher Snow.

25 October 2026. I did not author the lesson changes or ranked fixes. Read AGENTS.md, both independent learner reports, the sceptic report and ranked fixes. Reviewed the production build served at `http://127.0.0.1:4173/video-lab/`; the initial matrix screenshots show running identity `ce8d694+ae361d8`. No application source edits, build, server changes or shared test runs were performed by this checker. The root owns the full quality run and records its result separately.

## Evidence and method

Independent Playwright Chromium scripts, JSON reports, rendered text, screenshots and downloaded outputs are in `/workspace/scratch/lesson-flow/checker/`. `matrix.mjs` visits all 24 routes at 1440 × 1000 and 390 × 844 in explicitly selected light and dark themes: 96 states and 204 command cells. Each state has a full-page screenshot and text capture; `matrix.json` records actual theme, document background, overflow, editor/Run distance and explanation order. I visually inspected the phone join and export screenshots as well as targeted controls/results.

`actions.mjs` performs separate real browser interactions and writes `actions.json`, `actions.log`, the two practice logs, controls screenshots, downloaded MP4s and `previews.sh`. It does not substitute a model or native run for browser execution. Native ffprobe and FFmpeg independently inspect and fully decode its downloaded browser outputs. `followups.mjs` additionally checks all 96 states with text at 200% and opens all six revised reference commands in the built UI. The first supplementary attempt used visible theme text instead of its accessible name and timed out; the corrected pass uses the actual “Change colour theme” control and completed. These were checker-script errors, not application failures.

## Findings verified in the built page

- **Command/action proximity:** all 204 cells have one Run action, immediately following the command and shortcut. The maximum editor-bottom to Run-top distance is **52.39 CSS pixels**. Option guides and explanatory figures follow that action. No compulsory prediction/change forms or default input/select controls appeared. Notes remains closed and optional by default.
- **Actual light/dark and reflow:** all 96 states have the requested `data-theme`; document backgrounds are `rgb(245, 247, 243)` in light and `rgb(16, 27, 30)` in dark. No document-level horizontal overflow appeared, including the separate 96-state check at 200% text; its maximum command-to-Run gap is 168.22 pixels. The join and colour models retain their explanatory labels and readable layout at phone width. The colour caption explicitly describes sample counts rather than measured colours or exact positions; the join keeps separate video/audio connections.
- **Fixed original-example timeline:** on the start page, used the phone command builder to change `-ss 2` to `-ss 1` and apply it to the real editor. The figure remains labelled source interval 2–6 seconds and output duration four seconds. The edit displays “These notes and diagrams describe the original example. They do not change when you edit the command.” It does not pretend to measure the new command.
- **Preserved optional notes:** seeded an earlier stored prediction and review in this isolated browser workspace, reopened Notes and read both. Edited the review, reloaded and confirmed the revised review and original prediction both survived. No prior fields were discarded.
- **Second-source previews:** loaded inspection, copy, faststart, JSON verification and decode pages and chose `bunny-action.mp4` in each labelled source selector. Each selection exposes exactly one source player with six-second metadata and the selected filename beside the preview. The root subsequently corrected the earlier header filename, which had remained the first asset; the final-build follow-up below verifies that correction.
- **Real six-second copy practice:** changed the starter to `ffmpeg -i bunny-action.mp4 -c copy practice-copy.mp4`. Copy command placed that exact command on the browser clipboard. Focused the editor and ran it with Shift+Enter; the raw browser FFmpeg output contains both `(copy)` mapping lines. Check result passes while retaining its manual-log/playback limitation. Downloaded output independently reports H.264 video, AAC audio, **6.000000 seconds and 144 video frames**, and fully decodes with native FFmpeg without errors.
- **Real source-seconds-1–4 practice:** changed the keyframes starter to `ffmpeg -i bunny-short.mp4 -ss 1 -t 3 practice-exact.mp4` and used Run command. The browser completes and Check result passes. The command and manual comparison instruction both specify source second 1. Downloaded output independently reports H.264/AAC, **3.000000 seconds and 72 video frames**, and fully decodes without errors. These property checks do not independently prove the opening picture or a subjective quality judgement.
- **Timestamp answer:** the rendered page initially contains no `512`. Hints 1–4 also contain none; hint 5 reveals the 512-tick calculation. The stream values and inverse verification remain available before the reveal.
- **Native handoff:** the visible optional section instructs downloading the MP4s and `previews.sh` into one dedicated folder, opening a terminal there and running `sh previews.sh`. The download is actually named `previews.sh` and contains the visible POSIX script. The page retains the installed-FFmpeg requirement and clearly states that the browser does not execute the script.

## Revised practice and evidence alignment

Opened each revised practice’s reference command in the built page and matched the exact command to both native and WASM canonical records. `followups.json` saves the complete rendered practice and matched statuses. All six agree with the new source/interval instructions:

| Practice | Built reference command |
| --- | --- |
| File description | `ffprobe bunny-action.mp4` |
| Copy | `ffmpeg -i bunny-action.mp4 -c copy practice-copy.mp4` |
| Accurate cut | `ffmpeg -i bunny-short.mp4 -ss 1 -t 3 practice-exact.mp4` |
| Faststart | `ffmpeg -i bunny-action.mp4 -c copy -movflags +faststart practice-ready.mp4` |
| Structured inspection | `ffprobe -show_streams -show_format -of json bunny-action.mp4` |
| Full decoding | `ffmpeg -xerror -i bunny-action.mp4 -f null -` |

The two ffprobe WASM records retain status -1 and their validated inspection output; they are not described as native status-zero success. The four FFmpeg records retain status 0. The copy and accurate-cut starters require a real edit and were independently executed above; faststart omits its requested layout flag and JSON starts without its requested report options. Bare inspection and decoding use a genuinely different six-second source and ask for interpretation of its actual output. These remain manual reading tasks rather than graded interpretation.

## Final source-label build and narrow release-test review

Revisited the final served build, identity `ce8d694+a5747a9` (full build `a5747a9b9ed8aa19b7ea88356d204f3cc09b85da64355d15233473ed2e2a22f5`), using `final-build.mjs`. All 24 routes in all four viewport/theme modes retain exactly the command editors from the initial matrix, the expected actual theme and no document overflow. For all eight multi-input pages in all four modes, used keyboard Enter to select both sources in turn: the header filename, preview filename and selected button agree, and exactly one preview player is present. There are 32 multi-input cases, including join, reuse and native batch as well as the five changed practices. Phone/desktop and light/dark source screenshots are saved as `final-*-source-header.png`; full results are in `final-build.json`. The final label correction is verified.

Read the failure in `/workspace/scratch/lesson-flow/check-final.log`: the full run ended with **265 passed, 29 skipped and one failed**, waiting for a button named “Check for updates” in the release-error test. Reviewed the test-only change in `tests/release.spec.ts`, `AppStatus.tsx` and `useAppStatus.ts`. Opening the details panel invokes `app.open()`, which calls the forced release check. Invalid metadata sets `failedCheck`; the rendered badge becomes `unavailable` and the action becomes “Retry”. Installing the malformed response after opening and then seeking the old action name can therefore race that automatic check. The revised test installs the malformed response first, opens the panel and waits for `unavailable`; its subsequent explicit Retry cases are retained. No AppStatus product code is changed by this fix.

Independently exercised this path against the final built application with a malformed response installed before opening. Counted exactly one automatic release request, observed `unavailable` and the visible Retry action, then checked that an explicitly aborted Retry stays unavailable and a subsequent successful Retry restores latest. Saved the actual unavailable-state screenshot as `final-release-automatic-malformed.png`. This supports the narrow test-order correction; it does not replace the timeout/stale-response suite. The root-owned targeted rerun log, `/workspace/scratch/lesson-flow/release-rerun.log`, reports **20 passed** across all five projects with two repetitions. I did not run that shared suite myself or describe the earlier full run as green.

## Remaining verification boundary

This review uses Chromium, not Safari/Firefox or a physical touch device. It executes the two representative changed output practices, not all 51 commands. It does not claim a subjective sound/quality assessment, source-opening frame equivalence, network startup improvement, a native installation check or native batch-script execution. The course correctly retains manual interpretation/replay limits around metadata and completed-command checks.

The separate full `npm run check` result belongs to the root's quality record; this report does not independently claim that suite passed.
