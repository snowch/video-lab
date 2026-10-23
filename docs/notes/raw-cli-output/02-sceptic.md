# Independent sceptic review: raw command output

Copyright © 2026 Christopher Snow.

**Interim evidence only.** This pass tested the earlier explicitly JSON-formatted command. During closure, the owner requested removing `-of json` from the default and displaying ordinary human-readable ffprobe output. That subsequent behaviour was not built or tested in this pass and requires a further independent check. This record does not approve the new default.

The separate `prototype_sceptic` agent challenged the reader's no-finding conclusion against real browser runs on 23 October 2026. The reviewer did not implement this slice and made no implementation or prose changes. The reviewed application was `http://127.0.0.1:4173/video-lab/optional/command-workbench.html`, bundle `workbench-BZ-yJ-Wq.js`, SHA-256 `9a365651f09a1f8d204fcdb0f9a63afe17e49dcd79612d139086c42934a78996`.

## Decision

The reader's scoped conclusion is upheld. No corrective finding was established. There are no ranked changes arising from this sceptic pass; the separate checker and full quality gate remain necessary.

The primary report is the actual JSON requested by `-of json`, not a metadata summary or a simulated terminal response. In Chromium phone-dark (390 × 900), Chromium desktop-light (1365 × 900) and Firefox phone-light (390 × 900), ran the practice-file inspection and compared the visible preformatted report with the downloaded report text. All three comparisons were byte-for-byte equal. The actual report gives the selected source's twelve-second duration. No metadata badges or `Command result` heading replaced the report.

Directly edited the command after each inspection. The visible echo and report continued to identify the previously executed command, not the new draft. Executed a separate FFmpeg command in Trim, then returned to Inspect: its earlier probe command and complete report remained intact, with no Trim filename or log relabelled as inspection output.

For the live-log check, executed `ffmpeg -i mousepad-demo.mp4 -t 6 -vf scale=1920:1080 -c:v libx264 -an sceptic.mp4`. In all three browser cases, actual FFmpeg log text was visible while Cancel operation was still present. Log text then grew and remained visible after successful output creation. This establishes live and completed log presentation rather than merely finding an output panel after the run. It does not claim native ffprobe verification of these particular downloaded videos; the reader independently verified the ordinary trim output.

A further fresh-context failure run first produced a real inspection report, then executed `ffmpeg -i missing.mp4 missing-output.mp4`. The older JSON was removed from the current run. The terminal echoed that exact failed command and displayed the actual missing-file log without opening a disclosure. The application correctly stated that the operation had not finished and retained saved files; it did not show a running status after the failure.

## Rejected interpretations and limits

- In this reviewed build, JSON matched the displayed command's explicit `-of json`. The owner's subsequent request for a different default requires verifying that default command and its actual human-readable output separately.
- The `$` prefix identifies the submitted command. It does not appear in the editable or copied command and does not establish an operating-system shell. The workspace boundary remains explained.
- Moving the wrapper return value into optional diagnostics does not manufacture a native success code. Before opening diagnostics, both the pinned cleanup explanation and `Tool return status` were hidden. Opening Workspace and browser limits → Browser tool diagnostics after the completed probe exposed the accurate `-1` wrapper return and qualification. Actual tool log lines remain visible in the terminal.

No JavaScript page errors or document-wide horizontal overflow occurred in the three complete independent flows. Screenshots and log evidence are in `/workspace/scratch/raw-sceptic/`; scripts/logs are `/workspace/scratch/raw-sceptic.mjs`, `/workspace/scratch/raw-sceptic.log`, and `/workspace/scratch/raw-sceptic-failure.mjs`. This is a focused presentation review. Browser recording, the full offline lifecycle, physical touch behaviour and screen-reader interaction were not repeated or claimed.

## Final bare-default addendum

The sceptic independently tested the rebuilt bare ffprobe default after the owner's clarification and challenged the reader's final addendum. The initial new-default build was `workbench-CpC2Xclz.js`, SHA-256 `cb2b47ee16b24aa504ddfdbfd698c549d352178b3c449d09a46739bc6cee9d98`. A subsequent genuine-zero help/version refinement was separately tested on `workbench-DBQQG0AK.js`, SHA-256 `9e7f6d5070dfd8784c7b77138066ed15b7ad1d7738832454b55a6705340b8dc8`. These checks supersede the earlier default-format scope; they do not erase the interim evidence above.

In Chromium phone-dark at 390 × 900 and Firefox desktop-light at 1365 × 900, the initial command was exactly `ffprobe mousepad-demo.mp4`. Actual processing displayed `Duration: 00:00:12.00` and the H.264 video Stream line. No JSON report, report-download button or metadata badge appeared for this bare command. The wrapper diagnostics remained hidden by default. The internal validation filename did not leak into the visible command transcript.

Executed the following separately in both browsers:

- `ffprobe missing.mp4` produced the actual missing-file output and app failure, not completed-success feedback.
- `ffprobe -bad_option mousepad-demo.mp4` displayed the real unknown-option error and failed.
- `ffprobe -v quiet mousepad-demo.mp4` succeeded without invented log or JSON text.
- `ffprobe -v error -show_streams -show_format -of json mousepad-demo.mp4` still produced actual JSON. Displayed and downloaded report text were equal, including formatting.
- Opening optional diagnostics after the successful probe exposed the retained wrapper return `-1` and its qualification; it was not presented as native zero.

On the subsequent DBQQG0AK build, a fresh phone-light run again verified the bare default. `ffprobe -version` and `ffprobe -h` then completed with their actual text and no JSON. `ffprobe -v quiet missing.mp4` failed without manufacturing log text that the quiet command did not emit. The implementation distinction between a genuine zero return and the ambiguous `-1` sentinel is consistent with these observations. The source review also confirmed that the original argument list is executed before any separate JSON validation, that private validation logging is not forwarded, and that the returned original code is retained.

### Final R1 — keep, low: default log does not initially expose its tail

Independently reproduced the reader's finding on DBQQG0AK at 390 × 844 dark. The completed log had `scrollTop=0`, `scrollHeight=487`, `clientHeight=320`, and a 20.15px line height. Duration and Stream occurred at zero-based line indices 17 and 18, below the initial visible area. Every line is present; this is a discoverability issue rather than missing output or incorrect processing.

Following newly arriving terminal log output to the tail is a proportionate fix, provided manual backward scrolling remains usable and raw text is unchanged. The separate JSON report should continue to open at its beginning. A final checker must test the rebuilt scrolling behaviour; this pass does not approve an unbuilt follow-tail change. There is no new correctness blocker or rejected reader finding in the bare-default revision.

The final-default scripts and evidence are `/workspace/scratch/bare-sceptic.mjs`, `bare-sceptic.log`, `bare-sceptic-final.mjs`, `bare-sceptic-scroll.mjs`, and the `bare-sceptic/` directory. The first quiet-success assertion accidentally compared the whole status with a shortened sentence; correcting it to the actual completed-status prefix passed. This was a harness wording error, not an app failure. No JavaScript page errors or document-wide overflow occurred in the completed independent default runs. This addendum does not repeat the full offline lifecycle or physical-device/screen-reader tests.
