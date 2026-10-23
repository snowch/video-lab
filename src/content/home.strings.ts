// Copyright © 2026 Christopher Snow
export const home = {
  title: "Video Lab",
  subtitle: "From Frames to Finished Demos",
  eyebrow: "A command-line lab for software demos",
  intro:
    "Use a browser command workspace to capture, inspect, edit and download a short software demo. Run actual FFmpeg and ffprobe commands, change their arguments and check the resulting files. A provided original recording supports the same editing path when screen capture is unavailable.",
  audienceTitle: "Who this course is for",
  audience:
    "For software and data engineers with ordinary terminal, browser and file familiarity. Commands are the main lab interface; media concepts and FFmpeg flags are explained as you use them. No video knowledge is assumed.",
  outcomeTitle: "A complete first demo",
  outcome:
    "Follow Capture, Build, Inspect, Edit and Publish in a shared command workspace. Build is a separate experiment with supplied pictures; your recording stays unchanged. Inspect and edit your chosen source with typed commands, then replay and download the actual output and execution recipe. The detailed command labs let you check real reports and decoded edits, with progressive hints and saved text notes. Processing stays local to your browser.",
  start: "Start with Capture",
  planTitle: "Your route through Video Lab",
  planNote:
    "All available labs use typed commands, including the detailed inspection and cutting references. Follow Capture, Build, Inspect, Edit and the initial Publish checkpoint. Modules 4–7 and 9–10 are planned. Reference checks grade actual executed reports and media; earlier answer-based achievements are preserved separately.",
};

export const modules = [
  {
    id: 0,
    title: "Capture your first software demo",
    summary:
      "Use capture, sample or import to establish a source, then replay and download it with commands.",
    route: "capture",
    available: true,
  },
  {
    id: 1,
    title: "How a video file is created",
    summary:
      "Type FFmpeg commands to encode supplied pictures, add synthetic sound and inspect the real MP4.",
    route: "build",
    available: true,
  },
  {
    id: 2,
    title: "Inspect and prepare real media",
    summary:
      "Run ffprobe against the exact workspace filename and compare its real report with your intended capture.",
    route: "inspect",
    available: true,
  },
  {
    id: 3,
    title: "Cut and join: tell the story",
    summary:
      "Write trim and join commands, inspect their actual outputs and keep the source-hashed execution recipe.",
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
