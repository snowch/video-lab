// Copyright © 2026 Christopher Snow
import { it, expect } from "vitest";
import { keptRange, pictureSchedule } from "./model";
it("kept duration is a length, remains inside source and changes its end", () => {
  expect(keptRange(2, 6)).toMatchObject({ start: 2, duration: 6, end: 8 });
  expect(keptRange(2, 4)).toMatchObject({ start: 2, duration: 4, end: 6 });
  expect(keptRange(11, 6)).toMatchObject({ start: 11, duration: 1, end: 12 });
});
it("three pictures receive consecutive holds without creating additional motion", () => {
  expect(pictureSchedule(1)).toEqual({
    duration: 3,
    intervals: [
      { start: 0, end: 1 },
      { start: 1, end: 2 },
      { start: 2, end: 3 },
    ],
  });
  expect(pictureSchedule(2).duration).toBe(1.5);
  expect(() => pictureSchedule(0)).toThrow();
});
