# Formats and image video — independent final checker

Copyright © 2026 Christopher Snow.

28 October 2026. Separate checker who authored no product fixes. Read `AGENTS.md`, `01-plan.md`, the completed `02-reader.md`, `03-sceptic.md` and `04-fixes.md`. Started an independent preview on port 4183 only after the parent declared the rebuilt fixes ready. Used standalone browser scripts, with no build, Playwright CLI/global setup, product edit, commit, merge or push. The checked build's release file identifies source commit `b0b75069cd2284c63460c4289d8f569e8179133b` and build `b9d082e83fad14e3dc6f40ebf2dc40bcbcebff7c748eaed582468cf18cd668d5`; this is the local reviewed build, not a claim about a deployed release.

## Decision and fix verification

No remaining finding or additional product fix requested within this coverage. Both reader findings were retained by the sceptic and are resolved on the actual rebuilt page:

- **F1, overlay prerequisite:** before the worked command and practice, the visible concept now says “Write overlay=x:y to set those coordinates, with a colon between them”, then defines coordinate directions. The practice can require the learner to choose values without requiring unshown punctuation. Its introductory concept contains no repeated full FFmpeg command; the editable worked cell supplies that command.
- **F2, relevant provenance:** hold, sequence and animation have no Big Buck Bunny credit. Overlay retains it because it uses the Bunny clip. The photograph keeps Hannes Röst's credit, original source and CC BY-SA 3.0 links, crop/resize notice and the explicit ShareAlike explanation covering adaptations including videos.

Also verified the additional correction: the transparent drawing's visible caption expressly says the checkerboard is a preview aid and “not part of the PNG”. It continues to explain alpha. The ordered-picture thumbnails explicitly describe supplied images, not generated timing or a simulated processing result.

## Built layouts and navigation

`layout.mjs` passed all four new lessons at desktop 1440 × 1000 and phone 393 × 851, each light/dark: 16 lesson/layout cases. Each had ready source assets, decoded figure images where present, intact copy/credits, no document overflow, and no overflow after root `font-size: 200%`. This is actual doubled root text sizing, not a claim about browser-menu zoom or physical pinch zoom. Captured full-page screenshots and doubled-heading evidence. Independently opened the actual photograph through View source and decoded its 640 × 360 image; saved focused figure/concept/credit screenshots in `visual.mjs`. Visually inspected the phone-dark checkerboard/caption and photograph credit, desktop-light ordered drawing strip and representative whole-page layouts.

In all four device/theme combinations, followed the overview's formats link, checked every requested format family, followed the codec guide link, used Back, followed the photograph lesson link, and followed the glossary's formats link. The formats guide fit the viewport. Reading these lessons/guides generated no encoder request. External attribution links were inspected, not fetched or audited anew.

The formats guide's distinction between general format advice and this notebook's processing/preview support remains explicit. Practice check-limit text continues to distinguish metadata evidence from replay/listening: sequence order, intended drawing motion, overlay placement and sound quality are not claimed as measured by the application just because a metadata check passes. No new unsupported automatic visual-check claim was found.

## Real browser commands, outputs and reruns

On a phone-sized dark Chromium page, independently executed these typed worked commands through the actual notebook:

```sh
ffmpeg -framerate 1/2 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides.mp4
ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay annotated.mp4
```

For each page, changed its actual Command builder, selected Apply to command, verified the complete resulting editor text and ran the practice:

```sh
ffmpeg -framerate 1 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides-practice.mp4
ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay=40:0 annotated-practice.mp4
```

Both metadata checks passed. Added explicit visible `-y` and reran each practice, checked again, then reloaded: both results remained current (`data-stale="false"`). This independently exercises the corrected output-versus-source provenance behaviour. Inline players actually played and advanced; this was brief replay, not full-duration subjective viewing/listening.

Downloaded the four outputs and independently ran native ffprobe with frame counting, then full `ffmpeg -v error -xerror -i FILE -f null -` decoding. All passed:

| Output | Duration | Dimensions | Video frames/rate | Audio |
| --- | --- | --- | --- | --- |
| Slideshow worked | 6 s | 640 × 360 | 144 / 24 fps | absent |
| Slideshow changed practice | 3 s | 640 × 360 | 72 / 24 fps | absent |
| Overlay worked | 8 s | 854 × 480 | 192 / 24 fps | present |
| Overlay shifted practice | 8 s | 854 × 480 | 192 / 24 fps | present |

`pixels.mjs` additionally decoded actual downloaded pictures. Sampling each slideshow hold established the ordered ball centres at approximately (80,260), (272,90), (560,260), for both durations. In both overlay files, a crop on the ring remained orange for **all 192 frames**, at x=326 in the worked output and x=366 in practice. A transparent-region crop matched the underlying source to mean absolute RGB difference 0.2144, consistent with lossy re-encoding. These independent checks substantiate the changed-picture results; they do not imply the learner-facing metadata checker performs them or establish subjective audio quality.

The full reader/parent evidence covers all eight hold/sequence/animation/overlay worked/practice commands, including Firefox. This checker deliberately did not repeat the hold/animation encodes or every earlier lesson.

## Offline verification

Used the real complete App status download and waited for readiness. Disconnected the context, opened a **fresh tab**, read the formats guide, fetched and decoded all 11 image assets via the service worker, then ran the changed three-second slideshow practice and its metadata check offline. All passed. This supplements the sceptic's offline worked-sequence run; it is not a complete update/install lifecycle review.

## Reproducible evidence and limits

All generated artifacts live outside the repository at `/workspace/scratch/formats-images/checker/`: standalone `layout.mjs`, `commands.mjs`, `pixels.mjs`, `offline.mjs`, `visual.mjs`; JSON measurements/hashes; rendered text; focused/full-page screenshots; four downloaded MP4s. The layout, native pixel, final offline and visual scripts exited successfully. The command harness completed all six intended worked/practice/rerun encodes and recorded them in `command-results.json`, then its original additional offline section failed because it tried fetching the self-excluded `offline-manifest.json` after disconnecting. The separate successful `offline.mjs` uses manifest paths read from the actual build on disk and fetches the cached assets themselves. No product fix was needed. An early layout harness also read text immediately after hash navigation; waiting for rendered formats content corrected that harness assumption.

This record does not claim screen-reader, physical touch hardware, subjective sound review, exhaustive keyboard traversal, new original photograph provenance research, a full native asset regeneration, full-course/offline-update regression, the parent's full quality gate, a merge or public deployment. The independent reader's and sceptic's remaining findings/limits are preserved rather than presented as work this checker performed. No product author claims to have independently reviewed their own changes.
