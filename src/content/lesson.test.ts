// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { lesson } from "./lesson";
import { grade } from "../grade";
import { modules } from "./home.strings";
import { referenceAnswers } from "../media/model";
describe("shared lesson contract and course scope", () => {
  it("keeps the relocated inspection lesson complete with allowed terms and models", () => {
    expect(lesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(lesson)).toEqual([]);
    expect(termProblems([lesson])).toEqual([]);
    expect(modelProblems([lesson], ["recorded"])).toEqual([]);
    expect(lesson.module).toBe(2);
    expect(modules.map((m) => m.id)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });
  it("grades the measured reference, rejects initial work and gives feedback per field", () => {
    const c = lesson.challenges[0]!;
    expect(grade(c, c.reference).passed).toBe(true);
    const start = grade(c, c.initial);
    expect(start.passed).toBe(false);
    expect(start.failures).toHaveLength(6);
    expect(c.hints).toHaveLength(5);
    for (const field of c.fields) {
      const bad = grade(c, {
        answers: { ...referenceAnswers, [field.id]: "wrong" },
      });
      expect(bad.failures).toHaveLength(1);
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("rejects blank, nonfinite, fractional picture indexes, tick/second confusion and stream swaps", () => {
    const c = lesson.challenges[0]!;
    for (const frame of ["", "NaN", "Infinity", "75.1", "6.25"])
      expect(grade(c, { answers: { ...referenceAnswers, frame } }).passed).toBe(
        false,
      );
    expect(
      grade(c, { answers: { ...referenceAnswers, timestamp: "76800" } }).passed,
    ).toBe(false);
    expect(
      grade(c, { answers: { ...referenceAnswers, video: "1", audio: "0" } })
        .failures,
    ).toHaveLength(2);
    expect(
      grade(c, { answers: { ...referenceAnswers, timestamp: "6.250000" } })
        .passed,
    ).toBe(true);
  });
});
