// Copyright © 2026 Christopher Snow
// Vendor the pinned @ffmpeg/core single-thread build into public/vendor/ffmpeg/
// so the production site loads a same-origin, version-pinned core on GitHub
// Pages under /video-lab/ with no CDN and no cross-origin isolation. Vite copies
// public/ into dist/ unchanged; the offline manifest groups these files into a
// separate opt-in "encoding" download, never the baseline.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const pkg = JSON.parse(
  readFileSync("node_modules/@ffmpeg/core/package.json", "utf8"),
);
const version = pkg.version;
const src = "node_modules/@ffmpeg/core/dist/esm";
const out = "public/vendor/ffmpeg";
mkdirSync(out, { recursive: true });
const files = ["ffmpeg-core.js", "ffmpeg-core.wasm"];
const entries = [];
for (const name of files) {
  copyFileSync(`${src}/${name}`, `${out}/${name}`);
  const bytes = readFileSync(`${out}/${name}`);
  entries.push({
    file: name,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  });
}
const record = {
  package: "@ffmpeg/core",
  version,
  threaded: false,
  files: entries,
  vendoredAt: new Date().toISOString(),
};
writeFileSync(`${out}/provenance.json`, JSON.stringify(record, null, 2) + "\n");
console.log(`Vendored @ffmpeg/core@${version}:`);
for (const e of entries)
  console.log(
    `  ${e.file}  ${e.bytes} bytes  sha256:${e.sha256.slice(0, 16)}…`,
  );
