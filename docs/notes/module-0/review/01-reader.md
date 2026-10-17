# Independent learner review — introduction and Module 0

Copyright © 2026 Christopher Snow.

Reviewed 17 October 2026 by a fresh-context gpt-6.1-sol agent with high reasoning effort, as recorded by the parent spawn settings. This reviewer did not author or edit the lesson. I read `AGENTS.md`, `docs/plan.md`, `docs/notes/module-0-plan.md`, `docs/sources.md`, and Assembly Lab's authoring/style requirements, then inspected the actual built site at `http://127.0.0.1:4173/video-lab/`. I did not read an author rationale, a draft review, or lesson source before forming these findings. This is the learner stage, not the subsequent sceptic or fix verification.

## Assessment

The lesson is usable by the stated audience. I found no blocking interaction or missing hidden fact needed to attempt the challenge. Its strongest distinctions are the explicit separation of browser playback time from recorded frame evidence, the synthetic-tone disclosure, and clear planned-module status. The page supplies useful field feedback, progressive hints, and a working reference verdict. The main learning concern is the order and concentration of unfamiliar vocabulary.

Severity means: high blocks a stated learning action; medium can cause a central misconception or substantial rereading; low is local friction or a limited overstatement. Findings below are proposals for the sceptic, not accepted fixes. No challenge answer is included in this report.

## Assumed prior knowledge

The page reasonably assumes ordinary files, browser controls, a software build, a terminal command, decimals, fractions, multiplication, zero-based indexes, and choosing a dropdown/range value. These fit the technically experienced audience. It does not require native FFmpeg installation or prior video knowledge to complete the activity.

There are additional temporary assumptions before the lesson teaches them: recognising what a codec identifies, understanding timestamp ticks and a time base, and knowing how to translate a requested time into a frame-index slider setting. The first two are taught later; the third requires interpreting the control and watching its changing PTS readout. Findings P1 and I1 describe the resulting friction.

## Factual concern

### F1 — Medium: the general codec definition equates encoding with compression

**Location/quote:** Explanation: “A codec specifies how media is encoded and decoded: stored as compressed data, then reconstructed for playback.”

**Effect:** This explains the supplied compressed streams, but reads as a universal definition. A beginner may carry away that every encoded video/audio stream is compressed, rather than treating compression as a property of the encoding used here.

**Evidence:** The sentence has no “in this file” qualification. The following sentence correctly identifies the fixture's encodings. The named FFmpeg codecs reference also covers raw video and PCM audio; the sceptic should check this distinction against that primary reference rather than treating this learner review as an exhaustive codec audit: <https://ffmpeg.org/ffmpeg-codecs.html>.

**Direction:** Keep encode/decode as the general definition and qualify the compression claim to the encodings in this recording, or otherwise preserve the distinction without adding an unrelated codec lesson.

## Prose and teaching concerns

### P1 — Medium: important inspector labels precede their meanings

**Location/quotes:** Investigation readout: “Timestamp ticks” and “Time base, seconds per tick”. Construction diagram/readout: “Codec: h264” / “Codec: aac”. The meaning of a codec and how ticks become seconds arrive later in “Read the file and timing vocabulary”.

**Effect:** A learner with no media vocabulary encounters unexplained numbers and identifiers in the main inspection task. The page has carefully defined frame, frame index and PTS immediately beforehand, so these remaining labels look like facts the learner is already expected to interpret. The relation between the displayed tick count, fraction and seconds is central to understanding the measurement, even though the challenge can be answered from the PTS field alone.

**Evidence:** I read the rendered sections in order. The Investigation paragraph explains PTS, ffprobe and the fraction used for frame rate, but not timestamp ticks/time base. Construction introduces audio samples, channels, decoding and blocks, while codec is first explained in the following Explanation section. This is the same in both themes and sizes.

**Direction:** Put the minimum needed plain-English meaning beside the first relevant readout, or defer the secondary readouts until that meaning has been established. Avoid duplicating a glossary paragraph.

### P2 — Low: two introductory paragraphs combine too many independent jobs

**Location/quotes:** Investigation begins “A frame is one picture in the video stream” and ends with “12/1 means 12 pictures per second here.” Construction begins “The MP4 container organises the file's streams and their timing” and also defines samples, channels, decoding and audio blocks.

