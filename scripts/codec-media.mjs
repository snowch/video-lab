// Copyright © 2026 Christopher Snow
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
const root = "public/media/codecs";
const record = "src/notebook/codecs-media.json";
const source = "public/media/notebook/bunny-short.mp4";
const run = (bin, args) =>
  execFileSync(bin, args, { maxBuffer: 8 * 1024 * 1024 });
const identity = (path) => {
  const bytes = readFileSync(path);
  return {
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
};
const commands = [
  ["-i", source, "-vn", "-c:a", "pcm_s16le", `${root}/reference.wav`],
  ...[32, 128].map((rate) => [
    "-i",
    `${root}/reference.wav`,
    "-c:a",
    "aac",
    "-b:a",
    `${rate}k`,
    `${root}/aac-${rate}.m4a`,
  ]),
];
const probe = (path) =>
  JSON.parse(
    run("ffprobe", [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-of",
      "json",
      path,
    ]),
  );
function facts(path) {
  const p = probe(path);
  assert.equal(p.streams.length, 1);
  const s = p.streams[0];
  assert.equal(s.codec_type, "audio");
  assert.equal(Number(s.sample_rate), 48000);
  assert.equal(s.channels, 2);
  assert.ok(Math.abs(Number(p.format.duration) - 8) < 0.03);
  run("ffmpeg", ["-v", "error", "-xerror", "-i", path, "-f", "null", "-"]);
  return {
    ...identity(path),
    codec: s.codec_name,
    sampleRate: Number(s.sample_rate),
    channels: s.channels,
    duration: Number(p.format.duration),
  };
}
if (process.argv.includes("--generate")) {
  mkdirSync(root, { recursive: true });
  for (const args of commands) run("ffmpeg", ["-v", "error", "-y", ...args]);
  writeFileSync(
    record,
    JSON.stringify(
      {
        ffmpeg: run("ffmpeg", ["-version"]).toString().split("\n")[0],
        ffprobe: run("ffprobe", ["-version"]).toString().split("\n")[0],
        source: { path: source, ...identity(source) },
        commands: commands.map((args) => ["ffmpeg", ...args]),
        files: commands.map((args) => {
          const path = args.at(-1);
          return { name: path.split("/").at(-1), ...facts(path) };
        }),
      },
      null,
      2,
    ) + "\n",
  );
}
const expected = JSON.parse(readFileSync(record, "utf8"));
assert.deepEqual(identity(source), {
  bytes: expected.source.bytes,
  sha256: expected.source.sha256,
});
for (const file of expected.files) {
  const { name, ...rest } = file;
  assert.deepEqual(facts(`${root}/${name}`), rest);
}
assert.deepEqual(
  expected.files.map((f) => f.codec),
  ["pcm_s16le", "aac", "aac"],
);
assert.ok(expected.files[1].bytes < expected.files[2].bytes);
assert.ok(expected.files[2].bytes < expected.files[0].bytes);
console.log(
  "Codec listening files: source and asset hashes, audio-only codecs, stereo 48 kHz, eight-second durations and full decoding verified.",
);
