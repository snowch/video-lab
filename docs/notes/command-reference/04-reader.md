# Command reference: independent learner review

Copyright © 2026 Christopher Snow.

Reviewed 30 October 2026 by a separate reader agent who did not draft or implement this appendix. Read `AGENTS.md` and the local Assembly Lab authoring/style guidance. Formed the first assessment from the actual built page and its rendered text before reading `CommandReference.tsx`, its CSS or the strings file. Did not read the builder's fact brief or prose rationale. No product source was edited, and no build, repository Playwright CLI or full quality suite was run.

## Built-page scope and evidence

Used standalone Playwright/Chromium at `http://127.0.0.1:4199/video-lab/#/appendix/commands`. Examined desktop 1440 × 1000 and touch phone 390 × 844, each in light and dark. Saved and visually inspected the top and filtered-page screenshots. All 52 entries were read in the rendered page's text. Evidence and reproduction scripts are in `/workspace/scratch/command-reference-reader/`.

- `inspect.cjs`, `initial-text.txt`, `initial-desktop.png`: first read before implementation sources.
- `sweep.cjs`, `sweep.json`, `<desktop|phone>-<light|dark>-<top|pad|none|native>.png`: four-context search, category, empty-state, clear, native link and Back checks.
- `detail.cjs`, `detail.log`, `links.json`, `target-headings.json`: all 30 distinct internal lesson/guide targets resolved with the expected page headings; long `drawtext` example at 200% root text size in all four contexts, saved as `enlarged-<1440|390>-<light|dark>.png`.
- `final-controls.cjs`, `final-controls.json`, `phone-subtitles.png`, `phone-linux.png`: purpose-word search, combined query/filter empty state, keyboard clear and actual theme-button check.

## Findings for the sceptic

### R1 — Low: following a lesson loses the active lookup on Back

The introduction explicitly says, “Follow each lesson link for the full command and explanation.” I selected “Native tools only: capture, preparation and batch”, searched `cursor`, followed “Recording guide →”, then used browser Back. The appendix returned with an empty search and “All purposes”, showing all 52 entries again. This reproduced on desktop and phone in both themes (`sweep.json` records `searchBack: ""`, `filterBack: ""` for each).

A learner comparing an option's brief definition with its full example must recreate the lookup on every return. This is small friction in the intended lookup → lesson → lookup use, rather than a broken destination or completion blocker.

Direction: retain the query and purpose across the lesson-link/Back round trip, preferably in navigation state or a shareable URL. Keep the explicit clear action available.

### R2 — Low: an unnecessary acronym interrupts the subtitle lookup

The `subtitles` entry says, “force_style supplies ASS style overrides, here the font name.” `ASS` is not explained in this entry. Its example uses `captions.srt`, so a learner looking up `force_style` encounters a second subtitle-format term without knowing why it appears. The useful local meaning—changing the font name—is present, so this does not prevent using the example.

Direction: explain `force_style` in ordinary words as subtitle appearance settings, or supply the minimal meaning of ASS only if the format name is necessary. Avoid turning this optional reference into another subtitle-format lesson.

## Successful checks and teaching assessment

The appendix behaves as a lookup rather than another required lesson: it has no challenge, progression gate, task sequence or demand to learn all entries. Each entry has a purpose, an example, placement/context and a lesson or guide link. The introduction distinguishes full commands from fragments. The filters section distinguishes option syntax from filter names and arguments, and examples explain easily confused values such as `-2`, `t=out` and `%02d` locally.

Searching `pad` produced just the pad entry. Searching by the purpose word `resize` found `scale`. Query and purpose combine as expected; an incompatible pair and an invented query showed “No entries match. Try a shorter search or choose all purposes.” Clear restored 52 entries, cleared both controls and returned focus to the search field. Keyboard Enter activated clear. The theme control changed the rendered theme.

The native section explicitly says an installed FFmpeg and the named terminal are required, and the capture/shell text repeatedly distinguishes browser command cells from a shell. Platform choices, macOS screen indices and the X11/Wayland limitation are visible. The scope of the “Native tools only” group merits the separate technical/sceptic check: this learner pass does not establish whether each underlying option is intrinsically native-only or just appears in a native recipe.

No page-level horizontal overflow appeared at either normal viewport width. The long drawtext example and surrounding prose also reflowed at 200% root text size in all four contexts, with no overflowing main-content element. This is a text-enlargement check, not a claim of testing browser zoom or a physical device. The initial phone screen contains the introduction and search controls before the entries; that space explains the lookup's conventions and did not justify a clutter finding. The full 52-entry page is long, but search and purpose filtering give a practical way to narrow it.

All 30 unique internal lesson/guide targets returned their expected headings. The four-context recording-link click and Back check produced no uncaught page errors. External documentation destinations were inspected as URLs, not fetched. No media command was executed by this reviewer; technical command coverage and build-dependent claims belong to the separate audit. Physical devices, screen-reader operation, Firefox/WebKit, full keyboard traversal, actual terminal capture and final fixes remain unverified by this pass.

