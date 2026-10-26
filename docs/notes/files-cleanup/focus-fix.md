# Form completion focus fix

Copyright © 2026 Christopher Snow.

The focused browser suite found a Firefox failure after successfully renaming `notes.txt` to `renamed.txt` (`tests/files-cleanup.spec.ts:107`). The original row was removed, but the expected Import files fallback did not receive focus. Cancelling the same form returned focus to its existing More actions summary correctly.

`cancelForm` previously requested focus in an animation-frame callback, which could run before React had committed the closed form and enabled Import files. It now marks focus restoration as pending. An effect consumes that request after the form is absent, workspace activity has ended, the dirty/close confirmation guards permit it, and the dialog is open. A still-connected originating summary receives focus; a removed row falls back to Import files. Beginning another form or closing the modal clears the pending request.

Scoped Prettier completed. No test CLI or build was run by this agent for this correction; the root agent owns Firefox and regression verification.
