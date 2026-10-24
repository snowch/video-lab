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
  .filter(
    (p) =>
      !p.endsWith("/sw.js") &&
      !p.endsWith("/offline-manifest.json") &&
      !p.endsWith("/release.json") &&
      !p.startsWith("dist/encoder/") &&
      (!p.startsWith("dist/optional/") ||
        p === "dist/optional/command-workbench.html" ||
        p === "dist/optional/big-buck-bunny-5s.mp4"),
  )
  .sort();
const files = await Promise.all(
  paths.map(async (path) => {
    const bytes = await readFile(path);
    return {
      path: path.slice(5),
      integrity: `sha256-${digest(bytes)}`,
      bytes: bytes.length,
    };
  }),
);
const encoderManifest = JSON.parse(
  await readFile("dist/encoder-manifest.json", "utf8"),
);
const sources = await Promise.all(
  ["src/offline/worker.ts", "src/offline/range.ts"].map((p) =>
    readFile(p, "utf8"),
  ),
);
const version = digest(
  JSON.stringify(files) + JSON.stringify(encoderManifest) + sources.join(""),
).replaceAll("/", "_");
const manifest = {
  version,
  bytes: files.reduce((n, f) => n + f.bytes, 0),
  files,
};
await writeFile("dist/offline-manifest.json", JSON.stringify(manifest));
const release = JSON.parse(await readFile("dist/release.json", "utf8"));
await writeFile(
  "dist/release.json",
  JSON.stringify({
    ...release,
    version,
    bytes: manifest.bytes + encoderManifest.bytes,
  }),
);
await build({
  configFile: false,
  publicDir: false,
  define: {
    __OFFLINE_MANIFEST__: JSON.stringify(manifest),
    __ENCODER_MANIFEST__: JSON.stringify(encoderManifest),
    __APP_BUILD__: JSON.stringify(release.build),
  },
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
console.log(`Offline bundle: ${files.length} files, ${manifest.bytes} bytes.`);
