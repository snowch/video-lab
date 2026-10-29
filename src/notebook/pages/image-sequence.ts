// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";
import { pixelFormats } from "../pixel-formats.strings";

export const sequence: PageCopy = {
  title: "Show pictures in order",
  goal: "Turn three numbered pictures into a slideshow, then shorten each hold.",
  sourceNote:
    "Use `drawing-01.png`, `drawing-02.png` and `drawing-03.png`: three original 640 × 360 PNG drawings. For your own pictures, prepare matching dimensions and PNG format, then give them consecutive numbered names. Files supports renaming; importing unrelated pictures does not prepare a sequence.",
  concept: [
    "An **image sequence** is an ordered set of still-image files. FFmpeg reads each supplied picture once and gives it a duration from the input frame rate. Three pictures at half a picture per second each last two seconds: six seconds altogether.",
    "The input rate determines how long each drawing lasts. The output frame rate determines how many video frames represent that time. Repeating a drawing at 24 frames per second holds it on screen; it does not create movement between drawings.",
  ],
  worked: [
    {
      title: "Hold each picture for two seconds",
      options: [
        {
          flag: "-framerate 1/2",
          meaning:
            "Read half a picture per second, so each input picture lasts two seconds. This input option goes before -i.",
        },
        {
          flag: "-i drawing-%02d.png",
          meaning:
            "Read the numbered PNGs in order. %02d is FFmpeg’s image2 pattern for a two-digit number: 01, 02, 03. FFmpeg expands it; it is not shell syntax. Keep the numbers consecutive because a missing number can end the sequence.",
        },
        {
          flag: "-vf fps=24",
          meaning:
            "Repeat the timestamped drawings to produce 24 output frames per second: 48 frames for each two-second hold.",
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
          flag: "slides.mp4",
          meaning: "Write the slideshow to this output file.",
        },
      ],
      observe:
        "Replay slides.mp4 from the start. Look for the ball low on the left, high near the middle, then low on the right. Each drawing should hold for two seconds, giving six seconds of silent video.",
      explanation: [
        "The three source pictures become 144 output frames: 3 × 2 × 24. Those repeated frames keep the pictures visible at the requested output rate. The ball jumps between the three drawn positions because there are no pictures of the positions between them.",
      ],
    },
  ],
  practice:
    "Create `slides-practice.mp4` from the same three drawings, holding each for one second. Keep the output at 24 frames per second and 640 × 360 pixels, with no audio. The result should last three seconds.",
  practiceObserve:
    "Replay slides-practice.mp4 beside slides.mp4. Confirm the same three pictures in the same order, now changing once per second. The shorter slideshow contains 72 output frames.",
  hints: [
    "Keep all three source pictures; shorten the time assigned to each one.",
    "Change the image input rate before -i. Keep the output fps filter at 24.",
    "One picture per second gives each drawing a one-second hold.",
    "Set -framerate to 1 and write to slides-practice.mp4.",
    "Use `ffmpeg -framerate 1 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides-practice.mp4`.",
  ],
  checkLimit:
    "Checks verify duration, frame rate, dimensions and absence of audio. Replay is essential to confirm that all three pictures appear in the right order and hold for the intended time.",
};
