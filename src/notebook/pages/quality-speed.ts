// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  codecGuide: true,
  title: "Choose encoder effort",
  goal: "Compare encoding presets while keeping the quality setting and source unchanged.",
  concept: [
    "An encoder searches for compact ways to describe pictures, including repeated detail within a frame and movement between frames. A more thorough search can reduce the data needed, but takes more computation.",
    "A **preset** groups these search and compression choices. It controls encoding effort, rather than playback speed. CRF and preset are separate controls: keeping CRF fixed lets you explore the effect of changing effort, although equal CRF does not guarantee identical visible quality across presets.",
  ],
  worked: [
    {
      title: "Make a low-effort version",
      introduction: [
        "Use the eight-second clip to make a version with little time spent searching for compression opportunities. Keep the CRF setting fixed for the later comparison.",
      ],
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the supplied eight-second source video and sound.",
        },
        {
          flag: "-c:v libx264",
          meaning: "Encode the video as H.264 using libx264.",
        },
        {
          flag: "-crf 26",
          meaning:
            "Use CRF 26 as the quality setting, without requesting a particular file size.",
        },
        {
          flag: "-preset ultrafast",
          meaning:
            "Choose libx264’s lowest-effort preset. It gives up compression opportunities to reduce encoding work.",
        },
        {
          flag: "fast.mp4",
          meaning:
            "Write the result to this output file. The filename itself does not control encoding.",
        },
      ],
      observe:
        "Replay fast.mp4: the action and sound still take eight seconds. In the final progress line, find Lsize, the total output size, and speed, the processing rate relative to the video’s playback time.",
      explanation: [
        "A processing speed of 2x means roughly two seconds of video were processed per second of elapsed processing time. It does not make the saved video play twice as fast.",
        "Browser processing time depends on your device and browser. Treat a run as evidence about that run; repeated runs under similar conditions are needed for a useful timing comparison.",
      ],
    },
  ],
  practice:
    "Create practice-speed.mp4 with the fast preset, retaining libx264, CRF 26, all eight seconds and sound. Compare its final output size and processing rate with fast.mp4, then replay the same moving detail in each version.",
  practiceOptions: [
    {
      flag: "-preset fast",
      meaning:
        "Choose a preset that spends more effort on compression than ultrafast.",
    },
  ],
  practiceObserve:
    "Compare the measured sizes and processing rates, and look for changes around moving edges. More encoding effort can produce a smaller file at this CRF, but the actual size, timing and visible differences depend on the clip and environment.",
  hints: [
    "Keep the source and duration unchanged; this task changes encoding effort.",
    "Keep libx264 as the video encoder.",
    "Keep the CRF value at 26.",
    "Replace the preset name ultrafast with fast.",
    "Use -c:v libx264 -crf 26 -preset fast and name the output practice-speed.mp4.",
  ],
  checkLimit:
    "Checks verify eight seconds, video, sound and H.264. Check the command for the preset and CRF; compare the logs for size and processing rate, and replay both files to judge visible differences.",
};

export default page;
