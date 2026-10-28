# File actions: independent final checker

Copyright © 2026 Christopher Snow.

Reviewed 28 October 2026 against the rebuilt site at
`http://127.0.0.1:4173/video-lab/`. I did not author the changes. Read AGENTS.md,
`03-reader.md` and `04-sceptic.md`. No implementation edits, rebuild or full-suite
run were performed by this checker. This is focused independent verification of
the accepted findings and direct Edit behaviour, not a replacement for the
builder's full quality checks.

## Result

All three accepted findings are resolved in the exercised final-build cases.
No unresolved finding was established within this scope.

- **Alignment:** at 1280 × 900 the Edit button, Download button and More actions
  summary each have y=508.65625 and height=45.984375px in the three-file probe.
  The native details element has zero padding. The actual light/dark screenshots
  show aligned controls. At 320px the actions wrap naturally and retain usable
  targets; the previous inherited 14px disclosure padding is absent.
- **Last-row keyboard popup:** tested fresh contexts at 1280 × 900, 320 × 720,
  and 320 × 720 with root font size 200%, each in light and dark. Imported
  `empty.txt` and `last.srt`; focused the last summary and pressed Enter without
  clicking it. In every case the popup opens upward entirely within the dialog.
  Both themes produced the same bounds below. All six screenshots were opened
  and visually inspected, including wrapped labels with doubled text.
- **Left boundary:** at 320px ordinary text the popup starts at x=24px, inside
  the dialog's x=8px edge. At doubled text it starts at x=32px, inside x=16px.
  No document or dialog horizontal overflow was measured in any matrix case.

| Viewport and text | Dialog bounds (left, top, right, bottom) | Popup bounds (left, top, right, bottom) |
| --- | --- | --- |
| 1280 × 900, normal | 192, 230.422, 1088, 669.563 | 889.094, 390.844, 1063, 548.359 |
| 320 × 720, normal | 8, 8, 312, 712 | 24, 446.344, 167.016, 630.250 |
| 320 × 720, doubled | 16, 16, 304, 704 | 32, 114.297, 277.406, 474.203 |

Dialog scrollTop was zero for ordinary text and 1443px after focusing the last
row at doubled text. The latter is expected vertical scrolling; the full popup
remained visible within the dialog.

## Interaction and preservation

In all six cases, focusing the other row's summary and pressing Enter left
exactly one disclosure open. Tab reached its labelled Rename or move button.
Escape closed the disclosure, restored focus to its originating summary and
left Your files open. DOM inspection confirms native `details`/`summary`,
filename-specific accessible labels, and ordinary labelled action buttons.
Application-menu arrow-key semantics are not required by this native disclosure.

Direct Edit was visible for both the empty text file and SRT. It focused the
labelled Edit text textarea and loaded exact original contents. Saved changes
to each, waited for editing to be enabled and the unsaved status to disappear,
then reloaded the page. Both files retained their exact saved text in all six
cases. A separate three-file check edited both text files and verified an
untouched binary by downloading it after reload: bytes remained exactly
`00ff0a0d2a80`.

An initial checker probe reloaded immediately when Save became disabled. That
condition also occurs while an asynchronous save is running; it is not evidence
of completed persistence. The corrected probe waits for enabled editing and
absence of the unsaved status before reloading, and passes. This probe correction
does not establish a product defect.

## Reproduction evidence and limits

Session-local scripts and logs (outside git):

- `/tmp/file-actions-checker.cjs` and `/tmp/file-actions-checker.log` — six-case
  matrix, exit 0.
- `/tmp/file-actions-checker-preservation.cjs` and
  `/tmp/file-actions-checker-preservation.log` — exact alignment and downloaded
  binary preservation evidence.
- `/tmp/file-actions-checker-{1280-1,320-1,320-2}-{light,dark}.png` — all six
  screenshots visually inspected.

Chromium headless through the repository's installed Playwright package. Did
not repeat the reader's media playback/copy/rename/delete tests or general file
options, test native mobile browsers, or assert screen-reader speech. Doubled
text used a 200% root font size, not browser zoom.
