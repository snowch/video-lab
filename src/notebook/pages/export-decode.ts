// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Decode the whole file",
  goal: "Check that FFmpeg can reconstruct the picture and sound through to the end.",
  concept: [
    "A file can have readable headers but damaged media later on. The headers describe its streams; decoding reconstructs pictures and sound samples from the stored data. Processing the whole file can expose errors that a metadata inspection misses.",
    "For this test, FFmpeg processes the media and discards the result. The evidence is the run status and log, rather than a new video file. A completed decode tests this FFmpeg build with this source; judging the content still needs viewing and listening.",
  ],
  worked: [
    {
      title: "Decode without saving a video",
      introduction: [
        "Test the supplied eight-second clip. No time limit is set, so processing can continue to the end of the selected streams.",
      ],
      options: [
        {
          flag: "-xerror",
          meaning: "Stop processing when FFmpeg encounters an error.",
        },
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the clip to be tested.",
        },
        {
          flag: "-f null",
          meaning:
            "Use the null output format, which discards the processed media instead of saving a playable file.",
        },
        {
          flag: "-",
          meaning:
            "Supply the output destination required by FFmpeg. With null output, there is no file to download. This dash does not connect another command.",
        },
      ],
      observe:
        "Find Stream mapping in the log: both the video and audio should be listed. Then find the final progress line and compare its time with the source duration of eight seconds. Check the reported completion status as well.",
      explanation: [
        "The verified run processes 192 video frames and reaches time=00:00:08.00, with both video and audio selected. These details show what was processed; an input duration near the top of the log alone would only describe the source.",
        "Read the completion status and processing log together. A final progress line alone does not establish that the whole file decoded without errors.",
      ],
    },
  ],
  practice:
    "Verify the six-second bunny-action.mp4 clip without creating a media file. Make the run stop on errors, and use its log to establish whether both picture and sound were processed through to the end.",
  practiceObserve:
    "Find the selected streams under Stream mapping, then compare the final processing time with this source's duration. Check the completion status as well. Replay bunny-action.mp4 to judge its picture and sound: decoding cannot tell whether the content is what you intended.",
  hints: [
    "Use FFmpeg to reconstruct the media rather than only inspect its headers.",
    "Change the input to bunny-action.mp4 and leave out any time limit.",
    "Use -xerror to stop on errors.",
    "Use the null output format so that the processed media is discarded.",
    "Finish with -f null -; check the selected streams, final progress time and completion status.",
  ],
  checkLimit:
    "The check records a completed decoding command. Confirm stream selection and full duration in its log, then watch and listen to judge content quality; this does not test another player's compatibility.",
} satisfies PageCopy;
