// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import {
  applyGain,
  fadeGain,
  frameInstants,
  ticksToSeconds,
  timeFacts,
} from "./time-model";

describe("presentation schedules", () => {
  it("reduces picture count across the same second without extending the interval", () => {
    const original = frameInstants(24, 1);
    const reduced = frameInstants(12, 1);
    expect(original).toHaveLength(24);
    expect(reduced).toHaveLength(12);
    expect(reduced.every((time) => original.includes(time))).toBe(true);
    expect(reduced[1]! - reduced[0]!).toBeCloseTo(
      2 * (original[1]! - original[0]!),
    );
    expect(reduced.at(-1)).toBeLessThan(1);
    expect(original.at(-1)).toBeLessThan(1);
    expect(frameInstants(12, 4)).toHaveLength(48);
  });
  it("converts the recorded source tick interval to its picture interval", () => {
    expect(ticksToSeconds(timeFacts.ticksPerFrame, timeFacts.timeBase)).toBe(
      1 / timeFacts.frameRate,
    );
    expect(ticksToSeconds(12288, timeFacts.timeBase)).toBe(1);
    expect(ticksToSeconds(48000, "1/48000")).toBe(1);
  });
});

describe("amplitude models", () => {
  const signal = [-0.8, -0.4, 0, 0.4, 0.8].map((value, i) => ({
    position: i / 4,
    value,
  }));
  it("halves both positive and negative values while preserving each position", () => {
    expect(applyGain(signal, 0.5)).toEqual([
      { position: 0, value: -0.4 },
      { position: 0.25, value: -0.2 },
      { position: 0.5, value: 0 },
      { position: 0.75, value: 0.2 },
      { position: 1, value: 0.4 },
    ]);
    expect(signal[0]!.value).toBe(-0.8);
  });
  it("turns every value into silence with zero gain", () => {
    expect(applyGain(signal, 0).every((point) => point.value === 0)).toBe(true);
  });
  it("keeps full gain before the fade and reaches silence at its end", () => {
    expect(fadeGain(0, 5, 3)).toBe(1);
    expect(fadeGain(4.999, 5, 3)).toBe(1);
    expect(fadeGain(5, 5, 3)).toBe(1);
    expect(fadeGain(6.5, 5, 3)).toBe(0.5);
    expect(fadeGain(8, 5, 3)).toBe(0);
    expect(fadeGain(10, 5, 3)).toBe(0);
    expect(() => fadeGain(5, 5, 0)).toThrow(RangeError);
  });
});
