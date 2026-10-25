// Copyright © 2026 Christopher Snow
import { expect, test } from "vitest";
import { plannedCut, cutInterval } from "./cut-plan";

test("introductory trim plans follow decimal seconds, quoted paths and replacement", () => {
  expect(
    plannedCut('ffmpeg -y -i "clip one.mp4" -ss 1.5 -t 4.25 cut.mp4'),
  ).toEqual({
    input: "clip one.mp4",
    start: 1.5,
    duration: 4.25,
  });
  expect(plannedCut("ffmpeg -i bunny-short.mp4 -t 3 new.mp4")).toEqual({
    input: "bunny-short.mp4",
    start: 0,
    duration: 3,
  });
  expect(cutInterval(6, 5, 8)).toEqual({
    start: 6,
    end: 8,
    duration: 2,
    total: 8,
  });
  expect(cutInterval(8, 5, 8)).toBeNull();
});

test("plans never guess time semantics beyond the introductory grammar", () => {
  for (const command of [
    "ffmpeg -ss 2 -i bunny-short.mp4 -t 3 out.mp4",
    "ffmpeg -i bunny-short.mp4 -t 3 -c copy out.mp4",
    "ffmpeg -i bunny-short.mp4 -vf setpts=2*PTS -t 3 out.mp4",
    "ffmpeg -i bunny-short.mp4 -ss -1 -t 3 out.mp4",
    "ffmpeg -i bunny-short.mp4 -t 0 out.mp4",
    "ffmpeg -i bunny-short.mp4 -t 00:03 out.mp4",
    "ffmpeg -i bunny-short.mp4 -t 3 bunny-short.mp4",
    'ffmpeg -i bunny-short.mp4 -t 3 "unfinished',
    "ffprobe bunny-short.mp4",
  ])
    expect(plannedCut(command), command).toBeNull();
});
