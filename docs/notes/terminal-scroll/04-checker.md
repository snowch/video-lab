# Terminal scrolling — independent final checker

Copyright © 2026 Christopher Snow.

23 October 2026. Independent gpt-6.1-sol checker, high reasoning effort; I authored neither this display change nor its strings/tests. Read the plan and reviews 01–03, then exercised actual built `help` output at `http://127.0.0.1:4173/video-lab/#/inspect/reference`. No application edits or media tests.

Bundle **`index-BmvcL0M-.js`**, fetched SHA-256 **`b23b7d415593d714e47b3cf416e89e07292fdc2ae1ade440ab0ffd4620f0e9d2`**. **Accepted within this focused scope; no new finding or blocker.**

Independent Chromium checks covered **1440 × 1000** and **390 × 844**, in both actual application themes. Firefox additionally covered **390 × 844/dark**. Themes were changed with the real application button and checked against the document attribute. In all five contexts:

- Typed `help` and ran it with Enter. Output defaulted to `white-space: pre`, preserving line breaks and help columns, with local `overflow-x: auto`.
- Terminal client width was **896 px desktop / 306 px phone**; unwrapped scroll width was **3238 px Chromium / 3239 px Firefox**. Document width remained exactly **1440 / 390 px**.
- Focused the labelled, `tabIndex=0` output and pressed ArrowRight. Its horizontal scroll position increased in every context while focus remained on the terminal.
- Focused **Wrap lines** and pressed Space: `aria-pressed` changed from false to true, computed style became `pre-wrap`, and scroll width equalled client width. Enter on the same button restored false and unwrapped local overflow.
- Full output `textContent` was identical before, during and after wrapping: SHA-256 **`41bb96ec75199b1b4567c463531856b2f4b0e728926485eeec8063a484068076`**. A deliberately retained draft command and all lesson-example text were also unchanged.
- The toggle's `aria-controls` matched the actual output ID; the output's `aria-describedby` resolved to the scrolling instruction. No uncaught page errors occurred.

I visually inspected the actual [desktop-light unwrapped capture](evidence/checker-desktop-light.png) and [phone-dark wrapped capture](evidence/checker-phone-dark.png): instructions, toggle, focus and output remain legible, with overflow confined to the output panel. This is an optional display control, not a restored exercise answer form.

Independent command:

```sh
node /workspace/scratch/terminal-checker/check.mjs
```

Final execution exited **0**, completing all five contexts. `results.json` in that directory records the fetched bundle hash, exact widths/styles/scroll positions and unchanged-text hash. An initial checker assertion guessed the wrong instruction ID; correcting it to the built `cli-output-scrolling` association required no application change.

The builder's separate `/workspace/scratch/terminal-check.log` records **75 passing unit tests and 125 passing browser cases**, with the browser stage completing in **3.0 minutes**. I inspected that log, not independently executed or claimed the full gate. This focused check does not repeat media, persistence, all seven lab routes, capture, offline/update or deployment validation. Browser viewport/theme and keyboard automation do not certify physical touch swiping or screen-reader behaviour. Public deployment remains separate.
