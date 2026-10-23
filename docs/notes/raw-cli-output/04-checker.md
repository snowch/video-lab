# Independent final check: native default output

Copyright © 2026 Christopher Snow.

The separate `prototype_checker` agent checked the final built raw-output slice on 23 October 2026, after receiving the final-build notice. The checker did not edit implementation or copy. Entry HTML SHA-256: `de4ae7ad66ec6edc5e3b2993849d3275d4c6c721a5e5cab6cbc2406435d9332a`. Bundle: `workbench-CfPx4GZJ.js`, SHA-256 `defa1b1eca011a80a9b7b53baa5bda820c801bc709e9b0c0721ea5cf96d39809`. No remaining blocker was found for this slice.

## Final R1 verified

The completed bare-probe log now opens at its tail, exposing the real Duration and Stream lines. In Chromium the measured scroll state was top 167, client height 320, total height 487; Firefox reported 168/320/488. All earlier raw lines remained available by scrolling back. Phone right-scroll controls moved the actual output, and Wrap lines removed horizontal output overflow without changing its text.

A separate real running encode tested the behaviour while new lines arrived:

```sh
ffmpeg -re -i mousepad-demo.mp4 -t 8 -an -c:v libx264 follow-tail.mp4
```

After manually scrolling to the beginning, additional actual log text arrived and the scroll position stayed at zero. Returning to the bottom resumed following: a subsequent measurement was top 590, client height 320, total height 910; after completion it was 1275/320/1595. The downloaded video independently measured eight seconds with native ffprobe. Thus the check exercised real growing output rather than injecting fabricated log lines or merely inspecting the final DOM. JSON reports continued to start at scroll position zero.

## Raw default, optional JSON and genuine media

Completed the real probe → deliberate missing input → explicit JSON → FFmpeg trim path in Chromium phone 390 × 844 light/dark, Chromium desktop 1365 × 900 light/dark, and Firefox phone 390 × 844 dark. Each fresh context began with exactly `ffprobe mousepad-demo.mp4`. Actual output included `Duration: 00:00:12.00` and the H.264 Stream line. No JSON object, internal validation filename, report-download button, derived metadata badge or wrapper-return decoration appeared in that bare-command transcript.

The echo matched the executed command. `ffprobe missing.mp4` showed the real missing-file diagnostic and app failure. A typed `ffprobe -v error -show_streams -show_format -of json mousepad-demo.mp4` produced a visible report whose full text exactly matched the downloaded report in every case. The report started at the beginning and described the actual twelve-second source. Editing the command preserved the earlier echo/report with stale-output guidance. Navigating through Trim and back to Inspect retained the correct earlier inspection output.

Actual FFmpeg version, input, output and progress text appeared directly. All five default edited-video downloads independently measured `6.000000` seconds with one video stream and no audio using native ffprobe. Media controls remained below the command transcript. No JavaScript page errors or document-wide horizontal overflow occurred.

## Failure and return-status edge cases

In separate Chromium and Firefox contexts, imported a deliberately corrupt nonempty MP4 and ran bare ffprobe against it. It failed with genuine invalid-media output; the ambiguous wrapper return was not accepted as success. Both browsers also passed these independent checks:

- `ffprobe -version` and `ffprobe -h` completed with their actual text and no invented JSON.
- `ffprobe -v quiet mousepad-demo.mp4` completed without a manufactured log or report.
- `ffprobe -v quiet missing.mp4` failed without manufacturing output that the quiet command had suppressed.
- An unsupported `-bad_option` failed with the actual diagnostic.
- The private validation filename never appeared in the transcript or workspace. Files remained exactly the original and the deliberately corrupt import.

Opening optional browser diagnostics in another real run showed the original wrapper `-1` for bare inspection and actual `0` for `ffprobe -version`. The main transcript did not relabel the sentinel as native success. Source inspection confirmed that requested arguments run before the separate private validation call and that validation logging is not forwarded.

## Evidence and scope

Independent scripts and logs are in `/workspace/scratch/raw-checker/`: `main.mjs`, `main.log`, `results.json`, `edges.mjs`, `edges.log`, `follow-tail.json`, `screens.mjs` and `diagnostics.mjs`. Actual downloaded MP4s are beside them. Phone/desktop default-tail screenshots in `evidence/checker-default-tail-*` were visually inspected. The `checker-*-raw` screenshots record deliberate manual backscroll; `checker-live-tail-phone-light.png` records the real live-log experiment.

This is a focused check of native output, validation and scrolling. It does not repeat unchanged browser capture, all file-management controls, offline/update installation, physical touch/keyboard behaviour or screen-reader testing. Repository quality checks and public deployment are recorded separately by the builder.
