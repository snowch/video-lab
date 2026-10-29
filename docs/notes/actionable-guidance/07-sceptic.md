# Actionable guidance: independent sceptic review

Copyright © 2026 Christopher Snow.

Separate technical reviewer, 29 October 2026. Read the actual changed copy and rendering/navigation code first, forming an independent judgment before reading `04-facts-references.md` and the two source audits. Then inspected the built site at `http://127.0.0.1:4188/video-lab/` with standalone Node Playwright, without invoking or interfering with the builder's Playwright CLI. No production edits or commits.

## Independent conclusion

No material technical or instructional defect retained. The new first export has a concrete MP4/H.264/AAC starting point and an actionable download → open/import/upload → picture/sound/start/end procedure. Published requirements follow that first path. Alternative codecs have a reason to investigate rather than becoming a prerequisite choice. Success is explicitly bounded to the tested file and receiving setup.

## Learner review adjudication and ranked fixes

Read `06-reader.md` after completing the independent source/built checks above. It retains no material findings and asks for no fixes, so there is no unresolved finding to accept or reject. Independently checked all five reported closures against the real page: first default/procedure, optional alternatives and scope, locally complete export instruction, prepared personal-sequence extension, and current recording import path. These agree with the independent evidence below. Its claim of preserved command drafts is additionally supported by the builder's targeted test; this reviewer did not rerun that same assertion and does not present it as a new independent result.

Agree with its rejected expansions: no compatibility database, command set for every optional codec, publishing-service chooser, or image-editor tutorial is needed to close the reported gap. These do not block the taught first action. The short local export procedure and shared fuller guide are useful at their respective entry points; removing either as duplication would recreate an unshown action. The reader appropriately limits its import validation to the browser flow, its audio controls check to operation/loading, and its review to changed routes rather than certifying native capture or external services.

Ranked justified fixes: none outstanding. No production change requested by this sceptic. A separate checker must still verify the built result and the builder must complete the full quality gate; this note does not substitute for either.

## Source-audit findings tested

| Finding | Test against final implementation | Result |
| --- | --- | --- |
| R1: codec selection assumes destination knowledge | Read complete codec page, followed working-default link into actual export lesson, read all four test steps and their limit. Receiving app/device examples precede the procedure. | Resolved. |
| R2: formats/pixel guidance repeats unsupported selection decisions | Read overview, container and pixel pages. Material/purpose defaults precede alternative triggers. Keyboard-activated contextual links reach and focus the shared procedure. Existing container/codec/pixel and alpha limits remain visible. | Resolved. |
| R3: recording appendix names obsolete source/import flow | Inspected all four platform choices, followed return link to overview, activated Files and Import files with keyboard, imported and replayed an MP4 in every desktop/phone/light/dark context. Actual button labels match the instructions. | Resolved. |
| E1: optional personal sequence preparation lacks a complete procedure | Opened both disclosures with Enter, read whole final text, closed with Space. Fixed canvas, photo fitting without distortion, consistent PNG mode/transparency, per-file bare ffprobe comparisons, input patterns and distinct output names are explicit. Optional material follows worked example and leaves supplied practice intact. | Resolved. |
| L1: local export page says to test destination without teaching it | Read final export explanation/check limit and unchanged actual command. Local text explicitly names download, opening/importing/uploading and observable success criteria. | Resolved. |

## Primary evidence checked

