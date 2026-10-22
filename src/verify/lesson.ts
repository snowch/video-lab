// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { v } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "candidate-players",
    caption: v.captions.players,
    timeModel: "recorded",
  },
  investigation: {
    kind: "candidate-probes",
    caption: v.captions.probes,
    timeModel: "recorded",
  },
  construction: {
    kind: "export-editor",
    caption: v.captions.editor,
    timeModel: "wasm-encode",
    role: "experiment",
  },
  failureExperiment: {
    kind: "broken-candidate",
    caption: v.captions.broken,
    timeModel: "recorded",
  },
  challenge: {
    kind: "challenge",
    caption: v.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "verify-reflection",
    caption: v.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "broken",
    label: v.fieldLabels.broken,
    kind: "choice",
    options: [
      { value: "plain", label: v.options.broken.plain },
      { value: "captioned", label: v.options.broken.captioned },
      { value: "videoOnly", label: v.options.broken.videoOnly },
    ],
  },
  {
    id: "check",
    label: v.fieldLabels.check,
    kind: "choice",
    options: [
      { value: "streams", label: v.options.check.streams },
      { value: "size", label: v.options.check.size },
      { value: "playback", label: v.options.check.playback },
    ],
  },
];

const referenceAnswers = {
  broken: "videoOnly",
  check: "streams",
};

const testLabels = {
  broken: "Which candidate fails",
  check: "Which check catches it",
};

export const verifyLesson = parseLesson({
  id: "export-publish-verify",
  title: v.title,
  module: 8,
  order: 0,
  objectives: [...v.objectives],
  prerequisites: ["captions-and-overlays"],
  introduces: ["stream probe", "publish check"],
  termExemptions: [
    {
      term: "export",
      reason:
        "Used as the ordinary verb for producing a finished file, already used in the quality lesson's guidance; the rationed teaching terms introduced here are 'stream probe' and 'publish check'.",
    },
  ],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: v.sections[kind],
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
              kind === "challenge" ? { challengeId: "publish-choice" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "publish-choice",
      title: v.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "publish-choice",
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
