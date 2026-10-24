// Copyright © 2026 Christopher Snow
import type { StepName } from "../journey/routes";
export const chapterOrder: readonly StepName[] = [
  "capture",
  "inspect",
  "edit",
  "build",
  "publish",
];
export const chapterNumber = (step: StepName) => chapterOrder.indexOf(step) + 1;
