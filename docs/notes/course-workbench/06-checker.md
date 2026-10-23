# Independent built checker

Copyright © 2026 Christopher Snow.

Checker: `course_checker`, separate from the builder, prose drafter, fresh learner and sceptic. I edited no implementation or learner prose. I read the migration plan, verified fact brief, separate drafting record, reader findings, sceptic disposition and ranked fixes, then exercised the built site at `http://127.0.0.1:4173/video-lab/`. I did not rebuild `dist`.

## Build identity

The completed main checker pass below used `assets/course-B62wkHc0.js`, SHA-256 `3fbdd66db070fc38d6bb6fdf48c21bb73ed628a30990062365aeb82f3c6e3c20`. The footer displayed `ab669cf`; this is the working-tree build's stamp, not a claim that the published commit already contains these changes. The earlier intermediate asset `course-D-1X9DnR.js` was used to reproduce the additional collapsed-command issue before its fix. The final notes, route matrix, actual media run and recording test were repeated against the final asset.

Browser harnesses and raw records are under `/workspace/scratch/course-checker/`; committed screenshots are under this directory's `evidence/`. The independent checker used Chromium, not the author's Playwright test helper or its reported suite result.

## R1 — personal reflection: verified fixed in both references

At both `#/inspect/reference/reflection` and `#/edit/reference/reflection`, **Write a note** opens the personal form and focuses **Note text**. No supplied answer is saved. I entered a custom filename and my own text, manually collapsed the form, and used **Write a note** again. The exact filename and unsaved text survived; the file still did not exist until explicit **Save note**.

Actual downloaded bytes matched the entered text:

| Reference | Actual filename | Bytes | Content |
| --- | --- | ---: | --- |
| Inspection | `independent-inspect.txt` | 50 | My own inspect reflection, written by the checker. |
| Cutting | `independent-edit.txt` | 47 | My own edit reflection, written by the checker. |

After reload, **Read** displayed the saved personal content. The task directs the learner to the actual file-row **Download** control and no longer offers a fixed example-note download. Explicit label associations remained usable while editing the nonempty textarea. Evidence: `checker-inspect-personal-draft.png` and `checker-edit-personal-draft.png`.

## Additional collapsed-command state: found and verified fixed

On intermediate `course-D-1X9DnR.js`, I reproduced the state the builder requested: type a custom command, manually close the native-tools disclosure, then choose **Use this command**. The disclosure stayed closed and **Replace draft** existed only inside the hidden area. This was a real discoverability defect, not a failed encode. Evidence: `checker-collapsed-command-before.png`.

After the builder's reveal/focus correction, I independently tested eight final states: 390 and 1365 pixels, light and dark, with an empty or custom draft. **Use this command** reopens the tools. An empty draft receives the command and editor focus. A custom draft remains intact while a visible **Replace draft** button receives focus; **Keep my draft** preserves it. Evidence: `checker-collapsed-command-fixed.png` and scratch `reveal.json`. This issue is closed for the states checked.

## Final course layout and actual execution

