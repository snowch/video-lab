// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  checkLesson,
  termProblems,
  modelProblems,
  SECTION_KINDS,
} from "@platform/lesson-schema";
import { captionsLesson } from "./lesson";
import { captureLesson } from "../capture/lesson";
import { buildLesson } from "../build/lesson";
import { lesson } from "../content/lesson";
import { lesson2 } from "../module2/lesson";
import { editLesson } from "../edit/lesson";
import { soundLesson } from "../sound/lesson";
import { qualityLesson } from "../quality/lesson";
import { grade } from "../grade";
import { ca } from "./strings";

const allLessons = [
  captureLesson,
  buildLesson,
  lesson,
  lesson2,
  editLesson,
  soundLesson,
  qualityLesson,
  captionsLesson,
];
const allModels = ["recorded", "recorded-cuts", "edit-clock", "wasm-encode"];

describe("captions-and-overlays lesson contract, term gate and grading", () => {
  it("passes the shared lesson contract", () => {
    expect(captionsLesson.sections.map((s) => s.kind)).toEqual(SECTION_KINDS);
    expect(checkLesson(captionsLesson)).toEqual([]);
    expect(modelProblems(allLessons, allModels)).toEqual([]);
    expect(captionsLesson.module).toBe(7);
    expect(captionsLesson.id).toBe("captions-and-overlays");
    expect(captionsLesson.prerequisites).toEqual(["compression-and-quality"]);
  });
  it("introduces no term a later lesson claims first", () => {
    expect(termProblems(allLessons)).toEqual([]);
  });
  it("pins the caption source facts to the recorded file", () => {
    // The SRT source is 183 bytes with three cues covering the whole
    // 10-second recording (verified by scripts/edit-media.mjs).
    expect(ca.srtFile).toBe("edit/captions.srt");
    expect(ca.files.captioned.file).toBe("edit/captioned.mp4");
    expect(ca.files.small.file).toBe("edit/captioned-small.mp4");
    // The burned-in captioned encode is larger than the original: the
    // caption text costs the encoder bits.
    expect(ca.files.plain.file).toBe("build-queue.mp4");
  });
  it("grades the reference choice and rejects each wrong choice with feedback", () => {
    const c = captionsLesson.challenges[0]!;
    expect(c.id).toBe("caption-choice");
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
        ca.feedback[field.id as keyof typeof ca.feedback],
      );
      expect(bad.failures[0]!.detail!.length).toBeGreaterThan(40);
    }
  });
  it("accepts every reference option and rejects blank answers", () => {
    const c = captionsLesson.challenges[0]!;
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
