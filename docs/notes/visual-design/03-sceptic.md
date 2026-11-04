# Independent sceptic review: visual design

Copyright © 2026 Christopher Snow.

A separate agent reviewed the plan, reader findings, source diff and built site
on 4 November 2026. The reviewer did not implement the styling or the fixes.
This pass concerns visual hierarchy, legibility and shared-style consequences.

## Reader findings

R1 is justified. The initial phone chapter screenshot visibly stacks the two mode
buttons and wraps Copy command beside a shorter Run command. The reader's measured
widths explain the result: the two mode controls already consume almost the full
inner panel width before the gap. Reducing their horizontal padding and type to
0.9rem is a proportionate fix; the existing 44-pixel minimum height remains.
Wrapping at enlarged text sizes should remain allowed. The final checker should
verify the rebuilt 390-pixel layout.

R2 is justified. The source applies the generic focus-visible outline to the
programmatically focused main region. Suppressing that outline only on `main`
avoids the misleading page-wide divider without removing the general interactive
focus rule. The tab-focus probe on the built site still found a 3-pixel solid ring
on Skip to content in chapter, glossary and earlier source-selection routes.
The final checker should verify interactive rings after the rebuilt change.

No reader finding was rejected. No additional blocking issue was found within
this scoped review.

## Colour and shared typography

Computed token contrast ratios, rounded to two decimal places:

| Pair | Ratio |
| --- | ---: |
| Light body / page | 14.24 |
| Light secondary text / page | 5.40 |
| Light action / page (also primary label / action) | 5.75 |
| Dark body / page | 15.08 |
| Dark secondary text / page | 9.09 |
| Dark link / page | 9.21 |
| Dark primary label / action | 8.47 |
| Command text / light-mode monitor | 14.28 |

These principal text pairs exceed 4.5:1. This is not a full accessibility audit of
every diagram or state; the existing primary-action hover/run checks remain useful.
The dark overview screenshot preserves the same visual hierarchy as the light
page. The supplied footage, numbered chapter sequence and bounded command panels
have clear purposes; no extra decorative element is needed.

Independent browser probes at 820 pixels inspected the first chapter, glossary
and earlier `#/capture` route in both themes. All loaded Manrope, retained their
headings and had no horizontal document overflow. This provides a sample of the
shared palette's effects outside the new notebook overview. Existing prose-width
rules and monospace code styling remain in the source. No learner-facing wording
was added by this diff.

## Font provenance and offline behaviour

The bundled font's SHA-256 matches its README:
`a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972`.
The README records the source URL, retrieval date and OFL location. The copied
OFL includes the Manrope authors' copyright notice. The built offline manifest
contains both the 24,836-byte WOFF2 asset and `legal/MANROPE-OFL.txt` with integrity
hashes. Built-page resource observations show a local `/video-lab/assets/` font
request, and `document.fonts.check('16px Manrope')` returned true in each probe.
There is no runtime CDN font dependency. This verifies inclusion and local loading;
the full offline browser test remains the end-to-end check.

Evidence: initial chapter-phone and overview-desktop-dark screenshots in
`/workspace/scratch/visual-design/` were visually inspected. Independent browser
measurements are retained in `sceptic-probes.json` there. This pass does not certify
all course pages, processing results or the final fixes before they are rebuilt.

## Follow-up: interior balance after the owner's correction

The owner subsequently found the initial command workspace still squashed to the
left. Reviewed the revised build and `balanced-editor-1365.png` /
`balanced-editor-820.png`. The first cut now uses its working space coherently:
the timeline spans the editor, tool identity sits opposite the heading, and Run
is separated from Copy/Download. Bounded explanatory blocks are centred while
their text remains left aligned. These changes directly address the supplied
example without making ordinary paragraphs fill an unbounded desktop line.

### S1 — medium: uniform narrow option columns regress longer explanations

The new auto-fit grid's 12rem minimum works for the first cut's three short
explanations but is too narrow for some later pages. On `#/learn/framing/pad` at
820 pixels, the fourth option occupies a 221.59-pixel-wide column on an otherwise
empty second row. Its explanation is 455.78 pixels tall; two thirds of that row
are blank. At 1365 pixels, four columns each remain about 219.5 pixels wide, and
the same explanation still needs 455.78 pixels of height. The long filter token
wraps as well. The screenshot visually confirms a tall narrow left-hand text
column, recreating the imbalance the owner identified.

Suggested direction: use growing wrapping option items with a wider preferred
basis so the last row can fill unused width, or preserve wider definition rows
for longer explanations. Check more than the introductory three-option case.
`framing/scale` is another useful long-explanation sample. This finding concerns
reading measure and composition, not clipping: the 29 current chapter routes had
no horizontal page or option overflow in the independent 820-pixel probe.

Evidence: `/workspace/scratch/visual-design/sceptic-balanced-options.json` and
`sceptic-balanced-long-options.png`. A separate fresh-page probe waited for the
specific framing/pad worked cell before reproducing the dimensions at 820 and
1365 pixels. The final checker should verify the corrected option layout on these
longer pages as well as the introductory cut, including enlarged text.

## CI follow-up: Firefox completion-test readiness

PR 22 quality run `41927410880` failed the Firefox test “failed storage keeps the
choice during navigation and explains it was not saved” at its first checkbox
check (`tests/lesson-completion.spec.ts:114`). The local full suite had passed;
the failure should not be hidden with retries.

The CI trace shows a click at viewport coordinates (130, 458) during automatic
practice-source preparation. The failure screenshot shows the Try it yourself
card at that position, with the completion checkbox below the viewport. The first
lesson adds its source preview when the downloaded file becomes available; video
metadata can subsequently change the player's intrinsic height. The test navigated
directly to that lesson and immediately checked the checkbox without waiting for
practice readiness. This evidence supports a moving pointer target during source
initialisation, rather than a completion-store failure.

Source review found that `CompletionStore.set` catches the deliberately injected
storage error and synchronously publishes the checked and unsaved sets. There is
no asynchronous persistence-success dependency in that checkbox handler. In
contrast, `expectPracticeReady` only waits for files to be present and preparation
to finish; it does not wait for the source video's metadata. `FilePreview` renders
a video with `preload="metadata"` and no reserved width/height or aspect ratio.

The focused correction is to wait for the existing practice-ready signal and for
the source video's `readyState` to be at least 1 before checking the box. This
waits for the relevant initial layout inputs rather than adding a fixed delay,
waiting for playback or downloading processing tools. It retains the original
checked-state, unsaved-warning and navigation assertions. This is a test-setup
readiness fix with no product or completion-storage change.

Evidence was independently inspected from
`/workspace/attachments/9240b2ea-7172-4d8e-aa41-24756a1f60ef/pr22-browser-evidence.zip`,
including the failed screenshot, error context and trace. Repeat-test results
belong to the builder/checker record; this diagnostic pass does not claim them.
