# Single course index — implementation and review resolution

Copyright © 2026 Christopher Snow.

The requested navigation has one chapter index on the existing course overview. Each numbered chapter has its existing title and summary plus direct links to every page in that chapter. Titles are plain headings; the redundant page count and first-page-only chapter links are removed. The Chapters button, dialog, sidebar and their unused styles are removed. The old sidebar's recording guide link moves to the index, with its existing wording kept in the shared UI strings.

Lessons retain Course overview, Files, existing previous/next page links and their stable deep links. Route parsing, workspace provider, persistence and update guards are unchanged. Removing the sidebar also removes its grid column; the existing 65rem content measure is centred within a 68rem shell. Index links have at least 44px target height and wrap at enlarged text sizes.

No new learner-visible prose was drafted: all chapter/page titles, summaries and labels reuse existing course copy. Separate prose drafting is not applicable to this structural change. The verified source brief is in 01; independent built reader, sceptic and checker records are separate.

Focused validation passed all five projects in `tests/course-index.spec.ts`: every chapter/page mapping, absence of duplicate navigation, real page-link navigation, persistent command draft, browser back/forward, relocated recording guide and 200% text reflow. Full repository checks are running separately. Generated evidence belongs outside the repository in `/workspace/scratch/course-index/`; unrelated learner-audit notes remain untouched.

Independent reader, sceptic and checker found no introduced blocker or ranked fix. They verified real links, layout and file/draft preservation. They separately noted that notebook destination routes already do not consistently move focus to main because of existing section-route handling; the unchanged router is outside this structural navigation slice. Files-dialog focus restoration remains verified. The checker also compared the imported text file body, beyond the reader's filename/size checks.
