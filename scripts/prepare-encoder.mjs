// Copyright © 2026 Christopher Snow
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const outDir = resolve(process.argv[2] ?? "dist");
const coreJs = fileURLToPath(import.meta.resolve("@ffmpeg/core"));
const packageRoot = resolve(dirname(coreJs), "../..");
const packageInfo = JSON.parse(
  await readFile(`${packageRoot}/package.json`, "utf8"),
);
if (packageInfo.version !== "0.12.10")
  throw new Error("Unexpected FFmpeg core version.");
const path = `encoder/${packageInfo.version}`;
await mkdir(`${outDir}/${path}`, { recursive: true });
const files = [];
for (const name of ["ffmpeg-core.js", "ffmpeg-core.wasm"]) {
  const source = resolve(dirname(coreJs), name);
  const data = await readFile(source);
  await copyFile(source, `${outDir}/${path}/${name}`);
  files.push({
    path: `${path}/${name}`,
    bytes: data.length,
    integrity: `sha256-${createHash("sha256").update(data).digest("base64")}`,
  });
}
for (const name of [
  "COPYING.GPLv2.txt",
  "FFMPEG-WASM-LICENSE.txt",
  "SOURCE.md",
]) {
  const data = await readFile(`src/processing/licences/${name}`);
  await copyFile(
    `src/processing/licences/${name}`,
    `${outDir}/${path}/${name}`,
  );
  files.push({
    path: `${path}/${name}`,
    bytes: data.length,
    integrity: `sha256-${createHash("sha256").update(data).digest("base64")}`,
  });
}
await writeFile(
  `${outDir}/encoder-manifest.json`,
  JSON.stringify({
    version: packageInfo.version,
    bytes: files.reduce((sum, file) => sum + file.bytes, 0),
    files,
  }),
);
console.log(
  `Optional encoder: ${files.reduce((sum, file) => sum + file.bytes, 0)} bytes; excluded from baseline lessons.`,
);
