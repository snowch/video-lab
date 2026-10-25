# Notebook cleanup — separate prose pass

Copyright © 2026 Christopher Snow.

Drafted by the separate `notebook_cleanup_prose` agent from the builder's verified fact brief and the existing notebook implementation plan. Read the binding editorial and separate-drafting workflow in `AGENTS.md`, the repository plan and the referenced authoring guidance. This record documents drafting, not an independent review of the built page.

The overview note now reads: “Run FFmpeg and ffprobe commands in your browser. Your files stay on this device.” The brief establishes that both tools process media locally without uploading learner files. The note describes execution and privacy; it makes no promise that browser storage is permanent. The existing Files storage notice still explains that browser storage can be cleared and advises downloading important work.

“Earlier work” labels the Files entry to the preserved earlier course. The existing archive-page heading and context note remain unchanged on that explicit destination. Removed the overview archive card. Shell limitations remain explained where native scripts or unsupported commands make them relevant.

The reader found one remaining archive promotion in `courseCopy.intro`: “Earlier lessons remain available as an archive with their existing work.” Removed only that sentence from `src/notebook/copy.ts`; the remaining introduction is unchanged. Access to earlier work remains through Files and existing bookmarks.

Reviewed both changed labels for plain wording and factual scope. Formatted the strings file, the narrowly edited copy file and this record with Prettier. No tests were added for these wording changes; built-page review and the full required checks belong to the main cleanup workflow.
