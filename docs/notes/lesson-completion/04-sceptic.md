# Sceptic review: manual lesson completion

Copyright © 2026 Christopher Snow.

Reviewed 3 November 2026 by a separate technical reviewer. This agent made no
implementation edits. Reviewed `completion.ts`, its unit tests, the Notebook
integration/CSS, browser tests and the reader's `03-reader.md`. Browser probes
used the actual build at `http://127.0.0.1:4199/video-lab/`.

## Reader findings adjudicated

1. **Accept, medium: detached checkbox and label.** The original selectors lost
   to existing styles: `.notebook-shell label` set `display: block`, while the
   generic `input:not([type="range"]):not([type="radio"])` rule supplied
   `width: 100%` and padding. This explains the reader's approximately 176px-wide
   input and centred native checkbox above its text. The original built
   screenshot `reader/desktop-light-unchecked.png` visibly confirms the report.
   The builder subsequently strengthened the scoped selectors and reset
   padding. Independent probes against the rebuilt page now measure a flex
   label, a 20px input with zero padding, native `appearance: auto`, and a
   visible keyboard focus outline. This fixes the supported defect. A separate
   checker should verify the final build after remaining changes.

2. **Accept, low: tick orphaned on its own line at 320px.** Independently marked
   `export/faststart` and inspected its course-index link in both themes. The
   final word “playback” ended at y=381.09px while the tick began at y=383.48px,
   on the next line. Screenshots and measured rectangles are in
   `sceptic/wrap-light.png`, `wrap-dark.png` and `wrap-results.json`. The status
   remains in the same link, with the correct accessible name; no overflow or
   functional failure follows. A title/tick flex row with a nonshrinking tick
   is a proportionate presentation fix. This finding is accepted as low
   priority; it was reported to the builder for resolution.

No reader finding was rejected. The reader's limitation statements are accurate:
its report does not claim storage denial or cross-tab coverage.

## Independent technical checks

`npx vitest run src/notebook/completion.test.ts`: **4 tests passed**.

`node /workspace/scratch/lesson-completion/sceptic/review.mjs`: **passed** against
Chromium desktop/light, Pixel 7 emulation/dark and Firefox. The script verifies
Space activation and visible keyboard focus, explicit per-page marking, Back,
independent marks, real cross-tab unchecking, external `localStorage.clear()`,
320px layout with 200% root font size and no horizontal overflow. It also
verifies failed writes retain a checked mark and warning across in-app
navigation, and that a successful two-toggle retry removes the warning and
survives reload. Results and built screenshots are in the same scratch directory.
The first probe attempt read the index immediately after navigation and failed
before React rendered it; awaiting the Chapters heading corrected that probe
race. This was not an app defect.

`node /workspace/scratch/lesson-completion/sceptic/wrap.mjs`: independently
reproduced reader finding 2 in light and dark at 320px.

Source review supports the intended persistence contract:

- One namespaced, versioned key per stable page ID prevents writes to one page
  replacing another page's completion state. The store rejects unknown IDs.
- Only the literal stored string `true` counts as complete. Missing and malformed
  values remain unchecked. Existing drafts, command evidence and files are not
  read or modified by completion writes; an unrelated localStorage sentinel
  survived browser mark/unmark operations.
- No navigation, command execution or check result calls `completion.set`.
  The native labelled checkbox is the sole UI mutation point.
- A failed write preserves the current in-memory choice and records an unsaved
  warning. Remount reconciliation skips those unsaved choices. The warning
  tells the learner that the change is session-only and explains retrying.
- Other-tab storage events read the current durable value rather than trusting
  stale event payloads; they reconcile only the affected page. External clear
  events reconcile all registered IDs. Events for a different Storage area are
  ignored. Subscriptions attach/remove the listener with the first/last UI
  subscriber.
- Completion ticks have an aria-hidden glyph and accessible “Completed” text.
  The first and final pages share the same checkbox implementation; references
  have no misleading completion control.

No additional blocking technical finding was found. These focused checks do
not substitute for the full quality gate, final independent checker or physical
screen-reader/device testing.
