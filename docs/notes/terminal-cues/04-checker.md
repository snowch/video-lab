# Terminal cues — independent final checker

Copyright © 2026 Christopher Snow.

23 October 2026. Independent gpt-6.1-sol checker, high reasoning effort; I authored neither these controls nor their strings/tests. Read plan and reviews 01–03, then checked actual `help` output at `http://127.0.0.1:4173/video-lab/#/inspect/reference`. No app changes or media tests.

Bundle **`index-BjzZ2r1X.js`**, fetched SHA-256 **`13368d2ad743ad04ada75c9939cdf6686827c89119bc00de4b6602c483d74deb`**. **Accepted within this focused scope; no finding or blocker.**

Independently exercised Chromium desktop **1440 × 1000** and phone **390 × 844**, each in both actual application themes, plus Firefox **390 × 844/dark**. All five contexts passed:

- At the left boundary, only the right fade and More output button appeared. At an intermediate position, both directions appeared. At the far right, only the left fade and Previous output remained. Computed fade opacity matched each state; both fades had `pointer-events: none`.
- Keyboard Enter on More output moved **717 px** in the **896 px** desktop panel or **245 px** in the **306 px** phone panel: 80% with rounding. Focus transferred to Command output. Space on Previous output returned to zero and likewise focused the terminal.
- Turning on wrapping hid both fades/buttons. Turning it off restored appropriate cues. Full raw output text remained identical through scrolling and wrapping, SHA-256 **`41bb96ec75199b1b4567c463531856b2f4b0e728926485eeec8063a484068076`**. A retained draft command was unchanged.
- After `clear`, the short message fitted at 1440 px with no cues, overflowed at 390 px with the right cue, then fitted without cues after widening again. This checks recalculation for changed output and resize.
- Document width always matched the current viewport; no uncaught page errors occurred.

I visually inspected the actual [desktop-light](evidence/checker-desktop-light.png) and [phone-dark](evidence/checker-phone-dark.png) captures. The fade, direction button, instruction and command entry remain legible; the button does not cover output text.

```sh
node /workspace/scratch/terminal-cues-checker/check.mjs
```

Execution exited **0**, completing all five contexts. `results.json` beside the script retains build identity, measured movement, fade states, text hash and errors. The builder's separate `/workspace/scratch/cues-check.log` records **75 passing unit tests and 125 passing browser cases (3.0 minutes)**; the builder reported full-command exit 0. I inspected that evidence, not independently executed the full quality gate.

Limits: browser viewport/theme and keyboard automation, not physical touch swipes, a screen reader or public deployment. This focused display pass does not repeat media, capture, persistence, offline/update or whole-course checks. No later CI/deployment result is implied.
