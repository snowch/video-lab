# Independent fresh learner review

Copyright © 2026 Christopher Snow.

Reviewer: issue5_reader, separate from the implementation and prose author. Reviewed the actual production build served at http://127.0.0.1:4173/video-lab/ on 23 October 2026. Audience stance: an engineer comfortable with terminals, browsers and files, with no media or FFmpeg knowledge. Read the binding instructions and issue-5 plan; compared the original approved HTML prototype and current optional workbench. Findings describe the build reviewed before the parent's subsequent fixes; independent sceptic/checker must verify resolutions.

## Coverage and observations

Browsed source-ready and initial inspection states at 390, 820 and 1365 CSS pixels, light and dark themes, using separate Chromium contexts. No whole-document horizontal overflow in those states. Screenshots: evidence/reader-source-WIDTH-THEME.png and reader-inspect-WIDTH-THEME.png. These are emulated browser viewports, not physical devices.

Ran the ordinary source → bare ffprobe → first three editing tasks through real UI actions at 390 px. Bare output contained Duration and Stream lines; the editor initially contained only `ffprobe mousepad-demo.mp4`. The first cut used `-i`, `-t` and a separate output filename. Later steps added `-ss`, then changed duration from six to four seconds. All three actual outputs were replayable. The input/output distinction is now concrete and the first edit does not require codec, mapping or colour-format knowledge. Saved outputs and raw logs remain visually distinguishable. Evidence: reader-probe-390-light.png and reader-cut-{0,1,2}-390-light.png.

Read Build's progressive rate, measurement, audio, stream selection and muxing tasks; ran the actual picture encode and comparison workflow. The new task prose explains what each input contributes and why output timing differs from the original recording. Inspected detailed reference investigation and challenge deep links, including their multi-command tasks, and the personal-note flow. The optional workbench now starts with a duration-only trim and places the later start experiment in a distinct, explained interaction. Evidence: reader-build-390-light.png, reader-optional-{inspect,trim}-820.png and reader-*-reference-*.png.

The desktop layout now visibly follows the prototype's adjacent explanation/action relationship. Source setup no longer has four mandatory file-handling tasks, navigation labels are short, and the top route indicator is compact. On phone the source preview follows setup and the action/result card follows the current explanation. Secondary file management is substantially less prominent than before. Remaining issues are below.

## Ranked findings

### R1 — medium/high: multiple commands lose their identity behind identical buttons

At `#/edit/reference/investigation`, three native examples render three buttons all called “Use this command”. Their accompanying notes say “Inspect the actual copied output's durations and stream starts”, “Decode, trim both streams…” and “Compare the accurate output's stream starts…”, but the actual commands are absent from the instruction area. `#/inspect/reference/investigation` has the same problem with report versus extraction commands.

A learner cannot inspect the choices before deciding which command to load; on a phone they must repeatedly move between a choice and the editor, potentially triggering draft replacement. This is a regression from the prototype's single command associated with its one task and undermines the requested instruction/action relationship.

Direction: preserve the compact single-command case, but give multiple examples visible command identity and distinct load actions; retain explicit draft protection. Evidence: reader-edit-reference-investigation.png and reader-inspect-reference-investigation.png.

### R2 — medium: the displayed source does not identify the reference input

A fresh reference investigation/challenge deep link displays “Selected source: No source selected”, while its examples require the controlled reference fixture. From a fresh deep link, the loader is buried under Manage workspace files → Files and recording rather than beside the task's required input.

The same global source field can be misleading during Build: it displays the project recording even though the current command operates on the separate frame sequence and tone. The prose explains that distinction, but the action card's source context should reinforce it.

Direction: show task-appropriate input context; provide the required controlled-source loader where the learner needs it. Keep project source selection separate from reference/experiment inputs. Evidence: reader-inspect-reference-investigation.png and reader-build-390-light.png.

### R3 — medium: initial processing download is disclosed away from Run

The optional workbench says immediately under Run: “The first run downloads about 32.4 MB of processing tools unless they are already saved…”. In the main course's initial inspection card, Run command has no equivalent nearby disclosure. “Processing tools for offline use” is a collapsed panel well below the task; its presence does not tell a first-time learner that pressing Run downloads the tools now.

Direction: put a concise, accurate first-run transfer explanation beside the processing action, retaining the separate offline-readiness controls. Evidence: reader-inspect-390-light.png versus reader-optional-inspect-820.png.

### R4 — medium: avoidable repeated instructions/actions inflate the first command interaction

At the first bare-probe task, the page shows “Read the duration”, explains reading Duration, repeats “Read Duration in the real tool output”, and offers “Use this command” although that exact command is already in the editor. The action card then repeats “Your command”, tells the learner to change/apply values, provides an unchanged source field and active Apply to command, and finally shows the command and Run.

The source filename is useful; the redundant loading/applying directions are not. This creates several phone screens before the primary action and retains part of the old task/workspace overhead despite the better layout. Do not solve it by shrinking text or squeezing everything above the fold.

Direction: show loading/applying controls only when they perform a meaningful change, avoid duplicated headings/directives, and preserve explicit custom-draft replacement. Evidence: reader-inspect-390-light.png and reader-probe-390-light.png.

## Review boundary

No application or test files were edited by this reviewer. Browser automation scripts are under /workspace/scratch/issue5/reader*.mjs; initial observations are recorded there. Passing execution does not resolve the ranked learning/interaction findings. Parent reported that fixes were being built after receiving the initial findings; this report does not claim those fixes independently checked.

During the later reference-source control check, the parent had rebuilt the fixes: loading the fixture displayed `Selected source: reference-inspect.mp4`. Evidence reader-reference-source-after-rebuild.png records that changed build, not the original finding. The independent checker owns resolution verification.

## Additional control pass on the rebuilt site

`/workspace/scratch/issue5/reader-controls.mjs` completed a separate 390 px dark-theme Build and reference run. Actual commands created video.mp4, faster.mp4 and demo.mp4. The last bare probe reported a three-second H.264 picture stream and AAC mono sound stream; the tone preview had an audio control. Both reference commands were obtained from the actual Show reference command control, executed in the editor and passed every measured criterion. The edit check reported four seconds, 48 pictures and maximum RGB RMS 0.517 against its limit of 2. Personal notes were saved for both references. Evidence: reader-build-mux-390-dark.png and reader-{inspect,edit}-reference-390-dark.png. These results support retained processing/grading, rather than independently certifying every UX resolution.

The control harness initially timed out because it attempted to open an already-open step disclosure and then searched a closed navigation with a visible-role locator. Correcting those harness assumptions allowed the real app run to finish. There was no app processing failure associated with those timeouts.

Text reflow was investigated by setting the root font to 200% at a 390 px viewport. The long reused session measured document width 396 px, but a fresh edit page did not reproduce an overflow element. This 6 px observation is not retained as an established finding; the checker should check settled reflow states. Root-font scaling is not physical-device testing or an assertion of actual browser zoom coverage. Immediate post-click focus samples were inconclusive because focus is scheduled on animation frames; do not treat those samples as focus failures without waiting for the intended control.
