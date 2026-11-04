# Independent reader review: visual design

Copyright © 2026 Christopher Snow.

Reviewed on 4 November 2026 by a separate reader agent who did not edit the styling.
Used the built site at `http://127.0.0.1:4173/video-lab/`, Chromium, at 390, 820 and
1365 CSS pixels in both light and dark themes. Routes: overview,
`#/learn/first-edit/shorten`, `#/appendix/commands` and `#/glossary`. Captured all
24 route/size/theme combinations and inspected representative viewport screenshots
covering each width and theme, including the first command workspace.

## Overall assessment

The desktop overview has clear hierarchy: the large title identifies the course,
footage supplies the strongest image, and the blue start action is easy to find.
The chapter index uses quiet dividers rather than a wall of identical cards. The
light background, locally loaded Manrope and dark command editor form a coherent
visual system. Dark mode preserves that hierarchy without losing muted copy.

The chapter retains its wide working area, while conceptual text remains readable.
The source player is large enough to inspect. The command panel groups the command,
its run action and explanation; the panel has a functional purpose. On tablet it
uses the available width well. The command reference and glossary retain narrower
reading measures. No additional decoration is needed to make these pages feel
finished.

## R1 — low: phone command controls wrap unevenly

Location: first chapter, “Keep the opening five seconds” command panel, 390-pixel
viewport, both themes. Also visible in the command-reference cell.

The panel has 324 pixels of inner width. “Edit command” is 148.44 pixels wide and
“Command builder” is 175.38 pixels wide before the gap, so the mode controls occupy
two rows. “Copy command” wraps onto two lines (74.78 pixels high), next to the
single-line “Run command” (48.39 pixels high). Their vertical positions differ
because the row centres its items. This makes the phone workspace look crowded
and adds scrolling around a short command. No label is clipped and the controls
remain operable, so this is a visual/usability refinement rather than a blocker.

Direction: slightly reduce the mode/action controls' horizontal padding or type
size on phones, keeping readable labels and at least 44-pixel touch height. Check
that the mode pair fits on one row and Run/Copy have balanced heights at 390 pixels;
allow ordinary wrapping when text is enlarged.

Evidence: `reader/editor-390-light.png` and `reader/editor-390-dark.png` under
`/workspace/scratch/visual-design/`.

## R2 — low: programmatic page focus looks like an extra divider

Location: command reference and glossary after direct navigation, both themes.
A bright full-width line appears immediately below the header. The page's own
Course overview link and content start below it. Its prominence exceeds the quiet
header border and suggests a selected navigation state although no header item is
selected. The builder separately identified the outline as programmatic `main`
focus; this review confirms the visible symptom, not that implementation diagnosis.

Direction: suppress an outline on the noninteractive page container if that is
indeed its source, while preserving keyboard focus rings on links, buttons and
fields. Verify keyboard navigation after any adjustment.

Evidence: `reader/commands-390-light.png`, `reader/commands-1365-dark.png`, and
`reader/glossary-820-dark.png` under `/workspace/scratch/visual-design/`.

## Interaction and reflow evidence

- No horizontal document overflow in any of the 24 route/size/theme combinations.
- Chapter builder/editor switching worked in all six width/theme combinations;
  the builder exposed three fields. Editing the command and tabbing from its
  textarea moved focus to Run command, with a visible 3-pixel solid outline.
- The completion label could check its checkbox in all six combinations. The
  checkbox glyph is 20 pixels, but its enclosing label is the larger touch target;
  it is not treated as a 20-pixel-only control defect.
- Enlarging the chapter root font to 200% caused no horizontal document overflow
  in any of those six combinations.
- The computed body font was Manrope throughout. Main and command-control text
  remained legible in inspected screenshots; this review did not perform a full
  WCAG contrast audit.

The script and detailed measurements are retained at
`/workspace/scratch/visual-design/reader/review.mjs`, `measurements.json`, and
`interaction.mjs`. This focused styling review does not certify every lesson,
FFmpeg execution, output playback, browser engine or physical touch device.
No learner-facing prose was changed or reviewed as a new teaching sequence.
