// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { captureLesson } from "./lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { grade } from "../grade";
import { cap } from "./strings";

describe("capture lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(captureLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(captureLesson)).toEqual([]);
    expect(modelProblems([captureLesson], [])).toEqual([]);
    expect(captureLesson.module).toBe(0);
    expect(captureLesson.id).toBe("capture-demo");
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems([captureLesson, lesson, lesson2])).toEqual([]);
  });
  it("keeps lesson ids stable for stored progress across renumbering", () => {
    expect(lesson.id).toBe("what-is-video");
    expect(lesson.module).toBe(2);
    expect(lesson.prerequisites).toEqual(["capture-demo"]);
    expect(lesson2.id).toBe("cutting-and-joining");
    expect(lesson2.module).toBe(3);
    expect(lesson2.prerequisites).toEqual(["what-is-video"]);
  });
  it("grades the reference plan and rejects each wrong choice with feedback", () => {
    const c = captureLesson.challenges[0]!;
    expect(c.id).toBe("capture-plan");
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
        cap.feedback[field.id as keyof typeof cap.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = captureLesson.challenges[0]!;
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
