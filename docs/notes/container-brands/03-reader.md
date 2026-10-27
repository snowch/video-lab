# Fresh learner review: demuxer, brands and muxer

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by an independent reader agent, which did not author or change the product. Read the actual built pages before reading the verified fact brief; no author rationale or draft review was used to form the initial assessment.

Built entry: `http://127.0.0.1:4173/video-lab/` at `#/learn/inside-video/inspect` and `#/learn/export/format`.

## Findings and direction

No actionable reader finding in this focused slice. No major or minor defect to rank. The following observations record the quoted evidence and why a fix is not requested.

| Quoted built-page evidence | Reader assessment | Severity | Suggested direction |
| --- | --- | --- | --- |
| “It uses a **demuxer** to read the container and make its individual streams available.” | Streams and container have already been explained. The new term names a concrete reading operation, without implying separate output files or codec decoding. | None | Retain the definition in the main explanation. |
| “The list alone does not identify the exact container. We supplied this practice file in MP4 format.” | Resolves the likely mistaken reading of the comma-separated Input names. No claim that `isom` uniquely proves MP4 follows. | None | Retain the distinction. |
| “Can the metadata identify the container more precisely?” | One optional native disclosure immediately follows the Input explanation. It is closed on initial load and adds no required task or separate quiz. | None | Keep this contextual placement. |
| “Brand codes have four characters”; “The `mp41` code declares compatibility with MP4 version 1”; “declarations alone do not verify that a file conforms to a specification.” | Enough local explanation to read the two supplied Metadata lines. The unfamiliar ISO family name is expanded; the text does not require mastering a taxonomy or the unexpanded `iso2`/`avc1` examples to continue. | None | Retain the compact local example and optional lookup. |
| “MP4 Registration Authority brand registry (external)” and “This reference needs an internet connection.” | A meaningful destination label, correct brands-registry URL, and truthful connection requirement. The lesson explanation stands on its own. | None | Retain. |
| “Selected native ffprobe fields … ellipses mark omissions”; “This guide always describes the supplied source. Your command produces its own raw output.” | Supplied teaching excerpt and executed evidence are clearly separated before and after running the command. The disclosure also says “The supplied file’s Metadata”. | None | Retain the explicit source language. |
| “A **muxer** writes streams into a container; this packaging step is called **muxing**. Here, the `.mp4` ending selects the MP4 muxer …” | Complementary definition appears at the export action. The preceding sentence identifies the encoders, so encoding and packaging have different roles. | None | Retain beside the current export explanation. |

## Built-page checks

Used standalone Node Playwright, without invoking or duplicating the full CLI gate:

- Desktop 1440 × 1000 and phone 390 × 844; both pages in actual `html[data-theme]` light and dark modes; root text 16 px and 32 px (200%). All 16 route/device/theme/text-size combinations had document width equal to viewport width. Open and closed disclosure screenshots and focused readable close-ups are saved. Text and code reflow remained readable; at phone 200%, metadata lines wrap within their block.
- Native `details` was closed initially at each viewport. Focused summary toggled open and closed with both Enter and Space. On the touch-enabled phone context, taps opened and closed it. The content remains in normal reading order.
- The external link has accessible text “MP4 Registration Authority brand registry (external)” and exact href `https://mp4ra.org/registered-types/brands`.
- Loaded the supplied files and ran the existing `ffprobe bunny-short.mp4` cell once. It completed and produced its own raw log containing `major_brand     : isom`, `compatible_brands: isomiso2avc1mp41`, the shared Input format list, duration and two stream lines. The supplied guide remains separately labelled. No unrelated encode was repeated.

Evidence: `/workspace/scratch/container-brands/reader/`. `matrix.json` records measured viewport, document width, root font size and actual theme. `review.mjs` contains the focused matrix/keyboard/touch/real-command checks; `actual-ffprobe.log` and `inspect-after-run.txt` preserve executed evidence. `inspect-*.png` and `format-*.png` cover the matrix; `disclosure-*.png` and `muxer-*.png` provide readable close-ups. `read.mjs` and the initial page-text files preserve the first built-page read.

Commands completed successfully: `node /workspace/scratch/container-brands/reader/read.mjs`, `node /workspace/scratch/container-brands/reader/review.mjs`, `node /workspace/scratch/container-brands/reader/details.mjs`, and `node /workspace/scratch/container-brands/reader/muxer.mjs`.

This review is focused on the approved prose/disclosure change. It is not a claim to rerun every course control, every media encode or the full quality gate, which the builder is running separately. No product files edited and no commit created.
