// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Cut across picture dependencies",
  goal: "Compare a fast copied cut with a cut that rebuilds the pictures at the requested start.",
  concept: [
    "Compressed video need not store every picture in full. Many pictures describe changes relative to other pictures. To display one of them, a decoder may need to reconstruct earlier pictures first.",
    "A keyframe provides a starting point for decoding. A requested cut can fall between these starting points. Copying the compressed data preserves those dependencies; decoding and encoding can build a new beginning for the kept pictures.",
  ],
  worked: [
    {
      title: "Seek and copy",
      introduction: [
        "Keep the interval from source second 2 to second 5. First try copying the existing compressed data, which avoids rebuilding the pictures.",
      ],
      options: [
        {
          flag: "-ss 2 before -i",
          meaning:
            "Seek to second 2 in the input. Seeking may land at an earlier point from which decoding can begin.",
        },
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the practice source.",
        },
        {
          flag: "-t 3",
          meaning: "Request three seconds of output from the selected start.",
        },
        {
          flag: "-c copy",
          meaning:
            "Copy the compressed video and audio packets without decoding and encoding them. Material before the requested start may be retained to support decoding.",
        },
      ],
      observe:
        "Replay the opening of rough.mp4 and compare it with the source around second 2. In the recorded native and browser runs, the file duration was 3.125 seconds despite the three-second request.",
      explanation: [
        "The copied file retains the source picture dependencies. Its timestamps and the player's handling of them affect which pictures you see at the start. A visible early opening is possible, but is not guaranteed for every source and player.",
      ],
    },
    {
      title: "Decode and rebuild the cut",
      introduction: [
        "Now make the same requested interval by decoding the source and encoding the kept pictures into a new file. This allows FFmpeg to discard pictures before the chosen start even when they were needed to decode later ones.",
      ],
      options: [
        {
          flag: "-ss 2 after -i",
          meaning:
            "Treat the start as an output option: decode and discard material before source second 2.",
        },
        {
          flag: "exact.mp4 without -c copy",
          meaning:
            "Write a new MP4 using FFmpeg's default encoders. The kept pictures and sound are encoded again rather than copied.",
        },
      ],
      observe:
        "Compare the opening of exact.mp4 with rough.mp4 and source second 2. The recorded native and browser runs produced three seconds of video and audio; the video contained 72 pictures at 24 frames per second.",
      explanation: [
        "Encoding again takes more work and can change quality, but permits a cut at a decoded picture rather than preserving the source's compressed boundaries. A three-second duration alone cannot tell you which source picture begins the result.",
      ],
    },
  ],
  practice:
    "Deliver practice-exact.mp4 containing source seconds 1 to 4, with video and audio. Choose the approach that can discard decoded pictures before the start, then check that the opening matches the source around second 1.",
  practiceObserve:
    "Replay the first moment of practice-exact.mp4 and compare it with the source around second 1. Listen at the start as well: matching the duration does not establish that the intended moment was kept.",
  hints: [
    "The requested interval lasts three seconds; 4 is the end time, not the duration.",
    "Choose the approach that rebuilds the kept pictures.",
    "Place the start option after the input and leave out stream copying.",
    "Use -ss 1 and -t 3, then name the output practice-exact.mp4.",
    "Use ffmpeg -i bunny-short.mp4 -ss 1 -t 3 practice-exact.mp4.",
  ],
  checkLimit:
    "Checks verify about three seconds and the presence of video and audio. Compare the opening with source second 1 yourself; these checks do not establish the source start or whether encoding was used.",
};

export default page;
