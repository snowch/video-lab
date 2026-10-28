# Output resizing — implementation and review resolution

Copyright © 2026 Christopher Snow.

The shared control changes only the existing output element's viewport height. It uses layout CSS pixels and compensates pointer distance for document scaling. The original compact CSS default remains until resize. The computed CSS minimum and 1200-pixel maximum bound chosen heights; accessible bounds also include an untouched short default. Pointer capture and local touch-action suppression keep dragging independent from normal page/output scrolling.

All three actual-output integrations use the same control. Notebook and workbench targets have unique React-generated IDs; the legacy workspace uses its existing cli-output ID. Static teaching examples are unchanged. The optional workbench retains its output components while they are empty during reruns, hiding empty output and its controls. Its existing quiet-success test now verifies hidden output instead of absence from the DOM; user-visible behaviour is unchanged. This also preserves separate log/report sizes through JSON reruns.

The separate copy pass supplied the label, help and height string. The built fresh-reader pass found no supported defects, including desktop/tablet/phone light/dark and doubled document rendering. The independent sceptic additionally tested keyboard bounds, pointer release/cancellation/capture loss, non-primary input, pen input, zoom scaling, raw-log and draft invariance. No product fix was required by those observations. The final checker independently verified text selection, ordinary wheel/touch scrolling, keyboard focus, hidden empty output and actual doubled text. Its documented optional-page navigation overflow under 200% document CSS zoom predates this change: the same overflow occurs before any output exists. Normal phone layouts and doubled output text fit. No unrelated navigation change was made; see 06-checker.md for the measured limits.

Focused output-resizing tests passed 17 cases with three configured skips. Expanded output-resizing/workbench regression passed 37 cases with three configured skips, including real WASM inspection, encoding, downloads, cancellation/retry and offline processing. Full-gate results are recorded separately when complete.

Issue 1 was closed at the owner's request with completion/superseding-scope evidence and successful main CI/deployment links. Issue 7 remains open pending delivery to main; the implementation and the preceding stream-option change remain unmerged under the owner's instruction.
