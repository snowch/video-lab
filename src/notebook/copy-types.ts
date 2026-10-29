// Copyright © 2026 Christopher Snow
import type { Chapter } from "./structure";
export type WorkedCopy = {
  title: string;
  introduction?: string[];
  options: {
    flag: string;
    meaning: string;
    reference?: { href: string; label: string };
  }[];
  observe: string;
  explanation?: string[];
  prediction?: string;
};
export type PageCopy = {
  title: string;
  goal: string;
  sourceNote?: string;
  personalMedia?: { title: string; paragraphs: string[] };
  concept: string[];
  conceptHeadings?: string[];
  worked: WorkedCopy[];
  practice: string;
  practiceObserve: string;
  practiceOptions?: { flag: string; meaning: string }[];
  hints: [string, string, string, string, string];
  checkLimit: string;
  codecGuide?: boolean;
  furtherReading?: { title: string; pages: string[] };
  nativeExplanation?: string[];
};
export type CourseCopy = {
  title: string;
  intro: string;
  chapters: Record<Chapter, { title: string; summary: string }>;
  pages: Record<string, PageCopy>;
};
