# Primary button contrast: independent learner reader

Copyright © 2026 Christopher Snow.

25 October 2026. Fresh reader pass against the built preview at `http://127.0.0.1:4173/video-lab/#/learn/first-edit/shorten`, after reading `AGENTS.md` and `01-facts.md`. This reader made no product changes. This is a built-page review, separate from the builder and mandatory final checker.

## Method and observed result

Used fresh Chromium contexts at tablet 820 × 1180 and phone 393 × 851, each with touch emulation and both light and dark preferences. Loaded the practice files through the page and typed and executed the reported command in the worked cell in all four contexts:

```sh
ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4
```

Repeated the four-context run with an additional snapshot immediately after completion, before moving the pointer or applying a new hover: all four still matched `:hover`, retained the correct palette and were enabled.

Every execution reached the visible “Command completed” status, displayed actual FFmpeg output and exposed `first-cut.mp4` with its download control. Checked Run at rest, hover, immediately after tap while genuinely disabled during execution, after completion with the pointer over it, and with keyboard focus reached using Tab from the editor. Also hovered the primary “Next page: Choose where the cut begins →” link and the secondary “Edit command” button. Inspected screenshots of completed, active, focus, secondary and continuation states.

No blocking finding. “Run command” stays visibly legible after completion and hover rather than turning into pale text on a pale background. Completion is separately identified by “Command completed”; active work has “Working”, native disabled Run semantics and a visible “Cancel processing” control. The retained muted disabled appearance does not look like an enabled success state. The enabled primary link retains the same readable palette; secondary hover remains readable. The keyboard outline is clearly visible in both themes.

Measured enabled foreground/background contrast from computed colours, applying the `brightness(0.94)` filter to both foreground and background channels:

| State | Light | Dark |
| --- | ---: | ---: |
| Run at rest / keyboard focus | 6.07:1 | 10.01:1 |
| Run hovered before / after completion | 5.81:1 | 9.02:1 |
| Primary next-page link hovered | 5.81:1 | 9.02:1 |
| Secondary Edit command hovered | 5.63:1 | 6.62:1 |

The keyboard focus outline is 3 px solid accent, offset 4 px. Active Run reports `disabled: true`, opacity 0.5, the original accent background/foreground and no brightness filter, including when `:hover` matches. Disabled controls are exempt from the enabled text contrast criterion; the table does not present their uncomposited colour ratio as their rendered contrast. Document width exactly matched 820 / 393 px respectively, with no page-level horizontal overflow.

## Findings and limits

- No justified new learner-facing correction is required within this CSS-only slice. There are no new labels or teaching prerequisites to review. The learner still needs only the practice-loading and editable-command controls already present on this page.
- This pass covers Chromium device emulation, not physical iOS/Android hardware, WebKit or Firefox. Touch tapping and pointer hover were both exercised; physical-device sticky-hover behaviour remains a limitation.
- This pass checks the reported notebook route and shared primary continuation link. It is not a complete course audit or an optional-workbench review, and does not replace the separate final checker.

Reproducible script and evidence outside the repository: `/workspace/scratch/button-contrast/reader/check.mjs`, `results.json`, `run.log`, and `{tablet,phone}-{light,dark}-*.png` in that directory. Playwright is imported by absolute path from the repository installation. Run with `node /workspace/scratch/button-contrast/reader/check.mjs`; no preview process was started or stopped.
