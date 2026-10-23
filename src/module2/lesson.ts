// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { prose } from "./prose";
import { m2 } from "./strings";
import { referenceAnswers } from "./model";
const choice = (
  id: "method" | "order" | "reset",
  options: (keyof typeof m2.options)[],
): AnswerField => ({
  id,
  label: m2.fieldLabels[id],
  kind: "choice",
  options: options.map((value) => ({ value, label: m2.options[value] })),
});
const fields: AnswerField[] = [
  choice("method", ["copy", "encode"]),
  choice("order", ["AB", "BA"]),
  choice("reset", ["yes", "no"]),
  ...(["end", "duration", "join"] as const).map((id) => ({
    id,
    label: m2.fieldLabels[id],
    kind: "number" as const,
    min: 0,
    max: 10,
    step: 1,
  })),
];
const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string }
> = {
  motivation: {
    kind: "cut-source",
    caption: m2.captions.source,
    timeModel: "recorded-cuts",
  },
  prediction: {
    kind: "cut-prediction",
    caption: m2.captions.prediction,
    timeModel: "none",
  },
  investigation: {
    kind: "cut-explorer",
    caption: m2.captions.cuts,
    timeModel: "recorded-cuts",
  },
  construction: {
    kind: "join-explorer",
    caption: m2.captions.join,
    timeModel: "recorded-cuts",
  },
  failureExperiment: {
    kind: "edit-clock",
    caption: m2.captions.clock,
    timeModel: "edit-clock",
  },
  challenge: {
    kind: "challenge",
    caption: m2.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "edit-reflection",
    caption: m2.captions.reflection,
    timeModel: "none",
  },
};
export const lesson2 = parseLesson({
  id: "cutting-and-joining",
  module: 3,
  order: 0,
  title: m2.title,
  objectives: m2.objectives,
  prerequisites: ["what-is-video"],
  introduces: ["keyframe", "concat", "stream copy"],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: m2.sections[kind],
    prose: prose[kind],
    interactives: figures[kind]
      ? [
          {
            id: figures[kind].kind,
            ...figures[kind],
            props: kind === "challenge" ? { challengeId: "edit-plan" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "edit-plan",
      title: m2.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "cutting-and-joining",
        cases: Object.entries(referenceAnswers).map(([key, value]) => ({
          label: m2.fieldLabels[key as keyof typeof m2.fieldLabels],
          expect: { [key]: value },
        })),
      },
      reference: { answers: referenceAnswers },
      hints: [...prose.hints],
    },
  ],
  modelVsReality: prose.modelVsReality,
  originalityNote: {
    textbookExample:
      "An unexplained command to seek and concatenate arbitrary files.",
    howThisDiffers:
      "Compare actual boundary pictures from controlled copy and encoded cuts, then join an original working-app recording and trace its source and output clocks.",
  },
});
