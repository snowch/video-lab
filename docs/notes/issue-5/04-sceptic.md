# Independent sceptic review

Copyright © 2026 Christopher Snow.

Reviewed by the separate issue5_sceptic agent, which did not author the prose, implementation or tests. The built site at http://127.0.0.1:4173/video-lab/ was inspected with Chromium at 390, 820 and 1365 CSS pixels, including light and dark contexts. These are browser-emulated viewports, not physical-device results. Screenshots and observations below reflect the pre-fix build while the parent continued implementation. No application files were changed by this reviewer.

## Findings tested against the built page

| Finding | Decision and severity | Independent evidence and limits |
| --- | --- | --- |
| R1: Multiple identical “Use this command” controls hide reference examples | Retain, medium/high | On fresh #/edit/reference/investigation, the task panel contains three identical buttons. Their surrounding notes distinguish intended actions, but none shows the command before loading it. The editor initially shows the first probe. Loading the next example is possible, so this is not a complete execution blocker; it prevents comparing actual commands before replacement and makes command choice needlessly indirect. Show each native command with its relevant note or supply a clearly distinguishable command-selection interface. |
| R2: Reference deep links lack a visible source loader and misidentify source | Retain, medium | Fresh #/edit/reference/investigation displays “Selected source: No source selected”. There are zero visible “Load cutting source” buttons and one hidden button, under Manage workspace files → Files and recording. Loading the controlled source later still leaves the project source label at “No source selected”. Preserving project selection is correct, but the page must identify and offer its own controlled fixture without requiring a nested setup search. Fresh production #/inspect also offers only “Choose a source video” beside an executable draft; a visible source recovery path would address the same problem there. |
| R3: First processing download is undisclosed near Run | Retain, medium | The main initial inspection screen exposes Run command without the optional workbench's adjacent first-run size notice. “Processing tools for offline use” is below the workspace and collapsed. The verified package is 32,367,068 bytes; the learner should know the approximate transfer before choosing the first run. Do not conflate baseline offline reading and processing-tool readiness. |
| R4: Initial phone inspection repeats actions/directives | Retain, low/medium | At 390 × 900 on a fresh inspection deep link, the command textarea begins at approximately y=1288 and Run at y=1408. Source-ready navigation shortens this somewhat, but the page still repeats Your command, a directive to read Duration, “Use this command” for an already loaded command, and Apply to command for unchanged builder values. The general design is substantially closer to the prototype; remove redundant current-state controls and labels. The issue is repetition and unnecessary decisions, not a requirement that everything fit one viewport. |

Evidence: evidence/sceptic-{phone,tablet,desktop}-reference-investigation.png and evidence/sceptic-{phone,tablet,desktop}-inspect-initial.png. Exact page text, visible/hidden source-loader counts and editor coordinates are recorded in /workspace/scratch/issue5/sceptic-survey.json. Browser scripts are outside the repository; committed screenshots document the actual state.

## Independent executable checks

- Loaded the separate Build pictures/sound through app controls, executed the real one-picture-per-second encoding command, then the real video-copy/AAC/mux command. Downloaded demo.mp4 and inspected its bytes using native ffprobe: one video stream, one audio stream, three-second container duration. This supports the Build claims; no application summary was substituted for measured output.
- On #/inspect/reference/challenge, loaded the controlled source and executed the full structured stream/format/frame report command. “Check artefact sceptic-report.json” passed every measured criterion. The source label limitation in R2 remained observable after loading.
- On #/edit/reference/challenge, loaded the controlled cutting source, obtained its reference command through the ordinary app control, ran the actual join, and checked the saved output. Every measured criterion passed.
- Processing output was real and distinct from app feedback. The source fixture, Build inputs and controlled-reference identities remain separate. The first production cut's visible command is minimal; codec, mapping and pixel-format options belong to later tasks.

Evidence: evidence/sceptic-build-real-av.png, evidence/sceptic-inspection-reference-check.png, evidence/sceptic-edit-reference-check.png. Native report and raw requested command logs: /workspace/scratch/issue5/sceptic-execution.json. These checks do not establish full cross-browser, offline or upgrade success; those remain delivery checks.

## Dissent and remaining process

No initial reader finding was rejected. R1 is narrowed from a possible blocker to ambiguity/comparison cost; commands remain runnable. R4 is explicitly about avoidable duplication rather than total page height. This reviewer has not certified any subsequent fixes: the independent checker must verify the rebuilt pages after ranked fixes. Final reader findings will be reconciled in an addendum if they extend this initial set.

## Final reader reconciliation

Read the completed 03-reader.md after the initial independent tests. Its final ranked findings are the same R1–R4; all are retained with the narrowed interpretation above. The R2 extension to Build was separately reproduced: after loading Mousepad and opening Build's picture-rate task, the card says “Selected source: mousepad-demo.mp4” while the editor executes an input pattern of frame%03d.jpg. The lesson explicitly says the experiment is separate, so this is contextual ambiguity rather than fabricated media processing. Rename that context as project source or show the actual task inputs, without replacing the selected project recording. Evidence: evidence/sceptic-build-source-context.png. No further ranked reader findings require adjudication.
