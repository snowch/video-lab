// Copyright © 2026 Christopher Snow
import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { build } from "vite";
const digest = (data) => createHash("sha256").update(data).digest("base64");
async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(`${path}/${e.name}`) : `${path}/${e.name}`,
      ),
    )
  ).flat();
}
const paths = (await walk("dist"))
  .filter((p) => !p.endsWith("/sw.js") && !p.endsWith("/offline-manifest.json"))
  .sort();
// The offline manifest is grouped: the baseline copy keeps reading and the
// existing lessons usable without expensive assets; the encoder core
// (ffmpeg.wasm, ~31 MB) and optional reference samples are explicit opt-ins.
const ENCODER_GROUP = "encoding";
const SAMPLES_GROUP = "samples";
function groupFor(path) {
  if (path.startsWith("vendor/ffmpeg/")) return ENCODER_GROUP;
  if (path.startsWith("media/samples/")) return SAMPLES_GROUP;
  return undefined;
}
const groups = {};
const files = await Promise.all(
  paths.map(async (path) => {
    const bytes = await readFile(path);
    const file = {
      path: path.slice(5),
      integrity: `sha256-${digest(bytes)}`,
      bytes: bytes.length,
    };
    const group = groupFor(file.path);
    if (group) (groups[group] ??= []).push(file);
    return file;
  }),
);
const baseline = files.filter((f) => !groupFor(f.path));
const sources = await Promise.all(
  ["src/offline/worker.ts", "src/offline/range.ts"].map((p) =>
    readFile(p, "utf8"),
  ),
);
const version = digest(JSON.stringify(files) + sources.join("")).replaceAll(
  "/",
  "_",
);
const groupBytes = (list) => list.reduce((n, f) => n + f.bytes, 0);
const manifest = {
  version,
  bytes: groupBytes(baseline),
  files: baseline,
  groups: Object.fromEntries(
    Object.entries(groups).map(([name, list]) => [
      name,
      { bytes: groupBytes(list), files: list },
    ]),
  ),
};
await writeFile("dist/offline-manifest.json", JSON.stringify(manifest));
await build({
  configFile: false,
  publicDir: false,
  define: { __OFFLINE_MANIFEST__: JSON.stringify(manifest) },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    minify: false,
    target: "es2022",
    lib: {
      entry: "src/offline/worker.ts",
      formats: ["es"],
      fileName: () => "sw.js",
    },
  },
});
const summary = Object.entries(manifest.groups)
  .map(([name, g]) => `${name}: ${g.files.length} files, ${g.bytes} bytes`)
  .join("; ");
console.log(
  `Offline bundle: ${baseline.length} baseline files, ${manifest.bytes} bytes` +
    (summary ? `; opt-in groups: ${summary}` : ""),
);
