# Header star: fresh learner review

Copyright © 2026 Christopher Snow.

## Scope and independence

The reader did not implement the header change. Reviewed the actual built site at
`http://127.0.0.1:4199/video-lab/` with Chromium on 3 November 2026. No application
code was edited, no GitHub account was used, and the repository was not starred.

The first requested desktop/phone pass found no functional blocker. During this
review the separate sceptic reported enlarged-text tablet crowding and the builder
changed the header wrapping breakpoint. The reader's subsequent tablet inspections
already saw the corrected layout; the reader did not independently observe the
original tablet failure. The complete final matrix below was then repeated against
one identified built artifact, `c575e2a+3f1b34c`, whose full build identity is
`3f1b34c849ac28d1623f2d792e330606a1c514703cbd92d4c3a5caa23e009d26`.

## Evidence and coverage

Final screenshots and machine observations are in
`/workspace/scratch/header-star/reader/final/`. The repeatable browser review is
`/workspace/scratch/header-star/reader/final-review.mjs`; its final output is
`final/results.json`. The earlier pass and a touchscreen-specific interaction
check are retained alongside it (`results.json` and `additional.json`).

Each row was checked in both light and dark themes, including opening and closing
Files and App status, changing theme, tabbing to Star and activating it with Enter.
The 200% cases set the root font size to `200%` (32 CSS px), rather than merely
enlarging a screenshot.

| Viewport | Root text | Result |
| --- | --- | --- |
| 1365 × 900 desktop | 100% and 200% | Pass |
| 393 × 851 phone | 100% | Pass |
| 320 × 740 narrow phone | 100% and 200% | Pass |
| 768 × 1000 tablet | 200% | Pass after wrapping correction |
| 900 × 1000 tablet | 200% | Pass after wrapping correction |

All fourteen final conditions kept document width equal to viewport width. Header
controls remained within the viewport, without clipped labels or overlapping
targets. At narrow widths the theme control and App status wrap onto further rows;
at 320 px with enlarged text the header is tall, but its controls remain readable
and operable. The final desktop and tablet enlarged-text screenshots also show
readable, separate status badges. No page errors were observed.

## Findings

### R1 — Low: visible destination depends on recognising the Star convention

The visible label is **“Star”**, with an outline star. The accessible name and
hover title are **“Star Video Lab on GitHub (opens in a new tab)”**. This supplies
clear meaning to a screen-reader user and a pointer user who reads the title, but
a sighted touch learner must recognise the GitHub convention or follow the link
to learn the destination. The icon by itself could also describe a local favourite.

Evidence: `final/phone-light.png`, `final/phone320-text200-dark.png`, and the
accessible-name/href fields in `final/results.json`.

Suggested direction: consider making GitHub visible in the label if the course is
intended to accommodate learners unfamiliar with GitHub stars. This is a
non-blocking wording suggestion for sceptic adjudication, not a claim that the
link is inaccessible or broken. The intended technically experienced audience may
already understand the convention.

## Verified behaviour

- The star link is easy to locate beside Files and the theme control, with a
  visible icon and text in both themes. It does not require opening a menu.
- Its actual href is `https://github.com/snowch/video-lab`, with `target="_blank"`
  and `rel="noopener noreferrer"`. It leads to the repository where the learner
  can choose to star it; it does not present a fabricated star count or selected
  state.
- Star measures approximately **96.7 × 46.4 CSS px** at normal text and
  **129.4 × 72.8 CSS px** at 200% root text. Both exceed the 44 px touch target
  requirement. Files, theme and App status also retain at least 44 px height.
- Keyboard order from the brand reaches App status, Files and Star. Star has a
  visible 3 px focus outline in both themes. Enter opens the repository in a
  separate tab with `window.opener === null`, preserving the original course tab.
- The final keyboard navigation checks intercepted the GitHub document request
  with inert review HTML; they verify the real link destination and new-tab
  behaviour without claiming to inspect GitHub's authenticated star flow.
- A separate 320 px / 200% root text touchscreen check used actual Playwright
  `tap()` actions: Files opens its dialog, App status opens its panel, Star opens
  the repository tab, and theme changes. The star navigation was intercepted in
  the same way; no GitHub starring action was performed.
- Files opens and closes, App status opens and closes, and theme toggles in every
  final matrix condition. Their existing functions remain reachable after the
  header addition. The review did not trigger offline downloads, remove saved
  content or alter learner files.

No high- or medium-severity finding remains in the final built-page reader pass.
The separate sceptic should decide whether R1 warrants a change for this audience.
