# Terminal overflow cues: independent reader

Copyright © 2026 Christopher Snow.

Reviewed 23 October 2026 on the local built inspection reference, bundle `index-BjzZ2r1X.js`. I read the short slice plan, then exercised the page without reading implementation or tests. Scope is the new output cues only.

No justified findings or blockers.

After entering `help`, the right-edge fade and “More output →” button make the cropped phone descriptions discoverable. The accompanying instruction still explains sideways scrolling and the wrap alternative. The button is below the output rather than over its text. After moving right, “← Previous output” and a matching left fade appear. The labels, arrows and edge effects were readable at 1440 × 1000 and 390 × 844 in actual light and dark themes. Phone buttons occupy separate rows when necessary without widening the document.

Actual interactions and measurements:

- At the left edge, only More output appeared. At an intermediate position both buttons appeared; at the far right only Previous output appeared.
- Enter on More output moved the 306-pixel phone panel 245 pixels and focused Command output. Space on Previous output returned to zero and also focused the output. Desktop More output moved the 896-pixel panel 717 pixels. These correspond to the requested 80% steps with integer rounding.
- Turning on Wrap lines removed both cues. The complete output text remained identical before and after scrolling and wrapping.
- After `clear`, the remaining message still needed a right cue on phone. Resizing to desktop made that same message fit, and neither cue appeared.
- Document widths stayed 1440 / 390 pixels; horizontal overflow remained local to the terminal.

Screenshots were visually inspected for all four size/theme combinations and the phone intermediate-scroll state; scratch files are `/workspace/scratch/all-cli-reader/cues-*.png`. This is Chromium keyboard/click and viewport testing, not a physical touchscreen, screen-reader or cross-browser certification. No app changes were made.
