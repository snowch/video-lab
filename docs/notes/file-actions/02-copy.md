# File actions copy draft

Copyright © 2026 Christopher Snow.

Separate prose pass on 28 October 2026, based on the builder's verified fact brief and inspection of `src/notebook/FileManager.tsx` and `src/notebook/ui.strings.ts`.

The row disclosure uses native `details` and `summary`. Text files with `.txt`, `.md`, `.srt`, `.csv`, `.sh` or `.json` extensions open an editor below the file list; other files open the preview. The existing row controls prevent opening another file during processing, an unsaved edit or an active file-management form. The new direct action must use the same restrictions.

| Control | Visible label | Accessible name |
| --- | --- | --- |
| Compact row disclosure | More actions | More actions: {path} |
| Direct action for editable text files | Edit | Edit {path} |
| Download | Download | Download {path} |
| Rename or move | Rename or move | Rename or move {path} |
| Copy | Copy file | Copy file {path} |
| Delete | Delete | Delete {path} |

Keep **More actions** as the short, explicit disclosure label; compact spacing and placement can tidy the row without changing its wording. Keep **Edit** visible beside the text file so the editing action can be found without opening the disclosure. Its filename in the accessible name distinguishes it from other rows. **Edit text** remains the textarea label once the editor is open. An **Edit** action must appear only for the extensions the editor actually supports, including uppercase equivalents.

The existing secondary-action wording describes the actual operations and needs no revision. Native disclosure state communicates expansion; no additional “Open menu” or “Close menu” wording is needed. This draft adds no guidance paragraph, new file types or new editing capability.

No code changes, tests or built-page review were performed in this prose pass. The builder owns integration and a separate checker must verify the resulting controls.
