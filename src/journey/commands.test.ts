// Copyright © 2026 Christopher Snow
import { expect, it } from "vitest";
import { commandText, editCommand, videoCommand } from "./commands";
it("rejects unsafe ranges and keeps both audio and picture clocks local before joining", () => {
  for (const ranges of [
    [{ start: -1, end: 2 }],
    [{ start: 3, end: 2 }],
    [{ start: 0, end: 11 }],
    [{ start: NaN, end: 2 }],
  ])
    expect(() => editCommand("capture.mp4", ranges, 10, true)).toThrow();
  const command = editCommand(
    "capture.mp4",
    [
      { start: 0, end: 2 },
      { start: 3, end: 7 },
    ],
    10,
    true,
  );
  expect(command.join(" ")).toContain("concat=n=2:v=1:a=1");
  expect(command.join(" ")).toContain(
    "atrim=start=3:end=7,asetpts=PTS-STARTPTS",
  );
  expect(commandText(command)).toContain(
    "ffmpeg -i capture.mp4 -filter_complex '",
  );
});
it("supports deliberate silence and only the meaningful filmstrip rates", () => {
  expect(
    editCommand("capture.webm", [{ start: 0, end: 3 }], 5, false),
  ).toContain("-an");
  expect(videoCommand(2)).toContain("2");
  expect(() => videoCommand(0)).toThrow();
});
