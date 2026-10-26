# File edit retention across archive navigation

Copyright © 2026 Christopher Snow.

Reader and sceptic review reproduced a pre-existing loss: navigating from an archive page to the notebook, editing a text file in Files, then using browser Back unmounted FileManager. Returning with Forward recreated clean component state and lost the unsaved text.

FileManager now keeps a module-local pending snapshot of the selected file, text, dirty flag, active form, form path and current folder. It records committed changes in a layout effect and restores component state from that snapshot on remount, including while the dialog is initially closed. Ordinary previews do not create a pending snapshot. Saving text, completing or cancelling a form, or explicitly discarding changes clears the corresponding pending state. Cancelling the unsaved-changes close prompt retains the draft. File contents remain unchanged until the existing Save action succeeds.

The snapshot lives only in the current app instance; it introduces no persistence schema or automatic file writes. `hasPendingFileDraft()` exposes its presence to the root App-level restart and beforeunload guards so protection can continue while FileManager is unmounted in the archive. The component's existing restart guard also starts with restored dirty/form state on remount.

Scoped Prettier completed. No test CLI or build was run by the FileManager agent for this correction. The root agent owns the global guards and browser regression verification.
