# Separate raw-output prose pass

Copyright © 2026 Christopher Snow.

The separate `prototype_drafter` agent read the raw-output plan and the current workbench renderer. This revision changes result presentation, not media processing, argument validation, source files or saved recipes. The builder's fact brief records the preceding real-WASM validation: 79 unit tests and 145 browser tests. Those earlier results do not replace this slice's required checks.

Added the disclosure label “Browser tool diagnostics”. Changed the failure guidance from “Open Processing log for details” to “Read the tool output for details”, because log lines are now visible directly. The accessible labels “Command output” and “Processing log” remain appropriate for the report and log regions.

Changed stale-result feedback to refer to output from the earlier displayed command, without claiming that every result is a saved file. An unsaved ffprobe report is still output from an executed command. The recovery action is to run the current command again.

The `$` line is an echo of the command submitted by the learner. It is displayed separately from tool output and does not claim that the browser provides a Unix shell. The command editor and copy/download controls contain the command itself, without the prompt. The existing browser-boundary explanation remains accurate.

The Inspect example explicitly requests native `-of json`; showing its returned report immediately preserves that format instead of replacing it with metadata badges. The result text is also used for the report download. The builder is extending the browser test to compare the displayed report with the actual downloaded report. Real FFmpeg log lines remain distinct from JSON and from the app's completion or failure status.

The pinned-core cleanup explanations and “Tool return status” wording are preserved as optional diagnostics. A wrapper return value must not be relabelled as a native success code. The existing `probeCleanup` text says that the JSON report “was validated”, so the renderer should show that sentence only for a completed ffprobe result; a general pre-run note should use conditional wording instead. The separate reader and checker should verify the final condition on the built page.

No measurements, summary labels or additional processing claims were introduced. This pass owns only the strings file and this drafting record; the independent built reader, sceptic and checker remain separate.

## Subsequent default-probe revision

The owner then explicitly requested the bare `ffprobe FILE` command instead of JSON as the default. This supersedes the earlier JSON-default presentation described above. The builder's actual WASM spike produced FFmpeg version information and the native Duration and Stream lines for the twelve-second Mousepad recording. It also established that the wrapper returns -1 for both a readable file and a missing input. The raw return value therefore cannot establish success on its own.

The builder's revised engine runs the requested arguments unchanged, then performs a separate internal validation with error, format and JSON options. Validation output is not presented as output from the learner's command. The default command remains bare ffprobe. Explicit JSON commands retain their existing behaviour and remain required where the older lab checks need saved structured evidence.

Added `command.probeDefault` and `flags.probeDefault`, updated the Inspect task to describe native Duration and Stream lines, and moved JSON advice to an optional typed-command explanation. Updated the workbench browser-boundary note and the older CLI's general capability text so neither falsely says ffprobe is JSON-only. The older lesson examples and assessment requirements are unchanged.

The optional diagnostics now explain that -1 can accompany successful or failed ffprobe calls and that the app checks the input separately. This avoids claiming that the learner requested JSON or that an internal report is their displayed output. The earlier past-tense diagnostic concern is resolved by this general wording. The regular CLI success message says the media check passed without claiming a displayed JSON report.
