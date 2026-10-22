// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { lesson } from "../content/lesson";
import { lesson2 } from "./lesson";
import { referenceAnswers } from "./model";
import { grade } from "../grade";
describe("Module 2 lesson and edit grading", () => {
  it("passes the shared contract and term gate alongside Module 0", () => {
    expect(lesson2.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(lesson2)).toEqual([]);
    expect(termProblems([lesson, lesson2])).toEqual([]);
    expect(
      modelProblems(
        [lesson, lesson2],
        ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"],
      ),
    ).toEqual([]);
    expect(lesson2.prerequisites).toEqual([lesson.id]);
  });
  it("grades all six edit decisions independently with useful feedback", () => {
    const c = lesson2.challenges[0]!;
    expect(grade(c, c.reference).passed).toBe(true);
    expect(grade(c, c.initial).failures).toHaveLength(6);
    expect(c.hints).toHaveLength(5);
    for (const field of c.fields) {
      const verdict = grade(c, {
        answers: { ...referenceAnswers, [field.id]: "wrong" },
      });
      expect(verdict.passed).toBe(false);
      expect(verdict.failures).toHaveLength(1);
      expect(verdict.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("rejects blank/nonfinite times and source/output clock confusion", () => {
    const c = lesson2.challenges[0]!;
    for (const field of ["end", "duration", "join"])
      for (const value of ["", " ", "NaN", "Infinity", "-1", "2.5"])
        expect(
          grade(c, { answers: { ...referenceAnswers, [field]: value } }).passed,
        ).toBe(false);
    expect(
      grade(c, { answers: { ...referenceAnswers, join: "4" } }).passed,
    ).toBe(false);
    expect(
      grade(c, { answers: { ...referenceAnswers, duration: "6" } }).passed,
    ).toBe(false);
    expect(
      grade(c, {
        answers: { ...referenceAnswers, join: "2.0", duration: "4.00" },
      }).passed,
    ).toBe(true);
  });
});
