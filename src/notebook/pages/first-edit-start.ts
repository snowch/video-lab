// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Choose where the cut begins",
  goal: "Keep four seconds starting two seconds into the source.",
  concept: [
    "A start position answers “from where?”. A duration answers “how much?”. Starting at second 2 and keeping four seconds takes you to second 6 of the source.",
    "These are two different ways to change a cut. Moving its start selects a different moment in the source; changing its duration changes how long the selected moment lasts.",
  ],
  worked: [
    {
      title: "Start at second 2",
      introduction: [
        "Skip the opening two seconds of bunny-short.mp4, then keep the next four seconds in later.mp4.",
      ],
      options: [
        { flag: "-i bunny-short.mp4", meaning: "Read the source video." },
        {
          flag: "-ss 2",
          meaning:
            "Choose second 2 as the start. Placed after the input as shown, this tells FFmpeg to read the picture and sound and discard the material before that point.",
        },
        { flag: "-t 4", meaning: "Keep four seconds from the chosen start." },
        { flag: "later.mp4", meaning: "Write the result to this new file." },
      ],
      observe:
        "Compare the opening of later.mp4 with the source paused at second 2. Then watch its ending: the four-second output reaches the source’s second 6.",
      explanation: [
        "The new file plays from its own second 0. That opening corresponds to second 2 of the source. The output player’s clock measures time within the cut, so its four-second duration alone cannot tell you which part of the source was kept.",
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
