// Copyright © 2026 Christopher Snow
export const m2 = {
  title: "Cutting and joining",
  lessonNumber: "MODULE 3 / CUT AND JOIN",
  recordedLabel: "Recorded FFmpeg output",
  clockLabel: "Calculated clock model",
  objectives: [
    "Compare a requested cut with its actual boundary pictures.",
    "Choose between stream copy and trimming followed by encoding.",
    "Map source ranges onto a consecutive output timeline.",
  ],
  sections: {
    question: "Keep the action and result",
    motivation: "Watch the source recording",
    prediction: "Predict a copied cut's first picture",
    investigation: "Compare requested and actual cuts",
    construction: "Arrange clips and hold the result",
    failureExperiment: "Test the clip clocks",
    explanation: "Explain the cut and join operations",
    generalisation: "Check another source before editing",
    challenge: "Plan a precise edit",
    reflection: "Give the viewer time to understand",
  },
  captions: {
    source:
      "The named source recording used for every cut and join in this lesson.",
    prediction:
      "Use the source keyframes and the description of stream copy before checking your prediction.",
    cuts: "Compare a recorded output with its requested source range. The stills show its measured boundary pictures.",
    join: "The timelines calculate clip placement. The player and join-side stills come from the selected recorded output.",
    clock:
      "A calculated comparison of source positions and consecutive output positions, not a faulty rendered video.",
    challenge:
      "Use the experiments to check your edit plan. Read feedback, edit and retry.",
    reflection: "Optional notes for your next demo; these are not graded.",
  },
  fieldLabels: {
    method: "Method for the cut comparison",
    order: "Clip order",
    reset: "Reset each clip's clock before joining",
    end: "B's source end, seconds",
    duration: "Finished picture duration, seconds",
    join: "Output time where B begins, seconds",
  },
  feedback: {
    method:
      "For the cut comparison, the brief requires the requested first picture with no earlier material. Compare the actual first source picture for each method.",
    order:
      "Opening context must precede the result. Check which source range each clip keeps.",
    reset:
      "The clips need clocks starting at zero before this concat filter joins them. Compare both clock arrangements.",
    end: "Add the requested hold duration to B's source start. The end is a source time, not B's length or an output time.",
    duration:
      "Add the two kept source durations, each calculated as end minus start. Waiting removed between clips contributes no output time.",
    join: "B starts after A finishes. Use A's kept duration rather than B's original source position.",
  },
  options: {
    copy: "Stream copy",
    encode: "Trim and encode",
    AB: "A then B",
    BA: "B then A",
    yes: "Yes, reset each clip to zero",
    no: "No, keep the source timestamps",
  },
  sourceTitle: "Source recording",
  sourceLabel: "Source file",
  outputTitle: "Recorded output",
  outputLabel: "Output file",
  play: "Play recording",
  sourceTime: "Source time",
  outputTime: "Output time",
  seconds: "s",
  requestedRange: "Requested source range",
  start: "Requested start, seconds",
  method: "Cut method",
  keyframes: "Source keyframe times",
  firstPicture: "First output picture",
  lastPicture: "Last output picture",
  pictureAlt: "Picture extracted from the selected recorded output",
  pictureCount: "Decoded picture count",
  pictureDuration: "Video stream duration",
  containerDuration: "Container duration",
  firstPts: "First video presentation timestamp",
  audioStart: "First audio presentation timestamp",
  boundaryNote:
    "Ranges include their start and exclude their end. The last kept picture begins before the range's end.",
  command: "Recorded FFmpeg command",
  evidence: "Recorded native inspection evidence",
  commandNote:
    "This command produced the selected recorded file. It is shown for inspection; it does not run in your browser.",
  download: "Download this recording",
  mediaError:
    "The browser could not play this recording. Download the file, or inspect the pictures and timing evidence in the cut and join experiments.",
  sourceMediaError:
    "The browser could not play the source. The cut and join experiments still provide extracted pictures and source times.",
  predictionQuestion:
    "Which source picture begins the requested stream-copy cut?",
  requestedStartOption: "The requested start",
  keyframeOption: "The preceding keyframe",
  checkPrediction: "Check prediction",
  predictionMissing: "Choose a first-picture prediction before checking.",
  predictionRight:
    "The recorded copy begins at the preceding keyframe. Compare its first source time with the requested start in the cut experiment.",
  predictionWrong:
    "This copy command preserved earlier encoded material. Inspect the preceding keyframe and retry, then compare the measured output.",
  order: "Clip order",
  bEnd: "B's source end, seconds",
  sourceTimeline: "Kept ranges on the source clock",
  outputTimeline: "Consecutive clips on the output clock",
  timelineNote:
    "The source timeline marks what is kept. The output timeline shows when each kept clip plays. Spaces between kept source ranges are removed from the consecutive output.",
  duration: "Finished picture duration",
  joinTime: "Output join time",
  beforeJoin: "Last picture before the join",
  afterJoin: "First picture after the join",
  hardCut: "Hard cut: no gap or overlap",
  clockMode: "Clip clock arrangement",
  keepClock: "Keep source positions",
  resetClock: "Reset clocks and append",
  gap: "Calculated gap between clips",
  clockResult: "Calculated output positions",
  choose: "Choose an answer",
  challengeTitle: "Choose a cut and plan a join",
  reflectionLabel: "Your editing notes, optional",
  reflectionSaved:
    "Saved in this browser when storage is available. These notes are not graded.",
  clearNotes: "Clear notes",
  inspectAgain: "Return to the cut experiment",
  ownCutTitle: "Cut the recording yourself",
  ownCutCaption:
    "A real trim-and-encode cut run in this browser's FFmpeg.wasm on the course's original recording. The command, the produced file and the probe are real.",
  ownCutStart: "Cut from source time, seconds",
  ownCutRun: "Run the cut",
  ownCutCancel: "Cancel",
  ownCutIdle: "Ready. Nothing has run yet.",
  ownCutLoading:
    "Loading the encoder (downloaded once, only because you pressed Run)...",
  ownCutRunning: "Cutting in your browser...",
  ownCutDone: "Done. The file below is the cut this run produced.",
  ownCutFailed: "The encoder failed in this browser.",
  ownCutCommand: "The exact command this run executed",
  ownCutSize: "File size",
  ownCutDuration: "Duration",
  ownCutPictures: "Pictures",
  ownCutDownload: "Download the cut",
  ownCutUnavailable:
    "This browser cannot run the encoder. The recorded cut and join experiments above still work, and the Module 1 lesson explains the commands.",
  ownCutNote:
    "The encoder core is downloaded only when you press Run. Your own capture from Module 0 stays in the recorder and is never uploaded; this exercise cuts the labelled original recording so the command and result are reproducible.",
};
