# Codec links: independent final built-page check

Copyright © 2026 Christopher Snow.

Checked on 26 October 2026 by a separate checker agent who made no product changes. Read `AGENTS.md`, inspected the actual source page before reading the codec-link notes, then tested the existing built preview at `http://127.0.0.1:4173/video-lab/`. No build, Playwright CLI, full quality check or media-lab execution was run by this checker. This scoped check does not establish completion of the full gate.

## Result

**R1 is resolved. No remaining blocking finding in scope.** All three optional links open the intended destination's beginning with `main#content` focused. At ordinary desktop and phone sizes the complete destination heading is visible immediately; the previous inherited footer position is absent. Native links, browser history and saved command/notes drafts work. Existing notebook pager/index navigation and legacy reference-section scrolling also work.

The product source now reserves the legacy section-scroll branch for `!notebook && resolved.section`. The built behaviour below independently verifies the effect of that change; this result is not inferred from the source guard alone.

## Browser coverage and evidence

Used standalone Node scripts importing the installed Playwright Chromium API. Artifacts are in `/workspace/scratch/codec-links/checker/`:

- `inspect.mjs`: initial page inspection and `inspect-desktop.png`, captured before reading the author's notes.
- `check.mjs`: desktop 1440 × 1000 and phone 390 × 844, each in light and dark. Desktop used pointer clicks or keyboard Enter; phone used actual `tap()` in touch-enabled mobile contexts. All four normal-size combinations completed successfully before the additional stress assertion described below.
- `stress.mjs`: 320 × 900 with root font size set to 200%, in light and dark, using keyboard or touch. Both combinations completed with heading geometry recorded rather than imposing an unsuitable requirement that oversized preceding content and the complete heading fit in one viewport. This script also completed the legacy deep-link checks.
- `keyboard.mjs`: actual Tab traversal through the three links, reverse Shift+Tab and Enter activation in both desktop themes. Both combinations passed.
- `evidence.json`: all six combinations, including exact route, heading bounds, document width, focus, history and draft results, plus built destination text. `keyboard.json` and `legacy.json` contain the separate checks.

The normal-size matrix covers 12 source-link journeys. Each journey checks the new link, Back, Forward and Back again, not just a direct load. Source and destination command drafts have different text; source optional notes also have distinct text. All survived these transitions. Browser Back returns to the correct source page and its beginning under the app's normal navigation policy; it does not restore the source links' previous scroll position. Forward returns to the correct destination and its draft.

| Link | Actual hash | Built heading |
| --- | --- | --- |
| Chapter 4: Copy compressed streams | `#/learn/cut-join/copy` | Copy compressed streams |
| Chapter 8: Choose an encoding quality setting | `#/learn/quality/quality` | Choose an encoding quality setting |
| Chapter 9: Choose an export format | `#/learn/export/format` | Choose an export format |

At 1440px the new-link arrivals had heading tops at Y121.45 and active `MAIN`. At 390px they were at Y120.64 or Y141.75 and active `MAIN`. Browser focus may scroll the main into view: document Y was 87 on desktop and 175 on this touch configuration. Exact document Y zero is therefore not the acceptance criterion. Every ordinary arrival, Back and Forward had its complete heading visible and active `MAIN`.

All source, destination, history and checked sibling pages had document width equal to viewport width: 1440, 390 or 320px. No page errors were observed in the six contexts. Screenshots were visually inspected for source placement, wrapping, themes, destination opening and keyboard focus. Representative files include `desktop-dark-cut-join-arrival.png`, `phone-light-quality-arrival.png`, `phone-dark-links.png`, `light-keyboard-focus.png` and the two `320-*-text200-links.png` captures. Links remain distinct, underlined, readable and touch-usable. The longer text wraps vertically at narrow widths.

The extra 320px/200% stress adds six further link/history/draft journeys. New-link activation exposes the full destination heading in both themes. On browser Forward, the document starts at Y0 with `MAIN` focused; the heavily wrapped global header occupies roughly 513px, so only the beginning of a long heading fits in the initial viewport. For Chapter 4 its heading spans Y823.86–1088.73 in the 900px viewport. This requires ordinary vertical scrolling and does not reproduce the former inherited footer position. `stress-partial-heading-cut-join-copy.png` records that state. No horizontal overflow occurs. This is recorded as a stress observation, not a codec-link regression or a requirement for a broader header redesign.

Initial checker-script corrections: an exact accessible-label query for populated notes did not match on return; reading the actual notes textarea verified the retained value. An initial stress assertion required the complete heading to fit at 320px/200%; it was replaced in the separate stress script with geometry recording and the actual focus/start/no-overflow contract. Neither script issue required a product edit.

## Regression checks

In all six combinations:

- Existing Next opens `#/learn/inside-video/streams`, “Choose picture or sound”.
- Existing Previous opens `#/learn/first-edit/start`, “Choose where the cut begins”.
- Course overview opens `#/`, “Video Lab: Editing with FFmpeg”; the existing index link then opens the Chapter 8 destination.
- The optional codec group is absent on the Chapter 8 destination, confirming that it remains scoped to the introductory page.

Legacy `#/module-0/reflection` canonicalised to `#/inspect/reference/reflection` and exposed `#section-reflection` at viewport Y155.89 after scrolling to document Y432. Direct `#/edit/reference/reflection` exposed its target at approximately Y0 after scrolling to document Y588. Both retained their intended section behaviour and had no horizontal overflow.

## Teaching scope

Checked the destination text on the built pages and corroborated it against the corresponding `src/notebook/pages/` copy. Chapter 4 teaches the decoder/encoder distinction and copying encoded streams with `-c copy`. Chapter 8 teaches H.264 through libx264 and CRF quality settings. Chapter 9 teaches explicit libx264/AAC encoder selection with `-c:v` and `-c:a`, MP4 and playback compatibility. These pages do not compare competing codec families. The optional heading and exact destination titles accurately describe the available further teaching without promising that comparison.
