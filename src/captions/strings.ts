// Copyright © 2026 Christopher Snow
export const ca = {
  lessonNumber: "MODULE 7 / CAPTIONS AND OVERLAYS",
  title: "Captions and overlays",
  objectives: [
    "Read a real SRT caption source and see what its timings mean.",
    "Compare burned-in captions with a caption track inside the file.",
    "Burn your own captions into a recording with real FFmpeg.wasm.",
  ],
  sections: {
    question:
      "What does a viewer who cannot hear — or cannot read fast — need?",
    motivation: "Watch the same recording with and without captions",
    prediction: "Predict where the caption text sits and how big it is",
    investigation: "Read the caption source and compare two encodes",
    construction: "Burn your own captions into the recording",
    failureExperiment: "When the caption is too small to read",
    explanation: "What a caption track is, and what burning in means",
    generalisation: "Caption and overlay habits for screen demos",
    challenge: "Choose the caption style a viewer can read",
    reflection: "Note your caption rule",
  },
  captions: {
    players:
      "The original recording plays first, then the same recording with three real captions burned into the picture. Watch the bottom of the frame.",
    srt: "The real caption source file (SRT format): three cues with start and end times, covering the whole 10-second recording.",
    editor:
      "A real FFmpeg.wasm burn in this browser. The caption source and a font are written into the worker, the subtitles filter renders the captions onto the labelled original recording, and the produced MP4 plays in the page.",
    small:
      "The same captions burned into a 640 × 360 encode: the caption text that was readable at 960 × 540 becomes small and hard to read.",
    challenge:
      "Choose the caption style a viewer can read, then burn your own.",
    reflection:
      "Optional notes for your next captioned demo; these are not graded.",
  },
  files: {
    plain: {
      file: "build-queue.mp4",
      label: "The original recording (no captions)",
    },
    captioned: {
      file: "edit/captioned.mp4",
      label: "The same recording with captions burned in",
    },
    small: {
      file: "edit/captioned-small.mp4",
      label: "Captions burned in, then scaled to 640 × 360",
    },
    callout: {
      file: "edit/callout.mp4",
      label: "A persistent overlay: a callout label stays on screen",
    },
    timed: {
      file: "edit/timed-callout.mp4",
      label:
        "A timed overlay: the callout appears only between 3 and 5 seconds",
    },
  },
  srtFile: "edit/captions.srt",
  srtLabel: "The caption source (SRT)",
  srtAlt: "The caption source file, shown as text",
  downloadSrt: "Download the SRT",
  cuesLabel: "Cues in this source",
  cueRow: (index: number, text: string, start: string, end: string) =>
    `Cue ${index}: “${text}” from ${start} to ${end}`,
  burn: "Burn the captions into the recording",
  cancel: "Cancel",
  statusIdle: "Ready. Nothing has run yet.",
  statusLoading:
    "Loading the encoder (downloaded once, only because you pressed Burn)...",
  statusRunning: "Burning the captions in your browser...",
  statusDone: "Done. The captioned file below is the one this run produced.",
  statusFailed: "The encoder failed in this browser.",
  produced: "Your produced file",
  download: "Download the MP4",
  size: "File size",
  bytes: "bytes",
  duration: "Duration",
  commandLabel: "The exact command this run executed",
  writtenLabel: "Files written into the worker for this run",
  unavailable:
    "This browser cannot run the encoder. The recorded captioned versions above still play, and their commands are shown beside them.",
  burnNote:
    "The burn writes the caption source and a font into the worker, then runs the real subtitles filter on the labelled original recording. The command and the produced file are reproducible.",
  fontNote:
    "The font is DejaVu Sans Bold (SIL Open Font License), bundled with the course so the burn works offline.",
  challengeTitle: "Choose the caption style a viewer can read",
  fieldLabels: {
    readable: "Which captioned version keeps the caption text readable?",
    track:
      "Why is a caption track inside the file not the same as burned-in captions?",
  },
  options: {
    readable: {
      full: "960 × 540 with captions burned in",
      small: "640 × 360 with captions burned in",
      none: "The original recording with no captions at all",
    },
    track: {
      switchable:
        "A caption track travels inside the file: a player can switch it on or off or restyle it, but a player that ignores tracks shows nothing",
      burned:
        "Burned-in captions are pixels in the picture: every player shows them, but they can never be switched off or resized",
      copy: "A caption track is just a copy of the video with the text pasted on top",
    },
  },
  feedback: {
    readable:
      "Play the 960 × 540 and 640 × 360 captioned versions at the same display size and read the caption text at the bottom. At 960 × 540 the text is readable; at 640 × 360 it is not.",
    track:
      "A caption track is a separate timed text stream inside the file: players can show, hide or restyle it. Burned-in captions are drawn into the picture itself: always visible, never changeable. Each suits a different player.",
  },
  hints: [
    "Play both captioned versions at the same display size and read the caption text in each.",
    "The caption is drawn at a fixed pixel size before any scaling; scaling the picture down shrinks the caption with it.",
    "A caption track is data inside the file; burned-in captions are pixels in the picture.",
    "A player that does not support caption tracks shows nothing for them; burned-in captions show everywhere.",
    "Reference: 960 × 540 burned-in captions; a caption track is switchable but not guaranteed to display.",
  ],
  modelNote:
    "The burn runs are real FFmpeg.wasm subtitles-filter computations on real bytes in this browser. The comparison players play real recorded encodes; the SRT source is the real file used to make them.",
  modelVsReality:
    "The burn runs as real FFmpeg 5.1.4 (ffmpeg.wasm) in a worker, rendering the real SRT source onto the labelled original recording with the bundled DejaVu Sans Bold font. The comparison players play real recorded encodes made with desktop FFmpeg from the same source; their commands are shown beside them.",
  originality: {
    textbookExample:
      "A static screenshot of a captioned player with no caption source shown and no burn run.",
    howThisDiffers:
      "Read the real SRT source, play real captioned encodes at two sizes, and burn your own captions into the recording in the browser.",
  },
} as const;
