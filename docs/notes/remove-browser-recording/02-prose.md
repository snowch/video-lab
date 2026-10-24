# Separate prose pass — remove browser screen recording

Copyright © 2026 Christopher Snow.

Drafted from the verified `01-facts.md` brief by a separate prose agent. This pass edits only learner-visible string files; component removal, storage compatibility, tests and final built-site review belong to the builder and independent reviewers.

## Main course and optional workbench

Source selection consistently offers the practice video or import. The home introduction/card, progressive source task and legacy lesson metadata no longer promise recording controls in this browser or describe capture as a fallback-dependent feature. The optional recording guide remains the route for making a new source outside the app and importing the saved file.

Removed capture/shared-sound/stop examples, browser support warnings, recording-state errors, the recording section in command help, and obsolete recording action labels. Cancel now refers to active processing. The unused `guided.capture` copy and unused `j.capture` recording fields were retired; `j.capture.title` remains for existing title lookup. The archived documents are left intact as historical evidence.

The optional three-step workbench has the same practice/import-only source copy. Its obsolete recording controls/status/help strings are removed. Both label sets retain **Earlier browser recording** for saved files whose existing origin is `captured`; this is historical file provenance, not a new recording action or a storage migration.

## Optional appendix

Removed the browser method, its instructions, shared-sound/time-limit promises and its browser-API source link. Four explicitly chosen methods remain: Windows native FFmpeg, macOS native FFmpeg, Linux native FFmpeg and phone/tablet device recording. A neutral **Choose your device** placeholder avoids selecting an operating system on the learner's behalf.

The introduction now says to use native FFmpeg or a device recorder, then import the result. Linux's Wayland and inconclusive-session directions point to a desktop recorder and import; they no longer recommend the removed browser screen chooser. Native FFmpeg device syntax, explanations, external installation links, macOS screen-index placeholder and mobile instructions are unchanged because the verified native/device facts remain valid.

The accurate inspection explanation that some browser-made WebM recordings omit a duration remains. Such files can still be imported or already saved; explaining their metadata is distinct from offering browser recording in this app.

## Files edited

- `src/capture/guide.strings.ts`
- `src/cli/progressive.strings.ts`
- `src/cli/strings.ts`
- `src/cli/guided.strings.ts`
- `src/cli/course.strings.ts`
- `src/journey/strings.ts`
- `src/content/home.strings.ts`
- `src/workbench/strings.json`

No component, engine, native command metadata, stored-file model or test was changed by this prose pass. The builder's mandatory reader/sceptic/checker workflow must inspect the resulting live layout, return paths and old-file behaviour before declaring the slice complete.
