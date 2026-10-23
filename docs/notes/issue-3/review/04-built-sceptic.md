# Issue 3 — separate built-page sceptic

Copyright © 2026 Christopher Snow.

23 October 2026. Reviewed the running production preview at `http://127.0.0.1:4173/video-lab/`, then cross-checked the completed [reader report](03-built-reader.md). This follows the earlier design review; it does not claim an entirely uninformed reviewer. Read home → Capture → Build → Inspect → Edit → Publish, using only the stated browser/files/basic-code prerequisites to judge the teaching. Inspected implementation bindings only after observing relevant page behaviour. The builder was changing files concurrently: historical findings and subsequently observed changes are kept distinct below. No app fixes or full CI rerun were performed by this reviewer.

## Finding dispositions

### B1 — Uphold, medium: provided Build result contradicts the default timing lesson

Independently reproduced on a fresh 390 × 844 touch-emulated browser context. At the default one picture per second, the filmstrip gives **0–1, 1–2, 2–3 seconds**. “View the provided build example” returned `provided-with-audio.mp4`, **1.495 s**, **640 × 360**, **57,171 B**. The adjacent label establishes that it was generated in advance, but does not explain different timing/settings. Thus the fallback learner cannot reconcile the demonstrated output with the three-picture rule.

Counterevidence limits this to the provided example: my real live 1 fps run produced a **3.000 s**, **960 × 540**, **32,198 B** video, then a **3.000 s**, **59,698 B** audio/video MP4. A real 2 fps retry produced **1.500 s**, **27,543 B**. The runtime lesson is supported. This is neither fabricated browser execution nor a reason to remove the rate experiment.

The builder proposes regenerating the native fallback with the same three-picture 1 fps input. That is appropriate, but also identify its fixed rate when the live selector is set to 2. A default-matching fixture alone must not imply that a prerecorded result follows every current control setting. New bytes, measured evidence and the visible explanation require checker verification.

### B2 — Uphold original medium handoff issue; downloaded mapping now independently verified, visible explanation still pending in my observed build

The original reader download names source `build-queue.mp4` while its command reads `capture.mp4`. Preserved source hash/ranges establish provenance, but do not tell a beginner how to run a command against the differently named download. The promised reproducible recipe makes this more than an arbitrary preference about internal names. It does not mean the browser edited the wrong source.

I generated a fresh six-second edit and downloaded its actual JSON ([retained evidence](evidence/sceptic-mapped-edit-recipe.json)). It now contains:

```json
{
  "source": "build-queue.mp4",
  "workingInputName": "capture.mp4",
  "sourceSha256": "502e9579c705521b805ec576d77b8f11038da3b245182ea31996e7305d991349",
  "ranges": [{ "start": 0, "end": 2 }, { "start": 3, "end": 7 }]
}
```

The saved command reads `capture.mp4`, matching that mapping. This verifies the data fix and makes reconstruction possible for the stated file-familiar learner. However, the explanatory `recipeNote` was not visible beside the link in the observed Edit page. After observing that absence, source search found the string declared but not rendered. I notified the builder; do not count an unused string as delivered teaching. Render the explanation near the recipe, and have the checker confirm the latest page/download. Preserve the original finding rather than rewriting it as never having occurred.

### B3 — Uphold, low: codec appears before its definition

Build defines encoding, a video stream and the MP4 container. Its first actual result then says “Picture codec — h264” and “Sound codec — No audio stream found”. The definition appears later in Inspect: “A codec specifies how that stream's data is represented and reconstructed for playback.” I observed this order directly.

No task asks the learner to select an encoder or distinguish codecs before that definition, and audio presence is understandable without interpreting `h264`. It is a small first-use explanation gap, not a missing prerequisite module. A brief definition beside the shared result table is sufficient; detailed H.264/AAC internals remain unnecessary.

### B4 — Uphold, low: raw probe family identifier lacks interpretation

Actual generated and provided results show “Container format — mov,mp4,m4a,3gp,3g2,mj2”. Build has just promised an MP4 and defined a container, so the unexplained list can be read as multiple formats in this one file. File extension and task context permit progress but do not teach what this probe field means.

Keep the raw evidence and explain that this is the inspection tool's shared format-family identifier. Do not relabel every arbitrary imported file as MP4 merely because that family includes MP4. No required graded answer was blocked by this ambiguity in my run.

## Direct checks and rejected broader objections

