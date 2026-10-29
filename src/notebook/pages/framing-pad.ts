// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Fit the whole view inside a square",
  goal: "Keep the full picture by adding space above and below it.",
  concept: [
    "**Padding** places a picture inside a larger **canvas**, the area occupied by each output frame. The added area becomes part of the video.",
    "Scale the picture to fit, then add space around it. The order matters: padding cannot put a picture into a canvas smaller than itself. This keeps the full field of view, although scaling down still reduces fine detail.",
  ],
  worked: [
    {
      title: "Scale, then centre on a square canvas",
      introduction: [
        "Make a 480 × 480 frame containing the full view. The command chains a resize and a padding operation in one video filter expression.",
      ],
      options: [
        {
          flag: '-vf "…"',
          meaning:
            "Apply the quoted video filter expression. The quotes keep the whole expression together as one command argument.",
        },
        {
          flag: "scale=480:-2",
          meaning:
            "Resize to 480 pixels wide. The -2 derives a proportional height rounded to an even number.",
        },
        {
          flag: ",",
          meaning:
            "Pass the first filter’s result into the next filter. This chain runs from left to right.",
        },
        {
          flag: "pad=480:480:(ow-iw)/2:(oh-ih)/2",
          meaning:
            "Set the canvas width and height, then the picture’s position, separated by colons. The position is a pixel offset from the canvas’s top-left corner: x (horizontal) first, y (vertical) second. ow and oh are the output canvas dimensions; iw and ih are the incoming picture dimensions. Subtracting gives the spare space; dividing by two centres the picture. Parentheses group the subtraction. The added area is black by default.",
        },
      ],
      observe:
        "Compare the source and padded.mp4: both side edges of the scene should remain visible, with black bands above and below the smaller picture. The output frame dimensions are 480 × 480.",
      explanation: [
        "The resized picture fills the width, leaving no horizontal space to add. Its smaller height leaves room for the top and bottom bands. Those bands belong to the output frames, so they remain when the file is played elsewhere.",
      ],
    },
  ],
  practice:
    "Create `practice-pad.mp4` for a smaller square preview: use a 360 × 360 canvas, keep the full view centred, and retain all eight seconds and the sound.",
  practiceObserve:
    "Compare the scene edges with the source and the bands with the worked result. The smaller preview should keep the same view and centred placement. Play it through and listen for sound.",
  hints: [
    "Keep the resize before the padding operation.",
    "The picture should fill the new canvas width without cropping.",
    "Change the scale width and both canvas dimensions to 360.",
    "Keep -2 and the centring expressions unchanged.",
    "Use scale=360:-2,pad=360:360:(ow-iw)/2:(oh-ih)/2 and save to `practice-pad.mp4`.",
  ],
  checkLimit:
    "The check measures frame dimensions, duration and the presence of video and audio. Compare the replay with the source to confirm the full view and centred placement, and listen to the sound.",
};

export default page;
