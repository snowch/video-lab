// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  fixture,
  keyframes,
  cutResult,
  joinResult,
  layout,
  clipsFor,
  sourceAt,
  referenceAnswers,
  videoFacts,
  sourceTime,
} from "./model";
describe("recorded cuts and the join clock", () => {
  it("pins controlled source keyframes and all real cut results", () => {
    expect(keyframes.map((f) => f.time)).toEqual([0, 2, 4, 6, 8]);
    expect(fixture.source.streams.map((s) => s.codec)).toEqual(["h264", "aac"]);
    for (const start of [1, 3, 5]) {
      const copy = cutResult(start, "copy"),
        precise = cutResult(start, "encode");
      expect(sourceTime(copy, 0)).toBe(start - 1);
      expect(sourceTime(precise, 0)).toBe(start);
      expect(copy.frames).toHaveLength(36);
      expect(precise.frames).toHaveLength(24);
      expect(videoFacts(copy).duration).toBe(3);
      expect(videoFacts(precise).duration).toBe(2);
      expect(sourceTime(precise, 23)).toBeCloseTo(start + 2 - 1 / 12, 5);
    }
    expect(cutResult(3, "copy").frames[0]!.time).toBe(0.016032);
    expect(() => cutResult(2, "copy")).toThrow();
  });
  it("joins source ranges in chosen order and excludes end boundaries", () => {
    for (const order of ["AB", "BA"] as const)
      for (const end of [6, 8]) {
        const clips = clipsFor(order, end),
          segments = layout(clips),
          result = joinResult(order, end);
        const duration = segments.at(-1)!.outputEnd;
        expect(videoFacts(result).duration).toBe(duration);
        expect(result.frames).toHaveLength(duration * 12);
        expect(sourceAt(clips, 0)).toEqual({
          name: clips[0]!.name,
          time: clips[0]!.start,
        });
        expect(sourceAt(clips, segments[1]!.outputStart)).toEqual({
          name: clips[1]!.name,
          time: clips[1]!.start,
        });
        expect(sourceAt(clips, duration)).toBeNull();
        expect(sourceAt(clips, -1)).toBeNull();
        expect(sourceAt(clips, NaN)).toBeNull();
        const join = result.joinFrame!;
        expect(sourceTime(result, join)).toBe(clips[1]!.start);
        expect(sourceTime(result, join - 1)).toBeCloseTo(
          clips[0]!.end - 1 / 12,
          5,
        );
      }
  });
  it("rejects invalid source ranges and unsupported renders", () => {
    for (const [start, end] of [
      [2, 2],
      [3, 2],
      [-1, 2],
      [0, 11],
      [NaN, 2],
      [0, Infinity],
    ])
      expect(() => layout([{ name: "X", start: start!, end: end! }])).toThrow();
    expect(() => clipsFor("AB", 7)).toThrow();
    expect(() => joinResult("AB", 7)).toThrow();
  });
  it("derives the reference edit from measured outputs", () => {
    expect(referenceAnswers).toEqual({
      method: "encode",
      order: "AB",
      reset: "yes",
      end: "6",
      duration: "4",
      join: "2",
    });
  });
});
