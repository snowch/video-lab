// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Choose where the cut begins",
  goal: "Keep four seconds starting two seconds into the source.",
  concept: [
    "The start position chooses where a cut begins; the duration sets how much to keep. Starting at second 2 and keeping four seconds reaches second 6 of the source.",
  ],
  worked: [
    {
      title: "Start at second 2",
      options: [
        { flag: "-i bunny-short.mp4", meaning: "Read the source video." },
        {
          flag: "-ss 2",
          meaning:
            "Start at second 2. After the input, -ss makes FFmpeg read picture and sound and discard the material before that point.",
        },
        { flag: "-t 4", meaning: "Keep four seconds from the chosen start." },
        { flag: "later.mp4", meaning: "Write the result to this new file." },
      ],
      observe:
        "Compare the opening of later.mp4 with the source paused at second 2. Then watch its ending: the four-second output reaches the source’s second 6.",
      explanation: [
        "The output starts at its own second 0, corresponding to second 2 of the source. Its player clock measures time within the cut; replay both files to check which part you kept.",
      ],
    },
  ],
  practice:
    "Create practice-start.mp4 containing the section from second 1 to second 4 of bunny-short.mp4, with picture and sound. Work out the duration from those two positions.",
  practiceObserve:
    "Compare the opening with the source at second 1 and the ending with the source at second 4. The output should last three seconds; listen to check that it also contains sound.",
  hints: [
    "The source positions describe the start and end, rather than the start and duration.",
    "Subtract the start position from the end position to find the duration.",
    "The start is one second and the duration is three seconds.",
    "Keep -ss after the input, followed by -t and the duration.",
    "Use -ss 1 -t 3 after the input and keep practice-start.mp4 as the output name.",
  ],
  checkLimit:
    "The check measures duration and the presence of picture and sound. Compare playback with the source to verify the selected start and end, and listen to the sound.",
} satisfies PageCopy;
