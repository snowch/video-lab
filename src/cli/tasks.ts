// Copyright © 2026 Christopher Snow
import { referenceLessons } from "./reference.strings";
import { productionTasks } from "./progressive.strings";
import type { StepName } from "../journey/routes";
import type { ReferenceLab } from "./reference-model";
export type Task = {
  id: string;
  title: string;
  paragraphs: string[];
  examples: { note: string; command: string }[];
};
export function lessonTasks(step: StepName, reference?: ReferenceLab): Task[] {
  return reference
    ? referenceLessons[reference].sections
    : productionTasks[step];
}
