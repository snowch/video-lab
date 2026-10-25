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
  chapters.length !== 10 ||
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
