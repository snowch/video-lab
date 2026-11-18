// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Keep a shorter section",
  goal: "Make a five-second video from an eight-second source. Where will the cut stop?",
  sourceNote:
    "Play the supplied eight-second Big Buck Bunny clip in the source preview so you can recognise the opening.",
  concept: [
    "A **cut** selects part of a video. Its **duration** is how long that part plays.",
    "FFmpeg is a command-line tool for editing media. It reads a source file (the input) and saves the cut to a new file (the output). Here, the .mp4 ending selects the MP4 file format.",
  ],
  worked: [
    {
      title: "Keep the opening five seconds",
      introduction: [
        "Select Run command with the example unchanged to make `first-cut.mp4`.",
      ],
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
        "Play `first-cut.mp4` below Command output. The player’s time display ends at five seconds. The final `time=` in Command output is also about five seconds. Compare the picture and sound at the start and end with the source.",
      explanation: [
        "The cut keeps the opening five seconds of picture and sound at their original pace, leaving out the last three seconds.",
      ],
    },
  ],
  practice:
    "In the practice command, change `-t 5` to `-t 3` and select Run command. Keep the source and the output name `practice-cut.mp4` unchanged.",
  practiceObserve:
    "Play `practice-cut.mp4` and `first-cut.mp4`. Do both begin at the same picture and sound? Use the player’s time display to check which finishes first and by how much.",
  hints: [
    "Use the same source file as the worked example.",
    "Keep the input filename separate from the output filename.",
    "Change the number after the duration option -t.",
    "The requested duration is three seconds, starting from the opening.",
    "Use -t 3 and name the output practice-cut.mp4.",
  ],
  checkLimit:
    "Check result measures duration and looks for video and audio streams. Replay to confirm that the cut keeps the opening you intended.",
} satisfies PageCopy;
