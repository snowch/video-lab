// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Fade towards silence",
  goal: "Make the soundtrack fall gradually towards silence at the end of a clip.",
  concept: [
    "A constant volume setting multiplies every audio sample by the same amount. A fade changes that multiplier over time. During a fade-out, the multiplier falls towards zero, so the sound gradually becomes quieter.",
    "A fade has a start time and a duration. Their sum gives the time when it reaches silence. Fading changes the sound within the clip; it does not shorten the video or remove its audio stream.",
  ],
  worked: [
    {
      title: "Fade out over the final three seconds",
      introduction: [
        "This source lasts eight seconds. Leave its opening sound at full level, then fade the ending towards silence.",
      ],
      options: [
        {
          flag: '-af "afade=t=out:st=5:d=3"',
          meaning:
            "Apply the afade audio filter. Its named settings are separated by colons inside the quoted expression.",
        },
        { flag: "t=out", meaning: "Choose a fade-out." },
        {
          flag: "st=5",
          meaning: "Start the fade five seconds into the audio.",
        },
        { flag: "d=3", meaning: "Make the fade last three seconds." },
      ],
      observe:
        "Compare the source and faded.mp4 from just before second 5 through the ending. Keep the player and device volume the same for both. Listen for the output becoming quieter while the picture continues.",
      explanation: [
        "The fade runs from second 5 to second 8. The output still lasts eight seconds and contains audio and video; only the ending's audio level is being faded.",
        "A smooth reduction can still cut across a musical phrase. Listen to judge whether the chosen start suits the sound, rather than relying on the file's duration.",
      ],
    },
  ],
  practice:
    "Create practice-fade.mp4 with a fade-out that begins halfway through this eight-second clip and reaches silence at its end. Keep the full video and its audio stream.",
  practiceObserve:
    "Compare practice-fade.mp4 with faded.mp4 at the same playback volume. Listen from second 4 onwards: the practice fade should begin earlier and fall more gradually, with both clips ending at second 8.",
  hints: [
    "Keep the eight-second clip; the task changes its sound rather than its length.",
    "Keep the fade type as out.",
    "Halfway through eight seconds is second 4: use that as the start time.",
    "The fade needs four seconds to run from the halfway point to the ending.",
    'Use -af "afade=t=out:st=4:d=4" and name the output practice-fade.mp4.',
  ],
  checkLimit:
    "The check verifies eight-second duration and audio/video presence. Listen to confirm the fade begins at second 4 and reaches silence at the ending.",
};

export default page;
