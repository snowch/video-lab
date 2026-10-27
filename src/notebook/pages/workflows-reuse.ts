// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Reuse a command deliberately",
  goal: "Adapt a preview command to another source while keeping its sizing rule.",
  sourceNote:
    "In Files, use New folder to create previews before running the commands on this page.",
  concept: [
    "A reusable command separates the processing you want to keep from the values that belong to one job. For a small preview, the sizing rule can stay the same while the source, duration and destination change. Review each part before reusing it: a command that worked on one clip can still select the wrong material for the next job.",
    "The notebook sends one command to FFmpeg. It does not run a shell, so filename wildcards, loops and shell pipelines do not work here. The paths refer to files in the notebook’s workspace, rather than folders on your device.",
    "A result belongs to the command and input used for that run. Editing the command or replacing its input does not update the existing video. Run the revised command before relying on its result, and download work you need to keep because browser storage can be cleared.",
  ],
  worked: [
    {
      title: "Make a preview in a folder",
      introduction: [
        "Combine a short duration with a smaller picture. Saving the preview under a separate path keeps it distinct from the source.",
      ],
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the short clip as the input.",
        },
        {
          flag: "-t 3",
          meaning: "Limit the output to three seconds from the beginning.",
        },
        {
          flag: '-vf "scale=320:-2"',
          meaning:
            "Apply a video filter: scale sets the width to 320 pixels; -2 calculates a proportional height rounded to an even number. The quotes enclose the filter expression.",
        },
        {
          flag: "previews/short.mp4",
          meaning:
            "Write short.mp4 inside the existing previews folder in the notebook’s file workspace.",
        },
      ],
      observe:
        "The output has a 320 × 180 picture and lasts three seconds. Replay it to compare its opening with the source and listen for sound.",
      explanation: [
        "The resize changes the video picture. Sound is also present because this source has one audio stream, which FFmpeg selects automatically alongside its video. The output path keeps this preview separate; it does not move or alter the source.",
      ],
    },
  ],
  practice:
    "Adapt the preview command for bunny-action.mp4. Save its first two seconds as previews/practice.mp4, with a 320 × 180 picture and sound. Keep the worked preview available for comparison.",
  practiceObserve:
    "Compare the opening with bunny-action.mp4 to confirm you used the action clip. Replay the two-second result and listen for its sound; previews/short.mp4 should still be available in Files.",
  hints: [
    "Keep the preview’s sizing rule; identify the values that belong to the new job.",
    "The source must change from the short clip to the action clip.",
    "Use bunny-action.mp4 after -i and reduce the duration to two seconds.",
    "Keep scale=320:-2 and write to previews/practice.mp4, leaving previews/short.mp4 untouched.",
    'Use ffmpeg -i bunny-action.mp4 -t 2 -vf "scale=320:-2" previews/practice.mp4.',
  ],
  checkLimit:
    "The check measures duration, picture dimensions and the presence of video and audio. Compare the replay with the action source and listen to confirm the intended content and sound.",
};

export default page;
