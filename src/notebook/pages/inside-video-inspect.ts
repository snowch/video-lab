// Copyright © 2026 Christopher Snow
import { codecGuide } from "../codecs.strings";
import type { PageCopy } from "../copy-types";

export default {
  codecGuide: true,
  title: "Read the file description",
  goal: "Distinguish the file format from the video and audio stored inside it.",
  furtherReading: {
    title: "More on codecs and compression (optional)",
    pages: ["cut-join/copy", "quality/quality", "export/format"],
  },
  concept: [
    "A video file can hold pictures and sound in separate **streams**. A video stream carries pictures through time; an audio stream carries sound. Their timing lets a player present them together.",
    codecGuide.chapterIntro,
    "A **frame** is one video picture, made from a grid of **pixels**. Its dimensions give the grid’s width and height: `854x480` means 854 pixels across and 480 down.",
  ],
  worked: [
    {
      title: "Inspect without editing",
      introduction: [
        "`ffprobe` inspects a media file without changing it. It uses a **demuxer**: a container reader that identifies the streams inside the file and reads their data separately. For example, an MP4 demuxer can read the video and audio streams stored together in an MP4 file. FFprobe then reports format information, duration and a description of each stream.",
      ],
      options: [
        {
          flag: "ffprobe bunny-short.mp4",
          meaning:
            "Run the inspection tool on `bunny-short.mp4`. This command needs only the input filename; it has no flags or output filename.",
        },
      ],
      observe:
        "Find `Input #0`, then the two `Stream` lines. Read the format names supported by the reader, then identify each stream’s type and codec.",
      explanation: [
        "The guide explains the supplied source. Your raw output remains the evidence for the file you inspected. Stream numbers identify positions within that file; use `Video` and `Audio` to identify stream types.",
      ],
    },
  ],
  practice:
    "Inspect the supplied MP4 file `bunny-action.mp4` to make a compact description: find its duration, count its streams, and identify each stream's type and codec. Which properties match the worked example, and which differ? Use the output as evidence.",
  practiceObserve:
    "Read Duration as hours:minutes:seconds, then count the Stream lines. For each stream, identify its type and the codec immediately after Video or Audio. The Input line lists the reader’s supported formats; it does not establish the exact container by itself.",
  hints: [
    "Inspection needs `ffprobe` and an input file, with no output file.",
    "Use `bunny-action.mp4` as the input filename.",
    "The Duration line uses hours:minutes:seconds. Count only the lines beginning Stream.",
    "The Input line lists formats supported by the reader. Read Video and Audio for each stream's codec.",
    "Run `ffprobe bunny-action.mp4`. Compare its Duration, Video and Audio lines with those from `bunny-short.mp4`; a different duration does not require different codecs.",
  ],
  checkLimit:
    "The check records that inspection ran. Manually match your description to the Duration, Video and Audio lines; the check does not assess your reading of them.",
} satisfies PageCopy;
