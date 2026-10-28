// Copyright © 2026 Christopher Snow
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { build } from "esbuild";
await build({
  entryPoints: [
    "src/notebook/structure.ts",
    "src/notebook/copy.ts",
    "src/notebook/assets.ts",
  ],
  outdir: ".media-work/notebook-validation",
  bundle: true,
  format: "esm",
  platform: "node",
  outExtension: { ".js": ".mjs" },
});
const { pages, chapters } =
  await import("../.media-work/notebook-validation/structure.mjs");
const { courseCopy } =
  await import("../.media-work/notebook-validation/copy.mjs");
const { practiceAssets } =
  await import("../.media-work/notebook-validation/assets.mjs");
const media = JSON.parse(
  await readFile("docs/notes/notebook/media.json", "utf8"),
);
const evidence = JSON.parse(
  await readFile("docs/notes/notebook/commands.json", "utf8"),
);
const browserEvidence = JSON.parse(
  await readFile("docs/notes/notebook/commands-wasm.json", "utf8"),
);
const imageEvidence = JSON.parse(
  await readFile("docs/notes/formats-images/native-commands.json", "utf8"),
);
const imageBrowserEvidence = JSON.parse(
  await readFile("docs/notes/formats-images/commands-wasm.json", "utf8"),
);
const imagePages = {
  still: "image-video/hold",
  slides: "image-video/sequence",
  animation: "image-video/animation",
  overlay: "image-video/overlay",
};
for (const native of imageEvidence.records) {
  const kind = native.id.replace(/-practice$/, "");
  const page = imagePages[kind];
  if (!page) throw Error("Unknown image command evidence " + native.id);
  const command = native.command.join(" ");
  const id =
    page + (native.id.endsWith("-practice") ? ":practice" : ":worked:0");
  const browser = imageBrowserEvidence.records.find(
    (record) => record.id === id,
  );
  if (
    !browser ||
    browser.command !== command ||
    !browser.validation?.fullyDecoded
  )
    throw Error("Missing decoded WASM image evidence " + id);
  const video = browser.probe.streams.find(
    (stream) => stream.codec_type === "video",
  );
  const audio = browser.probe.streams.filter(
    (stream) => stream.codec_type === "audio",
  );
  for (const [field, measured] of Object.entries({
    width: video?.width,
    height: video?.height,
    codec: video?.codec_name,
    frameRate: video?.avg_frame_rate,
    decodedFrames: Number(video?.nb_read_frames),
    videoDuration: Number(video?.duration),
    containerDuration: Number(browser.probe.format.duration),
  })) {
    if (measured !== native.result[field])
      throw Error("Native/WASM image facts differ: " + id + " " + field);
  }
  if (audio.length !== native.result.audio.length)
    throw Error("Native/WASM image audio differs: " + id);
  for (const [index, stream] of audio.entries()) {
    const expected = native.result.audio[index];
    if (
      stream.codec_name !== expected.codec ||
      Number(stream.sample_rate) !== expected.sampleRate ||
      stream.channels !== expected.channels ||
      Number(stream.duration) !== expected.duration
    )
      throw Error("Native/WASM image audio properties differ: " + id);
  }
  // FFmpeg 7 retains the JPEG's full-range marker (yuvj420p); the pinned
  // FFmpeg 5 browser core reports yuv420p. These are recorded, not equated.
  const expectedPixelFormat =
    kind === "still" ? "yuv420p" : native.result.pixelFormat;
  if (video.pix_fmt !== expectedPixelFormat)
    throw Error("Recorded WASM image pixel format changed: " + id);
  if (
    browser.wasmProbe.report.error ||
    ![0, -1].includes(browser.wasmProbe.code) ||
    !browser.wasmProbe.report.streams?.length
  )
    throw Error("Invalid actual WASM probe evidence: " + id);
  for (const input of browser.record.last.inputs) {
    if (practiceAssets[input.name]?.sha256 !== input.sha256)
      throw Error("WASM image input provenance changed: " + input.name);
  }
  evidence.records.push({ page, command });
}
if (
  imageEvidence.records.length !== 8 ||
  imageBrowserEvidence.records.length !== 8
)
  throw Error("Expected all eight image worked/practice execution records");
browserEvidence.records.push(...imageBrowserEvidence.records);
const seen = new Set();
for (const p of pages) {
  if (seen.has(p.id)) throw Error("Duplicate notebook page");
  seen.add(p.id);
  const copy = courseCopy.pages[p.id];
  if (
    !copy ||
    copy.worked.length !== p.worked.length ||
    copy.hints.length !== 5 ||
    !copy.checkLimit ||
    !copy.practice ||
    !copy.practiceObserve ||
    copy.worked.some((step) => !step.title || !step.observe)
  )
    throw Error("Incomplete notebook page " + p.id);
  for (const id of copy.furtherReading?.pages ?? []) {
    if (id === p.id || !pages.some((target) => target.id === id))
      throw Error("Invalid further-reading destination " + id + " on " + p.id);
  }
  for (const [id, command] of [
    ...p.worked.map((c, i) => [p.id + ":worked:" + i, c]),
    [p.id + ":practice", p.solution],
  ]) {
    const r = browserEvidence.records.find(
      (r) => r.id === id && r.command === command,
    );
    if (
      !r ||
      r.record.last.error ||
      r.record.last.command !== command ||
      ![0, -1].includes(r.record.last.code)
    )
      throw Error("Missing accepted actual browser execution " + id);
  }
  for (const command of [...p.worked, p.solution])
    if (!evidence.records.some((r) => r.page === p.id && r.command === command))
      throw Error("Missing executed command evidence " + p.id);
}
if (
  chapters.length !== 11 ||
  pages.length !== Object.keys(courseCopy.pages).length
)
  throw Error("Course outline/copy mismatch");
for (const [name, a] of Object.entries(practiceAssets)) {
  if (
    a.duration !== undefined &&
    a.duration !==
      Number(media.assets.find((f) => f.name === name)?.probe?.format.duration)
  )
    throw Error("Diagram source duration differs from recorded media " + name);
  const bytes = await readFile("public/" + a.path);
  if (
    bytes.length !== a.bytes ||
    createHash("sha256").update(bytes).digest("hex") !== a.sha256
  )
    throw Error("Practice bytes changed " + name);
}
for (const f of media.assets) {
  const bytes = await readFile("public/media/notebook/" + f.name);
  if (
    bytes.length !== f.bytes ||
    createHash("sha256").update(bytes).digest("hex") !== f.sha256
  )
    throw Error("Fixture changed " + f.name);
  if (f.probe) {
    const probe = JSON.parse(
      execFileSync(
        "ffprobe",
        [
          "-v",
          "error",
          "-show_streams",
          "-show_format",
          "-of",
          "json",
          "public/media/notebook/" + f.name,
        ],
        { encoding: "utf8" },
      ),
    );
    if (
      probe.streams.length !== 2 ||
      probe.streams[0].width !== 854 ||
      probe.streams[0].height !== 480 ||
      probe.streams[1].channels !== 2 ||
      probe.format.duration !== f.probe.format.duration
    )
      throw Error("Recorded notebook media facts changed " + f.name);
  }
}
console.log(
  `${chapters.length} notebook chapters, ${pages.length} complete concept pages and ${evidence.records.length} executed native commands verified; all supplied bytes/media facts match.`,
);
