# Files dialog verified fact brief

Copyright © 2026 Christopher Snow.

Verified by source inspection on 26 October 2026 before the separate prose pass.

- `src/notebook/FileManager.tsx` uses the existing notebook workspace APIs for importing files/folders, creating folders/text, copying, renaming/moving, deletion, text editing and ZIP downloads. Deletion has a confirmation form. Unsaved text and active forms prevent an unconfirmed close and block App status restart.
- `src/notebook/model.ts` enforces 64 files, 32 × 1024 × 1024 bytes combined and 20 × 1024 × 1024 bytes per file. Individual paths may contain folders; at most eight path parts and 180 characters are accepted. Existing API errors must remain visible.
- `src/cli/files.ts` defines the persisted origin values: provided, captured, imported, generated, recipe, report and note. A provided file can be a video or another practice asset, so the video label must additionally inspect its media type. Legacy recipes are JSON execution records (`src/cli/Workspace.tsx`); they must not be labelled command outputs or recordings.
- Preview uses the actual stored Blob, with browser video/audio/image controls or a text editor. Download uses the stored Blob. ZIP includes all files and preserves paths through the existing `zipFiles` helper.
- Browser storage can be cleared or unavailable. The existing storage note is accurate; no successful save guarantee should be introduced. Size labels can be computed from actual Blob bytes using decimal KB and MB. Storage enforcement remains in binary MiB.
- The simplified dialog will expose Import files first, Download per file, filename preview actions, friendly origin labels and secondary More file options / More actions disclosures. Practice asset selection belongs to the relevant notebook page and is removed from this dialog.
- Search should appear only when the current folder has more than eight immediate entries, or while a search is nonempty. Breadcrumbs are useful only if folders exist or the user is inside a folder. Limit guidance appears when file count or total bytes reach 80% of the corresponding limit.
- Earlier work must only be linked when actual earlier saved work was discovered. FileManager will accept an optional `hasEarlierWork` boolean from the parent and will not create or open a legacy store merely to discover it.

No browser review or full build has been run by the FileManager implementation agent. The root agent owns integration and built-page verification.
