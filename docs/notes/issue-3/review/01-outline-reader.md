# Issue 3 — independent learner outline review

Copyright © 2026 Christopher Snow.

Date: 23 October 2026. Scope: the current `curriculum-redesign.md` and `implementation-plan.md` reader-facing wireframe, compared with the deployed Module 0 opening. This is an **outline review before lesson implementation**, not a review of a built redesign. The encoder compatibility spike is pending; I make no capability or completion claims about it.

## Assessment

The proposed five-step initial path has a clearer production purpose than the old inspection-first opening: create or adopt a recording, learn what a file contains, inspect that recording, make an edit, and review a playable deliverable. A labelled original fallback can support the same editing decisions without pretending the learner captured it. Keeping advanced production topics planned while finishing a real initial demo is coherent.

The outline is a sound direction, but three transitions need explicit decisions before bulk UI/prose: which artefact the learner carries forward after Build, what happens when processing cannot run, and what evidence makes a capture problem a problem. These are design findings, not observed implementation failures.

## Ranked findings

### O1 — Medium: Build branches away from the running demo without an explicit return

**Evidence:** The wireframe promises Capture's blob “persists locally across steps”. Build produces a separate MP4 from “Three labelled original stills”, and Inspect then says “Load the learner's capture or labelled original”. The redesign calls this “One story across chapters”.

**Learner knowledge at this point:** I have recorded a file and can replay it. I do not yet know the difference between making a teaching example from supplied stills and converting my captured recording.

**Risk:** I may believe Build converts my capture, that its synthetic sound becomes my demo's audio, or that its output is the file I should edit. Those are three different artefacts despite sharing a scene.

**Direction:** Name the three-still build as a separate experiment, keep its output distinguishable from the demo source, and explicitly return to the captured/adopted recording at Inspect. Carry an unambiguous source identity through Inspect → Edit → Publish. If editing the generated filmstrip is intentionally allowed, make that an explicit alternate project choice.

**Counterevidence:** The implementation plan already distinguishes the sources internally. This requires clear learner-facing handoffs, not a new architecture.

### O2 — Medium: capture fallback is specified; processing fallback is not yet a complete learning route

**Evidence:** “Unsupported/denied capture offers the labelled original fallback.” Build and Edit require real processing; the redesign promises “graceful mobile/offline fallback”, while the implementation plan separates lesson readiness from encoder readiness.

**Risk:** A learner on an ordinary browser may successfully adopt the fallback but then encounter an unavailable, uncached or failed encoder. A supplied recording solves capture availability, not encoding availability. The outline does not yet say which tasks remain possible, how work resumes, or whether a completed capstone is attainable on that device.

**Direction:** After the spike establishes real support, define the supported completion path and the reading/evidence-only path separately. Preserve the source and decisions on failure; explain the next useful action (retry, explicitly download the encoder when connected, or resume on a supported browser). Existing recorded outputs can support reasoning but must not be presented as the learner's produced edit. Do not award or imply a produced-demo completion merely for viewing them.

**Counterevidence:** Cancellation/retry, explicit core readiness and labelled recorded examples are already planned. This finding concerns their educational outcome and handoff; it does not assert that any tested browser fails.

### O3 — Medium: inspection needs a declared expectation before it can diagnose a problem

**Evidence:** Inspect asks the learner to “Interpret measured container, picture dimensions and audio presence to diagnose a capture issue”. Capture allows optional audio, and the stated brief is one visible software action.

**Risk:** A beginner can read “no audio” or a dimension count but cannot infer whether it is wrong. A silent recording may be exactly what they intended. Dimensions alone do not establish that small text is readable. A valid recording may have no capture fault at all.

**Direction:** Establish the intended action, visible result and audio expectation during capture/adoption. Inspection should compare measurements and replay against that brief, allowing “meets the brief” as a valid outcome. If a diagnosis is graded, supply an explicit scenario or fault and enough observable evidence; do not require an arbitrary codec/dimension/audio judgement.

**Counterevidence:** Capture already asks for initial state → Sort → readable result, and Publish includes audio expectations. Bring those expectations forward rather than adding a separate theory section.

### O4 — Low: Build's frame-rate experiment needs a specific question and timing explanation

