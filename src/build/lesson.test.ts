// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { buildLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { grade } from "../grade";
import { b } from "./strings";

const allLessons = [captureLesson, buildLesson, lesson, lesson2];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("build-a-file lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(buildLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(buildLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(buildLesson.module).toBe(1);
    expect(buildLesson.id).toBe("build-a-file");
    expect(buildLesson.prerequisites).toEqual(["capture-demo"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("grades the reference prediction and rejects wrong values with feedback", () => {
    const c = buildLesson.challenges[0]!;
    expect(c.id).toBe("probe-prediction");
    expect(grade(c, c.reference).passed).toBe(true);
    const start = grade(c, c.initial);
    expect(start.passed).toBe(false);
    expect(start.failures).toHaveLength(4);
    expect(c.hints).toHaveLength(5);
    for (const field of c.fields) {
      const bad = grade(c, {
        answers: { ...c.reference.answers, [field.id]: "wrong" },
      });
      expect(bad.passed).toBe(false);
      expect(bad.failures).toHaveLength(1);
      expect(bad.failures[0]!.detail).toBe(
        b.feedback[field.id as keyof typeof b.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("rejects blank, nonfinite and out-of-range numeric answers", () => {
    const c = buildLesson.challenges[0]!;
    for (const value of ["", " ", "NaN", "Infinity", "-1", "4.5"])
      expect(
        grade(c, { answers: { ...c.reference.answers, pictures: value } })
          .passed,
      ).toBe(false);
    expect(
      grade(c, { answers: { ...c.reference.answers, duration: "4.0" } }).passed,
    ).toBe(true);
    expect(
      grade(c, { answers: { ...c.reference.answers, size: "34473.0" } }).passed,
    ).toBe(true);
    expect(
      grade(c, { answers: { ...c.reference.answers, muxCodec: "h264" } })
        .passed,
    ).toBe(false);
  });
});
