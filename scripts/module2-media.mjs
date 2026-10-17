// Copyright © 2026 Christopher Snow
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
const root = "public/media/module-2/";
const manifest = "src/module2/fixture.json";
const generate = process.argv.includes("--generate");
const run = (bin, args) =>
  execFileSync(bin, args, { maxBuffer: 250 * 1024 * 1024 });
const hash = (file) =>
  createHash("sha256").update(readFileSync(file)).digest("hex");
const probeArgs = [
  "-v",
  "error",
  "-show_streams",
  "-show_format",
  "-show_frames",
  "-of",
  "json",
];
function measure(file) {
  const p = JSON.parse(run("ffprobe", [...probeArgs, file]));
  return {
    duration: Number(p.format.duration),
    streams: p.streams.map((s) => ({
      type: s.codec_type,
      codec: s.codec_name,
      timeBase: s.time_base,
      start: Number(s.start_time),
      duration: Number(s.duration),
      ...(s.codec_type === "video"
        ? { width: s.width, height: s.height, rate: s.avg_frame_rate }
        : { sampleRate: Number(s.sample_rate), channels: s.channels }),
    })),
    frames: p.frames
      .filter((f) => f.media_type === "video")
      .map((f) => ({
        pts: f.pts,
        time: Number(f.pts_time),
        keyframe: !!f.key_frame,
      })),
    audio: p.frames
      .filter((f) => f.media_type === "audio")
      .map((f) => ({
        pts: f.pts,
        time: Number(f.pts_time),
        samples: f.nb_samples,
      })),
  };
}
const sourceFile = "build-queue-cuts.mp4";
const commands = [];
function encode(args) {
  commands.push(["ffmpeg", "-y", ...args]);
  run("ffmpeg", ["-v", "error", "-y", ...args]);
}
const outputArgs = [
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "18",
  "-pix_fmt",
  "yuv420p",
  "-r",
  "12",
  "-fps_mode",
  "cfr",
  "-c:a",
  "aac",
  "-b:a",
  "64k",
  "-movflags",
  "+faststart",
];
const trim = (start, end, v, a) =>
  `[0:v:0]trim=start=${start}:end=${end},setpts=PTS-STARTPTS[${v}];[0:a:0]atrim=start=${start}:end=${end},asetpts=PTS-STARTPTS[${a}]`;
const sequence = (start, end) =>
  Array.from({ length: (end - start) * 12 }, (_, i) => start * 12 + i);
