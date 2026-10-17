# Independent sceptic and technical review — introduction and Module 0

Copyright © 2026 Christopher Snow.

Reviewed 17 October 2026 by a separate agent/session that did not author the lesson or the learner review. This pass tests `01-reader.md` against the actual build at `http://127.0.0.1:4173/video-lab/`, the implementation, native media evidence and primary documentation. It records recommendations only; this reviewer changed no course source or fixtures.

Read: `AGENTS.md`, `docs/plan.md`, `docs/notes/module-0-plan.md`, `docs/sources.md`, the reader report, the media record, model, grader, generation/verification scripts and tests. The Assembly Lab review and style instructions were fetched separately. The review adopts their reader → sceptic → ranked fixes → checker separation, not their subject-specific content.

## Decisions on every reader finding

### F1 — Upheld, medium; rank 1

**Page evidence:** Explanation defines a codec as “how media is encoded and decoded: stored as compressed data, then reconstructed for playback.” The colon makes compression part of the general definition. The next sentence's fixture-specific encoding names do not restrict that preceding definition.

**Challenge to the finding:** Both streams used here are compressed. Nothing in the current fixture or challenge is numerically wrong because of this sentence. An elementary lesson may reasonably defer uncompressed formats.

**Why it survives:** Deferring those formats does not justify defining them out of existence. The primary [FFmpeg codecs documentation](https://ffmpeg.org/ffmpeg-codecs.html#rawvideo) lists a raw-video decoder; the [raw muxers documentation](https://ffmpeg.org/ffmpeg-formats.html#Raw-muxers) explicitly calls raw video “Raw uncompressed video.” This supplies a direct counterexample within the lesson's named tools. Encoding and compression must remain distinguishable.

**Smallest fix:** Keep the general encode/decode definition. Make compression an explicit property of the encodings in this recording. No new exercise or catalogue of codecs is needed.

### P1 — Upheld, with narrower impact; medium; rank 2

**Page evidence:** The first explorer readout has “Timestamp ticks” and “Time base, seconds per tick”. The following stream diagram uses “Codec” with encoding identifiers. At those points the page has defined a frame, a zero-based frame index, PTS and the inspection tool, but has not explained what the tick unit does or what a codec identifies. Their mechanism appears later in Explanation: “A time base gives the duration of one timestamp tick” and “Multiply ticks by the time base to obtain seconds.”

**Challenge to the finding:** “Seconds per tick” already states the time base's units. This audience can multiply a count by a fraction. A learner can also complete the challenge from the seconds readout without doing the conversion. Therefore reject any interpretation that the missing explanation blocks the challenge or requires guessing hidden metadata.

**Why it survives:** A unit label is a helpful clue, but the new media representation still arrives before its explanation. The codec label gives even less help. This conflicts with the stated absence of assumed video vocabulary and the first-use teaching rule. The defect concerns interpreting the inspector, not access to answers.

**Smallest fix:** Add the minimum tick/time-base relationship alongside the first timing readout and explain codec beside its first stream use. Move or shorten the later explanations to avoid a repeated glossary. Do not add a long preface to the already dense Investigation paragraph.

### I1 — Upheld, low; rank 3

**Page evidence:** The hint says “Move the explorer to [the requested time] seconds.” Failed frame feedback says “Select the requested time in the explorer and read its frame index.” The relevant control is labelled “Inspect recorded frame”; its values and keyboard increments are integer frame indexes. The exact-step buttons are “Previous frame” and “Next frame”. PTS is an output, not an input.

**Challenge to the finding:** The changing PTS is visible beside the step controls and in the detailed readout. Moving the frame slider until the requested PTS appears is possible. This is a wording mismatch, not a broken explorer or an impossible task.

**Why it survives:** The text names a direct time-selection operation that is absent. A learner may instead reach for the native player's seek bar, whose time and picture are deliberately not the authoritative inspection evidence.

**Smallest fix:** Describe moving the recorded-frame slider or stepping through frames until the displayed PTS matches the requested time. Apply the same instruction to the hint and failed-field feedback. A second time-entry widget is unnecessary.

### P2 — Partly upheld, low; rank 4, alongside P1

**Page evidence:** Investigation puts the operating instruction, frame-index explanation, PTS meaning, reconstruction caveat, tool provenance and fractional rate notation in one paragraph. Construction similarly puts a diagram instruction together with samples, channels, decoding and blocks. My phone screenshot confirms the uninterrupted Investigation paragraph is roughly half a phone screen before the figure.

**Challenge to the finding:** The sentences are individually direct; the rate and sample descriptions are accurate. The concepts are relevant, and the figure remains accessible. Paragraph length alone is not proof of a learning failure. Reject a request to remove the material merely because it is technical or to redesign the lesson around shorter text.

**What survives:** The action is hard to locate among several new meanings. The first-use fixes in P1 would worsen this if simply appended to those paragraphs.

**Smallest fix:** Separate the instruction from the explanation of the selected evidence. Place provenance/rate details with their readouts where useful. Keep the necessary audio mechanism and let the stream diagram supply its context. This can be a local regrouping within the P1 edit.

**Disposition:** No original finding is rejected in full. The rejected overstatements above are recorded so that a local teaching/copy fix does not grow into an unnecessary control redesign or new lesson.

## Independent assumed-knowledge pass

These decisions are based on the order of the rendered page, not on the lesson's term list alone.

| Candidate assumption | Evidence before the relevant use | Decision |
| --- | --- | --- |
| Stream | Prediction: “A stream is a sequence of related media data inside a file, such as pictures or sound.” | Explained before the explorer and diagram. |
| Frame, index from zero, PTS | Investigation: “A frame is one picture in the video stream”; “A frame index counts pictures from zero”; PTS “says when that picture is due for display.” | Explained before their readouts. |
| FFmpeg and ffprobe | Investigation: “FFmpeg is a set of media processing tools. Its inspection tool ffprobe recorded the timestamps used here.” | Explained before the evidence disclosure; no installation knowledge required. |
| Fractional frame rate | Investigation: “The rate readout gives pictures per second as a fraction”, followed by the fixture's interpretation. | Explained before its readout. |
| Samples, channels, decoding, audio blocks | Construction calls samples “individual measurements of sound”, defines a channel as a separate sequence, and says decoding reconstructs media from stored data and a block groups samples. | Explained before the diagram/failure readouts, though grouping needs P2. |
| Container | Construction says the container “organises the file's streams and their timing” before the branching diagram. | Adequate first-use meaning. |
| Current browser time versus extracted picture | Explorer caption: “The player previews the recording. The extracted still and recorded timestamps identify the selected picture.” Its following note separately names the browser estimate and the extracted evidence. | The distinction is available at the figure; fuller limits below reinforce it. |
| Tick/time-base relationship and codec | No mechanism/meaning before the first relevant readout. | Retained in P1; not excused as ordinary engineering knowledge. |
| Locating a requested PTS with an index control | The frame action is explained, but the hint/feedback does not connect that action to searching the PTS output. | Retained in I1. |

Ordinary files, browser controls, basic code/terminal work, decimals, fractions and zero-based indexing fit the published technical audience; the page also explicitly explains indexing. Optional raw JSON inspection is not required to operate the lesson. I found no additional unexplained prerequisite that merits a separate fix.

## Independent technical pass

- **Real media and provenance:** Read the original functioning app and capture script. The script performs the sort action, captures pictures and assembles the included recording; the local “Recorded timeline” disclosure identifies the scripted capture and its explanatory diagrams. Native verification checked the media hash, stream properties, all picture timestamps, every decoded audio block and every extracted still against the encoded recording. The stills are not unverified source screenshots presented as decoded results.
- **Timing:** The recorded video PTS ticks have a consistent step. The model selects from the recorded presentation timeline, not from average frame rate. Decimal `ffprobe` times are rounded and the page says so; tick values retain the rational timing evidence. Presentation time is explicitly distinguished from reconstruction duration. There is no claim that this fixture demonstrates variable frame rate.
- **Browser scope:** [The primary browser documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime) defines `currentTime` as playback time, says that assigning it seeks, and documents reduced precision. The page's approximate playback readout and independent extracted-picture selection respect that limit. No WebCodecs or reliable DOM frame index is claimed. Selection/keyboard stepping changed the extracted still and its own timestamp in both tested browsers; playback advanced separately.
- **Audio model:** The one-second interval result is labelled “Sample positions in one second, per channel”, not a count of compressed packets or fully contained decoded blocks. Failure feedback explicitly calls its sample position a calculation from selected time and sample rate. The displayed decoded-block boundary and sample count agree with native `ffprobe`. The final decoded block extends beyond the intended duration because of codec padding; neither the interval label nor the model documentation treats that as extra intended sound. A separate native decode produced a non-silent quiet signal with a central-window positive zero-crossing estimate of 440 Hz, supporting the synthetic-tone disclosure. This was an objective check, not an audible-quality review.
- **Diagram truth:** The page says “Their shapes do not measure sound levels or the space occupied in the file.” Its bars are therefore correctly identified as an explanatory structure, not a fake waveform or byte layout.
- **Grader:** The references derive from the verified fixture and rendered target. The unit tests check an accepted reference, empty work, one wrong field at a time, invalid numbers, units, stream swaps and equivalent decimal notation. My independent browser attempt derived the target from the rendered task and evidence, passed all six checks, then changed one frame answer: completion cleared immediately and rerunning produced one field failure. No target answer is reproduced in this review.
- **Scope and introductory claims:** The front page labels the later modules planned and only offers the implemented lesson. The synthetic sound is identified before playback; the text describes the sort action. No live server processing, remote media, actual narration or live decoder trace is claimed.

No additional substantive technical correction survived this pass beyond F1 and the first-use/control guidance issues above. This conclusion does not treat a passing test suite as proof of prose clarity.

## Executed evidence and limits

- `npm run media:verify`: passed; verified the media hash, two streams, 120 picture timestamps, 469 decoded audio blocks and every extracted still against native FFmpeg.
- `npm test`: passed; two test files, seven tests.
- Independent Playwright script against the existing production build: Chromium 156.0.8078.4 at 1440 × 1000/light and 390 × 844/dark with touch enabled; Firefox 157.0 at 1440 × 1000/light. Read introduction and rendered relevant sections, opened timeline notes, played/paused, selected and keyboard-stepped recorded frames, selected the audio/final interval, tested the different-units experiment, submitted empty challenge work and opened the first three hints. No page errors or horizontal overflow in these cases.
- Visually inspected my own screenshots of phone-dark Investigation, desktop-light Construction and Firefox-light Investigation. Browser script/log/screenshots are temporary `/workspace/scratch/sceptic-*` evidence, not course assets.
- The separate Chromium grader attempt described above passed. Native audio decode/analysis also completed. Primary codec documentation was freshly fetched; the previously fetched format, probe and browser references were inspected locally.

I did not regenerate the fixture, run the full `npm run check`/entire browser suite, perform a physical-device or screen-reader audit, listen to the tone, or verify deployed hosting. The reader's wider control sweep is not claimed as my own. One initial exploratory selector used an exact accessible name for a labelled select whose options contribute to its name; the script was corrected and all reported cases rerun. This was an automation error, not a page defect. The independent checker must verify the fixes in a newly built page.
