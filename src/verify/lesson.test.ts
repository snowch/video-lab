// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { verifyLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { buildLesson } from "../build/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { editLesson } from "../edit/lesson";
import { soundLesson } from "../sound/lesson";
import { qualityLesson } from "../quality/lesson";
import { captionsLesson } from "../captions/lesson";
import { grade } from "../grade";
import { v } from "./strings";

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
];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("export-publish-verify lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(verifyLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(verifyLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(verifyLesson.module).toBe(8);
    expect(verifyLesson.id).toBe("export-publish-verify");
    expect(verifyLesson.prerequisites).toEqual(["captions-and-overlays"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("pins the candidate facts to their measured values", () => {
    // The candidate sizes and stream facts match the provenance record.
    expect(v.candidates.plain.bytes).toBe(128737);
    expect(v.candidates.captioned.bytes).toBe(139560);
    expect(v.candidates.half.bytes).toBe(113187);
    expect(v.candidates.plain.file).toBe("build-queue.mp4");
    expect(v.candidates.captioned.file).toBe("edit/captioned.mp4");
    expect(v.candidates.half.file).toBe("edit/half-size-crf23.mp4");
    // The broken candidate is the video-only file: one video stream, no audio.
    expect(v.brokenFile).toBe("edit/video-only.mp4");
    // The captioned candidate is the largest: burned-in captions cost bits.
    expect(v.candidates.captioned.bytes).toBeGreaterThan(
      v.candidates.plain.bytes,
    );
    expect(v.candidates.captioned.bytes).toBeGreaterThan(
      v.candidates.half.bytes,
    );
  });
  it("grades the reference choice and rejects each wrong choice with feedback", () => {
    const c = verifyLesson.challenges[0]!;
    expect(c.id).toBe("publish-choice");
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
        v.feedback[field.id as keyof typeof v.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = verifyLesson.challenges[0]!;
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
