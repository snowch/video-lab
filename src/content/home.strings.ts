// Copyright © 2026 Christopher Snow
export const home = {
  title: "Video Lab",
  subtitle: "From Frames to Finished Demos",
  eyebrow: "Make a short software demo",
  intro:
    "Capture one visible software action, inspect the recording, cut the waiting and keep a readable result. Finish with a playable MP4 and the recipe used to make it. A provided original recording lets you follow the same editing path when screen capture is unavailable.",
  audienceTitle: "Who this course is for",
  audience:
    "For software and data engineers who want to explain a task through a short demo. You need ordinary browser and file skills; terminal and code familiarity help with optional command evidence. No video vocabulary is assumed.",
  outcomeTitle: "A complete first demo",
  outcome:
    "Follow Capture, Build, Inspect, Edit and Publish. Build is a separate experiment with supplied pictures that explains file structure; your recording remains the project source. Inspect and edit that source, then review and download the actual output. Processing runs locally in your browser.",
  start: "Start with Capture",
  planTitle: "Your route through Video Lab",
  planNote:
    "Capture, Build, Inspect, Edit and the initial Publish checkpoint are available. Modules 4–7 and 9–10 are planned. The detailed recording and cutting references remain within Inspect and Edit.",
};

export const modules = [
  {
    id: 0,
    title: "Capture your first software demo",
    summary:
      "Record one action, replay it and keep a source file, or adopt the provided original recording.",
    route: "capture",
    available: true,
  },
  {
    id: 1,
    title: "How a video file is created",
    summary:
      "Build a separate picture-sequence experiment, then add synthetic sound and inspect the real MP4.",
    route: "build",
    available: true,
  },
  {
    id: 2,
    title: "Inspect and prepare real media",
    summary:
      "Measure your selected recording and compare its contents with what you intended to capture.",
    route: "inspect",
    available: true,
  },
  {
    id: 3,
    title: "Cut and join: tell the story",
    summary:
      "Keep the action and readable result, create an actual edited MP4 and save its recipe.",
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
    title: "Export, publish and verify",
    summary:
      "Finish the initial demo: replay the output, download the MP4 and recipe, and check them before sharing.",
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
