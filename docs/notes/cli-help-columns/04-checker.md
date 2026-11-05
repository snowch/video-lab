# Independent final checker: command help columns

Copyright © 2026 Christopher Snow.

A separate checker inspected the final built site on 5 November 2026 at
`http://127.0.0.1:4173/video-lab/`, after the reader and sceptic reports were
complete. This reviewer did not edit the CSS, rebuild the app or run the full
suite. No additional fix was required by this focused check.

## Layout result

The frame-rate page now presents the requested conventional help layout: four
successive rows for the input, duration, frame-rate filter and output filename.
Syntax stays in one left column and each description starts alongside it in one
right column. The padding and seven-entry joining lists retain the same pairing
for longer expressions. Descriptions wrap within their column; later parameters
do not become adjacent cards.

At an 820-pixel viewport, the frame-rate syntax column is 237.59 pixels wide and
the description column 475.22 pixels, with the 16-pixel gap between them. At 1365
pixels they are 319.33 and 638.67 pixels. Each row has the same description start
position and aligned term/description top edges.

The responsive exception works at its exact boundary. At 600 pixels each
explanation follows its parameter vertically; at 601 pixels the 1:2 columns apply
(168.98 and 337.98 pixels in the frame-rate list). The 320-pixel view also stacks
pairs. At 200% root text size, long syntax wraps and explanations take more height,
but remain visible without overlapping the next row. This should be described as
two columns on larger screens with stacked pairs on narrow screens, not as two
columns at every width.

## Executed checks

- `node /workspace/scratch/cli-help-columns/checker/layout.cjs` — passed all 60
  combinations: `frames-time/rate`, `framing/pad` and `cut-join/join` at 320, 600,
  601, 820 and 1365 CSS pixels, both themes, normal and 200% root font size.
  Assertions checked no horizontal document overflow, no row overlap, the correct
  stacked/grid breakpoint behaviour, aligned description starts and top edges,
  and the 1:2 syntax/description width ratio in the grid layout. Route-specific
  worked-cell waits ensured measurements belonged to the requested page.
- `node /workspace/scratch/cli-help-columns/checker/controls.cjs` — passed six
  size/theme probes at 320, 601 and 1365 pixels in both themes. Switching the
  frame-rate worked cell from Edit command to Command builder and back retained
  its exact command. Tab from the editor reached a button with a 3-pixel focus
  outline. The pixel-format reference link inside an export option description
  retained visible keyboard focus; Enter opened the intended appendix and browser
  Back returned to the export lesson.

## Visual evidence and limits

Native help-list crops and detailed measurements are retained under
`/workspace/scratch/cli-help-columns/checker/`. Visually inspected final samples:

- `frames-time-rate-820-light-100.png` for the user's pictured lesson;
- `frames-time-rate-600-light-100.png` and `frames-time-rate-601-light-100.png`
  for both sides of the responsive boundary;
- `framing-pad-1365-dark-100.png` and `framing-pad-601-dark-200.png` for long
  explanations and enlarged text;
- `cut-join-join-320-light-200.png` for narrow-screen enlarged syntax and prose.

`measurements.json` records every layout probe; `controls.json` records the six
interaction probes. The scripts are retained beside them. These are Chromium
checks of the changed presentation and representative controls. The parent agent
owns the full quality-gate and processing results; this review does not duplicate
FFmpeg execution or claim exhaustive assistive-technology, physical-device or
cross-browser validation. No learner-facing text or command was rewritten.
