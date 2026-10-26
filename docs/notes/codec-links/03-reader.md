# Codec links: independent learner review

Copyright © 2026 Christopher Snow.

Reviewed on 26 October 2026 by a separate learner-review agent against the built preview at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect`. Read `AGENTS.md` before reviewing. Did not read the author's rationale, fact brief, implementation or other reviews before forming this assessment. No implementation edits, build, Playwright CLI or full quality check were run by this reviewer.

## Learner assumptions and scope

The learner is a technically experienced engineer who knows the earlier source-selection and first-edit chapter, including basic command editing, `ffmpeg -i` and duration limits. The learner has read the present Chapter 2 page's definitions of container, stream and codec and its `ffprobe` example. They have not studied Chapters 3–10. Scope is the three new links under “More on codecs (optional)”, their placement and destinations; this is not a review of all later chapters or an execution audit of their media commands.

## Browser evidence

Used standalone Node scripts importing the repository's installed Playwright API, against the existing preview. Ran:

- `node /workspace/scratch/codec-links/reader/review.mjs`
- `node /workspace/scratch/codec-links/reader/matrix.mjs`
- `node /workspace/scratch/codec-links/reader/landing.mjs`
- `node /workspace/scratch/codec-links/reader/input.mjs`

The matrix used desktop 1440 × 1000 and phone 390 × 844 in light and dark themes. Clicked every new link and used browser Back in all four combinations (12 link/Back journeys). Separately activated all three with keyboard Enter and with a touch-enabled mobile context's tap. The theme control was exercised through its actual accessible name, “Change colour theme”. An initial script attempt used the visible button text rather than that accessible name and timed out; the corrected matrix completed. An initial preview request before server startup returned connection refused; all recorded assessment evidence below was captured after the server became available.

| Link label | Actual target | Target heading | Browser Back |
| --- | --- | --- | --- |
| Chapter 4: Copy compressed streams | `#/learn/cut-join/copy` | Copy compressed streams | Chapter 2 page 1, links area restored |
| Chapter 8: Choose an encoding quality setting | `#/learn/quality/quality` | Choose an encoding quality setting | Chapter 2 page 1, links area restored |
| Chapter 9: Choose an export format | `#/learn/export/format` | Choose an export format | Chapter 2 page 1, links area restored |

All target routes and headings matched their links. Source and target document widths were 1440/1440 and 390/390 in the matrix, with no horizontal overflow. The three underlined links remain legible and separated in both themes; the longer Chapter 8 label wraps cleanly on phone. Screenshots were visually inspected, including all four source-link states, representative target landing states and the destination introductions after manually scrolling to their tops.

Artifacts: `/workspace/scratch/codec-links/reader/`. `evidence.json` contains route, heading, body text, overflow and Back measurements for all four combinations. `landing-evidence.json` records the delayed landing repro. `desktop-light-links.png`, `desktop-dark-links.png`, `phone-light-links.png` and `phone-dark-links.png` show the source placement. `desktop-copy-landing-confirmed.png` and `phone-quality-landing-confirmed.png` are examples of the finding below. `*-top.png` shows the content reached after manually scrolling up.

## Finding

**R1 — Medium: optional jumps land near the destination footer, hiding the explanation the learner requested.**

> Clicking “Chapter 4: Copy compressed streams” changes the route, but the first visible material is the end of its exercise, “Technical checks”, “Notes (optional)” and “Next page: Cut across picture dependencies”. The “Copy compressed streams” heading and introductory explanation are several screens above. The Chapter 8 and Chapter 9 links behave the same way.

This reproduced for all three links on desktop and phone in both themes. A separate repro waited 1500 ms after each click, with the same result. Desktop Chapter 4 landed at scroll Y 2909, with its `h1` at viewport Y −2700.55; desktop Chapter 8 at scroll Y 3503, `h1` Y −3294.55. Phone Chapter 4 landed at scroll Y 4020, `h1` Y −3724.36; phone Chapter 8 at scroll Y 4928, `h1` Y −4611.25; phone Chapter 9 at scroll Y 4213, `h1` Y −3896.25. The captured view is therefore not a brief transition or merely a cropped heading.

The learner following an optional explanation sees unexplained completion instructions first and must infer that they should scroll to the beginning. Suggested direction: have these deliberate cross-chapter jumps expose the destination's title and opening explanation, while retaining useful browser Back restoration to the source links. This finding describes the newly introduced journeys; it does not require a broader navigation rewrite.

## Other assessment

No further findings in scope. “More on codecs (optional)” clearly makes these later chapters an elective branch. The numbered labels state that they lead ahead in the course. Three concise links after the page's practice/check area and before Notes add little clutter and leave the main next-page action recognisable.

The destinations are relevant: Chapter 4 explains decoding/encoding and copying encoded streams; Chapter 8 defines lossy compression, the libx264 encoder and its CRF control; Chapter 9 revisits container versus codec and explicitly explains the added picture-format concepts. After manually scrolling to their openings, I found no new unexplained prerequisite that prevents reading these optional codec explanations. Each has its own “Load practice files” setup and does not require completion of intermediate chapters. This is a reading/prerequisite assessment, not a claim that every later exercise was executed.
