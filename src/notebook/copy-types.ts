// Copyright © 2026 Christopher Snow
import type { Chapter } from "./structure";
export type PageCopy = {
  title: string;
  goal: string;
  concept: string[];
  prediction: string;
  reveal: string;
  workedLabels: string[];
  options: { flag: string; meaning: string }[];
  change: string;
  practice: string;
  review: string;
  hints: [string, string, string, string, string];
  checkLimit: string;
  nativeExplanation?: string[];
};
export type CourseCopy = {
  title: string;
  intro: string;
  chapters: Record<Chapter, { title: string; summary: string }>;
  pages: Record<string, PageCopy>;
};
