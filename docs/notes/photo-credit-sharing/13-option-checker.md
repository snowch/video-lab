# Independent final checker: option clarifications

Copyright © 2026 Christopher Snow.

29 October 2026. Separate checker agent, uninvolved in production edits. Read the focused prose, reader and sceptic records (`10`–`12`) and checked the latest built site at `http://127.0.0.1:4187/video-lab/`. No production edits or commit.

## Result

Pass; no remaining actionable finding in the four changes.

| Built note | Verified clarification |
| --- | --- |
| Image hold `-loop 1` | “1 switches looping on and 0 switches it off”, “not a repeat count”, placement before the photograph input, and “-t 5 stops the output” are present. |
| Export `-pix_fmt yuv420p` | “Request yuv420p for the output pictures” and the working “Pixel formats explained” reference are present. |
| Padding | Position is a pixel offset from the canvas’s top-left corner, with x horizontal first and y vertical second. Existing centring explanation remains legible. |
| CRF 18 | The value is explicitly a number on libx264’s quality-factor scale, “not 18% quality”. |

## Built evidence

Standalone Playwright API: `node /workspace/scratch/photo-credit/checker/option-review.mjs` — passed. Evidence: `/workspace/scratch/photo-credit/checker/option-results.json`, `option-review.log` and sixteen `options-*.png` screenshots.

Desktop 1440 × 1000 and phone 390 × 844, each light/dark: checked all four changed notes in all sixteen page/layout combinations, with no horizontal document overflow. In all four layouts, keyboard activation of the new export link reached `#/appendix/formats/pixel-formats` and focused the “Pixel formats” heading. Back preserved independently edited worked and practice command drafts. No browser page errors or FFmpeg core/encoder/WASM requests occurred.

Visually inspected eight screenshots, covering each changed note at both desktop and phone sizes and both themes across the set: phone light hold/quality, phone dark export/padding, desktop light export/padding and desktop dark hold/quality. Revised text, longer padding explanation and link wrap readably without clipping.

## Limits

This checks the four implementation deltas and new export reference in Chromium, not another whole-course/all-28-page audit or cross-engine review. No encodes were run because commands, media and grading are unchanged. Earlier checker evidence remains scoped to its earlier slice. Required full quality checks/CI are recorded separately by the builder.
