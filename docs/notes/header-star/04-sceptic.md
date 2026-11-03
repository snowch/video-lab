# Header star sceptic review

Copyright © 2026 Christopher Snow.

Independent sceptic pass, separate from implementation and copy drafting. Inspected `src/main.tsx`, `src/style.css`, `src/content/ui.strings.ts`, the configured Git origin, and the actual built app at `http://127.0.0.1:4199/video-lab/`. No implementation edits were made in this pass.

## Built-page evidence

Ran Chromium scripts in `/workspace/scratch/header-star/sceptic/`: `review.mjs`, `routes.mjs` and `tablet.mjs`. Structured evidence is in `results.json`, `routes.json` and `tablet.json`; screenshots accompany them. This is browser verification of the served production build, rather than source-only inference.

- The exposed accessibility role is link, named “Star Video Lab on GitHub (opens in a new tab)”. Its visible text “Star” is included in that name. Decorative SVG is hidden from accessibility and cannot take focus.
- Actual Tab navigation reached Star after Files. Its focus outline is solid, 3px, in both themes. Enter opened a second tab targeting exactly `https://github.com/snowch/video-lab` with a GET; the original lesson tab retained its URL and the new tab had `window.opener === null`. A separate 320px touch-context `tap()` produced the same destination and null opener. External navigation was intercepted and fulfilled locally: no GitHub Star control was used and no actual starring mutation occurred.
- The href matches Git origin. Source uses `target="_blank"` and `rel="noopener noreferrer"`; there is no custom click handler, token collection, third-party star widget, count or success state.
- Initial request logs in both themes contain only same-origin app assets, poster and release check. The star renders from local markup/SVG without a third-party request or processing-tool download.
- Star remains visible once each on `#/learn/first-edit/shorten` and `#/earlier`, without horizontal overflow at 320px.
- Checked 1280, 768, 701, 700, 390 and 320px widths in both themes with 16px and doubled 32px root font sizes. No horizontal page overflow. Star's ordinary target is about 97×46px; enlarged text gives about 129×73px. Screenshots at desktop and 320px show readable Star text and wrapping controls.

## Independent finding and resolution

**S1 — Medium, resolved: enlarged-text tablet header crowds App status.** At 768px/32px root text the header is about 844px tall; its App status summary collapses to about 38px width, badges break into individual letters and Files/theme overlap their area. The same narrow middle-column problem appears at 701, 820 and 900px. `enlarged768.png` shows the actual result. Absence of horizontal overflow does not establish usable layout.

A controlled browser comparison removing only the new Star anchor establishes that the old grid also struggles, but the addition worsens it: at 768px/32px the header is 844px with Star versus 629px without; at 900px/32px it is 844px versus 271px, and status width is about 84px versus 232px. This is a scope-relevant regression on an existing weakness, rather than a wholly new problem. Suggested direction: let header sections wrap and allocate App status a full readable row when their combined width exceeds available space, including enlarged fonts. Preserve Star, Files and theme targets.

The builder changed the header wrapping breakpoint from 700px to 1100px and rebuilt. I independently ran `recheck.mjs` against the rebuilt served app at 320, 768, 900, 1024, 1100, 1101 and 1280px, both themes, with 16px and 32px root fonts. All 28 cases have no horizontal overflow and zero status/links overlap. App status remains readable: at 768px/32px its width is now 710px and the header is about 293px high. At the 1101px grid boundary its width remains about 285px light/279px dark; inspected screenshots show readable badges and separated controls. Star remains visible. Evidence: `recheck.json` and `rechecked-*.png` in the same scratch directory. S1 is closed.

## Rejected concerns and limits

- Rejected automatic-starring claim: the accessible name describes a GitHub destination, the implementation is ordinary navigation, and there is no star success/count state. GitHub still owns its signed-in user's eventual Star action.
- Rejected wrong destination or unsafe opener: browser-observed exact GET URL and null opener corroborate the source attributes.
- Rejected third-party dependency on rendering: request logs and local SVG demonstrate none added by this control.
- A real authenticated GitHub star, GitHub sign-in and third-party availability were deliberately not tested; they are not app functionality. This review does not substitute for the repository's full quality gate.

## Reader adjudication

Read `03-reader.md` after its final built-page pass. It contains one finding.

**R1 — Low, rejected as a required fix; retained as an optional preference.** The reader correctly observes that visible “Star” and the outline icon require recognising the GitHub convention, while the accessible name/title explicitly identify GitHub and new-tab behaviour. I verified that same actual header and navigation. However, the intended audience is experienced software/data engineers, for whom repository stars are a familiar convention; the reader supplies no evidence of meaningful confusion in this audience and explicitly reports no broken/inaccessible behaviour. A GitHub word in the visible label could help a broader audience, but the current concise label satisfies the fact brief, preserves the visible text within the accessible name, and makes no automatic-star or local-favourite success claim. No wording change is necessary for this scope.

The reader observed the corrected tablet layout and accurately limits their claim: the original failure and its counterfactual comparison are independently recorded by this sceptic, rather than attributed to the reader. Their final reader matrix and controls checks agree with my rebuilt-page results. S1 is resolved; there are no remaining blocking or required findings.
