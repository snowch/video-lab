// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Locate each picture in time",
  goal: "Distinguish a picture’s display time from the clock units used to store it.",
  concept: [
    "A **presentation timestamp** says when a particular picture should appear. Frame rate summarises pictures per second; two videos can have the same average rate with different spacing between their pictures.",
    "Timestamps count **ticks**, each lasting one **time base**. Multiply the tick count by the time base to get seconds. A tick is a clock unit; many ticks can fit inside one picture interval.",
  ],
  worked: [
    {
      title: "Read presentation timestamps",
      introduction: [
        "Run the command to see the times attached to individual frames. `ffprobe` uses frame for both video pictures and decoded blocks of audio, so the report includes both kinds.",
        "If your saved command shows `frame=pts_time`, change it to `frame=media_type,pts_time` before running to include the frame type.",
      ],
      options: [
        {
          flag: "-show_entries frame=media_type,pts_time",
          meaning:
            "In each frame entry, `media_type` identifies video or audio and `pts_time` reports when it should play, in seconds.",
        },
      ],
      observe:
        "Near the end of Command output, find three consecutive `media_type=video` entries at `pts_time=7.625000`, `7.666667` and `7.708333`. Skip the audio entries between them. How much time elapses between successive pictures?",
      explanation: [
        "For this 24-picture-per-second source, one picture interval is 1 ÷ 24 seconds. The last decimal place varies because the printed seconds are rounded. Subtracting every adjacent entry would mix the audio and video clocks, so it would not measure video picture spacing.",
      ],
    },
  ],
  practice:
    "Run the practice command unchanged. Use the video stream’s `avg_frame_rate` and `time_base` to calculate the seconds and timestamp ticks from the first picture to the sixth. Do both values describe the same span?",
  practiceOptions: [
    {
      flag: "stream=avg_frame_rate,time_base",
      meaning:
        "Request two fields for each stream; the comma separates their names. `avg_frame_rate` is the average picture rate as a ratio, and `time_base` is seconds per timestamp tick.",
    },
  ],
  practiceObserve:
    "The first stream is video: `avg_frame_rate=24/1` and `time_base=1/12288`. Count the picture intervals from the first picture to the sixth. Use the video rate to find their elapsed duration, then divide by seconds per tick to obtain their tick count. Multiply your tick count by the time base to check the elapsed seconds. The audio stream has its own `time_base=1/48000`; its `avg_frame_rate=0/0` is not a video picture rate. Regular video spacing is verified for this supplied source; stream averages alone would not establish it for another file.",
  hints: [
    "Inspect the existing file; this task needs no new output media file.",
    "From the first picture to the sixth there are five gaps, rather than six. Use the first stream’s video values.",
    "At 24 pictures per second, one interval lasts 1/24 second. Multiply that interval by five before converting it to ticks.",
    "Divide the elapsed seconds by the duration of one tick: (5/24) ÷ (1/12288).",
    "Five intervals span 2560 ticks. Multiplying by 1/12288 gives 5/24 second, approximately 0.208333 seconds.",
  ],
  checkLimit:
    "The check confirms that inspection ran. Manually verify your tick calculation and distinguish tick duration from picture interval.",
};

export default page;
