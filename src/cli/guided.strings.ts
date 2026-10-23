// Copyright © 2026 Christopher Snow
export const guided = {
  currentTask: "Current task",
  task: "Task",
  of: "of",
  next: "Next task",
  previous: "Previous task",
  navigation: "All tasks",
  usage: "Using the command workspace",
  background: "Background and explanation",
  scope:
    "Type commands against files in this browser workspace. Processing stays local; these are not your computer's folders.",
  keyboard:
    "Enter runs one command. Shift+Enter continues that command on another line.",
  manualNavigation:
    "Use Next task when you are ready. It changes the instructions; check the command output yourself before moving on.",
  helpIntro: "Commands for the current task:",
  helpBasics:
    "Run one command at a time. ls lists exact filenames; play FILE replays media; download FILE saves a copy. cancel discards active work; stop finishes a recording. Next task changes instructions without running a command.",
  helpAll: "Type help all for the complete workspace command list.",
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
  capture: {
    getSource: "Get a source recording",
    getSourceIntro:
      "Choose one way to get the original file you will edit: record an action, load the provided example, or import an existing recording. Run the commands for your chosen path only. If you already have a suitable file, continue to list its name.",
    recordChoice: "Record an action",
    sampleChoice: "Use the provided recording",
    importChoice: "Import an existing recording",
    recordIntro:
      "Open the scene, request recording, then stop after showing the action and a readable result. Each command runs separately; the browser asks which surface to share.",
    unsupported:
      "Screen recording is unavailable in this browser. Choose the provided recording or import your own file. You still type the command to load it.",
    sampleIntro:
      "Run sample to load the provided original as capture.mp4. It shows the build queue's Sort action and contains a quiet synthetic tone, not narration. This is supplied media, not a recording you made.",
    importIntro:
      "Run import to choose an existing recording from this device. Its actual filename is kept and its contents stay local. Use a simple filename and a file no larger than 20 MiB. No recording is created or uploaded by importing it.",
    existingSource:
      "Keep an existing source if it is the file you want to edit. sample will refuse to replace capture.mp4; importing also preserves an existing file with the same name.",
    recordingDetailTitle: "How browser recording works",
    recordingDetails: [
      "Run scene to open the original build queue in a new tab. Return here and run capture, then choose that scene's tab or window in the browser's sharing dialog. In the scene, show the initial state, click Sort and hold the result long enough to read. Return here and run stop to finish and keep the recording.",
      "Before sharing, close unrelated notifications and windows, check for sensitive material and make the text readable. Aim for about 5–15 seconds. Capture stops after 15 seconds and rejects output above 20 MiB. cancel discards active capture instead of keeping it.",
      "Sound is off by default. capture --audio requests sound from the shared tab or screen, not microphone narration. Your browser and chosen surface may supply no audio. Intentional silence is valid.",
      "capture uses the browser's screen-sharing and recording facilities, not FFmpeg desktop capture. The resulting file may be WebM or MP4; its name can gain a number to preserve earlier recordings. Run ls to find the actual name before playing or downloading it.",
    ],
    listFiles: "Find your recording's exact name",
    listIntro:
      "Run ls and find the recording you chose. Read its exact filename, size and origin. The provided file is capture.mp4; your own recording or import may have another name. Keep using that actual name in later commands.",
    replaySource: "Replay the source recording",
    replayIntro:
      "Run play with the filename from ls. If the example uses capture.mp4, replace it with your actual name when different. Check the starting state, action and readable result; check sound only if you intended it.",
    keepCopy: "Download a source copy",
    keepCopyIntro:
      "Run download with that same filename and keep the copy outside browser storage. Replay before moving on: does the viewer have enough context, can they follow the action, and is the result held long enough to read? Build uses separate supplied pictures; your source stays unchanged.",
  },
} as const;
