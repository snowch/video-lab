// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { cap } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "recorder",
    caption: cap.captions.recorder,
    timeModel: "none",
    role: "experiment",
  },
  construction: {
    kind: "capture-pipeline",
    caption: cap.captions.pipeline,
    timeModel: "none",
  },
  failureExperiment: {
    kind: "capture-fallback",
    caption: cap.captions.fallback,
    timeModel: "none",
  },
  challenge: {
    kind: "challenge",
    caption: cap.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "capture-reflection",
    caption: cap.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "surface",
    label: cap.fieldLabels.surface,
    kind: "choice",
    options: [
      { value: "app", label: cap.options.app },
      { value: "tab", label: cap.options.tab },
      { value: "screen", label: cap.options.screen },
    ],
  },
  {
    id: "action",
    label: cap.fieldLabels.action,
    kind: "choice",
    options: [
      { value: "one", label: "One action with a readable result" },
      { value: "many", label: "Several actions in one continuous recording" },
    ],
  },
  {
    id: "scaling",
    label: cap.fieldLabels.scaling,
    kind: "choice",
    options: [
      { value: "zoom100", label: cap.options.zoom100 },
      { value: "zoom125", label: cap.options.zoom125 },
      { value: "zoom150", label: cap.options.zoom150 },
    ],
  },
  {
    id: "hold",
    label: cap.fieldLabels.hold,
    kind: "choice",
    options: [
      { value: "hold2", label: cap.options.hold2 },
      { value: "hold4", label: cap.options.hold4 },
      { value: "hold6", label: cap.options.hold6 },
    ],
  },
];

const referenceAnswers = {
  surface: "app",
  action: "one",
  scaling: "zoom125",
  hold: "hold4",
};

const testLabels = {
  surface: "Surface to record",
  action: "Actions in the recording",
  scaling: "Scaling before recording",
  hold: "Pause after the result",
};

export const captureLesson = parseLesson({
  id: "capture-demo",
  title: cap.title,
  module: 0,
  order: 0,
  objectives: [...cap.objectives],
  introduces: [
    "screen capture",
    "MediaRecorder",
    "getDisplayMedia",
    "MIME type",
  ],
  termExemptions: [
    {
      term: "scale",
      reason:
        "Used only as the ordinary English verb for enlarging the application's own UI before recording (zooming), not as the rationed FFmpeg filter name introduced in Module 4.",
    },
    {
      term: "pacing",
      reason:
        "Used as the everyday word for the speed and rhythm of a recording, named here as a reflection prompt; the rationed teaching term for deliberate pacing choices is introduced in Module 4.",
    },
    {
      term: "resolution",
      reason:
        "Used as the ordinary word for the pixel dimensions the browser reports for a capture; the rationed teaching term is introduced in Module 6 with its measurement meaning.",
    },
  ],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: cap.sections[kind],
    prose: prose[kind],
    interactives: figures[kind]
      ? [
          {
            id: figures[kind].kind,
            kind: figures[kind].kind,
            timeModel: figures[kind].timeModel,
            caption: figures[kind].caption,
            role: figures[kind].role,
            props: kind === "challenge" ? { challengeId: "capture-plan" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "capture-plan",
      title: cap.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "capture-plan",
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
