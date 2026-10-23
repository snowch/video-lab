# Terminal output scrolling — separate sceptic

Copyright © 2026 Christopher Snow.

23 October 2026. Read the plan and separate drafting record; independently exercised actual `help` output in the built preview at `http://127.0.0.1:4173/video-lab/`. Then read the completed [01-reader.md](01-reader.md), which reports no findings. Observed bundle **`index-BmvcL0M-.js`**. No app changes, media processing or full test-suite rerun were performed for this display-only pass.

## Independent checks

Ran `help` through the labelled Command field and Enter at **1440 × 1000** and **390 × 844**, in the application's actual **light and dark themes**. In all four cases:

- Output defaulted to unwrapped `white-space: pre`, preserving the actual help line breaks and columns.
- Long output remained inside its panel: scroll width **3238 px**, panel client width **896 px desktop / 306 px phone**. The document remained exactly **1440 / 390 px** wide, so horizontal overflow was local.
- Focusing the output and pressing **ArrowRight** increased its horizontal scroll position. The panel is keyboard-focusable and labelled “Command output”.
- Focusing **Wrap lines** and pressing **Space** changed `aria-pressed` to `true` and switched the output to wrapping. Scroll width then equalled panel client width.
- Pressing **Enter** on that button restored `aria-pressed="false"` and unwrapped output. The complete output `textContent` was **identical before, during and after** both changes.

Source review corroborates the observed boundary: the toggle changes only display state/class, has `aria-controls="cli-output"`, and the output's `aria-describedby` points to the scrolling instruction. No command string, input value or lesson example is rewritten by the toggle. The longer raw help line is not a reason to restore default wrapping; unwrapped output with optional wrapping is the requested behaviour.

These checks support local scrolling, preserved output text and keyboard operation in the observed Chromium layouts. They do not claim physical touch-device or screen-reader conformance, exhaustive browser coverage, or a rerun of unrelated command/media functionality. The reader's no-findings conclusion is upheld within that same narrow scope: its substantive observations are independently corroborated, and its limits are accurate. No justified implementation finding emerged; proceed to the separate checker and full gate without inventing changes to fill a review.
