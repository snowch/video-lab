# Formats and image-video chapter — independent sceptic

Copyright © 2026 Christopher Snow.

28 October 2026. Separate technical reviewer; no product fixes, build, Playwright CLI/global setup, commits or merge. Read `AGENTS.md`, the plan, media/formats fact briefs and implementation. Independently inspected the actual built site on a separately started preview at port 4182 using standalone Node Playwright. This records the pre-fix evidence; the builder's fixes and independent checker belong in subsequent records.

## Adjudicated reader candidates

The reader sent the following two candidate findings to the parent while completing its report. Both were independently tested against saved actual built-page text and current source.

### Retain: medium — overlay position syntax is hidden with the answer

The practice asks: “The starter command uses the default overlay position; change the filter’s position settings.” Visible teaching defines the coordinate directions and says the unparameterised overlay uses “the default position x=0, y=0”. It never shows the `overlay=x:y` expression or colon separator before asking for the changed command. The only authored syntax instruction is hint 4: “Write the coordinates after overlay=, separated by a colon: 40:0.” The fifth hint supplies the full solution.

Actual pre-fix `#/learn/image-video/overlay` text confirms that the coordinate concept is visible, while this necessary command syntax is not. It cannot be inferred from x/y directions or from the starter's bare `overlay`. Under `AGENTS.md`'s requirement that learners not guess unshown facts, this is a justified teaching prerequisite issue. Teach the generic expression and coordinate order before practice; the learner can then apply the requested values. This does not require changing the verified command or giving the complete practice answer first.

### Retain: low — unrelated media credits compete with image-only provenance

The actual hold, sequence and animation pages all end with: “Big Buck Bunny © 2008 Blender Foundation … Example subtitle text is original, not dialogue transcription. Source, licence and preparation · DejaVu font licence”. `NotebookPage` renders `Credits` unconditionally. Yet those three pages use only the photograph or original drawings. The hold page separately supplies the correct Hannes Röst/CC BY-SA credit beside its source, so this is not a finding that required photographic attribution is absent. It is competing provenance and irrelevant subtitle/font information on the new image-only pages.

Show the Bunny source credit where the page actually includes a Bunny asset, retaining it on the overlay and existing Bunny lessons. Preserve the separate photograph credit and its licence/change information. The original-drawing source notes already identify those assets. Removing unrelated per-page credit is a narrow clarity fix, not removal of relevant provenance.

## Independent technical and factual checks

No additional runtime or format-fact finding was established in this pass.

- All **24 previous notebook page definitions**, including IDs, commands, assets and expectations, match `HEAD` exactly and still resolve through their old `#/learn/…` routes. The inserted chapter changes derived numbering, not storage IDs.
- The image2 adapter stages matching numbered files only for `-i` patterns; it does not perform shell expansion. Exact literals, subtitle/font references remain supported. Requested output positions are excluded from source evidence. The existing twelve-input/32-MiB/120-second engine limits remain.
- Every **11 supplied processing images** appears in the built offline manifest with correct byte count and SHA-256. The attribution file is included too. After a complete app save, all eleven were fetched and decoded in a new offline tab, with their expected dimensions. The formats appendix opened offline.
- Reading all four image pages and the formats appendix caused **no encoder request**. After the explicit full save, the actual sequence command ran offline through the notebook UI and produced six seconds/144 frames. Its saved provenance lists exactly `drawing-01.png`, `drawing-02.png`, `drawing-03.png`. Editing the input to `missing-%02d.png` produced a genuine failed run and tool diagnostic, rather than fabricated output or success.
- All four pages at phone-dark 393 px and the formats appendix had no horizontal page overflow in these checks. Broader visual/interaction coverage belongs to the reader/checker.
- The visible media claims agree with the verified brief: image input timing versus repeated output cadence; six authored drawings rather than generated in-between motion; overlay default last-frame repetition and source-audio re-encoding. Practice copy limits automatic success to the properties actually inspected and explicitly requires replay for picture order/placement and listening for sound.
- The appendix distinguishes codec/container/extension, ordinary MP3 from arbitrary-codec containers, AAC from M4A packaging, PCM WAV from all WAV, FLAC's lossless input preservation, Ogg from Vorbis/Opus, and WebM's codec restrictions. JPEG/PNG/WebP/SVG descriptions are qualified correctly. It expressly separates general format choices from notebook accepted paths/build support and browser preview capability; AV1 being named as a WebM possibility is not a claim that this pinned core has an AV1 encoder.

Reproducible standalone harness and pre-fix built text: `/workspace/scratch/formats-images/sceptic/inspect.mjs` and `results.json`. This reviewer did not rerun the entire native asset generator or every encode: existing native/pinned-WASM evidence and the parent's integrated command tests supply that broader execution evidence. The one independent offline notebook encode is identified above rather than presented as all-eight-command validation.

## Formal reader report

Read the completed `02-reader.md`. Its only findings are **F1, retained medium**, and **F2, retained low**, exactly the two independently tested candidates above. No finding is rejected or left unadjudicated. The source-note placement suggestion is explicitly an editorial option rather than a reader finding; this review establishes no reason to promote it to a required fix.

The reader's extensive actual command/builder/replay/download observations agree with the verified media and runtime scope. Its metadata-only overlay check correctly accepted the unchanged starter, consistent with the prominent placement limitation; that does not turn metadata success into visual-placement validation. The reader clearly distinguishes muted brief replay, full native decoding and stream presence from subjective listening or complete visual comparison. Its stated browser/offline/accessibility limits remain limits, not implied checks. The independent offline and old-route evidence above supplements the reader without reclassifying its work as this reviewer's.

The builder's directions in `04-fixes.md` address both retained findings. Verification of the rebuilt changes remains with the separate checker; this document preserves the original findings and their pre-fix evidence.
