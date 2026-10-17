// Copyright © 2026 Christopher Snow
import {
  parseLesson,
  SECTION_KINDS,
  type AnswerField,
} from "@platform/lesson-schema";
import { prose } from "./module0.prose";
import { labels } from "./module0.labels";
import { ui } from "./ui.strings";
import { fixture, referenceAnswers } from "../media/model";
const streamOptions = fixture.streams.map((s) => ({
  value: String(s.index),
  label: `${ui.chooseStream} ${s.index}`,
}));
const fields: AnswerField[] = [
  {
    id: "video",
    label: labels.fields.video,
    kind: "choice",
    options: streamOptions,
  },
  {
    id: "audio",
    label: labels.fields.audio,
    kind: "choice",
    options: streamOptions,
  },
  {
    id: "container",
    label: labels.fields.container,
    kind: "choice",
    options: [
      { value: "mp4", label: ui.containerMp4 },
      { value: "h264", label: ui.containerH264 },
    ],
  },
  {
    id: "codec",
    label: labels.fields.codec,
    kind: "choice",
    options: [
      { value: "h264", label: ui.codecH264 },
      { value: "mp4", label: ui.codecMp4 },
      { value: "aac", label: ui.codecAac },
    ],
  },
  {
    id: "frame",
    label: labels.fields.frame,
    kind: "number",
    min: 0,
    max: fixture.frames.length - 1,
    step: 1,
  },
  {
    id: "timestamp",
    label: labels.fields.timestamp,
    kind: "number",
    min: 0,
    max: fixture.duration,
    step: 0.000001,
  },
];
const testLabels = {
  video: ui.testVideo,
  audio: ui.testAudio,
  container: ui.testContainer,
  codec: ui.testCodec,
  frame: ui.testFrame,
  timestamp: ui.testTimestamp,
};
const figureKinds: Record<string, { kind: string; caption: string }> = {
  prediction: { kind: "prediction", caption: labels.captions.prediction },
  investigation: { kind: "explorer", caption: labels.captions.explorer },
  construction: { kind: "streams", caption: labels.captions.streams },
  failureExperiment: { kind: "failure", caption: labels.captions.failure },
  challenge: { kind: "challenge", caption: labels.captions.challenge },
  reflection: { kind: "reflection", caption: labels.captions.reflection },
};
export const lesson = parseLesson({
  id: "what-is-video",
  title: labels.title,
  module: 0,
  order: 0,
  objectives: labels.objectives,
  introduces: [
    "stream",
    "frame",
    "presentation timestamp",
    "PTS",
    "sample",
    "channel",
    "container",
    "codec",
    "time base",
    "constant frame rate",
    "variable frame rate",
    "ffprobe",
  ],
  sections: SECTION_KINDS.map((kind) => ({
    kind,
    title: labels.sections[kind],
    prose: prose[kind],
    interactives: figureKinds[kind]
      ? [
          {
            id: figureKinds[kind].kind,
            kind: figureKinds[kind].kind,
            timeModel: ["reflection", "prediction", "challenge"].includes(
              figureKinds[kind].kind,
            )
              ? "none"
              : "recorded",
            caption: figureKinds[kind].caption,
            props: kind === "challenge" ? { challengeId: "inspection" } : {},
          },
        ]
      : [],
  })),
  challenges: [
    {
      id: "inspection",
      title: labels.challengeTitle,
      task: prose.challengeTask,
      gradedDirection: "answer",
      fields,
      initial: { answers: {} },
      tests: {
        kind: "answers",
        grader: "media-inspection",
        cases: Object.entries(referenceAnswers).map(([key, value]) => ({
          label: testLabels[key as keyof typeof testLabels],
          expect: { [key]: value },
        })),
      },
      reference: { answers: referenceAnswers },
      hints: [...prose.hints],
    },
  ],
  modelVsReality: prose.modelVsReality,
  originalityNote: {
    textbookExample: "A glossary followed by a generic conversion command.",
    howThisDiffers:
      "Inspect an original working build-queue recording before editing; compare measured picture and audio timing and create an inspection record.",
  },
});
