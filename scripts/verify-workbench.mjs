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

// Pin the real still-image experiment used by every production lesson.
const { mkdtempSync, rmSync, cpSync } = await import("node:fs");
const { tmpdir } = await import("node:os");
const { join } = await import("node:path");
const directory = mkdtempSync(join(tmpdir(), "video-lab-stills-"));
try {
  const hashes = [
    "8ede403e388697299ce5feae5015f2eb237471dd12b3e47eeccdb33d02ab9f99",
    "7443854f63bf90337f3dafc09a2982cd0eb02b7459a35da7db20ba024926af57",
    "f0f545862625de0154aa4b40010f6ac9d5b9e065c9129bb8c66cd9acb3a162c6",
  ];
  const decode = (args) =>
    execFileSync(
      "ffmpeg",
      [
        "-v",
        "error",
        ...args,
        "-frames:v",
        "1",
        "-pix_fmt",
        "rgb24",
        "-f",
        "rawvideo",
        "-",
      ],
      { maxBuffer: 16 * 1024 * 1024 },
    );
  for (let i = 0; i < 3; i++) {
    const name = `frame00${i}.jpg`,
      image = `public/media/mousepad-frames/${name}`;
    cpSync(image, join(directory, name));
    assert.equal(
      createHash("sha256").update(readFileSync(image)).digest("hex"),
      hashes[i],
    );
    const expected = decode([
      "-i",
      path,
      "-vf",
      `select=eq(n\\,${[0, 90, 150][i]})`,
    ]);
    const actual = decode(["-i", image]);
    assert.equal(actual.length, 1280 * 720 * 3);
    assert.equal(actual.length, expected.length);
    let squared = 0;
    for (let p = 0; p < actual.length; p++)
      squared += (actual[p] - expected[p]) ** 2;
    const rms = Math.sqrt(squared / actual.length);
    assert.ok(rms < 6, `snapshot ${i}: RGB RMS ${rms}`);
    console.log(
      `Snapshot ${i} from source at ${[0, 6, 10][i]}s: RGB RMS ${rms.toFixed(3)}`,
    );
  }
  for (const rate of [1, 2]) {
    const output = join(directory, `rate-${rate}.mp4`);
    execFileSync("ffmpeg", [
      "-v",
      "error",
      "-framerate",
      String(rate),
      "-i",
      join(directory, "frame%03d.jpg"),
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      output,
    ]);
    const metadata = JSON.parse(
      execFileSync(
        "ffprobe",
        ["-v", "error", "-show_streams", "-show_format", "-of", "json", output],
        { encoding: "utf8" },
      ),
    );
    assert.equal(Number(metadata.format.duration), 3 / rate);
    assert.equal(metadata.streams.length, 1);
    assert.equal(metadata.streams[0].nb_frames, "3");
    assert.equal(metadata.streams[0].width, 1280);
    assert.equal(metadata.streams[0].height, 720);
  }
  console.log(
    "Mousepad still bytes and actual 1/2 fps three-picture outputs verified.",
  );
  // First edits deliberately rely on measured defaults of this source/build.
  for (const [name, seek, duration] of [
    ["first-cut", undefined, 6],
    ["cut", 2, 6],
    ["shorter", 2, 4],
  ]) {
    const output = join(directory, `${name}.mp4`);
    execFileSync("ffmpeg", [
      "-v",
      "error",
      "-i",
      path,
      ...(seek === undefined ? [] : ["-ss", String(seek)]),
      "-t",
      String(duration),
      output,
    ]);
    const probe = JSON.parse(
      execFileSync(
        "ffprobe",
        ["-v", "error", "-show_streams", "-show_format", "-of", "json", output],
        { encoding: "utf8" },
      ),
    );
    assert.equal(Number(probe.format.duration), duration);
    assert.equal(probe.streams.length, 1);
    assert.equal(probe.streams[0].codec_name, "h264");
    assert.equal(probe.streams[0].pix_fmt, "yuv420p");
    assert.equal(Number(probe.streams[0].nb_frames), duration * 15);
  }
  console.log(
    "Native minimal first/start/shorter cuts: actual duration, H.264/yuv420p and picture counts verified.",
  );
} finally {
  rmSync(directory, { recursive: true, force: true });
}
