# Separate prose pass for the course workbench

Copyright © 2026 Christopher Snow.

The separate `prototype_drafter` agent revised the production, guided-task and detailed-reference strings from the builder's verified migration brief. The subsequent scope extension included the new workbench UI labels, course overview and hero caption/alternative text. No controller, model, grading rule, route ID or section ID was edited by this drafting agent.

## Media facts and examples

Production uses the original Mousepad recording: twelve seconds, 180 H.264 pictures at 15 frames per second, 1280 × 720, with no audio stream. It shows Find and Replace in an independent text editor, replacing staging with production in a fictional configuration. The Capture instructions now ask learners to prepare an independent application action. They no longer ask learners to record the course's build-queue scene.

Build uses three JPEG snapshots extracted at 0, 6 and 10 seconds, named frame000.jpg through frame002.jpg, with the existing quiet synthetic tone as a separate input. The text distinguishes these snapshots from continuous action. The verified three-picture encodes last three seconds at one picture per second and 1.5 seconds at two; adding the tone copies the video and encodes audio. Production trim now uses `-ss 2 -t 6` on the selected source. The provided silent source remains silent with optional audio mapping. The two-range join retains [0,2) and [4,7), producing five seconds of silent video from the provided source.

The detailed references deliberately retain their controlled build-queue fixtures and grading evidence. Their introductions now state that these fixtures differ from the Mousepad practice source. Their original ten-second, 960 × 540, 12-frame-per-second H.264/AAC properties and fixed picture/timestamp checks remain unchanged. No source hash, reference command constant or decoded-picture criterion was edited.

The drafter visually inspected the new hero image, `public/media/mousepad-frames/frame000.jpg`. It shows Mousepad with a fictional deployment configuration containing `environment = staging` and `queue = staging-jobs`. The updated alternative text describes that actual image; the caption identifies its source and lack of sound.

## Real commands and app controls

All learner-visible instructions now use app control names for file setup, recording, replay, downloads, deletion, hints, notes, achievements and artefact checks. The command editor is described as running FFmpeg and ffprobe. The legacy nonnative `example.command` strings remain private action identifiers for the controller, as requested; they must render as labelled buttons rather than code. Capture's retained internal `scene` identifier must not open the old course scene; the builder reported that the capture task omits it.

Ordinary media inspection now uses bare `ffprobe FILE`. JSON remains explicit where a task needs frame/packet fields, individual stream starts and durations, or a saved report for grading. The explanations say why those structured reports are requested. Raw tool output is distinct from Workspace feedback; pinned-browser cleanup information belongs in optional Browser diagnostics.

The generic command builder edits arguments beside their actual option labels, then applies them to the visible command. Its prose does not promise to add or remove options; Type command provides that editing freedom. Replacement and restoration labels describe explicit draft changes.

The course controller exposes both Record screen and Record screen with shared sound. The text therefore distinguishes silent recording from an optional request for shared-surface audio, never microphone narration. Browser support and the selected surface may provide no audio. This does not change the silent Mousepad source or its expected edit.

## Remaining implementation assumptions for built review

- Buttons for private action identifiers must execute the matching app action without printing invented commands into the tool transcript. The builder confirmed normalised labels for Check artefact, Hint and Save example note.
- Examples referring to mousepad-demo.mp4 or the older capture.mp4 action placeholder must use the selected source's exact filename. Existing controlled-reference filenames must remain fixed for grading.
- Use practice video must identify the supplied source accurately; old files with colliding names must remain distinguishable. Import filename changes and source origins must be visible.
- A source-path choice changes instructions; the action button loads the file. Similar labels must not make the learner believe a file was loaded merely by choosing that path.
- Save example note saves supplied text, while the separate Save note form saves the learner's own text. Neither is graded. Notes, check results and Earlier achievements must remain distinct.
- Build and edit comparison controls are now labelled Load build comparison and Load edit comparison. These are provided completed files from the separate controlled reference scene, never evidence that the learner ran an edit.
- Stop recording must remain usable during capture. Setup controls must wait for saved workspace files to load. These are runtime behaviours for independent review, not prose assertions of verification.

