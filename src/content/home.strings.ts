// Copyright © 2026 Christopher Snow
export const home = {
  title: "Video Lab",
  subtitle: "From Frames to Finished Demos",
  eyebrow: "A command-line lab for software demos",
  intro:
    "Make a short software demo with real FFmpeg and ffprobe commands. Type commands or compose them with the command builder, then read the tools' output and check the resulting files. Browser controls handle recording, imports, replay and downloads. A provided Mousepad recording supports the same editing path when capture is unavailable.",
  audienceTitle: "Who this course is for",
  audience:
    "For software and data engineers with ordinary terminal, browser and file familiarity. Media concepts and FFmpeg options are explained as you use them. The optional command builder helps with typing on phones and tablets while keeping the real command visible. No video knowledge is assumed.",
  outcomeTitle: "A complete first demo",
  outcome:
    "Follow Get video, Inspect, Edit, Build and Publish in a shared workspace. Build is a separate experiment with supplied pictures; your project source stays unchanged. Inspect and edit the chosen source, then replay and download your output and its execution recipe. Detailed reference labs add checked reports and edits, progressive hints and saved notes. Processing stays on your device.",
  start: "Get a video",
  planTitle: "Your route through Video Lab",
  planNote:
    "All available labs use real FFmpeg and ffprobe commands, with an optional command builder. Follow Get video, Inspect, Edit, Build and the initial Publish checkpoint. Detailed reference checks use separate controlled media and actual execution evidence; earlier answer-based achievements remain available. Further production lessons are planned.",
};

export const modules = [
  {
    id: 0,
    title: "Choose your source video",
    summary:
      "Record an independent application, use the practice video or import a source. Replay it and keep a downloaded copy.",
    route: "capture",
    available: true,
  },
  {
    id: 1,
    title: "How a video file is created",
    summary:
      "Use FFmpeg to encode three supplied Mousepad pictures, add synthetic sound and inspect the real MP4.",
    route: "build",
    available: true,
  },
  {
    id: 2,
    title: "Inspect and prepare real media",
    summary:
      "Run ffprobe on your selected source and compare its media summary with the recording you intended.",
    route: "inspect",
    available: true,
  },
  {
    id: 3,
    title: "Cut and join: tell the story",
    summary:
      "Write trim and join commands, inspect their outputs and keep the execution recipe with its source-file hashes.",
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
