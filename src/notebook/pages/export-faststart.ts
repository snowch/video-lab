// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Prepare an MP4 for download playback",
  goal: "Put MP4 indexing information near the start of a file while preserving its picture and sound.",
  concept: [
    "An MP4 holds encoded media plus an **index**: metadata describing where media samples are stored and when to play them. The `moov` section holds this metadata. A player needs it to locate and time the pictures and sound before playback can begin.",
  ],
  worked: [
    {
      title: "Write an MP4 with its index near the beginning",
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the supplied eight-second video and sound.",
        },
        {
          flag: "-c copy",
          meaning:
            "Copy the selected compressed video and audio streams without encoding them again.",
        },
        {
          flag: "-movflags +faststart",
          meaning:
            "Set an MP4 output flag. The + enables faststart, which requests a second pass when finishing the file to move its indexing metadata near the beginning.",
        },
        {
          flag: "ready.mp4",
          meaning: "Write the prepared result to this new MP4 file.",
        },
      ],
      observe:
        "Find the log message ‘Starting second pass: moving the moov atom to the beginning of the file’. Also find (copy) on both stream-mapping lines. Replay ready.mp4 to check that the picture and sound remain intact.",
      explanation: [
        "The `moov` atom is the MP4 metadata section containing the index. The second-pass message reports the layout operation; the mapping lines show that the compressed video and sound were copied. The result still contains eight seconds of H.264 video and AAC sound.",
        "Local replay cannot demonstrate faster network startup: the entire file is already available here. On a website, startup also depends on the network, the server's ability to return requested parts of a file and the player's buffering. Preparing the layout does not guarantee instant playback.",
      ],
    },
  ],
  practice:
    "Apply the same preparation to `bunny-action.mp4` and save it as `practice-ready.mp4` for playback during download. Preserve its full six seconds of picture and sound without encoding them again. Adapt the command to the new input and output names, then use the log to distinguish the layout operation from stream copying.",
  practiceObserve:
    "Which log lines establish that the index was moved and that both streams were copied? Replay practice-ready.mp4 through to the end with sound and check that it contains the six-second action clip. Local startup time does not measure a network benefit.",
  hints: [
    "The practice input is `bunny-action.mp4`, a different clip from the worked example. Keep it complete.",
    "Use stream copying to preserve the existing compressed video and sound.",
    "The output must remain an MP4 file.",
    "Enable the faststart output flag before the output filename.",
    "Use `ffmpeg -i bunny-action.mp4 -c copy -movflags +faststart practice-ready.mp4`.",
  ],
  checkLimit:
    "Checks verify six seconds, video, audio, H.264 and MP4. They do not inspect index placement or network startup. Confirm the layout and copy messages in the log, then replay to check picture and sound.",
};

export default page;
