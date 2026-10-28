// Copyright © 2026 Christopher Snow
import { expect, it } from "vitest";
import { numberedInputMatches, referencedInputs } from "./inputs";

it("stages image2 numbered inputs without shell expansion or unrelated files", () => {
  const names = [
    "shots/frame-01.png",
    "shots/frame-02.png",
    "shots/frame-100.png",
    "shots/frame-1.png",
    "shots/frame-001.png",
    "shots/frame-02Xpng",
    "other/frame-02.png",
    "notes.txt",
  ];
  const files = Object.fromEntries(
    names.map((name) => [
      name,
      { name, blob: new Blob([name]), origin: "imported" as const },
    ]),
  );
  expect(
    referencedInputs(
      ["-framerate", "3", "-i", "shots/frame-%02d.png", "out.mp4"],
      files,
    ).map((file) => file.name),
  ).toEqual(names.slice(0, 3));
  expect(
    referencedInputs(["-i", "shots/frame-*.png", "out.mp4"], files),
  ).toEqual([]);
  expect(
    referencedInputs(["-metadata", "shots/frame-%02d.png", "out.mp4"], files),
  ).toEqual([]);
  expect(numberedInputMatches("frame-%d.png", "frame-1.png")).toBe(true);
  expect(numberedInputMatches("frame-%d.png", "frame-01.png")).toBe(false);
  expect(numberedInputMatches("frame-%02d-%02d.png", "frame-01-01.png")).toBe(
    false,
  );
});

it("retains literal inputs, subtitle/font references and all matched source hashes", () => {
  const names = [
    "source.mp4",
    "captions.srt",
    "fonts/DejaVuSans.ttf",
    "overlay.png",
    "notes.txt",
  ];
  const files = Object.fromEntries(
    names.map((name) => [
      name,
      { name, blob: new Blob([name]), origin: "provided" as const },
    ]),
  );
  expect(
    referencedInputs(
      [
        "-i",
        "source.mp4",
        "-i",
        "overlay.png",
        "-vf",
        "subtitles=captions.srt:fontsdir=fonts",
        "output.mp4",
      ],
      files,
    ).map((file) => file.name),
  ).toEqual(names.slice(0, 4));
});

it("does not treat an existing overwritten output as source evidence", () => {
  const files = Object.fromEntries(
    ["source.png", "out.mp4", "report.json"].map((name) => [
      name,
      { name, blob: new Blob([name]), origin: "generated" as const },
    ]),
  );
  expect(
    referencedInputs(
      ["-y", "-i", "source.png", "out.mp4"],
      files,
      "out.mp4",
    ).map((f) => f.name),
  ).toEqual(["source.png"]);
  expect(
    referencedInputs(
      ["-of", "json", "-o", "report.json", "out.mp4"],
      files,
      "report.json",
      "ffprobe",
    ).map((f) => f.name),
  ).toEqual(["out.mp4"]);
  expect(
    referencedInputs(["-y", "-i", "out.mp4", "out.mp4"], files, "out.mp4").map(
      (f) => f.name,
    ),
  ).toEqual(["out.mp4"]);
});
