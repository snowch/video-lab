// Copyright © 2026 Christopher Snow
import type { CourseCopy } from "./copy-types";
import page0 from "./pages/cut-join-copy";
import page1 from "./pages/cut-join-join";
import page2 from "./pages/cut-join-keyframes";
import page3 from "./pages/export-decode";
import page4 from "./pages/export-faststart";
import page5 from "./pages/export-format";
import page6 from "./pages/export-verify";
import page7 from "./pages/first-edit-shorten";
import page8 from "./pages/first-edit-start";
import page9 from "./pages/frames-time-rate";
import page10 from "./pages/frames-time-timestamps";
import page11 from "./pages/framing-crop";
import page12 from "./pages/framing-pad";
import page13 from "./pages/framing-scale";
import page14 from "./pages/inside-video-inspect";
import page15 from "./pages/inside-video-streams";
import page16 from "./pages/quality-quality";
import page17 from "./pages/quality-speed";
import page18 from "./pages/sound-fade";
import page19 from "./pages/sound-level";
import page20 from "./pages/text-subtitles";
import page21 from "./pages/text-title";
import page22 from "./pages/workflows-batch";
import page23 from "./pages/workflows-reuse";

import { hold } from "./pages/image-hold";
import { sequence } from "./pages/image-sequence";
import { animation } from "./pages/image-animation";
import { overlay } from "./pages/image-overlay";
import { imageCopy } from "./images.strings";
export const courseCopy: CourseCopy = {
  title: "Video Lab: Editing with FFmpeg",
  intro:
    "Learn video editing by reading, changing and running real FFmpeg commands. Each short page introduces one idea, keeps its result beside the command and gives you a separate task to try. Start with the supplied short practice clips from Big Buck Bunny, an animated short film. A two-minute excerpt is also available. No media knowledge is assumed.",
  chapters: {
    "image-video": {
      title: imageCopy.chapterTitle,
      summary: imageCopy.chapterSummary,
    },
    "first-edit": {
      title: "Your first edit",
      summary: "Choose a kept duration, then its starting point.",
    },
    "inside-video": {
      title: "Inside a video file",
      summary: "Separate the container from its picture and sound streams.",
    },
    "frames-time": {
      title: "Frames and time",
      summary: "Distinguish picture cadence, timestamps and clock units.",
    },
    "cut-join": {
      title: "Cuts and joins",
      summary:
        "Understand copying, picture dependencies and connected timelines.",
    },
    framing: {
      title: "Picture framing",
      summary: "Resize, crop or pad with a deliberate field of view.",
    },
    sound: {
      title: "Sound",
      summary: "Change sample amplitude and its shape through time.",
    },
    text: {
      title: "Titles and subtitles",
      summary: "Render lettering from a font or timed text file.",
    },
    quality: {
      title: "Compression choices",
      summary: "Compare quality targets and encoder effort using real outputs.",
    },
    export: {
      title: "Export and verification",
      summary: "Choose formats, organise metadata, inspect and decode.",
    },
    workflows: {
      title: "Repeatable work",
      summary:
        "Reuse browser commands and understand a separate native batch script.",
    },
  },
  pages: {
    "image-video/hold": hold,
    "image-video/sequence": sequence,
    "image-video/animation": animation,
    "image-video/overlay": overlay,
    "cut-join/copy": page0,
    "cut-join/join": page1,
    "cut-join/keyframes": page2,
    "export/decode": page3,
    "export/faststart": page4,
    "export/format": page5,
    "export/verify": page6,
    "first-edit/shorten": page7,
    "first-edit/start": page8,
    "frames-time/rate": page9,
    "frames-time/timestamps": page10,
    "framing/crop": page11,
    "framing/pad": page12,
    "framing/scale": page13,
    "inside-video/inspect": page14,
    "inside-video/streams": page15,
    "quality/quality": page16,
    "quality/speed": page17,
    "sound/fade": page18,
    "sound/level": page19,
    "text/subtitles": page20,
    "text/title": page21,
    "workflows/batch": page22,
    "workflows/reuse": page23,
  },
};
