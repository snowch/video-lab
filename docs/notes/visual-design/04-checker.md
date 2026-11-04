# Independent final checker: visual design

Copyright © 2026 Christopher Snow.

A separate checker agent inspected the final built site on 4 November 2026 at
`http://127.0.0.1:4173/video-lab/`. The reviewer did not edit the implementation.
This check includes the final response to the owner's “squashed to the left”
feedback: full-width cut plans, distributed command-option explanations and
secondary actions, and centred bounded reading blocks with left-aligned text.

## Visual assessment

The final desktop overview has a clear title/action/footage hierarchy in both
light and dark themes. The footage supplies the main image, and the chapter index
is readable without a competing set of decorated cards. The local font, restrained
blue controls, navy editors and quieter page background form a consistent design.
Phone content remains legible and the heading wraps without clipping.

The final first command panel was visually inspected at 820 and 1365 pixels.
The timeline now spans the editor width; three option explanations use the panel's
width; Copy and Download sit at the right, distinct from Run. The tool label sits
at the opposite edge from the title. Explanatory paragraphs use a centred bounded
block. This directly addresses the former empty right side while preserving
left-aligned text and a readable line length. The dark panel retains the same
hierarchy. No further blocking balance or readability issue was found.

At 390 pixels, Edit command and Command builder share a row. Both are 45.77 pixels
high; their widths are 128.19 and 154.19 pixels. Run and Copy have matching
45.77-pixel heights and 157.20-pixel widths. At 320 pixels the controls wrap into
ordinary separate rows without clipping. R1 is resolved.

R2 is resolved: direct reference navigation no longer produces the bright outline
across the main landmark. Interactive focus remains visible, as checked below.
The glossary and command reference retain their narrower reading layout.

## Executed checks

All scripts below are retained in `/workspace/scratch/visual-design/checker/`.

- `node /workspace/scratch/visual-design/checker/review.cjs` passed. It checked
  overview, first chapter, command reference and glossary at 320, 390, 820 and
  1365 CSS pixels, in light and dark, at normal and 200% root font sizes: 64
  route/viewport/theme/font-scale combinations without horizontal page overflow.
  It also checked the 390-pixel mode/action geometry, builder/editor round trips,
  and editor-to-button keyboard focus in all eight size/theme combinations.
- `node /workspace/scratch/visual-design/checker/interactions.cjs` passed against
  the final build. At 390 pixels in dark mode, it played the source, ran the real
  command `ffmpeg -i bunny-short.mp4 -t 3 checker-cut.mp4`, observed “Command
  completed” and raw FFmpeg output, played the generated video, activated Next
  with Enter and used browser Back to restore the chapter.
- `node /workspace/scratch/visual-design/checker/focus.cjs` passed. With keyboard
  modality active, every visible enabled link, button, input, select, textarea and
  summary on those four routes was focused in both themes: 400 element checks,
  each retaining a 3-pixel solid focus outline. This samples the routes' rendered
  controls; it does not claim to inspect every hidden dialog or native media
  control state.

The font loaded from the local
`/video-lab/assets/manrope-latin-variable-DHIcAJRg.woff2` URL. Browser font checks
passed throughout. The final built offline manifest contains the 24,836-byte font
and `legal/MANROPE-OFL.txt`, each with an integrity hash. This verifies local loading
and offline-bundle inclusion, not a new independent full offline lifecycle test.

## Evidence and limits

Final measurements are `measurements.json`, `focus.json` and `font-requests.json`
in the checker directory. Screenshots include desktop overview light/dark,
chapter/editor at every checked viewport/theme, reference pages, and
`run-replay-phone-dark.png`. Visually inspected final examples include:

- `home-1365-light.png`, `home-1365-dark.png`, `home-390-light.png`;
- `chapter-1365-light-editor.png`, `chapter-1365-dark-editor.png`,
  `chapter-820-light-editor.png`, `chapter-390-dark-editor.png`,
  `chapter-320-light-editor.png`;
- `commands-820-dark.png`, `glossary-1365-light.png`.

The parent agent owns the final `npm run check` result, including the broader
29-page and cross-browser checks. This review used Chromium and sampled actual
controls; it does not certify every lesson, physical device or browser engine.
No implementation change was made by this checker.

## Final addendum: longer command-option explanations

After the sceptic raised S1, the builder replaced the 12rem auto-fit grid with
wrapping, growing flex items using a 16rem preferred basis. This checker inspected
the rebuilt `framing/pad`, `framing/scale` and `first-edit/shorten` pages at 390,
820 and 1365 pixels in both themes, at normal and 200% font sizes. The focused
script `node /workspace/scratch/visual-design/checker/options.cjs` passed all 36
combinations without horizontal page overflow and confirmed the flex layout on
tablet/desktop. Route-specific worked-cell waits prevent measuring a previous
page during navigation.

