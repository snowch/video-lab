# Fresh learner review of the command prototype

Copyright © 2026 Christopher Snow.

The separate `prototype_reader` agent reviewed the built standalone prototype at `http://127.0.0.1:4173/video-lab/optional/command-workbench.html` on 23 October 2026. The reviewer did not draft the copy or implementation. The review began from the built page without reading other review findings. Audience: an engineer familiar with files and terminals, learning media concepts for the first time. This is a three-step UX prototype, not a claim of implemented FFmpeg execution or a completed replacement curriculum.

## Findings for the sceptic

### R1 — Medium: choosing an imported video's trim times requires leaving the task

For an imported source, Trim says `Choose times that suit your own recording.` There is no video player or replay control on this task. The source chip offers only `Change source`. To find the action's time, the learner must return to Get video, play/seek the source there, then return to Trim. The command draft survives, but checking the candidate start/end against the original requires repeated navigation through a source-selection screen.

Suggested direction: offer a collapsed source replay beside the source filename on Trim, so a learner can inspect the original while choosing the command's times. It can remain closed initially to preserve the compact layout.

Mobile geometry alone is not a separate failure: at 390 × 844, timing fields start at document y=624, the command occupies y=779–902, and `Preview run` ends at y=1012. The fields → command → run sequence spans about 388 pixels and fits one viewport after a normal downward scroll. The initial viewport only shows part of the command, but that does not itself establish an excessive return trip. Option explanations remain available in a disclosure above. No physical on-screen keyboard was tested.

### R2 — Medium: preview drops keyboard focus to the start of the page

Focused `Preview run`, pressed Enter, and observed `document.activeElement` become `BODY`. The next Tab focused `Skip to lesson`, instead of continuing near the result. The replacement of the command card loses the original control's focus. This creates a long keyboard return trip even though the result is adjacent visually.

Suggested direction: put focus on the newly shown result or preserve a sensible action focus after rerendering. The builder independently alerted the reviewer to a planned focus fix during this review; the reviewer then reproduced this finding on the still-served page. This record describes the observed build, not a claim about an untested fix.

### R3 — Low: the summary badges require codec knowledge

Inspection shows `H.264 · 960 × 540`, `AAC`, and `10 s`. The introductory paragraph defines a stream, but these badges do not identify video, audio, picture dimensions or duration. A learner can discover `codec_type` in the expanded JSON, and the later Trim option explanation connects the codec names to picture/sound encoders. The compact summary itself nevertheless assumes the knowledge the learner is acquiring.

Suggested direction: label the badges with their role, such as video, audio and duration, and identify the dimensions as pixels. This does not require an extended codec lesson at this point.

## What worked

- The source screen uses ordinary `Use practice video`, `Import video`, playback and download controls. The command editor contains native FFmpeg/ffprobe syntax. Typing `sample` produces useful guidance to use the app controls, without treating it as a Unix tool.
- The builder shows `-ss`, `-t`, `-show_streams`, `-show_format` and the entire command. Changing duration from six to four updates the actual command text. Sound removal adds `-an`. Output-name/source conflicts and out-of-range practice-video durations have specific feedback.
- `Type command` preserves a custom edit. Returning to the builder requires an explicit choice. `Keep my edited command`, replacement and `Restore typed command` all worked. Navigation and changing the selected source retained the custom command, with a visible filename-review warning.
- The prototype banner, `Simulated execution`, recorded-example notice and proposed-output notice make the execution boundary clear. Imported media receives no invented measurements. Custom commands are explicitly unexecuted and unverified. Recording and edited-video export are disabled with reasons.
- Source download returned the original bytes, checked by SHA-256. Clipboard copy returned the visible command. Downloading the command produced the edited command in a `.sh` file. These are real browser actions and are not passed off as media processing.
- Opening the report showed genuine recorded JSON. Right-scroll control moved the report, and Wrap lines removed horizontal report overflow. Stream-only selection omitted the container object. Selecting neither report section produced useful guidance.
- Theme changes, step buttons, Back, Restart, source selection and actual local playback worked. All tested pages had no document-wide horizontal overflow and no JavaScript page errors.

## Scope and evidence

Executed full source → Inspect → Trim journeys in Chromium at phone 390 × 844 light/dark, tablet 768 × 1024 light, desktop 1365 × 900 light/dark; Firefox phone 390 × 844 dark. Exercised manual/builder replacement/restoration, imports, source change, command download and restart in each. Imported the actual original bytes under `learner's demo.mp4`; the generated command quoted the apostrophe and space, and the prototype correctly treated it as an unmeasured import. Opened the standalone `file://` HTML in Chromium and played the embedded practice media past the initial frame.

Review scripts and screenshots are under `/workspace/scratch/command-ux/reader/`, with scripts `/workspace/scratch/command-ux/reader.mjs`, `reader-details.mjs` and `reader-geometry.mjs`. These are review evidence, not a claim of production processing, a screen-reader pass or physical phone/tablet testing. No fixes were made by this reviewer.
