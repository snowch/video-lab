# Overview controls: final fact and copy addendum

Copyright © 2026 Christopher Snow.

This separate prose pass follows the owner's explicit clarification: remove Files and routine saved-status text from the overview. It supersedes the earlier proposal to put Files beside Start chapter 1. No product files are changed by this pass, and this document does not claim a built-page review.

## Facts checked against the source

- `NotebookHome` currently receives a `filesControl` prop and renders it beside Start chapter 1 in `notebook-home-actions`. Removing that prop, its insertion and the now-unnecessary wrapper leaves the existing primary course action.
- `NotebookShell` already restricts Course overview and Files navigation to lesson pages. Preserve those lesson controls and their existing FileManager behaviour, including keyboard focus restoration after closing.
- The shared workspace status renders Opening workspace and Saved in this browser on this device when visually clipped. Visually clipping a message does not remove it from accessible status output. Remove only the routine Saved in this browser on this device message from that rendering path. Preserve the transient Opening workspace announcement and its existing visually clipped presentation; no loading-behaviour change is requested.
- Working and Saving work describe transient operations. Keep feedback when the workspace is ready and busy or saving; keep the active-command link and Cancel processing on the overview as well as lessons while a command remains active.
- The failed-save warning is already rendered separately from operation feedback: “Some work could not be saved. Download your files and page records before closing or updating.” Keep it visible whenever `sessionOnly` is true, even while work is running or saving.
- The existing Files dialog contains the conditional storage explanation: “Files are saved in this browser when storage is available. Download important work; browser storage can be cleared.” Retain that explanation inside Files.

## Copy decision and recovery

No new learner-visible prose is required. Reuse Start chapter 1, Course overview, Files, Opening workspace, Working, Saving work, the active-command controls and the existing failed-save warning.

With Files removed from home, a learner who sees the failed-save warning can enter any chapter page and use Files to download files. Page records remain available through each lesson's existing optional notes area. Keep all chapter links, page-record exports, file downloads and workspace persistence intact; this layout change does not change the recovery mechanisms or authorise discarding work.

The ordinary overview should have neither a Files control nor routine saved-status text. The existing clipped live loading announcement remains during opening. An actual failed save still warrants prominent feedback there. Existing notices and active operations remain conditional on real workspace state.

## Final label clarification

The owner's further instruction removes the file count from the lesson button too. Use the existing `n.files` label, “Files”, without “· 0” or any other count. The overview continues to have no Files control. Keep file totals and storage sizes inside the existing FileManager dialog, where they describe the files being managed. This is a label change only; retain the dialog, its storage note, all file operations and focus restoration. Tests identifying the lesson control should use the exact existing label “Files”. No new copy is needed.
