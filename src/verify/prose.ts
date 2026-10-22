// Copyright © 2026 Christopher Snow
import { v } from "./strings";

export const prose = {
  question:
    "You exported the file, it plays, you uploaded it — and a viewer reports it has no sound, or the text is unreadable, or the site rejected it. What would have caught that before publishing?",
  motivation: `Three real candidate exports of the same recording play below: the plain original (960 × 540, no captions), a captioned version with captions burned in, and a half-size re-encode (640 × 360, CRF 23). All three are real files; their commands are shown beside them.

Play each. All three play. Playing is not the same as ready: the checks that matter are about what the file contains and how it behaves, and those need measurements, not impressions.`,
  prediction: `Before you read the probe facts, predict which of the three candidates will pass every publish check. Ask of each: does it have a video stream, does it have an audio stream, is the picture readable at playback size, is the size reasonable for sharing?

Then predict: a fourth file exists that plays normally but should fail a check. What could be wrong with a file that plays?`,
  investigation: `The table below records what native \`ffprobe\` measured in each real candidate: the streams (what the file contains), the resolution, the duration and the size in bytes.

Read the stream column carefully. The plain original and the captioned version each list two streams: a video stream (h264, 960 × 540) and an audio stream (aac, 48 kHz, mono). The half-size re-encode also has both, at 640 × 360. A file's stream list is the ground truth of what a player can play — if a stream is not in the file, no player can invent it.`,
  construction: `Export your own candidate below and verify it in the browser. Choose the output resolution and the CRF quality setting, press **${v.export}**, and the browser's real FFmpeg.wasm re-encodes the labelled original recording. The run then probes the produced file with a real ffprobe step and reports the measured facts: size, duration, resolution and the full stream list.

The exact commands run in a worker, the produced MP4 plays in the page, and you can download it. Verify it the way you would verify a file you were about to publish.`,
  failureExperiment: `The fourth candidate plays below: a real file, 10 seconds, picture fine. But its probe facts tell a different story — the stream list has a video stream and **no audio stream**.

This is the classic export mistake: the command mapped only the video (${"`-map 0:v:0`"}), so the audio was never copied into the file. The file plays, looks fine, and has no sound. A playback check alone passes it; only a stream probe catches it. This is why ${'"'}it plays on my machine${'"'} is not a publish check.`,
  explanation: `A verification pass proves specific facts about a specific file, and each check proves a different thing:

1. **Playback** proves the file decodes in a player. It says nothing about what is missing.
2. **Stream probe** proves what the file contains: which streams exist, with which codecs, resolution and sample rate. This is the check that catches a missing audio stream.
3. **Duration and size** prove the file is the length and weight you expect: a truncated export or an accidental re-encode shows up here.
4. **Sound level** (Module 5) proves the audio is actually audible, not just present.
5. **Picture stills** (Module 6) prove the text and captions are readable at the size you will publish at.

None of these proves the others. A file can pass playback and fail the stream probe, exactly as the video-only candidate does. Verification is a list of checks, and a file is ready only when every check passes.`,
  generalisation: `A publish checklist for a screen demo:

- **Streams**: the probe lists a video stream and an audio stream, with the codecs you expect.
- **Duration**: the measured duration matches the recording (a truncated file fails here).
- **Size**: the measured size fits the platform's limit.
- **Picture**: the text and captions are readable at the published size (Modules 4, 6 and 7).
- **Sound**: the measured level is audible and not clipping (Module 5).
- **Playback**: the final file plays start to finish in a real player.

Run the checks on the file you will actually upload — not on an earlier export. Each check is a measurement; "it played once" is not a measurement.`,
  challenge: `A fourth candidate — the video-only file — plays normally. Judge which candidate fails a publish check, and name the check that catches it. Then export your own candidate and verify its measured facts.`,
  reflection: `What is your publish checklist for the next demo you share? Write an optional note; it is not graded.`,
  modelVsReality: v.modelVsReality,
  modelNote: v.modelNote,
  challengeTask: `Judge which candidate fails a publish check, name the check that catches it, then export and verify your own candidate.`,
  hints: [...v.hints] as readonly string[],
  originality: v.originality,
};
