# Files dialog copy pass

Copyright © 2026 Christopher Snow.

Separate prose pass on 26 October 2026, based on [the verified fact brief](02-facts.md) and source inspection of `FileManager.tsx`, `Workspace.tsx`, `model.ts` and the persisted `WorkspaceFile` origins. This pass changes `src/notebook/ui.strings.ts` only; the builder owns markup and integration.

The header action remains **Files**. The dialog title is **Your files**, followed by **Practice videos, imported files and files you create in lessons.** The added imported-files phrase covers the actual import entry point. **Import files** remains the primary action. **More file options** contains secondary management choices; each row uses **More actions**, with its filename included in the accessible name.

Origins describe the stored provenance without showing internal enum names:

| Stored origin | Learner label |
| --- | --- |
| provided video | Practice video |
| provided non-video | Practice file |
| generated | Command output |
| report | Inspection report |
| note | Text file |
| imported | Imported file |
| captured | Recording |
| recipe | Command record |

The practice-video distinction requires the stored media type or filename to identify video. A copied or moved file retains its original origin; these labels describe provenance rather than the last file operation. Legacy recipes contain execution records, so **Command record** is accurate. **Recording** describes existing captured files and does not imply that recording is currently offered.

Distinct empty states are required:

- `noFiles`: **No files yet. Load a practice video in a lesson, or import your own files.** Use only when the root contains no entries and no search is active.
- `noSearchMatches`: **No files or folders match your search.** Use for an active search with no matching entries.
- `empty`: **This folder is empty.** Use for an actual empty folder, without an active search.

`root` changes from **Workspace** to **Your files**, and `folderLabel` is **Folder**. Breadcrumbs should appear only for actual folder navigation; these words do not create a project or collection model. The unchanged **Find files** label remains suitable for search within the displayed folder.

The default flow needs no storage paragraph or quota count. Near the verified threshold, `nearFileLimit` says **Your files are close to a limit. Download and delete files you no longer need.** Pair it with `fileLimits`: **Up to 64 files, 32 MiB in total and 20 MiB per file.** The existing `storageNote` stays in secondary options: **Files are saved in this browser when storage is available. Download important work; browser storage can be cleared.** It makes no save guarantee. The existing `limits` string is left unchanged, preserving its separate command-input and processing-duration facts if reused outside the default dialog.

Existing management labels, form labels, download labels, delete confirmation and consequence text, unsaved-change/discard/cancel controls, and filename-based accessible names were reviewed. They remain accurate for the existing APIs. **Relative path** belongs only to the advanced rename/move/create form, where folder paths are accepted. **Earlier work** remains appropriate only when actual earlier work exists; the builder owns that condition.

`noPreview` now says **No preview is available for this file. Download it to open it in another app.** This covers an unsupported format, an unavailable preview and a decoding failure without claiming a specific browser fault. `previewTruncated` is **[Preview shortened. Download the complete file.]**, replacing the hardcoded technical truncation message after the first 200,000 bytes. `filePreview` remains **File preview**, with the filename appended to its accessible name. Empty editable text files must still use the editor rather than a missing-file state.

No tests or build were run by the prose author. This is a separate copy pass, not independent verification of the built dialog. Integration, threshold conditions, folder/search distinctions and browser accessibility need builder/checker verification.
