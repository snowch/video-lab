# File actions: independent sceptic

Copyright © 2026 Christopher Snow.

Reviewed the initial built site at http://127.0.0.1:4173/video-lab/ on
28 October 2026 with fresh Chromium contexts and ad hoc Node Playwright probes.
Desktop: 1280 × 900. Phone: 393 × 851. Narrow: 320 × 720, including doubled
root text. Read `FileManager.tsx`, `files.css`, UI strings and the changed browser
tests. Source already contained proposed fixes that were absent from this build;
this record does not certify those fixes. No implementation changes, rebuild or
full suite were performed by the sceptic.

## Accepted findings

1. **Low: More actions is vertically displaced.** The built first row's Edit
   and Download start at y=257; the summary starts at y=271. Computed details
   padding is `14px 0px`. This independently confirms the root observation and reader finding 1.
   The reader is right to classify this as polish rather than a functional
   failure; it still directly concerns the requested tidiness.
   Minimum fix: override the inherited padding on the row disclosure. Retain the
   summary's own target padding. Opening the popup does already preserve row
   height (73.984375px before and after).
2. **Medium: the last popup extends below the dialog.** With two text files and
   keyboard activation of the last summary, the desktop dialog bottom is
   677.94px while the popup bottom is 791.05px, with scrollTop still zero. Pointer
   activation can instead cause the dialog to scroll, which obscures the defect
   in a later bounds measurement. Minimum fix: choose the upper side when the
   lower side has insufficient space and the upper side has more room; verify
   against the rebuilt page, including keyboard activation and phone sizes.
3. **Medium: narrow popup can cross the left boundary.** At 320px the initial
   popup left edge measured −6.89px, while the dialog starts at 8px. Its right
   alignment and intrinsic width can place its left portion outside the dialog.
   Minimum fix: constrain width by available space from the trigger's right edge
   to the dialog's left inset, and permit label wrapping. Source includes a
   proposed maxWidth calculation, but the checker must verify the built result.

## Rejected defect interpretations and test corrections

- Clicking the next row through an open popup is not a valid way to test row
  switching: the popup legitimately occupies that pointer position. Focus the
  next summary and press Enter, or dismiss before clicking. In the real build,
  keyboard switching leaves exactly one row popup open. Escape closes it,
  restores its summary focus and leaves Files open. The test has already been
  changed to keyboard switching in source.
- Immediate reads after Edit can capture the previous text/focus while
  `Blob.text()` resolves. Awaiting the expected value and editor focus verifies
  txt, md, srt, csv, sh and json, including an empty txt file. No format or focus
  defect was substantiated.
- A broad Save locator in an exploratory probe matched both the file-operation
  form Save and the existing disabled editor Save. Scoping it to the operation
  form passes; this is a probe ambiguity, not a new product failure.

## Reader findings assessed

Read `03-reader.md` after completing the independent probes. Accept finding 1
with its low-severity classification, supported by the exact 14px measurements
above. Accept findings 2 and 3 within their stated scope: direct Edit is
discoverable, its supported types and focus work, and the exercised disclosure
keyboard behaviour passes. The reader correctly avoids claiming exhaustive popup
geometry safety from its 390px-and-wider matrix; findings 2 and 3 above supplement
that coverage rather than contradict its no-overflow observation.

Reject the optional suggestion of explaining Relative path as a required change:
the target audience is technically experienced, the label is unchanged and this
slice does not introduce a new prerequisite. The reader itself marks that as an
out-of-scope preference. Its media playback/download checks are additional reader
evidence; the sceptic did not repeat those unrelated paths.

## Preserved behaviour verified on the actual build

- Every supported text type offers Edit and focuses its textarea with the exact
  imported content. Empty text remains editable.
- An unsaved edit disables opening another file. Close and Escape show the
  existing discard guard; Cancel retains the draft and returns editor focus.
- Explicit Discard restores saved text on reopening. Save survives page reload.
- An unfinished rename disables Edit; cancelling returns focus to its summary.
- Copy saves the expected duplicate and returns focus. Delete opens its existing
  confirmation with Cancel focused; cancellation preserves the file and restores
  the row-summary focus.

These focused probes do not replace the repository's required full checks or
independent verification of the rebuilt fixes.
