// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { ai } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "transcript-view",
    caption: ai.captions.transcript,
    timeModel: "recorded",
  },
  investigation: {
    kind: "claim-checker",
    caption: ai.captions.frames,
    timeModel: "recorded",
  },
  construction: {
    kind: "claim-checker",
    caption: ai.captions.checker,
    timeModel: "recorded",
    role: "experiment",
  },
  failureExperiment: {
    kind: "cut-list",
    caption: ai.captions.cuts,
    timeModel: "recorded",
  },
  challenge: {
    kind: "challenge",
    caption: ai.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "assist-reflection",
    caption: ai.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "wrong",
    label: ai.fieldLabels.wrong,
    kind: "choice",
    options: [
      { value: "first", label: ai.options.wrong.first },
      { value: "second", label: ai.options.wrong.second },
      { value: "third", label: ai.options.wrong.third },
    ],
  },
  {
    id: "cut",
    label: ai.fieldLabels.cut,
    kind: "choice",
    options: [
      { value: "opening", label: ai.options.cut.opening },
      { value: "action", label: ai.options.cut.action },
      { value: "padding", label: ai.options.cut.padding },
    ],
  },
];

const referenceAnswers = {
  wrong: "second",
  cut: "padding",
};

const testLabels = {
  wrong: "Which claim is wrong",
  cut: "Which cut is weak",
};

export const assistLesson = parseLesson({
  id: "ai-assisted-production",
  title: ai.title,
  module: 9,
  order: 0,
  objectives: [...ai.objectives],
  prerequisites: ["export-publish-verify"],
  introduces: ["transcript", "claim check"],
  termExemptions: [
    {
      term: "assistant",
      reason:
        "Used as the ordinary word for a helper tool; no AI service runs in this course, and the lesson's point is checking an assistant's fixed text against real evidence.",
    },
  ],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: ai.sections[kind],
    prose: prose[kind],
    interactives: figures[kind]
      ? [
          {
            id: `${figures[kind].kind}-${kind}`,
            kind: figures[kind].kind,
            timeModel: figures[kind].timeModel,
            caption: figures[kind].caption,
            role: figures[kind].role,
            props: kind === "challenge" ? { challengeId: "assist-choice" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "assist-choice",
      title: ai.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "assist-choice",
        cases: Object.entries(referenceAnswers).map(([key, value]) => ({
          label: testLabels[key as keyof typeof testLabels],
          expect: { [key]: value },
        })),
      },
      reference: { answers: referenceAnswers },
      hints: [...prose.hints] as [string, string, string, string, string],
    },
  ],
  modelVsReality: prose.modelVsReality,
  originalityNote: prose.originality,
});