- Checked all seven available routes at 390×844 and 1365×844 in light and dark: 28 route/theme/size states. Actual `html[data-theme]` matched, with white task surfaces in light theme and `rgb(24, 39, 43)` in dark. No document horizontal overflow occurred. I also visually inspected representative phone and desktop screenshots. Capture and Publish start with native tools collapsed; the file/feedback areas remain visible. Build, Inspect, Edit and both references start with native tools open.
- Loaded **Use practice video** through the actual app control, then imported a real JSON file through the browser chooser. The JSON file appeared in Files while the selected video remained `mousepad-demo.mp4`.
- Ran exactly `ffprobe mousepad-demo.mp4`. Raw Command output echoed that command and showed real `Duration: 00:00:12.00` and `Stream #0:0` lines. It did not substitute JSON or the old cleanup-success paragraph. Application feedback remained separate.
- Changed an argument through the optional builder, kept the original draft, explicitly replaced it, restored the previous draft and reloaded. The actual typed command survived. A missing file produced the genuine tool error plus failure feedback. **Clear output** emptied raw output and reset operation status. Typing `sample` into the editor was rejected with directions to use app controls; no `$ sample` transcript was produced.
- Executed a real trim, downloaded `checker-edit.mp4` and independently inspected it with native ffprobe: `6.000000` seconds, one H.264 video stream, 1280×720, 65,977 bytes. The downloaded recipe contained the exact executed command and Mousepad source SHA-256 `d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e`. The raw tool transcript did not contain application “Saved” messages. Evidence: `checker-real-trim-raw.png` and `checker-publish-files-first.png`.
- Produced a real structured reference inspection report and used **Check artefact**. All six measured criteria passed, including 120 video pictures and picture 75 at PTS 76800 / 6.25 seconds. This check uses explicit JSON because it needs individual frame evidence.
- Independently exercised real MediaRecorder bytes using a controlled canvas stream in place of the sharing chooser. With the practice video already selected, **Record screen** → **Stop recording** saved `capture.webm` and selected that new recording as the source. Native ffprobe confirmed the actual 320×180 recorded video, and all capture tracks were stopped. This tests the controller and browser media APIs; it does not certify an operating-system sharing permission dialog.

Representative layout evidence: `checker-390-dark-capture.png`, `checker-390-light-edit.png`, `checker-1365-light-edit.png` and `checker-1365-dark-edit.png`. No browser page exceptions were collected in the final broad run.

## Scope and disposition

The accepted reader/sceptic reflection finding and the additional collapsed-command state are independently closed on the final built asset. No further blocking defect was established in this checker pass. This is a scoped built verification, not a declaration that I independently repeated every task or the entire quality suite.

I did not rerun every Build rate/mux variant, the cutting-reference decoded-order failure variants, the complete offline/update/install flow, historical-user storage migration, Firefox, physical phones, or real operating-system screen-sharing permissions. The builder's full quality gate and later CI/public deployment evidence must state their own results; they are not inferred from this report.


## Targeted addendum — R3 filename substitution

The builder requested a further independent filename check before deployment. On `course-B62wkHc0.js`, I imported `my capture.mp4` through the real chooser. The selected source correctly became `my-capture.mp4`, but Capture's replay task offered **Replay my-my-capture.mp4** and Inspect offered `ffprobe my-my-capture.mp4`. This is a medium instructional/action defect for a valid normalised filename; the correct file-row controls still existed. Evidence: `checker-filename-edge-before.png` and scratch `filename-edge-before.json`.

After the builder changed substitution to a single pass over whole filename tokens, I tested the actual rebuilt asset `assets/course-DApeH3cs.js`, SHA-256 `bd036073535cf0d5ee9de74640de29fff73f5fba28e83b28187fc92d979b92d8`.

| Imported name | Actual selected name | Capture task and real replay | Inspect example and real execution |
| --- | --- | --- | --- |
| `my capture.mp4` | `my-capture.mp4` | Exact name; browser metadata duration 12 seconds | Exactly `ffprobe my-capture.mp4`; genuine twelve-second Duration output |
| `my-mousepad-demo.mp4` | `my-mousepad-demo.mp4` | Exact name; browser metadata duration 12 seconds | Exactly `ffprobe my-mousepad-demo.mp4`; genuine twelve-second Duration output |

Both selected sources and their actual command drafts survived reload. No browser page exceptions occurred. Evidence: `checker-filename-fixed-my-capture.mp4.png`, `checker-filename-fixed-my-mousepad-demo.mp4.png`, and scratch `filename-fixed.json`.

R3 is independently closed for both placeholder-substring cases. The main checker pass above remains evidence for its recorded asset and scope; this addendum is the targeted verification of the subsequent filename-only change. The builder's fresh full quality gate supplies the wider final-tree regression result rather than being inferred here.
