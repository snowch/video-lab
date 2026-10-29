# Overwrite playback: independent learner review

Copyright © 2026 Christopher Snow.

29 October 2026. Separate reader agent; did not author the fix. Read AGENTS.md, 01-plan.md and 02-investigation.md. Inspected the actual built site at `http://127.0.0.1:4198/video-lab/` in Playwright Chromium, desktop 1440 × 1000 and Pixel 7 touch emulation at 412 × 839, light and dark. Compared the one wording finding with the frozen baseline at port 4197. No product edits.

## Outcome

No blocking learner issue or playback regression found in the reviewed paths. Same-filename outputs and retained Files previews produced a decoded signal after real WASM processing. The remaining minor wording issue predates this fix. There is no learner-visible claim here that the reported physical-device silence has been reproduced or conclusively explained.

## Built-page evidence

- **Source playback during inspection.** Played the actual source through an AudioContext and kept that context connected throughout `ffprobe bunny-short.mp4`. The player kept its URL and DOM node, advanced from 1.01069 to 1.855259 seconds, remained playing, and produced post-inspection maximum sampled RMS 0.069775. Evidence: `source-controls.json`. An earlier harness closed the context before reusing its media element; its subsequent stalled-time observation is invalid instrumentation and is superseded by this connected-context check.
- **Inline audio and overwrite.** Ran `ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 audio.wav`, then `ffmpeg -y -i bunny-short.mp4 -t 4 -vn -ar 8000 audio.wav`. Both actual inline players produced maximum sampled RMS around 0.0325 with about 0.8 seconds of clock advancement. Downloaded the replacement through the UI: native ffprobe identifies one PCM signed 16-bit stereo stream, 8000 Hz, four seconds. Native volumedetect decodes it successfully and reports maximum volume −16.0 dB. Evidence: `evidence.json`, `audio-8000.wav`, `native-volume.txt`.
- **Overwrite protection and retained output.** Retrying without `-y` reports “An output with that name exists. Choose a new name, or add -y to allow FFmpeg to replace it.” The previously saved audio remains available in Files and produces nonzero decoded signal. On the phone, tapping “Add -y and rerun” changes the complete editor command to `ffmpeg -y -i bunny-short.mp4 -t 4 -vn -ar 8000 phone.wav`; the replacement completes and produces RMS 0.029445 over 0.60615 seconds. Evidence: `phone-overwrite.json`.
- **Other-window replacement.** Left the Files audio preview open in a second window while overwriting `audio.wav` to 6000 Hz in the first. The viewer receives a new media node and URL. The old node is paused with its `src` attribute removed. A deliberately dispatched error on that retired node does not hide the replacement; the replacement produces RMS 0.032513 and advances 0.807389 seconds. This is an explicit stale-event injection, not a naturally occurring decode error. Evidence: `evidence.json`.
- **Other preview types.** Generated `still.png` with real FFmpeg; Files displays a complete image with natural dimensions 854 × 480 and filename alternative text. Imported `reader-note.txt` through Files; its two original lines remain intact in the editable text view. Evidence: `evidence.json`.
- **Phone and themes.** Reviewed source/model, editable commands, raw output, inline audio, Files audio and useful errors at phone size, with light/dark screenshots. Document width equals viewport width (412 px on phone; 1440 px on desktop). Measured visible button, label, summary and editor font sizes have no values below 12 px. The native audio control fits the phone Files dialog. Phone inline and Files players both produce RMS 0.032514. Screenshots and measurements are in the scratch evidence directory.
- **Keyboard and command controls.** Shift+Enter runs the edited command; Files opens with Enter and closes with Escape; the output resize handle responds to ArrowUp (320 → 288); Wrap output can be toggled; command download contains the exact inspected `ffprobe bunny-short.mp4` line. Opened/closed the command builder and checked that the full editor command stays available. Controls retain descriptive labels rather than unexplained glyphs. No page errors were observed during the main desktop run. Evidence: `source-controls.json`.

## Wording and prerequisite review

The existing comparison instructions accurately distinguish listening from metadata: “The report verifies the file’s rate and duration. Listening lets you compare pace and pitch with the source; the reported sample rate alone does not establish how the result sounds.” The technical-check description likewise says checks do not assess pitch or audible detail. The rate/channel/sample explanations needed for this exercise are present. This lifecycle fix introduces no new concepts or learner copy requiring explanation.

### R1 — minor, existing: wrong direction to the error log

Quote: “ffprobe could not inspect that input. See its log above.”

Reproduction: run `ffprobe missing.wav`. In both fixed port 4198 and frozen baseline port 4197, this sentence appears before the “Command output” block containing `missing.wav: No such file or directory`. The useful raw explanation is below the message, so “above” directs a learner the wrong way. The actual error and recovery context remain understandable; this does not block the playback fix.

Suggested direction: remove the positional word or refer to the visible “Command output” label. Evidence: `phoneError` in `evidence.json`, `phone-dark-error.png`, and `baseline-error.txt`.

## Limits and evidence location

Scratch artifacts: `/workspace/scratch/overwrite-audio-reader/`. Main runs: `review.mjs`, `source-controls.mjs`, `phone-overwrite.mjs` and `baseline-copy.mjs`; their logs/JSON and screenshots record the observations above. This reader pass did not run the complete quality gate.

Nonzero analyser data establishes decoded signal inside Chromium’s media pipeline; it does not prove physical speaker sound or hardware routing. Pixel 7 emulation is a viewport/touch check, not an Android audio-backend reproduction. No natural permanent silence was reproduced. The separate sceptic and built checker should retain that limitation when reviewing the fix.
