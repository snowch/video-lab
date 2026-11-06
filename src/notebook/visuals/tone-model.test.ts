// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import { toneCurve, toneModel, toneSamples } from "./tone-model";

describe("tone comparison and playback", () => {
  it.each(toneModel.frequencies)(
    "%i Hz completes its counted cycles on the same four-millisecond scale",
    (frequency) => {
      const curve = toneCurve(frequency);
      expect(curve[0]).toEqual({ time: 0, value: 0 });
      expect(curve.at(-1)!.time).toBe(0.004);
      // Count ascending zero crossings after the first sample, including the endpoint.
      const completed = curve.filter(
        (point, i) =>
          i > 0 && curve[i - 1]!.value < -0.0001 && point.value >= -0.0001,
      );
      expect(completed).toHaveLength(frequency === 500 ? 2 : 4);
      expect(Math.max(...curve.map(({ value }) => value))).toBeCloseTo(0.8);
      expect(Math.min(...curve.map(({ value }) => value))).toBeCloseTo(-0.8);
      const cycleEnd = curve.find(({ time }) => time === 1 / frequency)!;
      expect(cycleEnd.value).toBeCloseTo(0, 12);
    },
  );

  it.each([44_100, 48_000])(
    "synthesises a one-second faded tone at %i samples/s without changing frequency",
    (sampleRate) => {
      for (const frequency of toneModel.frequencies) {
        const samples = toneSamples(frequency, sampleRate);
        expect(samples.length / sampleRate).toBe(1);
        expect(samples[0]).toBe(0);
        expect(Math.abs(samples.at(-1)!)).toBe(0);
        // Count positive crossings over the central half-second, excluding fades.
        let crossings = 0;
        for (let i = sampleRate / 4; i < (3 * sampleRate) / 4; i++)
          if (samples[i]! <= 0 && samples[i + 1]! > 0) crossings++;
        expect(crossings).toBe(frequency / 2);
        expect(Math.max(...samples)).toBeLessThanOrEqual(0.120001);
        expect(samples[Math.round(sampleRate * 0.00025)]).not.toBe(0);
      }
    },
  );
});
