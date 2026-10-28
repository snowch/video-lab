// Copyright © 2026 Christopher Snow
// Generate: node scripts/image-media.mjs --generate /path/to/Fronalpstock_big.jpg
// Verify committed sources and run all examples: node scripts/image-media.mjs
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const root = "public/media/images";
const manifestPath = "src/notebook/images-media.json";
const evidencePath = "docs/notes/formats-images/native-commands.json";
const bunny = "public/media/notebook/bunny-short.mp4";
const photograph = {
  title: "Fronalpstock, Switzerland",
  author: "Hannes Röst",
  source: "https://commons.wikimedia.org/wiki/File:Fronalpstock_big.jpg",
  sourceRevision:
    "https://commons.wikimedia.org/w/index.php?title=File:Fronalpstock_big.jpg&oldid=1252720846",
  download:
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg",
  licence: "CC BY-SA 3.0",
  licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  originalBytes: 14679474,
  originalSha256:
    "24eb29eccdf0af691b406d1a3d22c0ef5d761cc454d8a917848c33958f6fc857",
  changes:
    "Centre-cropped and resized to 640×360; re-encoded as JPEG. The adapted photograph remains CC BY-SA 3.0.",
};
const run = (bin, args, options = {}) =>
  execFileSync(bin, args, {
    maxBuffer: 300 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
const identity = (path) => {
  const b = readFileSync(path);
  return {
    bytes: b.length,
    sha256: createHash("sha256").update(b).digest("hex"),
  };
};
const probeArgs = [
  "-v",
  "error",
  "-count_frames",
  "-show_streams",
  "-show_format",
  "-of",
  "json",
];
const probe = (path) => JSON.parse(run("ffprobe", [...probeArgs, path]));
const rgba = (path, filter) =>
  run("ffmpeg", [
    "-v",
    "error",
    "-xerror",
    "-i",
    path,
    "-an",
    ...(filter ? ["-vf", filter] : []),
    "-pix_fmt",
    "rgba",
    "-f",
    "rawvideo",
    "-",
  ]);

// Original raster drawings: integer geometry and Node's built-in PNG/zlib encoder.
// No fonts, remote assets, image libraries or SVG decoder are required.
function crc32(bytes) {
  let c = 0xffffffff;
  for (const byte of bytes) {
    c ^= byte;
    for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type),
    n = Buffer.alloc(4),
    c = Buffer.alloc(4);
  n.writeUInt32BE(data.length);
  c.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([n, t, data, c]);
}
function png(width, height, pixel) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++)
      raw.set(pixel(x, y), y * (width * 4 + 1) + 1 + x * 4);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}
