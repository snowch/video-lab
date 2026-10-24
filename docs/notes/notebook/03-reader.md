# Notebook course — independent fresh learner review

Copyright © 2026 Christopher Snow.

Reviewed 24 October 2026 by a separate fresh-reader agent, using the built preview at `http://127.0.0.1:4173/video-lab/`. I read AGENTS.md and the notebook plan, then approached the course as a technically competent learner with no assumed video knowledge. I did not edit product code. This is a reader review, not a claim that the whole quality suite passed.

## Evidence and coverage

Browser evidence and executable review scripts are under `/workspace/scratch/notebook/reader/`. `pages-corrected.mjs` visits all 24 routes, saves the built main-element text for each and captures 1440 × 1000 desktop and 390 × 844 phone layouts in light and dark. `layout.json` records no horizontal document overflow in those captures. I read every page's rendered explanation, flag definitions, prediction, change task, independent task, stated checking limits and review prompt. I inspected representative actual screenshots, including the long join command on phone and padding on desktop, in both themes; I did not manually scrutinise every pixel in all 96 screenshots. The first screenshot harness incorrectly looked for the visible theme label instead of its accessible name; `pages-corrected.mjs` corrected that, and the final named light/dark screenshots use the actual themes. Theme switching itself works.

The preview was rebuilt during review. The early first-cut evidence displays running identity `197900c+a5334a1`; later captures include `197900c+d319ae4`. These are both before the author's announced fix for inspection-check feedback. Reproduction should use the built version, rather than treating the current source as evidence that a fix has shipped.

Actual browser actions included:

- Loading supplied media; running `ffmpeg -i bunny-short.mp4 -t 5 first-cut.mp4`; reading the raw FFmpeg log and viewing the generated result.
- Running a bare ffprobe independent cell, checking it, changing its input to `missing.mp4` and observing the failure with the actual `No such file or directory` output. Editing a run retains its earlier executed command and marks it stale (`stale.png`).
- On a touch-enabled phone context, changing the independent cut duration in Command builder, applying it to the full command, running it and replaying it. The three-second output reports 854 × 480 and video currentTime advances during playback. A deliberately retained five-second duration fails the three-second check; a three-second output passes duration/video/audio checks (`practice-check.txt`, `practice-correct-check.txt`).
- All five first-page hints, the reference command and prediction comparison. The hints progress from locating input/output to the exact requested duration; revealing the reference remains separate from executing it.
- Phone Chapters navigation, next-page navigation, browser back and reload. The edited three-second command survived back and reload.
- Files dialog, source selection, subtitle text preview/edit/save, folder and text-file creation, copy and rename, and the deletion confirmation. Files controls are ordinary app controls and virtual paths remain explicitly distinguished from OS folders. Evidence includes `files-created.txt`, `subtitle-file.txt`, and `delete-confirm.txt`.
- A 390-pixel join page with doubled root text size (computed 32px). Document scrollWidth remained 390px (`double-text.json` and `double-text-phone.png`).

## Findings for independent sceptic

### R1 — Medium: successful processing ends in an unexplained abort message

The first worked cut shows app status **“Command completed”**, a generated `first-cut.mp4` result, and a raw tool log whose final line is **`Aborted()`**. There is no nearby explanation of why an abort line is compatible with a successful result. The same line appears after the independently generated three-second output, which replayed and passed its property checks.

Evidence: `run-first.txt`, `run-first.png`, `practice-correct-check.txt`, `practice-correct-phone.png`. The decode page specifically instructs: **“Warnings and errors have different meanings; do not infer success merely from the final line looking familiar.”** A learner cannot resolve this status conflict from the material shown.

Suggested direction: preserve the raw log and add a precise, separately styled explanation of the verified engine cleanup behaviour when that is what occurred. State what evidence the app uses to report completion. Do not silently remove raw lines or imply that every abort is harmless.

### R2 — Medium: successful inspection checking gives no visible feedback

After the independent `ffprobe bunny-short.mp4` run completed successfully, clicking **“Check result”** left only that button and the checking-limit paragraph visible; no inspection confirmation or matching-properties message remained after a one-second wait. The actual probe report correctly describes the supplied video/audio streams, but the task's checking interaction appears inert.

Evidence: `probe-check.txt` produced by `real.mjs`. Compare its final Technical checks section with the clearly visible positive and negative property rows in `practice-correct-check.txt` and `practice-check.txt`. This is a problem with check feedback, not evidence that ffprobe failed. The later invalid-input run correctly shows **“Command failed. Read its output before retrying.”** and the real missing-file log (`probe-error.txt`).

Suggested direction: retain a check result while the underlying command/input evidence remains unchanged. Invalidate it when relevant evidence changes. Have a separate checker verify an inspection-only task and a property-checked output task on the rebuilt page.

## Learner assessment

The ten-chapter progression is coherent. Container/stream/codec distinctions precede stream copying, picture cadence precedes timestamp arithmetic, and cropping precedes filter chaining and padding. The join graph is the largest jump, but its input numbering, bracket links, filter settings and maps are explained before the cell. The title page explicitly restricts its first example to one word and acknowledges escaping limits. The subtitle page distinguishes burned-in lettering from a selectable subtitle stream. The final shell exercise explains its shell syntax separately and repeatedly states that it runs outside the browser.

The check-limit prose is unusually concrete: duration does not prove the selected source interval; codec does not prove stream copying or CRF; stream presence does not grade audibility; MP4 metadata checks do not prove network startup. Independent practice usually changes a parameter or ordering while the reference remains optional. Source attribution and modified-media provenance are visible. I found no new media concept that the learner must guess to perform the supplied worked command.

No blocking layout or conceptual finding emerged from this review. R1 and R2 should be adjudicated by the sceptic and checked after any fixes.

## Limits

I did not execute all 51 worked/practice commands, a native batch script, destructive real-user migration, all import-folder platform behaviours, offline/update coordination, cancellation at every processing phase, storage-quota failures or every download format. The author has separate tests for broader command/engine behaviour; those are not claimed as my independent evidence. I did not rerun the full repository suite. The review uses headless Chromium with touch emulation, not a physical phone or an independent browser engine.
