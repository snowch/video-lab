// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Time text with a subtitle file",
  goal: "Use a separate text file to decide when lettering appears in the picture.",
  sourceNote:
    "This example needs the video, captions.srt and fonts/DejaVuSans.ttf. Open captions.srt in Files to see the two cues and their times.",
  concept: [
    "A **subtitle cue** pairs text with a start and end time. The supplied text is original instructional material, rather than a transcription of Big Buck Bunny dialogue.",
    "`captions.srt` is a plain-text SubRip file. Each cue has a number, a timing line and text, with a blank line between cues. Times use `hours:minutes:seconds,milliseconds`; `-->` separates start and end. The timeline shows the supplied intervals.",
    "This lesson **burns in** the text: it becomes picture pixels, so viewers cannot switch it off as a separate subtitle track. Editing the cue file changes future renders; it cannot change a finished video.",
  ],
  worked: [
    {
      title: "Render the two timed cues",
      introduction: [
        "The subtitle renderer reads the cue file and draws each cue during its interval. It also needs a font. This command makes the supplied font available and explicitly selects its family.",
      ],
      options: [
        {
          flag: '-vf "…"',
          meaning:
            "Apply the quoted video filter expression. Keep the complete expression inside the quotes, including the space in DejaVu Sans. Colons separate the subtitle filter’s settings.",
        },
        {
          flag: "subtitles=captions.srt",
          meaning:
            "Read the timed cues from `captions.srt` and draw their text into the pictures.",
        },
        {
          flag: "fontsdir=fonts",
          meaning:
            "Make the fonts folder available to the subtitle renderer. Loading a folder does not select a font.",
        },
        {
          flag: "force_style=Fontname=DejaVu Sans",
          meaning:
            "Override the subtitle style’s font choice with DejaVu Sans, the supplied font’s internal family name rather than its .ttf filename. This browser build should not be assumed to have access to fonts installed on your device.",
        },
      ],
      observe:
        "Replay subtitled.mp4 from the start. The first cue should give way to the second at 3 seconds; after 6 seconds, neither cue should remain. Check that the letters are readable over the changing scene.",
      explanation: [
        "The cue intervals control visibility while the video continues underneath. The result still has eight seconds of video and sound, including the final two seconds without cue text.",
      ],
    },
  ],
  practice:
    "In Files, change only the second cue’s words in `captions.srt` to a short description of something you can see in the scene. Keep both timing lines unchanged and save the text file. Render `practice-subtitles.mp4` using the supplied font and all eight seconds of video and sound.",
  practiceObserve:
    "Check that your new words appear from 3 to 6 seconds, while the first cue stays unchanged. Compare with subtitled.mp4, then listen for sound. Download the edited text file if you want to retain it.",
  hints: [
    "The words live in `captions.srt`, so the video command can stay the same after a text edit.",
    "Keep the cue numbers, timing lines and blank line between cues intact.",
    "Use the subtitle video filter with the edited `captions.srt` file.",
    "Make the fonts folder available and explicitly select the DejaVu Sans family.",
    "Keep `subtitles=captions.srt:fontsdir=fonts:force_style=Fontname=DejaVu Sans` inside double quotes, and save the video as `practice-subtitles.mp4`.",
  ],
  checkLimit:
    "The check measures duration and the presence of video and audio. Replay to confirm the edited words, cue timing and readability, and listen for sound.",
};

export default page;
