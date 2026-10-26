// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Keep a smaller field of view",
  goal: "Make a square video by removing picture area around its edges.",
  concept: [
    "**Cropping** keeps a rectangle from each picture and discards the surrounding area. Objects keep their size in pixels; scaling instead resizes them onto a new grid.",
    "A crop removes context without adding detail. Follow the whole movement to judge whether the subject stays visible; the opening picture alone is insufficient.",
  ],
  worked: [
    {
      title: "Keep a central square",
      introduction: [
        "The source is 854 pixels wide and 480 pixels high. Keep a square as tall as the source, taking its picture area from the centre.",
      ],
      options: [
        {
          flag: '-vf "crop=480:480"',
          meaning:
            "Apply a video filter to each picture. The crop filter takes width:height in pixels, so these values keep a 480 × 480 rectangle. With no position values supplied, it centres the rectangle within the source.",
        },
      ],
      observe:
        "Compare the source and square.mp4 at the same moment. The square retains the full picture height while removing area from the left and right. Follow the action through the whole result and listen for the sound.",
      explanation: [
        "The output is 480 × 480 and still eight seconds long, with audio. Cropping changes the view within each picture; this command does not cut time from the clip.",
        "The player may enlarge the square to fit its display area. Judge the crop by which objects and edges remain, rather than their apparent size on screen.",
      ],
    },
  ],
  practice:
    "Make `practice-square.mp4` with a centred 360 × 360 crop of `bunny-short.mp4`. Keep all eight seconds and the sound. Compared with the worked square, this should remove picture area above and below as well as from the sides.",
  practiceObserve:
    "Compare the two square outputs at the same moment, then replay the smaller crop in full. Identify an object or piece of background that the smaller crop loses, and decide whether the remaining view still makes the action clear.",
  hints: [
    "Keep using the original source so the crop is taken from the full picture.",
    "Change the size values inside the crop filter.",
    "A square needs equal width and height.",
    "Set both size values to 360; leaving out position values keeps the crop centred.",
    'Use `ffmpeg -i bunny-short.mp4 -vf "crop=360:360" practice-square.mp4`.',
  ],
  checkLimit:
    "Checks verify 360 × 360 dimensions, eight seconds and an audio stream. Replay to judge whether the action stays in frame and the sound plays correctly.",
};

export default page;
