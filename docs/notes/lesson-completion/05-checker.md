# Independent checker: manual lesson completion

Copyright © 2026 Christopher Snow.

Checked 3 November 2026 by a separate agent who did not author the implementation
or its fixes. Read `01-plan-facts.md` through `04-sceptic.md`, then exercised the
actual built preview at `http://127.0.0.1:4199/video-lab/`. No implementation
edits were made by this checker.

## Reader fixes

1. **Detached checkbox: verified fixed.** The built label is flex, with its text
   beside the native checkbox. The input measures 20 × 20px at normal text size
   and 40 × 40px at 200% root text size, with zero padding and native appearance.
   The label is at least 44px tall, and the input and text centres align within
   2px. This holds at desktop, phone and 320px widths in both themes, including
   enlarged text. At 320px with enlarged text the label wraps its words normally
   beside the checkbox. Screenshots confirm the measured layout.
2. **Orphaned completion tick: verified fixed.** The checked
   index link uses a flex row and a nonshrinking trailing status. At 320px the
   title wraps into three lines and the tick remains beside the first line,
   inside the link. The final rebuild also keeps the tick within the link in all
   enlarged contexts. Both themes are readable.

## Additional finding and final resolution

**Medium, resolved — enlarged phone index leaves too little width for lesson titles.**
At 412px with 200% root text, the completed export title receives approximately
53px of width and wraps into fourteen lines. At 320px with 200% root text it
receives approximately 29px and wraps into twenty-nine lines; its tick ends at
x=299px while the link ends at x=249px. Both themes reproduce this. The page's
`scrollWidth` still equals its viewport width, so a horizontal-overflow assertion
alone does not establish readable reflow. The existing chapter-card indentation
and padding appear to consume most of the available width. Suggested direction:
reduce or rearrange nested indentation and padding at narrow effective widths
while preserving numbering, readable titles and the trailing status. No fix was
made by this checker. The builder then changed the narrow chapter cards and
title flex sizing and rebuilt the preview.

The final independent rerun passes all twelve contexts and the functional cases.
At 412px/200% the title now receives approximately 208px and occupies four lines.
At 320px/200% it receives approximately 117px and occupies eight lines. Some long
words wrap at that extreme size, but the title remains readable and the tick
stays within its link in both themes. No clipping or horizontal document overflow
was observed. Desktop geometry matches the earlier run. Final screenshots were
visually checked at phone/enlarged dark, narrow/enlarged light, narrow/normal dark
and desktop/normal light. The finding is resolved; this focused checker passes.

Evidence: `checker/phone-light-200-index.png`,
`checker/narrow-light-200-index.png`, their dark equivalents, and the title,
tick and link rectangles in `checker/results.json`, under
`/workspace/scratch/lesson-completion/`. These paths now hold final rebuilt
evidence; the initial failure evidence is preserved in
`checker/before-enlarged-fix/`.

## Built-page checks

Command: `node /workspace/scratch/lesson-completion/checker/review.mjs`.
Final run: **passed**. Completed twelve Chromium layout contexts: desktop 1440 × 1000, Pixel 7
emulation 412 × 839 and narrow touch emulation 320 × 800, each in light/dark
and at normal/200% root text. Geometry assertions for checkbox alignment,
touch target, tick flex behaviour, tick containment and no document overflow passed.
The final script explicitly asserts tick containment and at least 100px title
width in phone/narrow enlarged contexts; there are no tick-bounds failures.
Screenshots of each footer and index are saved alongside `results.json`.
Representative screenshots were visually inspected, including desktop normal
light, desktop enlarged dark, phone normal dark, phone enlarged light, and
320px normal light/dark and enlarged light.

- Keyboard Space checks the focused native checkbox; its computed focus outline
  is solid. Phone and narrow contexts activate it by tapping the associated
  label. The native role and accessible name remain “Mark lesson as done”.
- Every layout context passes mark → reload → checked, then unmark → reload →
  unchecked. No command execution is needed to mark a lesson.
- Following Next page leaves the next page unchecked. Back restores the marked
  page; Forward restores the unchecked next page. Marks remain page-specific.
- The course index adds and removes the tick and accessible “Completed” text.
  The visible original lesson title remains intact.
- Two real browser tabs reconcile checking and unchecking in both directions.
  An already-open course index updates from another tab's storage events.
  External storage clear removes the index marks.
- The final lesson can be marked, reloaded, unmarked and reflected in the index.
  It offers Course overview and has no nonexistent Next page.
- An unrelated localStorage sentinel survives completion operations.
- Simulated blocked completion writes retain both checked and unchecked
  choices for the session. The warning is associated with the checkbox through
  `aria-describedby`. An unsaved check survives navigation to the index and
  back. Restoring writes and toggling twice removes the warning, saves the
  intended checked/unchecked choice, and survives reload in each case.

## Limitations

This is Chromium browser/device emulation, not physical touch hardware,
screen-reader speech or browser-zoom testing. Enlarged text is tested by setting
the root font size to 200%. The denied-write scenario intercepts completion-key
`Storage.setItem` calls; it does not simulate every browser storage failure.
Media processing, all course controls, Firefox and the full repository quality
gate were not rerun by this checker. The builder must report the full gate
separately. No unresolved finding remains in this focused completion review.
