// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { soundLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { buildLesson } from "../build/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { editLesson } from "../edit/lesson";
import { grade } from "../grade";
import { sd } from "./strings";

const allLessons = [
  captureLesson,
  buildLesson,
  lesson,
  lesson2,
  editLesson,
  soundLesson,
];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("make-the-sound-clear lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(soundLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(soundLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(soundLesson.module).toBe(5);
    expect(soundLesson.id).toBe("make-the-sound-clear");
    expect(soundLesson.prerequisites).toEqual(["make-it-readable"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("grades the reference choice and rejects each wrong choice with feedback", () => {
    const c = soundLesson.challenges[0]!;
    expect(c.id).toBe("sound-choice");
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
        sd.feedback[field.id as keyof typeof sd.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = soundLesson.challenges[0]!;
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
