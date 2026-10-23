// Copyright © 2026 Christopher Snow
import { afterEach, expect, it, vi } from "vitest";
import { legacyProgress, loadChecks, progressKey } from "./progress";
afterEach(() => vi.unstubAllGlobals());
it("preserves archived completion and notes without declaring partial answers complete", () => {
  const value = {
    challenges: {
      inspection: {
        artifact: {
          answers: {
            video: "0",
            audio: "1",
            container: "mp4",
            codec: "h264",
            frame: "75",
            timestamp: "6.25",
          },
        },
      },
    },
    slots: { reflection: "Keep this original note" },
  };
  const write = vi.fn();
  vi.stubGlobal("localStorage", {
    getItem: () => JSON.stringify(value),
    setItem: write,
  });
  expect(legacyProgress("inspect")).toEqual({
    complete: true,
    note: "Keep this original note",
  });
  value.challenges.inspection.artifact.answers.frame = "";
  expect(legacyProgress("inspect").complete).toBe(false);
  expect(write).not.toHaveBeenCalled();
});
it("restores only well formed checked-artifact records", () => {
  vi.stubGlobal("localStorage", {
    getItem: (key: string) =>
      key === progressKey
        ? JSON.stringify({
            inspect: {
              name: "report.json",
              sha256: "a".repeat(64),
              checked: "today",
            },
            edit: { name: "bad", sha256: "broken", checked: "today" },
          })
        : null,
  });
  expect(loadChecks()).toEqual({
    inspect: { name: "report.json", sha256: "a".repeat(64), checked: "today" },
  });
});
