# Visual design: resolution and validation

Copyright © 2026 Christopher Snow.

Applied the public Frontend Design skill cited in the plan. The final design uses
locally bundled Manrope, a cool reading surface, blue controls, a media-led home
introduction, a quieter numbered chapter index and dark command editors within
bounded working panels. Existing learner-facing prose and processing behaviour
remain intact; no drafting pass was needed for new prose.

Reader R1 (phone control wrapping) is resolved with compact control type/padding
while retaining 44-pixel minimum targets. Reader R2 (the page-wide focus divider)
is resolved by suppressing the outline on the programmatically focused main region;
interactive focus rings remain.

The owner's follow-up identified left-weighted inner blocks. The timeline now
uses the full editor width, Run is separated from Copy/Download, the tool label
aligns to the opposite panel edge, and prose/diagrams use wider centred bounded
blocks with left-aligned text. Command-option definitions distribute across the
available width.

Sceptic S1 found that a fixed minimum-column grid cramped longer option definitions
on framing/pad and framing/scale. Replace it with wrapping flex items with a 16rem
preferred basis and room to grow across incomplete rows. Long definitions retain
a 76ch maximum reading measure. Small screens keep the ordinary vertical flow.

The reader, sceptic and checker are distinct from the implementing agent. Review
records describe their actual scope; they do not claim learning-outcome evidence.
The earlier broad quality runs were stopped for user feedback and the justified
long-definition refinement. Final validation is recorded below after completion.

The broad suite additionally caught a completed chapter-link title shrinking to
62.42 pixels at a 320-pixel viewport with doubled text. Let the numbered chapter
entry wrap and give its content a 14rem preferred basis, so the content moves below
the number when required. This preserves the normal layout and leaves space for
the completion tick. The completion and course-index cases then passed in all five
browser configurations (10 checks).

## Final validation

`npm run check` completed successfully on 4 November 2026 after all fixes:
formatting, copyright, synchronised-platform integrity, strict TypeScript, 138
unit tests across 33 files, native/media verification, production/offline build,
and 506 browser tests passed. The browser run took 20.3 minutes and reported 99
configured skips across the five projects; these are not additional passes.
Chromium desktop/phone light/dark and Firefox completed without failures.

`git diff --check` also passed. The independent review's narrower scope and
limitations remain documented in the reader, sceptic and checker records.

Committed screenshots show the [light overview](evidence/overview-light.jpg),
[dark overview](evidence/overview-dark.jpg) and
[balanced command workspace](evidence/workspace-light.png). They are native
browser captures, not edited mock-ups.

## CI follow-up before merge

GitHub's push run `41927396185` passed the full suite, but PR run `41927410880`
failed one Firefox completion test: its immediate footer checkbox click raced the
first lesson's automatically inserted source video. The failure screenshot and
trace locate the click in the practice card after the preview changed page height.
The independent sceptic confirmed that completion storage publishes synchronously.

The three completion tests now open the first lesson through a helper that waits
for practice-file readiness and video metadata (`readyState >= 1`) before acting
on the footer. All storage, pointer, keyboard, persistence and navigation assertions
remain. No product code or test retries changed.

Formatting and TypeScript checks passed. The full completion file passed ten
Firefox repetitions (30 tests, 1.1 minutes). The independent checker ran all four
Chromium configurations (12 tests, 18.4 seconds), also passing. A diagnostic run of
the original storage test was stopped after 18 passes, with two interrupted and
ten unrun; it did not reproduce the CI timing race. GitHub runs the complete quality
gate again for this test-only follow-up before merge.
