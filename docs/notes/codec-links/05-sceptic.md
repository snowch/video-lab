# Codec links: independent sceptic review

Copyright © 2026 Christopher Snow.

Reviewed on 26 October 2026 by a separate sceptic agent against the built preview at `http://localhost:4173/video-lab/`. Read `AGENTS.md`, the learner's `03-reader.md`, the actual source/destination copy and routing implementation. No implementation edits, build, Playwright CLI or full check were run by this reviewer. Browser probes used standalone Node and the repository's installed Playwright API. Scripts, JSON measurements and screenshots are under `/workspace/scratch/codec-links/sceptic/`.

## Accepted finding

**R1 — Medium: the three optional links open the correct destination near its end, with the requested explanation offscreen. Accepted.**

`node /workspace/scratch/codec-links/sceptic/probe.cjs` independently clicked each new native anchor on desktop 1440 × 1000 and phone 390 × 844, waited 500 ms, captured the viewport without scrolling a destination locator into view, and used browser Back. All six routes and headings matched their labels. All six destination headings were far above the viewport:

| Viewport | Destination | Destination scroll Y | h1 viewport Y |
| --- | --- | ---: | ---: |
| Desktop | Copy compressed streams | 2909 | −2700.55 |
| Desktop | Choose an encoding quality setting | 3503 | −3294.55 |
| Desktop | Choose an export format | 2908 | −2699.55 |
| Phone | Copy compressed streams | 4020 | −3724.36 |
| Phone | Choose an encoding quality setting | 5006 | −4689.25 |
| Phone | Choose an export format | 4317 | −4000.25 |

The source links were near the footer. On arrival, the active element was BODY, so keyboard/screen-reader focus also lacked an explicit destination handoff. The original browser Back returned to the correct source with its links area visible. The learner independently tested both themes, keyboard and touch; this sceptic repeated the actual route/scroll failure in default light appearance at both widths rather than claiming to repeat that complete matrix.

Evidence: `results.json`, `probe.cjs`, `desktop-cut-join-copy.png`, `desktop-quality-quality.png`, `desktop-export-format.png` and their phone equivalents.

## Cause, scope and fix direction

The failure is an existing route-classification defect exposed by the new journeys. `routeFor()` in `src/journey/routes.ts` returns `section: parts[2]` even for notebook routes. Thus `#/learn/cut-join/copy` produces legacy section `copy`. The App route effect attempts to scroll to nonexistent `section-copy` and skips its normal scroll-to-top/focus branch. The other targets similarly produce nonexistent `section-quality` and `section-format`.

Instrumentation wrapped `window.scrollTo` and `HTMLElement.prototype.focus` before page startup. Neither was called during any of the six failing jumps. This rejects a competing explanation that `main.focus()` undid an earlier successful top scroll: that branch never ran. It also confirms the screenshots did not create the fault by scrolling a heading locator.

The smallest cause fix is to reserve legacy section scrolling for non-notebook routes: `if (!notebook && resolved.section)`. It restores the App's existing normal page-navigation path for notebook links, including sibling pages. It does not require a special link handler, new history state, component keys, remounting the workspace or storage changes. Keep all three anchors native and preserve their actual hrefs.

**Back-position tradeoff:** the normal App route effect can open the source at its beginning on Back rather than retaining the footer position. Useful previous scroll restoration was an observation, not an authorised requirement to introduce a new history subsystem. The parent clarified that Back must return to the correct source page and retain drafts. Accept the minimal guard with that tradeoff, and explicitly verify those requirements. Focus is on MAIN under the existing App convention; it need not be changed to h1 for this slice.

## Content and relevance assessment

Accepted the learner's content assessment within its stated reading scope. The introductory page already defines container, stream and codec and uses H.264/AAC examples. The three actual destination openings respectively explain decoding/encoding and stream copy; lossy compression, libx264 and CRF; and container/codec choices with libx264/AAC plus newly explained pixel storage. These support the optional heading “More on codecs” and the exact page titles. Computed chapter numbers 4, 8 and 9 match `structure.ts`. The links do not promise a survey of competing codec families, and no such survey is needed to fulfil their wording.

The destination pages provide their own practice-file load controls. That supports reading ahead without completing the intervening chapters; it does not establish that all later exercises were executed in this review. No factual or conceptual blocker was found in the new link wording. Optional placement after practice, before notes and the unchanged pager is proportionate to the narrow request. No additional learner finding is accepted or invented.

## Rejected interpretations and verification limits

- Reject “broken target URLs”: routes and destination h1 text were correct in all six original probes.
- Reject exact preservation of the source numeric scroll Y as the diagnosis. The page's shorter or differently shaped destination changes the final Y through normal layout/scroll adjustment; the demonstrated problem is failure to expose the opening explanation.
- Reject focus-induced rescrolling as the original cause: the instrumented focus and scroll-to-top calls were absent.
- Do not infer a new Back scroll-position requirement, or expand this into a navigation/history rewrite.
- No media commands were executed. No claim is made that every destination exercise or wider course navigation has been audited.

## Follow-up observation after the parent's fix

The parent applied the generic guard and refreshed the built preview while this review was in progress. The successful second run of `node /workspace/scratch/codec-links/sceptic/navigation.cjs` observed the updated build, rather than the original failing build. It typed a distinct source command draft, used the existing Next link, returned with Back, used the new Chapter 4 link and returned again. Both Back journeys reached `#/learn/inside-video/inspect` with the draft `ffprobe bunny-action.mp4 # sceptic draft` intact. Source Y was 0. The existing Next destination had a visible h1 at viewport Y 121.45 and active MAIN; the overview also opened with its title visible and active MAIN. Native focus scrolls the main into view, so window Y need not be exactly 0 to satisfy arrival at the opening.

Evidence: `navigation.cjs` and `navigation.json`. Its first run reached the navigation/draft observations but failed on an incorrectly named “Overview” locator; the corrected run used the toolbar anchor's actual href and completed. This is supporting observation, not a replacement for the designated final checker's complete post-fix link/theme/input matrix or the required full gate.
