// Copyright © 2026 Christopher Snow
import { expect, it } from "vitest";
import {
  gridBytes,
  inspectChecks,
  pictureChecks,
  referenceSources,
} from "./reference-model";
it("requires measured stream and full picture timestamp evidence, not answer strings", () => {
  const report = {
    format: {
      filename: referenceSources.inspect.name,
      format_name: "mov,mp4",
      duration: "10",
    },
    streams: [
      {
        index: 0,
        codec_type: "video",
        codec_name: "h264",
        time_base: "1/12288",
      },
      { index: 1, codec_type: "audio", codec_name: "aac" },
    ],
    frames: Array.from({ length: 120 }, (_, i) => ({
      media_type: "video",
      pts: i * 1024,
      pts_time: String(i / 12),
    })),
  };
  expect(inspectChecks(report).every((c) => c.pass)).toBe(true);
  expect(
    inspectChecks({ ...report, frames: [] })
      .filter((c) => !c.pass)
      .map((c) => c.id),
  ).toEqual(["frames", "timestamp"]);
  expect(inspectChecks({}).some((c) => !c.pass)).toBe(true);
});
it("checks the decoded picture sequence, rejects a reversed or missing segment", () => {
  const source = new Uint8Array(120 * gridBytes);
  for (let i = 48; i < 120; i++)
    source.fill(120, i * gridBytes, (i + 1) * gridBytes);
  const good = new Uint8Array(48 * gridBytes);
  good.fill(120, 24 * gridBytes);
  expect(pictureChecks(good, source).pass).toBe(true);
  const reversed = new Uint8Array(48 * gridBytes);
  reversed.fill(120, 0, 24 * gridBytes);
  expect(pictureChecks(reversed, source).pass).toBe(false);
  expect(pictureChecks(good.slice(gridBytes), source).pass).toBe(false);
});
