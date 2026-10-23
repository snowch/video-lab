// Copyright © 2026 Christopher Snow
import { guided } from "./guided.strings";
import { lessons } from "./strings";
import { referenceLessons } from "./reference.strings";
import type { StepName } from "../journey/routes";
import type { ReferenceLab } from "./reference-model";
export type Task = {
  id: string;
  title: string;
  paragraphs: string[];
  examples: { note: string; command: string }[];
};
const paragraphIndexes: Record<StepName, number[][]> = {
  capture: [],
  build: [[0], [1], [2], [3], [4]],
  inspect: [[0], [1, 2], [3]],
  edit: [[0, 1], [2, 3], [4]],
  publish: [[0], [0], [1, 2], [1]],
};
export function lessonTasks(step: StepName, reference?: ReferenceLab): Task[] {
  if (reference) return referenceLessons[reference].sections;
  const lesson = lessons[step];
  return [
    ...lesson.examples.map((example, index) => ({
      id: `task-${index + 1}`,
      title:
        step === "capture" ? lesson.heading : guided.taskTitles[step][index]!,
      paragraphs:
        paragraphIndexes[step][index]?.map((i) => lesson.paragraphs[i]!) ?? [],
      examples: [example],
    })),
    {
      id: "review",
      title:
        step === "capture" ? lesson.heading : guided.taskTitles[step].at(-1)!,
      paragraphs: [lesson.challenge],
      examples: [],
    },
  ];
}

export function captureTasks(
  chosen: "record" | "sample" | "import",
  sourceName: string,
  captureSupported: boolean,
  hasSource: boolean,
): Task[] {
  return [
    {
      id: "source",
      title: guided.capture.getSource,
      paragraphs: [
        !captureSupported ? guided.capture.unsupported : "",
        chosen === "record"
          ? guided.capture.recordIntro
          : chosen === "sample"
            ? guided.capture.sampleIntro
            : guided.capture.importIntro,
        hasSource ? guided.capture.existingSource : "",
      ].filter(Boolean),
      examples:
        chosen === "record"
          ? lessons.capture.examples.slice(0, 3)
          : chosen === "sample"
            ? [{ note: "", command: "sample" }]
            : [{ note: "", command: "import" }],
    },
    {
      id: "files",
      title: guided.capture.listFiles,
      paragraphs: [guided.capture.listIntro],
      examples: [{ note: "", command: "ls" }],
    },
    {
      id: "replay",
      title: guided.capture.replaySource,
      paragraphs: [guided.capture.replayIntro],
      examples: [{ note: "", command: `play ${sourceName}` }],
    },
    {
      id: "backup",
      title: guided.capture.keepCopy,
      paragraphs: [guided.capture.keepCopyIntro],
      examples: [{ note: "", command: `download ${sourceName}` }],
    },
  ];
}
