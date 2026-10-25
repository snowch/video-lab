// Copyright © 2026 Christopher Snow
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
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
const originalHashes = {
  "ffmpeg-core.js":
    "67a48f11645f85439f3fde4f2119042c16b374b910206b7a7a24f342e28dcae3",
  "ffmpeg-core.wasm":
    "9f57947a5bd530d8f00c5b3f2cb2a3492faa7e5d823315342d6a8656d0a6b7b7",
};
for (const name of ["ffmpeg-core.js", "ffmpeg-core.wasm"]) {
  const source = resolve(dirname(coreJs), name);
  const data = await readFile(source);
  if (createHash("sha256").update(data).digest("hex") !== originalHashes[name])
    throw new Error(
      "FFmpeg bytes changed: reverify the exit adapter before upgrading.",
    );
  await copyFile(source, `${outDir}/${path}/${name}`);
  files.push({
    path: `${path}/${name}`,
    bytes: data.length,
    integrity: `sha256-${createHash("sha256").update(data).digest("base64")}`,
  });
}
// Keep the vendor files byte-for-byte intact. The small factory adapter fixes
// the pinned core's normal-exit hook without filtering any tool log messages.
const exitHandler = ts.transpileModule(
  await readFile("src/processing/core-exit.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2023,
    },
  },
).outputText;
const adapter = Buffer.from(`${exitHandler}
import createFFmpegCore from "./ffmpeg-core.js";
export default async function createVideoLabCore(options) {
  const core = await createFFmpegCore(options);
  installExitHandler(core);
  return core;
}
`);
await writeFile(`${outDir}/${path}/ffmpeg-adapter.js`, adapter);
files.push({
  path: `${path}/ffmpeg-adapter.js`,
  bytes: adapter.length,
  integrity: `sha256-${createHash("sha256").update(adapter).digest("base64")}`,
});
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
