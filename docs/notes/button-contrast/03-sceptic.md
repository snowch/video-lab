# Button contrast: independent sceptic review

Copyright © 2026 Christopher Snow.

25 October 2026. Reviewed the final `src/style.css` diff and `tests/button-contrast.spec.ts`, then inspected the rebuilt page independently through Chromium at `http://127.0.0.1:4173/video-lab/#/learn/first-edit/shorten`.

## Implementation assessment

No justified blocker in the CSS or regression test. The enabled primary-hover selector restores the accent background and retains visible hover feedback through `brightness(0.94)`. It matches both buttons and primary navigation anchors. The generic hover rule now excludes disabled native buttons.

The test measures both foreground and background after the brightness filter, runs a real five-second command, and checks restored enabled-state contrast after mouse click or touch tap. It also covers primary links. Its `focus()` step measures text contrast; it does not itself assert the focus outline. Independent built inspection below covers that omission without requiring another product change.

## Independent built inspection

- Light enabled Run and primary-link hover: background `#12695e`, foreground `#f5f7f3`, filter `brightness(0.94)`. Filter-adjusted text contrast: approximately 5.81:1.
- Dark enabled Run and primary-link hover: background `#82ddc3`, foreground `#10251f`, filter `brightness(0.94)`. Filter-adjusted text contrast: approximately 9.02:1.
- Keyboard focus retains the solid 3px accent outline and 4px offset in both themes, with no hover filter when the pointer is moved away.
- With Run explicitly disabled in the browser DOM, hovering in both themes retains the primary palette, `opacity: 0.5` and `filter: none`. This is a selector/state inspection, not a claim to have executed a command in this pass.
- The change uses the existing shared palette; no completion class, command logic, runtime or learner prose changed.

## Reader findings

Reviewed `02-reader.md` and its recorded `results.json` under `/workspace/scratch/button-contrast/reader/`. Accept its no-blocker disposition: the recorded real command reaches “Command completed” in tablet/phone light/dark contexts, and the immediate post-tap completion snapshot still matches `:hover` while enabled with the corrected palette. Reader ratios, focus outline and disabled-state observations agree with the independent built selector inspection above. Secondary hover retains a readable palette. No reader finding requires a ranked fix.

The reader correctly limits its conclusions to Chromium emulation and the tested notebook route. Physical devices, WebKit and a complete course audit are not claimed. The final quality gate and separate checker remain the builder's next verification steps.
