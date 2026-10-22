// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { p } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "recipe-view",
    caption: p.captions.recipe,
    timeModel: "recorded",
  },
  investigation: {
    kind: "recipe-view",
    caption: p.captions.recipe,
    timeModel: "recorded",
  },
  construction: {
    kind: "recipe-runner",
    caption: p.captions.runner,
    timeModel: "wasm-encode",
    role: "experiment",
  },
  failureExperiment: {
    kind: "viewer-review",
    caption: p.captions.review,
    timeModel: "none",
  },
  challenge: {
    kind: "challenge",
    caption: p.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "project-reflection",
    caption: p.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "order",
    label: p.fieldLabels.order,
    kind: "choice",
    options: [
      { value: "correct", label: p.options.order.correct },
      { value: "captionsFirst", label: p.options.order.captionsFirst },
      { value: "encodeOnly", label: p.options.order.encodeOnly },
    ],
  },
  {
    id: "verify",
    label: p.fieldLabels.verify,
    kind: "choice",
    options: [
      { value: "probe", label: p.options.verify.probe },
      { value: "play", label: p.options.verify.play },
      { value: "size", label: p.options.verify.size },
    ],
  },
];

const referenceAnswers = {
  order: "correct",
  verify: "probe",
};

const testLabels = {
  order: "Which step order is the recipe",
  verify: "Which check proves shareable",
};

export const projectLesson = parseLesson({
  id: "final-project",
  title: p.title,
  module: 10,
  order: 0,
  objectives: [...p.objectives],
  prerequisites: ["ai-assisted-production"],
  introduces: ["recipe", "viewer-centred review"],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: p.sections[kind],
    prose: prose[kind],
    interactives: figures[kind]
      ? [
          {
            id: `${figures[kind].kind}-${kind}`,
            kind: figures[kind].kind,
            timeModel: figures[kind].timeModel,
            caption: figures[kind].caption,
            role: figures[kind].role,
            props: kind === "challenge" ? { challengeId: "recipe-choice" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "recipe-choice",
      title: p.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "recipe-choice",
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
