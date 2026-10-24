// Copyright © 2026 Christopher Snow
export function keptRange(
  start: number,
  duration: number,
  sourceDuration = 12,
) {
  const from = Math.max(0, Math.min(sourceDuration, start));
  const length = Math.max(0, Math.min(sourceDuration - from, duration));
  return {
    start: from,
    duration: length,
    end: from + length,
    left: (from / sourceDuration) * 100,
    width: (length / sourceDuration) * 100,
  };
}
export function pictureSchedule(rate: number, count = 3) {
  if (!(rate > 0) || !Number.isFinite(rate))
    throw new Error("Rate must be positive");
  return {
    duration: count / rate,
    intervals: Array.from({ length: count }, (_, index) => ({
      start: index / rate,
      end: (index + 1) / rate,
    })),
  };
}
