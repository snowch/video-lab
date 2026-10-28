# Output resizing — issue 7

Copyright © 2026 Christopher Snow.

## Scope and verified starting state

The owner requested issue 7 implementation and closure of issue 1 on 28 October 2026. Code stays unmerged under the latest delivery instruction. This branch follows the separately completed stream-option mnemonic change.

Notebook output is a read-only pre in src/notebook/Cell.tsx, earlier/reference CLI output in src/cli/Workspace.tsx, and the optional workbench output in src/workbench/main.tsx. Their existing wrapping, scroll indicators and raw text must remain. Static command examples are not resizing targets. Default CSS caps currently constrain the output height.

## Interaction contract

One shared local UI primitive controls the associated pre's visible height. It preserves the existing compact default until used. Dragging down enlarges it; dragging up shortens it. Mouse, touch and pen use pointer capture. Pointer release, cancellation or capture loss ends the drag. Touch-action suppression is confined to the handle. Ordinary output scrolling and text selection remain available.

The focusable horizontal separator has an accessible name, output-element association, current height and bounds. Arrow Up/Down change height by 32 CSS pixels; Page Up/Down by 128; Home/End select bounds. Minimum is 128 CSS pixels or the target's computed CSS minimum, whichever is larger; maximum is 1200 CSS pixels or that minimum. Existing default dimensions may differ before the user chooses a height. The chosen height stays through wrapping, output updates and reruns while the pane remains mounted; no cross-session storage or restart guard is needed.

No new media concepts or command syntax are taught. Labels should make resizing discoverable without adding a settings panel. Raw logs, files, command drafts, cancellation and processing are unchanged.

## Verification and review

Add meaningful shared-interaction browser coverage plus real ffprobe output in all three integrations. Check pointer drag/release/cancel, keyboard bounds, wrapping, scrolling, unchanged text and retained height. Review desktop/phone/tablet, both themes and doubled text. Follow separate copy, built learner, sceptic and checker passes, then npm run check. Scratch logs and screenshots live outside the repository.
