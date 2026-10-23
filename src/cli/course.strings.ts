// Copyright © 2026 Christopher Snow
export const courseUI = {
  setup: "Files and recording",
  nativeTools: "FFmpeg and ffprobe commands",
  sourceFiles: "Source files",
  publishFiles: "Review and download files",
  limits:
    "The workspace holds up to 12 working files (media, reports and notes) plus 12 recipes: 24 files and 32 MiB in total. Each file must be nonempty and at most 20 MiB. Each processing operation has a 120-second limit. Use filenames of up to 80 letters, digits, dots, hyphens or underscores, beginning with a letter or digit. Output names are limited to 68 characters to leave room for the recipe filename.",
  source: "Selected source",
  noSource: "No source selected",
  nativeOnly:
    "Enter an ffmpeg or ffprobe command. Use the app controls for files, recording and exercise checks.",
  builder: "Build command",
  manual: "Type command",
  useCommand: "Use this command",
  replaceQuestion:
    "Replace the command you are editing? Your previous draft can be restored.",
  replace: "Replace draft",
  keepDraft: "Keep my draft",
  restore: "Restore previous draft",
  feedback: "Workspace feedback",
  diagnostics: "Browser diagnostics",
  noDiagnostics: "No processing diagnostics yet.",
  cancel: "Cancel",
  clear: "Clear output",
  record: "Record screen",
  recordAudio: "Record screen with shared sound",
  stop: "Stop recording",
  recordAdvice:
    "Open an independent application and prepare one visible action before requesting screen sharing.",
  replay: "Replay",
  read: "Read",
  download: "Download",
  delete: "Delete",
  useSource: "Use as source",
  check: "Check artefact",
  referenceTools: "Hints, reference command and notes",
  hint: "Hint",
  solution: "Show reference command",
  progress: "Earlier achievements",
  noteName: "Note filename",
  noteText: "Note text",
  saveNote: "Save note",
  writeNote: "Write a note",
  comparisons: "Provided comparisons",
  builderIntro:
    "Edit the tool's arguments below. Where an argument follows an option, its label shows that option. Choose Apply to command, then read the complete command before running it. Type command lets you add or remove options.",
  tool: "Tool",
  argument: "Argument",
  apply: "Apply to command",
  builderError:
    "Start with an ffmpeg or ffprobe command whose quotes are closed, then edit its arguments.",
} as const;
export function browserAction(command: string) {
  const labels: Record<string, string> = {
    sample: "Use practice video",
    fixtures: "Load pictures and sound",
    import: "Import file",
    scene: courseUI.recordAdvice,
    capture: courseUI.record,
    "capture --audio": courseUI.recordAudio,
    stop: courseUI.stop,
    cancel: courseUI.cancel,
    ls: "View file inventory",
    progress: courseUI.progress,
    "reference inspect": "Load inspection source",
    "reference cuts": "Load cutting source",
    "reference build": "Load build comparison",
    "reference edit": "Load edit comparison",
    comparison: "Load optional comparison",
    help: "Using this workspace",
    "help all": "Using this workspace",
  };
  if (labels[command]) return labels[command];
  const [action, ...args] = command.split(" ");
  if (action === "check") return `${courseUI.check} ${args[1]}`;
  if (action === "hint") return `${courseUI.hint} ${args[1] ?? 1}`;
  if (action === "solution") return courseUI.solution;
  if (action === "note") return courseUI.writeNote;
  const label: Record<string, string> = {
    play: courseUI.replay,
    cat: courseUI.read,
    download: courseUI.download,
    rm: courseUI.delete,
    check: courseUI.check,
    hint: courseUI.hint,
    solution: courseUI.solution,
    note: courseUI.writeNote,
  };
  return `${label[action!] ?? action} ${args.join(" ")}`;
}
