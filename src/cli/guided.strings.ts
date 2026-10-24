// Copyright © 2026 Christopher Snow
export const guided = {
  currentTask: "Step",
  task: "Task",
  of: "of",
  next: "Next step",
  previous: "Back",
  navigation: "Lesson steps",
  usage: "Using the command workspace",
  background: "Background and explanation",
  scope:
    "Run FFmpeg or ffprobe against files in this browser workspace. Use the app controls to load, replay and download files; processing stays on this device.",
  keyboard:
    "Enter runs one command. Shift+Enter continues that command on another line.",
  manualNavigation:
    "Use Next task when you are ready. It changes the instructions; review your files and any output before moving on.",
  helpIntro: "Commands for the current task:",
  helpBasics:
    "Run one media command at a time. Files shows exact names; Replay opens media and Download saves a copy. Cancel discards active processing. Next task changes the instructions without running a command.",
  helpAll: "Open Using the command workspace for usage and limits.",
  taskTitles: {
    build: [
      "Load the supplied pictures and sound",
      "Encode the picture sequence",
      "Measure duration and change the rate",
      "Add synthetic sound",
      "Replay the combined file",
      "Review what changed",
    ],
    inspect: [
      "Find the source filename",
      "Inspect its streams and container",
      "Inspect packet timing if needed",
      "Compare the recording with your intention",
    ],
    edit: [
      "Make a cut with optional sound",
      "Join two picture ranges without sound",
      "Measure and replay the joined file",
      "Review your chosen edit",
    ],
    publish: [
      "Find your final output and recipe",
      "Replay the file you will share",
      "Download the edited MP4",
      "Download its execution recipe",
      "Verify the downloaded demo",
    ],
  },
} as const;
