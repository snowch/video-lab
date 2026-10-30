// Copyright © 2026 Christopher Snow
import media from "./media.json";
import { ticksToSeconds } from "./time-model";

// These are recorded video presentation timestamps, not a schedule inferred
// from an average frame rate. The overview uses the first four recorded frames.
export const timestampPictures = media.timeline.frames
  .slice(0, 4)
  .map((frame, index) => ({
    number: index + 1,
    ticks: frame.pts,
    seconds: ticksToSeconds(frame.pts, media.timeline.timeBase),
    reportedSeconds: frame.seconds,
  }));

export const timestampClock = {
  timeBase: media.timeline.timeBase,
  secondsPerTick: ticksToSeconds(1, media.timeline.timeBase),
};

export function pictureInterval(index: number) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= timestampPictures.length - 1
  )
    throw new RangeError("Choose an adjacent pair of recorded pictures");
  const start = timestampPictures[index]!;
  const end = timestampPictures[index + 1]!;
  const ticks = end.ticks - start.ticks;
  return {
    start,
    end,
    ticks,
    seconds: ticksToSeconds(ticks, timestampClock.timeBase),
    // Intermediate marks show clock positions, not extra recorded pictures.
    clockStep: ticks / 4,
    clockMarks: Array.from({ length: 5 }, (_, index) => ({
      ticks: start.ticks + (index * ticks) / 4,
      position: index / 4,
    })),
  };
}
