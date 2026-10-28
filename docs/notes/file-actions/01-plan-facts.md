# File actions and text editing

Copyright © 2026 Christopher Snow.

The owner requested a tidier More actions layout and a direct Edit option for
text files. This slice changes the notebook Files dialog only. Existing filenames,
files, command results, persistence and update guards remain owned by the notebook.

Checked facts: FileManager.tsx already opens an editor for txt, md, srt, csv, sh and
json names, including empty files. It writes through Workspace.writeText, which
retains the existing storage and stale-result rules. A dirty editor or unfinished
file operation blocks opening another file. Delete requires its existing form.
Native details expose the per-row operations; their open flex-basis currently
forces a new row. The unlabelled discovery step is clicking the filename to edit.

Keep the filename action, add a visible Edit button for those same text types,
and focus its editor. Keep common actions aligned while More actions opens a
compact list. Preserve keyboard, touch, Escape, cancellation and focus restoration;
check the last row, long names, 320px and doubled text. Do not add subtitle templates
or new editing formats in this slice.

Separate copy draft, independent built reader, sceptic, fix resolution and built
checker records accompany the implementation. Run the repository's complete
npm run check and report any failures separately from reruns. Main deployment is
already authorised by AGENTS.md; merge only after checks and review pass.
