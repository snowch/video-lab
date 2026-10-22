// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { ed } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "readability-source",
    caption: ed.captions.source,
    timeModel: "recorded",
  },
  prediction: {
    kind: "readability-source",
    caption: ed.captions.prediction,
    timeModel: "recorded",
  },
  investigation: {
    kind: "readability-comparison",
    caption: ed.captions.comparison,
    timeModel: "recorded",
  },
  construction: {
    kind: "crop-editor",
    caption: ed.captions.editor,
    timeModel: "wasm-encode",
    role: "experiment",
  },
  failureExperiment: {
    kind: "scaled-down",
    caption: ed.captions.scaledDown,
    timeModel: "recorded",
  },
  generalisation: {
    kind: "callouts",
    caption: ed.captions.callout,
    timeModel: "recorded",
  },
  pacing: {
    kind: "pacing",
    caption: ed.captions.pacing,
    timeModel: "recorded",
  },
  challenge: {
    kind: "challenge",
    caption: ed.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "edit-reflection",
    caption: ed.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "readable",
    label: ed.fieldLabels.readable,
    kind: "choice",
    options: [
      { value: "full", label: ed.options.full },
      { value: "crop", label: ed.options.crop },
    ],
  },
  {
    id: "why",
    label: ed.fieldLabels.why,
    kind: "choice",
    options: [
      {
        value: "enlarge",
        label:
          "The crop keeps the action region and scaling enlarges it at the same display size",
      },
      {
        value: "sharpen",
        label: "Scaling up sharpens the picture and adds detail",
      },
      {
        value: "brighten",
        label: "Cropping makes the picture brighter, so the text is clearer",
      },
    ],
  },
];

const referenceAnswers = {
  readable: "crop",
  why: "enlarge",
};

const testLabels = {
  readable: "Which version is readable at playback size",
  why: "Why the crop stays readable",
};

export const editLesson = parseLesson({
  id: "make-it-readable",
  title: ed.title,
  module: 4,
  order: 0,
  objectives: [...ed.objectives],
  prerequisites: ["cutting-and-joining"],
  introduces: ["crop", "scale", "callout", "pacing"],
  termExemptions: [
    {
      term: "resolution",
      reason:
        "Used as the ordinary label for the pixel dimensions the probe reports; the rationed teaching term is introduced in Module 6 with its measurement meaning.",
    },
  ],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: ed.sections[kind],
    prose: prose[kind],
    interactives: [
      ...(figures[kind]
        ? [
            {
              id: `${figures[kind].kind}-${kind}`,
              kind: figures[kind].kind,
              timeModel: figures[kind].timeModel,
              caption: figures[kind].caption,
              role: figures[kind].role,
              props: kind === "challenge" ? { challengeId: "readability" } : {},
            },
          ]
        : []),
      ...(kind === "generalisation" && figures.pacing
        ? [
            {
              id: `${figures.pacing.kind}-${kind}`,
              kind: figures.pacing.kind,
              timeModel: figures.pacing.timeModel,
              caption: figures.pacing.caption,
              props: {},
            },
          ]
        : []),
    ],
  })),
  challenges: [
    {
      id: "readability",
      title: ed.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "readability",
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
