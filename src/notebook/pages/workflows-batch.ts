// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const copy: PageCopy = {
  title: "Repeat a workflow in a native shell",
  goal: "Inspect two browser files, then see how a shell repeats a command across local files.",
  concept: [
    "Batch processing applies the same operation to several files. A shell can select filenames and run FFmpeg once for each file, replacing the input and output names each time.",
    "This notebook runs individual FFmpeg and ffprobe commands. It does not run shell loops or expand wildcard patterns into filenames. The optional native script is a separate exercise for a terminal on your computer, with a POSIX shell and FFmpeg installed.",
  ],
  worked: [
    {
      title: "Inspect one browser file",
      introduction: [
        "Start with one named file. Its duration gives you a useful comparison when you inspect the second source.",
      ],
      options: [
        {
          flag: "bunny-short.mp4",
          meaning:
            "The input filename. ffprobe reports its media properties without creating an output file.",
        },
      ],
      observe:
        "Find Duration: 00:00:08.00 in the output. The lines headed Video and Audio describe the picture and sound in this file.",
      explanation: [
        "This inspection describes only the named input. Checking each source before a batch helps you decide whether the same edit makes sense for all of them.",
      ],
    },
  ],
  practice:
    "Inspect bunny-action.mp4 with ffprobe. Compare its duration with the worked source to check that you are reading the second file.",
  practiceObserve:
    "The input name should be bunny-action.mp4 and Duration should read 00:00:06.00. Both sources are long enough for a five-second preview.",
  hints: [
    "This practice inspects a browser file; it does not use the native script.",
    "Use the same inspection tool as the worked example.",
    "Give it the action clip's filename as its input.",
    "No output filename or extra options are needed.",
    "Use ffprobe bunny-action.mp4.",
  ],
  checkLimit:
    "The check records browser inspection only. If you run the native script, inspect its terminal log and replay the exported previews yourself; the notebook cannot check those results.",
  nativeExplanation: [
    "To try this script, download previews.sh and your MP4 sources into the same dedicated folder on your computer. Open a terminal in that folder and run sh previews.sh, using a POSIX shell with FFmpeg installed. Browser workspace files must be downloaded first; the terminal cannot read them directly.",
    "#!/bin/sh selects a POSIX shell when the script is executed as a program. set -e stops this script when a command fails; set -u treats an unset variable as an error. mkdir -p exports creates the output folder if needed. These are shell instructions.",
    'for input in ./*.mp4; do repeats the following commands for MP4 names in the current folder. [ -f "$input" ] tests for a regular file; || continue skips an entry that fails the test, including an unmatched literal pattern. Double quotes keep filenames containing spaces together. done ends the loop.',
    "name=${input##*/} removes the longest prefix ending in /, leaving the filename. ${name%.*} removes its final extension. These shell expressions build a separate exports/...-preview.mp4 output path for each input.",
    "In the FFmpeg line, -n refuses to replace an existing output, -i reads the current input, and -t 5 limits the output to five seconds. A shorter source remains shorter. -vf applies a video filter: scale=640:-2 sets the width to 640 pixels and calculates an even height while preserving the picture's proportions as closely as possible. The final path names the output file.",
    "An existing output makes FFmpeg refuse the write, and set -e then stops the script. Review the terminal log before retrying. Replay the previews to check picture, sound and framing; different sources may need different edits.",
  ],
};

export default copy;
