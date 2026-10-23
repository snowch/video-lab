// Copyright © 2026 Christopher Snow
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
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
export default defineConfig({
  base: "/video-lab/",
  plugins: [
    react(),
    {
      name: "published-release-metadata",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "release.json",
          source: JSON.stringify({ commit }),
        });
      },
    },
  ],
  define: { __BUILD_COMMIT__: JSON.stringify(commit) },
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
