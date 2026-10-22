// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { b } from "./strings";
import { prose } from "./prose";

const figures: Record<
  string,
  { kind: string; caption: string; timeModel: string; role?: string }
> = {
  motivation: {
    kind: "build-encoder",
    caption: b.captions.encoder,
    timeModel: "wasm-encode",
    role: "experiment",
  },
  construction: {
    kind: "filmstrip",
    caption: b.captions.filmstrip,
    timeModel: "none",
  },
  failureExperiment: {
    kind: "build-fallback",
    caption: b.captions.fallback,
    timeModel: "none",
  },
  challenge: {
    kind: "challenge",
    caption: b.captions.challenge,
    timeModel: "none",
  },
  reflection: {
    kind: "build-reflection",
    caption: b.captions.reflection,
    timeModel: "none",
  },
};

const fields: AnswerField[] = [
  {
    id: "pictures",
    label: b.fieldLabels.pictures,
    kind: "number",
    min: 0,
    max: 1000,
    step: 1,
  },
  {
    id: "duration",
    label: b.fieldLabels.duration,
    kind: "number",
    min: 0,
    max: 1000,
    step: 0.000001,
  },
  {
    id: "size",
    label: b.fieldLabels.size,
    kind: "number",
    min: 0,
    max: 100000000,
    step: 1,
  },
  {
    id: "muxCodec",
    label: b.fieldLabels.muxCodec,
    kind: "choice",
    options: [
      { value: "aac", label: "AAC" },
      { value: "h264", label: "H.264" },
      { value: "copy", label: "Copied unchanged (PCM)" },
    ],
  },
];

const referenceAnswers = {
  pictures: "4",
  duration: "4",
  size: "34473",
  muxCodec: "aac",
};

const testLabels = {
  pictures: "Pictures in the video-only file",
  duration: "Duration of the video-only file, seconds",
  size: "Size of the video-only file, bytes",
  muxCodec: "Sound format after muxing",
};

export const buildLesson = parseLesson({
  id: "build-a-file",
  title: b.title,
  module: 1,
  order: 0,
  objectives: [...b.objectives],
  prerequisites: ["capture-demo"],
  introduces: [
    "encoding",
    "muxing",
    "H.264",
    "AAC",
    "ffmpeg.wasm",
    "picture rate",
  ],
  termExemptions: [
    {
      term: "resolution",
      reason:
        "Used as the ordinary word for the pixel dimensions the probe reports; the rationed teaching term is introduced in Module 6 with its measurement meaning.",
    },
    {
      term: "crop",
      reason:
        'Appears only as the ordinary English noun/verb in "the cuts, crops, level measurements" naming what later lessons do; the rationed crop filter term is not used in its filter sense here.',
    },
    {
      term: "frame",
      reason:
        "Appears only inside the literal FFmpeg option name `-framerate`, which the command must show exactly; the rationed term is not used in its media sense here.",
    },
  ],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: b.sections[kind],
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
              kind === "challenge" ? { challengeId: "probe-prediction" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "probe-prediction",
      title: b.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "probe-prediction",
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
