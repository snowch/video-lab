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
  personalMedia: {
    title: "Use your own drawings (optional)",
    paragraphs: [
      "Use a drawing tool outside this notebook. Keep one 640 × 360 canvas size, draw successive positions and export every drawing as PNG using the same 8-bit RGB colour mode and transparency settings. Use consecutive names such as sketch-01.png, sketch-02.png and so on, then import them through Files. This prefix keeps your drawings separate from the supplied frame files.",
      "Run `ffprobe sketch-01.png`, then repeat with each imported filename. On every Video line, compare png, the pixel-format word (such as rgba or rgb24) and dimensions: these must match across the sequence. If they differ, return to the editor and export again with the same 8-bit RGB mode and transparency settings. Palette optimisation can change the pixel format even when all files are PNG. A still image’s reported 25 fps does not set the animation’s pace; -framerate does.",
      "Reuse the worked command with `sketch-%02d.png` as the input pattern and `sketch-animation.mp4` as a new output filename. Keep the numbers consecutive; a gap can end the sequence. The input rate sets how quickly your drawings play. Use the supplied six drawings for the practice below.",
    ],
  },
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
