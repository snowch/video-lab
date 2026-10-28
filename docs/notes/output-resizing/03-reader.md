# Output resizing — independent built-site reader review

Copyright © 2026 Christopher Snow.

28 October 2026. Separate reader agent. Inspected and exercised the built UI before reading `01-facts.md` and `02-copy.md`. Used an independently started preview on port 4174; no product edits, build, Playwright CLI run or commit. Scripts, observations and screenshots are outside the repository at `/workspace/scratch/output-resize/reader/`.

## Coverage

Ran genuine browser ffprobe commands on all three requested entries:

- Notebook `#/learn/inside-video/inspect`: `ffprobe bunny-short.mp4`.
- Legacy `#/inspect/reference/investigation`: loaded the controlled inspection source, selected Type command and ran `ffprobe reference-inspect.mp4`.
- `optional/command-workbench.html`: selected the practice source, continued to Inspect and ran `ffprobe mousepad-demo.mp4`.

Notebook coverage: desktop 1440 × 1000, tablet 820 × 1180 and phone 393 × 851, each light/dark; also desktop and phone in both themes at 200% document CSS zoom. This is doubled document rendering, not a claim of physical pinch zoom, browser menu zoom or a text-only accessibility preference. Legacy and optional coverage: desktop and phone in both themes; additional phone-dark wrapped-output/rerun checks. Standalone Chromium Playwright scripts: `notebook.mjs`, `other.mjs`, `followup.mjs`; corresponding JSON files contain measurements. Representative screenshots from each route, both themes, all three sizes and doubled rendering were visually inspected.

## Observations

The visible “↕ Resize output” bar is distinguishable from the raw log, wrapping control and command editor. Its name describes the action without introducing a new media concept. It spans the output width, provides a substantial drag target and shows a clear focus outline. Its accessible separator metadata identifies the associated output, current height and limits. The description/title explains: “Drag up or down to change height. Use Arrow Up/Down for small changes, Page Up/Down for larger changes, or Home/End for minimum/maximum height.” No confusing affordance was established.

Notebook keyboard operation changed 320 → 352 pixels with Arrow Down, then 480 with Page Down; Home selected 128 and End selected 1200. A downward 120-screen-pixel mouse drag on desktop/tablet or genuine CDP touch sequence on phone increased 128 → 248 CSS pixels at normal size, or 128 → 188 at doubled document rendering. The distinction at doubled rendering is correct: the pointer moves in screen coordinates, while the chosen height is in CSS pixels. Height remained 248/188 after a real rerun in every notebook combination.

Legacy and optional Page Down increased the selected height to 448; downward 80-pixel mouse/touch drags increased it to 528. A follow-up phone-dark test selected 256 with Home/Page Down, wrapped the output, scrolled to its final stream metadata and reran. Both entries retained 256 after rerun. See `legacy-phone-dark-wrapped.png` and `optional-phone-dark-wrapped.png`.

Ordinary scrollable output remained available. Notebook wrapped logs had scroll heights greater than their chosen viewport heights and could be moved through to their lower contents. Legacy output at 528 retained vertical overflow (677 pixels of content in a 526-pixel content box); both earlier entries retained horizontal scrolling for the long unwrapped configuration line. After using their actual Wrap lines buttons, horizontal offsets returned to zero and widths matched the available pane. The wrapped bottom-of-log screenshots show intact final stream metadata. Some initial earlier-entry screenshots intentionally show little text because the script had scrolled to the far right and bottom of unwrapped output; those images are not evidence of missing output.

The existing wrap/header controls and new bar stayed legible in the inspected light/dark screenshots. At phone doubled rendering, the header stacks and the log shows fewer words per line, with the resize bar still visible and readable. No clipping outside the scrollable log was found. Document width equalled viewport width in all measured cases: 1440, 820 or 393 pixels. Reruns returning the notebook scroll position to the beginning did not remove the chosen viewport height or prevent scrolling again.

## Findings and limits

No justified product finding at any severity; no fix proposed.

The learner must recognise that output can be scrolled, and that dragging the named bar changes its visible height. Existing wrap/sideways-scroll wording and the named resize bar support that distinction. The tool output remains separate from the resizing instructions.

This pass validates the built resize interaction and its immediate reading experience. It does not claim full-course, Firefox, screen-reader, physical touch/pen hardware, pointer-cancel/capture-loss or reload-persistence validation. Scrollability was exercised through DOM scroll positions and keyboard events; physical wheel and touch scrolling inside the output, text selection and byte-for-byte log invariance were not independently tested. Parent interaction tests and separate sceptic/checker review cover the wider contract. No implementation author claims to have independently reviewed their own work here.
