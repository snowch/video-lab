// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Copy compressed streams",
  goal: "Create a new file containing the original video and sound without encoding them again.",
  concept: [
    "Video and sound are stored as compressed streams. A decoder reconstructs pictures or sound from those streams; an encoder turns pictures or sound into compressed data. Encoding again can lose detail, even when the result uses the same compression format.",
    "Stream copying transfers the existing compressed data into a new file without decoding and encoding it. This avoids another encoding step and preserves the encoded picture and sound quality. It cannot apply filters, because a filter needs the decoded pictures or sound to change.",
    "The container is the file structure that holds the streams and their timing. Here, MP4 can hold the source's H.264 video and AAC sound, so both streams can be copied into another MP4. Copying to a different container works only if it supports those stream formats.",
  ],
  worked: [
    {
      title: "Copy video and sound into a new MP4",
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the source video and sound from bunny-short.mp4.",
        },
        {
          flag: "-c copy",
          meaning:
            "The -c option selects a codec action: how FFmpeg handles compressed output streams. The special value copy transfers existing encoded data instead of using an encoder. With no stream suffix, this applies to both selected streams here: video and audio.",
        },
        {
          flag: "copied.mp4",
          meaning: "Write a new MP4 file with this name.",
        },
      ],
      observe:
        "Find the two lines under Stream mapping in the output log. Both end in (copy). Replay copied.mp4 and compare its picture and sound with the source.",
      explanation: [
        "The output retains all eight seconds, with H.264 video at 854 × 480 and AAC sound. The mapping lines show that both streams took the copy path. Seeing H.264 in the output alone would not establish this: encoding again could also produce H.264.",
        "The new file need not have identical bytes to the source. FFmpeg writes the container again, so its metadata and layout may change even though the compressed picture and sound data are copied.",
      ],
    },
  ],
  practice:
    "Use bunny-action.mp4, the six-second action clip, to create practice-copy.mp4 with its video and sound unchanged by encoding. The starter leaves FFmpeg to choose encoders: change it to copy both streams instead. Use the mapping lines to establish which path FFmpeg took.",
  practiceObserve:
    "Check that both stream-mapping lines end in (copy), rather than showing a decoder and encoder. Replay practice-copy.mp4 to confirm it contains the full six-second action scene with sound. H.264 video and AAC sound alone would also be possible after encoding again.",
  hints: [
    "Use bunny-action.mp4 as the input and keep all six seconds; no duration or start-time option is needed.",
    "Keep both video and audio enabled.",
    "Choose the output codec action that preserves the existing compressed data.",
    "Use -c copy before the output filename.",
    "Use ffmpeg -i bunny-action.mp4 -c copy practice-copy.mp4.",
  ],
  checkLimit:
    "Checks verify duration, video, audio and H.264 video format. Confirm (copy) for both streams in the log and replay to check the complete picture and sound.",
};

export default page;
