// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { sd } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "sound-players",
    caption: sd.captions.players,
    timeModel: "recorded",
  },
  investigation: {
    kind: "sound-levels",
    caption: sd.captions.levels,
    timeModel: "recorded",
  },
  construction: {
    kind: "sound-editor",
    caption: sd.captions.editor,
    timeModel: "wasm-encode",
    role: "experiment",
  },
  failureExperiment: {
    kind: "over-driven",
    caption: sd.captions.over,
    timeModel: "recorded",
  },
  challenge: {
    kind: "challenge",
    caption: sd.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "sound-reflection",
    caption: sd.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "clear",
    label: sd.fieldLabels.clear,
    kind: "choice",
    options: [
      { value: "loud", label: sd.options.clear.loud },
      { value: "quiet", label: sd.options.clear.quiet },
      { value: "over", label: sd.options.clear.over },
    ],
  },
  {
    id: "treatment",
    label: sd.fieldLabels.treatment,
    kind: "choice",
    options: [
      { value: "none", label: sd.options.treatment.none },
      { value: "reduce", label: sd.options.treatment.reduce },
      { value: "raise", label: sd.options.treatment.raise },
    ],
  },
];

const referenceAnswers = {
  clear: "loud",
  treatment: "none",
};

const testLabels = {
  clear: "Which sound is clear",
  treatment: "What treatment it needs",
};

export const soundLesson = parseLesson({
  id: "make-the-sound-clear",
  title: sd.title,
  module: 5,
  order: 0,
  objectives: [...sd.objectives],
  prerequisites: ["make-it-readable"],
  introduces: ["decibel", "clipping", "band-limited", "sound level"],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: sd.sections[kind],
    prose: prose[kind],
    interactives: figures[kind]
      ? [
          {
            id: figures[kind].kind,
            kind: figures[kind].kind,
            timeModel: figures[kind].timeModel,
            caption: figures[kind].caption,
            role: figures[kind].role,
            props: kind === "challenge" ? { challengeId: "sound-choice" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "sound-choice",
      title: sd.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "sound-choice",
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
