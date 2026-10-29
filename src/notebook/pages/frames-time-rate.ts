// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Count pictures through time",
  goal: "Reduce the number of pictures shown each second while keeping the same four-second scene.",
  conceptHeadings: ["Frame rate"],
  concept: [
    "**Frame rate** is the number of video pictures presented per second, measured in frames per second (fps). At a constant 24 fps, each picture occupies 1/24 of a second. Showing fewer pictures across the same interval leaves larger jumps in movement; it need not shorten the scene.",
  ],
  worked: [
    {
      title: "Show 12 pictures per second",
      introduction: [
        "A **video filter** changes pictures or their timing. Here, the filter selects fewer pictures from the source and spaces them across the same four seconds.",
      ],
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read the source video and sound from `bunny-short.mp4`.",
        },
        {
          flag: "-t 4",
          meaning: "Limit the output to four seconds.",
        },
        {
          flag: '-vf "fps=12"',
          meaning:
            "Apply a video filter with -vf. Inside the quotes, fps names the frame-rate filter and =12 sets its rate to 12 pictures per second. The quotes keep the filter expression together as one argument.",
        },
        {
          flag: "paced.mp4",
          meaning: "Write the result to this output file.",
        },
      ],
      observe:
        "Replay paced.mp4 and compare its movement with the opening four seconds of the source. Listen for the same sound at the same pace.",
      explanation: [
        "The output still lasts four seconds. At 12 pictures per second, it contains 4 × 12 = 48 video frames. Each picture is shown for twice as long as a source frame, so fewer intermediate positions are visible.",
        "The filter drops or repeats source pictures to meet the requested rate; it does not invent new motion between them. This reduction drops pictures. Raising the result back to 24 frames per second would repeat pictures rather than recover the discarded positions. The video filter does not change the sound's pace.",
      ],
    },
  ],
  practice:
    "Create `practice-rate.mp4` containing the opening four seconds at 6 frames per second, with sound. Aim for more visibly stepped movement over the same interval.",
  practiceObserve:
    "Compare the same movement in practice-rate.mp4, paced.mp4 and the source. The six-frame-per-second version has 24 video frames across four seconds. Check that the motion has larger steps while the scene and sound keep their pace.",
  hints: [
    "Keep the output interval at four seconds.",
    "Change the video filter rather than the duration.",
    "The number after fps= sets the number of pictures per second.",
    "Use fps=6 and keep the source sound enabled.",
    'Use `ffmpeg -i bunny-short.mp4 -t 4 -vf "fps=6" practice-rate.mp4`.',
  ],
  checkLimit:
    "Checks verify duration, frame rate and the presence of video and audio. Replay to judge motion and confirm that the sound keeps its pace.",
};

export default page;
