# Ranked resolution

Copyright © 2026 Christopher Snow.

The owner clarified that the first Inspect command should be `ffprobe SOURCE`, with no automatic `-of json`. Verified native/WASM evidence preceded the separate revised prose draft. Interim reviews of explicit JSON presentation remain in the record; the reader and sceptic each appended a separate review of the real bare-command build.

- R1 (low), independently upheld: raw log text begins with the tool banner, initially hiding Duration/Stream lines in the bounded output area. Native log views now follow arriving output to the end. Scrolling back disables following until the learner returns to the bottom; JSON remains at its beginning. Raw lines, horizontal scrolling and wrapping are preserved. Final built checker verification is required.
- Removed the derived metadata badges, “Command result” and “Command that produced this output” decoration. The actual executed command is echoed beside actual output. FFmpeg logs appear directly while work is active. Optional structured JSON remains verbatim and downloadable when explicitly requested through Type command.
- Standard ffprobe succeeds with actual human-readable output. Missing or corrupt media is not accepted merely because the wrapper returns -1: a separate internal error/format probe validates the same arguments. The private JSON does not enter the learner transcript or workspace. Actual zero returns (including version/help) are accepted as zero; no native zero is invented. Explicit JSON report evidence remains unchanged.
- Browser wrapper return/cleanup explanations are optional diagnostics under the workspace/browser limits disclosure. General CLI capability wording now distinguishes readable output from saved JSON evidence; existing graded-report commands remain explicit JSON.
- Completed logs remain associated with the actual executed command across Inspect and Trim. Changing a command marks earlier output stale; source selection clears obsolete output. Failure/cancellation feedback and source/output protection remain active.

A targeted real-browser pass verifies bare output, missing/corrupt input, unsupported flags, quiet success, native version, optional JSON byte equality, actual exported media, cancellation/retry and offline execution. The full quality gate and final independent checker are recorded separately before authorised main deployment.
