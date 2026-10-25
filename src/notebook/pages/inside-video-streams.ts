// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Choose picture or sound",
  goal: "Make a silent video and a separate sound file.",
  concept: [
    "A media file can hold picture and sound as separate streams. A video stream carries the sequence of pictures; an audio stream carries the sound. The player presents them together using their timing information.",
    "Keeping these streams separate lets you choose what belongs in a new file. A silent loop needs pictures without a soundtrack. A soundtrack for separate editing needs sound without pictures. Both can come from the same source without changing that source.",
  ],
  worked: [
    {
      title: "Make a video without sound",
      introduction: [
        "Keep the pictures from the eight-second source and leave out its audio stream.",
      ],
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the source file, which contains both video and audio.",
        },
        {
          flag: "-an",
          meaning: "Disable audio in the output. This option takes no value.",
        },
        {
          flag: "silent.mp4",
          meaning: "Write the result to this new MP4 file.",
        },
      ],
      observe:
        "In the log's Output section, look for a Video stream and no Audio stream. Replay silent.mp4: the pictures continue for eight seconds without sound.",
      explanation: [
        "The log also describes the input, where the Audio stream is still present. The Output section describes what FFmpeg wrote. With no duration limit in this command, the output keeps the full source length.",
        "A file with no audio stream cannot carry a soundtrack. That differs from an audio stream containing silence: listening alone cannot tell those two cases apart.",
      ],
    },
    {
      title: "Save the sound on its own",
      introduction: [
        "Use the same source again, this time keeping its sound and leaving out the pictures.",
      ],
      options: [
        {
          flag: "-vn",
          meaning: "Disable video in the output. This option takes no value.",
        },
        {
          flag: "sound.wav",
          meaning:
            "Write a WAV audio file. The .wav ending tells FFmpeg which file format to use.",
        },
      ],
      observe:
        "The Output section now lists Audio without Video. Listen to sound.wav and compare its soundtrack with the source.",
      explanation: [
        "This output contains the source's eight seconds of sound, with no picture stream. A filename ending alone does not tell you which streams a file contains; the output stream list confirms what was written.",
      ],
    },
  ],
  practice:
    "Prepare a four-second silent clip from the start of bunny-short.mp4. Save it as practice-silent.mp4 with video and no audio stream.",
  practiceObserve:
    "Check that the output lists Video without Audio, then replay the clip to confirm it shows the opening four seconds of the source.",
  hints: [
    "The starter already limits the output to four seconds.",
    "Keep the video stream and disable the audio stream.",
    "Use the audio-disabling option from the first example.",
    "Put the option before the output filename, alongside the duration option.",
    "Keep -t 4 and add -an before practice-silent.mp4.",
  ],
  checkLimit:
    "The check verifies four seconds, video present and audio absent. Replay to confirm the clip contains the intended opening pictures.",
};

export default page;
