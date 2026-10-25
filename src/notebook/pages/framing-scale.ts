// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Resize the picture",
  goal: "Make a smaller picture while keeping the scene's proportions, duration and sound.",
  concept: [
    "Each video picture is a rectangular grid of pixels. Width counts the columns; height counts the rows. These dimensions describe the stored picture, not its physical size on your screen: a player can stretch the same video to fill a larger area.",
    "Resizing calculates a new grid from the source picture. A smaller grid has fewer places to store detail, so fine edges and textures can become less distinct. Enlarging the result later cannot recover the discarded detail. Keeping width and height in proportion avoids making subjects look wider or taller.",
  ],
  worked: [
    {
      title: "Make a 640-pixel-wide version",
      introduction: [
        "The source picture is 854 pixels wide and 480 pixels high. Give FFmpeg a smaller width and let it calculate a matching height. The whole scene remains in the picture.",
      ],
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the source video and sound from bunny-short.mp4.",
        },
        {
          flag: '-vf "scale=640:-2"',
          meaning:
            "Apply a video filter with -vf. Inside the quotes, scale resizes the picture; the colon separates width from height. The width is 640 pixels. The special height -2 asks FFmpeg to calculate a proportional height rounded to a multiple of two, as required by this output's picture format. It is not a negative height. The quotes keep the expression together as one argument.",
        },
        {
          flag: "scaled.mp4",
          meaning: "Write the result to this output file.",
        },
      ],
      observe:
        "Find 640x360 in the output video description. Compare a paused frame with the source at the same displayed size, looking at fine edges and texture. Replay to confirm the same eight-second scene and sound.",
      explanation: [
        "The new grid is 640 × 360 pixels. The source width-to-height ratio is very slightly different from this grid's ratio because the calculated height must be a whole, even number. FFmpeg preserves the displayed proportions by marking each output pixel as slightly wider than it is tall. The log calls this SAR, or sample aspect ratio; here it is 1281:1280.",
        "The player may show both versions at the same size, so the displayed width alone does not tell you the stored dimensions. The resize changes picture detail without changing the scene's pace or duration.",
      ],
    },
  ],
  practice:
    "Create practice-scale.mp4 as a smaller preview: 320 × 180 stored pixels, with the full eight-second scene and sound. Let FFmpeg calculate the height from the width.",
  practiceObserve:
    "Find 320x180 in the output video description. Compare the preview with scaled.mp4 at the same displayed size: which fine details are harder to distinguish? Check that subjects keep their shape and the full scene and sound remain.",
  hints: [
    "Keep the source and the full duration; change picture dimensions.",
    "Use the scale video filter to set a smaller width.",
    "Keep the automatic even-height value rather than typing a separate height.",
    "Set the width to 320 and keep -2 for height.",
    'Use ffmpeg -i bunny-short.mp4 -vf "scale=320:-2" practice-scale.mp4.',
  ],
  checkLimit:
    "Checks verify stored dimensions, duration and video/audio presence. Compare replay for lost detail and correct proportions, and listen for the full sound.",
};

export default page;
