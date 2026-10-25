<!-- Copyright © 2026 Christopher Snow -->

# Course index: fresh learner review

25 October 2026. Separate reader agent; no product edits, rebuild or preview restart. Read `AGENTS.md` and `01-facts.md`, then inspected the existing built preview at `http://127.0.0.1:4173/video-lab/` using Chromium. This is a bounded navigation review, not independent verification of lesson content or the complete quality check.

## Outcome

No blocking finding in the requested single-index change. Ten plain chapter headings expose all 24 page links. “Export and verification” contains the distinct “Prepare an MP4 for download playback” link: I could select this later page directly without visiting the chapter's first page or opening a navigation menu. “Course overview” makes the full index available again. No “Chapters” button, sidebar or empty sidebar gutter remains. Desktop content is centred with equal outer margins; tablet and phone use the available content width.

The original chapter and page labels provide enough information to choose a page. The chapter summaries provide the subject context; the linked page titles identify the particular task. The index adds no new media-concept prerequisite. Existing terms such as “structured data” and “native shell” remain in their existing titles; this pass did not review the explanations on those lessons.

## Findings and severity

- **No blocking or medium-severity index finding.** The index is legible in light and dark at 390 × 844, 768 × 1024 and 1440 × 1000. Each size/theme was also measured and captured with root text size set to 200%. All twelve cases had document width equal to viewport width, ten chapter items, 24 page links and no linked chapter heading. Link targets measured at least 44 CSS px high at normal text size. At 200% phone text the index is necessarily long and titles wrap heavily, but no text or link was cut off or overlapped.
- **Low, pre-existing keyboard destination limitation; outside this presentation change.** After clicking “Prepare an MP4 for download playback”, focus was `BODY`, including a repeat measurement after a 200 ms settling interval. The destination main content therefore does not receive the intended focus handoff. Suggested direction: address notebook destination focus in a separate routing/accessibility fix and test keyboard arrival. The sceptic independently identified the existing route-section behaviour; this review does not attribute the issue to removing chapter controls.

## Actual interactions

- Clicked “Prepare an MP4 for download playback” on the index and reached `#/learn/export/faststart`. Edited its first worked command to `ffmpeg -i bunny-action.mp4 -c copy reader-draft.mp4`; returned through toolbar “Course overview”, clicked the same index link, and read the identical draft back from the editor. Used browser Back/Forward between that page and the index.
- Followed “Next page: Inspect an export as structured data” to `#/learn/export/verify`, then “Previous page” back to faststart.
- Used Tab from the faststart index link to “Inspect an export as structured data”. The focused link had a visible 3 px outline; Enter opened `#/learn/export/verify`. No hidden chapter controls were encountered.
- Opened Files from home, inspected its flat file list and controls, and closed it with Escape. Focus returned to “Files · 0”. In another fresh browser context, imported `reader-index.txt`, selected it, navigated home → later page → next → previous → home, and reopened Files. The same imported file and size remained available; closing with the “Close” button restored focus to “Files · 1”. The file-body equality was not separately asserted in this reader pass.
- Clicked the relocated “Recording your own source” link from home and reached `#/appendix/recording`; browser Back returned to the index. The guide remained a separate optional destination, without a new prerequisite on the main sequence.

## Evidence and limits

Generated evidence is deliberately outside the repository in `/workspace/scratch/course-index/reader/`: twelve `reader-{phone,tablet,desktop}-{light,dark}-{100,200}.png` full-page captures, `reader-keyboard-focus.png`, `reader-recording-guide.png`, `reader-results.json`, `followup-results.json` and the review scripts. Source headers and generated text fixture carry Copyright © 2026 Christopher Snow; screenshots retain the site's existing copyright and Big Buck Bunny credit.

The screenshots support visual inspection; JSON records dimensions, links, routes, focus and draft equality. The 200% setting is root font sizing, not browser zoom or an operating-system accessibility setting. Browser automation exercised actual UI anchors, dialogs and file import; it did not execute FFmpeg, test offline/restart behaviour, run a screen reader, or establish cross-browser equivalence. No findings or artefacts were taken from unrelated learner-audit notes. Final independent checker and full quality checks belong to their separate records.
