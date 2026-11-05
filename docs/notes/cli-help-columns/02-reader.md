# Independent reader review: command help columns

Copyright © 2026 Christopher Snow.

Reviewed on 5 November 2026 by a separate reader agent who did not edit the CSS.
Used the built site at `http://127.0.0.1:4173/video-lab/` in Chromium. Reviewed
`#/learn/first-edit/shorten`, `#/learn/frames-time/rate`, `#/learn/framing/pad` and
`#/learn/cut-join/join` at 390, 820 and 1365 CSS pixels, light and dark themes,
with normal and 200% root text size: 48 combinations. No rebuild or full quality
check was run by this reviewer.

## Outcome

No actionable readability or layout defect found in this focused review.

At tablet and desktop widths the parameter list now reads down a single left
column, with each description starting beside its own parameter in a consistent
right column. In the pictured frame-rate lesson, `-i bunny-short.mp4`, `-t 4`,
`-vf "fps=12"` and `paced.mp4` each have their own row. The longer filter explanation
wraps within the right column; it does not turn the next parameter into an adjacent
card. Bold monospace syntax remains distinct from explanatory prose.

The one-third/two-thirds allocation leaves sufficient room for ordinary parameters
and multi-line descriptions. The longer padding expression wraps without pushing
its explanation out of alignment. The joining lesson also keeps its seven entries
in order, including the two-input argument and `-map "[v]" -map "[a]"`. There is
no need to alter learner-facing wording or introduce another concept for this
presentation change.

## Responsive qualification

At 390 pixels the implementation intentionally places each description below its
parameter. It is therefore not literally two columns at every viewport width.
The pairing and command order remain clear, and the full-width description is
readable. This matches the documented phone exception in the plan. Keeping two
columns here would give long explanations very short lines, especially at 200%
text size; the reader recommends retaining the responsive exception.

At 820 pixels with 200% text, the two-column layout remains readable, although
long explanations naturally occupy more vertical space and long parameters wrap.
No text overlaps the next row. Phone enlargement also preserves the entire syntax
and description rather than clipping or shrinking them.

## Evidence and limits

- No horizontal document overflow in any of the 48 combinations.
- Bounding-box checks for the first three routes confirmed a consistent description
  x-position and matching parameter/description top edges at tablet and desktop
  widths; phone descriptions follow their terms. All 36 checked lists have no row
  overlap. The additional joining route was visually sampled and checked for
  document overflow in all 12 combinations.
- Native crops of the actual `.notebook-options` element were captured for all 48
  combinations. Representative images were inspected for short commands, long
  filters, both themes, all widths and enlarged text.
- Suggested preview for the user: `/workspace/scratch/cli-help-columns/reader/rate-820-light-100.png`.
  It is the native help-list crop from the frame-rate page at the screenshot's
  tablet-sized context.
- Additional useful images: `pad-820-dark-100.png`, `pad-820-light-200.png`,
  `join-820-light-100.png`, `join-1365-dark-200.png`, and `rate-390-light-100.png`
  in the same scratch directory. Detailed measurements for the first three routes
  are in `reader/measurements.json`; `viewportWidth` is the viewport and `width`
  is the help list's measured content width.

This is a reading/layout review of a CSS-only change. It does not independently
certify every lesson, processing behaviour, output playback, assistive technology
or physical-device browser rendering. Existing semantics and text were not
rewritten, and this review does not claim a new technical audit of their contents.
