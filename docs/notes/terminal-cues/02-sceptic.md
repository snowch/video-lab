# Terminal overflow cues — separate sceptic

Copyright © 2026 Christopher Snow.

23 October 2026. Read the plan, drafting record and completed [01-reader.md](01-reader.md); independently exercised the built page at `http://127.0.0.1:4173/video-lab/`, bundle **`index-BjzZ2r1X.js`**, and inspected the relevant display bindings. No app changes, media processing or full-suite rerun were performed.

**Disposition: uphold the reader's no-findings conclusion within this small display scope.** Its substantive interaction claims were independently corroborated, and its limitations are appropriately stated.

Using actual `help` output at **1440 × 1000** and **390 × 844**, in both application light/dark themes, I verified:

- Only the right cue/button appeared initially; both directions appeared after moving right; only the left remained at the far-right edge. At that edge the left fade's computed opacity was 1 and the right fade's was 0.
- Keyboard **Enter** on More output moved **717 px** within the **896 px** desktop panel, or **245 px** within the **306 px** phone panel, matching 80% with rounding. Focus moved to Command output. **Space** activated Previous output and likewise returned focus to the panel.
- Wrapping removed both direction cues. Complete output `textContent` remained identical through scrolling and wrapping.
- Document width remained **1440 / 390 px**. Overflow stayed within the output panel rather than moving the command field or widening the page.

Separately, the short initial message fitted at desktop width with no cues. Resizing to phone produced the right cue; widening again removed it. Running `help` produced the right cue, and `clear` removed it again at desktop width. These observations support recalculation on actual output changes and resize, not merely the initial render.

Source matches that behaviour: hidden-right/left state is measured from the output's actual dimensions and scroll offset; scroll events, output/wrap changes and resize trigger measurement. The controls change scroll position and focus only. The fades have `pointer-events: none`, and neither the command text nor output content is rewritten by the controls. The 1 px edge tolerance avoids treating fractional rounding as meaningful hidden output.

Reject a broader concern that these buttons introduce GUI answer controls: they navigate already-produced text and do not select media parameters, run a processing preset or grade an answer. Their labels indicate direction without claiming to generate additional output.

This pass does not certify physical touch scrolling, screen-reader behaviour, other browsers or unrelated lesson functionality. No justified fix is required before the separate checker and full gate.
