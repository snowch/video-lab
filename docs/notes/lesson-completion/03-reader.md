# Fresh learner review: manual lesson completion

Reviewed 3 November 2026 by a separate reader agent against the built app at
`http://127.0.0.1:4199/video-lab/`. No implementation source, author explanations,
plan or fact brief was read before the assessment. Only `AGENTS.md`, the package
scripts and Playwright configuration were read to establish the review contract
and browser tooling. No implementation edits were made.

## Learner interpretation and assumptions

“Mark lesson as done” is a familiar, understandable manual checklist action. I
understand the tick beside the lesson title in the course index as my own record
of completion. It does not require FFmpeg knowledge. The label does not imply
that a command ran or an exercise passed, and I could mark the first lesson
without running anything. Visiting the next page did not mark that page done.
The course uses “page” in navigation and “lesson” in this control; the location
made their relationship clear enough for this slice.

Review contexts were Chromium desktop at 1440 × 1000, Pixel 7 emulation at
412 × 839, each in system light and dark, plus 320 × 740 touch emulation in both
themes. These are emulations, not physical-device or screen-reader tests.

## Findings

1. **Medium — checkbox and its text render on separate lines.** On the first
   lesson, “Mark lesson as done” appears beneath a lone centred checkbox, rather
   than next to it. This also happens on the final lesson and at 320px, in both
   themes. The native input has a rendered box about 176px wide × 20px high;
   its label is `display: block` and about 54px tall. The visible checkbox sits
   roughly 78px to the right of the label's left edge. This looks disconnected
   and makes the new action less immediately recognisable as one labelled
   checkbox near continuation. Text tapping and keyboard operation still work.
   Suggested direction: present the checkbox and text together as one row,
   preserving the associated label and generous touch target. Evidence:
   `/workspace/scratch/lesson-completion/reader/desktop-completion-light.png`,
   `phone-light-checked.png`, `narrow-dark-completion.png`,
   `desktop-dark-final.png`; measured geometry is in `results.json`.

2. **Low — a completion tick can wrap onto a line by itself in the narrow index.**
   At 320px, after marking “Prepare an MP4 for download playback”, the title
   wraps over two lines and the tick occupies a third line. It remains inside
   the same numbered list item, but makes the index less compact and the status
   slightly harder to scan. This is visible in both themes. Suggested direction:
   keep the status visually attached to the title's final words, or reserve a
   predictable trailing status position. Evidence:
   `/workspace/scratch/lesson-completion/reader/narrow-light-index.png` and
   `narrow-dark-index.png`.

No blocking functional finding was observed.

## Checks and evidence

The scratch script `reader/review.mjs` was run with Node and Playwright against
the built preview. Its final run passed all four desktop/phone/theme contexts;
structured results are in `/workspace/scratch/lesson-completion/reader/results.json`.
Additional inline Playwright checks covered 320px layout and tab sequence.

- The initially unchecked control exposes the checkbox role and accessible name
  “Mark lesson as done”. Space toggles it from keyboard focus. Shift+Tab followed
  by Tab returns focus to it, with a computed visible 3px outline. The following
  focus stops are Course overview, then Next page.
- Tapping the label checks it on phone. The whole associated label, approximately
  176 × 54px, is interactive despite the visual layout finding.
- Checking persists after navigating to the next page, browser Back and reload.
  The next page remains unchecked. Unchecking also persists after reload.
- The index adds a visible tick only for the checked lesson and removes it after
  unchecking. The completed link's accessible name is
  “Keep a shorter section · Completed”; the decorative tick is aria-hidden.
- The final lesson, “Repeat a workflow in a native shell”, has a working completion
  checkbox and Course overview continuation; its completed tick appears in the
  index. No nonexistent next lesson is offered.
- Text and ticks are legible in the observed light/dark screenshots. Index ticks
  use distinct light/dark theme colours. Status remains communicated by the
  check shape and accessible text, not colour alone.
- No horizontal overflow occurred on the checked desktop/phone indexes, or on
  the additional 320px completion and index views (`scrollWidth === innerWidth`).
- Screenshots include unchecked/checked states, index and final lesson for all
  four main contexts; narrow screenshots and desktop keyboard focus are also
  in `/workspace/scratch/lesson-completion/reader/`.

This review did not run media processing or the full repository quality checks;
those are outside this focused completion-control assessment. It did not test
storage denial, cross-tab synchronisation, physical touch hardware or spoken
screen-reader output.
