// Copyright © 2026 Christopher Snow
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig({
  base: "/video-lab/",
  plugins: [react()],
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
