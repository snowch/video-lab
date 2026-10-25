// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Join two clips",
  goal: "Place the six-second action clip after the eight-second short clip, keeping both picture and sound.",
  concept: [
    "A join places clips one after another on a single timeline. Here the first clip plays for eight seconds, then the second plays for six seconds. There is a straight cut between them, with no overlap or fade.",
    "Each source file contains a video stream and an audio stream: separate sequences of pictures and sound. Joining both means connecting the two video streams in order and doing the same for their audio streams.",
    "FFmpeg can describe those connections as a filter graph. A graph identifies the incoming streams, passes them through an operation and names the resulting streams so they can be written to a file.",
  ],
  worked: [
    {
      title: "Connect picture and sound in sequence",
      introduction: [
        "This command has two input files. FFmpeg numbers inputs from zero, so their positions matter when the graph refers to them.",
        "Read the graph from left to right: the first clip’s picture and sound enter together, followed by the second clip’s picture and sound. The joining operation produces one video stream and one audio stream; the final part of the command selects both for joined.mp4.",
      ],
      options: [
        {
          flag: "-i bunny-short.mp4 -i bunny-action.mp4",
          meaning:
            "Open two files. The first -i makes bunny-short.mp4 input 0; the second makes bunny-action.mp4 input 1. These numbers identify files, not individual streams.",
        },
        {
          flag: "-filter_complex",
          meaning:
            "Supply a filter graph that can connect streams from several inputs. The double quotes keep the whole graph together as one command argument.",
        },
        {
          flag: "[0:v][0:a][1:v][1:a]",
          meaning:
            "Choose the incoming streams. In [0:v], 0 is the input number and v means video; a means audio. Each clip supplies video then audio: input 0’s pair first, then input 1’s pair.",
        },
        {
          flag: "concat=n=2:v=1:a=1",
          meaning:
            "Concatenate, or join in sequence, two segments. n=2 sets the segment count; v=1 and a=1 request one video output and one audio output. Colons separate these settings.",
        },
        {
          flag: "[v][a]",
          meaning:
            "Name the graph’s output connections: v for the joined video and a for the joined audio. These are chosen labels, not filenames or input numbers.",
        },
        {
          flag: '-map "[v]" -map "[a]"',
          meaning:
            "Select both named graph outputs for the output file. Each -map chooses one stream; the bracket labels refer back to the graph’s connections.",
        },
        {
          flag: "joined.mp4",
          meaning: "Write the selected video and audio to this output file.",
        },
      ],
      observe:
        "Replay across eight seconds. The action clip should begin there, and the picture should end at fourteen seconds. Listen across the same cut to check that the sound follows the picture.",
      explanation: [
        "The graph consumes input 0’s video and audio before input 1’s pair. That makes the output sequence eight seconds followed by six seconds. FFmpeg processes the pictures and sound and encodes new output streams for the joined file.",
        "The supplied clips have matching picture sizes, frame rates and audio layouts, and both start at time zero. That preparation lets this graph join them directly; other files may need preparation before they can use the same graph.",
        "The video lasts exactly fourteen seconds. The file may report about 14.02 seconds because its encoded audio ends slightly later.",
      ],
    },
  ],
  practice:
    "Create practice-join.mp4 with bunny-action.mp4 first, then bunny-short.mp4. Keep picture and sound for both clips. Change the input order while keeping the graph and its output connections intact.",
  practiceObserve:
    "Check that the action clip opens the output and the short clip begins at six seconds. Replay with sound across that cut. Reversing the clips should change their order while keeping the total picture duration at fourteen seconds.",
  hints: [
    "The starter has the worked example’s order. The target reverses it.",
    "Find the two input filenames after the -i options.",
    "Input 0 is always the first file opened, whichever filename it has.",
    "The graph already joins input 0 before input 1, so swap the input filenames.",
    "Put -i bunny-action.mp4 before -i bunny-short.mp4. Keep the concat graph, both -map options and practice-join.mp4.",
  ],
  checkLimit:
    "The check measures duration and the presence of video and audio. Replay to verify clip order and picture and sound across the six-second cut.",
};

export default page;
