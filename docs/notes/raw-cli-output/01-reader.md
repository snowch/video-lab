# Fresh learner review: raw command output

Copyright © 2026 Christopher Snow.

The separate `prototype_reader` agent reviewed the built workbench at `http://127.0.0.1:4173/video-lab/optional/command-workbench.html` on 23 October 2026. This is an interim review of the raw-output presentation while Inspect still explicitly requested `-of json`. The owner subsequently requested native default ffprobe text; that new default has not been reviewed here. It does not repeat the preceding full workbench review or claim that all course pages changed. No implementation edits were made.

## Findings

No new blocking or corrective finding was established in this slice. The output now corresponds directly to the executed command, and the former metadata badges, result heading and default cleanup commentary are absent from the main result presentation.

## Actual browser checks

Executed the practice source → ffprobe → FFmpeg trim → deliberate missing-input failure sequence in Chromium at phone 390 × 844 and desktop 1365 × 900, in both light and dark themes. These were real browser-tool runs in fresh contexts, not stored response simulations.

- The command echo starts with `$ ffprobe … -of json mousepad-demo.mp4`. The actual JSON is visible immediately below it without opening a report disclosure. In all four runs, its complete text exactly equalled the downloaded report file, including formatting. The source reports its real video stream and twelve-second duration.
- The visible result contains no `Command result` heading, metadata badges or pinned-core cleanup explanation. The command's `-of json` explains why the authentic output is JSON; the editor/copy surface does not include the echoed `$` prompt.
- On phones, `More output →` moved the report horizontally, and Wrap lines fitted it to the available width. There was no document-wide horizontal overflow.
- Changing the requested container-report option left the earlier report unchanged and showed stale-output guidance. The old command echo continued to identify that report, rather than pretending the edited command had produced it.
- FFmpeg's actual version, input, encoder and progress/log text is presented directly. Replay and download remain normal app controls below the output. Downloaded the edited MP4 and ran native ffprobe: the file has one video stream, no audio stream and `6.000000` seconds of duration.
- A typed `ffmpeg -i missing.mp4 missing-output.mp4` failure retained that exact command echo and visible tool log, including `missing.mp4: No such file or directory`. The application said the operation had failed and directed the learner to the tool output. It did not claim the earlier successful command or output belonged to this failed run.
- Returning from Trim to Inspect retained the earlier inspection report. The source and generated files remained available.
- Optional browser diagnostics did not claim a validated ffprobe report before any run. After the actual probe completed, opening Workspace and browser limits → Browser tool diagnostics exposed the pinned-core explanation and `Tool return status: -1`; the main JSON presentation remained unaffected.

No JavaScript page errors occurred in the four complete review flows. Screenshots in `evidence/reader-*` show probe, trim and failure states for each viewport/theme. Review scripts and logs are `/workspace/scratch/raw-reader/review.mjs`, `review.log`, `results.json`, `associations.mjs` and `associations.log`. The downloaded output is `/workspace/scratch/raw-reader/output.mp4`; the four downloaded JSON reports are beside it.

The review deliberately did not repeat browser recording, all storage/offline paths or every existing file control, because they are unchanged by this presentation slice. No physical touchscreen or screen-reader test is claimed. The additional association script verified pre/post-run diagnostics, then was stopped on the owner's new default-output steering; its remaining cross-failure navigation assertions are not claimed. Passing this interim scoped review is not a substitute for the repository quality gate or the separate sceptic and checker passes.

## Final default-output addendum

After the owner requested bare ffprobe, the same independent reader reviewed the rebuilt default in Chromium phone 390 × 844 and desktop 1365 × 900, both light and dark. The following supersedes the earlier default-format scope; the earlier JSON-only review remains above as history.

The initial command is exactly `ffprobe mousepad-demo.mp4`. The former report-format checkboxes are gone. Running it displays the actual native-style version/input metadata, `Duration: 00:00:12.00`, and `Stream #0:0… Video: h264 … 1280x720` lines. No JSON or internal validation filename appeared in that output. There are no metadata-summary badges, result heading or visible wrapper return status around the default transcript. The executed command echo matches the submitted bare command.

All four viewport/theme runs correctly failed `ffprobe missing.mp4`: the raw output named the missing file, the app reported failure, and it did not retain a completed-success message. In phone-dark, manually requesting `-of json` still yielded a real report whose displayed text exactly equalled its download. `ffprobe -v error mousepad-demo.mp4` succeeded with no invented output. An invalid option produced failure rather than false success. These checks support the externally visible behaviour; this reader did not claim to independently prove the engine's private validation implementation.

Horizontal scrolling and Wrap lines worked with native text on both phone themes. No document overflow or JavaScript page errors occurred. Screenshots are `evidence/reader-final-*-native.png` and `reader-final-*-missing.png`; scripts/results are `/workspace/scratch/raw-reader/default-probe.mjs`, `default-probe.log`, and `default-results.json`. The optional JSON report is `final-manual.json` beside them. The engine's subsequent genuine-zero help/version refinement was reported by the builder; this reader did not repeat help/version validation or the entire matrix for that edge case.

### R1 — Low: useful summary lines begin below the output viewport

On all four tested layouts, the completed bare-probe output had `scrollTop=0`, `clientHeight=320` and `scrollHeight=487`. Its Duration and Stream lines occur after the version/build/configuration and container metadata. The initial output view therefore shows the preamble while the lines the lesson asks the learner to inspect are below the inner viewport. The complete raw text is present and can be scrolled, so this is a discoverability issue, not missing or fabricated output.

Suggested direction: consider following new output to the end, or showing an explicit downward-scroll cue, while preserving every line and allowing the learner to scroll back. Do not reintroduce parsed badges or replace the real output with a summary. The current native output, failure behaviour and optional JSON path otherwise met the requested presentation change; no correctness blocker was found.
