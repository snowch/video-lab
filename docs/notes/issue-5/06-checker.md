# Independent built-site checker

Copyright © 2026 Christopher Snow.

Reviewer: issue5_checker, which did not author the implementation, prose, tests or fixes. Read AGENTS.md, the route/concept plan, the fresh learner findings, sceptic decisions and ranked fixes. Tested the built site at http://127.0.0.1:4173/video-lab/ using Chromium. The completed broad run is recorded by /workspace/scratch/issue5/checker.mjs, checker-final.log and checker.json. Screenshots are under evidence/checker-*.png. These are browser-emulated viewports, not physical-device tests.

## Verdict and retained findings

The rebuilt course now preserves the prototype's instruction/action relationship: a compact route indicator, short local step names, one current goal beside the action and its actual result, then continuation. Source choice yields a named usable preview in one interaction. The first three edits teach input/output and duration, then start, then a duration comparison. Mapping, codecs, pixel formats, filter ranges and clock resets are introduced later. Build remains a separate real picture/sound experiment. Both detailed reference assessments retain their controlled inputs and actual evidence checks.

| Finding | Independent final verification |
| --- | --- |
| R1: ambiguous multiple reference commands | The cutting investigation shows three actual native commands before distinct Use command 1/2/3 controls. Single-command tasks keep their editable invocation in the command card. Custom draft replacement remains explicit. |
| R2: missing/misidentified source context | Fresh reference deep links name reference-cuts.mp4 or reference-inspect.mp4 and visibly offer the required loader. Fresh production inspection offers practice/import directly. Build's encoding task says Experiment inputs: frame%03d.jpg; loading/running it preserves the project source key mousepad-demo.mp4. |
| R3: download notice away from Run | The 32.4 MB first-processing notice is visible in the command form beside Run, before execution. The separately saved-tools control remains distinct. |
| R4: repeated current-state controls | Initial bare inspection has no already-loaded Use this command action, no unchanged Apply button, and one visible command-card title. The extra single-command directive and bare-probe change/apply paragraph are removed. A custom draft still exposes explicit loading/replacement and recovery. |
| R5: large-text navigation overflow, found during checker pass | Reproduced the original 390 px/root-font-200% document width of 396 px. The fixed five-column navigation was too narrow for unbreakable labels. After responsive navigation reflow, every tested production/reference route has document width 390 px. Short visible and accessible route names agree. |
| R6: stateful large-text controls, found during checker pass | After actual grading and note saving, cutting reference reflection overflowed to 411 px because its long recipe-download action exceeded its task column. The result heading also leaked 16 px beyond its own container. After button/link wrapping and result-heading flex wrapping, both graded reference/note states and all fresh routes remain within 390 px at 200% root font. |

The reader's initially inconclusive 6 px observation was therefore investigated rather than dismissed. The original navigation problem and the separate long-action problem are both resolved. Before the result-heading fix, the inspection reference alone could still fit the overall viewport while its header exceeded its card; the separate local overflow was also checked.

## Actual execution and interaction evidence

- Ran bare ffprobe against the practice video. The actual raw output contains Duration: 00:00:12.00 and Stream lines; browser wrapper validation is not substituted for the requested output. More output scrolls the local output horizontally, and Wrap lines changes its white-space to pre-wrap.
- Executed the minimal first-cut, two-second-start cut and four-second variant. Downloaded the actual bytes and inspected them using native ffprobe: respectively 6 seconds/90 pictures, 6 seconds/90 pictures and 4 seconds/60 pictures; H.264, yuv420p, 1280 × 720. All three actual files replayed. An invalid subsequent probe showed its own raw producing command/error while the prior named saved file remained available.
- Preserved a custom typed draft across Next, explicit Keep my draft and reload. Waited for focus on the current heading after ordinary navigation, the replacement confirmation after loading over a custom draft, and the personal note field after Write a note.
- Built an actual three-second video from the supplied pictures, then copied its video and encoded/muxed the synthetic sound. The downloaded MP4 has both video and audio streams and a three-second duration. The source context identifies the experiment's actual input pattern.
- Executed and checked the inspection reference's actual stream/format/frame JSON evidence. All six measured criteria passed, including 120 pictures and picture 75 at 6.25 seconds/PTS 76800.
- Executed the cutting reference's actual audio/video join and checked its decoded pictures. All criteria passed: H.264/AAC, 960 × 540, four seconds, 48 pictures, zero initial clock and maximum decoded RGB RMS 0.517 against the limit of 2. Saved an independent personal note in each reference.
- In the optional workbench, verified an initial duration-only command, then the separately introduced two-second start. A manually edited command survives reload in the existing optional-workbench draft store.

