// Copyright © 2026 Christopher Snow
import { expect, it } from "vitest";
import { validPath, movedFiles, audioSampleRateMatches } from "./model";
it("checks actual audio sample_rate per channel independently of video frame rate", () => {
  const stereo = { codec_type: "audio", sample_rate: "16000", channels: 2 };
  expect(audioSampleRateMatches([stereo], 16000)).toBe(true);
  expect(audioSampleRateMatches([stereo], 32000)).toBe(false);
  expect(
    audioSampleRateMatches(
      [{ codec_type: "video", sample_rate: "16000" }],
      16000,
    ),
  ).toBe(false);
  expect(audioSampleRateMatches([], 16000)).toBe(false);
  for (const rate of [undefined, "", "unknown", "NaN", "Infinity", "24000"])
    expect(
      audioSampleRateMatches(
        [{ codec_type: "audio", sample_rate: rate }],
        16000,
      ),
    ).toBe(false);
  expect(
    audioSampleRateMatches(
      [stereo, { ...stereo, sample_rate: "24000" }],
      16000,
    ),
  ).toBe(false);
  expect(audioSampleRateMatches([stereo], NaN)).toBe(false);
});
it("allows relative folders while rejecting traversal, reserved reports and excessive depth", () => {
  expect(validPath("edits/first-cut.mp4")).toBe(true);
  for (const p of [
    "/a.mp4",
    "../a.mp4",
    "x/../a.mp4",
    "a//b",
    "x/inspection.json",
    "cli-internal-validation.json",
    "a/".repeat(9) + "x.mp4",
  ])
    expect(validPath(p)).toBe(false);
});
it("moves a folder as a checked operation without replacing unrelated files or changing historical evidence", () => {
  const f = {
    name: "edits/a.mp4",
    blob: new Blob(["actual"]),
    origin: "generated" as const,
    command: "ffmpeg -i source.mp4 edits/a.mp4",
  };
  const source = { [f.name]: f };
  const moved = movedFiles(source, "edits", "exports", [
    "edits",
    "edits/empty",
  ]);
  expect(moved.files["exports/a.mp4"]?.command).toBe(f.command);
  expect(moved.folders).toEqual(["exports", "exports/empty"]);
  expect(source[f.name]).toBe(f);
  expect(() =>
    movedFiles(
      { ...source, "exports/a.mp4": { ...f, name: "exports/a.mp4" } },
      "edits",
      "exports",
      ["edits"],
    ),
  ).toThrow("already exists");
  expect(() => movedFiles(source, "edits", "edits/sub", ["edits"])).toThrow(
    "outside",
  );
});
