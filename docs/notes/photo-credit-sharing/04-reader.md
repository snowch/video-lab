# Independent built-page reader review

Copyright © 2026 Christopher Snow.

Reviewed 29 October 2026 by a fresh learner-review agent, separate from the builder and prose author. Audience: a competent software/data engineer new to media. Read `01-facts.md` and the built pages; no production implementation edits or fixes.

Built site: `http://127.0.0.1:4187/video-lab/`. Chromium, desktop 1440 × 1000 and phone 390 × 844, each in light and dark themes. Standalone Playwright Node run: `node /workspace/scratch/photo-credit/reader/review.mjs` — passed. Evidence: `/workspace/scratch/photo-credit/reader/results.json`, `review.log` and screenshots in that directory.

## Findings

No actionable findings in this slice. No severity-ranked fixes requested.

| Built-page quotation | Reader assessment and suggested direction |
| --- | --- |
| “If you share this photograph or an edited version, retain the photographer credit, title, source and licence links, and describe your changes. If you share an adaptation, follow the licence’s ShareAlike terms.” | Clear sharing condition; no demand to publish private practice and no blanket requirement to license every resulting video ShareAlike. Retain. “Adaptation” is a legal classification left to the linked licence; the notice does not require the learner to resolve that classification to practise. |
| “Request 8-bit colour components with a brightness-related sample at every pixel and colour differences at lower resolution.” | Gives the immediate meaning of the option on hold, sequence and animation, followed by unchanged-dimensions and practical H.264 context. “Pixel formats explained” supplies the detail at the point of need. Retain. |
| “Y is luma, a brightness-related component. U and V store colour differences.” | Defines unfamiliar component names before the concrete four-Y/one-U/one-V grouping. Planar storage and alpha are also defined locally; no codec expertise is required. Bits and arrays are reasonable engineer prerequisites. Retain. |
| “More samples or precision means more uncompressed picture data, not a guaranteed encoded file size or quality.” | Prevents treating the comparison as an encoded-size or quality guarantee. The destination-support and actual-output-report caveats are readable and useful. Retain. |

## Built-page checks

- The photograph notice retains Hannes Röst, Fronalpstock, the 640 × 360 crop/resize statement, original Wikimedia source and CC BY-SA 3.0 link. Both link destinations match the intended source/licence. The notice and linked text remain legible in all four layouts. The source control also displayed the actual 640-pixel-wide photograph, scaled to the phone width.
- All twelve option-link journeys (three lessons × four layouts) reached `#/appendix/formats/pixel-formats`, scrolled to the visible “Pixel formats” H2 and focused it. Keyboard Enter activation was also checked from sequence and animation.
- Browser Back preserved separately edited worked and practice command cells on every journey. Fresh direct loading and reloading the section route focused the same heading in all four layouts.
- No horizontal page overflow on hold, sequence, animation or the appendix. Inspected credit, main pixel-format explanation and comparison screenshots in both themes, including phone wrapping. No clipped text or microscopic body labels found.
- Reading/navigation requested no FFmpeg core, encoder-directory or WebAssembly download, and produced no browser page errors.

## Limits

Review covers this copy and reference-link slice in Chromium, not every pre-existing lesson control or browser engine. It preceded the sceptic's subsequent “video codec” and “one of each U/V sample” wording refinements; those belong to the final checker pass. External source/licence targets were inspected as links, not a live availability audit. No processing commands or encodes were run: media, commands and grading are unchanged. This is reader review, not a replacement for the sceptic, independent checker or required quality checks.
