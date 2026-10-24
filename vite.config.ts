// Copyright © 2026 Christopher Snow
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
function inputFiles(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? inputFiles(`${path}/${e.name}`) : [`${path}/${e.name}`],
  );
}
const identityInputs = [
  ...inputFiles("src"),
  ...inputFiles("public"),
  ...inputFiles("platform"),
  ...inputFiles("scripts"),
  "index.html",
  "optional/command-workbench.html",
  "package-lock.json",
  "package.json",
  "vite.config.ts",
].sort();
const identityHash = createHash("sha256");
for (const path of identityInputs)
  identityHash
    .update(path)
    .update("\0")
    .update(readFileSync(path))
    .update("\0");
let candidate = process.env.GITHUB_SHA;
if (!candidate) {
  try {
    candidate = execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim();
  } catch {
    /* Source archives may have no Git metadata. */
  }
}
const commit =
  candidate && /^[a-f0-9]{40}$/i.test(candidate)
    ? candidate.toLowerCase()
    : null;
const buildId = identityHash.update(commit ?? "source-archive").digest("hex");
export default defineConfig({
  base: "/video-lab/",
  build: {
    rollupOptions: {
      input: {
        course: resolve("index.html"),
        workbench: resolve("optional/command-workbench.html"),
      },
    },
  },
  plugins: [
    react(),
    {
      name: "published-release-metadata",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "release.json",
          source: JSON.stringify({ commit, build: buildId }),
        });
      },
    },
  ],
  define: {
    __BUILD_COMMIT__: JSON.stringify(commit),
    __BUILD_ID__: JSON.stringify(buildId),
  },
  resolve: {
    alias: {
      "@platform/lesson-schema": resolve("platform/lesson-schema/src/index.ts"),
      "@platform/lesson-runtime": resolve(
        "platform/lesson-runtime/src/index.ts",
      ),
      "@platform/primitives": resolve("platform/primitives/src/index.ts"),
    },
  },
  test: { include: ["src/**/*.test.ts"] },
});
