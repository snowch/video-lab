// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Locate each picture in time",
  goal: "Distinguish a picture’s display time from the clock units used to store it.",
  concept: [
    "A frame rate summarises how many pictures a video displays per second. A presentation timestamp gives the time at which a particular picture should appear. Two videos can have the same average frame rate while spacing their pictures differently.",
    "Media stores timestamps as counts of small time units called ticks. The time base is the duration of one tick, expressed as a fraction of a second. Multiplying a timestamp’s tick count by its time base gives a time in seconds. A tick is a clock unit, not a picture.",
  ],
  worked: [
    {
      title: "Read presentation timestamps",
      introduction: [
        "Inspect the times attached to individual frames. ffprobe uses ‘frame’ for both video pictures and decoded blocks of audio, so this command lists both kinds together.",
      ],
      options: [
        {
          flag: "-show_entries frame=pts_time",
          meaning:
            "Request selected information: frame names the section, and pts_time requests its presentation timestamp in seconds. The equals sign separates the section from its field name.",
        },
      ],
      observe:
        "Find timestamps such as 7.625000, 7.666667 and 7.708333 near the end of the output. They are successive video picture times, about 0.041667 seconds apart. Other entries occur between them because audio frames are listed too.",
      explanation: [
        "For this 24-picture-per-second source, one picture interval is 1 ÷ 24 seconds. The last decimal place varies because the printed seconds are rounded. Subtracting every adjacent entry would mix the audio and video clocks, so it would not measure video picture spacing.",
      ],
    },
  ],
  practice:
    "Inspect the stream summaries. Use the video values to calculate how many ticks fit into one 1/24-second picture interval.",
  practiceOptions: [
    {
      flag: "stream=avg_frame_rate,time_base",
      meaning:
        "Request two fields for each stream; the comma separates their names. avg_frame_rate is the average picture rate as a ratio, and time_base is seconds per timestamp tick.",
    },
  ],
  practiceObserve:
    "The first stream is video: avg_frame_rate=24/1 and time_base=1/12288. Check your calculated tick count by multiplying it by 1/12288 seconds per tick: the result should equal the 1/24-second picture interval. The second stream is audio and has its own time base, 1/48000; its avg_frame_rate=0/0 does not describe a video picture rate. These stream summaries alone do not establish that every video picture interval is equal.",
  hints: [
    "Inspect the existing file; this task needs no new output media file.",
    "The supplied command requests stream summaries rather than individual frame records.",
    "For this source, the first stream is video and the second is audio.",
    "Read 24/1 as 24 pictures per second and 1/12288 as seconds per tick.",
    "Divide the picture interval by the tick duration: (1/24) ÷ (1/12288) = 512 ticks.",
  ],
  checkLimit:
    "The check confirms that inspection ran. Manually verify your tick calculation and distinguish tick duration from picture interval.",
};

export default page;