A preliminary suspicion about the Linux `printf` newline escape was rejected before becoming a finding: direct built-page character codes are `[92, 110]` for one backslash followed by `n`, which is the intended printf format escape. Escaped JSON/text output was not reliable evidence of a defect.

## Addendum: runnable help and timestamp illustration

Reviewed the rebuilt site after the builder's explicit ready messages, including the subsequent first-to-sixth practice revision. This pass covers the real `ffmpeg -h` cell on `#/appendix/commands` and the illustration on `#/learn/frames-time/timestamps`. The first rendered read preceded inspecting `TimestampDiagram.tsx`; no implementation edits were made. Evidence is under `/workspace/scratch/command-reference-reader/extension/`.

### R3 — Low: the help editor displaces the appendix's search controls

“Ask the installed browser tool for help” and its full edit/builder/actions block now appear before “Search syntax or purpose”. On a fresh page with no command output, search starts at document y=1082 on desktop 1440 × 1000 and y=1287 on phone 390 × 844 (`final-copy.json`). The earlier lookup placed search within the first viewport at both sizes. Even a returning learner who only wants an option definition now scrolls past the help editor to reach the core lookup controls. Running help adds a bounded output panel before the search as well.

This is a placement concern, not a request to remove the working cell or a claim that running it is technically mandatory. The surrounding copy does explain that the searchable entries cover course syntax.

Direction: keep search/purpose at the start of the usable reference, with the runnable help cell immediately afterwards or reachable through a clear local link. This preserves the requested genuine help command while keeping lookup convenient.

### Successful rechecks and diagram assessment

In all four desktop/phone light/dark contexts, I clicked Run command on the actual `ffmpeg -h` cell. It reached “Command completed” and displayed the real FFmpeg 5.1.4 banner and general help, including usage and video/audio options. The command needs neither input setup nor an output filename. The copy correctly identifies this as the browser build's help and distinguishes its wider option list from the course reference. The output has the normal bounded pane, wrapping control and resize control rather than expanding all help lines into the document. I did not audit every option in that tool-generated output.

R1 is resolved in the rebuilt page: after selecting “Native terminal examples”, searching `cursor`, following Recording guide and using Back, the query and purpose were retained in all four contexts (`interact.json`). R2 is resolved: the subtitles entry now says “force_style overrides the subtitle style; here it chooses the font.” The native group is now headed “Native terminal examples” and explicitly says some media options also work in the browser tools, removing the misleading intrinsic restriction.

The timestamp diagram now offers a coherent reading path: four numbered picture markers; a matching ordered list with timestamps in ticks and seconds; one selected picture interval; a larger clock view; then the subtraction and time-base multiplication. The phone list becomes two columns in clear picture order rather than shrinking the text. The selected pair is highlighted, and the interval control names both picture numbers. Selecting picture 2→3 and 3→4 updated the highlighted markers, endpoints, zoom title and subtraction in all four contexts. The three small intermediate clock marks are explicitly identified as calculated positions rather than additional pictures, and the note says each gap spans 128 ticks and not every tick is drawn. The separate single-tick conversion then explains why 512 ticks fit in one picture interval. No missing prerequisite or diagram ambiguity justifies another finding in this pass.

The initial rebuilt practice still asked for first-to-third and its endpoint values appeared in the diagram. The final ready build instead asks for first-to-sixth, and directs the learner to count the intervals and use the video rate/time base. I checked that final copy at desktop and phone (`final-copy.json`, `final-practice-1440.png`, `final-practice-390.png`); the diagram only lists pictures 1–4, so it no longer prints that practice's result. I did not open its hints or reference command.

There was no page-level horizontal overflow for either page in the four initial contexts, and the four help runs recorded no uncaught page errors. The distinct picture/time values and computed clock positions received a separate technical review; I did not regenerate the source's FFprobe data. Physical devices, screen readers, offline operation, other browsers and the entire quality suite were not run by this reader. The original user screenshot was not attached to this delegated review, so this assessment describes the built replacement rather than claiming a direct visual comparison with that screenshot.

Evidence: `read.cjs` plus `<commands|timestamps>-<desktop|phone>-<light|dark>.txt/.png` capture the initial rendered addendum read; `interact.cjs`/`interact.json` capture actual help output, Back state and all interval selections; `diagram-*.png`/`diagram-last-*.png` provide focused diagram captures; `help-run-*.png` show the real run; `final-copy.cjs`/`final-copy.json` record the fresh lookup positions and final practice wording. One exploratory script waited for a non-existent “Exit code: 0” label and was interrupted; the completed interaction script instead captured the actual “Command completed” state and output. This did not expose a product defect.
