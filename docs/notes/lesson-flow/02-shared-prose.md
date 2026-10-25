# Shared learner prose review

Copyright © 2026 Christopher Snow.

Independent source-level prose and factual-clarity pass, 25 October 2026. Read `AGENTS.md`, `01-plan.md`, the shared string changes, `ExampleDiagram.tsx`, the source/Notes rendering in `Notebook.tsx`, the command-guide placement in `Cell.tsx`, and the shorten, start, join and export page copy. No source edits or browser review performed in this pass.

The supplied fact brief establishes that source durations come from verified asset records; the timeline is calculated from the fixed example's `-ss`/`-t`; the join depicts each clip's video/audio pair in sequence; and the colour illustration is an explanatory model. Nothing reviewed presents an invented processing result.

## Recommended small changes

1. **Make the fixed timeline explicit beside its changing editor (medium).** `timelineModel` currently says “Example timeline · the section this example keeps”. That is truthful, but after editing the adjacent command the visible numeric interval still belongs to the original example. The edited-command notice appears after the diagram and discusses option explanations rather than the figure. Suggested caption: **“Example timeline · the original command's selection”**. Add a short persistent caption sentence, **“This model follows the original example command; editing the command does not change it.”** This is especially useful on the start-position page, where an edited `-ss` would otherwise appear to contradict the diagram. “Source interval” can become **“Section kept from the source”** for the first encounter. The existing durations and Keep/Leave out labels are clear.

2. **Describe colour sample counts without implying precise chroma siting (medium).** `colourModelNote` ends “This diagram shows sampling positions, not measured colours from the video.” The rendered Y grid and separate U/V blocks establish counts; they do not specify where a chroma sample is sited relative to the four Y samples. Suggested full note: **“Y stores brightness-related information at each of these four locations. U and V each store one colour-difference sample for the 2 × 2 group. This model shows the number of samples, not measured colours or exact sample positions.”** Keep the existing title, blue-/red-difference labels and detailed `yuv420p` explanation. The distinction is useful precision, not an extra prerequisite.

3. **Make stream pairing readable in the join figure (low).** `[0:v] + [0:a]` and `[1:v] + [1:a]` may initially read as arithmetic or audio mixing. The neighbouring lesson explains the pair order correctly. Prefer presenting **`[0:v] [0:a]`** with **“Picture and sound from input 0”**, and the corresponding input 1 label. Keep “First clip, then second clip”, the separate joined-video/audio outputs and the visible `-map` command. The existing caption already identifies an example; if adding one consistent fixed-model note for all diagrams is convenient, include this figure too.

## Shared labels that already work

“Run command” identifies the action more directly than “Run cell”. “Try it yourself” introduces the single independent task without requiring another reflection workflow. “Notes (optional)” and “Your notes” make the retained review field usable without implying a completion requirement; “Your earlier prediction” correctly identifies preserved earlier content. The existing prediction and review values remain bound to their original storage fields. No extra explanatory paragraph is needed for that implementation detail.

`exampleOptions` accurately distinguishes the fixed teaching text from an edited command. A shorter alternative is **“These notes explain the original example command. Your edited command may differ.”** This is optional; the current version is clear. Keep the notice adjacent to option explanations.

“Load the files for this page. Existing files are kept.” is concise and accurate. “Practice source” and the visible filename give the source setup a useful anchor beside its controls. The source replay action and previews follow it before the concept.

## First edit: reading order and additions

The `first-edit-shorten` source note is useful: it identifies Big Buck Bunny and gives source playback a concrete purpose before teaching the cut. Suggested light edit: **“This eight-second clip comes from Big Buck Bunny, an animated short film. Play it once so you can recognise which part your cut keeps.”** The learner first observes the source, then learns duration and cutting, reads the complete command with its option meanings, and finally compares the real output. This avoids making an unexplained result the first encounter with the source.

The concept's definition of duration, explanation that the source is retained, `-t` placement explanation, and observation about both picture and sound are necessary substance. Retain them. The diagram between editor and option explanations provides a concise bridge; the fixed-example caveat above is the only factual-clarity addition recommended there. The worked-result explanation describes the expected original example and the independent task states a distinct three-second target. Its check limitation appropriately separates measured duration/stream presence from playback confirmation of the chosen opening.

## Verification boundary

This pass checks prose against the supplied verified facts and current source. It does not verify executable commands, media facts independently, rendered reading distance, colour contrast, phone wrapping, accessibility-tree order or stored-note restoration. Those remain matters for the planned executable and built-site reviews.
