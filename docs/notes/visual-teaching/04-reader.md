# Visual teaching — independent learner reader

Copyright © 2026 Christopher Snow.

Reviewed the built candidate at `http://127.0.0.1:4173/video-lab/` on 26 October
2026, from a separate reader session. Product files were not changed. This is a
reader report for sceptic review, not a claim that the complete quality gate ran.

## Coverage and evidence

Read the rendered teaching text on all 24 notebook course routes in course order.
Captured every figure at desktop 1440 × 1000, tablet 820 × 900 and phone 390 × 844,
in light and dark themes, at normal and 200% root text size: 288 page states.
Inspected full-resolution figures and theme/contact sheets, with particular
attention to enlarged narrow layouts. This enlarges text; it is not a claim of
browser zoom testing. The sweep detected no document or figure overflow. That
result did **not** establish legibility; R2 below is visible despite fitting.

Artifacts are in `/workspace/scratch/visual-teaching/reader/`: `sweep.mjs`,
`observations.json`, `pages.txt`, per-page desktop screenshots, individual figure
screenshots and contact sheets. Screenshots describe the initial reviewed build;
subsequent fixes need separate verification.

Ran `node /workspace/scratch/visual-teaching/reader/controls.mjs` against the built
site at desktop/light/100% and phone/dark/200%. Both passed source load, source
selection and playback; command-builder edit/apply and editor switching; actual
bare ffprobe output; replay hide/show; Files preview and keyboard focus containment,
Escape and focus restoration; overview/history/draft preservation; real FFmpeg
cut and result playback; and absence of document overflow after results loaded.
`controls-result.json` records these checks. The additional `extra.mjs` pass
verified keyboard adjustment of the amplitude slider, unchanged raw log text
after enabling output wrapping, visible Files dialog and the source/evidence link
destination at both sizes. See `extra-result.json`. No full suite, build or commit
was run.

## Ranked findings

### R1 — High: annotated video line teaches the wrong field as dimensions

Route: `#/learn/inside-video/inspect`, “Read the supplied ffprobe example”.

The rendered line is:

> Stream #0:0 … Video: h264 … 0x1 … 24 fps

The explanation immediately underneath says:

> 854x480 gives width and height in pixels; 24 fps gives pictures per second.

The learner cannot find the promised `854x480` in the selected excerpt. `0x1`
is a different value and visually occupies the very position the reader is told
to use for dimensions. This contradicts the central purpose of annotating the
real tool output and can teach a hexadecimal identifier as a picture grid.

Direction: extract and show the actual native dimensions field, then pin the
selected excerpt to the verified fixture so the annotation and its literal line
cannot diverge. Check the **built** line, not only the explanatory prose.

Evidence: `desktop-light-1-inside-video-inspect-fig1.png` and
`phone-dark-1-inside-video-inspect-fig1.png`.

### R2 — Medium: fitted diagram text breaks ordinary words into fragments

Routes: `#/learn/cut-join/copy`, `#/learn/cut-join/keyframes`,
`#/learn/export/faststart`.

At normal desktop and tablet sizes, the six-column decode/encode path breaks
labels such as “Compressed source streams”, “Decode”, “Pictures and sound
samples” and “Optional filters” into fragments. “Decode” visibly becomes
“Decod” / “e”; other labels need six or seven very short lines. The actual figure
is only about 568 CSS pixels wide even on a 1440-pixel viewport. This interrupts
reading at the point where the diagram should make a new mechanism easier.

The phone path is substantially clearer because it stacks. However, at 200%
text on the phone, the dependency diagram's two-picture caption splits “Decode”,
“discard” and “pictures” into fragments; the faststart layout similarly splits
“beginning” and “Compressed”. The rest of those figures' prose is readable.

Direction: make layout decisions from available figure width and text needs.
Stack or reorganise the six-stage path before its labels require mid-word
breaks. Let dependency captions and file-beginning/end labels retain enough width
at enlarged text. Do not solve this by reducing label font size.

Evidence: `desktop-light-1-cut-join-copy-fig0.png`,
`tablet-light-1-cut-join-copy-fig0.png`,
`phone-light-2-cut-join-keyframes-fig0.png`,
`phone-dark-2-export-faststart-fig0.png`. Normal phone versions provide useful
comparisons. There is no horizontal overflow in these cases.

