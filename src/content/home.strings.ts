// Copyright © 2026 Christopher Snow
export const home = {
  title: "Video Lab",
  subtitle: "From Frames to Finished Demos",
  eyebrow: "A practical course for technical demo makers",
  intro:
    "A useful software demo lets viewers follow an action and understand its result. Editing starts with knowing what you recorded. Inspect a short screen recording, trace its pictures and sound, and locate a picture by its presentation time.",
  audienceTitle: "Who this course is for",
  audience:
    "For software and data engineers who want to make clearer demos. You need ordinary file handling, a browser and basic code or terminal familiarity. No video editing vocabulary is assumed.",
  outcomeTitle: "What you can do here",
  outcome:
    "Module 0 is a complete lesson with a real recording and an inspection challenge. Learn to distinguish the file container, the streams inside it and their codecs before deciding where to cut.",
  start: "Start Module 0",
  planTitle: "Course plan",
  planNote:
    "Only Module 0 is available. The remaining modules describe the planned curriculum.",
};

export const modules = [
  {
    id: 0,
    title: "What is a digital video?",
    summary:
      "Inspect pictures, sound, presentation times and the structure of a recording.",
  },
  {
    id: 1,
    title: "How FFmpeg sees media",
    summary:
      "Read media inspection output and choose input and output streams.",
  },
  {
    id: 2,
    title: "Cutting and joining",
    summary:
      "Choose cut points and understand how timing affects joined recordings.",
  },
  {
    id: 3,
    title: "Compression and quality",
    summary:
      "Compare file size, picture detail and the readability of screen text.",
  },
  {
    id: 4,
    title: "Editing for understanding",
    summary: "Use pacing, framing and callouts to explain a technical action.",
  },
  {
    id: 5,
    title: "Audio",
    summary: "Inspect and improve the clarity of narration and other sound.",
  },
  {
    id: 6,
    title: "Filters and compositing",
    summary: "Combine picture changes, overlays, images and subtitles.",
  },
  {
    id: 7,
    title: "Publish and deliver",
    summary: "Choose an export format and check the result before sharing.",
  },
  {
    id: 8,
    title: "AI-assisted editing",
    summary:
      "Review suggested transcripts, captions and cuts against the explanation you intend.",
  },
  {
    id: 9,
    title: "Final project",
    summary:
      "Turn a raw technical recording into a concise demo with repeatable editing steps.",
  },
] as const;
