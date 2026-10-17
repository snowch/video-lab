# Verified fact brief for the separate prose drafting pass

Copyright © 2026 Christopher Snow.

The prerequisites are ordinary files, a browser and basic code/terminal familiarity. No media vocabulary is assumed. The outcome is to inspect a recording before cutting: distinguish container, streams and codecs, locate a picture by measured presentation time, and avoid treating audio samples as pictures.

Read `AGENTS.md`, the module plan, and `/workspace/assembly-lab/docs/style.md`. Write original British English, no em dashes, no suspense or filler. Define terms when observations require them. Draft prose and labels separately from structural lesson data.

## Evidence already executed

`npm run media:verify` passed: native ffprobe measured the committed MP4 again; every stream property, all 120 video frame timestamps, all 469 decoded audio blocks, SHA-256 and all extracted JPEGs were checked against decoded MP4 pixels. `src/media/model.test.ts` pins model facts.

- `media-source/demo.html` is an original functioning browser app with three build records. The screenshot capture actually clicks Sort at frame index 48. It sorts durations numerically; payments is the longest at 61 s. This is a scripted browser capture assembled into a recording, not a recording of a real production system.
- `scripts/generate-media.mjs` captures 120 browser pictures at a declared rate of 12 frames per second into a 10-second MP4, 960 × 540 pixels, H.264 video stream index 0, AAC audio stream index 1. Do not imply these stream positions hold for other files.
- The audio is a quiet synthetic 440 Hz tone, not narration. Listening is optional. The text describes all meaningful visual actions. A muted player still has an audio stream.
- `src/media/fixture.json` contains the measured metadata. Video time base 1/12288 second per tick; its frame PTS ticks differ by 1024, giving 1/12 second. Measured decimal seconds are rounded by ffprobe; PTS ticks remain exact. PTS means presentation timestamp: when a decoded picture is due for display, not how long decoding took.
- Audio sample rate is 48,000 per second, one channel; decoded AAC blocks mostly contain 1024 samples. Audio samples are measurements of sound, video frames are pictures. At time 1 s the latest video frame begins at 1 s but the current audio block begins at 0.981333 s. Blocks package samples; this is not a shared count of pictures and sounds.
- This fixture is constant frame rate. Other recordings can have unequal frame intervals. Our model selects the last recorded PTS at or before the selected time, never derives a frame from average frame rate. The browser preview's currentTime is a browser time estimate; the exact still is independently extracted from the fixture. Do not claim the DOM exposes a reliable frame index.
- An MP4 container organises the streams and their timing. Codecs describe how picture/sound data is encoded and decoded; H.264 and AAC apply here. MP4 is not the video codec. ffprobe identifies this family as mov,mp4,m4a,3gp,3g2,mj2; file major_brand is isom.
- `frameAt(6.25)` is zero-based frame 75, PTS 76800 ticks. Target challenge time 6.25 s is a task parameter, not hidden metadata. References and final hint must interpolate `referenceAnswers` from the model.
- Primary sources fetched successfully 17 October 2026: https://ffmpeg.org/ffprobe.html (show_streams/show_frames), https://ffmpeg.org/ffmpeg-formats.html (containers), https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime (playback position/precision). Generation commands/versions in `docs/notes/module-0/media/generation.json`; raw output `ffprobe.json` beside it.

## Planned controls to describe, not overclaim

Prediction: Given the visible synthetic audio note, predict whether muting changes which streams the file contains. Choose yes/no, check and retry.
Investigation: native player with Play/Pause/Mute; frame slider and previous/next buttons drive an independently extracted still and seek the browser. Six sampled actual thumbnails jump to their timestamps. Readout shows selected frame's index, PTS seconds/ticks, time base, video rate and dimensions; browser time is separate. Downloadable MP4/raw evidence.
Construction: choose video/audio and interval start (whole seconds 0–9); diagram shows file branching into both streams; interval readout compares video picture count versus audio sample positions for a one-second interval. Diagram is a labelled explanatory shape; it is not an audio waveform.
Failure experiment: select a time; test the false assumption that an audio sample and video picture have matching indexes at that time. Evidence names their different rates and units. No VFR claim for this sample.
Challenge: six fields, graded individually with meaningful misconception feedback: video stream index, audio stream index, container, picture codec, frame index and PTS seconds for targetTime. Blank initial fields; run, edit/retry, reset, five progressive hints and persistence from shared platform.
Reflection: local optional notes, not graded. Prompt concerns apparently silent narration and what to inspect; silence is not proof that a stream is absent.

## Deliver files

`src/content/module0.prose.ts`: export `prose` with keys question, motivation, prediction, investigation, construction, failureExperiment, explanation, generalisation, challenge, reflection, modelVsReality, modelNote, challengeTask and hints (five-tuple). May import measured model values.
`src/content/module0.labels.ts`: export `labels` with title, objectives, sections (record of ten section kinds), captions (prediction, explorer, streams, failure, challenge, reflection), challengeTitle, fields (video/audio/container/codec/frame/timestamp), feedback (same keys, explain failed test without immediately revealing every answer).
`src/content/home.strings.ts`: export `home` with title, subtitle, eyebrow, intro, audienceTitle/audience, outcomeTitle/outcome, start, planTitle, planNote; export `modules` array of {id,title,summary} covering 0–9, only 0 implemented by renderer. No promises of later-module availability.
Builder creates UI strings separately; your pass must review and edit them once available.