### R3 — Medium: the quality comparison requires names introduced later

Route: `#/learn/quality/quality`.

The first figure starts:

> Native libx264 encodes of the same source …

and labels the images:

> CRF 18
>
> CRF 35

At that reading position, neither `libx264` nor CRF has been introduced. The
learner has only read a general description of a “quality target”. The expansion
“constant rate factor (CRF)” and the direction of the scale—lower values generally
preserve more detail—appear later, in the first command's flag explanations.
The figure is visually useful, but the learner has to read ahead to understand
what its numbered control represents. The copy-path figure also introduces
“packets” without explaining the term; this technical noun is not needed to
understand the bypass relationship at that point.

Direction: give the quality comparison its minimum prerequisite before its
labels are used, or position it after the existing command definitions. Use the
already established “encoded data” wording unless packet boundaries themselves
are being taught. Retain exact command and log vocabulary where it belongs.

Evidence: `page-quality-quality.png`, `pages.txt` sections `quality/quality` and
`cut-join/copy`.

### R4 — Low: several mechanism sentences still repeat the figure captions

Routes: `#/learn/sound/level`, `#/learn/sound/fade`, `#/learn/cut-join/copy`,
`#/learn/export/faststart`.

For example, immediately before the amplitude model:

> A level adjustment multiplies each value without changing its timing …
>
> Halving sample values does not make sound seem exactly half as loud.

The figure caption then repeats:

> … heights change while sample positions stay fixed. Half the amplitude does
> not mean half the perceived loudness.

The figure and adjacent first paragraphs similarly repeat fade start/duration
and unchanged clip length, copying's bypass of decode/encode, and the MP4 layout's
network limitation. Some contextual repetition is useful, especially alongside a
command; the near-duplicate concept/figure statements add reading before action
without teaching a second relationship. This falls short of the approved
“replace overlapping prose” aim, although it does not make the lesson false.

Direction: keep prerequisite definitions and command-specific consequences, then
let a figure and its caption own the mechanism it actually shows. Sceptic should
retain only the overlaps that do not serve a distinct learner purpose.

Evidence: rendered `pages.txt` sections for those routes; corresponding page
screenshots show their placement.

## What works and sequencing assessment

The stream/container diagram makes containment and codec identity concrete.
The inspection page introduces frame dimensions before using them. Audio sample
rate receives its own explanation beside frame rate in the next chapter. The
picture-rate model visibly holds the interval fixed while changing picture
count; the following tick conversion explains why one picture interval contains
512 ticks. The dependency figure correctly warns that a copied cut's visible
opening depends on timestamps and player behaviour, rather than promising one
universal result.

Scale, crop and pad use the same source time and recognisable scene. Equal display
scale in the scale/crop comparisons explains the relationship between stored
dimensions and apparent object size. Padding clearly preserves the full view and
makes the added black pixels visible. The supplied quality crops reveal actual
loss of facial detail, and the sizes are clearly complete-file measurements.
The source/evidence links remain ordinary links rather than invented notebook
commands. Their destinations and measurements need the sceptic's factual review.

The amplitude slider and fade-envelope figure distinguish sample multiplication
from perceived loudness and the sound waveform. Subtitle timing shows the final
two seconds with no cue and explicitly stays tied to the supplied cue file even
if the learner edits it. Faststart labels schematic order, disclaims proportional
byte sizes, and says the supplied source is already prepared. All these
boundaries are visible next to the affected figure. The diagrams do not claim to
be edited-command results.

The other ten pages retain a coherent course sequence and genuine editable
commands. Raw output remains visibly raw with its own wrapping control. Files,
source replay, builders and normal editing remain app controls. The separate
native-shell exercise states that the notebook does not execute loops or expand
wildcards. No new graphical dashboard replaces the actual command evidence.

No blocker was found in colour contrast or normal-size phone figure text during
this reader pass. This is a visual inspection, not an automated contrast audit or
a screen-reader certification. Whole-app offline/update verification and the
full quality gate remain with the integration/checker workflow.