## Visual, reflow and navigation coverage

Viewed source-ready and command-ready states at 390, 820 and 1365 CSS pixels, in both rendered themes. Screenshots record the actual theme rather than relying solely on requested preference. Compared with the original prototype by instantiating its unchanged HTML template using its original copy/media/report in an external checker harness; those comparison screenshots are checker-prototype-WIDTH-THEME.png. The prototype's simulated execution remains identified as such and was used only as a design reference.

The desktop course now has the prototype's adjacent explanation/card layout; mobile and tablet preserve goal → explanation → action → result → continuation. File management is a secondary group, rather than a collection of mandatory file-handling tasks. Source-ready, command-ready, real raw probe, generated trim, retained-output error, Build AV and both graded reference states are recorded separately.

At 390 px and root-font 200%, checked capture, inspect, edit, build, publish, inspection reflection and cutting investigation, plus both actual grade/note states and the course home. No whole-document horizontal overflow remained. Local media output and long command editors retain appropriate internal scrolling. Home available cards are numbered 1–5 in the actual route order; planned entries are marked separately. Short route names are Get video, Inspect, Edit, Build and Publish. A separate keyboard pass verified natural Tab order across all five route links and Enter navigation to Inspect, with the correct current-step state.

## Scope and check history

No application or test files were changed by this checker. Checker scripts and measured JSON/logs live under /workspace/scratch/issue5/; committed screenshots and this report are the review artefacts. This review does not stand in for the full npm run check/CI, public deployment, Firefox, physical-device, offline or installed-app update checks; the delivery record must report those separately. Existing storage/grading code was exercised through the UI, but this checker did not independently seed every historical achievement format.

Earlier checker runs stopped on genuine reflow findings. One exploratory harness run also pressed Enter while practice loading was still busy; it was corrected to await the workspace's idle state. That harness failure is not a media-processing failure. The final broad checker run completed successfully; exploratory failures were not relabelled as passes.

## Final targeted checks after the last small patches

The final targeted run completed against `assets/course-B0bUBSAh.js`, SHA-256 `093c6950779990c61c536a89071cfc9e47fe69bb87776a8c1c704b5ff7428e91`. The earlier completed broad run recorded its entry asset in checker.json; the last changes were limited to focus, taught-option labels and routing private grade logs to diagnostics.

- Four rapid Next → focus/edit → Enter sequences executed the learner's intended bare probe and produced the actual twelve-second output. Ordinary step navigation still focuses the heading. A theory-only step does not reopen an editor the learner closed; explicitly opened auxiliary controls are not incorrectly treated as a failure.
- Build's mux builder labels the final `demo.mp4` as Output filename even though it follows the valueless `-shortest` option. Previously introduced video, sound and stream-selection options have readable labels; there is no editable `-shortest` value. Evidence: checker-mux-field-labels.png and /workspace/scratch/issue5/checker-targeted.json.
- The checker noticed successful private cutting validation printed `Aborted()` twice in the app feedback. The author moved these internal logs to optional Browser diagnostics. An independent final actual joined-check encode and grade passed every criterion; Workspace feedback no longer contains that cleanup noise, while Browser diagnostics contains the two actual cleanup messages. Requested native output remains a separate raw transcript. This final graded state also reflows within 390 px at root-font 200%. Evidence: checker-private-grade-diagnostics.png and checker-targeted-final.log.

The exploratory targeted harness initially assumed the challenge's auxiliary editor was open; opening it through its actual disclosure resolved that harness timeout. It did not indicate an application failure. The completed targeted run exited successfully. No blocking review findings remain. Delivery still requires the separately reported full quality gate, CI and public release/offline/update verification.