- **Artefact continuity:** adopted the explicitly labelled original `build-queue.mp4`; Build says “not a conversion of your recording”; after building video/audio, Inspect still selected that original and reported **10.000 s**, **128,737 B**, **960 × 540**, H.264/AAC. Reject O1 as an outstanding source-confusion defect in this built path.
- **Real edit:** after the page requested source inspection, ran the default `[0,2)` and `[3,7)` edit. The actual result was **6.000 s**, **151,961 B**, **960 × 540**, H.264/AAC, labelled “Created in this browser”. The actual JSON download is the B2 evidence above. Publish's stored probe also survived a page reload in this run.
- **Intention-led inspection:** Capture states readable result and optional shared audio; Inspect explicitly allows absent audio and a recording needing no invented diagnosis. Reject O3 as unresolved. Probe alone is not presented as certifying readability or narration.
- **Timing lesson:** source times 0/4/6 are distinguished from output intervals; stills are accurately labelled initial state/sorted result/later hold and explicitly do not show motion or the click. The 1/2 fps runtime results match the taught durations. Only B1 remains for the provided example.
- **Cancel/retry:** on the mobile viewport, cancelled a real Build operation during tool loading. The page said “Processing was cancelled. Your source is still available; you can retry.” Retried at 2 fps, obtained the actual **1.500 s** video, and returned to Inspect with `build-queue.mp4` retained. This is a targeted observed cancel/retry, not a stress-test claim.
- **Provided versus produced:** in a fresh context loaded the provided edited reference, measured **6.000 s**. It explicitly says it was generated in advance and “does not count as an export produced by your choices”. Navigating to Publish then says “No edited output is available”. This honestly supports comparison without inventing a completed personal export. Reject a claim that unsupported processing must be hidden or that prerecorded evidence itself is fake execution.
- **Offline and size boundary:** before first processing, the visible page discloses about **32.4 MB**. The expanded offline-tools panel separately reports **32.37 MB / 32,367,068 B**, says tools are not yet saved, and requires saving the baseline lesson copy first. That is a clear separation of reading and processing readiness. I did not perform the full offline-cache matrix; no offline encoding certification follows from reading these notices.
- **Static versus interactive:** labelled static filmstrip/schematics explain relationships, real runs change actual output, and retained references identify their fixture/model scope. No need to demand animation or an additional theory chapter. The new lossiness paragraph explicitly distinguishes lossy from lossless compression, resolving the earlier learner-audit gap for this path.

## Scope and decision

Focused desktop and mobile/touch-emulated checks showed readable controls and no horizontal page overflow in observed 390 px states. Successful OS-level screen capture, physical-device interaction, microphone/system-audio behaviour, exhaustive bookmark/progress migration, cache upgrades and other-player playback were not certified here. No application test suite was rerun; the builder's full gate and separate checker own those remaining checks.

The required actual-processing path is learnable and worked in this review. Keep B1 and the original B2 as justified fixes, with B2's mapping improvement recorded; make the small B3/B4 explanations. Final closure requires the checker to inspect the corrected built page and resulting files, rather than treating announced fixes as evidence.

## Later observed fix check — bundle `index-CIM0Exez.js`

After writing the dispositions above, the preview updated. I independently generated another actual six-second edit, opened Publish, reloaded, waited for its heading and measured table, and confirmed that both the stored output and **6.000 s** probe remained. Publish now visibly renders the recipe explanation: “The working input name tells you how to name the source when running the saved command.” Together with the already downloaded mapping field, this addresses B2 in the observed build.

In a new mobile context, the provided Build result now reports **3.000 s**, **62,664 B**, **640 × 360**. Its visible note says it was generated at one picture per second, lasts three seconds, is reduced to 640 × 360 and has “fixed settings independent of the selector”. Switching the rate removes the displayed reference result; the fixed-settings note remains. This addresses the observed B1 contradiction without implying that a selector change regenerated the reference.

Build now defines codec before its first result and identifies H.264/AAC in context, addressing B3. The shared table now says “Detected container family — MP4 / QuickTime format family” and explains that the family names describe the inspector's format reader, addressing B4 without falsely classifying all imported family members as MP4. These are actual page observations, not acceptance of the builder's announcement. The separate checker and full gate still need to establish final delivery; the original findings above remain the historical record.

## C1 — Sparse-source edit timing: upheld, corrected command direction supported

The checker found a timing failure when editing a source produced by the course itself: the actual retained `chromium-muxed.mp4` probes as **3.000 s**, three pictures at **1 fps**, with three seconds of audio. This is a supported source, so losing or extending a held picture at an arbitrary requested boundary is a meaningful edit correctness issue, not an advanced unsupported case.

I imported the current `editCommand` directly from `src/journey/commands.ts` using Node's type stripping and ran its returned arguments through native **FFmpeg 7.1.5**, against that actual browser-produced source. For `[0,1.25)`, video and audio both measured **1.250 s**, with **15 video frames**. For `[0.25,1.5)` followed by `[2,2.5)`, both measured **1.750 s**, with **21 frames**. Both silent variants likewise measured 1.250/1.750 s. This independently supports applying `fps=12` before `trim`, rather than relying on output `-r 12` after sparse-picture trimming.

Evidence limit: by the time of my inspection, `tablet-imported-edited.mp4` had already been replaced by the checker's corrected **1.250 s / 15-frame** output; I therefore cannot independently claim to have probed the original reported two-second browser receipt. Reconstructing the old pipeline by removing only `fps=12,` from the current command produced a different, still incorrect native result: **1.000 s video versus 1.250 s audio** for the single range, and **1.250 s video versus 1.750 s audio** for the joined ranges. Different native/WASM versions need not reproduce the same duplication outcome. This corroborates the defect class without pretending that native output proves the exact earlier browser number. The checker owns direct rerun of the revised browser output.

The revised `rangeNote` and `pipelineNote` are factually appropriate: they distinguish requested duration from measured picture boundaries on a 12 fps output timeline, explain repeating held pictures without inventing motion detail, and require checking actual timing/playback. Reject any claim of universally exact arbitrary-time cuts; the successful 1.25/1.75-second cases fall on the chosen output frame grid. No app or prose fixes were authored by this reviewer.
