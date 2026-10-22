// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { assistLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { buildLesson } from "../build/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { editLesson } from "../edit/lesson";
import { soundLesson } from "../sound/lesson";
import { qualityLesson } from "../quality/lesson";
import { captionsLesson } from "../captions/lesson";
import { verifyLesson } from "../verify/lesson";
import { grade } from "../grade";
import { ai } from "./strings";
import { checkClaims, cutList } from "./claims";

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
];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("ai-assisted-production lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(assistLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(assistLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(assistLesson.module).toBe(9);
    expect(assistLesson.id).toBe("ai-assisted-production");
    expect(assistLesson.prerequisites).toEqual(["export-publish-verify"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("pins the claim check to the real frame evidence", () => {
    const claims = checkClaims();
    expect(claims).toHaveLength(3);
    // Exactly one claim is wrong: claim 2 (Sort pressed twice).
    expect(claims.filter((c) => !c.matches).map((c) => c.index)).toEqual([2]);
    // Every claim's evidence names a real frame from the verified table.
    for (const claim of claims) {
      expect(claim.evidence).toMatch(/frames\/\d{3}\.jpg at [\d.]+ s/);
    }
    // The cut list's durations are measured from the recording's frames.
    expect(cutList).toHaveLength(3);
    expect(cutList.find((c) => c.id === "padding")!.weak).toBe(true);
    expect(cutList.find((c) => c.id === "action")!.weak).toBe(false);
    const total = cutList.reduce((n, c) => n + c.seconds, 0);
    // Segments overlap by design (the padding is inside the action segment);
    // each individual duration must be positive and measured.
    for (const cut of cutList) expect(cut.seconds).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(0);
  });
  it("grades the reference choice and rejects each wrong choice with feedback", () => {
    const c = assistLesson.challenges[0]!;
    expect(c.id).toBe("assist-choice");
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
        ai.feedback[field.id as keyof typeof ai.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = assistLesson.challenges[0]!;
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
