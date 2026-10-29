// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Count sound samples through time",
  goal: "Reduce the audio sample rate while keeping the opening four seconds at their original pace.",
  conceptHeadings: ["Audio sample rate", "Resampling", "Choosing a rate"],
  concept: [
    "**Audio sample rate** is the number of signal values stored per second for each audio channel. A **sample** is one value at one instant; a **channel** is one sequence of sound values, such as the left or right side of stereo. The source’s `48000 Hz` means 48,000 samples per second in each channel. Here, hertz (Hz) counts sound measurements per second, rather than video pictures. Stereo has two channels; its sample rate is still 48000 Hz.",
    "**Resampling** computes a new sequence of sound values at a different sample rate. The values have different spacing in time, but still describe the same interval. Reducing the rate this way need not slow the sound or lower its pitch: FFmpeg calculates new values instead of playing the original values more slowly.",
    "A lower sample rate reduces the range of sound frequencies the output can represent. The rate is not a simple quality slider: the useful choice depends on the sound and its destination. The lower rates here make the exercise easy to inspect; they are not delivery defaults. Reducing the rate can discard high-frequency detail, and raising it again cannot recover that discarded detail.",
  ],
  worked: [
    {
      title: "Resample four seconds of sound",
      introduction: [
        "Write an audio-only copy of the opening four seconds at 24000 samples per second in each channel: half the source rate.",
      ],
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the source video and sound from `bunny-short.mp4`.",
        },
        {
          flag: "-t 4",
          meaning: "Limit the output to four seconds.",
        },
        {
          flag: "-vn",
          meaning: "Omit video from the output, leaving sound only.",
        },
        {
          flag: "-ar 24000",
          meaning:
            "Set the output audio sample rate to 24000 Hz. Placed before the output filename, -ar sets the output rate; its value is in hertz.",
        },
        {
          flag: "resampled.wav",
          meaning:
            "Write the output to this file. The .wav extension chooses a WAV container.",
        },
      ],
      observe:
        "Replay resampled.wav and compare it with the opening four seconds of the source. Listen for the same pace and pitch. A lower rate need not produce an obvious audible difference in this short extract.",
      explanation: [
        "The output has 4 × 24000 = 96,000 sample values in each channel across four seconds. Stereo has two such sequences, both at 24000 Hz. Fewer values describe each second, while the scene’s sound still occupies the same time.",
      ],
    },
    {
      title: "Inspect the new sample rate",
      options: [
        {
          flag: "ffprobe resampled.wav",
          meaning:
            "Inspect the output file without changing it. Read its duration and audio stream description in the raw report.",
        },
      ],
      observe:
        "Find `Duration: 00:00:04.00` and `24000 Hz` on the Audio line. There should be one audio stream and no video stream. The report may describe the two channels as stereo or as 2 channels.",
      explanation: [
        "The report verifies the file’s rate and duration. Listening lets you compare pace and pitch with the source; the reported sample rate alone does not establish how the result sounds.",
      ],
    },
  ],
  practice:
    "Create `practice-samples.wav` containing the opening four seconds of the source as audio only, at 16000 Hz. Keep the sound at its original pace.",
  practiceObserve:
    "Inspect practice-samples.wav with ffprobe. Look for four seconds, an audio stream at 16000 Hz and no video stream. That is 64,000 values per channel across the interval. Replay it and compare pace and pitch with the source’s opening four seconds; you may not hear an obvious difference in detail.",
  hints: [
    "Keep the opening interval at four seconds and write to practice-samples.wav.",
    "Use -vn to omit video from the output.",
    "Change the output sample rate with -ar, rather than changing the duration.",
    "Place -ar 16000 before the output filename. The value is samples per second in each channel.",
    "Use `ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 practice-samples.wav`, then inspect it with `ffprobe practice-samples.wav`.",
  ],
  checkLimit:
    "Checks verify a four-second output with audio at 16000 Hz and no video. They do not assess pitch, audible detail or whether the sound matches the source; use replay for your comparison.",
  furtherReading: {
    title: "Compare pictures and sound through time",
    pages: ["frames-time/rate"],
  },
};

export default page;
