// Copyright © 2026 Christopher Snow
// Generate a standalone, offline-capable HTML prototype with the original media.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { format } from "prettier";
const root = new URL("../../../", import.meta.url);
const read = (name) => readFile(new URL(name, root));
const copy = JSON.parse(await read("docs/notes/command-ux/copy.json"));
const report = JSON.parse(
  execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-of",
      "json",
      new URL("public/media/build-queue.mp4", root).pathname,
    ],
    { encoding: "utf8" },
  ),
);
report.format.filename = "capture.mp4";
const source = `data:video/mp4;base64,${(await read("public/media/build-queue.mp4")).toString("base64")}`;
let html = (await read("docs/notes/command-ux/prototype.html")).toString();
for (const [name, value] of Object.entries({
  COPY: copy,
  SOURCE: source,
  REPORT: report,
}))
  html = html.replace(`"__${name}__"`, () =>
    JSON.stringify(value).replaceAll("<", "\\u003c"),
  );
html = await format(html, { parser: "html" });
await mkdir(new URL("public/optional/", root), { recursive: true });
await writeFile(new URL("public/optional/command-workbench.html", root), html);
console.log(`Standalone prototype: ${Buffer.byteLength(html)} bytes`);
