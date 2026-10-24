// Copyright © 2026 Christopher Snow
import { referenceLessons } from "./reference.strings";
import { productionTasks } from "./progressive.strings";
import { additionalTasks } from "../course/strings";
import type { StepName } from "../journey/routes";
import type { ReferenceLab } from "./reference-model";
export type Task = {
  id: string;
  title: string;
  paragraphs: string[];
  examples: { note: string; command: string }[];
  visual?: "story" | "streams" | "trim" | "rate" | "compare";
  practice?: {
    criteria: string[];
    hints: string[];
    solution?: string;
    review: string;
  };
};
export function lessonTasks(step: StepName, reference?: ReferenceLab): Task[] {
  return reference
    ? referenceLessons[reference].sections
    : [...productionTasks[step], ...additionalTasks[step]];
}