Both sentence and explanation passes were applied, including a search for residual instructions to type app-specific commands. Remaining such tokens are private action identifiers, not teaching prose. The changed string files were formatted with Prettier. The builder's media verification was used as the fact brief; this prose pass does not claim that the full suite or the independent built reviews have passed.

## Follow-up copy proposals awaiting application

These are proposals only, recorded while the built browser checks are running. The drafter has not changed source strings for this follow-up. The builder reports that the initial source-path chooser has now been removed: direct buttons perform source setup on the first task. This supersedes the earlier source-choice-versus-load assumption above.

Proposed `courseUI.limits`:

> The workspace holds up to 12 working files (media, reports and notes) plus 12 recipes: 24 files and 32 MiB in total. Each file must be nonempty and at most 20 MiB. Each processing operation has a 120-second limit. Use filenames of up to 80 letters, digits, dots, hyphens or underscores, beginning with a letter or digit. Output names are limited to 68 characters to leave room for the recipe filename.

Proposed shared operation feedback:

- `cli.done`: “Completed.”
- `cli.failed`: “The operation did not finish. Read Workspace feedback and any Command output, correct the input and retry. Previously saved files remain available.”
- `cli.running`: “The operation is running. Choose Cancel to stop active work; a progress percentage is not available.”
- `guided.manualNavigation`: “Use Next task when you are ready. It changes the instructions; review your files and any output before moving on.”

These labels cover both media commands and browser actions without calling a file import, note save or artefact check a command. The running message assumes Cancel is enabled only while cancellation is supported; saving or other noncancellable phases need their own state feedback.

### Reflection notes

Replace the supplied-answer action label with a proposed `courseUI.writeNote`: “Write a note”. That button should open the note form and focus its fields. It must not save the supplied example text or replace a draft the learner has already typed. Save note remains the explicit action that writes the learner's filename and text.

Proposed inspection reflection paragraph:

> A colleague says the narration is silent. What would you inspect before recording again? Consider stream presence, sound content and playback settings. This reference file's tone is not narration. Choose Write a note to open the note form, enter a filename and your own inspection plan, then choose Save note. The note is optional and is not graded.

Proposed inspection reflection example note:

> Choose Write a note. Use Note filename for a name such as inspection-notes.txt and Note text for your own inspection plan, then choose Save note.

Proposed editing reflection paragraph:

> Compare your original and longer result hold. How much time does a viewer need to read the sorted result and connect it to the opening? With narration, cutting time also changes sound. Choose Write a note to open the form, enter your own observation and choose Save note. Download the chosen output and its execution recipe. The note is optional and is not graded; measured output checks and viewer understanding are different evidence.

Proposed editing reflection example note:

> Choose Write a note. Use Note filename for a name such as editing-notes.txt and Note text for your own observation, then choose Save note.

Proposed follow-up download instruction for either note:

> In Files, choose Download beside the note you saved to keep a copy outside browser storage.

The note-opening control may suggest the relevant filename when the form has no draft. The learner must still provide their own text and explicitly save it. A later download action must use the actual saved note name, including a name the learner changed, rather than assuming the suggested example filename was used. These proposals await the builder's technical verification and application; no reviewer finding is treated as independently confirmed by this prose pass.

## Applied after the review check

After the active browser check finished, the builder reported that the separate sceptic confirmed the reflection mismatch and authorised the follow-up copy. The builder had already applied the limits and generic operation feedback. The drafting agent then changed both reflection instructions and example notes to the Write a note → filename and own text → Save note flow. The action-label helper now returns Write a note; it no longer labels the private note identifier as an action that saves a supplied answer. The private identifiers remain solely to suggest a form filename. The runtime will open and focus the form without saving text, and will direct note downloads to the actual file list.

Added “FFmpeg and ffprobe commands”, “Source files” and “Review and download files” for the corresponding workbench areas. Capture and Publish use file controls directly, with the native command editor available in an optional disclosure; processing lessons show it open. These labels describe the areas without implying that file operations are terminal commands. No controller or model was edited by the drafting agent. The changed source strings and this record were formatted with Prettier; final built verification remains the checker's task.
