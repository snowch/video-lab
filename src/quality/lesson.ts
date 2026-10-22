// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { q } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "quality-players",
    caption: q.captions.players,
    timeModel: "recorded",
  },
  investigation: {
    kind: "quality-stills",
    caption: q.captions.stills,
    timeModel: "recorded",
  },
  construction: {
    kind: "quality-editor",
    caption: q.captions.editor,
    timeModel: "wasm-encode",
    role: "experiment",
  },
  failureExperiment: {
    kind: "quarter-size",
    caption: q.captions.small,
    timeModel: "recorded",
  },
  challenge: {
    kind: "challenge",
    caption: q.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "quality-reflection",
    caption: q.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "readable",
    label: q.fieldLabels.readable,
    kind: "choice",
    options: [
      { value: "half", label: q.options.readable.half },
      { value: "quarter", label: q.options.readable.quarter },
      { value: "full", label: q.options.readable.full },
    ],
  },
  {
    id: "tradeoff",
    label: q.fieldLabels.tradeoff,
    kind: "choice",
    options: [
      { value: "pixels", label: q.options.tradeoff.pixels },
      { value: "crf", label: q.options.tradeoff.crf },
      { value: "codec", label: q.options.tradeoff.codec },
    ],
  },
];

const referenceAnswers = {
  readable: "half",
  tradeoff: "pixels",
};

const testLabels = {
  readable: "Which version stays readable",
  tradeoff: "Why the smaller file loses",
};

export const qualityLesson = parseLesson({
  id: "compression-and-quality",
  title: q.title,
  module: 6,
  order: 0,
  objectives: [...q.objectives],
  prerequisites: ["make-the-sound-clear"],
  introduces: ["bitrate", "CRF"],
  termExemptions: [
    {
      term: "resolution",
      reason:
        "Used as the ordinary word for the pixel dimensions of a picture, already named in the capture lesson's report of what the browser recorded; the rationed teaching term is introduced here with its measurement meaning.",
    },
  ],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: q.sections[kind],
    prose: prose[kind],
    interactives: figures[kind]
      ? [
          {
            id: figures[kind].kind,
            kind: figures[kind].kind,
            timeModel: figures[kind].timeModel,
            caption: figures[kind].caption,
            role: figures[kind].role,
            props:
              kind === "challenge" ? { challengeId: "quality-choice" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "quality-choice",
      title: q.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "quality-choice",
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
