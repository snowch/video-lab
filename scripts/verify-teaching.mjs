// Copyright © 2026 Christopher Snow
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
const fixture = JSON.parse(readFileSync("src/course/fixtures.json", "utf8"));
const hash = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");
assert.equal(hash("public/" + fixture.source), fixture.sourceSha256);
for (const example of fixture.examples) {
  const path = "public/" + example.path;
  assert.equal(hash(path), example.sha256);
  const report = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  assert.equal(report.streams.length, 1);
  assert.equal(report.streams[0].codec_name, "h264");
  assert.equal(report.streams[0].pix_fmt, "yuv420p");
  assert.equal(Number(report.streams[0].nb_frames), example.frames);
  assert.equal(Number(report.format.duration), example.duration);
  assert.equal(example.duration, example.end - example.start);
  // Independently compare decoded first/last pictures with the source at those times.
  for (const time of [0, example.duration - 1 / 15]) {
    const decode = (file, at) =>
      execFileSync(
        "ffmpeg",
        [
          "-v",
          "error",
          "-i",
          file,
          "-ss",
          String(at),
          "-frames:v",
          "1",
          "-pix_fmt",
          "rgb24",
          "-f",
          "rawvideo",
          "-",
        ],
        { maxBuffer: 8 * 1024 * 1024 },
      );
    const actual = decode(path, time),
      expected = decode("public/" + fixture.source, example.start + time);
    assert.equal(actual.length, expected.length);
    let error = 0;
    for (let i = 0; i < actual.length; i++)
      error += (actual[i] - expected[i]) ** 2;
    assert.ok(
      Math.sqrt(error / actual.length) < 4,
      example.id + " source picture mismatch",
    );
  }
}
console.log(
  "Three provided teaching cuts: hashes, durations, frames and decoded source pictures verified.",
);

// The browser's exact three-second bridge is exercised by Playwright and native-probed.
// Native versions can report one picture-hold less; verify the actual frames and reset clock.
const { mkdtempSync, rmSync } = await import("node:fs");
const { tmpdir } = await import("node:os");
const { join } = await import("node:path");
const directory = mkdtempSync(join(tmpdir(), "video-lab-filter-"));
try {
  const path = join(directory, "range.mp4");
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-i",
    "public/" + fixture.source,
    "-vf",
    "trim=start=4:end=7,setpts=PTS-STARTPTS",
    "-an",
    path,
  ]);
  const report = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  assert.equal(report.streams.length, 1);
  assert.equal(Number(report.streams[0].start_time), 0);
  assert.equal(Number(report.streams[0].nb_frames), 45);
  assert.ok(Math.abs(Number(report.format.duration) - 3) < 0.1);
  console.log(
    "Native single-range filter bridge: forty-five pictures and reset clock verified.",
  );
} finally {
  rmSync(directory, { recursive: true, force: true });
}
