# Independent sceptic review

Copyright © 2026 Christopher Snow.

Reviewer: `course_sceptic`, separate from the builder, prose drafter and fresh learner. Reviewed the final reader report `03-reader.md` and independently tested its only finding against the built page and saved note content. No implementation or learner-prose files were edited.

## Built evidence

Used the existing build at `http://127.0.0.1:4173/video-lab/`, module asset `assets/course-B9wE7GMw.js`, displaying commit `ab669cf`. This is a working-tree build and not a claim about published source identity. The preview server had stopped after the author's focused test; this reviewer restarted Vite preview on port 4173 without rebuilding `dist`.

The browser evidence was collected through visible controls and actual file bytes, with scripts and raw records under `/workspace/scratch/course-sceptic/`. The committed screenshots are in `evidence/sceptic-*.png`.

## Ranked disposition

**R1 — keep, medium.** At `#/inspect/reference/reflection` the built task says “Enter an optional filename and your own explanation, then choose Save note” and “Enter your own inspection plan and choose Save note”. Its direct button is **Save example note**. Clicking it saved `inspection-notes.txt`, origin `note`, 102 bytes, containing “I will check the audio stream, listen deliberately and check playback settings before recording again.” No personal text was entered, and the note form stayed collapsed. IndexedDB content, the visible **Note saved** feedback, and `evidence/sceptic-reflection-note.png` independently confirm the reader's finding.

Also reproduced the sibling route `#/edit/reference/reflection`. Its instruction “Enter your own observation from the real outputs and choose Save note” is followed by the same **Save example note** action. It saved `editing-notes.txt` while the form remained closed; **Read editing-notes.txt** showed “I compared the result holds and will keep enough time for the viewer to read the sorted queue.” The issue therefore applies to both uses of the shared pattern.

The inspection task's next action is **Download inspection-notes.txt**. A note written through the existing form can have any valid filename, so that fixed action cannot reliably refer to the learner's response. The reader's proposed direction is justified.

Smallest coherent fix: make the direct reflection action **Write a note**, reveal and focus the existing filename/text form, preserve an existing draft, and require explicit **Save note** for the learner's text. Point the subsequent note-download instruction to the actual saved file or its file-row control. Do not turn note writing into terminal syntax. The independent checker should verify both reflections, a renamed note, draft preservation and absence of an automatically saved supplied answer.

## Rejected escalations and own pass

- **Reject an escalation to deceptive grading or a blocking production failure.** The existing label explicitly says “example”, and the reflection says “The note is not graded”. The problem is a mismatched personal-reflection action, not evidence that the app secretly grades a supplied answer as the learner's work. The actual video-production path works independently of notes.
- **Reject replacing all explicit JSON commands with bare probes.** Build/ordinary inspection uses bare `ffprobe`; the references explain why individual frame/packet fields and saved checked evidence use JSON. Those are different tasks with named required data.
- **Reject treating the retained controlled reference footage as the main practice source.** The reference introduction explicitly identifies a separate ten-second build-queue fixture. The main source action describes a twelve-second silent Mousepad recording. Keeping the controlled fixture's exact grading identity does not misstate the production source.
- **Reject a general claim that the mobile builder silently overwrites typed work.** On the actual 390-pixel dark page, changing the source argument through the builder left `ffprobe mousepad-demo.mp4` intact until **Replace draft** was chosen. That changed it to `ffprobe missing.mp4`; **Restore previous draft** recovered the original. No hidden execution took place.

My own rendered pass covered the initial task on each of the seven available routes at 390×844 and 1365×844, light and dark: 28 route/theme/size states. All actual `html[data-theme]` values matched the requested theme, and none had document horizontal overflow. I visually inspected the dark phone screenshot as well as checking the attribute. This does not independently repeat the reader's entire all-task reading; the reader's report supplies that wider scope.

Also used the actual phone controls to load the practice source, run bare `ffprobe mousepad-demo.mp4`, change/replace/restore builder arguments, encode a six-second edit and download the resulting MP4. Raw output contained the real twelve-second Duration and H.264 stream lines; it was not a UI metadata summary. Native ffprobe on the downloaded output reported duration `6.000000` and one H.264 video stream, 1280 × 720. The raw command transcript did not require invented workspace vocabulary. These observations independently support the reader's core journey claims without declaring every encode variant checked.

No additional blocking unexplained prerequisite or media-explanation defect was established by this pass. The remaining medium finding must be fixed and checked on the final build. This report does not certify the full automated suite, operating-system recording permissions, installation, historical storage migration, offline download or published deployment.
