// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";
import { pixelFormats } from "../pixel-formats.strings";

export const hold: PageCopy = {
  title: "Hold a photograph on screen",
  goal: "Turn one photograph into a video that holds the same picture for a chosen duration.",
  concept: [
    "A photograph has a pixel grid but no video duration. To hold it on screen, FFmpeg can read the same image repeatedly and give those pictures successive times. The result is a video even though the scene does not move.",
    "Repeating the input does not decide when the output ends. Use an input loop to keep supplying pictures and an output duration to stop after the chosen number of seconds.",
    "A **pixel format** describes how a picture’s colour samples are stored. The output option `-pix_fmt yuv420p` requests a widely supported format that stores brightness-related luma at every pixel and colour at lower resolution. It does not choose the video codec or add sound.",
  ],
  worked: [
    {
      title: "Make a five-second hold",
      options: [
        {
          flag: "-loop 1",
          meaning:
            "For this image input, `1` switches looping on and `0` switches it off. The value is not a repeat count. Put `-loop 1` before the photograph’s `-i`; `-t 5` stops the output.",
        },
        {
          flag: "-i landscape.jpg",
          meaning: "Read the supplied 640 × 360 photograph.",
        },
        {
          flag: "-t 5",
          meaning:
            "Stop the output after five seconds, even though the input keeps repeating.",
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
          flag: "still.mp4",
          meaning: "Write the video to this output file.",
        },
      ],
      observe:
        "Replay still.mp4 through to the end. The photograph stays still for five seconds, and there is no sound. Find 640x360 in the output video description.",
      explanation: [
        "The image input defaults to 25 pictures per second. Five seconds therefore contains 125 frames showing the same photograph. Repeating it adds time, without creating movement or audio.",
        "The position of each option matters: -loop 1 belongs before the image input, while -t 5 and -pix_fmt yuv420p apply to the output. The finite output duration is what makes this looping command finish.",
      ],
    },
  ],
  practice:
    "Create still-practice.mp4 with the same photograph held for three seconds. The starter command currently makes a five-second hold; change its output duration.",
  practiceObserve:
    "Replay still-practice.mp4 to the end. Confirm that the same photograph remains visible throughout and the video ends after three seconds with no sound.",
  hints: [
    "Keep the photograph repeating so it supplies pictures for the whole hold.",
    "Change the output stopping time; the input loop can stay enabled.",
    "The number after -t is the output duration in seconds.",
    "Replace -t 5 with -t 3 and keep the output name still-practice.mp4.",
    "Use `ffmpeg -loop 1 -i landscape.jpg -t 3 -pix_fmt yuv420p still-practice.mp4`.",
  ],
  checkLimit:
    "Checks verify three-second duration, 640 × 360 dimensions, video presence and no audio. Replay to confirm that the photograph stays unchanged throughout.",
};
