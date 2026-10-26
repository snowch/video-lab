// Copyright © 2026 Christopher Snow
import media from "./media.json";

export function ratio(value: string): number {
  const parts = value.split("/").map(Number);
  if (
    parts.length !== 2 ||
    !Number.isFinite(parts[0]) ||
    !Number.isFinite(parts[1]) ||
    parts[1] === 0
  )
    throw new RangeError("Expected a finite ratio with a non-zero denominator");
  return parts[0]! / parts[1]!;
}

const video = media.source.streams.find((stream) => stream.type === "video")!;
const audio = media.source.streams.find((stream) => stream.type === "audio")!;

export const timeFacts = {
  source: media.source.path.split("/").at(-1)!,
  duration: media.source.duration,
  frameRate: ratio(video.frameRate!),
  timeBase: media.timeline.timeBase,
  ticksPerFrame: media.timeline.ticksPerFrame,
  audioSampleRate: audio.sampleRate!,
  captions: media.captions,
};

// A regular presentation schedule on [0, duration), not a slowdown model.
export function frameInstants(rate: number, duration: number): number[] {
  if (
    !Number.isFinite(rate) ||
    rate <= 0 ||
    !Number.isFinite(duration) ||
    duration < 0
  )
    throw new RangeError("Rate must be positive and duration non-negative");
  return Array.from({ length: Math.ceil(rate * duration) }, (_, i) => i / rate);
}

export function ticksToSeconds(ticks: number, timeBase: string): number {
  return ticks * ratio(timeBase);
}

export type SignalPoint = { position: number; value: number };

// Invented normalised signal: its shape and point count are not media measurements.
export const illustrativeSignal: SignalPoint[] = Array.from(
  { length: 97 },
  (_, i) => ({
    position: i / 96,
    value:
      0.8 *
      Math.sin((i / 96) * Math.PI * 12) *
      (0.65 + 0.35 * Math.cos((i / 96) * Math.PI * 2)),
  }),
);

export function applyGain(points: SignalPoint[], gain: number): SignalPoint[] {
  return points.map((point) => ({ ...point, value: point.value * gain }));
}

// Linear amplitude envelope, corresponding to the default triangular fade curve.
export function fadeGain(
  time: number,
  start: number,
  duration: number,
): number {
  if (!Number.isFinite(duration) || duration <= 0)
    throw new RangeError("Fade duration must be positive");
  return Math.max(0, Math.min(1, 1 - (time - start) / duration));
}

export const fadeExample = { start: 5, duration: 3 };
