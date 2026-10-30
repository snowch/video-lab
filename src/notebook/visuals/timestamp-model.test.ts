// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import media from "./media.json";
import {
  pictureInterval,
  timestampClock,
  timestampPictures,
} from "./timestamp-model";

describe("recorded picture timestamps", () => {
  it("uses measured source timestamps and preserves their reported rounding", () => {
    expect(timestampPictures.map((frame) => frame.ticks)).toEqual([
      0, 512, 1024, 1536,
    ]);
    expect(timestampPictures.map((frame) => frame.reportedSeconds)).toEqual([
      0, 0.041667, 0.083333, 0.125,
    ]);
    for (const [index, frame] of timestampPictures.entries()) {
      expect(frame.ticks).toBe(media.timeline.frames[index]!.pts);
      expect(Number(frame.seconds.toFixed(6))).toBe(frame.reportedSeconds);
    }
  });
  it("converts differences, rather than absolute endpoints, for each selected interval", () => {
    for (let index = 0; index < timestampPictures.length - 1; index++) {
      const interval = pictureInterval(index);
      expect(interval.start).toBe(timestampPictures[index]);
      expect(interval.end).toBe(timestampPictures[index + 1]);
      expect(interval.ticks).toBe(512);
      expect(interval.seconds).toBe(1 / 24);
      expect(interval.end.seconds - interval.start.seconds).toBeCloseTo(
        interval.seconds,
      );
      expect(interval.clockStep).toBe(128);
      expect(interval.clockMarks.map((mark) => mark.position)).toEqual([
        0, 0.25, 0.5, 0.75, 1,
      ]);
      expect(interval.clockMarks.map((mark) => mark.ticks)).toEqual(
        [0, 128, 256, 384, 512].map((ticks) => ticks + interval.start.ticks),
      );
    }
    expect(timestampClock.timeBase).toBe("1/12288");
    expect(timestampClock.secondsPerTick * 512).toBe(1 / 24);
    expect(timestampClock.secondsPerTick).toBeLessThan(
      pictureInterval(0).seconds,
    );
  });
  it("rejects intervals that are not adjacent recorded pairs", () => {
    for (const index of [-1, 3, 0.5, NaN])
      expect(() => pictureInterval(index)).toThrow(RangeError);
  });
});
