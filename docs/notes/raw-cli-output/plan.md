# Raw CLI output

Copyright © 2026 Christopher Snow.

The owner rejected metadata badges and browser cleanup commentary in the workbench's result presentation. Teach the actual output produced by the displayed FFmpeg/ffprobe command. The owner subsequently clarified that the default must omit `-of json`. Start with `ffprobe SOURCE` and display its real readable Duration/Stream summary. Keep explicit `-of json` available for structured reports, shown verbatim without badges or a collapsed report. Show actual FFmpeg log lines directly as they arrive. Echo the executed command and keep stale-result and failure feedback truthful. Browser controls for files, replay and downloads remain below the terminal output.

The default inspection arguments change to bare ffprobe. Media, stored files and recipes are preserved. The shared parser accepts bare ffprobe as well as explicitly requested JSON. Do not manufacture a native zero exit status or suppress real log lines. Move the pinned-core cleanup explanation and raw wrapper return value to optional browser diagnostics. Preserve horizontal output scrolling, its visible cue and the wrapping toggle. Store completed logs with their command so moving between steps cannot label earlier output as a different command.

Reuse the already verified real WASM engine and sample. Extend the existing browser run test to verify the actual JSON is visible and equals its downloaded report, with no summary badges. Separate prose pass, fresh built reader, sceptic and checker apply under AGENTS. Run the full quality gate and deploy reviewed main changes under the owner's standing authorisation.


## Verified readable-output capability

A genuine browser spike called the pinned core with bare `ffprobe mousepad-demo.mp4`, missing input, unknown option and quiet logging. Readable output is emitted as genuine stderr lines. Normal and missing-input calls both return wrapper sentinel -1, so that number alone cannot establish success. The runtime runs the requested command unchanged, then independently validates the same arguments with an internal `-v error -show_error -show_format -of json -o cli-internal-validation.json` call. Internal validation output is not forwarded into the visible transcript and is not saved in the learner workspace. Validation checks actual JSON/error evidence; the original wrapper value is preserved, never converted into a fake native zero. Both calls share one bounded, cancellable worker job. Existing explicitly requested JSON execution/evidence remains unchanged. `media/spike-cases.json` records successful and missing-input paired executions; `media/native-readable.txt` and `media/wasm-readable.txt` record actual readable output (versions differ).
