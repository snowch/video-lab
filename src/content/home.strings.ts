// Copyright © 2026 Christopher Snow
import { chapterTitles } from "../course/strings";
export const home = {
  title: "Video Lab",
  subtitle: "From Frames to Finished Demos",
  eyebrow: "A practical course in software-demo editing",
  intro:
    "Learn to make a short software demo that another person can follow. Use real FFmpeg and ffprobe commands to inspect and change media, then judge what the viewer can understand. Work with the provided Mousepad recording or import your own source.",
  audienceTitle: "Who this course is for",
  audience:
    "For software and data engineers familiar with terminals, browsers and files. No video knowledge is assumed. Media concepts are introduced beside the operation that needs them. On phones and tablets, the optional command builder helps with typing while keeping the actual command visible.",
  outcomeTitle: "A complete first demo",
  outcome:
    "Plan a visible change, inspect the recording and compare edits before choosing a deliverable. A separate picture-and-sound experiment explains how media is constructed. Finish with an actual downloaded video, its execution recipe and a review of what works for its intended viewer. Processing stays on your device.",
  start: "Start chapter 1",
  planTitle: "Chapters",
  planNote:
    "These five chapters form the available course. Each combines explanation, visual investigation and independent practice. Reference labs deepen the related chapters; optional guides help with recording. Later topics are listed separately as planned.",
};

export const modules = [
  {
    id: 0,
    title: chapterTitles.capture,
    summary:
      "Choose a recording, identify its starting state, action and result, and write a brief for the person who will watch it.",
    route: "capture",
    available: true,
  },
  {
    id: 1,
    title: chapterTitles.build,
    summary:
      "Predict a picture schedule, encode and measure it, then combine pictures and sound while explaining what each operation changes.",
    route: "build",
    available: true,
  },
  {
    id: 2,
    title: chapterTitles.inspect,
    summary:
      "Read the actual file evidence and distinguish what duration, streams and picture details establish from what still needs replay.",
    route: "inspect",
    available: true,
  },
  {
    id: 3,
    title: chapterTitles.edit,
    summary:
      "Compare what different cuts explain, make your own timed edit and justify its context, action and reading time.",
    route: "edit",
    available: true,
  },
  {
    id: 4,
    title: "Make the action readable",
    summary: "Plan better framing, pacing, zoom and minimal callouts.",
    route: undefined,
    available: false,
  },
  {
    id: 5,
    title: "Make the sound clear",
    summary: "Inspect and improve narration, sound levels and timing.",
    route: undefined,
    available: false,
  },
  {
    id: 6,
    title: "Compression and picture quality",
    summary:
      "Compare encoded file size, picture detail and the readability of small text.",
    route: undefined,
    available: false,
  },
  {
    id: 7,
    title: "Captions, overlays and automation",
    summary:
      "Add explanatory captions and overlays through reproducible processing.",
    route: undefined,
    available: false,
  },
  {
    id: 8,
    title: chapterTitles.publish,
    summary:
      "Download the intended output and its recipe, check actual playback and record the viewer evidence and remaining checks before sharing.",
    route: "publish",
    available: true,
  },
  {
    id: 9,
    title: "AI-assisted production",
    summary:
      "Review proposed transcripts, captions and edits against the actual recording.",
    route: undefined,
    available: false,
  },
  {
    id: 10,
    title: "Final project",
    summary:
      "Combine the later production techniques in a further complete demo and review.",
    route: undefined,
    available: false,
  },
] as const;
