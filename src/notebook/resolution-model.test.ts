// Copyright © 2026 Christopher Snow
import { expect, it } from "vitest";
import { resolutionGeometry } from "./resolution-model";
it("computes pixel counts and proportional geometry from stored dimensions", () => {
  expect(resolutionGeometry(0).pixels).toBe(409920);
  expect(resolutionGeometry(1)).toMatchObject({
    pixels: 921600,
    widthPercent: (1280 / 1920) * 100,
    heightPercent: (720 / 1080) * 100,
  });
  expect(resolutionGeometry(2)).toMatchObject({
    pixels: 2073600,
    widthPercent: 100,
    heightPercent: 100,
  });
  expect(() => resolutionGeometry(3)).toThrow(RangeError);
});
