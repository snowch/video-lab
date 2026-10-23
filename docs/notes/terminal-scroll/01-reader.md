# Terminal scrolling: independent reader

Copyright © 2026 Christopher Snow.

Reviewed 23 October 2026, local preview `/video-lab/#/inspect/reference`, built bundle `index-BmvcL0M-.js`. I read the short slice plan, then used the built interface before inspecting any implementation. Scope: terminal display only, not media processing or the wider course.

No justified findings or blockers.

I entered `help` in the Command field and submitted it with Enter. The default output preserved the command/description columns and original line breaks. The instruction is concrete: “Scroll sideways to read long output lines, or turn on Wrap lines to fit them to the available width.” On the phone the right-hand descriptions extend outside the panel's visible portion, as expected; the instruction and nearby button explain how to reveal them.

At 1440 × 1000 and 390 × 844, in both actual light and dark themes, output text and the toggle remained readable. Horizontal overflow stayed inside the terminal: its scroll width was 3,238 pixels against a visible width of 896 desktop / 306 phone, while document widths remained exactly 1,440 / 390. Long output did not widen the lesson or move the command input off-screen.

The output is labelled “Command output” and keyboard focusable. Focusing it and pressing ArrowRight twice moved its horizontal scroll position to 80 pixels. Focus remained on the output. The “Wrap lines” button had a visible focus indicator; both Space and Enter activated it in separate attempts. Its pressed state changed from false to true. Wrapped phone output fitted the 306-pixel panel width, and toggling back restored unwrapped columns. The output's complete `textContent` was identical before and after toggling: the display option did not rewrite command results.

This was Chromium browser automation with desktop and phone viewport sizes, including visual inspection of screenshots and real keyboard input. It was not a physical touchscreen swipe test, screen-reader test or full cross-browser suite. No app changes were made; screenshots are scratch evidence under `/workspace/scratch/all-cli-reader/terminal-*`.
