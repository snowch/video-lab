// Copyright © 2026 Christopher Snow
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Native, provided examples. These are never presented as an edited cell's result.
const manifest = "src/notebook/visuals/media.json";
const source = "public/media/notebook/bunny-short.mp4";
const captions = "public/media/notebook/captions.srt";
const output = "public/media/visuals";
const generate = process.argv.includes("--generate");
const run = (bin, args) =>
  execFileSync(bin, args, { maxBuffer: 32 * 1024 * 1024 });
const sha = (data) => createHash("sha256").update(data).digest("hex");
const identity = (path) => {
  const data = readFileSync(path);
  return { bytes: data.length, sha256: sha(data) };
};
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
const version = (bin) => run(bin, ["-version"]).toString().split("\n")[0];
const sourceProbe = probe(source);
const sourceStreams = sourceProbe.streams.map((s) => ({
  index: s.index,
  type: s.codec_type,
  codec: s.codec_name,
  timeBase: s.time_base,
  ...(s.codec_type === "video"
    ? {
        width: s.width,
        height: s.height,
        frameRate: s.avg_frame_rate,
        sampleAspectRatio: s.sample_aspect_ratio,
        pixelFormat: s.pix_fmt,
      }
    : { sampleRate: Number(s.sample_rate), channels: s.channels }),
}));
const frameCommand = [
  "ffprobe",
  "-v",
  "error",
  "-select_streams",
  "v:0",
  "-show_frames",
  "-show_entries",
  "frame=pts,pts_time",
  "-of",
  "json",
  source,
];
const frames = JSON.parse(
  run(frameCommand[0], frameCommand.slice(1)),
).frames.map((f) => ({ pts: f.pts, seconds: Number(f.pts_time) }));
const bareCommand = ["ffprobe", "bunny-short.mp4"];
const bareCwd = "public/media/notebook";
const bare = spawnSync(bareCommand[0], bareCommand.slice(1), {
  encoding: "utf8",
  cwd: bareCwd,
});
assert.equal(bare.status, 0);
const probeLines = bare.stderr
  .split("\n")
  .filter((line) => /^Input #0|^  Duration:|^  Stream #0:/.test(line));
const srtSeconds = (text) => {
  const [h, m, s, ms] = text.split(/[:,]/).map(Number);
  return h * 3600 + m * 60 + s + ms / 1000;
};
const cues = readFileSync(captions, "utf8")
  .trim()
  .split(/\r?\n\r?\n/)
  .map((block) => {
    const [index, timing, ...text] = block.split(/\r?\n/);
    const [start, end] = timing.split(" --> ");
    return {
      index: Number(index),
      start: srtSeconds(start),
      end: srtSeconds(end),
      text: text.join("\n"),
    };
  });
const work = mkdtempSync(join(tmpdir(), "video-lab-visuals-"));
try {
  const paths = {};
  const image = (name, input, filter) => {
    const file = `${output}/${name}.png`;
    const command = [
      "ffmpeg",
      "-v",
      "error",
      "-y",
      "-ss",
      "2",
      "-i",
      input,
      "-frames:v",
      "1",
      ...(filter ? ["-vf", filter] : []),
      "-c:v",
      "png",
      "-pred",
      "mixed",
      "-compression_level",
      "9",
      file,
    ];
    // Always regenerate into scratch for independent pixel verification.
    const actual = join(work, `${name}.png`);
    run(command[0], [...command.slice(1, -1), actual]);
    if (generate) writeFileSync(file, readFileSync(actual));
    paths[name] = actual;
    const s = probe(actual).streams[0];
    return {
      path: file.replace(/^public\//, ""),
      width: s.width,
      height: s.height,
      ...identity(file),
      command,
    };
  };
  if (generate) {
    mkdirSync(output, { recursive: true });
    mkdirSync("src/notebook/visuals", { recursive: true });
  }
  const images = {};
  for (const [id, filter] of Object.entries({
    source: "",
    scale: "scale=640:-2",
    crop: "crop=480:480",
    pad: "scale=480:-2,pad=480:480:(ow-iw)/2:(oh-ih)/2",
  }))
    images[id] = image(`framing-${id}`, source, filter);
  const crop = { width: 256, height: 192, x: 350, y: 96 };
  const encodes = [];
  for (const crf of [18, 35]) {
    const file = `${output}/quality-crf${crf}.mp4`;
    // One encoding thread makes native reference output reproducible across CPU counts.
    const command = [
      "ffmpeg",
      "-v",
      "error",
      "-y",
      "-i",
      source,
      "-threads",
      "1",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      String(crf),
      "-c:a",
      "aac",
      file,
    ];
    if (generate) run(command[0], command.slice(1));
    const measured = probe(file);
    assert.equal(Number(measured.format.duration), 8);
    assert.equal(measured.streams[0].nb_frames, "192");
    assert.deepEqual(
      [
        measured.streams[0].width,
        measured.streams[0].height,
        measured.streams[0].avg_frame_rate,
      ],
      [854, 480, "24/1"],
    );
    assert.deepEqual(
      measured.streams.map((s) => s.codec_name),
      ["h264", "aac"],
    );
    const still = image(
      `quality-crf${crf}`,
      file,
      `crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`,
    );
    encodes.push({
      path: file.replace(/^public\//, ""),
      crf,
      ...identity(file),
      duration: Number(measured.format.duration),
      frameCount: Number(measured.streams[0].nb_frames),
      command,
      image: still,
    });
  }
  const provenance = JSON.parse(
    readFileSync("docs/notes/notebook/media.json", "utf8"),
  );
  const sourceIdentity = identity(source);
  assert.deepEqual(
    sourceIdentity,
    (({ bytes, sha256 }) => ({ bytes, sha256 }))(
      provenance.assets.find((a) => a.name === "bunny-short.mp4"),
    ),
  );
  const sourceBytes = readFileSync(source);
  assert.equal(sourceBytes.toString("ascii", 4, 8), "ftyp");
  assert.equal(sourceProbe.format.tags.major_brand, "isom");
  assert.ok(sourceProbe.format.tags.compatible_brands.includes("mp41"));
  assert.equal(provenance.preparationArguments.short.at(-1), "bunny-short.mp4");
  const facts = {
    copyright: "Copyright © 2026 Christopher Snow",
    kind: "Provided native examples, not results from the current editable command",
    versions: { ffmpeg: version("ffmpeg"), ffprobe: version("ffprobe") },
    provenance: {
      title: provenance.title,
      attribution: provenance.attribution,
      licence: provenance.licence,
      licenceUrl: provenance.licenceUrl,
      sourceUrl: provenance.sourceUrl,
      record: "docs/notes/notebook/media.json",
      modification:
        "Extracted the same picture at 2 seconds; resized, cropped or padded for framing examples. Independently encoded all eight seconds at CRF 18 and 35, then extracted equal 256 × 192 details. PNG stills are lossless representations of each decoded result; source video was already lossy.",
    },
    source: {
      path: source.replace(/^public\//, ""),
      ...sourceIdentity,
      container: "mp4",
      containerEvidence: {
        box: "ftyp",
        majorBrand: sourceProbe.format.tags.major_brand,
        compatibleBrands: sourceProbe.format.tags.compatible_brands,
        preparationRecord:
          "docs/notes/notebook/media.json#preparationArguments.short",
      },
      duration: Number(sourceProbe.format.duration),
      streams: sourceStreams,
    },
    probe: { command: bareCommand, cwd: bareCwd, lines: probeLines },
    timeline: {
      command: frameCommand,
      timeBase: sourceStreams[0].timeBase,
      ticksPerFrame: frames[1].pts - frames[0].pts,
      totalFrames: frames.length,
      frames: frames.slice(0, 8),
    },
    captions: {
      path: captions.replace(/^public\//, ""),
      ...identity(captions),
      cues,
    },
    framing: { sourceTime: 2, sourceFrame: 48, images },
    quality: {
      sourceTime: 2,
      sourceFrame: 48,
      crop,
      encodes,
      sizeMeaning:
        "Whole eight-second MP4, including video, AAC audio and container; not the PNG or one frame. Native reference sizes depend on encoder build and settings.",
      limitation:
        "Both versions begin with the supplied, already compressed source. A larger re-encode cannot recover source detail. The PNG details use identical coordinates at 1:1 source pixel scale.",
    },
  };
  assert.equal(frames.length, 192);
  assert.ok(frames.every((f, index) => f.pts === index * 512));
  assert.equal(cues[0].start, 0);
  assert.equal(cues[1].end, 6);
  if (generate) writeFileSync(manifest, JSON.stringify(facts, null, 2) + "\n");
  const expected = JSON.parse(readFileSync(manifest, "utf8"));
  // PNG hashes pin the committed files; pixels independently verify their derivation.
  const pixels = (file) =>
    run("ffmpeg", [
      "-v",
      "error",
      "-i",
      file,
      "-pix_fmt",
      "rgb24",
      "-f",
      "rawvideo",
      "-",
    ]);
  for (const img of [
    ...Object.values(expected.framing.images),
    ...expected.quality.encodes.map((e) => e.image),
  ]) {
    assert.deepEqual(
      identity(`public/${img.path}`),
      { bytes: img.bytes, sha256: img.sha256 },
      img.path,
    );
    const name = img.path
      .split("/")
      .pop()
      .replace(/\.png$/, "");
    const actual = pixels(paths[name]);
    const committed = pixels(`public/${img.path}`);
    assert.equal(
      actual.length,
      committed.length,
      `${img.path}: pixel dimensions`,
    );
    let difference = 0;
    for (let i = 0; i < actual.length; i++)
      difference += Math.abs(actual[i] - committed[i]);
    // Committed asset identity is exact. Native decoding/scaling can round
    // differently; verify the regenerated picture with a sub-unit RGB MAE.
    assert.ok(
      difference / actual.length < 1,
      `${img.path}: decoded pixel MAE ${difference / actual.length}`,
    );
  }
  assert.deepEqual(facts.source, expected.source);
  assert.deepEqual(facts.timeline, expected.timeline);
  assert.deepEqual(facts.captions, expected.captions);
  // Preserve the recorded raw excerpt. Formatting changes between ffprobe builds
  // do not change the source stream facts independently checked above.
  if (facts.versions.ffprobe === expected.versions.ffprobe)
    assert.deepEqual(facts.probe.lines, expected.probe.lines);
  assert.equal(expected.probe.lines.length, 4);
  assert.ok(expected.probe.lines[0].includes("from 'bunny-short.mp4'"));
  const fileBitrate = Number(sourceProbe.format.bit_rate);
  assert.equal(
    fileBitrate,
    (identity(source).bytes * 8) / Number(sourceProbe.format.duration),
    "this source's whole-file average bitrate is file bits divided by duration",
  );
  assert.ok(
    expected.probe.lines[1].includes(
      `bitrate: ${Math.floor(fileBitrate / 1000)} kb/s`,
    ),
    "recorded bitrate uses decimal kilobits per second",
  );
  assert.ok(
    sourceProbe.streams.reduce(
      (sum, stream) => sum + Number(stream.bit_rate),
      0,
    ) < fileBitrate,
    "this source's whole-file rate also includes container data",
  );
  assert.ok(expected.probe.lines[2].includes("854x480"));
  assert.ok(expected.probe.lines[3].includes("48000 Hz"));
  assert.deepEqual(facts.framing, expected.framing);
  assert.deepEqual(facts.provenance, expected.provenance);
  // Whole MP4s are committed so their exact sizes/hashes and the PNG derivations
  // can be independently checked without rerunning a different encoder build.
  for (let i = 0; i < encodes.length; i++)
    for (const key of [
      "path",
      "crf",
      "bytes",
      "sha256",
      "duration",
      "frameCount",
      "command",
      "image",
    ])
      assert.deepEqual(
        encodes[i][key],
        expected.quality.encodes[i][key],
        `CRF encode ${key}`,
      );
  assert.deepEqual(facts.quality.crop, expected.quality.crop);
  assert.equal(facts.quality.sourceTime, expected.quality.sourceTime);
  assert.equal(facts.quality.sourceFrame, expected.quality.sourceFrame);
  for (const recorded of expected.quality.encodes) {
    assert.ok(Number.isSafeInteger(recorded.bytes) && recorded.bytes > 0);
    assert.match(recorded.sha256, /^[a-f0-9]{64}$/);
  }
  assert.deepEqual(
    Object.values(images).map((i) => [i.width, i.height]),
    [
      [854, 480],
      [640, 360],
      [480, 480],
      [480, 480],
    ],
  );
  const total = [
    ...Object.values(images),
    ...encodes.map((e) => e.image),
  ].reduce((n, img) => n + img.bytes, 0);
  console.log(
    `Verified source/provenance, raw probe excerpt, 192 video PTS, SRT cues, four framing PNGs and two real full-clip encodes (${total} image bytes).`,
  );
  console.log(
    `Recorded size build: ${expected.versions.ffmpeg}; verification build: ${facts.versions.ffmpeg}.`,
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}
