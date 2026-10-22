// Copyright © 2026 Christopher Snow
export const sd = {
  lessonNumber: "MODULE 5 / MAKE THE SOUND CLEAR",
  title: "Make the sound clear",
  objectives: [
    "Measure the sound level of a real recording instead of guessing.",
    "Compare quiet, loud, clipped and band-limited versions of the same sound.",
    "Choose a level and a treatment that keep narration understandable.",
  ],
  sections: {
    question: "Can a viewer hear what matters?",
    motivation: "Listen to four versions of the same sound",
    prediction: "Predict the measured levels",
    investigation: "Measure the real levels",
    construction: "Run your own measurement",
    failureExperiment: "When the sound is too loud",
    explanation: "What levels, clipping and band-limiting do",
    generalisation: "Sound habits for screen demos",
    challenge: "Choose the clear version",
    reflection: "Note your sound rule",
  },
  captions: {
    players:
      "Five real sound files: the original synthetic tone at five different treatments. All are real files you can play.",
    levels:
      "A real volumedetect measurement of each file, run in this browser's FFmpeg.wasm. The mean and maximum levels are measured, not estimated.",
    editor:
      "A real FFmpeg.wasm run in this browser that measures the sound level of the labelled original recording and reports the result.",
    over: "The same tone at 200% volume: clipped and distorted. Real file, real measurement.",
    challenge:
      "Choose the version a listener can understand, then measure and check.",
    reflection: "Optional notes for your next recording; these are not graded.",
  },
  files: {
    original: { file: "build/tone.wav", label: "The original synthetic tone" },
    quiet: {
      file: "edit/quiet-tone.wav",
      label: "At 5% volume (almost silent)",
    },
    loud: { file: "edit/loud-tone.wav", label: "At 50% volume" },
    over: { file: "edit/over-tone.wav", label: "At 200% volume (clipped)" },
    band: {
      file: "edit/band-tone.wav",
      label: "Band-limited (like a telephone line)",
    },
    mixed: { file: "edit/mixed-tone.wav", label: "Two tones at once" },
  },
  play: "Play",
  measure: "Measure this file",
  measuring: "Measuring in your browser...",
  measured: "Measured by this run",
  meanVolume: "Mean level",
  maxVolume: "Maximum level",
  db: "dB",
  notMeasured: "Not measured yet.",
  measureNote:
    "The measurement runs a real FFmpeg.wasm volumedetect pass on the file in this browser. Nothing is estimated.",
  quietAudioFile: "edit/quiet-audio.mp4",
  quietAudioLabel: "The recording with the 5% tone as its sound",
  challengeTitle: "Choose the clear version",
  fieldLabels: {
    clear: "Which sound can a listener understand?",
    treatment: "What treatment does it need?",
  },
  options: {
    clear: {
      loud: "The 50% volume version",
      quiet: "The 5% volume version",
      over: "The 200% volume version",
    },
    treatment: {
      none: "None: the level is already right",
      reduce: "Reduce the level: it is too loud and clips",
      raise: "Raise the level: it is too quiet to hear",
    },
  },
  feedback: {
    clear:
      "Listen to each version and read its measured level. The 50% version is clearly audible without distortion; the 5% version is almost silent and the 200% version clips.",
    treatment:
      "The 50% version needs no change. The 200% version clips and would need its level reduced; the 5% version is too quiet and would need raising.",
  },
  hints: [
    "Play each file and read its measured mean level.",
    "A level around -27 dB mean is clearly audible; -47 dB is almost silent.",
    "The 200% version clips: its maximum level is near 0 dB, the digital ceiling.",
    "Narration should sit well below the ceiling so it stays clean.",
    "Reference: the 50% volume version; no treatment needed.",
  ],
  modelNote:
    "The level measurements are real FFmpeg.wasm volumedetect runs on real files in this browser. The players play the real files; nothing is simulated.",
  modelVsReality:
    "volumedetect runs as real FFmpeg 5.1.4 (ffmpeg.wasm) in a worker on the real sound files. The reported mean and maximum levels are parsed from that run's real output. The sound files are synthetic tones, clearly not narration.",
  originality: {
    textbookExample:
      "A static list of audio tips with no sound played or measured.",
    howThisDiffers:
      "Play real sound files at different treatments and read the levels a real measurement reports, then choose the version a listener can understand.",
  },
} as const;