**Effect:** The sentences are individually readable, but a new learner must retain several concepts before reaching the controls that make them concrete. Investigation moves from operating instructions to presentation timing, tool provenance and frame-rate notation within one paragraph. Construction similarly combines the task instructions and several new mechanisms. This is particularly noticeable on the phone, where the Investigation paragraph occupies roughly half a screen before the figure begins.

**Evidence:** Rendered phone screenshots at 390 × 844 show these as uninterrupted paragraphs; desktop uses the same grouping. Nothing is inaccessible, and this does not prevent completion.

**Direction:** Separate the action instruction from the meaning of the selected frame, and put tool/rate details with the relevant displayed evidence. Let the stream figure support each new audio idea rather than loading all definitions before it.

## Interaction concern

### I1 — Low: time-based guidance names an operation the explorer does not directly offer

**Location/quotes:** The third challenge hint says “Move the explorer to [the requested time].” Failed field feedback says “Select the requested time in the explorer and read its frame index.” The actual range label is “Inspect recorded frame”, and its value is an integer frame index. Its only exact-step controls are “Previous frame” and “Next frame”.

**Effect:** A learner can reasonably look for a seconds input or try to use the browser player position, although the lesson warns that the player does not supply a reliable frame index. The available approach is to move among recorded frames while watching the PTS readout. That approach works, but the instruction leaves this step implicit. It is more awkward on a narrow touch slider than with keyboard arrows.

**Evidence:** I exercised thumbnails, the range, keyboard Home/ArrowRight and both step buttons. Range values are frame indexes; the selected time is a changing readout. There is no editable PTS/time field in the explorer. The challenge itself does have a numeric time answer field, which is a different control.

**Direction:** Describe finding the requested PTS by stepping through recorded frames, or provide a suitable recorded-time selection control. Preserve the distinction from the approximate native-player seek bar.

## Browser and control coverage

| Browser | Viewport | Themes | Coverage |
| --- | --- | --- | --- |
| Headless Chromium 156.0.8078.4 | 1440 × 1000 | light, dark | Introduction and full lesson; custom controls and disclosure states |
| Headless Chromium 156.0.8078.4 | 390 × 844, touch enabled | light, dark | Introduction and full lesson; same custom control sweep |
| Headless Firefox 157.0 | 1440 × 1000 | light | Full lesson and custom control sweep; introductory entry link |

I exercised empty/wrong/correct prediction states; play/pause and mute/unmute; all six thumbnail buttons; frame slider, frame steps and keyboard stepping; recorded-evidence disclosure; both stream selections and final interval; comparison run at nonzero and zero time and clearing its output on time change; empty and wrong challenge runs; all five hints; a reference answer run; editing after a verdict; clear-work confirmation, cancel and discard; reflection persistence after reload and clearing notes; all three time-model disclosures in every browser/viewport/theme case; theme switching; overview/lesson navigation; all ten section links and the return-to-explorer link in every browser/viewport/theme case; browser back/forward. The reference attempt displayed “All 6 tests passed”; editing an answer removed the old verdict. Frame endpoint buttons disabled correctly. No uncaught page errors appeared in the five complete sweeps. Document width matched viewport width (1440 or 390) in both themes.

Screenshots were visually inspected for the introduction in desktop light/dark and phone light/dark, Investigation in Chromium desktop/phone both themes and Firefox light, and Construction at phone light and desktop dark. Evidence scripts/logs/screenshots are temporary under `/workspace/scratch/reader-*`; they are not committed course assets.

Limits: this is browser emulation, not a physical phone or screen-reader audit. I used keyboard stepping and touch-enabled contexts, but did not exhaustively traverse every control solely by keyboard or tap every native-media menu item. Browser-native fullscreen, native overflow menus, audible tone quality, external GitHub destinations and actual file downloads were not validated. I did not independently rerun native FFmpeg/media generation or the project's quality suite; those belong to the technical/checker stages. Range changes used Playwright input events as well as keyboard stepping. Some exploratory automation failed because its selectors omitted the section-kind prefix in heading names or selected a hidden header link; these were script mistakes, not reported site failures. All completed coverage above was rerun with selectors matching the actual page.
