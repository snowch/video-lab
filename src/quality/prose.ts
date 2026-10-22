// Copyright © 2026 Christopher Snow
import { q } from "./strings";

const V = q.variants;

export const prose = {
  question:
    "Your finished demo is a 129 KB file that plays fine, but a sharing site wants it under a size limit, and a colleague's re-upload looks blocky. What actually decides how large a video file is, and what do you give up when you make it smaller?",
  motivation: `Three real encodes of the same recording play below, all at 640 × 360: the same quality scale from high (CRF 18) through FFmpeg's default (CRF 23) to heavily compressed (CRF 35). They play at the same display size, so any difference you see is the encoder's doing, not the player's.

Watch the queue text in each. The CRF 18 version keeps the text crisp; by CRF 35 the edges of the letters smear and block. All three are real files, encoded from the same source with only the quality setting changed.`,
  prediction: `Before you read the measurements, predict the file sizes of the three 640 × 360 encodes. The source recording is 960 × 540 and ${q.fullFrame.bytes} bytes.

Two things change when a recording is scaled down and re-encoded: it has fewer pixels (640 × 360 is ${"4"}/${"9"} of 960 × 540), and the quality setting decides how faithfully each pixel is kept. Predict an order of magnitude for each file in kilobytes, then compare with the measured table in the next section.`,
  investigation: `The table below records what native \`ffprobe\` measured in each real encode: the file size in bytes and the bitrate in bits per second. The bitrate is the file's size divided by its duration ${"—"} a direct measure of how much data the encoder spent per second of picture.

Three facts stand out. First, the three 640 × 360 files differ by only about 20 KB across a wide quality range: on this mostly-static content, the quality setting changes size less than you might expect. Second, the 480 × 270 file (same default quality) is only slightly smaller than the 640 × 360 files, not ${"4"}/${"9"} of them: the encoder spends its bits per pixel, and a smaller picture needs fewer bits per pixel to look acceptable. Third, all four are smaller than the 960 × 540 original, mostly because they have fewer pixels.`,
  construction: `Run the same kind of re-encode yourself below. Choose the output resolution and the CRF quality setting, press **${q.run}**, and the browser's real FFmpeg.wasm scales and re-encodes the labelled original recording. The exact command runs in a worker, the produced MP4 plays in the page, and the measured size and bitrate are shown beside it.

The default values reproduce one of the recorded comparisons: 640 × 360 at CRF 23.`,
  failureExperiment: `The recording at 480 × 270 plays below: a quarter of the pixels of the full frame, at the default quality setting. Real file, measured size shown in the table.

At this resolution the queue text is barely readable ${"—"} and this is the failure mode of "just make it smaller": resolution is what gives text its pixels, so shrinking the picture shrinks the text with it. The file is only slightly smaller than the 640 × 360 versions, so the saving buys a real loss of readability. A crop-and-zoom (Module 4) keeps the text large by removing unneeded picture instead of shrinking everything.`,
  explanation:
    `Three settings decide a video file's size and quality:

1. **Resolution** is the number of pixels in each picture (width × height). Fewer pixels mean less detail to store. 640 × 360 has ${"4"}/${"9"} the pixels of 960 × 540; 480 × 270 has ${"1"}/${"4"}.
2. **Bitrate** is how many bits the file uses per second of playback. It is measured, not chosen directly: it is the file size divided by the duration. The table's bitrates are real ffprobe measurements.
3. **CRF** (constant rate factor) is the quality setting for the x264 encoder. It is a single number where lower means better quality: 18 is near-lossless for this content, 23 is the default, 35 is visibly degraded. Unlike a bitrate, CRF lets the encoder spend more bits on complex pictures and fewer on simple ones.

The command runs as ` +
    "`-vf scale=W:H -c:v libx264 -crf N`" +
    `: scale resizes every picture to W × H; the encoder then compresses the resized pictures at quality N. Changing N at the same resolution changes quality and size; changing the resolution changes the pixel count itself.`,
  generalisation: `Choosing settings for a demo:

- Keep the resolution the text needs: for screen demos, that usually means at least 720p-equivalent width, and a crop-and-zoom beats a plain scale-down.
- Prefer CRF over a fixed bitrate for a one-off export: it targets a quality, and the size follows the content.
- Start at the default (CRF 23) and move down (towards 18) only when the picture matters more than the size; move up (towards 28${"-"}30) when a size limit forces it ${"—"} then check that text is still readable.
- Measure the result: the bitrate and byte size of the produced file are facts, not estimates.
- Remember the sound: re-encoding the picture leaves the audio untouched here, but a full re-encode is also the moment to check the audio bitrate.`,
  challenge: `Decide which version a viewer can read at playback size ${"—"} the 640 × 360 default-quality encode or the 480 × 270 one ${"—"} and say why the smaller file is not the better choice. Then run a re-encode yourself and check that the produced file's measured size matches its resolution.`,
  reflection: `What is your compression rule for the next demo you export? Write an optional note; it is not graded.`,
  modelVsReality: q.modelVsReality,
  modelNote: q.modelNote,
  challengeTask: `Choose the version a viewer can read, say why the smaller file loses, then run a re-encode and confirm the produced file's measured size.`,
  hints: [...q.hints] as readonly string[],
  originality: q.originality,
};

export const variantList = [V.crf18, V.crf23, V.crf35, V.quarter] as const;
