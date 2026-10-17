# Module 0 plan — What is a digital video?

Copyright © 2026 Christopher Snow.

**Status:** implementation brief. Revalidate every claim from real fixture evidence before authoring. This file is a plan, not a measurement report.

## Learner outcome

After this lesson, the learner can explain why a media file is not merely a stack of identical-duration pictures, inspect the tracks in a real recording, distinguish file container from audio/video encoding, and identify frames at known presentation times without confusing time, frame index, bitrate or filesize. They can select sensible information to inspect before editing a software demo.

## Running situation

A data engineer has recorded a short terminal/browser demo: a command starts, results appear, and narration explains the result. The editor needs to inspect what was captured before deciding how to edit it. Create an original compact sample with moving UI content, legible text, and audible spoken or generated narration (or a clearly identified synthetic audio stream). The picture must change enough that frame inspection teaches something. Avoid stock media and unnecessary downloads. Use script-generated media if suitable, plus actual media outputs. If the first script produces nothing but abstract colour bars, revise it to resemble a technical demo.

Commit reproducible generation commands, tool versions, licence/provenance, and evidence of every claimed media attribute in `docs/notes/module-0/media/`. Source and assets must be reasonably small for Pages. Browser preview must work on mobile.

## First lesson's teaching arc

- **Question:** A screen recording looks like one file. What information must an editor find before cutting it?
- **Motivation:** Before trimming a demo, you need to know what visual and audio material and timing were recorded.
- **Prediction:** Present the file plus enough visible facts to reason about the outcome, and ask one useful prediction. No guessing hidden frame rates or stream counts.
- **Investigation:** Play the actual short file; inspect its video and audio streams; move a time cursor; view the actual frame presented at that time and its timestamp. Show a filmstrip sourced from the fixture itself, not unrelated illustrations.
- **Construction:** Learner adjusts an inspection view (e.g. selects a track and time interval, identifies whether an audio stream is present) with a keyboard/touch-friendly control.
- **Failure experiment:** Show a plausible interpretation that fails (e.g. treating the two independently timed streams as identical frames, or assuming every second has an identical number of presented frames); use actual fixture evidence. Do not force VFR teaching if the fixture is constant-frame-rate.
- **Explanation:** What the player/inspector revealed, including frame, presentation timestamp, audio samples/stream, codecs and container, in plain English.
- **Generalisation:** How these questions apply to an unfamiliar OBS or screen recording, and where `ffprobe` will help later.
- **Challenge:** Given a fixture and its visible inspectable evidence, correctly identify the video/audio streams and locate a requested moment/frame; feedback names the misconception and offers five progressive hints. Grade from fixture-derived reference data, not hand-authored hidden answers.
- **Reflection:** One useful transfer prompt: what would you check before editing a recording with silent narration? This should not gate progression on subjective prose.

Keep the sections only as long as needed. Existing platform schema may require them all; fulfil it without game-like repetition.

## Interactives to build

1. **Media explorer:** one genuine short video player, scrubbable time cursor, corresponding original thumbnail/frame, presented frame index/timestamp where established, and stream listing computed from the fixture's probed metadata. On a phone use stacked panes and finger-sized controls; on desktop coordinate the preview and inspector. Never label a value as measured if estimated by the browser.
2. **Container and streams diagram:** show file → video stream → frames/timestamps and file → audio stream → audio samples (or audio segments), derived from metadata. Label concepts at first use; diagram should convey relationships that paragraphs cannot.
3. **Prediction/challenge:** one consequential learner action using the actual media explorer. Feedback explains the why, not only a checkmark. Retry and reset work.
4. **Optional `ffprobe` bridge:** expandable exact command and captured output for the fixture, with provenance. No need to build a full CLI simulator in Module 0.

## Accuracy hazards

- Video frames are presented at timestamps, which are not necessarily spaced equally for all files. A displayed frame index is not automatically a timestamp.
- Audio samples and video frames are different units; a browser player may report time without exposing a reliable per-frame index. Use an independently recorded reference timeline when needed and label it as such.
- Container, codec and stream are different concepts. MP4 is not a video codec.
- Recorded `ffprobe` values are facts about this fixture and command/version; avoid universal claims based on one file.
- Use an actual frame/video still from the included asset, not a stock photo or a fake screen recording.

## Model and implementation boundaries

Separate the pure model/metadata reader, media fixture contract and UI. Keep a single source of truth for reported stream metadata and expected challenge answers. Build a script to verify fixture metadata and frame/timestamp correspondence against native `ffprobe`; write a test pinning its verified snapshot. If browser APIs cannot provide a datum precisely, do not pretend they can.

Preserve performance: load preview lazily, do not start a multi-megabyte WASM encoder for a module requiring only inspection. No remote network calls. No uploader requirement for Module 0.

## Definition of done

- An original front-page introduction explains the audience, prerequisites, outcome, why media fundamentals matter to better demos, and planned modules without marking them finished.
- One full lesson serves the stated learning outcome with understandable prose, real player, verified visualisations, meaningful challenge and working hints/retry.
- Tested at desktop and tablet/phone widths and light/dark modes, using actual browser interaction, with keyboard and touch compatibility and no sideways scrolling.
- Reproducible media fixtures and licensing, documented FFmpeg/ffprobe evidence, deterministic facts tests, completed graded reference, useful failure cases.
- Repeatable `npm run check` equal to CI (including Playwright), and Pages deploy configured.
- Independent reader, sceptic, fix list and checker notes committed. If independent agents are unavailable, say so and record a manual review recommendation; do not invent a review.
- No later chapters falsely shown as implemented.

## Originality note

The common introduction is a vocabulary glossary and a generic 'convert this video' command. This lesson begins instead with a real technical recording that must be inspected for editing, and introduces terminology only when an observation demands it. No copied teaching text, figures or examples.