const positions = [
  [80, 260],
  [176, 160],
  [272, 90],
  [368, 90],
  [464, 160],
  [560, 260],
];
const orange = [240, 100, 40, 255];
function drawing(index) {
  const [cx, cy] = positions[index];
  return png(640, 360, (x, y) => {
    if ((x - cx) ** 2 + (y - cy) ** 2 <= 30 ** 2) return orange;
    if (y >= 300 && y < 304) return [39, 57, 79, 255];
    if (y >= 304) return [219, 229, 237, 255];
    return [246, 249, 252, 255];
  });
}
function annotation() {
  return png(854, 480, (x, y) => {
    const ring = (x - 275) ** 2 + (y - 235) ** 2;
    const shaft = x >= 110 && x <= 213 && Math.abs(y - (x - 5)) <= 5;
    const head =
      x >= 182 && x <= 220 && y >= 172 && y <= 215 && (x >= 210 || y >= 205);
    return (ring >= 48 ** 2 && ring <= 54 ** 2) || shaft || head
      ? orange
      : [0, 0, 0, 0];
  });
}
const sourceNames = [
  "landscape.jpg",
  ...positions.map((_, i) => `frame-${String(i + 1).padStart(2, "0")}.png`),
  "drawing-01.png",
  "drawing-02.png",
  "drawing-03.png",
  "annotation.png",
];
const commands = [
  [
    "still",
    [
      "-loop",
      "1",
      "-i",
      "landscape.jpg",
      "-t",
      "5",
      "-pix_fmt",
      "yuv420p",
      "still.mp4",
    ],
  ],
  [
    "still-practice",
    [
      "-loop",
      "1",
      "-i",
      "landscape.jpg",
      "-t",
      "3",
      "-pix_fmt",
      "yuv420p",
      "still-practice.mp4",
    ],
  ],
  [
    "slides",
    [
      "-framerate",
      "1/2",
      "-i",
      "drawing-%02d.png",
      "-vf",
      "fps=24",
      "-pix_fmt",
      "yuv420p",
      "slides.mp4",
    ],
  ],
  [
    "slides-practice",
    [
      "-framerate",
      "1",
      "-i",
      "drawing-%02d.png",
      "-vf",
      "fps=24",
      "-pix_fmt",
      "yuv420p",
      "slides-practice.mp4",
    ],
  ],
  [
    "animation",
    [
      "-framerate",
      "3",
      "-i",
      "frame-%02d.png",
      "-vf",
      "fps=24",
      "-pix_fmt",
      "yuv420p",
      "animation.mp4",
    ],
  ],
  [
    "animation-practice",
    [
      "-framerate",
      "6",
      "-i",
      "frame-%02d.png",
      "-vf",
      "fps=24",
      "-pix_fmt",
      "yuv420p",
      "animation-practice.mp4",
    ],
  ],
  [
    "overlay",
    [
      "-i",
      "bunny-short.mp4",
      "-i",
      "annotation.png",
      "-filter_complex",
      "overlay",
      "annotated.mp4",
    ],
  ],
  [
    "overlay-practice",
    [
      "-i",
      "bunny-short.mp4",
      "-i",
      "annotation.png",
      "-filter_complex",
      "overlay=40:0",
      "annotated-practice.mp4",
    ],
  ],
];
function sourceFacts(name) {
  const path = `${root}/${name}`,
    stream = probe(path).streams[0],
    decoded = rgba(path);
  assert.equal(decoded.length, stream.width * stream.height * 4);
  let transparent = 0,
    opaque = 0;
  for (let i = 3; i < decoded.length; i += 4) {
    if (decoded[i] === 0) transparent++;
    if (decoded[i] === 255) opaque++;
  }
  return {
    name,
    ...identity(path),
    width: stream.width,
    height: stream.height,
    codec: stream.codec_name,
    decodedFrames: Number(stream.nb_read_frames),
    alpha: { transparent, opaque },
  };
}
function videoFacts(path) {
  const p = probe(path),
    v = p.streams.find((s) => s.codec_type === "video");
  run("ffmpeg", ["-v", "error", "-xerror", "-i", path, "-f", "null", "-"]);
  return {
    width: v.width,
    height: v.height,
    codec: v.codec_name,
    pixelFormat: v.pix_fmt,
    frameRate: v.avg_frame_rate,
    decodedFrames: Number(v.nb_read_frames),
    videoDuration: Number(v.duration),
    containerDuration: Number(p.format.duration),
    audio: p.streams
      .filter((s) => s.codec_type === "audio")
      .map((s) => ({
        codec: s.codec_name,
        sampleRate: Number(s.sample_rate),
        channels: s.channels,
        duration: Number(s.duration),
      })),
  };
}
function centroid(frame, width, height) {
  let xSum = 0,
    ySum = 0,
    n = 0;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const at = (y * width + x) * 4,
        r = frame[at],
        g = frame[at + 1],
        b = frame[at + 2];
      if (r > 180 && g > 50 && g < 160 && b < 100) {
        xSum += x;
        ySum += y;
        n++;
      }
    }
  assert.ok(n > 1500, "Visible orange drawing remains present");
  return [xSum / n, ySum / n];
}
function verifyOrder(path, indices, repeats) {
  const decoded = rgba(path),
    size = 640 * 360 * 4;
  assert.equal(decoded.length, size * indices.length * repeats);
  for (let i = 0; i < indices.length * repeats; i++) {
    const measured = centroid(
      decoded.subarray(i * size, (i + 1) * size),
      640,
      360,
    );
    const expected = positions[indices[Math.floor(i / repeats)]];
    assert.ok(
      Math.abs(measured[0] - expected[0]) < 1 &&
        Math.abs(measured[1] - expected[1]) < 1,
      `Decoded picture ${i} has the correct position`,
    );
  }
  return {
    sourceIndices: indices.map((i) => i + 1),
    decodedFramesPerPicture: repeats,
    everyDecodedFrameChecked: true,
  };
}
const generating = process.argv.includes("--generate");
if (generating) {
  const original = process.argv[process.argv.indexOf("--generate") + 1];
  assert.ok(
    original,
    "Pass the downloaded original photograph after --generate",
  );
  assert.deepEqual(identity(original), {
    bytes: photograph.originalBytes,
    sha256: photograph.originalSha256,
  });
  mkdirSync(root, { recursive: true });
  run("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-i",
    original,
    "-vf",
    "scale=640:360:force_original_aspect_ratio=increase,crop=640:360,setsar=1",
    "-frames:v",
    "1",
    "-q:v",
    "2",
    `${root}/landscape.jpg`,
  ]);
  positions.forEach((_, i) =>
    writeFileSync(
      `${root}/frame-${String(i + 1).padStart(2, "0")}.png`,
      drawing(i),
    ),
  );
  [0, 2, 5].forEach((index, i) =>
    writeFileSync(`${root}/drawing-0${i + 1}.png`, drawing(index)),
  );
  writeFileSync(`${root}/annotation.png`, annotation());
  writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        photograph,
        originalDrawingLicence:
          "Copyright © 2026 Christopher Snow. Original course drawings.",
        positions,
        files: sourceNames.map(sourceFacts),
      },
      null,
      2,
    ) + "\n",
  );
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
assert.deepEqual(manifest.photograph, photograph);
assert.deepEqual(manifest.files, sourceNames.map(sourceFacts));
assert.deepEqual(manifest.positions, positions);
for (let i = 0; i < 6; i++)
  assert.deepEqual(readFileSync(`${root}/frame-0${i + 1}.png`), drawing(i));
