// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { qualityLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { buildLesson } from "../build/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { editLesson } from "../edit/lesson";
import { soundLesson } from "../sound/lesson";
import { grade } from "../grade";
import { q } from "./strings";

const allLessons = [
  captureLesson,
  buildLesson,
  lesson,
  lesson2,
  editLesson,
  soundLesson,
  qualityLesson,
];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("compression-and-quality lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(qualityLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(qualityLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(qualityLesson.module).toBe(6);
    expect(qualityLesson.id).toBe("compression-and-quality");
    expect(qualityLesson.prerequisites).toEqual(["make-the-sound-clear"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("pins the recorded variant facts to their measured values", () => {
    // The stills and players must exist and the table's numbers must match the
    // provenance record's measured sizes.
    expect(q.variants.crf18.bytes).toBe(121523);
    expect(q.variants.crf23.bytes).toBe(113187);
    expect(q.variants.crf35.bytes).toBe(100142);
    expect(q.variants.quarter.bytes).toBe(106019);
    expect(q.fullFrame.bytes).toBe(128737);
    // CRF 18 is the largest of the three same-resolution encodes; CRF 35 the smallest.
    expect(q.variants.crf18.bytes).toBeGreaterThan(q.variants.crf23.bytes);
    expect(q.variants.crf23.bytes).toBeGreaterThan(q.variants.crf35.bytes);
    // The quarter-size file is smaller than 640x360 at the same CRF, but not
    // a quarter of the size: the encoder spends bits per pixel.
    expect(q.variants.quarter.bytes).toBeLessThan(q.variants.crf23.bytes);
    expect(q.variants.quarter.bytes).toBeGreaterThan(
      q.variants.crf23.bytes * 0.5,
    );
  });
  it("grades the reference choice and rejects each wrong choice with feedback", () => {
    const c = qualityLesson.challenges[0]!;
    expect(c.id).toBe("quality-choice");
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
        q.feedback[field.id as keyof typeof q.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = qualityLesson.challenges[0]!;
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
