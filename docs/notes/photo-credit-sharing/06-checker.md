# Independent final built-page checker

Copyright © 2026 Christopher Snow.

29 October 2026. Separate checker agent, uninvolved in implementation or the fixes. Read `AGENTS.md`, `01-facts.md`, `04-reader.md` and `05-sceptic.md`. Verified the latest built site at `http://127.0.0.1:4187/video-lab/`; no production code edits or commit.

## Result

Pass for this slice; no remaining actionable findings. Both retained low-severity sceptic refinements are present in the actual built appendix:

- “A video codec describes how video is encoded”.
- “one U sample and one V sample” in both the yuv422p and yuv444p comparisons.

The built hold lesson retains Hannes Röst, the title “Fronalpstock, Switzerland”, the 640 × 360 crop/resize description, the original Wikimedia source link and CC BY-SA 3.0 link. Its notice says “If you share this photograph or an edited version” and “If you share an adaptation”; it contains no blanket requirement that every resulting video adopt ShareAlike. Independently fetched the built `media/images/ATTRIBUTION.md`: HTTP 200, matching author/title/source/licence/change information and both conditional clauses.

## Evidence

Standalone Playwright API, not the CLI: `node /workspace/scratch/photo-credit/checker/review.mjs` — passed. Chromium desktop 1440 × 1000 and phone 390 × 844, each light and dark. Results and download checks: `/workspace/scratch/photo-credit/checker/results.json`; log: `review.log`; fetched public notice: `public-attribution.md` in that directory.

- All twelve journeys (hold, sequence and animation in four layouts) found exactly one “Pixel formats explained” link, reached `#/appendix/formats/pixel-formats`, focused its H2 and placed it visibly in the viewport.
- Back preserved independently edited worked and practice command cells on all twelve journeys.
- Fresh direct section loading and reload focused the same heading in all four layouts.
- No horizontal document overflow on the three lessons or appendix; no browser page errors.
- No FFmpeg core, encoder-directory or WASM requests during reading/navigation.
- Captured twelve screenshots and visually inspected eight: desktop light pixel section, desktop dark comparisons/credit, phone light credit/pixel section/comparisons, and phone dark credit/pixel section. Credit links and conditional notice remain readable; corrected comparison wording wraps cleanly. No clipped text or microscopic labels found.

## Limits

Bounded Chromium review of this text/reference-link slice, not a whole-course or cross-engine audit. External links were checked for intended destinations, not live availability. No encodes were run because commands, grading and media are unchanged. This pass does not replace the required complete `npm run check`/CI run, which the builder will record separately.
