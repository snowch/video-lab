// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";
import { pixelFormats } from "../pixel-formats.strings";

export const animation: PageCopy = {
  title: "Animate a sequence of drawings",
  goal: "Choose how quickly six drawings play while keeping a 24-frame-per-second video.",
  sourceNote:
    "frame-01.png through frame-06.png are six original 640 × 360 drawings. In filename order, the orange ball rises across the picture and returns to the ground line.",
  concept: [
    "In **frame-by-frame animation**, you draw successive positions yourself. These six pictures suggest a ball’s arc because each drawing changes its position. The numbered-image command gives those drawings times and puts them into a video.",
    "The input rate controls the pace of the action. At three drawings per second, six drawings take two seconds. A 24-frame-per-second output repeats each drawing eight times; those copies hold its position rather than adding positions between drawings.",
    "To author your own sequence, use a drawing tool outside this notebook. Keep the canvas size fixed, draw successive positions and export matching PNGs with consecutive names such as frame-01.png, frame-02.png and so on. Import the files through Files. Gaps in the numbering can end the sequence; export all drawings with matching dimensions and pixel format.",
  ],
  worked: [
    {
      title: "Play six drawings over two seconds",
      options: [
        {
          flag: "-framerate 3",
          meaning:
            "Read three drawings per second. This input option comes before -i.",
        },
        {
          flag: "-i frame-%02d.png",
          meaning:
            "Read the six numbered drawings in order. FFmpeg expands %02d to two-digit numbers, as in the previous sequence.",
        },
        {
          flag: "-vf fps=24",
          meaning:
            "Produce 24 output frames per second by repeating these drawings.",
        },
        {
          flag: "-pix_fmt yuv420p",
          meaning:
            "Request 8-bit colour components with a brightness-related sample at every pixel and colour differences at lower resolution. This is a practical format for H.264 playback; the picture dimensions stay unchanged.",
          reference: {
            href: "#/appendix/formats/pixel-formats",
            label: pixelFormats.linkLabel,
          },
        },
        {
          flag: "animation.mp4",
          meaning: "Write the animation to this output file.",
        },
      ],
      observe:
        "Replay animation.mp4. Follow the ball from left to right as it rises and falls. Look for the pauses at each drawn position. The output is two seconds at 24 frames per second, with 640 × 360 dimensions and no audio.",
      explanation: [
        "Six drawings × one-third of a second gives two seconds. At 24 output frames per second, that is 48 video frames, but still only six different drawings. The fps filter does not draw intermediate motion. More gradual movement would require more authored positions and suitable input timing.",
      ],
    },
  ],
  practice:
    "Create animation-practice.mp4 with the same six drawings completing the arc in one second. Keep the output at 24 frames per second. The starter currently uses three input drawings per second; change their input rate.",
  practiceObserve:
    "Compare animation-practice.mp4 with animation.mp4. The ball should visit the same six positions in the same order, taking half as long. The practice output has 24 video frames: four copies of each drawing. Check 640 × 360 dimensions and no audio.",
  hints: [
    "Keep all six source drawings and their numbered input pattern.",
    "Change how quickly FFmpeg reads the drawings; keep fps=24 for the output.",
    "Six drawings must fit into one second, so the input needs six drawings per second.",
    "Replace -framerate 3 with -framerate 6 and keep animation-practice.mp4 as the output name.",
    "Use `ffmpeg -framerate 6 -i frame-%02d.png -vf fps=24 -pix_fmt yuv420p animation-practice.mp4`.",
  ],
  checkLimit:
    "Checks verify one-second duration, 24 frames per second, 640 × 360 dimensions, video presence and no audio. Replay to judge the arc and drawing order; these visual properties are not checked automatically.",
};
