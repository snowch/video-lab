# Notebook course — independent sceptic

Copyright © 2026 Christopher Snow.

Reviewed on 24 October 2026 by a separate sceptic agent after reading AGENTS.md, `01-plan.md`, `02-prose.md` and the fresh learner's final `03-reader.md`. I independently reproduced both reader findings against the existing built preview at `http://127.0.0.1:4173/video-lab/` in a fresh Chromium context. I made no product edits, rebuilt no assets and did not run the full suite.

The observed running identity was `197900c+d319ae4`; the served course bundle was `course-CTC2oO6I.js`, SHA-256 `a743cc337d053489985888be1079b95cee23d64bb79eafdf014fe87efd45ba37`. The current source already contains a proposed R2 fix; source alone is not evidence that the served page has been fixed.

## Retained findings

1. **R2 — medium: inspection check confirmation disappears.** Independently opened `#/learn/inside-video/inspect`, used the already loaded supplied source, ran the independent `ffprobe bunny-short.mp4`, waited for “Command completed”, clicked “Check result” and waited 1.5 seconds. The complete Technical checks section still contained only the limit paragraph and button. There was no matching-properties or inspection confirmation. This reproduces the reader's finding against served bytes. `Workspace.check` refreshes files and returns a valid inspection message; the cell's file/hash effect can clear the local result following that refresh. The proposed source now conditions clearing on actual evidence changes, but a separate checker must test the rebuilt page, including subsequent command/input changes and an output-property check.
2. **R1 — medium: successful output ends in unexplained `Aborted()`.** Independently opened `#/learn/first-edit/shorten`, loaded practice files and ran the first worked cell unchanged. Its status was “Command completed”, its raw output contained the final bare line `Aborted()`, and its generated video actually replayed: duration 5 seconds, 854 × 480, playback time advanced to 0.61 seconds. Neither the cell nor the surrounding rendered page explains the discrepancy. Retain the raw line and add a conditional, separate explanation tied to this pinned build's verified completion evidence. Do not generalise that all aborts are harmless. For FFmpeg, the engine requires status 0 and reads a non-empty output before returning; the notebook additionally saves the output and its hash. Bare ffprobe has a different, independently validated cleanup-sentinel path and must be explained accurately if mentioned.

R2 is ranked first because it removes the explicit task feedback. R1 undermines interpretation of the real log. Neither finding establishes corrupt media, failed FFmpeg execution or fabricated success.

## Evidence and challenged interpretations

The independent script is `/workspace/scratch/notebook/sceptic/reproduce.mjs`. `R1.txt` and `R2.txt` preserve the actual cell text; `R1.png` and `R2.png` capture the rendered pages. I inspected both screenshots. A screenshot's bounded log view does not show its entire final output; the saved DOM text establishes the abort line. These are my own reproductions, separate from the reader's evidence.

I also ran the same first-cut command with native FFmpeg against the shipped `public/media/notebook/bunny-short.mp4`, writing only to sceptic scratch storage. It exited 0 and native ffprobe measured five seconds, 854 × 480 H.264 video and AAC audio. An independent probe of the shipped input measured eight seconds, H.264 854 × 480 at 24/1 fps and 48,000 Hz stereo AAC, matching the media record and rendered inspection prose. Native stdout/stderr and the cut are under the same sceptic scratch directory. The builder's separate `commands.json`, native check log and WASM capability records support broader command facts, but I do not claim to have independently rerun all 51 commands.

Rejected interpretations and unsupported extensions:

- **“Aborted() proves the cut failed.”** Rejected: the actual generated file replayed with the requested duration; the engine rejects nonzero FFmpeg status. The defect is the missing explanation of contradictory-looking evidence.
- **“The missing check feedback means ffprobe failed.”** Rejected: actual requested stream output and completion are present. As a negative control I edited the command to `ffprobe missing.mp4`, ran it and observed both the real “No such file or directory” log and “Command failed. Read its output before retrying.” See `negative.txt`.
- **“Any -1 probe result is accepted as success.”** Rejected by the engine's real source: the pinned non-JSON sentinel triggers a separate JSON error-report validation of the same input/arguments; an error report is rejected. The missing-file negative control exercises that distinction.
- **“The technical checks certify gain, wording, source interval, CRF, fast-start or native script execution.”** Rejected as an accusation against the lesson: the page-specific limits explicitly assign intention-dependent review to the learner. The code measures the narrower listed properties. The decode check also explicitly limits its claim to command completion and asks the learner to inspect duration/stream selection.
- **“The native batch script belongs in the browser command cell.”** Rejected by the rendered workflow copy and structure: the script is explicitly a separate installed POSIX-shell exercise. Its use of `-n` and separate exports directory also avoids silently replacing its existing output.

No additional safety or teaching defect was established in this focused sceptic pass. That is not a complete audit of every notebook feature.

## Limits and handoff

I did not repeat the reader's complete viewport/theme sweep, execute every command, test real-user migration, offline/update coordination, quota failure or physical phone behaviour. I did not certify the pending source fix or author my own product fixes. After ranked fixes, the mandatory independent checker should reproduce both cases on the rebuilt page, confirm raw output is retained and the explanation is conditional, verify positive inspection feedback persists, then confirm changing evidence makes checks stale and an actual failed command still fails.
