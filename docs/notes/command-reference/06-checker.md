# Command reference and timestamp visual: independent checker

Copyright © 2026 Christopher Snow.

Checked 30 October 2026 by `/root/options_checker`, a separate agent who did not draft or implement the production changes. Read `AGENTS.md`, the reader and sceptic records (including their extension addenda), and the timestamp fact brief. Inspected the actual final-ready built app at `http://127.0.0.1:4199/video-lab/` before examining the component source. No production files were edited and no repository build or full quality suite was run by this checker; the root session owns the quality gate.

## Built-page verification

Standalone Chromium/Playwright scripts and evidence are in `/workspace/scratch/command-reference-checker/`. The completed four-context sweep used 1440 × 1000 desktop and 390 × 1000 touch phone, each in light and dark; an additional touch-control pass used 390 × 844. Screenshots of the rendered appendix, actual help output and timestamp diagram were visually inspected, including a 320-pixel viewport with 200% root text size. This is text enlargement, not browser zoom.

- The appendix renders 53 entries, each with an example and teaching destination. Searched each of the 34 literal flag forms (the original 33 plus the now-taught `-h`); every query finds entries. All ten taught filters are searchable with examples. Purpose search `resize` finds `scale`; `pad` finds its entry; an incompatible category returns zero results. Keyboard Enter activates Clear and restores focus to search.
- All 31 unique internal targets (30 lesson/guide targets plus the new self-help route) render their expected heading. S1 is resolved: the group and selector say “Native terminal examples”, with the browser-availability qualification. R2 is resolved: subtitle style/font explanation no longer introduces ASS terminology.
- R1 is resolved in all four contexts: native purpose plus `cursor` survives clicking the actual Recording guide link, waiting for its heading, using Back and reloading. The shared URL retains query/purpose. An unknown purpose safely falls back to all purposes while preserving the valid query.
- Ran the actual initial `ffmpeg -h` command. It completed with the real FFmpeg 5.1.4/Emscripten banner and “Getting help:” log. No practice-media request occurred. Reload preserves the result. Clipboard contains `ffmpeg -h`; command download succeeds; keyboard Shift+Enter runs the cell; touch opens the builder/editor; output wrapping works. Output resizing increased the pane from 320 to 352 pixels by keyboard, then to 412 pixels by a real touch drag; a fresh touch theme toggle changed “Dark theme” to “Light theme”. An immediate transient builder message disappears once its initial effect settles, so it is not a reported defect.
- Verified active-command navigation by delaying the first real encoder asset response, without replacing its contents: started help, navigated to the overview, followed the active Command link, returned to the correct appendix, released the asset and received the actual help result.
- Explicitly downloaded the whole app through App status, waited for offline-ready, disabled networking and opened a fresh page. Appendix search and a fresh actual help run completed offline. This demonstrates the prepared offline path, not an unprepared offline visit.

The four-context and link results are in `verification.json`/`links.json`; complete real logs, requests and offline results are in `help-verification.json`. Per-flag/filter searches and touch/copy/download checks are in `controls.json`. The scripts are `verify.cjs`, `help.cjs`, `controls.cjs` and `self-help.cjs`; `resize.cjs`/`resize.json` and `theme.cjs`/`theme.json` cover the extra controls. Initial exploratory script failure used a mistaken category ID in the checker harness; changing it to the visible option label completed the same sweep. It was not a product failure.

## Timestamp and practice verification

Every context renders the four source cards at 0, 512, 1024 and 1536 ticks, with 0.000000, 0.041667, 0.083333 and 0.125000 seconds. Selecting each value 0/1/2 changes the highlighted pair, absolute endpoints, heading and subtraction; all three yield 512 ticks and 0.041667 seconds. The native selector works by keyboard and touch. Three intermediate clock marks are clearly distinguished from the two picture endpoints in copy; the 128-tick gaps and separate single-tick duration are explicit. Source provenance identifies `bunny-short.mp4`, distinguishes it from the learner’s output, and qualifies regular spacing for other media.

Independently reran native FFprobe 7.1.5:

```sh
ffprobe -v error -select_streams v:0 -show_frames -show_entries frame=pts,pts_time -of json public/media/notebook/bunny-short.mp4
```

Saved output is `source-frames.json`. All 192 measured video pictures have consecutive PTS differences of 512. The first six PTS are 0, 512, 1024, 1536, 2048 and 2560; the sixth printed seconds value is 0.208333. This independently confirms both the displayed first-four endpoints and the revised practice’s final answer.

The built practice asks for first-to-sixth, while the diagram stops at picture four. Neither 2560 nor 0.208333 appears in the page before hints. Opened all five progressive hints in every context: neither solved value appears in hints 1–4; hint 5 supplies both values and their calculation. The technical-check copy correctly says execution alone does not grade the learner’s arithmetic. S2 is resolved.

Normal and enlarged appendix/diagram pages had no page-level horizontal overflow in all four contexts, including the 320-pixel/200% phone case. The enlarged diagram changes source cards to one column and retains all text; endpoint decimal strings can wrap in the narrow two-column zoom row. No uncaught page errors occurred in the four-context sweep. Screenshot names begin `appendix-`, `timestamps-` and `timestamp-320-`.

## Findings and disposition

**R3 — Low, retained as documented friction.** Visually confirmed that the help editor precedes the lookup controls and pushes them below the first viewport. The sceptic’s final addendum accepts the observation and rejects a mandatory reorder; this checker agrees it is not a completion blocker. Search remains adjacent to results.

**C1 — Low, self-help link positioning defect, subsequently resolved.** Search `-h`, then click “Command help cell →”. The route returns to `#/appendix/commands`, but scrolling stays near the first reference entry, leaving the whole help cell above the visible viewport. At desktop its top is about −641 pixels with height 481; at phone its top is about −775 with height 530. Thus the route resolves, but the named link does not visibly take the learner to the help cell. Evidence: `self-help.json`, `self-help-1440.png`, `self-help-390.png`. Suggested direction: provide a real local cell target and move focus/scroll there when the link is followed. Reported to the root session for disposition; no production fix was made by this checker.

## Explicit limits

This pass does not establish physical-device or screen-reader behaviour, browser zoom, Firefox/WebKit behaviour, native screen capture, external-document availability, execution of every indexed media command, or a green full quality suite. The user’s original screenshot was not attached to this delegated session, so the screenshot assessment is of the actual replacement, not a pixel comparison with the original. The root session’s suite results and any later production changes require their own records/recheck. No material factual or functional blocker remains after the C1 recheck below.


## C1 final built-page recheck

After the root session rebuilt the local app with the C1 fix and explicitly announced readiness, reran only the affected link interaction in desktop/phone light/dark. Selected purpose `command-files`, searched `-h`, and followed “Command help cell →” by mouse click on desktop and touch tap on phone. In all four contexts the help command textarea receives focus and sits fully inside the viewport; the wrapper starts at approximately y=0. The query, purpose and exact URL are preserved. Visually inspected the resulting phone-dark screenshot. C1 is resolved on the final built page. Evidence: `self-help-fixed.cjs`, `self-help-fixed.json` and `self-help-fixed-<width>-<theme>.png`. This targeted recheck does not claim a second complete sweep or modifier-click coverage; the root session owns those regression checks and the final full quality suite.
