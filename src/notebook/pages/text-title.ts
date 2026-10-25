// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Render a title into pictures",
  goal: "Draw a permanent title onto the video using a supplied font.",
  sourceNote:
    "Load both the video and fonts/DejaVuSans.ttf. The font file supplies the letter shapes used to draw the title.",
  concept: [
    "A title can be part of the picture itself. Drawing letters into each frame is often called burning in text: the player shows those pixels along with the rest of the scene, so it cannot switch the title off.",
    "A font describes the shapes of letters. FFmpeg combines those shapes with your chosen word, size and colour to draw the title. In this example it stays in the upper-left throughout the clip, while the scene moves behind it. A fixed colour may be clear against one background and hard to read against another.",
  ],
  worked: [
    {
      title: "Draw a one-word title",
      introduction: [
        "Add Hello to the eight-second clip. The video filter below draws the letters before FFmpeg writes the output pictures.",
      ],
      options: [
        {
          flag: '-vf "drawtext=…"',
          meaning:
            "Apply the drawtext video filter. Quotes keep the complete filter expression together as one argument; colons separate its named settings.",
        },
        {
          flag: "fontfile=fonts/DejaVuSans.ttf",
          meaning:
            "Use the supplied DejaVu Sans font file at this path in the browser workspace.",
        },
        { flag: "text=Hello", meaning: "Draw the literal word Hello." },
        {
          flag: "fontsize=32",
          meaning: "Set the font size to 32 pixels.",
        },
        { flag: "fontcolor=white", meaning: "Draw white letters." },
      ],
      observe:
        "Replay titled.mp4. Look for Hello at the upper-left as the scene changes, and compare how clearly the white letters stand out against different backgrounds.",
      explanation: [
        "No position or time restriction was supplied, so the filter uses its default upper-left position and draws the word throughout the clip. The title is now part of the output pictures.",
      ],
    },
  ],
  practice:
    "Create practice-title.mp4 with Bunny in white at font size 40, using the supplied font. Keep the full eight-second clip and its sound. Compare the title with the worked example to judge whether the larger lettering is easier to read.",
  practiceObserve:
    "Check that the replay says Bunny throughout, that its letters are larger than Hello, and that sound remains. Watch the changing background to judge whether the white title stays readable.",
  hints: [
    "The title is drawn by the video filter; keep the input and supplied font path.",
    "Find the settings that control the word and the font size inside the quoted expression.",
    "Replace Hello with Bunny and change 32 to 40. Keep the white colour.",
    "Keep the colon separators and the quotes around the complete filter expression.",
    "Use text=Bunny:fontsize=40:fontcolor=white after the existing fontfile setting, and write practice-title.mp4.",
  ],
  checkLimit:
    "The check verifies duration and the presence of video and audio. Replay to verify the word, larger lettering, readability and audible sound.",
};

export default page;
