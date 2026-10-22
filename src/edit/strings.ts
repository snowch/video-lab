// Copyright © 2026 Christopher Snow
export const ed = {
  lessonNumber: "MODULE 4 / MAKE THE ACTION READABLE",
  title: "Make the action readable",
  objectives: [
    "Crop and zoom the picture so small interface text stays legible at playback size.",
    "Compare a real crop-and-scale run against the full frame, picture by picture.",
    "Add a minimal callout and choose a pacing that gives the viewer time to read.",
  ],
  sections: {
    question: "Can a viewer read what you are showing?",
    motivation: "Watch the recording at playback size",
    prediction: "Predict what cropping will do to the text",
    investigation: "Compare the real crop-and-scale output",
    construction: "Run your own crop and zoom",
    failureExperiment: "When the picture is scaled down",
    explanation: "What crop, scale, callouts and pacing do",
    generalisation: "Readability and pacing rules for screen demos",
    challenge: "Choose the readable version",
    reflection: "Note your readability rule",
  },
  captions: {
    source:
      "The original build-queue recording, played at its full 960 × 540 size.",
    prediction:
      "Compare the full frame with the cropped centre at the same display size before you choose.",
    comparison:
      "Two recorded outputs of the same source: the full frame and a crop of its centre scaled back up. Both play at the same size; the pictures are real extracted frames.",
    editor:
      "A real FFmpeg.wasm crop-and-scale run in this browser. Choose the crop region and the output size, run it, and compare the produced file with the original.",
    scaledDown:
      "The recording scaled to 640 × 360: the same picture, smaller. Compare the size of the text here with the full-size player.",
    callout:
      "Two recorded outputs with drawn callouts: one persistent, one visible only between 3 and 5 seconds.",
    pacing:
      "Two recorded transition styles: the Sort action held still for six seconds, and a one-second fade between the queue and the sorted result.",
    challenge:
      "Decide which version a viewer can read, then run the crop and check.",
    reflection: "Optional notes for your next recording; these are not graded.",
  },
  play: "Play",
  fullFrame: "Full frame (960 × 540)",
  cropped: "Centre crop scaled to 960 × 540",
  fullFrameFile: "build-queue.mp4",
  croppedFile: "edit/cropped-zoom.mp4",
  scaledDownFile: "edit/half-size-crf23.mp4",
  calloutFile: "edit/callout.mp4",
  timedCalloutFile: "edit/timed-callout.mp4",
  zoomPanFile: "edit/zoom-pan.mp4",
  crossfadeFile: "edit/crossfade.mp4",
  scaledDownCaption: "The recording at 640 × 360",
  calloutCaption: "With a persistent callout",
  timedCalloutCaption: "With a callout shown only during the action",
  zoomPanCaption: "The Sort action held for six seconds",
  crossfadeCaption: "A one-second fade between the queue and the result",
  commandLabel: "The exact command this run executed",
  run: "Run the crop and zoom",
  cancel: "Cancel",
  statusIdle: "Ready. Nothing has run yet.",
  statusLoading:
    "Loading the encoder (downloaded once, only because you pressed Run)...",
  statusRunning: "Cropping and scaling in your browser...",
  statusDone: "Done. The file below is the result this run produced.",
  statusFailed: "The encoder failed in this browser.",
  produced: "Your produced file",
  download: "Download the MP4",
  size: "File size",
  duration: "Duration",
  resolution: "Resolution",
  width: "Crop width, pixels",
  height: "Crop height, pixels",
  x: "Crop left edge, pixels",
  y: "Crop top edge, pixels",
  outWidth: "Output width, pixels",
  outHeight: "Output height, pixels",
  evenNote: "Dimensions must be even numbers for the yuv420p pixel format.",
  unavailable:
    "This browser cannot run the encoder. The recorded comparisons above still work, and the commands are shown beside each result.",
  note: "The encoder core is downloaded only when you press Run. The run crops the labelled original recording, so the command and result are reproducible.",
  challengeTitle: "Choose the readable version",
  fieldLabels: {
    readable: "Which version can a viewer read at playback size?",
    why: "Why does the crop stay readable?",
  },
  options: {
    full: "The full frame at 960 × 540",
    crop: "The centre crop scaled to 960 × 540",
  },
  feedback: {
    readable:
      "Compare the two players at the same display size. In the full frame the queue text is small; the crop shows the same region larger, so the text is readable.",
    why: "Cropping removes the parts of the picture the viewer does not need; scaling the remaining region back up makes its text larger at the same display size.",
  },
  hints: [
    "Play both versions at the same display size and read the queue text in each.",
    "The crop keeps only the centre of the picture; the scale step enlarges that region.",
    "A viewer reads the result at playback size, not at the size you recorded.",
    "The crop and scale are two filters in one command: crop=...,scale=...",
    "Reference: the centre crop scaled to 960 × 540. Cropping removes the unneeded picture; scaling enlarges the kept region, so its text is readable. Scaling up adds no detail.",
  ],
  modelNote:
    "The crop-and-scale runs are real FFmpeg.wasm computations on real bytes in this browser. The comparison players play real recorded outputs; nothing is animated or simulated.",
  modelVsReality:
    "The editor runs real FFmpeg 5.1.4 (ffmpeg.wasm) in a worker and writes a real MP4 you can play and download. The comparison players play real recorded outputs made with desktop FFmpeg from the same source; their commands are shown beside them.",
  originality: {
    textbookExample:
      "A static before/after screenshot pair with no way to run the change.",
    howThisDiffers:
      "Run the real crop-and-scale command in the browser on the original recording, play the produced file, and compare it with the full frame at the same display size.",
  },
} as const;
