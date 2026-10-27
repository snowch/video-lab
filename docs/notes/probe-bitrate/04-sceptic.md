# Independent sceptic: supplied ffprobe guide

Copyright © 2026 Christopher Snow.

Reviewed the built page at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect` on 27 October 2026. This reviewer did not draft or implement the change. I inspected the rendered page, the fact brief, implementation changes and native evidence independently, then read and tested every assessment in `03-reader.md`.

## Disposition

The reader reported no actionable findings. Accepted defect findings: none. Rejected reader defect findings: none. My independent checks found no additional defect requiring a product fix. Smallest fix set: empty.

| Reader assessment | Sceptic result and evidence |
| --- | --- |
| One reader prints related format names; this is not six streams. | Accepted. The built explanation says “one reader for MP4 and related formats” and explicitly identifies the supplied file as MP4. Native `ffprobe -hide_banner -h demuxer=mov` names `mov,mp4,m4a,3gp,3g2,mj2`; FFmpeg n7.1.5 `mov.c` lines 11156–11160 declare that reader name separately from its longer extension list. The copy does not claim an exhaustive list of supported extensions. |
| 352 kb/s has an explicit decimal bit/byte interpretation. | Accepted. The built text defines kilobits per second, approximately 352,000 bits/s and 44,000 bytes/s, with eight bits per byte. The arithmetic is correct. `dump.c` lines 865–867 print the context rate divided by 1000 using integer division; “about” is appropriate for the shortened display. |
| Whole-file and stream rates are distinguished. | Accepted. The built text explicitly includes video, sound and container information in the whole-file rate, and limits a Stream-line rate to that stream. My independent native probe reports 352138 bits/s overall, 280869 video and 64095 audio. The stream sum is 344964 bits/s, below the whole-file rate. |
| The rate is an average and does not describe playback speed. | Accepted. Both statements are present beside the displayed rate in all four viewport/theme combinations. Native file bytes × eight / duration equals 352138 bits/s, confirming this supplied file's average rather than a per-second observation. |
| Eight-second duration is explained directly. | Accepted. The built excerpt is `Duration: 00:00:08.00 … bitrate: 352 kb/s`; its adjacent prose says eight seconds. Native duration is `8.000000`. |
| The guide remains a supplied example rather than a live result. | Accepted. The rendered note says the guide always describes the supplied source and commands produce their own raw output. `ProbeGuide` selects substrings from committed `media.json`, without parsing or rewriting a learner's live output. The new Duration row uses the same committed source. |
| Desktop/phone light/dark rendering is readable and has no overflow. | Accepted. I independently captured and visually inspected all four combinations. Document scroll width equals viewport width: 1440 and 390 px. Guide scroll/client widths are 567/567 and 358/358 px. All four selected rows and both bitrate paragraphs are present; no page errors occurred. The phone Duration unit wraps visibly onto a second line, preserving its text and meaning. |

## Additional challenges considered

- Rejected the need to expand every format abbreviation or list every supported extension. The user needs the reason for the printed names, which the reader-family explanation supplies. Native help proves the printed names are not an exhaustive extension list; the copy avoids that claim.
- Rejected treating the whole-file value as video bitrate or as an exact constant for each second. Both interpretations are explicitly ruled out by the built copy and contradicted by the independently measured stream/file rates.
- Rejected demanding a file-size calculation in the learner-facing guide. The native calculation verifies the explanation, while the local unit definition and average statement teach the requested interpretation without requiring another activity.

## Independent evidence and scope

Commands run from `/workspace/video-lab`:

```sh
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=codec_type,bit_rate -of json public/media/notebook/bunny-short.mp4
ffprobe -hide_banner -h demuxer=mov
ffprobe -version
```

Native version: `7.1.5-0+deb13u1`. The independent run confirms 352138 file bytes, eight seconds and 352138 bits/s. FFmpeg n7.1.5 `avformat.h` lines 1426–1431 document context bitrate in bits/s and automatic computation when file size and duration are known. Reviewed source copies are in `/workspace/scratch/probe-bitrate/{avformat.h,dump.c,mov.c}`.

Standalone Playwright scripts visited the existing built preview at desktop 1440 × 1000 and phone 390 × 844, changed theme through the app control and captured the guide. Artifacts under `/workspace/scratch/probe-bitrate/sceptic/` include `native.json`, `layout.json`, `page-desktop.txt`, `desktop.png` and the four `*-guide.png` captures. An initial script used the theme's visible text as its accessible name and timed out; inspection showed the intentional accessible name `Change colour theme`, and the corrected four-combination run passed. This was a reviewer script selector error, not a product finding.

No product files were edited. I did not run a build, the Playwright CLI or the full quality gate, and did not independently repeat the reader's actual WASM cell/control runs. Those reported observations are consistent with my independent native measurement and rendered-page inspection; final checker certification and the full gate remain separate.
