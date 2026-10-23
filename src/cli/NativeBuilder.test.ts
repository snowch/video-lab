// Copyright © 2026 Christopher Snow
import { expect, test } from "vitest";
import { quoteArgument } from "./NativeBuilder";
import { parseCommand } from "./command";
test("builder preserves real filter graphs, apostrophes and empty arguments without shell expansion", () => {
  const words = [
    "ffmpeg",
    "-i",
    "clip.mp4",
    "-filter_complex",
    "[0:v]trim=start=2:end=8,setpts=PTS-STARTPTS[v]",
    "-metadata",
    "title=Engineer's demo $1; unchanged",
    "",
    "-map",
    "[v]",
    "demo.mp4",
  ];
  expect(parseCommand(words.map(quoteArgument).join(" "))).toEqual(words);
});
