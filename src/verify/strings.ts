// Copyright © 2026 Christopher Snow
export const v = {
  lessonNumber: "MODULE 8 / EXPORT, PUBLISH AND VERIFY",
  title: "Export, publish and verify",
  objectives: [
    "Produce a final export with the settings you chose, in the browser.",
    "Verify a real file with real probes: streams, duration, size, sound.",
    "Judge whether a finished file is actually ready to publish.",
  ],
  sections: {
    question: "The file plays on your machine — is it actually ready to share?",
    motivation: "Three candidate exports of the same demo",
    prediction: "Predict which candidate will pass every check",
    investigation: "Probe the three real candidates",
    construction: "Produce and verify your own export",
    failureExperiment: "When a file plays but is not shareable",
    explanation: "What a verification pass actually proves",
    generalisation: "A publish checklist for screen demos",
    challenge: "Judge the broken candidate",
    reflection: "Note your publish checklist",
  },
  captions: {
    players:
      "Three real candidate exports of the same recording play below: the plain original, a captioned crop-and-zoom, and a half-size re-encode. All are real files.",
    probes:
      "Real ffprobe facts for each candidate: streams, resolution, duration and size. These are measured, not typed in.",
    editor:
      "A real FFmpeg.wasm run in this browser: it re-encodes the labelled original recording at the resolution and quality you choose, then probes the produced file and reports the measured facts.",
    broken:
      "A real file that plays but fails a check: the video stream is missing entirely. Watch what the probe says about it.",
    challenge:
      "Judge which candidate is broken and say which check catches it.",
    reflection: "Optional notes for your next publish; these are not graded.",
  },
  candidates: {
    plain: {
      file: "build-queue.mp4",
      label: "The plain original (960 × 540, no captions)",
      bytes: 128737,
      duration: 10.0,
      streams: "video h264 960 × 540 + audio aac 48 kHz mono",
    },
    captioned: {
      file: "edit/captioned.mp4",
      label: "Captioned crop-and-zoom (960 × 540, captions burned in)",
      bytes: 139560,
      duration: 10.005,
      streams: "video h264 960 × 540 + audio aac 48 kHz mono",
    },
    half: {
      file: "edit/half-size-crf23.mp4",
      label: "Half-size re-encode (640 × 360, CRF 23)",
      bytes: 113187,
      duration: 10.005,
      streams: "video h264 640 × 360 + audio aac 48 kHz mono",
    },
  },
  brokenFile: "edit/video-only.mp4",
  brokenLabel: "A file with no audio stream (video only)",
  play: "Play",
  width: "Output width, pixels",
  height: "Output height, pixels",
  crf: "Quality setting (CRF)",
  export: "Export at these settings",
  cancel: "Cancel",
  statusIdle: "Ready. Nothing has run yet.",
  statusLoading:
    "Loading the encoder (downloaded once, only because you pressed Export)...",
  statusRunning: "Exporting in your browser...",
  statusDone:
    "Done. The facts below are measured from the file this run produced.",
  statusFailed: "The encoder failed in this browser.",
  produced: "Your produced file",
  download: "Download the MP4",
  size: "File size",
  bytes: "bytes",
  duration: "Duration",
  resolution: "Resolution",
  streams: "Streams",
  audio: "Audio",
  video: "Video",
  commandLabel: "The exact command this run executed",
  probeCommandLabel: "The probe command this run executed",
  streamRow: (kind: string, detail: string) => `${kind}: ${detail}`,
  noStream: "none",
  unavailable:
    "This browser cannot run the encoder. The recorded candidates and their measured facts still show, and the commands are shown beside each result.",
  note: "The export runs a real FFmpeg.wasm re-encode of the labelled original recording, then probes the produced file with a real ffprobe run. The facts are measured from the produced bytes.",
  tableLabel: "Measured facts of the recorded candidates",
  fileLabel: "Candidate",
  challengeTitle: "Judge the broken candidate",
  fieldLabels: {
    broken: "Which candidate fails a publish check?",
    check: "Which check catches the failure?",
  },
  options: {
    broken: {
      plain: "The plain original",
      captioned: "The captioned crop-and-zoom",
      videoOnly: "The video-only file (no audio stream)",
    },
    check: {
      streams:
        "The stream probe: the file has a video stream but no audio stream",
      size: "The size check: the file is smaller than expected",
      playback: "The playback check: the file does not play at all",
    },
  },
  feedback: {
    broken:
      "Probe each candidate's streams. The plain original, the captioned crop-and-zoom and the half-size re-encode all have a video stream and an audio stream. The video-only file has a video stream and no audio stream.",
    check:
      "A file that plays can still be unshareable: the stream probe lists what the file actually contains. The video-only file plays fine but has no audio stream, so the probe's stream list is the check that catches it.",
  },
  hints: [
    "Play each candidate, then read its measured stream list in the table.",
    "A publish check asks what the file contains, not just whether it plays.",
    "Count the streams: a shareable demo needs a video stream and an audio stream.",
    "The video-only candidate plays normally; only the probe shows the missing audio stream.",
    "Reference: the video-only file; the stream probe catches it.",
  ],
  modelNote:
    "The export and probe runs are real FFmpeg.wasm computations on real bytes in this browser. The candidate players play real recorded files; the table's facts are real ffprobe measurements.",
  modelVsReality:
    "The export runs as real FFmpeg 5.1.4 (ffmpeg.wasm) in a worker on the labelled original recording, and the produced file is probed with a real ffprobe run in the same worker. The candidate players play real recorded files made with desktop FFmpeg; their measured facts are shown beside them.",
  originality: {
    textbookExample:
      "A static publish checklist with no file probed and no export produced.",
    howThisDiffers:
      "Play real candidate exports, read their measured probe facts, produce your own export in the browser and verify it with a real probe run.",
  },
} as const;