**Evidence:** Build says “Three labelled original stills with time labels” and “Change frame rate and rerun”. The redesign also describes stills as before/action/result.

**Risk:** A beginner may interpret labels as preserved capture timestamps, or believe changing a number always makes motion smoother. With three stills, changing their presentation rate changes how long those pictures remain visible; it does not recover missing action pictures.

**Direction:** State whether labels identify source time or the new output schedule. Give a visible question such as whether the viewer has enough time to read the result, and relate rate, picture count and output duration using the actual verified behaviour. Verify that the selected still really depicts the claimed action before labelling it “the action”.

**Counterevidence:** The planned measured duration, replay and input-change rerun provide all the necessary evidence. The gap is the learner's reason for manipulating the control, not the usefulness of real encoding.

### O5 — Low: the redesign's account of the old lesson overstates the prior evidence

**Evidence:** Redesign §5 says learners meet the entire vocabulary “in the lesson's `introduces` list before touching any media” and attributes “assumed prior vocabulary” to a sceptical reviewer's findings.

**Live comparison:** On 23 October, Module 0 defines a stream in the muting prediction, then a frame and PTS beside the investigation; tick/time-base explanations accompany the measured readout. The metadata `introduces` list is not the learner-visible opener. My earlier fresh-reader pass found the graded task solvable from the teaching, and this reinspection does not overturn that conclusion.

**Direction:** Describe the redesign's positive rationale accurately: earlier ownership and a production goal, less timing detail before editing, and a continuous path. Separate proposed benefits from already observed review findings. Do not treat predicted “no assumed vocabulary” in the new outline as an independent review result.

**Counterevidence:** The old opener genuinely foregrounds inspection and numerical timing before a learner makes a recording. That is sufficient reason to change the order without claiming unsupported defects.

## Prerequisite and jargon boundary

The first Capture task can remain within ordinary-browser knowledge if it explains choosing a tab/window/screen, what will be recorded, how to stop, and how to replay. `getDisplayMedia`, `MediaRecorder`, MIME and worker details should stay in optional technical evidence unless needed for a learner decision. A returned file type can be named plainly without teaching the API first.

Build is the first substantial conceptual load. Introduce a picture/frame, pictures per second, encoding, stream, container and muxing beside the operation that needs each term. Explain muxing as putting already encoded streams together into a container, separately from encoding their content. Synthetic sound must remain explicitly synthetic and optional to listen to. No FFmpeg flag knowledge is needed to press Run and interpret the result; command syntax should not become an unannounced assessment requirement.

Inspect should start with the practical brief and measured result. Keeping detailed PTS/time-base material in the existing reference is sensible. Edit needs a short explanation of start/end times, duration and a preview of the retained action; arbitrary real recordings cannot inherit the fixed fixture's correct ranges. The outline's real editable ranges give a stronger transfer opportunity than merely copying the previous default join values.

## Static and interactive choices

Static capture-pipeline and encode/mux diagrams are appropriate: a clear labelled relationship is sufficient. Real capture, encode, inspection and edit controls earn interaction by changing or measuring an artefact. The frame-rate rerun earns its place only when the learner compares a consequence.

Retained recorded copy/encode examples are useful controlled evidence alongside edits of unpredictable captures. Keep their source identity explicit. The honestly labelled clock model remains useful for understanding source versus output placement. The redesign's absolute phrase “Interactions are justified only where they operate on real bytes” should not accidentally exclude this already retained explanatory model; it is a stated exception, not a fake processor.

## Whole-path and capstone judgement

Capture → Inspect → Edit → Publish can carry one meaningful demo; Build works as an explicitly marked explanatory branch. The new Publish checkpoint supplies a real stopping point before planned advanced topics. Its review should ask for evidence of a visible action, a readable result, intentional sound or silence, and successful playback of the actual exported file. Downloading a recipe is useful only if it identifies the source and the kept ranges so the learner can relate it to the result.

Do not make unsupported capture, absent optional narration, or unimplemented advanced modules imply an incomplete initial capstone. Conversely, reading recorded examples alone must not imply the learner has exported a demo. With those boundaries made explicit, the proposed initial path is coherent and suitable for implementation followed by a separate built-page learner review.
