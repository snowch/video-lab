# File actions: fixes and scope

Copyright © 2026 Christopher Snow.

- Added Edit beside Download for exactly the text formats already supported by
  the editor. It opens the existing editor and focuses it after the file is read.
  Filename activation remains available. No new file format or storage path was
  introduced. A request counter prevents an older file read replacing a newer
  selection, including after the dialog closes.
- Replaced the expanding row of secondary buttons with a compact disclosure list.
  Each row keeps its height. Escape restores summary focus; clicking outside a
  row disclosure or opening another closes it. Native disclosure semantics remain.
- Accepted the independently confirmed 14px alignment finding: row details now
  override general page padding, leaving the summary's touch target intact.
- Accepted bottom and left boundary findings: constrain popup width to the
  available dialog inset and choose above the trigger when there is insufficient
  room below. The independent checker must verify final built geometry.
- Retained the existing rename/move, copy, delete confirmation, dirty-edit,
  processing and restart protections. No subtitle template or extra explanation
  of Relative path was added; those are outside this request.

The first focused command, `npx playwright test tests/files-cleanup.spec.ts`,
finished with 37 passed, 8 intentionally skipped and 5 failures. All five were the
same new test trying to click a covered next-row trigger through an open popup.
The sceptic rejected that as a product defect. The corrected test uses keyboard
switching, retains row-height and one-open-popup assertions, and now checks menu
bounds. Direct Edit tests cover keyboard focus, empty files, saved contents after
reload and the unsaved-edit restriction. Existing operation and history tests are
retained. This record does not turn the initial failed run into a pass.
