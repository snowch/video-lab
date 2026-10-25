<!-- Copyright © 2026 Christopher Snow -->

# Course index: independent sceptic review

25 October 2026. Reviewed the final diff in `Notebook.tsx`, `style.css`,
`ui.strings.ts` and the new `tests/course-index.spec.ts`, then independently
inspected the built preview at `http://127.0.0.1:4173/video-lab/` with Chromium.
No product edits, rebuilds or preview lifecycle changes were made by this reviewer.

## Final-diff assessment

No introduced defect identified. The diff removes `ChapterLinks`, its sidebar,
dialog, button, refs and obsolete layout rules. Home renders all existing page
titles through existing canonical `pageHref` values under plain chapter headings.
The recording appendix uses the exact old sidebar label, moved into the UI string
catalogue. Other existing course copy is reused; the redundant page-count label
is removed. The remaining shell has no empty desktop sidebar column.

Routing, page IDs, provider ownership, file storage, progress, App status and
restart guards are untouched. Files retains its own trigger ref and close-focus
callback. Previous/next and overview links are unchanged. The new browser test
checks canonical link targets, absence of removed controls, actual index clicks,
draft retention, browser history, the appendix, enlarged text and touch targets.

## Independent built observations

A direct Node/Playwright Chromium inspection covered 1280 × 900 and 393 × 851,
each light and dark. Every configuration reported ten chapter items, 24 page
links, no chapter-heading anchors and no removed sidebar/menu/button elements.
At 200% text sizing no document overflow occurred; every page-link target was
at least 44 pixels high. No page errors were recorded.

An actual index click opened `cut-join/join`; Files opened and closed with focus
restored to its trigger; Course overview and browser back/forward returned to the
expected views. A separate direct-load check opened `cut-join/join`, followed
Next to `framing/scale`, then Previous back across the chapter boundary. Course
overview focused `main#content`.

## Reader assessment and bounded dissent

Read `02-reader.md` and its JSON evidence (`reader-results.json` and
`followup-results.json`), and inspected its phone-dark 200% screenshot. Accept
the reader's absence of blocking/medium index findings: its route/link/reflow
observations agree with the independent built checks above and the source diff.
The long enlarged phone index remains legible and has no clipped controls; its
length is expected from showing all existing pages and is not a justified defect.
Accept the reported draft, history, appendix and Files interactions as bounded
reader observations. The reader correctly limits imported-file retention to
name/size rather than asserting file-body equality, and correctly distinguishes
root text sizing from browser zoom. No prose fixes or product changes are
justified by this review.

One independently observed limitation is pre-existing: after a page destination
such as `#/learn/cut-join/join`, focus can be BODY instead of the main landmark.
Source inspection explains it: unchanged `routeFor` returns `section: parts[2]`
for notebook URLs, and the unchanged main effect consequently attempts a legacy
section anchor instead of focusing main. An explicit 30-second wait for main
focus after that index click timed out. This corrects the initial fact brief's
assumption that ordinary notebook page links take the main-focus path.

Accept the reader's low-priority pre-existing destination-focus finding. Keep it
as a separate navigation limitation. Reject it as an
introduced index regression: the same route resolution and effect were present
before this diff, and this change preserves normal hash anchors. No expansion
of routing scope is required to complete the requested index change. Files
focus restoration and overview focus were separately observed to work.

This bounded inspection is not a claim that the full repository quality gate
has passed; the builder/checker records own those commands and results.
