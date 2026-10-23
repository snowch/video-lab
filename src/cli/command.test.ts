// Copyright © 2026 Christopher Snow
import { expect, it } from "vitest";
import { parseCommand, toolPlan } from "./command";
it("passes quoted filter graphs, empty arguments and continued commands without shell evaluation", () => {
  expect(
    parseCommand(
      'ffmpeg -i capture.mp4 \\\n -vf "scale=640:-2,drawtext=text=\\:test" \'a;b\' "" out.mp4',
    ),
  ).toEqual([
    "ffmpeg",
    "-i",
    "capture.mp4",
    "-vf",
    "scale=640:-2,drawtext=text=\\:test",
    "a;b",
    "",
    "out.mp4",
  ]);
});
it.each([
  'ffmpeg -i "unfinished',
  "ffmpeg \\",
  "ffmpeg x | cat",
  "ffmpeg x > out",
  "ffmpeg x; ls",
  "ffmpeg $INPUT out.mp4",
])("rejects unsupported or unfinished syntax: %s", (line) =>
  expect(() => parseCommand(line)).toThrow(),
);
it("preserves real user arguments and identifies the actual output", () => {
  const plan = toolPlan(
    parseCommand("ffmpeg -i capture.webm -ss 1 -t 2 -an -c:v libx264 demo.mp4"),
  );
  expect(plan.output).toBe("demo.mp4");
  expect(plan.args).toContain("2");
  expect(toolPlan(["ffmpeg", "-version"]).output).toBeUndefined();
});
it("keeps probe output explicit and output paths within the browser workspace", () => {
  expect(
    toolPlan(["ffprobe", "-show_streams", "-of", "json", "capture.mp4"]).tool,
  ).toBe("ffprobe");
  expect(toolPlan(["ffprobe", "capture.mp4"]).args).toEqual(["capture.mp4"]);
  expect(() =>
    toolPlan(["ffprobe", "capture.mp4", "-o", "report.json"]),
  ).toThrow("-of json");
  expect(() =>
    toolPlan(["ffmpeg", "-i", "capture.mp4", "../out.mp4"]),
  ).toThrow();
});

it("leaves room for a unique recipe filename instead of truncating different output names", () => {
  expect(() =>
    toolPlan(["ffmpeg", "-i", "capture.mp4", "a".repeat(65) + ".mp4"]),
  ).toThrow("68");
});

it("forwards a named native ffprobe JSON report destination and rejects missing or unsafe paths", () => {
  expect(
    toolPlan(["ffprobe", "-of", "json", "source.mp4", "-o", "report.json"])
      .output,
  ).toBe("report.json");
  expect(() =>
    toolPlan(["ffprobe", "-of", "json", "source.mp4", "-o"]),
  ).toThrow();
  expect(() =>
    toolPlan(["ffprobe", "-of", "json", "source.mp4", "-o", "../report.json"]),
  ).toThrow();
});
