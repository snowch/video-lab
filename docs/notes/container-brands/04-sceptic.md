# Independent technical sceptic review

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate sceptic agent. No product edits or commits were made by this reviewer.

## Scope and evidence

Reviewed the source diff, `01-facts.md`, the recorded metadata and its native verification, and the built pages at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect` and `#/learn/export/format`.

The official sources were fetched successfully on the review date:

- [FFmpeg formats manual: demuxers](https://ffmpeg.org/ffmpeg-formats.html#Demuxers): readers of multimedia streams from a particular type of file.
- [FFmpeg formats manual: muxers](https://ffmpeg.org/ffmpeg-formats.html#Muxers): writers of multimedia streams to a particular type of file.
- [MP4RA brands registry](https://mp4ra.org/registered-types/brands): `isom` is “All files based on the ISO Base Media File Format”; `mp41` is “MP4 version 1”; `mp42` is “MP4 version 2”. The registry also lists `3gp6` as “3GPP Release 6 basic Profile”, `avc1` as “Advanced Video Coding extensions”, and `qt$20$20` as “QuickTime”.

Native verification used ffprobe `7.1.5-0+deb13u1`:

```sh
ffprobe -v error -show_entries format=format_name:format_tags=major_brand,compatible_brands -of json public/media/notebook/bunny-short.mp4
```

It returned `mov,mp4,m4a,3gp,3g2,mj2`, `major_brand: isom` and `compatible_brands: isomiso2avc1mp41`. An independent Python byte read found a 32-byte `ftyp` box, major brand `isom`, minor version 512 and compatible entries `isom`, `iso2`, `avc1`, `mp41`. Thus the raw recorded lines describe the actual supplied file. The new verification compares their parsed values to native format tags; the existing identity check pins the complete source bytes to provenance. The `mov.c` read path independently supports the explanation that compatible brands are concatenated in this ffprobe tag.

Built review used the standalone Node Playwright script `/workspace/scratch/container-brands/sceptic/probe.mjs`, without invoking Playwright CLI or duplicating the builder’s full gate. It inspected Chromium at desktop 1440 × 1000 and Pixel 7 width 412, each in light and dark. All eight full-page screenshots were visually inspected. The script and results are in `/workspace/scratch/container-brands/sceptic/`, including `probe.json` and saved source HTML.

## Results and challenges

No substantive technical or presentation defect was found in the added content.

| Challenge | Adjudication |
| --- | --- |
| Does “demuxer” suggest writing separate elementary files or decoding pictures? | Rejected. The definition says it reads the container and makes individual streams available; it does not promise file extraction or decoding. The main page has already introduced container, streams and codecs. |
| Does the format-name list classify this source uniquely as MP4? | Rejected. The Input explanation explicitly says that the shared list does not identify the exact container and identifies MP4 through supplied-source provenance. |
| Does `isom` uniquely mean MP4? | Rejected. The disclosure explicitly denies that inference and accurately names the broader ISO Base Media File Format family. MP4RA supports the distinction. |
| Does `mp41` prove conformance or identify a stream codec? | Rejected. It is described as a compatibility declaration for MP4 version 1. The text explicitly separates specifications from streams and warns that declarations do not verify conformance. |
| Are these lines presented as the learner’s current command output? | Rejected. The enclosing guide is labelled selected native fields from the supplied source, and the added introduction says “The supplied file’s Metadata”. Actual logs occupy their existing separate output region. |
| Does “muxer” imply encoding or require several streams? | Rejected. The export definition attributes encoding to libx264 and AAC, then defines writing streams into a container as muxing. It makes no two-stream requirement. The `.mp4` selection statement is explicitly about the shown command, which has no overriding `-f` option. |
| Does opening the optional explanation require a connection? | Rejected. No MP4RA requests occurred when loading or opening it. With the browser network disabled after load, the disclosure still toggled and retained its complete explanation. The external reference alone is marked as requiring a connection. |

The native disclosure started closed in all four contexts. Enter opened it, Space closed it, and pointer click or phone tap reopened it. Both brand lines, their explanations and the descriptive external registry link were visible and readable; the link destination was exactly the official URL above. Document width equalled viewport width in each context. Both built definitions matched the reviewed source prose, with no clipped content or theme-specific loss of readability.

## Learner-review adjudication

Read the completed `03-reader.md` before finalising this adjudication. The separate learner reviewer reported no substantive findings after reviewing both routes at desktop/phone sizes, light/dark and normal/doubled text. They also reported a real browser ffprobe run matching the supplied brands while raw output remained separate from the static guide. There are therefore no reader findings to retain or reject; the possible technical objections tested above were independently rejected against the built page and sources. The quoted reader observations and suggested retention directions agree with the independently checked definitions, sources and built disclosure.

## Limits

This review did not rerun encodes or the full `npm run check`; the builder is running that gate separately. The offline observation covers an already loaded app and confirms no network dependency in the added explanation; it is not a claim of a fresh cold offline installation. The live registry page was fetched and its entries checked, while the app's link target was verified in the built DOM. Full offline saving, update lifecycle and publication are outside this focused review.
