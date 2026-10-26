// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Change signal level",
  goal: "Make the soundtrack quieter while keeping the full video.",
  sourceNote:
    "Listen at a comfortable device volume. Keep that setting fixed when comparing the source and outputs.",
  concept: [
    "Digital sound is a sequence of sample values describing a **waveform**: how the signal varies through time. **Amplitude** is the size of those values.",
    "Smaller amplitudes usually sound quieter, but perceived loudness also depends on the sound, speakers and listening conditions.",
  ],
  worked: [
    {
      title: "Reduce the soundtrack’s amplitude",
      introduction: [
        "Make a quieter version of the eight-second source. This adjustment applies to the soundtrack throughout the clip; the picture keeps its dimensions and timing.",
      ],
      options: [
        {
          flag: '-af "volume=0.5"',
          meaning:
            "Apply an audio filter. Inside the quotes, volume names the filter and =0.5 sets its multiplier: each audio sample is multiplied by one half.",
        },
      ],
      observe:
        "Compare the same passage in quieter.mp4 and the source at your fixed device volume. The soundtrack should sound quieter, while the full picture and sound remain present.",
      explanation: [
        "Reducing sample amplitudes keeps the audio stream. Stream presence tells you that audio exists, but cannot tell you how loud it is: even a silent waveform can occupy an audio stream.",
      ],
    },
  ],
  practice:
    "Create `practice-level.mp4` from `bunny-short.mp4` with audio sample amplitudes reduced to one quarter of the source. Keep the full eight seconds, including picture and soundtrack.",
  practiceObserve:
    "Compare the same passage in the source, quieter.mp4 and practice-level.mp4 at a fixed device volume. The practice output should sound quieter than both other versions. Check your command’s multiplier as well as listening.",
  hints: [
    "Use the original source so the new multiplier is applied to the source’s sample values.",
    "Keep the whole clip; no duration or start adjustment is needed.",
    "Change the number in the audio filter and keep the practice output name.",
    "One quarter is written as 0.25.",
    'Use -af "volume=0.25" before `practice-level.mp4`.',
  ],
  checkLimit:
    "The check verifies eight seconds and both video and audio streams. Confirm the quarter-amplitude multiplier in your command and compare the sound yourself; the check does not measure gain or loudness.",
} satisfies PageCopy;
