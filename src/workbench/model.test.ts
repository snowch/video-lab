// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import { availableName, buildCommand, defaults, planRun } from "./model";
import type { Files } from "../cli/files";
const files: Files = Object.fromEntries(
  ["source.mp4", "demo.mp4"].map((name) => [
    name,
    { name, blob: new Blob(["test"]), origin: "imported" },
  ]),
);
describe("native workbench boundary", () => {
  it("starts with readable ffprobe output and composes native optional-audio edits", () => {
    expect(buildCommand(1, "source.mp4", defaults())).toBe(
      "ffprobe source.mp4",
    );
    expect(
      planRun(
        buildCommand(2, "source.mp4", { ...defaults(), output: "new.mp4" }),
        files,
        "source.mp4",
      ).args,
    ).toContain("0:a?");
    expect(
      planRun(buildCommand(1, "source.mp4", defaults()), files, "source.mp4")
        .tool,
    ).toBe("ffprobe");
  });
  it("protects the selected source and every input even with explicit overwrite", () => {
    expect(() =>
      planRun("ffmpeg -y -i demo.mp4 source.mp4", files, "source.mp4"),
    ).toThrow("source");
    expect(() =>
      planRun("ffmpeg -y -i demo.mp4 demo.mp4", files, "source.mp4"),
    ).toThrow("source");
    expect(() =>
      planRun("ffmpeg -i source.mp4 demo.mp4", files, "source.mp4"),
    ).toThrow("already exists");
    expect(
      planRun("ffmpeg -y -i source.mp4 demo.mp4", files, "source.mp4").output,
    ).toBe("demo.mp4");
  });
  it("rejects invented commands and shell syntax", () => {
    expect(() => planRun("sample", files, "source.mp4")).toThrow("ffmpeg");
    expect(() =>
      planRun(
        "ffmpeg -i source.mp4 demo.mp4; rm source.mp4",
        files,
        "source.mp4",
      ),
    ).toThrow("Shell");
  });
  it("makes unsafe imported names explicit and avoids collisions", () => {
    expect(availableName("- my demo's.mp4", files)).toBe("my-demo-s.mp4");
    expect(availableName("demo.mp4", files)).toBe("demo-2.mp4");
    expect(availableName("inspection.json", files)).toBe("imported-video.mp4");
  });
});
