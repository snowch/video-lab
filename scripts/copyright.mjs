// Copyright © 2026 Christopher Snow
import { readdirSync, readFileSync } from "node:fs";
const roots = ["src", "scripts", "tests", "media-source"];
function walk(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${root}/${e.name}`) : [`${root}/${e.name}`],
  );
}
const files = [
  ...roots.flatMap(walk),
  "vite.config.ts",
  "playwright.config.ts",
  "index.html",
];
const missing = files.filter(
  (f) =>
    /\.(ts|tsx|mjs|css|html|sh)$/.test(f) &&
    !readFileSync(f, "utf8")
      .slice(0, 500)
      .includes("Copyright © 2026 Christopher Snow"),
);
if (missing.length) throw new Error(`Missing copyright: ${missing.join(", ")}`);
console.log("Source copyright headers checked.");
