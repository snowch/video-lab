// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Read the file description",
  goal: "Distinguish the file format from the video and audio stored inside it.",
  furtherReading: {
    title: "More on codecs (optional)",
    pages: ["cut-join/copy", "quality/quality", "export/format"],
  },
  concept: [
    "A video file can hold pictures and sound in separate **streams**. A video stream carries pictures through time; an audio stream carries sound. Their timing lets a player present them together.",
    "The **container** is the file format that organises the streams. MP4 is a container. A **codec** describes how a stream’s pictures or sound are encoded and decoded for playback. H.264 is a video codec; AAC is an audio codec. The `.mp4` ending alone does not identify the codecs inside.",
    "A **frame** is one video picture, made from a grid of **pixels**. Its dimensions give the grid’s width and height: `854x480` means 854 pixels across and 480 down.",
  ],
  worked: [
    {
      title: "Inspect without editing",
      introduction: [
        "`ffprobe` reads a media file and reports what it contains without creating an edited copy. Its summary includes the container, duration and a line for each stream.",
      ],
      options: [
        {
          flag: "ffprobe bunny-short.mp4",
          meaning:
            "Run the inspection tool on `bunny-short.mp4`. This command needs only the input filename; it has no flags or output filename.",
        },
      ],
      observe:
        "Find `Input #0`, then the two `Stream` lines. Use the supplied example to identify the container and each stream’s type and codec.",
      explanation: [
        "The guide explains the supplied source. Your raw output remains the evidence for the file you inspected. Stream numbers identify positions within that file; use `Video` and `Audio` to identify stream types.",
      ],
    },
  ],
  practice:
    "Inspect `bunny-action.mp4` to make a compact file description: find its duration, count its streams, and identify the container and each stream's codec separately. Which properties match the worked example, and which differ? Use the output as evidence.",
  practiceObserve:
    "Read Duration as hours:minutes:seconds, then count the Stream lines. For each stream, identify its type and the codec immediately after Video or Audio. Keep these separate from the container description on the Input line.",
  hints: [
    "Inspection needs `ffprobe` and an input file, with no output file.",
    "Use `bunny-action.mp4` as the input filename.",
    "The Duration line uses hours:minutes:seconds. Count only the lines beginning Stream.",
    "The Input line describes the container family. Read Video and Audio for each stream's codec.",
    "Run `ffprobe bunny-action.mp4`. Compare its Duration, Video and Audio lines with those from `bunny-short.mp4`; a different duration does not require different codecs.",
  ],
  checkLimit:
    "The check records that inspection ran. Manually match your description to the Duration, Video and Audio lines; the check does not assess your reading of them.",
} satisfies PageCopy;
