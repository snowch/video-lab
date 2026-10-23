# Separate progressive prose draft

Copyright © 2026 Christopher Snow.

Drafted by the separate issue5_drafter agent from AGENTS.md, the issue-5 plan and verified fact brief, without editing the implementation. Learner strings and complete production task data are in src/cli/progressive.strings.ts. The builder should edit for fit and submit all rendered prose to the independent reader/sceptic/checker workflow.

The route order is source → inspect → edit → Build → Publish. Source setup is one interaction. Inspection revisits the same bare probe to introduce duration, then streams, then picture coding/dimensions; the timing/JSON investigation is explicitly optional. It directs attention to a relevant line without hiding other native output.

Edit introduces input/output and duration, adds start, then changes duration with a new output filename. Encoding and colour storage follow these first experiments; stream selection, kept ranges and timestamp resets precede the first filter graph. These explanatory steps do not require additional intermediate files, avoiding unnecessary encodes and workspace growth. The full join retains its verified command and explains every explicit option before execution. Build uses separate stills, verifies rate changes, defines audio inputs before mapping, and distinguishes picture copy, sound encoding and muxing. Publish uses the learner's selected actual file rather than a fixed example filename.

The exact six-second default trim is supported by the fact brief. The duration-only first cut and four-second variant need the builder's new media checks before measured claims are considered independently verified. Three-picture rate, source provenance, explicit Build/mux and joined range claims reuse the verified facts. Codec defaults are scoped to this practice source and pinned browser build. No claims that MP4 selects a universal codec, that an audio stream proves audible narration, or that navigation proves achievement.

Reference prerequisite bridges identify controlled fixtures and distinguish them from the project source. Existing detailed reference prose/grading was not rewritten by this draft and still needs reader review in the new layout.

Required integration checks: filter unsupported capture controls; select actual filename in examples; source-ready preview and continuation; relevant builder fields; manual-draft protection; result replay/download; short labels without explanatory paragraphs; no double numbering; raw output directly after command; optional browser diagnostics; keyboard/touch focus; no document horizontal overflow. UI strings are supplied for these interactions, but their existence does not establish that the built experience meets the requirements.

## Optional workbench copy refinement

The separate prose pass also updates src/workbench/strings.json. Ordinary inspection now directs attention only to Duration. Initial trim keeps six seconds from the beginning and defines input, output and -t. The optional “Choose where to begin” disclosure introduces -ss after the first replay, with an explicit two-second start/six-second duration comparison. A duration change uses another output name to keep both versions. No initial copy requires streams, mapping, codecs, pixel formats or JSON. Existing advanced keys remain for compatibility; they must not be rendered as introductory requirements. Optional trim starts at zero, omits -ss, and uses demo.mp4; implementation, measured checks and rendering remain the builder's responsibility.

NativeBuilder label review: the revised source/input, output, duration, start and rate labels are concrete and show the real option. The generic fallback labels are acceptable only for later already-explained options. Useful later labels would be “Video encoder · -c:v”, “Sound encoder · -c:a”, “Colour storage · -pix_fmt”, “Stream selection · -map” and “Filter graph · -filter_complex”. Do not expose those fields before the step teaches their purpose. Hide or disable an Apply action when no candidate changes are present if doing so clarifies the interaction; preserve manual editing.

Suggested shorter source feedback for cli.sampleSaved: “Practice video loaded. Replay it, then inspect its duration.” The filename and silent-source provenance already appear beside the preview; the old feedback need not repeat them or direct the learner to Files. This prose pass does not edit src/cli/strings.ts.
