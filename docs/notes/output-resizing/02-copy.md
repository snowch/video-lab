# Output resizing — separate copy pass

Copyright © 2026 Christopher Snow.

Drafted separately from the builder on 28 October 2026, using `01-facts.md` and the short labels and direct instructions in `src/notebook/ui.strings.ts`.

`src/components/output-resize.strings.ts` exports `outputResizeCopy` with three entries:

- `label`: “Resize output” names the handle's action and makes it discoverable.
- `help`: “Drag up or down to change height. Use Arrow Up/Down for small changes, Page Up/Down for larger changes, or Home/End for minimum/maximum height.” This covers pointer use and every supported keyboard action without a settings panel. Small and larger changes correspond to the verified 32 and 128 CSS pixel steps.
- `currentHeight(height)`: “N pixels high” provides the current value in ordinary language. The component supplies the measured height; this text does not claim a fixed default or persistent storage.

No command, output text or lesson concept changes are proposed. Association, bounds, value updates, focus and help announcement belong to the shared component implementation and its independent built-site review. No tests or commits were made in this copy pass.
