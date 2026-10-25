# Cleanup validation and release

Copyright © 2026 Christopher Snow.

Separate prose, fresh reader, sceptic and checker records are 02–06. The reader found the remaining archive sentence in the introduction; it was removed and independently verified on the rebuilt page. The checker tested Chromium desktop/phone in both themes and Firefox desktop: Files navigation, dirty/form safeguards, retained bookmarks, saved-note navigation/back/reload and reflow passed. Busy behaviour was inspected in source, not separately simulated by the narrowed reviews.

The full local `npm run check` passed on the cleanup: 19 unit-test files / 80 tests, 265 browser passes and 25 deliberate project skips (9.6 minutes). During deployment checks, the owner additionally requested that Big Buck Bunny be introduced for unfamiliar readers. The separate prose pass added “an animated short film”; the fresh reader and checker verified that rebuilt introduction on desktop/phone, with no overflow or archive promotion. Formatting, strict TypeScript and fixture/command verification passed after the wording adjustment.

The superseded cleanup Pages run was intentionally cancelled before publication so that the final wording could be checked and deployed together. The final source runs the complete quality entry point in GitHub CI and the Pages gate. Record its CI and public outcomes after actual completion.
