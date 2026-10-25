<!-- Copyright © 2026 Christopher Snow -->

# Course index: bounded technical fact brief

Independent source inspection by the technical sceptic, 25 October 2026.
Scope: the requested single main index with page links beneath chapter headings.
No product edits, rebuild, preview restart or browser validation performed in this pass.

## Verified facts

- `src/notebook/structure.ts` supplies the ten ordered chapter IDs, ordered page definitions and canonical `pageHref(page)` values (`#/learn/${page.id}`). The index can reuse these values and existing titles without introducing new routes or learner prose.
- `NotebookHome` currently displays chapter cards with chapter title links to each chapter's first page, summaries and page counts. `ChapterLinks` additionally provides first-page chapter links in the desktop sidebar and mobile Chapters dialog, expanding only the active chapter's page links. These are presentation choices; neither component owns routing or persistence.
- The recording appendix link is currently inside `ChapterLinks`, so removing that component without moving the link would remove its notebook entry point. Preserve its existing `#/appendix/recording` target and existing label on the main index.
- `NotebookPage` already provides sequential previous/next links across the complete ordered page list, with Course overview at the ends. The toolbar provides Course overview on every notebook view. Keeping these anchors is compatible with making the home index the only chapter index.
- `notebookRoute` accepts canonical page URLs and falls back to a chapter's first page for omitted/unknown slugs. Changing the visible chapter links does not require changing or deleting this compatibility behaviour.
- `src/main.tsx` listens for `hashchange`, updates the document title, scrolls ordinary routes to the top and focuses `main` after the initial render. Links from the new index should retain native hash-anchor behaviour so back/forward and this focus path continue working.
- `NotebookCourse` retains one `NotebookWorkspace` around `NotebookShell` while home/page props change. Home-to-page and page-to-home navigation therefore retains notebook state without a new provider. The existing appendix leaves the notebook branch and unmounts its provider; that pre-existing lifecycle cancels processing and restores durable/session drafts on return.
- Draft persistence uses page-based cell IDs, the `video-lab-notebook` IndexedDB stores and `video-lab:notebook:cell:` session keys. Index markup and sidebar removal need no storage migration. Do not change page IDs, workspace ownership or storage keys.
- Files has its own `filesButton` ref and `FileManager` close callback which restores focus. The Chapters dialog separately owns `menu`/`menuButton` refs and a close focus callback; those can be removed without changing Files focus handling.
- Restart protection is owned by `NotebookWorkspace` and `FileManager`, not `ChapterLinks`. Existing update tests exercise edited drafts, dirty Files forms, modal freezing and aborted restart recovery. Removing chapter navigation needs no changes to those guards.

## Bounded risks and useful verification

- Verify exactly one visible home index, all chapter headings plain text, and every page under the correct heading with exactly its canonical href. A first-page chapter anchor would retain the alternate chapter jump the user asked to remove.
- Remove sidebar and Chapters dialog/button selectors and their layout rules together. Leaving the two-column desktop grid would leave an empty navigation column; widening content can also affect command wrapping and toolbar overlap.
- Home now exposes more links. Check phone and desktop, light and dark, keyboard focus, 200% text sizing and horizontal overflow on the index. Existing notebook reflow coverage checks every lesson at 200% text size but does not currently check the enlarged home index.
- Verify an index link, Course overview return, browser back/forward, prev/next and a direct later-page URL. Verify an edited draft and imported/text file survive the home round trip; do not infer this solely from href correctness.
- Verify Files opens/closes and restores focus after removal of the sibling Chapters controls. Keep ordinary file/restart protection checks unchanged unless a real failure requires a fix.
- Check the moved recording link once from home and a return to the course. The existing recording-guide browser test starts from the earlier `#/capture` course and therefore does not prove the notebook-home entry point.
- `tests/notebook.spec.ts` currently asserts ten `.notebook-chapter-cards>li` items and absence of earlier-course links, then visits lessons by assigning hashes. Retain its substance, but add actual index-link interaction and explicit absence of the removed controls. `tests/notebook-update.spec.ts` covers update/persistence independently.
- This brief establishes source facts, not a claim that the final built page passes these checks. Fresh reader findings and final-diff scepticism belong in the subsequent review record.

## Scope limits

Preserve existing course copy, chapter/page titles, page IDs, legacy/deep routes, appendix route, files, command cells, prior achievements, App status and offline/update behaviour. No reason identified in this scope to edit routing, persistence, media or processing code. Unrelated untracked `docs/notes/learner-audit-2026-10-18/` was present before this pass and is outside this work.