The padding option's description previously occupied a roughly 220-pixel column
and needed 455.78 pixels of height. In the final desktop build its last-row item
expands across the 974-pixel workspace; the description is 131.95 pixels high.
At 820 pixels the four options form two rows of two 348.41-pixel items, with the
long description 263.91 pixels high. The font size is unchanged: this is wider
usable space, not smaller text. The isolated narrow final column is resolved.
Tablet rows can still have unequal text heights because explanations differ in
length, but the long text is readable and no longer squeezed into the old width.

The scale page and introductory cut also remain usable. At tablet width their
last single item grows across the available row. At desktop the three items fit
one row; the scale filter's longer explanation naturally takes more lines than
its neighbouring input/output definitions. Phone options retain their readable
vertical order. Enlarged text wraps into fewer columns as needed.

Visually inspected evidence includes
`options-framing-pad-1365-light.png`, `options-framing-pad-1365-dark.png`,
`options-framing-pad-820-light.png`, `options-framing-pad-390-dark.png`,
`options-framing-scale-820-dark.png`, `options-framing-scale-1365-light.png`,
`options-first-edit-shorten-820-light.png` and
`options-first-edit-shorten-390-light.png`. Measurements are `options.json`;
`viewportWidth` identifies the viewport, while `width` is the options container.
All files are in `/workspace/scratch/visual-design/checker/`. S1 is resolved within
this focused layout check. Earlier interaction/focus results stand; the builder's
final full suite covers the unchanged behaviour and remaining page layouts.

## Final addendum: completed index entry with enlarged text

The full suite subsequently found a state not covered by this review's initial
64 reflow combinations: after marking the last page complete, the overview at
320 pixels and 200% font size left only 62.42 pixels for the link title. The
completion tick and chapter number consumed the remaining width. This was a
readability failure even though the document did not overflow; the initial
no-overflow checks alone did not establish usable text width in every saved state.

After the builder allowed chapter-index items to wrap and gave the content block
a 14rem preferred basis, this checker reproduced the actual marking/navigation
flow for `workflows/batch` on the rebuilt site in both themes. At 320 pixels and
200% font size the chapter number now wraps above the content. The completed
link's title is 164.81 pixels wide; the tick remains within its link and beside
the title, and the document has no horizontal overflow. Screenshots confirm
whole words and a readable completed entry. At normal size, 390- and 1365-pixel
screenshots retain the existing side-by-side chapter number/content composition.

`node /workspace/scratch/visual-design/checker/completed-index.cjs` passed.
Evidence: `completed-index.json`, `completed-index-320-200-{light,dark}.png` and
`index-normal-{390,1365}-{light,dark}.png` in the checker directory. The enlarged
light/dark entries and representative normal-width screenshots were visually
inspected. The full-suite finding is resolved in this focused independent check;
the parent agent owns the final rerun results for the wider course-index suite.

## CI follow-up: completion-test readiness

The checker independently inspected the test-only diff after the Firefox CI
failure. `openFirstLesson` replaces the three initial first-lesson navigations
with the same navigation followed by the existing practice-ready assertion and
a poll for the source video's `readyState >= 1` (metadata available). The wait
allows the automatic preview to acquire its intrinsic size before a footer click.
No product code, completion assertion, storage-failure simulation or navigation
assertion was removed or weakened. This is a state-based wait rather than a fixed
sleep. The sceptic's separate CI trace review establishes the reported layout
race; this checker did not repeat that trace review.

Independent command:

```sh
npx playwright test lesson-completion.spec.ts --config /workspace/scratch/visual-design/checker/playwright-completion.config.ts
```

Result: **12 passed in 18.4 seconds**, covering all three completion tests in
`desktop-light`, `desktop-dark`, `phone-light` and `phone-dark`. The temporary
configuration inherits the repository's browser/device settings, retries and
web server, omits only the unrelated release-fixture global setup, excludes
Firefox (tested separately by the parent), and writes to an isolated output
directory. Omitting that setup avoids concurrently deleting the shared alternate
release fixtures while the parent's Firefox run is active; these completion tests
do not use those fixtures. The production build at port 4173 was unchanged.

The exact configuration and run log are retained as
`playwright-completion.config.ts` and `completion-run.log` under
`/workspace/scratch/visual-design/checker/`. No test or product edit was made by
this checker. The parent owns the Firefox repetition and remote CI results.
