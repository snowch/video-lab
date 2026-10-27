# Independent built-page checker

Copyright © 2026 Christopher Snow.

Checked the existing production preview at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect` on 27 October 2026. I did not draft, implement or fix this change. I first read and captured the actual page, then read the fact brief, draft, reader, sceptic and resolution records. This check concerns the reader-list and bitrate explanation, with nearby command output and navigation; it is not a new review of the whole course or offline system.

## Result

No actionable findings. The four-row guide contains Input, Duration/bitrate, Video and Audio in that order. The Duration explanation has two separate paragraphs. It defines decimal kilobits, gives the approximate 352,000 bits/s and 44,000 bytes/s conversions, identifies the whole-file scope, distinguishes stream rates and explains that the value is an average rather than playback speed. The Input explanation identifies one reader for related formats and separately identifies this supplied file as MP4. The existing native-source label and omissions note remain visible.

The reader and sceptic reported no defect requiring a fix. My independent built-page and native checks support that disposition. No product files were changed by this checker.

## Checks performed

Used the repository's installed Playwright package from a standalone Node script, without the Playwright CLI or another build:

```sh
node /workspace/scratch/probe-bitrate/checker/check.mjs
```

The completed script passed the following:

- Desktop 1440 × 1000, phone 393 × 851 with touch/mobile emulation, and narrow 320 × 800; each in light and dark at normal and 200% root font size: twelve combinations. The actual theme and computed text sizes were recorded. Document scroll width equalled viewport width in every case, and guide terms, excerpts and descriptions had no horizontal clipping. Prose was 16 px normally and 32 px enlarged; excerpts were 14.4 px and 28.8 px. All four rows and both bitrate paragraphs remained present. I visually inspected desktop/phone light/dark captures and enlarged/narrow examples; the excerpts and inline code remain legible and wrap with their explanations.
- Loaded the supplied files and ran the real desktop-light worked cell as `ffprobe bunny-short.mp4`. It returned `Duration: 00:00:08.00` and `bitrate: 352 kb/s`, with Video and Audio stream lines.
- Changed that same worked command to `ffprobe bunny-action.mp4` and ran it. The raw result correctly changed to `Duration: 00:00:06.00`; the supplied guide remained byte-for-byte identical to its earlier rendered text, including its eight-second Duration row and explicit source qualification.
- For both actual runs, the complete displayed raw text matched the persisted `last.log` string exactly. The bitrate explanation was absent from the raw log. The native excerpt remains a distinct guide after actual output rather than a replacement for it.
- Followed all three existing optional codec links and verified the destination headings: Copy compressed streams, Choose an encoding quality setting, and Choose an export format. Browser Back returned to the guide each time. Next opened Choose picture or sound at `#/learn/inside-video/streams`.
- No page error events were emitted during the selected command and navigation checks.

My first script incorrectly required an `ffprobe version` banner. The existing browser inspection implementation emits an `ffmpeg version 5.1.4` banner with the actual inspection output; I corrected the scratch assertion to accept the existing tool banner and reran the script successfully. This was a checker assumption, not a product finding or a product change.

I independently ran:

```sh
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=codec_type,bit_rate -of json public/media/notebook/bunny-short.mp4
ffprobe -hide_banner public/media/notebook/bunny-short.mp4
ffprobe -version
```

Native ffprobe `7.1.5-0+deb13u1` confirms 352138 bytes, 8.000000 seconds and 352138 bits/s overall; the video/audio rates are 280869/64095 bits/s. Independently calculating file bytes × 8 / duration gives 352138 bits/s. The displayed 352 kb/s therefore warrants the guide's approximate wording, and 352000 / 8 = 44000 bytes/s. The stream-rate sum, 344964 bits/s, is below the whole-file rate, consistent with the explanation of container information. I also inspected the implementation's selected recorded-field extraction and actual compiled guide: the Duration and stream excerpts use recorded native fields, and inline code/bold formatting renders correctly.

## Evidence and limits

Artifacts are in `/workspace/scratch/probe-bitrate/checker/`: `check.mjs`, `results.json`, `initial-page.txt`, `desktop-initial.png`, twelve `*-guide.png` captures, four enlarged/phone `*-viewport.png` captures, `desktop-worked-action-raw.png`, both `*.raw.txt` output captures and `native.json` with the independent calculation.

The 200% check enlarges the root CSS font; it is not a claim to have exercised browser zoom or a physical device. Actual command execution and codec/Next navigation were checked on desktop Chromium light; the other combinations check rendered guide content and reflow. The reader separately exercised phone command controls. I did not repeat every existing workbench control, every course page, other browsers, native-source provenance, or offline/update behaviour. I ran no build, full `npm run check` or Playwright CLI; those gates are the builder's separate validation record. This is independent approval of this explanatory slice only.
