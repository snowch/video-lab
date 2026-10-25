// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Keep a shorter section",
  goal: "Make a five-second video from an eight-second source.",
  sourceNote:
    "This eight-second clip comes from Big Buck Bunny, an animated short film. Play it once so you can recognise which part your cut keeps.",
  concept: [
    "A video plays pictures in sequence, with sound timed to match. Its duration is the time from the start to the end.",
    "A cut chooses which part to keep. Here, you will keep the opening and remove the ending. FFmpeg reads the source and writes the chosen part to a separate file, leaving the source available for another edit.",
  ],
  worked: [
    {
      title: "Keep the opening five seconds",
      options: [
        {
          flag: "ffmpeg",
          meaning: "Run the tool that reads, changes and writes media files.",
        },
        {
          flag: "-i bunny-short.mp4",
          meaning:
            "Read bunny-short.mp4 as the input. A space separates the option -i from its filename.",
        },
        {
          flag: "-t 5",
          meaning:
            "Limit the output duration to five seconds. Placed after the input, this option controls the output file.",
        },
        {
          flag: "first-cut.mp4",
          meaning:
            "Write the result to this new file. The last filename is the output; .mp4 selects the MP4 file format.",
        },
      ],
      observe:
        "Replay first-cut.mp4. Compare its opening and ending with the source, and listen for the point where the sound stops.",
      explanation: [
        "The result keeps the opening five seconds of picture and sound at their original pace. The last three seconds are left out. Cutting changes how much you keep; it does not make the action play faster.",
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
