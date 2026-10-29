// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import {
  sampleRateCurve,
  sampleRateModel,
  sampleSignal,
  signalValueAt,
} from "./sample-rate-model";

describe("sample-rate explanatory model", () => {
  it.each([
    [4_000, 8, 0.00025, 4],
    [8_000, 16, 0.000125, 8],
    [16_000, 32, 0.0000625, 16],
  ] as const)(
    "places %i samples per second in the same half-open two-millisecond interval",
    (rate, count, spacing, perCycle) => {
      const model = sampleSignal(rate);
      expect(model.samples).toHaveLength(count);
      expect(model.samples[0]!.time).toBe(0);
      expect(model.samples.at(-1)!.time).toBeCloseTo(0.002 - spacing, 12);
      expect(model.samples.every(({ time }) => time < 0.002)).toBe(true);
      expect(model.samples.length / rate).toBe(0.002);
      expect(model.spacing).toBe(spacing);
      expect(model.samplesPerCycle).toBe(perCycle);
      for (let i = 1; i < count; i++) {
        expect(model.samples[i]!.time - model.samples[i - 1]!.time).toBeCloseTo(
          spacing,
          12,
        );
      }
    },
  );

  it("takes signed values at each instant, including away from extrema", () => {
    const coarse = sampleSignal(4_000).samples;
    for (const [index, expected] of [0, 0.8, 0, -0.8].entries())
      expect(coarse[index]!.value).toBeCloseTo(expected, 12);

    const fine = sampleSignal(8_000).samples;
    expect(fine[1]!.time).toBe(0.000125);
    expect(fine[1]!.value).toBeCloseTo(Math.sqrt(0.32), 12);
    expect(fine[5]!.value).toBeCloseTo(-Math.sqrt(0.32), 12);
    for (const { time, value } of sampleSignal(16_000).samples)
      expect(value).toBeCloseTo(0.8 * Math.sin(2_000 * Math.PI * time), 12);
  });

  it("adds sample instants while preserving every earlier measurement", () => {
    const coarse = sampleSignal(4_000).samples;
    const middle = sampleSignal(8_000).samples;
    const fine = sampleSignal(16_000).samples;
    coarse.forEach((point, i) => {
      expect(middle[i * 2]).toEqual(point);
      expect(fine[i * 4]).toEqual(point);
    });
  });

  it("keeps the original one-kilohertz curve and its two cycles fixed", () => {
    const original = sampleRateCurve.map((point) => ({ ...point }));
    sampleRateModel.rates.forEach((rate) => sampleSignal(rate));
    expect(sampleRateCurve).toEqual(original);
    expect(sampleRateModel.toneFrequency).toBe(1_000);
    expect(sampleRateModel.duration).toBe(0.002);
    expect(sampleRateCurve[0]).toEqual({ time: 0, value: 0 });
    expect(sampleRateCurve.at(-1)!.time).toBe(0.002);
    for (const time of [0, 0.0005, 0.001, 0.0015, 0.002])
      expect(signalValueAt(time)).toBeCloseTo(0, 12);
    for (const time of [0.00025, 0.00125])
      expect(signalValueAt(time)).toBeCloseTo(0.8, 12);
    for (const time of [0.00075, 0.00175])
      expect(signalValueAt(time)).toBeCloseTo(-0.8, 12);
  });
});
