# Ranked review resolutions

Copyright © 2026 Christopher Snow.

The independent outline and built reports distinguish proposed fixes from observed results. This record states the builder's changes; `06-checker.md` must independently verify the resulting production build.

## Outline

- O1: Project records separately preserve the source capture/import, video-only experiment, audio experiment and edited output. Build explicitly names its supplied pictures and the handoff returns to the project recording. Inspection can deliberately select an experiment without changing the original source.
- O2: Unsupported or declined capture adopts a labelled original for genuine inspection/editing. Processing failure offers pre-generated build/edit references for reading and comparison. Only an actual completed edit becomes the project export; viewing a supplied edit does not claim produced-demo completion.
- O3: Capture starts with context/action/readable-result planning and optional shared audio. Inspection compares metadata and playback with that intention; silence is not presumed a fault.
- O4: The three selected stills show before/result/later result, with source times0/4/6 separate from new output intervals. Rate1 versus2 changes actual output duration3 versus1.5s; the frame-rate question concerns reading time rather than invented motion.
- O5: The redesign's historical claims are corrected: the previous lessons defined terms progressively, and the schema's introduces list was not a visible glossary opener. The producer-first change is motivated by making a useful artefact earlier.

## Built findings, in ranked order

**B1, medium — pre-generated Build timing.** The original native fallback incorrectly combined default25fps still input with a short looping filter, yielding roughly1.5s despite the three-picture1fps explanation. Replaced that generation pipeline with an actual sequential three-image `-framerate 1` input. Regenerated the provided video/audio files and SHA-pinned evidence. Native verification now requires their3-second duration and correct stream counts, plus the6-second edited reference. The visible fallback note states its fixed1fps/3s/640×360 settings independently of the current selector. The browser test explicitly selects2fps before viewing the fixed reference and checks its honest3-second evidence.

**B2, medium — recipe working name.** The actual recipe keeps the original source filename and SHA256 and now records `workingInputName` alongside the actual command. The displayed recipe explanation tells the learner to name the source accordingly before running the saved command. That explanation is mounted beside the recipe download in Edit and Publish. The reader's original JSON is retained as evidence of the pre-fix state; the checker must download the new recipe.

**B3, low — first codec use.** Build now defines codec beside the first encoding explanation, identifies H.264 for pictures, and identifies AAC when adding sound. Inspect retains its contextual definition.

**B4, low — format-reader family.** Result tables show readable MP4/QuickTime or Matroska/WebM family names and explain that these describe the inspection reader. The unmodified real format_name remains in Full measured file information. This avoids presenting a raw comma-separated family list as several containers in one file.

## Additional implementation checks

A first integration test caught a saved-rate control initialising before IndexedDB hydration. The control now synchronises once project loading completes; the actual saved output and selected rate remain aligned after reload. Initial test assertions for navigation cleanup were made before the hash route rerender; they now wait for the destination and require every genuine MediaStreamTrack to be ended. No capture-output simulation was substituted.

New test cases exercise actual MediaRecorder bytes from a canvas-supplied test surface (chooser stub explicitly labelled), plus actual WebM inspection and real silent MP4 editing. Separately, the native-capture record verifies real getDisplayMedia against a virtual X11 desktop with an automated chooser. Old references keep their lesson IDs, stored challenge keys and graders; numeric bookmarks map to named reference routes.

Processing/download activity disables destructive project clearing. Output probes persist with the actual generated blobs, and Publish displays their measured evidence after reload. A visible first-run32.4MB disclosure precedes processing controls; the additional offline package has its own readiness and does not enter the baseline lesson manifest. Full-suite, independent-checker and public-deployment results are recorded separately when complete.

A Firefox integration failure exposed a real MIME negotiation bug: Firefox accepts `video/webm;codecs=vp8,opus` in feature detection but, for a stream without an audio track, starts in the inactive state and never supplies a final chunk. A separate minimal real-API reproduction compared VP8 alone (actual chunks and stop event) with VP8+Opus (no chunks or stop), using the same canvas stream. Negotiation now uses the actual granted tracks, selecting video-only codecs when audio is absent even if it was requested. Both the browser recording/edit case and unit regression cover this; all four Firefox journey cases passed after the fix. A bounded finalisation timeout also releases tracks and offers retry if a recorder breaks. Cancellation coverage now holds a core request until after the cancel click, so a fast request failure cannot remove the control before the test exercises cancellation.

The new fresh-offline-without-tools case found that Firefox can hang on a failed worker module import instead of returning an error. Before creating a worker when explicitly offline, the engine now requires its actual core JS and WASM to be present in Cache Storage. Missing tools fail promptly with useful guidance; the saved baseline reference still loads. Both Chromium and Firefox pass the baseline-only and separately saved-tools cases. A unit test verifies prompt rejection before worker creation and a clean connected retry.

A builder source audit also caught the imported-file origin falling through to the generated-result label. A separate prose drafter supplied “Existing recording selected from this device”; MediaView now uses it for imported sources. The final browser cases select a real MP4, require its import origin, inspect its actual bytes, then reject an unsupported file without replacing that source. The independent checker verifies the built label.

**C1, medium — sparse-picture edit timing, found by the independent checker.** Importing an actual one-picture-per-second Build result and requesting [0,1.25) produced two seconds of pictures and1.25seconds of audio. Applying output `-r 12` after trimming retained each original picture's one-second hold. The command now places decoded pictures on the12fps timeline **before** trimming, then resets clocks/joins/encodes. Held pictures are repeated, not interpolated motion. Native execution of the exact command now measures1.25seconds for [0,1.25), and1.75seconds for [0.25,1.5)+[2,2.5), with or without sound. Separate drafting clarifies requested versus measured duration, picture-boundary rounding and sound padding. The real-browser regression reimports its own newly generated1fps muxed bytes and checks both cuts by native ffprobe; Chromium and Firefox passed. Independent checker re-verification is required and recorded separately.

An intermediate full run timed out waiting for an offline update navigation in phone-dark. The unchanged update case was rerun three times in isolation; all three passed. This is retained as an observed intermittent test failure, not attributed to an invented cause. Final full-suite evidence supersedes intermediate run status, without erasing it. The first sparse-import regression attempt also used Playwright's temporary download path without its original extension; the app correctly rejected that input. The test now preserves the real MP4 name/MIME and bytes when reimporting.
