// Copyright © 2026 Christopher Snow
import type { Chapter } from "./structure";
export type WorkedCopy = {
  title: string;
  introduction?: string[];
  options: { flag: string; meaning: string }[];
  observe: string;
  explanation?: string[];
  prediction?: string;
};
export type PageCopy = {
  title: string;
  goal: string;
  sourceNote?: string;
  concept: string[];
  worked: WorkedCopy[];
  practice: string;
  practiceObserve: string;
  practiceOptions?: { flag: string; meaning: string }[];
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
