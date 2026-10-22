// Copyright © 2026 Christopher Snow
export const b = {
  lessonNumber: "MODULE 1 / BUILD A VIDEO FILE",
  title: "Build a video file from real pictures and sound",
  objectives: [
    "Encode a numbered sequence of real pictures into a playable video-only MP4 in your browser.",
    "Mux that video with real sound so the file has picture and audio.",
    "Probe the produced file and read the measured result: compression, size, duration and picture count.",
  ],
  sections: {
    question: "Where does a video file come from?",
    motivation: "Build one from four real pictures",
    prediction: "Predict what the encoder will report",
    investigation: "Probe the file you built",
    construction: "Add the sound",
    failureExperiment: "When the encoder cannot run here",
    explanation: "What encoding, muxing and probing did",
    generalisation: "Building files is reproducible",
    challenge: "Predict the probe result",
    reflection: "Note what the build taught you",
  },
  captions: {
    filmstrip:
      "The four original pictures the encoder turns into a video: the initial build queue, the Sort action, the sorted result and the held result.",
    encoder:
      "A real FFmpeg.wasm encoder running in this page. It writes your four pictures and the tone into an MP4, then probes the result. Nothing is pre-rendered.",
    mux: "The same encoder adds the sound to the video you built and probes the result again.",
    fallback:
      "Pre-generated results of the same commands, labelled as pre-generated. They are shown only when this browser cannot run the encoder, and they are not your run.",
    challenge:
      "Predict the probe values for the file you will build, then run the encoder and compare.",
    reflection: "Optional notes for your next build; these are not graded.",
  },
  filmstripLabel: "The four source pictures (960 × 540 each)",
  frameLabels: [
    "0 s — initial queue",
    "1 s — the Sort action",
    "2 s — sorted result",
    "3 s — held result",
  ],
  rateLabel: "Pictures per second",
  rate1: "1 (one picture per second)",
  rate2: "2 (two pictures per second)",
  run: "Build the video",
  runMux: "Add the sound and rebuild",
  cancel: "Cancel",
  retry: "Run again",
  useFallback: "Show the pre-generated result instead",
  statusIdle: "Ready. Nothing has run yet.",
  statusLoading:
    "Loading the encoder (about 31 MB, downloaded once, only because you pressed Run)...",
  statusRunning: "Encoding in your browser...",
  statusDone:
    "Done. The results below are measured from the file this run produced.",
  statusFailed: "The encoder failed in this browser.",
  statusCancelled: "Cancelled. No file was produced.",
  commandLabel: "The exact command this run executed",
  probeLabel: "What the probe measured in the produced file",
  probeEmpty: "No probe output.",
  producedLabel: "Your produced file",
  download: "Download the MP4",
  fallbackNote:
    "These files were generated in advance by running the same commands with desktop FFmpeg. They are real outputs of those commands, but they are not your run: the lesson labels them so no one mistakes them for a new build.",
  size: "File size",
  duration: "Duration",
  pictures: "Pictures",
  pictureCodec: "Picture compression",
  soundCodec: "Sound format",
  resolution: "Resolution",
  audioRate: "Sound rate",
  channels: "Sound tracks",
  formatName: "File format",
  videoOnly: "Video only",
  audioVideo: "Picture and sound",
  lazyNote:
    "The encoder core is downloaded only when you press Run. Reading this lesson, or leaving this page, never downloads it.",
  wasmNote:
    "This encoder is FFmpeg compiled to WebAssembly (ffmpeg.wasm), running in a worker inside your browser. It is real FFmpeg 5.1.4 on the pinned single-thread core; the commands shown are the exact commands it ran.",
  probeToolNote:
    "The probe is the same FFmpeg build's inspection tool, run in the same worker; its JSON output is parsed and shown above.",
  challengeTitle: "Predict the probe",
  fieldLabels: {
    pictures: "Pictures in the video-only file (at 1 picture per second)",
    duration: "Duration of the video-only file, seconds",
    size: "Approximate file size of the video-only file, bytes",
    muxCodec: "Sound format after muxing",
  },
  feedback: {
    pictures:
      "Count the source pictures: the filmstrip has four, and each becomes one picture in the video. Check the probed picture count after a run.",
    duration:
      "At one picture per second, four pictures span four seconds. The probed duration is measured, not assumed; run the build and compare.",
    size: "The encoder's exact byte count depends on the content and the encoder settings, so a range is expected: the lesson's own run measured tens of kilobytes. Compare your prediction with the measured size after a run.",
    muxCodec:
      "Muxing copies the pictures and compresses the sound as AAC, because MP4 commonly carries AAC audio. Check the probed sound format after the mux run.",
  },
  hints: [
    "Count the source pictures before you predict: how many stills does the filmstrip contain?",
    "One picture per second means the picture count and the duration in seconds are the same number.",
    "File size is content-dependent; predict an order of magnitude, then read the measured size.",
    "The mux step copies the pictures and compresses the sound; read which sound format the probe reports.",
    "Reference: 4 pictures; 4.0 seconds; tens of kilobytes (the lesson's own run measured 34,473 bytes); AAC.",
  ],
  modelNote:
    "The encoder, the produced MP4 and the probe are real FFmpeg.wasm computations on real bytes in this browser. The filmstrip is a static display of the four source pictures; it does not animate them.",
  modelVsReality:
    "The encoder runs real FFmpeg 5.1.4 (ffmpeg.wasm) in a worker and writes a real MP4 you can play and download. The probe results are parsed from that run's real inspection output. The pre-generated fallback is shown only when the encoder cannot run, and is labelled as pre-generated.",
  originality: {
    textbookExample:
      "A single pasted ffmpeg command with a canned screenshot of its output.",
    howThisDiffers:
      "Run the real encoder in the browser on original pictures, read the probe of the file your own run produced, and compare your prediction with the measured result.",
  },
} as const;
