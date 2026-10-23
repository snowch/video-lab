# Independent fresh learner review

Copyright © 2026 Christopher Snow.

Reviewer: `prototype_reader`, independently of implementation and drafting. Reviewed the built course as an engineer familiar with ordinary terminals, browsers and files, but learning media concepts from these pages. This is a findings record, not implementation approval or the independent checker pass.

## Built scope and evidence

Reviewed `http://127.0.0.1:4173/video-lab/`, the introduction, all current tasks in Capture (4), Build (6), Inspect (4), Edit (4), Publish (5), and both ten-section controlled references, including their explanation, hints and notes disclosures. Initial task reading and the principal journey used `assets/course-CCss1ewu.js`; the later import, personal-note and disclosure checks used `assets/course-B9wE7GMw.js`. Both displayed running build `ab669cf`. These are working-tree builds, not a claim that the deployed commit includes these changes. The finding below also remains visible in the later asset.

All seven routes were rendered at 390×844 and 1365×900 in both themes. The matrix checked the actual `html[data-theme]` and task panel colour: white in light theme and `rgb(24, 39, 43)` in dark theme. Document widths remained 390 and 1365 respectively. Representative rendered screenshots are in `evidence/reader-phone-light-edit.png`, `reader-phone-dark-edit.png`, `reader-desktop-light-edit.png`, and `reader-desktop-dark-edit.png`. The desktop layout places the current task beside the workspace; phone layout stacks them. The phone task can be long, but the inspected flow did not establish a mandatory repeated trip to a different page to complete a command.

## Finding R1 — medium: reflection's direct action saves a supplied answer instead of opening the requested personal note

At `#/inspect/reference/reflection`, the task says:

> “Enter an optional filename and your own explanation, then choose Save note. The note is not graded.”
>
> “Enter your own inspection plan and choose Save note.”

The direct action under those instructions is **Save example note**, followed by **Download inspection-notes.txt**. Pressing it immediately creates a 102-byte note containing:

> “I will check the audio stream, listen deliberately and check playback settings before recording again.”

It does not show or focus a field where the learner can enter the requested explanation. The personal **Note filename**, **Note text**, and **Save note** controls exist inside the separate, initially closed **Hints, reference command and notes** disclosure. I opened that disclosure and successfully saved my own `my-review.txt`, so the issue is discoverability and action/instruction alignment, not missing note functionality. The hard-coded task download also still points to the example filename after a differently named personal note is saved.

The cutting reference's reflection has the same structure: “Enter your own observation … choose Save note” leads to **Save example note**. The action honestly calls the content an example; this is not evidence that the app secretly claims it is the learner's answer. It does, however, replace the intended reflection activity with a supplied sentence at precisely the point a learner expects to write.

Suggested direction: make the direct reflection action reveal/focus the editable note form, with the learner's actual filename used for the subsequent download, or revise the task to explicitly distinguish an optional saved example from the learner's own response. Keep note saving as an app action, not terminal vocabulary.

Evidence: `evidence/reader-desktop-reflection.png`; actual saved note read through **Read inspection-notes.txt**; later independent personal-note save on `course-B9wE7GMw.js`.

## Successful observations

- The first source task has ordinary app buttons for the practice recording, import and browser recording. It does not ask the learner to type `sample`, `capture`, `ls`, `play`, or other invented commands into the FFmpeg/ffprobe editor. Mousepad is identified as a separate application and the practice recording is explicitly silent.
- Media terminology is introduced where it becomes useful: frame/stream/codec/container in Build, the three-picture timing experiment before interpreting duration, mapping and optional audio before the first trim, and timestamps/reset/concat in the join explanation. The controlled references explicitly identify their separate ten-second build-queue fixtures, rather than presenting those measurements as properties of the Mousepad project source.
- Completed a real phone journey: **Use practice video** → bare `ffprobe mousepad-demo.mp4` → first trim through **Use this command**, explicit **Replace draft**, builder/apply and **Run command** → join → replay → download MP4 and recipe. The probe showed actual `Duration: 00:00:12.00` and the H.264 1280×720 stream, not a fabricated summary. Downloaded trim independently inspected with native ffprobe: six seconds, one H.264 video stream. Downloaded join independently inspected: five seconds, one H.264 1280×720 stream, 188,296 bytes. Its recipe contains the executed filter graph, real input hashes and the source's 74,303-byte size. Source and outputs remained available after reload. Screenshots: `reader-phone-probe.png`, `reader-phone-publish.png`.
- Draft protection worked through **Keep my draft**, **Replace draft**, and **Restore previous draft**. The original custom command with a quoted filename survived mode changes/restoration. Builder application retains the complete visible native command; changing the quoting representation can also invoke the explicit replacement prompt. A harness initially attempted to run through that prompt; accepting it through the visible control completed the journey.
- Also executed Build on `course-B9wE7GMw.js`: loaded the supplied stills and tone, encoded the three-picture sequence, confirmed its actual three-second duration with bare ffprobe, muxed the synthetic sound into `demo.mp4`, and opened the result for replay. This exercised the fixture → encode → inspect → mux path; the rate-two experiment was read but not separately re-encoded in this reviewer pass.
- A genuine inspection-reference report was produced with the shown ffprobe command. **Check artefact inspect-report.json** passed all six measured criteria: correct source, container, picture and sound streams, 120 pictures, and the requested picture timestamp. All five hint actions, the reference-command action and earlier-achievements action were opened. Screenshot: `reader-desktop-reference-check.png`.
- A missing input produced the actual `No such file or directory` log and a failure explanation, rather than a success claim. **Wrap lines** changed the output to `pre-wrap`; unwrapped output remained confined to the terminal. Clear-output behaviour was being revised by the author during review and is not independently signed off here.
- Imported a real local MP4 as `phone-demo.mp4`, replayed it through a browser video element with native controls, selected it as source, and deleted it. The source selection cleared when the file was removed. The interface identified its origin as imported.
- Read the separate lesson/offline-tools disclosures. They distinguish the lesson download from the additional 32.37 MB processing engine and explain local-browser storage and installation limitations. No claim of tested offline operation follows from this disclosure review.

## Limits and hand-off

No implementation files were edited by this reviewer. The finding requires the separate sceptic to reproduce and rank it before a fix, and a checker to inspect the final built fix. This pass did not repeat the entire automated suite, migrate a real user's historical storage, verify browser installation, test operating-system screen-sharing permission UI, run a complete offline download, or rerun every cutting-reference encode/check variant. Earlier achievements were inspected as a control, not seeded and regraded. Those claims must come from separate test/checker evidence. No additional blocking course explanation defect was found in this pass.
