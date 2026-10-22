// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { editLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { buildLesson } from "../build/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { grade } from "../grade";
import { ed } from "./strings";

const allLessons = [captureLesson, buildLesson, lesson, lesson2, editLesson];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("make-it-readable lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(editLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(editLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(editLesson.module).toBe(4);
    expect(editLesson.id).toBe("make-it-readable");
    expect(editLesson.prerequisites).toEqual(["cutting-and-joining"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("mounts the pacing figure in generalisation beside the callouts", () => {
    const generalisation = editLesson.sections.find(
      (s) => s.kind === "generalisation",
    )!;
    expect(generalisation.interactives.map((x) => x.kind)).toEqual([
      "callouts",
      "pacing",
    ]);
    for (const x of generalisation.interactives)
      expect(x.timeModel).toBe("recorded");
  });
  it("grades the reference choice and rejects each wrong choice with feedback", () => {
    const c = editLesson.challenges[0]!;
    expect(c.id).toBe("readability");
    expect(grade(c, c.reference).passed).toBe(true);
    const start = grade(c, c.initial);
    expect(start.passed).toBe(false);
    expect(start.failures).toHaveLength(2);
    expect(c.hints).toHaveLength(5);
    for (const field of c.fields) {
      const bad = grade(c, {
        answers: { ...c.reference.answers, [field.id]: "wrong" },
      });
      expect(bad.passed).toBe(false);
      expect(bad.failures).toHaveLength(1);
      expect(bad.failures[0]!.detail).toBe(
        ed.feedback[field.id as keyof typeof ed.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = editLesson.challenges[0]!;
    for (const field of c.fields) {
      const options = field.options ?? [];
      expect(options.length).toBeGreaterThanOrEqual(2);
      expect(
        options.some((o) => o.value === c.reference.answers![field.id]),
      ).toBe(true);
      expect(
        grade(c, { answers: { ...c.reference.answers, [field.id]: "" } })
          .passed,
      ).toBe(false);
    }
  });
});
