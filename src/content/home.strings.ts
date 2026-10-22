// Copyright © 2026 Christopher Snow
export const home = {
  title: "Video Lab",
  subtitle: "Record, Understand, Edit, Publish",
  eyebrow: "A practical course for technical demo makers",
  intro:
    "A useful software demo lets viewers follow an action and understand its result. This course takes you from a first screen recording to a finished, verified demo: capture it, understand the file, inspect and edit it, then publish a version you have checked.",
  audienceTitle: "Who this course is for",
  audience:
    "For software and data engineers who want to make clearer demos. You need ordinary file handling, a browser and basic code or terminal familiarity. No video editing vocabulary is assumed.",
  outcomeTitle: "What you can do here",
  outcome:
    "Record a real screen demonstration, build a video file from real pictures and sound, inspect your own recording, cut and improve it, and finish with a shareable file you have verified. Every exercise runs on real files in your browser.",
  start: "Start with capture",
  planTitle: "Course plan",
  planNote:
    "Modules 0 to 3 are available. The remaining modules describe the planned curriculum and are labelled planned until implemented.",
};

export const modules = [
  {
    id: 0,
    title: "Capture your first software demo",
    summary:
      "Record one visible software action with a real browser recorder, replay and download it.",
  },
  {
    id: 1,
    title: "How a video file is created",
    summary:
      "Build a real MP4 from pictures and sound with FFmpeg in your browser, then probe the result.",
  },
  {
    id: 2,
    title: "Inspect real media",
    summary:
      "Read container, stream, timing and codec evidence from a real recording.",
  },
  {
    id: 3,
    title: "Cutting and joining",
    summary:
      "Remove dead time, compare copy and encoded cuts, and arrange clips into a clear story.",
  },
  {
    id: 4,
    title: "Make the action readable",
    summary: "Crop, zoom and pace the picture so small text stays legible.",
  },
  {
    id: 5,
    title: "Make the sound clear",
    summary: "Measure and improve the sound in a real recording.",
  },
  {
    id: 6,
    title: "Compression and picture quality",
    summary:
      "Compare real encodes and choose settings that keep text readable.",
  },
  {
    id: 7,
    title: "Captions and overlays",
    summary: "Add understandable captions and minimal callouts to a demo.",
  },
  {
    id: 8,
    title: "Export, publish and verify",
    summary:
      "Produce a deliverable and verify playback, sound and size before sharing.",
  },
  {
    id: 9,
    title: "AI-assisted production (optional)",
    summary:
      "Evaluate assisted transcripts and cuts against the explanation you intend.",
  },
  {
    id: 10,
    title: "Final project",
    summary:
      "Produce a complete concise demo with a reproducible edit recipe and a viewer-centred review.",
  },
] as const;
