// Copyright © 2026 Christopher Snow
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
const path = "public/media/mousepad-demo.mp4";
assert.equal(
  createHash("sha256").update(readFileSync(path)).digest("hex"),
  "d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e",
);
const report = JSON.parse(
  execFileSync(
    "ffprobe",
    ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
    { encoding: "utf8" },
  ),
);
assert.equal(report.streams.length, 1);
const s = report.streams[0];
assert.equal(s.codec_type, "video");
assert.equal(s.codec_name, "h264");
assert.equal(s.width, 1280);
assert.equal(s.height, 720);
assert.equal(s.nb_frames, "180");
assert.equal(s.avg_frame_rate, "15/1");
assert.equal(s.pix_fmt, "yuv420p");
assert.equal(Number(report.format.duration), 12);
console.log(
  "Mousepad sample hash, duration, frames and silent video stream verified.",
);
