# Chapter width: independent final checker

Copyright © 2026 Christopher Snow.

A separate checker agent inspected the final rebuilt site on 4 November 2026 at
`http://127.0.0.1:4173/video-lab/`. This reviewer did not edit the implementation.
The checked final change excludes chapter pages from the narrow `notebook-lesson`
class; the reference-page CSS limit remains. Review used Playwright Chromium and
visual inspection of screenshots at 390, 820 and 1365 CSS pixels in both themes.

## Results

| Viewport | Overview content | Chapter video/editor | Chapter concept text | Reference content |
| --- | --- | --- | --- | --- |
| 390 | 358 | 358 | 358 | 358 |
| 820 | 780 | 780 | 567.42 | 567.42 |
| 1365 | 1040 | 1040 | 567.42 | 567.42 |

Dimensions are CSS pixels and were identical in light and dark themes. The
chapter's media and editors now use the available course width. Explanatory text
retains its shorter line length, and the existing desktop media height cap
preserves the picture's aspect ratio. Phone gutters and wrapping remain usable.
No horizontal page overflow occurred in any of the 24 viewport/theme/route checks.

R1 is resolved. The wider chapter is visibly consistent with the overview at the
reported tablet size. S1 is also resolved: the glossary and command option
reference retain the original narrow content width. Their final desktop
screenshots were inspected and show readable lines.

For the first chapter in all six viewport/theme combinations, the checker:

- toggled the source preview off and back on with “Replay source”, then started
  the video and observed its playback time advance;
- switched to Command builder and back to Edit command, confirming the command
  text remained unchanged;
- focused the editor and used Tab to reach a button;
- activated the next-page link with Enter, then used browser Back to restore the
  first chapter.

The earlier reader probe's playback timeout was caused by treating “Replay source”
as an unconditional play action. Its current implementation toggles the initially
open preview; the successful final check accounts for that existing behaviour.
No new issue requiring a fix was found in this scoped check.

## Evidence and limits

The repeatable probe is `/workspace/scratch/chapter-width/checker.cjs`; results
are in `checker-measurements.json` in the same directory. Six full-page chapter
screenshots are named `checker-{390,820,1365}-{light,dark}.png`. Desktop reference
screenshots are `checker-glossary.png` and `checker-commands.png`.

Command: `node /workspace/scratch/chapter-width/checker.cjs` — passed.
The parent agent owns the full `npm run check` result. This independent review
covers the changed layout and sampled controls; it does not claim exhaustive
processing, course-content, physical-device or cross-browser validation.
