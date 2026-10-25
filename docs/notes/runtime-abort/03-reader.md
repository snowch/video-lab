# Runtime exit adapter — independent built-site reader review

Copyright © 2026 Christopher Snow.

Date: 25 October 2026. Separate reader agent; no implementation or product-text edits. Read `AGENTS.md`, `01-investigation.md` and `02-prose.md`, then exercised the actual built preview at `http://127.0.0.1:4173/video-lab/`. Running identity shown: `d5ff391+08f4238`. The builder's test results are not counted as this reader's execution.

## Scope and method

Used Chromium through Playwright against the existing preview, without starting or stopping it. Fresh browser contexts covered desktop 1440 × 1000, tablet 820 × 1180 and phone 393 × 851, each in light and dark. On `#/learn/first-edit/shorten`, loaded the practice source, entered the reported command exactly, ran it, inspected the complete raw log and replayed/downloaded the actual output:

```sh
ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4
```

Each output was independently inspected with native `ffprobe -v error -show_streams -show_format -of json <download>` and decoded with native `ffmpeg -v error -xerror -i <download> -f null -`. Screenshots of all six combinations were visually inspected. Harness and detailed observations are in `scratch/runtime-abort/reader/review.mjs` and `observations.json`; screenshots use the device/theme filename prefix. The first harness attempt incorrectly awaited “Completed”; the actual UI says “Command completed”. The harness was corrected, and the complete six-combination run finished successfully. This was a reviewer-harness error, not a product defect.

## Observations

All six runs displayed “Command completed”. Their logs retained the FFmpeg banner, stream/encoding messages and final statistics, ending with `[aac @ 0xfc99a0] Qavg: 524.515`; none included `Aborted()` or the historical runtime note. No replacement success sentence was inserted into the raw CLI output. The complete supplied command remained visible in the editor; it wrapped onto two lines on the phone.

All six downloads contained video and audio with a measured whole-file duration of 5.000000 seconds. Native decoding returned successfully with no error output. Each inline browser player reported five seconds and 854 × 480 picture dimensions; after calling play it advanced to approximately 0.455 seconds with `paused === false`, then was paused for the screenshot. The screenshots show the decoded Bunny frame. Replay was muted in the automation; I did not conduct an audible listening or full five-second content comparison, so the stream/decode checks do not claim subjective audio or content review.

Document widths equalled viewport widths at 1440, 820 and 393 pixels in both themes. Controls remained legible and accessible in the inspected screenshots. Raw long log lines scroll within their own output area, accompanied by “Scroll sideways for long lines, or turn on Wrap output.” The responsive layouts retain command, status, output, replay and download together; no change-specific visual regression was found.

On a further phone-dark run, opened the command builder and returned to Edit command without changing the complete command; Copy command copied the exact supplied command, and Download command (.sh) produced `#!/bin/sh` followed by that command and a newline. Enabled Wrap output and scrolled the actual output pane to its ending; the encoding statistics remain readable with no abort diagnostic (`phone-dark-log-ending.png`, `controls.mjs`, `controls.json`). Builder value mutation, native execution of the downloaded shell script and broader keyboard navigation were not retested in this pass.

On desktop light, additional real commands produced the expected states and preserved actionable tool diagnostics:

| Command | Observed result |
| --- | --- |
| `ffmpeg -i missing.mp4 missing-cut.mp4` | “Command failed. Read its output before retrying.” and `No such file or directory` |
| `ffmpeg -unknown-option -i bunny-short.mp4 bad.mp4` | Failed status and `Unrecognized option 'unknown-option'` |
| `ffprobe missing.mp4` | Failed status and missing-file diagnostic |
| `ffprobe bunny-short.mp4` | Completed status and genuine stream/container inspection |

For saved output, injected a synthetic pre-change session record containing `Old saved output` followed by `Aborted()`, then reloaded. The original text remained visible, with: “This saved run includes Aborted() from an older browser runtime. Rerun the command to check its result with the current runtime.” The saved completed status was preserved. Rerunning the real command replaced the old output with clean current output and removed the note. See `desktop-light-legacy.png` and `desktop-light-legacy-rerun.png`. This exercises the compatibility display; it is not a claim that a historical user's original browser storage was imported.

Visited the actual `#/learn/export/decode` page and read the rendered text (`export-decode.txt` and `.png`). It no longer teaches that current successful commands end with an abort diagnostic. “Read the completion status and processing log together. A final progress line alone does not establish that the whole file decoded without errors.” is supported by the fact brief and gives a useful check. Full-duration/selected-stream checks and the limits of decode versus viewing/listening and other players remain explicit.

## Findings and assumptions

No change-specific blocking or lower-severity product finding was established in this review. No fixes are proposed.

The first-edit page defines input, output, cut and duration before the command, and explains its original example's `-i`, `-t` and output filename. It assumes ordinary file/command editing competence. The supplied `-y` comes from the reported user command; the page appropriately labels its explanations “Original example notes” after edits. The removed runtime explanation is no longer needed to interpret a current successful result. The historical note assumes the learner understands “saved run” and can rerun; the adjacent retained command and Run command control make that actionable.

This is a bounded review of the reported encode and affected prose/compatibility behaviour. It does not independently validate native abort fault injection, every lesson, offline/update lifecycle, Firefox, assistive technology or physical touch hardware. Parent full quality checks and separate sceptic/checker review remain necessary. No authoring work is claimed to have independently reviewed itself.

Evidence relocation: after review, the builder moved the generated scripts, logs, screenshots and media to `/workspace/scratch/runtime-abort/` outside the repository. The relative evidence commands above describe their original execution location; no generated media is included in the source commit.
