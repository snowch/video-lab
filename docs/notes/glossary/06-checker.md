# Independent built-page checker: glossary

Copyright © 2026 Christopher Snow.

Checked 27 October 2026 by a separate checker agent which did not author or edit the product. First read the actual built `http://127.0.0.1:4173/video-lab/#/glossary`, including all 32 definitions and examples, before reading `AGENTS.md` and `01-facts.md` through `05-resolution.md`. The initial built text is saved as `first-look.txt` in the checker artifacts.

**Pass. R1 is corrected; no unresolved finding or requested product fix.**

## Definitions and review resolution

All 32 entries render alphabetically, each with a definition, concrete example and one lesson link. Read every entry and compared their distinctions and numeric examples with the fact brief, reviewed lesson context and recorded `src/notebook/visuals/media.json` evidence. No new factual or clarity defect found. Containers/codecs/streams/channels, demuxing versus decoding, muxing versus encoding, stored dimensions versus display/quality, audio versus picture rate, tick versus frame, bitrate versus quality, CRF versus fixed size, and amplitude versus perceived loudness remain distinct. The source-derived dimensions, 24 fps, 48000 Hz, rounded bitrate, timeline ticks/time base, framing dimensions, CRF comparison and subtitle interval agree with the recorded evidence. The brand example retains the `isom` and conformance caveats.

The reader's minor R1 and the sceptic's adjudication were justified: direct further reading is more useful than a page that defers the explanation. On the final build, Audio sample rate links exactly to `#/learn/frames-time/rate`, labelled “Learn more: Count pictures through time”. Followed it on desktop and phone and confirmed the actual lesson explains sound measurements per second separately from pictures. Also followed this corrected link from a new offline page. The definition and example remain intact. The resolution leaves no conflicting or unfinished review finding.

## Independent built checks

- All 32 names were searchable. Fourteen alias lookups passed, including outer-space/case handling, fps, CRF, Hz, `sample_rate`, kbps, `isom`, mp41, `major_brand`, compatible brands, `avg_frame_rate`, PTS, resolution, multiplexing and demuxing. A non-matching query produced useful next-action text. Tab reached Clear search; Enter cleared and restored input focus and all 32 entries. Pointer/touch clear also restored the complete list and focus.
- Both course-index discovery and footer discovery opened the glossary, including phone taps. Every entry's actual lesson destination exists in the built course index. Independently followed Audio sample rate, Time base and Pixel format; each opened the stated lesson with the matching heading, and browser Back/Forward restored the expected routes. Course overview returned to the index.
- Desktop 1440 × 1000 and touch-enabled phone 320 × 844, actual light/dark themes, computed root text 16/32 px: all eight combinations retained 32 entries with document width equal to viewport width. Saved screenshots were visually inspected across both devices/themes, including the long Presentation timestamp heading/example at doubled text. Text and links reflow readably without clipping or horizontal page scrolling.
- A fresh overview/glossary reading and search flow requested no practice MP4, subtitle, font or processing-tool assets. The glossary contained no lesson source panel or executable cell. Asset/tool requests in the separate command/offline checks below were explicitly initiated for those checks.
- Imported a learner text file beside the two inspection sources, authored `ffprobe -hide_banner bunny-action.mp4`, and held tool loading while the genuine command was active. Opened the glossary via the footer, searched `isom` and opened Files: global Working/Cancel remained available and all file rows were unchanged. After release, the command completed. Back restored its authored command and actual raw H.264/file output. The imported file's exact text and both existing sources remained intact.
- Explicitly used App status → Download for offline use against the frozen build. Saving completed with no HTTP errors. Disabled networking and opened a new page directly at the glossary: all 32 entries loaded, `isom` search worked, and the corrected Audio sample rate link opened its lesson with ready practice source. This independent cold-page check supports the sceptic's stable-build offline result. The browser was closed and the builder was told the save/probe had completed before its full gate could replace built assets.

## Evidence and limits

Successful standalone Node Playwright commands:

```sh
node /workspace/scratch/glossary/checker/offline.mjs
node /workspace/scratch/glossary/checker/ui.mjs
node /workspace/scratch/glossary/checker/workspace.mjs
```

Artifacts under `/workspace/scratch/glossary/checker/` include those scripts, `first-look.txt`, extracted `entries-desktop.json` / `entries-phone.json`, `matrix.json`, `interactions.json`, `workspace.json`, `offline.json`, the actual ffprobe log and screenshots. Results record actual themes/font sizes/document widths, search/navigation observations, workspace preservation and cold offline success.

This focused final checker did not edit product files, commit, run an encode, invoke Playwright CLI or rerun the full project/browser quality gate. Native media verification and the full gate remain the builder's separate record; existing measurements were checked against the committed record rather than regenerated here.
