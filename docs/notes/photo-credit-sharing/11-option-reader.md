# Independent reader review: option-value clarifications

Copyright © 2026 Christopher Snow.

29 October 2026. Separate learner-review agent; no production edits. Reviewed the four revised notes in their complete built-page context at `http://127.0.0.1:4187/video-lab/`, using the competent-engineer/new-to-media audience and audit briefs `08`/`09`.

## Findings

No actionable findings; no severity-ranked fixes requested.

| Revised built-page quotation | Assessment and direction |
| --- | --- |
| Hold: “For this image input, 1 switches looping on and 0 switches it off. The value is not a repeat count.” | Resolves the numeric ambiguity and limits the claim to this input. The following placement instruction and existing five-second duration explanation make the stopping condition clear. Retain. |
| Export: “Request yuv420p for the output pictures. Pixel formats explained” | Appropriate short reminder after the page's component, bit-depth, planar-storage and 4:2:0 explanation. The output-log instruction follows immediately, and the link supplies the common reference. Retain. |
| Padding: “The position is a pixel offset from the canvas’s top-left corner: x (horizontal) first, y (vertical) second.” | Makes the numbers interpretable before the existing variable/formula explanation. The source/result illustration and paragraph about top/bottom bands support the mechanism. Retain. |
| Quality: “This is a number on libx264’s quality-factor scale, not 18% quality.” | Complements the earlier definition, lower/higher direction and bitrate/file-size caveats. The CRF 35 comparison and CRF 26 practice make the scale useful without implying a percentage or fixed output size. Retain. |

## Built checks and limits

Standalone Chromium run: `node /workspace/scratch/photo-credit/reader/option-review.mjs` — passed. Desktop 1440 × 1000 and phone 390 × 844, light and dark: all sixteen page/layout combinations showed the revised text without page overflow. Inspected screenshots of every revised note in all four layouts; readable wrapping and contrast, including the longer padding explanation.

On export in all four layouts, keyboard activation of “Pixel formats explained” reached `#/appendix/formats/pixel-formats` and focused the “Pixel formats” heading. Browser Back preserved separately edited worked and practice command drafts. No browser page errors or FFmpeg core/encoder/WebAssembly downloads while reading and navigating.

Evidence: `/workspace/scratch/photo-credit/reader/option-results.json`, `option-review.log` and `options-*.png`. Review is bounded to these four changes and their page context; it does not repeat or claim the auditors' all-28-page coverage. No encodes, command/grading revalidation or other-browser review: commands and behaviour are unchanged apart from the new reference link. Earlier reader review remains evidence for its earlier scope; sceptic/checker and quality checks remain separate.