- Saved MDN `mdn-video.txt` explicitly recommends MP4/AVC with AAC as a broadly supported web combination. The copy's “widely supported starting point” is appropriately narrower than a universal promise. No compatibility matrix or guaranteed-device claim was introduced.
- Saved `youtube-upload.txt` includes MP4, H.264, AAC-LC/Opus and additional recommendations for layout, profile, frame rate, colour, audio and bitrate. The course labels the source an example, acknowledges extra settings and does not claim its command satisfies them all.
- FFmpeg n5.1.4 saved `image2-doc` requires equal image size, pixel format and image format, documents numbered sequential inputs, and sets default input rate 25. Saved pinned-browser `png-wasm.txt` actually reports `Video: png, rgba(pc), 640x360, 25 fps, 25 tbr, 25 tbn`. Final copy correctly treats this nominal still-image rate separately from the explicit sequence `-framerate`. It does not invent results for personal files.
- Existing `docs/notes/codecs/codec-sources.md` supports the codec/encoder distinction, conditional build availability, AAC-LC default, compression design aims and qualified efficiency comparisons. Final copy requests a suitable encoder or the installed build's encoder list; it does not promise that the notebook can encode every listed codec. Format pages explicitly distinguish importing, processing and previewing.
- No changed command, new fixture, benchmark, compression ranking, measured saving or new generation claim was found. Native capture commands are unchanged. The actual notebook export still uses libx264, yuv420p and aac in MP4.

The failure procedure preserves the prior container-family ambiguity correction: it asks for Video and Audio lines to inspect codecs and picture dimensions, uses Files for the displayed size, and says the export command selects MP4 through its output name. It does not treat `.mp4` or the generic probe format-family list as proof of an existing file's container. Files displays rounded KB/MB values; this review does not misreport that as an exact byte measurement.

## Rejected candidates

- **Require all users to research published settings before a first export.** Rejected: a usable working default and receiving-file test are already first; requirements research now has a specific context.
- **Give an unconditional codec or device compatibility recommendation.** Rejected: profiles, encoder/build dependencies and receiving-file limits make that unjustified. Actual target playback is the taught check.
- **Explain AAC-LC in the opening default callout.** Rejected: it now says AAC there and defines AAC-LC in the audio row, preserving progressive explanation.
- **Require image-editor-specific menu instructions.** Rejected: external tools vary. The preparation settings and output inspection criteria supply a concrete tool-independent path, with a correction step when exported values differ.
- **Require colour conversion or arbitrary media normalisation lessons here.** Rejected: optional preparation is bounded to one matching PNG sequence. The supplied exercise remains complete, and no promise is made for arbitrary input combinations.
- **Treat details placement or distinct personal filenames as regressions.** Rejected: disclosures follow worked commands, preserve their short supplied-source notes and keyboard access, and `photo-`/`sketch-` prefixes avoid overwriting supplied `drawing-`/`frame-` inputs.
- **Infer a product failure from first harness attempts.** Rejected: the review harness initially used a wrong fixture path, selected two hidden file inputs, played before the preview loaded, and expected the wrong reference filename. Those harness assumptions were corrected; actual controls then passed. No production fix was needed.

## Built evidence and limits

Evidence lives outside the repository under `/workspace/scratch/actionable-guidance/sceptic/`. `review.mjs` and `results.json` record four contexts: desktop 1365 × 900, Pixel 7 phone, each light/dark. Saved screenshots include codec default/procedure, format/container/pixel pages, optional personal disclosures, current recording guide and imported-file flow. Representative full pages and section captures were visually inspected, including desktop/phone in both themes. `controls.mjs`/`controls.json` cover all recording choices plus actual playback of all three audio comparisons and a reference-file download on desktop and phone.

All four contexts passed no document horizontal overflow, including codec text at 200%; deep links via keyboard, Back and reload; focused procedure heading; optional disclosures via Enter/Space; current import chooser and replay; zero page errors; and zero `/encoder/` requests while reading. All three preserved audio controls advanced with only one playing at a time. Screenshot text and focus indicators remain legible in both themes.

Commands: `node scratch/actionable-guidance/sceptic/review.mjs` (run before relocating evidence; script now has absolute import/output/fixture paths) and `node /workspace/scratch/actionable-guidance/sceptic/controls.mjs`. Final runs passed. This is a focused independent review, not the full CI gate or independent final checker. It does not claim tested third-party editors/devices, new encoding measurements, native screen capture execution or measured contrast ratios. Mandatory separate checker and full `npm run check` remain the builder's next gates.
