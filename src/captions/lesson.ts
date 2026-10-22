// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { ca } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "caption-players",
    caption: ca.captions.players,
    timeModel: "recorded",
  },
  investigation: {
    kind: "caption-source",
    caption: ca.captions.srt,
    timeModel: "recorded",
  },
  construction: {
    kind: "caption-editor",
    caption: ca.captions.editor,
    timeModel: "wasm-encode",
    role: "experiment",
  },
  failureExperiment: {
    kind: "caption-small",
    caption: ca.captions.small,
    timeModel: "recorded",
  },
  challenge: {
    kind: "challenge",
    caption: ca.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "caption-reflection",
    caption: ca.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "readable",
    label: ca.fieldLabels.readable,
    kind: "choice",
    options: [
      { value: "full", label: ca.options.readable.full },
      { value: "small", label: ca.options.readable.small },
      { value: "none", label: ca.options.readable.none },
    ],
  },
  {
    id: "track",
    label: ca.fieldLabels.track,
    kind: "choice",
    options: [
      { value: "switchable", label: ca.options.track.switchable },
      { value: "burned", label: ca.options.track.burned },
      { value: "copy", label: ca.options.track.copy },
    ],
  },
];

const referenceAnswers = {
  readable: "full",
  track: "switchable",
};

const testLabels = {
  readable: "Which captioned version is readable",
  track: "What a caption track is",
};

export const captionsLesson = parseLesson({
  id: "captions-and-overlays",
  title: ca.title,
  module: 7,
  order: 0,
  objectives: [...ca.objectives],
  prerequisites: ["compression-and-quality"],
  introduces: ["caption", "caption track", "overlay", "burned-in"],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: ca.sections[kind],
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
              kind === "challenge" ? { challengeId: "caption-choice" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "caption-choice",
      title: ca.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "caption-choice",
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
