// Copyright © 2026 Christopher Snow
export const p = {
  lessonNumber: "MODULE 10 / FINAL PROJECT",
  title: "Final project",
  objectives: [
    "Write a reproducible edit recipe for a demo: the exact commands, in order.",
    "Run the recipe in the browser on the labelled recording and verify the result.",
    "Review a finished demo from the viewer's side, with measured checks.",
  ],
  sections: {
    question:
      "Can you hand someone your demo workflow as a recipe — and prove it works?",
    motivation: "A finished demo is a recipe plus a verified file",
    prediction: "Predict what your recipe's output will measure",
    investigation: "Read a complete recipe beside its real output",
    construction: "Run your own recipe on the labelled recording",
    failureExperiment: "When a recipe step is skipped",
    explanation: "What makes a recipe reproducible and a review viewer-centred",
    generalisation: "Your workflow, written down",
    challenge: "Assemble and verify your recipe",
    reflection: "Note your finished workflow",
  },
  captions: {
    recipe:
      "A complete edit recipe for the labelled recording: four steps, each with its exact command and its measured result. Every step is one you have run in an earlier module.",
    runner:
      "A real FFmpeg.wasm run in this browser: it executes your recipe's steps in order on the labelled original recording, then probes the produced file and reports the measured facts.",
    review:
      "A viewer-centred review of the finished demo: five checks, each answered from a measurement or a real playback, not from memory.",
    challenge:
      "Assemble the recipe steps, run them, and complete the viewer-centred review.",
    reflection:
      "Optional notes for your finished workflow; these are not graded.",
  },
  recipeLabel: "The reference recipe",
  stepLabel: (n: number, name: string) => `Step ${n}: ${name}`,
  recipeNote:
    "Each step names the module it comes from. The commands are the exact ones those modules ran; the results are the measured facts of the recorded outputs.",
  run: "Run the recipe",
  cancel: "Cancel",
  statusIdle: "Ready. Nothing has run yet.",
  statusLoading:
    "Loading the encoder (downloaded once, only because you pressed Run)...",
  statusRunning: "Running the recipe in your browser...",
  statusDone:
    "Done. The facts below are measured from the file this run produced.",
  statusFailed: "The recipe run failed in this browser.",
  produced: "Your produced file",
  download: "Download the MP4",
  size: "File size",
  bytes: "bytes",
  duration: "Duration",
  resolution: "Resolution",
  streams: "Streams",
  commandLabel: "The exact commands this run executed",
  unavailable:
    "This browser cannot run the encoder. The reference recipe and its recorded results still show, and the commands are shown beside each step.",
  note: "The run executes the recipe's crop, caption burn and re-encode steps in order on the labelled original recording in a real FFmpeg.wasm worker, then probes the produced file. The commands and results are reproducible.",
  reviewLabel: "Viewer-centred review of the finished demo",
  reviewIntro:
    "Answer each check from a measurement or a real playback of the file you just produced — not from memory of making it.",
  reviewChecks: [
    "Does the file play start to finish in a real player?",
    "Does the probe list a video stream and an audio stream?",
    "Is the queue text readable at the size you would publish?",
    "Do the captions appear at the moments the action happens?",
    "Is the measured size reasonable for the platform you would share on?",
    "Could a viewer follow the action without hearing any narration?",
  ],
  checkYes: "Yes",
  checkNo: "No",
  checkAnswer: (i: number) => `Check ${i + 1}`,
  modelNote:
    "The recipe run is a real FFmpeg.wasm computation on real bytes in this browser: crop, caption burn and re-encode execute in order, and the produced file is probed with a real ffprobe run. The reference recipe's recorded results are real measured facts of the recorded outputs.",
  modelVsReality:
    "The recipe runner executes real FFmpeg 5.1.4 (ffmpeg.wasm) commands in a worker on the labelled original recording — the same crop, caption burn and re-encode steps the earlier modules ran. The reference recipe's results are real recorded outputs made with desktop FFmpeg from the same source; their measured facts are shown beside each step.",
  originality: {
    textbookExample:
      "A list of editing tips with no recipe run and no measured verification.",
    howThisDiffers:
      "Write a recipe as exact ordered commands, run it in the browser on the labelled recording, and review the produced file from the viewer's side with measured checks.",
  },
  challengeTitle: "Assemble and verify your recipe",
  fieldLabels: {
    order: "Which step order is the recipe?",
    verify: "Which check proves the produced file is shareable?",
  },
  options: {
    order: {
      correct:
        "Crop and zoom, burn the captions, then re-encode at the chosen size",
      captionsFirst: "Burn the captions, re-encode, then crop and zoom",
      encodeOnly: "Just re-encode at a smaller size",
    },
    verify: {
      probe:
        "The stream probe: the file lists a video stream and an audio stream",
      play: "Playing it once on your own machine",
      size: "The file size being under a limit you remember",
    },
  },
  feedback: {
    order:
      "The recipe crops and zooms first (Module 4: keep the text readable), burns the captions into the full-size picture (Module 7: captions drawn at the size they will be read at), then re-encodes at the chosen size (Module 6). Burning captions before the crop would draw them into a region that is then cropped away; re-encoding alone shrinks the text.",
    verify:
      "A stream probe is a measurement of the produced file: it lists the video and audio streams the file actually contains. Playing it once proves only that it decodes; remembering a size limit proves nothing about this file. The probe is the check that catches a missing stream (Module 8).",
  },
  hints: [
    "Read the reference recipe's steps: each names the module it comes from.",
    "The crop keeps the text large; the caption burn draws text at full size; the re-encode sets the final size.",
    "A crop after a caption burn would cut the captions away; a re-encode alone shrinks the text.",
    "The verification lesson's checks apply to your produced file: streams, duration, size, sound, playback.",
    "Reference: crop and zoom, burn captions, re-encode; the stream probe proves the file is shareable.",
  ],
} as const;
