// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Keep a shorter section",
  goal: "Make a five-second video from an eight-second source.",
  sourceNote:
    "Play this eight-second clip from Big Buck Bunny, an animated short film, so you can recognise the part you keep.",
  concept: [
    "A **cut** selects part of a video. Its **duration** is how long that part plays.",
    "FFmpeg is a command-line tool for editing media. It reads a source file (the input) and saves the cut to a new file (the output). Here, the .mp4 ending selects the MP4 file format.",
  ],
  worked: [
    {
      title: "Keep the opening five seconds",
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the source",
        },
        {
          flag: "-t 5",
          meaning: "Keep the opening five seconds",
        },
        {
          flag: "first-cut.mp4",
          meaning: "Save the new video",
        },
      ],
      observe:
        "Replay first-cut.mp4. Compare its ending with the source and listen for where the sound stops.",
      explanation: [
        "The cut keeps the opening five seconds of picture and sound at their original pace, leaving out the last three seconds.",
      ],
    },
  ],
  practice:
    "Make a shorter preview of the same source: save its opening three seconds as practice-cut.mp4, keeping both picture and sound.",
  practiceObserve:
    "Compare practice-cut.mp4 with first-cut.mp4. They should begin alike, with the practice cut ending two seconds earlier. Listen as well as watching to check that sound is present.",
  hints: [
    "Use the same source file as the worked example.",
    "Keep the input filename separate from the output filename.",
    "Change the number after the duration option -t.",
    "The requested duration is three seconds, starting from the opening.",
    "Use -t 3 and name the output practice-cut.mp4.",
  ],
  checkLimit:
    "The check verifies a three-second file with picture and sound. Replay it to confirm that it contains the source opening and ends where you intended.",
} satisfies PageCopy;
