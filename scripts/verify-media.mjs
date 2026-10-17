// Copyright © 2026 Christopher Snow
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
const f = JSON.parse(readFileSync("src/media/fixture.json", "utf8"));
assert.equal(
  readFileSync("public/media/ffprobe.json", "utf8"),
  readFileSync("docs/notes/module-0/media/ffprobe.json", "utf8"),
);
assert.equal(
  createHash("sha256")
    .update(readFileSync("public/media/" + f.file))
    .digest("hex"),
  f.sha256,
);
// Required, never silently skipped: CI installs native FFmpeg.
const p = JSON.parse(
  execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-show_frames",
      "-of",
      "json",
      "public/media/" + f.file,
    ],
    { maxBuffer: 20 * 1024 * 1024, encoding: "utf8" },
  ),
);
assert.equal(Number(p.format.duration), f.duration);
assert.equal(p.format.format_name, f.format);
assert.equal(p.streams.length, f.streams.length);
for (const s of f.streams) {
  const actual = p.streams.find((a) => a.index === s.index);
  assert.ok(actual);
  assert.equal(actual.codec_type, s.type);
  assert.equal(actual.codec_name, s.codec);
  assert.equal(actual.time_base, s.timeBase);
  assert.equal(Number(actual.duration), s.duration);
  if (s.type === "video") {
    assert.equal(actual.width, s.width);
    assert.equal(actual.height, s.height);
    assert.equal(actual.avg_frame_rate, s.rate);
  } else {
    assert.equal(Number(actual.sample_rate), s.sampleRate);
    assert.equal(actual.channels, s.channels);
  }
}
assert.deepEqual(
  p.frames
    .filter((x) => x.media_type === "video")
    .map((x) => [
      x.pts,
      Number(x.pts_time),
      Number(x.duration_time ?? x.pkt_duration_time),
    ]),
  f.frames.map((x) => [x.pts, x.time, x.duration]),
);
assert.deepEqual(
  p.frames
    .filter((x) => x.media_type === "audio")
    .map((x) => [x.pts, Number(x.pts_time), x.nb_samples]),
  f.audio.map((x) => [x.pts, x.time, x.samples]),
);
assert.equal(readdirSync("public/media/frames").length, f.frames.length);
// Decode all stills from the committed MP4 again and compare image pixels, independent of JPEG encoder versions.
const decoded = execFileSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-i",
    "public/media/" + f.file,
    "-map",
    "0:v:0",
    "-f",
    "rawvideo",
    "-pix_fmt",
    "rgb24",
    "-",
  ],
  { maxBuffer: 200 * 1024 * 1024 },
);
const stills = execFileSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-framerate",
    "12",
    "-i",
    "public/media/frames/%03d.jpg",
    "-f",
    "rawvideo",
    "-pix_fmt",
    "rgb24",
    "-",
  ],
  { maxBuffer: 200 * 1024 * 1024 },
);
assert.equal(decoded.length, stills.length);
const video = f.streams.find((s) => s.type === "video");
const frameBytes = video.width * video.height * 3;
for (let frame = 0; frame < f.frames.length; frame++) {
  let error = 0;
  for (let i = frame * frameBytes; i < (frame + 1) * frameBytes; i++)
    error += Math.abs(decoded[i] - stills[i]);
  assert.ok(
    error / frameBytes < 4,
    `Still ${frame} differs from decoded video: MAE ${error / frameBytes}`,
  );
}
console.log(
  `Verified MP4 hash, ${f.streams.length} streams, ${f.frames.length} picture timestamps, ${f.audio.length} audio blocks and every extracted still against native FFmpeg.`,
);