let fixture;
if (generate) {
  mkdirSync(root, { recursive: true });
  encode([
    "-i",
    "public/media/build-queue.mp4",
    "-map",
    "0:v:0",
    "-map",
    "0:a:0",
    "-c:v",
    "libx264",
    "-crf",
    "18",
    "-preset",
    "slow",
    "-g",
    "24",
    "-keyint_min",
    "24",
    "-sc_threshold",
    "0",
    "-bf",
    "0",
    "-c:a",
    "copy",
    "-movflags",
    "+faststart",
    root + sourceFile,
  ]);
  const source = {
    file: sourceFile,
    sha256: hash(root + sourceFile),
    ...measure(root + sourceFile),
  };
  const results = [];
  const add = (id, file, sourceFrames, extra) => {
    const facts = measure(root + file);
    const stillIndexes = [0, facts.frames.length - 1];
    if (extra.joinFrame !== undefined)
      stillIndexes.splice(1, 0, extra.joinFrame - 1, extra.joinFrame);
    const stills = stillIndexes.map((index) => {
      const image = `${id}-${index}.jpg`;
      encode([
        "-i",
        root + file,
        "-vf",
        `select=eq(n\\,${index})`,
        "-frames:v",
        "1",
        "-q:v",
        "2",
        root + image,
      ]);
      return { index, image, sourceFrame: sourceFrames[index] };
    });
    results.push({
      id,
      file,
      sha256: hash(root + file),
      ...extra,
      ...facts,
      sourceFrames,
      stills,
    });
  };
  for (const start of [1, 3, 5]) {
    const end = start + 2;
    let file = `copy-${start}.mp4`;
    encode([
      "-ss",
      String(start),
      "-i",
      root + sourceFile,
      "-t",
      "2",
      "-map",
      "0:v:0",
      "-map",
      "0:a:0",
      "-c",
      "copy",
      "-avoid_negative_ts",
      "make_zero",
      root + file,
    ]);
    add(`copy-${start}`, file, sequence(start - 1, end), {
      kind: "cut",
      method: "copy",
      start,
      end,
    });
    file = `encode-${start}.mp4`;
    encode([
      "-i",
      root + sourceFile,
      "-filter_complex",
      trim(start, end, "v", "a"),
      "-map",
      "[v]",
      "-map",
      "[a]",
      ...outputArgs,
      root + file,
    ]);
    add(`encode-${start}`, file, sequence(start, end), {
      kind: "cut",
      method: "encode",
      start,
      end,
    });
  }
  for (const order of ["AB", "BA"])
    for (const end of [6, 8]) {
      const file = `join-${order}-${end}.mp4`;
      const segments = order === "AB" ? "[v0][a0][v1][a1]" : "[v1][a1][v0][a0]";
      encode([
        "-i",
        root + sourceFile,
        "-filter_complex",
        `${trim(0, 2, "v0", "a0")};${trim(4, end, "v1", "a1")};${segments}concat=n=2:v=1:a=1[v][a]`,
        "-map",
        "[v]",
        "-map",
        "[a]",
        ...outputArgs,
        root + file,
      ]);
      const a = sequence(0, 2),
        b = sequence(4, end);
      add(
        `join-${order}-${end}`,
        file,
        order === "AB" ? [...a, ...b] : [...b, ...a],
        {
          kind: "join",
          order,
          end,
          joinFrame: order === "AB" ? a.length : b.length,
        },
      );
    }
  fixture = { source, results };
  writeFileSync(manifest, JSON.stringify(fixture, null, 2) + "\n");
  writeFileSync(
    root + "evidence.json",
    JSON.stringify(fixture, null, 2) + "\n",
  );
  writeFileSync(
    "docs/notes/module-2/media/generation.json",
    JSON.stringify(
      {
        ffmpeg: run("ffmpeg", ["-version"]).toString().split("\n")[0],
        ffprobe: run("ffprobe", ["-version"]).toString().split("\n")[0],
        commands,
        probeCommand: ["ffprobe", ...probeArgs, "<file>"],
      },
      null,
      2,
    ) + "\n",
  );
} else fixture = JSON.parse(readFileSync(manifest, "utf8"));
assert.deepEqual(
  JSON.parse(readFileSync(root + "evidence.json", "utf8")),
  fixture,
);
const decode = (file) =>
  run("ffmpeg", [
    "-v",
    "error",
    "-i",
    file,
    "-map",
    "0:v:0",
    "-pix_fmt",
    "rgb24",
    "-f",
    "rawvideo",
    "-",
  ]);
const sourcePixels = decode(root + fixture.source.file);
const bytes = 960 * 540 * 3;
function close(actual, expected, tolerance, label) {
  assert.equal(actual.length, expected.length, label + " dimensions");
  let error = 0;
  for (let i = 0; i < actual.length; i++)
    error += Math.abs(actual[i] - expected[i]);
  assert.ok(
    error / actual.length < tolerance,
    `${label}: pixel MAE ${error / actual.length}`,
  );
}
const original = decode("public/media/build-queue.mp4");
close(sourcePixels, original, 3, "Source derivative");
for (const item of [fixture.source, ...fixture.results]) {
  assert.equal(hash(root + item.file), item.sha256);
  const actual = measure(root + item.file);
  for (const key of ["duration", "streams", "frames", "audio"])
    assert.deepEqual(actual[key], item[key], item.file + " " + key);
  if (!item.sourceFrames) continue;
  assert.equal(item.frames.length, item.sourceFrames.length);
  const output = decode(root + item.file);
  assert.equal(output.length, item.frames.length * bytes);
  for (let i = 0; i < item.frames.length; i++) {
    const sourceIndex = item.sourceFrames[i];
    close(
      output.subarray(i * bytes, (i + 1) * bytes),
      sourcePixels.subarray(sourceIndex * bytes, (sourceIndex + 1) * bytes),
      item.method === "copy" ? 0.001 : 3,
      `${item.id} picture ${i} from source ${sourceIndex}`,
    );
  }
  for (const still of item.stills)
    close(
      decode(root + still.image),
      output.subarray(still.index * bytes, (still.index + 1) * bytes),
      4,
      item.id + " still " + still.index,
    );
}
console.log(
  `Verified Module 2 source, ${fixture.results.length} real outputs, all timestamps, audio blocks, picture mappings and ${fixture.results.reduce((n, r) => n + r.stills.length, 0)} extracted stills.`,
);
