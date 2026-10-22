// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { projectLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { buildLesson } from "../build/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { editLesson } from "../edit/lesson";
import { soundLesson } from "../sound/lesson";
import { qualityLesson } from "../quality/lesson";
import { captionsLesson } from "../captions/lesson";
import { verifyLesson } from "../verify/lesson";
import { assistLesson } from "../assist/lesson";
import { grade } from "../grade";
import { p } from "./strings";
import { recipeJobSteps, recipeSteps } from "./recipe";

const allLessons = [
  captureLesson,
  buildLesson,
  lesson,
  lesson2,
  editLesson,
  soundLesson,
  qualityLesson,
  captionsLesson,
  verifyLesson,
  assistLesson,
  projectLesson,
];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("final-project lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(projectLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(projectLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(projectLesson.module).toBe(10);
    expect(projectLesson.id).toBe("final-project");
    expect(projectLesson.prerequisites).toEqual(["ai-assisted-production"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("pins the reference recipe to its recorded outputs", () => {
    expect(recipeSteps).toHaveLength(3);
    // Step order: crop, burn captions, re-encode.
    expect(recipeSteps.map((s) => s.n)).toEqual([1, 2, 3]);
    expect(recipeSteps[0]!.command).toContain("crop=480:270:240:135");
    expect(recipeSteps[1]!.command).toContain("subtitles=captions.srt");
    expect(recipeSteps[2]!.command).toContain("scale=640:360");
    expect(recipeSteps[2]!.command).toContain("-crf 23");
    // Each step's recorded output matches the provenance record's bytes.
    expect(recipeSteps[0]!.recordedBytes).toBe(105492);
    expect(recipeSteps[1]!.recordedBytes).toBe(116187);
    expect(recipeSteps[2]!.recordedBytes).toBe(105834);
    // The job runs the three steps then probes the final file.
    const steps = recipeJobSteps();
    expect(steps).toHaveLength(4);
    expect(steps.slice(0, 3).map((s) => s.type)).toEqual([
      "EXEC",
      "EXEC",
      "EXEC",
    ]);
    expect(steps[3]!.type).toBe("FFPROBE");
    // The finished file is smaller than the 128737-byte source.
    expect(recipeSteps[2]!.recordedBytes).toBeLessThan(128737);
    // The viewer review has six checks.
    expect(p.reviewChecks).toHaveLength(6);
  });
  it("grades the reference choice and rejects each wrong choice with feedback", () => {
    const c = projectLesson.challenges[0]!;
    expect(c.id).toBe("recipe-choice");
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
        p.feedback[field.id as keyof typeof p.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = projectLesson.challenges[0]!;
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
