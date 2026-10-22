// Copyright © 2026 Christopher Snow
export const q = {
  lessonNumber: "MODULE 6 / COMPRESSION AND PICTURE QUALITY",
  title: "Compression and picture quality",
  objectives: [
    "Compare real encodes of the same recording at different resolutions and quality settings.",
    "Read a measured file size and bitrate instead of guessing whether a file is small.",
    "Choose a resolution and a quality setting that keep text readable at playback size.",
  ],
  sections: {
    question:
      "Why is my demo file so large, and what would a smaller one cost?",
    motivation: "Watch the same action at three quality settings",
    prediction: "Predict the sizes before you measure them",
    investigation: "Compare the real encoded variants",
    construction: "Run your own re-encode",
    failureExperiment: "When the picture is too small to read",
    explanation: "What resolution, bitrate and CRF do",
    generalisation: "Choosing settings for a demo",
    challenge: "Choose the readable, right-sized version",
    reflection: "Note your compression rule",
  },
  captions: {
    players:
      "Three real encodes of the same recording at 640 × 360 with CRF 18, 23 and 35. All are real files you can play at the same display size.",
    stills:
      "Real extracted stills (at 6 seconds) from four encodes: three quality settings at 640 × 360, and one at 480 × 270 with the default setting. Compare the queue text in each.",
    editor:
      "A real FFmpeg.wasm re-encode in this browser. Choose the output resolution and the CRF quality setting, run it on the labelled original recording, and read the measured size and bitrate of the produced file.",
    small:
      "The recording at 480 × 270: a quarter of the pixels of the full frame. The queue text is barely readable here even though the quality setting is the default.",
    challenge:
      "Choose the version that stays readable and is reasonably small, then run a re-encode and check.",
    reflection: "Optional notes for your next export; these are not graded.",
  },
  variants: {
    crf18: {
      file: "edit/half-size-crf18.mp4",
      still: "edit/stills/half-size-crf18.jpg",
      label: "640 × 360, CRF 18 (high quality)",
      bytes: 121523,
      bitrate: 97169,
    },
    crf23: {
      file: "edit/half-size-crf23.mp4",
      still: "edit/stills/half-size-crf23.jpg",
      label: "640 × 360, CRF 23 (FFmpeg's default)",
      bytes: 113187,
      bitrate: 90504,
    },
    crf35: {
      file: "edit/half-size-crf35.mp4",
      still: "edit/stills/half-size-crf35.jpg",
      label: "640 × 360, CRF 35 (heavily compressed)",
      bytes: 100142,
      bitrate: 80073,
    },
    quarter: {
      file: "edit/quarter-size-crf23.mp4",
      still: "edit/stills/quarter-size-crf23.jpg",
      label: "480 × 270, CRF 23 (default quality, smaller picture)",
      bytes: 106019,
      bitrate: 84772,
    },
  },
  fullFrame: {
    file: "build-queue.mp4",
    still: "edit/stills/cropped-zoom.jpg",
    label: "960 × 540 (the original recording)",
    bytes: 128737,
    bitrate: 102989,
  },
  play: "Play",
  width: "Output width, pixels",
  height: "Output height, pixels",
  crf: "Quality setting (CRF)",
  crfNote:
    "Lower CRF means higher quality and a larger file; 23 is FFmpeg's default. CRF 18 is visually near-lossless for this content; CRF 35 is heavily compressed.",
  run: "Re-encode at these settings",
  cancel: "Cancel",
  statusIdle: "Ready. Nothing has run yet.",
  statusLoading:
    "Loading the encoder (downloaded once, only because you pressed Run)...",
  statusRunning: "Re-encoding in your browser...",
  statusDone:
    "Done. The facts below are measured from the file this run produced.",
  statusFailed: "The encoder failed in this browser.",
  produced: "Your produced file",
  download: "Download the MP4",
  size: "File size",
  bytes: "bytes",
  bitrate: "Measured bitrate",
  bitsPerSecond: "bits/s",
  resolution: "Resolution",
  duration: "Duration",
  commandLabel: "The exact command this run executed",
  unavailable:
    "This browser cannot run the encoder. The recorded comparisons above still work, and the commands are shown beside each result.",
  note: "The encoder core is downloaded only when you press Run. The run re-encodes the labelled original recording, so the command and result are reproducible.",
  tableLabel: "Measured facts of the recorded variants",
  fileLabel: "Encoded variant",
  stillAlt: (label: string) => `Still from the ${label} encode at 6 seconds`,
  challengeTitle: "Choose the readable, right-sized version",
  fieldLabels: {
    readable: "Which version keeps the queue text readable at playback size?",
    tradeoff: "Why is the smaller file not the better choice here?",
  },
  options: {
    readable: {
      half: "640 × 360 at the default quality (CRF 23)",
      quarter: "480 × 270 at the default quality (CRF 23)",
      full: "The full 960 × 540 frame",
    },
    tradeoff: {
      pixels:
        "The 480 × 270 file has a quarter of the pixels: the text is small and hard to read, even though the file is not much smaller",
      crf: "CRF 35 saves only a little size and visibly degrades the picture",
      codec:
        "A different codec would fix the size without changing the picture",
    },
  },
  feedback: {
    readable:
      "Play the 640 × 360 and 480 × 270 versions at the same display size and read the queue text. At 640 × 360 the text is still readable; at 480 × 270 it is not.",
    tradeoff:
      "Compare the measured sizes: 480 × 270 is only slightly smaller than 640 × 360, because the encoder spends its bits differently on a smaller picture. The readable version is the better trade.",
  },
  hints: [
    "Play the 640 × 360 and 480 × 270 encodes at the same display size and read the queue text in each.",
    "Read the measured sizes in the table: the quarter-size file is not proportionally smaller.",
    "Resolution decides how many pixels the text has; the quality setting decides how faithfully those pixels are kept.",
    "A smaller picture does not automatically mean a much smaller file: the encoder's bits are spent per pixel.",
    "Reference: 640 × 360 at CRF 23 keeps the text readable; 480 × 270 does not, and the size saving is small.",
  ],
  modelNote:
    "The re-encode runs are real FFmpeg.wasm computations on real bytes in this browser. The comparison players play real recorded encodes; the stills are real extracted frames; the table's sizes and bitrates are measured with ffprobe, not estimated.",
  modelVsReality:
    "The editor runs real FFmpeg 5.1.4 (ffmpeg.wasm) in a worker and writes a real MP4 you can play and download. The comparison players play real recorded encodes made with desktop FFmpeg from the same source; their commands and measured sizes are shown beside them.",
  originality: {
    textbookExample:
      "A static table of recommended bitrates with no media played or measured.",
    howThisDiffers:
      "Play real encodes of the same recording at different resolutions and quality settings, read their measured sizes and bitrates, and run your own re-encode in the browser.",
  },
} as const;
