// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const copy: PageCopy = {
  title: "Choose an encoding quality setting",
  goal: "Compare picture detail and file size at two quality settings, then try a setting between them.",
  concept: [
    "Lossy compression saves space by representing some picture detail less precisely. This can soften textures or leave visible blocks around edges and movement. An encoder is the program that makes these choices while writing compressed video.",
    "A quality target lets the encoder spend more bits on pictures that need them and fewer on simpler pictures. It does not set an exact file size. Re-encoding a compressed source cannot restore detail already lost, even if the new file is larger.",
  ],
  worked: [
    {
      title: "Encode with CRF 18",
      introduction: [
        "Make the first version from the original eight-second clip. It will serve as the comparison for a second version with a different quality target.",
      ],
      options: [
        {
          flag: "-c:v libx264",
          meaning:
            "Choose libx264, an encoder that writes H.264 video. The :v suffix applies the choice to video only; sound is still included using the output format's default audio encoder.",
        },
        {
          flag: "-crf 18",
          meaning:
            "Use constant rate factor (CRF), a quality-oriented mode. Lower values generally preserve more picture detail and use more bits; higher values allow more loss. Here the target is 18.",
        },
      ],
      observe:
        "Replay quality-high.mp4 and pick a moving or finely textured area to compare later. Note the final file size shown in the log's Lsize field.",
      explanation: [
        "The filename labels the chosen setting; it is not a measurement of picture quality. Keep this output so that both versions can be judged against the same source at the same moment.",
      ],
    },
    {
      title: "Encode with CRF 35",
      introduction: [
        "Use the original source again and change only the quality target and output name. This makes a separate comparison file without adding loss from the first encode.",
      ],
      options: [
        {
          flag: "-crf 35",
          meaning:
            "Set the same quality control to 35, allowing more loss than the first version.",
        },
      ],
      observe:
        "Compare the final Lsize with the first encode, then replay the same moving and detailed areas in both outputs. Look for softened texture or changes around edges.",
      explanation: [
        "The amount saved and the visible difference depend on the pictures and encoder build. Small previews can conceal lost detail: download the files for a closer comparison if needed. Judge both file size and pictures rather than assuming one proves the other.",
      ],
    },
  ],
  practice:
    "Create practice-quality.mp4 from bunny-short.mp4 with libx264 and CRF 26. Keep all eight seconds and the sound. Use this third version to decide whether an intermediate setting gives an acceptable picture for its file size.",
  practiceObserve:
    "Compare the final file sizes and the same scene in all three versions. Check that the practice file plays to the end with sound, then decide which version you would keep and what detail influenced your choice.",
  hints: [
    "Use the original source so the third version has the same starting point.",
    "Keep the full clip: no start or duration option is needed.",
    "Keep the video encoder used in the worked examples.",
    "Change the quality target from 35 to 26.",
    "Use -c:v libx264 -crf 26 before practice-quality.mp4.",
  ],
  checkLimit:
    "The check verifies duration, video, sound and H.264. Confirm CRF 26 in your command; compare picture detail and listen to the output yourself.",
};

export default copy;
