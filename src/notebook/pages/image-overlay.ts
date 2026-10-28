// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export const overlay: PageCopy = {
  title: "Place a drawing over video",
  goal: "Combine a transparent drawing with moving footage, then change its position.",
  sourceNote:
    "The supplied annotation.png is an original 854 × 480 drawing of an orange arrow and ring. Its canvas matches the supplied eight-second bunny-short.mp4.",
  concept: [
    "An image can add marks to moving footage. The overlay filter combines two pictures: the first input forms the background, and the second sits above it. Each output frame contains the combined result.",
    "An image’s **alpha** channel records how transparent each pixel is. Fully transparent pixels let the background show through; opaque pixels cover it. The supplied PNG has transparent space around its orange drawing, so the footage remains visible there. An image with an opaque background would cover the footage in that area.",
    "The overlay position is the upper-left corner of the image’s canvas, measured from the upper-left of the video frame. Write `overlay=x:y` to set those coordinates, with a colon between them. The x coordinate increases to the right; y increases downwards. The drawing’s visible marks can sit some distance inside that canvas.",
  ],
  worked: [
    {
      title: "Add the supplied annotation",
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning:
            "Read the moving footage as the first input, below the drawing.",
        },
        {
          flag: "-i annotation.png",
          meaning:
            "Read the transparent drawing as the second input, above the footage.",
        },
        {
          flag: "-filter_complex overlay",
          meaning:
            "Use a filter graph that can combine multiple inputs. The overlay filter combines these two video inputs, placing the drawing’s canvas at the default position x=0, y=0.",
        },
        {
          flag: "annotated.mp4",
          meaning:
            "Write the combined video and the selected source audio to this file.",
        },
      ],
      observe:
        "Replay annotated.mp4 through all eight seconds. The orange arrow and ring stay fixed while the scene moves beneath them. Look through the transparent parts of the drawing and listen for the source sound.",
      explanation: [
        "The PNG supplies one picture. By default, overlay keeps using the last picture from its second input after that input ends. The drawing therefore remains throughout the eight-second main video without an image loop.",
        "The output keeps the background’s 854 × 480 dimensions. FFmpeg automatically selects the source audio in this command and re-encodes it along with the filtered video.",
      ],
    },
  ],
  practice:
    "Create annotated-practice.mp4 using the supplied annotation.png shifted 40 pixels to the right, with no vertical movement. Keep the full eight-second video and its sound. The starter command uses the default overlay position; change the filter’s position settings.",
  practiceObserve:
    "Compare annotated-practice.mp4 with annotated.mp4. The arrow and ring should sit 40 pixels farther right at the same height and remain visible throughout. The canvas extends past the right edge, but only transparent space is cropped in this supplied drawing. Listen for the source sound.",
  hints: [
    "Keep the video first and the drawing second; change the overlay filter’s position.",
    "The position uses two pixel coordinates: x for horizontal movement, then y for vertical movement.",
    "Positive x moves right. Keep y at zero to retain the same height.",
    "Write the coordinates after overlay=, separated by a colon: 40:0.",
    "Use `ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay=40:0 annotated-practice.mp4`.",
  ],
  checkLimit:
    "The automatic check verifies eight-second duration, 854 × 480 dimensions and the presence of video and audio. It does not measure drawing placement. Compare the replays to verify the 40-pixel shift and continued visibility, and listen to the sound.",
};
