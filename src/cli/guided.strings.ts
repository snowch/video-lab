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
    "Run FFmpeg or ffprobe against files in this browser workspace. Use the app controls to load, replay and download files; processing stays on this device.",
  keyboard:
    "Enter runs one command. Shift+Enter continues that command on another line.",
  manualNavigation:
    "Use Next task when you are ready. It changes the instructions; review your files and any output before moving on.",
  helpIntro: "Commands for the current task:",
  helpBasics:
    "Run one media command at a time. Files shows exact names; Replay opens media and Download saves a copy. Cancel discards active work; Stop recording keeps the recording. Next task changes the instructions without running a command.",
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
  capture: {
    getSource: "Get a source recording",
    getSourceIntro:
      "Choose one source: record an action in an independent application, use the practice video or import an existing recording. If you already have a suitable workspace file, choose Use as source beside it.",
    recordChoice: "Record screen",
    sampleChoice: "Use practice video",
    importChoice: "Import file",
    recordIntro:
      "Prepare one action in an independent application. Choose Record screen and select its window or tab, show the action and hold the result. Choose Stop recording to keep it.",
    unsupported:
      "Screen recording is unavailable in this browser. Choose Use practice video or Import file.",
    sampleIntro:
      "Use practice video loads a twelve-second recording of Find and Replace in Mousepad, an independent text editor. It replaces staging with production in a fictional configuration file. The supplied recording has no sound.",
    importIntro:
      "Import file opens your device's file chooser. Choose a recording no larger than 20 MiB. Its contents stay local; any workspace filename change is shown before you use it in commands.",
    existingSource:
      "Keep an existing source if it is the file you want to edit. Use Files to check its exact name and origin before choosing Use as source.",
    recordingDetailTitle: "How browser recording works",
    recordingDetails: [
      "Prepare an independent application with a visible starting state. Choose Record screen and select its window or tab in the browser's sharing dialog. Perform one action, hold the result long enough to read, then return here and choose Stop recording.",
      "Before sharing, close unrelated notifications and windows, check for sensitive material and make the text readable. Aim for about 5–15 seconds. Recording stops after 15 seconds and rejects output above 20 MiB. Cancel discards an active recording.",
      "Record screen captures pictures without sound. Record screen with shared sound requests audio from the selected surface, not a microphone; the browser may provide none. Plan an action a viewer can follow, and check any intended sound in replay.",
      "Record screen uses the browser's sharing and recording facilities. FFmpeg processes the saved file afterwards. The result may be WebM or MP4; check its exact name in Files before replaying or downloading it.",
    ],
    listFiles: "Find your recording's exact name",
    listIntro:
      "Open Files and find the recording you chose. Read its exact filename, size and origin. The practice recording starts as mousepad-demo.mp4; your file may have another name. Use the selected source's actual name in later commands.",
    replaySource: "Replay the source recording",
    replayIntro:
      "Choose Replay beside your source file. Check the starting state, action and readable result; check sound only if you intended it.",
    keepCopy: "Download a source copy",
    keepCopyIntro:
      "Choose Download beside that same source file and keep the copy outside browser storage. Can a viewer follow the action and read the result? Build uses separate supplied pictures; your source stays unchanged.",
  },
} as const;