for (let i = 0; i < 3; i++)
  assert.deepEqual(
    readFileSync(`${root}/drawing-0${i + 1}.png`),
    drawing([0, 2, 5][i]),
  );
assert.deepEqual(readFileSync(`${root}/annotation.png`), annotation());
const annotationFile = manifest.files.at(-1);
assert.ok(
  annotationFile.alpha.transparent > 400000 &&
    annotationFile.alpha.opaque > 1500,
);
const dir = mkdtempSync(join(tmpdir(), "video-lab-images-"));
try {
  sourceNames.forEach((name) =>
    copyFileSync(`${root}/${name}`, join(dir, name)),
  );
  copyFileSync(bunny, join(dir, "bunny-short.mp4"));
  const records = [];
  for (const [id, args] of commands) {
    run("ffmpeg", args, { cwd: dir });
    const path = join(dir, args.at(-1)),
      result = videoFacts(path);
    const evidence = { id, command: ["ffmpeg", ...args], result };
    if (id.startsWith("slides"))
      evidence.pictureOrder = verifyOrder(
        path,
        [0, 2, 5],
        id === "slides" ? 48 : 24,
      );
    if (id.startsWith("animation"))
      evidence.pictureOrder = verifyOrder(
        path,
        [0, 1, 2, 3, 4, 5],
        id === "animation" ? 8 : 4,
      );
    if (id.startsWith("still")) {
      const frames = rgba(path),
        size = 640 * 360 * 4;
      assert.equal(frames.length, size * (id === "still" ? 125 : 75));
      // Every frame is a held still; lossy prediction may cause tiny pixel changes.
      const reference = frames.subarray(0, size);
      let maximumMeanAbsoluteDifference = 0;
      for (let offset = 0; offset < frames.length; offset += size) {
        let difference = 0;
        for (let p = 0; p < size; p += 4)
          for (let c = 0; c < 3; c++)
            difference += Math.abs(frames[offset + p + c] - reference[p + c]);
        maximumMeanAbsoluteDifference = Math.max(
          maximumMeanAbsoluteDifference,
          difference / (640 * 360 * 3),
        );
      }
      assert.ok(maximumMeanAbsoluteDifference < 2);
      evidence.heldPicture = {
        everyDecodedFrameChecked: true,
        maximumAllowedMeanAbsoluteRgbDifference: 2,
      };
    }
    if (id.startsWith("overlay")) {
      const dx = id === "overlay" ? 0 : 40;
      const ring = rgba(path, `crop=2:2:${326 + dx}:234`);
      assert.equal(ring.length, 2 * 2 * 4 * 192);
      for (let at = 0; at < ring.length; at += 4) {
        assert.ok(
          ring[at] > 180 &&
            ring[at + 1] > 50 &&
            ring[at + 1] < 160 &&
            ring[at + 2] < 100,
        );
      }
      const clear = rgba(path, "crop=16:16:32:32");
      const background = rgba(join(dir, "bunny-short.mp4"), "crop=16:16:32:32");
      assert.equal(clear.length, background.length);
      for (let f = 0; f < 192; f++) {
        let difference = 0;
        for (let p = f * 1024; p < (f + 1) * 1024; p++)
          difference += Math.abs(clear[p] - background[p]);
        assert.ok(
          difference / 1024 < 8,
          "Transparent area retains the underlying footage",
        );
      }
      assert.equal(result.audio.length, 1);
      evidence.overlay = {
        offsetX: dx,
        offsetY: 0,
        everyDecodedFrameChecked: true,
        opaqueRingRegion: [326 + dx, 234, 2, 2],
        transparentBackgroundRegion: [32, 32, 16, 16],
        transparentSourcePixels: annotationFile.alpha.transparent,
      };
    }
    records.push(evidence);
  }
  const evidence = {
    ffmpeg: run("ffmpeg", ["-version"]).toString().split("\n")[0],
    ffprobe: run("ffprobe", ["-version"]).toString().split("\n")[0],
    inputVideo: { path: bunny, ...identity(bunny) },
    verification: {
      probe: ["ffprobe", ...probeArgs, "OUTPUT"],
      fullDecode: [
        "ffmpeg",
        "-v",
        "error",
        "-xerror",
        "-i",
        "OUTPUT",
        "-f",
        "null",
        "-",
      ],
      pixelDecode: [
        "ffmpeg",
        "-v",
        "error",
        "-xerror",
        "-i",
        "OUTPUT",
        "-an",
        "-pix_fmt",
        "rgba",
        "-f",
        "rawvideo",
        "-",
      ],
    },
    records,
  };
  if (generating)
    writeFileSync(evidencePath, JSON.stringify(evidence, null, 2) + "\n");
  const recorded = JSON.parse(readFileSync(evidencePath, "utf8"));
  assert.deepEqual(evidence.inputVideo, recorded.inputVideo);
  // FFmpeg 6.1.1 and the pinned 5.1.4 core report yuv420p for these JPEG
  // outputs; FFmpeg 7.1.5 retains the full-range yuvj420p marker. Preserve
  // the actual recorded values and allow this pair only for the two stills.
  // This does not equate their colour-range signalling or relax other facts.
  const comparableRecords = structuredClone(evidence.records);
  const stillFormats = new Set(["yuv420p", "yuvj420p"]);
  for (const id of ["still", "still-practice"]) {
    const actual = comparableRecords.find((record) => record.id === id);
    const expected = recorded.records.find((record) => record.id === id);
    assert.ok(actual && expected, "Both still command records are present");
    assert.ok(
      stillFormats.has(actual.result.pixelFormat),
      id + " pixel format",
    );
    assert.ok(
      stillFormats.has(expected.result.pixelFormat),
      id + " recorded pixel format",
    );
    actual.result.pixelFormat = expected.result.pixelFormat;
  }
  assert.deepEqual(comparableRecords, recorded.records);
  console.log(
    "Observed still-photo pixel formats: " +
      evidence.records
        .filter(
          (record) => record.id === "still" || record.id === "still-practice",
        )
        .map((record) => record.id + "=" + record.result.pixelFormat)
        .join(", "),
  );
  console.log(
    "Images: source hashes/dimensions/alpha, eight native commands, full decoding, every still/sequence/animation frame and persistent overlay verified.",
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}
