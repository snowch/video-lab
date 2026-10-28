# Output resizing — independent final checker

Copyright © 2026 Christopher Snow.

28 October 2026. Separate checker; no product edits, builds, Playwright CLI/global setup, commits, merges or pushes. Started an independent preview on port 4176. Inspected the actual built notebook, reference and optional entries before reading the slice's facts/review notes. Initial rendered text and screenshots are preserved externally. The parent owns the overlapping full quality gate; its outcome is not claimed here.

## Decision

No resizing defect or fix requirement found. The visible “↕ Resize output” bar is discoverable beside the actual log and correctly separates changing its visible height from scrolling or wrapping its text. Real commands and outputs remain intact. A pre-existing optional-page limitation under 200% document CSS zoom is recorded below rather than reported as a resize regression.

## Actual commands and interactions

Executed actual browser ffprobe on all three built entries:

- `#/learn/inside-video/inspect`: `ffprobe bunny-short.mp4`.
- `#/inspect/reference/investigation`: loaded the controlled source, selected Type command and ran `ffprobe reference-inspect.mp4`.
- `optional/command-workbench.html`: loaded practice media, continued to Inspect and ran `ffprobe mousepad-demo.mp4`.

For each entry checked desktop light at 1440 × 1000, phone dark at 393 × 851 and phone light at 393 × 851 with 200% document CSS zoom: nine complete interaction cases. All passed these checks:

- Keyboard Home selected 128 CSS pixels, Arrow Down 160, Page Down 288, Page Up 160, Arrow Up 128, and End 1200. Returned to Home before dragging.
- Native Tab from the focusable output reached its separator. The handle matched `:focus-visible` and had a 3-pixel outline.
- An 80-screen-pixel mouse drag on desktop, or genuine Chromium CDP touch drag on phone, selected 208 CSS pixels at normal rendering and 168 at doubled document rendering. The chosen heights survived wrapping and real reruns.
- Ordinary mouse wheel scrolling **inside the output**, away from the handle, advanced its scroll position. Genuine CDP touch swipes inside phone output also scrolled it; handle-specific touch handling did not prevent this.
- Real mouse text-selection drags inside the output selected 10–87 characters. The log remains selectable.
- Resizing and wrapping preserved exact `textContent` and command drafts. Notebook and optional logs remained exactly identical after rerunning. Reference output retained the original text within its append-only history. Captured original lengths were 1,975, 1,977 and 1,751 characters respectively; hashes are in `results.json`. No page errors occurred.

The notebook and optional entries had no visible resize separator before output existed. In each optional-workbench case, ran the genuine quiet-success command `ffprobe -v error mousepad-demo.mp4`: the empty log, its handle and Wrap lines control were hidden. Reran the original command; the identical raw log and previously selected height returned. This verifies mounted-but-hidden components do not create an empty visible/accessibility pane or lose the chosen height.

Normal desktop and phone document widths matched their viewports. Notebook/reference also had no document overflow at 200% document CSS zoom. Screenshots of the actual panes show legible handles and controls in the checked themes. Long unwrapped raw lines remain inside their scrollable output; wrapping retained ordinary vertical scrolling.

## Actual doubled text, distinguished from document zoom

Separately tested root `font-size: 200%` at the actual 393-pixel phone width, without document CSS zoom. Notebook/reference output and handle fonts genuinely doubled from 14.4 to 28.8 pixels. Their document widths remained 393 pixels and their output/handle right edges stayed inside the viewport.

The optional output uses an existing fixed 13-pixel font, so changing the root font doubled its handle to 28.8 pixels but left that log at 13. Recorded this rather than calling it doubled output text. An additional explicit output font change from 13 to 26 pixels, retaining the doubled handle and actual 393-pixel viewport, also fit: output/handle right edges were 360 pixels and document width remained 393. Keyboard Page Down remained usable in all these checks. Evidence is in `text-size-results.json`, `optional-output-font-results.json` and their pane screenshots. These are browser-injected text-size simulations, not claims about physical pinch zoom, browser-menu zoom or a tested screen reader.

## Existing optional-page zoom limitation

At 393 × 851 with **document CSS zoom 2**, the optional page's document width was 490 pixels. The overflowing elements were its existing `3 Trim` navigation item, Type command button and Continue to Trim button; the resized output and handle themselves fit.

Independently reproduced the same 490-pixel width and the exact same offending element edges **before any command or output existed**, with zero visible resize handles. Thus the new output wrapper is not responsible. Reviewed the workbench diff: its changes concern only Output mounting/visibility, ID and the new control, not these navigation/editor buttons. `src/workbench/style.css` is byte-identical in working source, parent HEAD `80267fb85c57944d26aa1f432758e42b0e68d4e5` and main `938326dacb8c532c554cc94467e07beb55122cf2` (SHA-256 `1263ef59900abbd5d9fc3e1a4e8d6bc211d19978a9ea3139b526cc5a739be0ca`). This is an existing narrow-width layout limitation at an effective 196.5 CSS-pixel width, not a change-specific finding. No separate main build was run.

Evidence: `overflow.json`, `optional-before-output-overflow.json`, `optional-before-output-doubled.png` and `baseline-source.json`. Normal phone and actual doubled-text checks above have no such overflow. No unrelated product fix is requested by this checker.

## Evidence and bounded coverage

All generated scripts, JSON and screenshots are outside the repository at `/workspace/scratch/output-resize/checker/`. The final successful standalone scripts were:

```sh
node /workspace/scratch/output-resize/checker/check.mjs
node /workspace/scratch/output-resize/checker/text-size.mjs
node /workspace/scratch/output-resize/checker/optional-output-font.mjs
```

`check.mjs` records the known optional CSS-zoom document limit while still requiring each changed-pane interaction; it requires no page overflow for the other cases. Earlier harness attempts incorrectly expected an ffprobe banner instead of the pinned core's actual `ffmpeg version` banner, looked for legacy completion in feedback instead of its status, and used an incorrect optional editor label. Corrected those harness assumptions; they were not product failures. The first broad no-overflow assertion exposed the existing optional limitation, which was then investigated explicitly rather than hidden.

The reader and sceptic records establish no change-specific findings requiring fixes. This check adds independent text selection, ordinary wheel/touch scrolling, native Tab/focus and quiet-empty behaviour coverage. It does not repeat the sceptic's Firefox, pen, pointer-cancellation or capture-loss checks, or claim physical touch/stylus, assistive technology, every viewport/theme pairing, cross-session size persistence, new encodes, full-course/offline/update regression or completion of the parent's full quality gate. No implementation author is represented as independently checking their own product work.
