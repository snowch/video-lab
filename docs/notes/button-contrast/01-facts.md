# Primary button contrast: verified facts

Copyright © 2026 Christopher Snow.

Independent sceptic pass, 25 October 2026. Scope: the reported pale Run button after click/tap; no product edits in this pass.

## Cause and evidence

- `src/style.css` supplies the shared `button:hover, .button:hover` rule. It changes the background to `--accent-soft` without changing text colour. Its selectors have greater specificity than `.primary`, so placing `.primary` later does not preserve its accent background.
- Notebook Run is a native `button.primary` in `src/notebook/Cell.tsx`. It is disabled while processing, before tool readiness and for an empty command. Completion restores its enabled state; there is no special completed-button colour class. A pointer remaining over it can therefore expose the generic hover colours again. Touch browsers can retain hover after a tap.
- Chromium against the existing built preview at `http://127.0.0.1:4173/video-lab/` independently reproduced the cascade on the home page's `a.button.primary`. Light rest: background `#12695e`, text `#f5f7f3`; hover: background `#ddf3e9`, same text. Dark rest: background `#82ddc3`, text `#10251f`; hover: background `#25443e`, same text.
- WCAG relative-luminance ratios for those opaque colour pairs are respectively 6.07:1, 1.08:1, 10.01:1 and 1.51:1. Both hover pairs fail ordinary text contrast. This is a shared primary-control defect, not an execution-result state defect.
- The optional workbench has its own stylesheet and an explicit `button.primary:hover:not(:disabled)` rule. It should be verified separately if shared changes affect its imports; no edit to that separate rule is required by these facts.

## Minimal shared correction

Extend the shared primary rule to cover `.primary:hover`, retaining the existing accent background, foreground and border together. `.primary:hover` equals `.button:hover` specificity and appears later, while outranking `button:hover`. Keep the dark primary foreground override. This repairs both native primary buttons and primary navigation anchors without introducing a new palette or changing command behaviour.

## Checks and risks

- Verify Run before execution, while disabled and immediately after completion with the pointer still over it. Also check the same colours after phone taps; a fix restricted to hover-capable devices would leave sticky touch hover unresolved.
- Verify `a.button.primary`, including home and next-page links. A `button.primary:hover`-only fix would leave primary anchors broken.
- Disabled buttons already use `opacity: 0.5`, which blends the complete control with its surrounding surface. Disabled contrast is a separate existing presentation choice. Keeping the primary hover palette consistent prevents its background alone from changing while disabled; do not remove disabled semantics or opacity to solve this issue.
- Retain the existing `:focus-visible` outline and offset. Verify keyboard focus remains visible in both themes; hover background correction must not remove focus indication.
- Secondary button hover is intentional and should retain its existing text/background pairing. Avoid a global hover text override that changes secondary controls or misses the dark primary foreground.

Actual execution completion and physical-device sticky touch behaviour were not reproduced in this fact pass. The built anchor reproduction establishes the shared cascade independently; source inspection establishes that Run uses the affected selector.
