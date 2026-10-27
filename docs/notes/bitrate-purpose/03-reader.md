# Independent learner review: bitrate purpose and container inference

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 at the built preview `http://127.0.0.1:4173/video-lab/`.
This reviewer did not draft or edit the product. I read the rendered Chapter 2
and Chapter 8 pages before reading the verified media brief or native measurements.
I did not read the proposed copy or author rationale to decide these findings.

## Learner verdict

No blocking or medium-severity finding in the requested slice. The built pages
now answer what the reader-name list proves, why bitrate matters, what lowering
or raising it can mean, and where practical encoding choices are taught later.
No product fixes are requested by this review.

| Question | Built-page evidence | Severity / direction |
| --- | --- | --- |
| Does the list prove MP4? | “FFprobe uses one reader for MP4 and related formats, including MOV and 3GP, and prints that reader’s format names here. The list alone does not identify the exact container. We supplied this practice file in MP4 format.” | None. Retain the distinction between the reader’s names and the known practice-file format. |
| What is bitrate? | “The whole-file bitrate describes the data used per second of playback, including pictures, sound and container information.” The next sentence explains kb/s and the example’s approximate bits per second. | None. This explains both the quantity and the unit before using them. |
| Why would I care? | “For the same duration, a higher bitrate means a larger file to store or download. Streaming a higher-bitrate file generally needs a faster connection.” | None. Storage, download and connection consequences supply a practical purpose at the point of inspection. |
| What happens at lower/higher values? | “A lower bitrate saves data, but stronger compression can reduce picture or sound quality. Higher bitrate does not automatically mean better quality: the source, codec and encoding settings also matter.” | None. The conditional wording avoids promising that a bigger file necessarily looks better. |
| Is the practical choice taught later? | Chapter 2’s “More on codecs and compression (optional)” links to “Chapter 8: Choose an encoding quality setting”. The target explains CRF, shows matched detail crops and measured whole-file sizes, then asks for CRF 18, 35 and 26 outputs. | None. Optional navigation reaches a real lesson with a decision to make. |
| Does Chapter 8 connect back to bitrate? | “Both outputs have the same duration, so the larger file has the higher average whole-file bitrate: more data per second of playback.” Practice asks which version the learner would keep and what detail influenced the choice. | None. The equal-duration qualification makes the size-to-rate comparison understandable. |

## Prerequisites and amount of explanation

I also read the two preceding Chapter 1 pages in the built site. They establish
input/output files, duration, editing the command, `-i`, `-t` and a separate output
filename. Chapter 2 defines streams, container, codec, frame, dimensions, ffprobe,
stream numbering and bitrate itself. Understanding the revised bitrate passage
does not require prior knowledge of CRF or encoding flags.

An optional visitor from Chapter 2 can read the opening of Chapter 8: it defines
lossy compression and encoder, identifies libx264 as producing H.264, explains
CRF’s direction, and explicitly says CRF is a quality target rather than a bitrate
or exact-size target. `-c:v` and `-crf` are explained beside their commands. The
“re-encoding cannot restore detail already lost” sentence also prevents reading
the larger CRF 18 output as evidence of improvement over its compressed source.

The Chapter 2 explanation has three short bitrate paragraphs: quantity/unit,
size/network consequence, quality tradeoff. They address distinct learner
questions. Chapter 8 repeats the equal-duration size/rate relationship beside
the comparison and once in independent practice; this is task guidance, not a
redundant wall of new theory. I do not recommend adding bitrate formulas,
container-brand internals or extra encoding flags to this slice.

## Built controls and viewing conditions

Standalone Node scripts imported
`/workspace/video-lab/node_modules/playwright/index.mjs`; no Playwright CLI was
run. Evidence scripts and outputs are in
`/workspace/scratch/bitrate-purpose/reader/`.

- Both routes at desktop 1440 × 1000 and phone 390 × 844, in light and dark,
  at normal text and 200% root font size (16 → 32 px): sixteen full-page
  screenshots and `matrix.json`. The recorded `data-theme` confirms the actual
  theme. All document widths equal the viewport; no page horizontal scrolling.
  Closed App status descendants have off-screen rectangles in a few measurements;
  they are hidden content and do not cause document overflow or lesson clipping.
- Visual inspection of the rendered pages, including dark desktop and enlarged
  phone captures, found readable lesson text, stacked phone comparison images,
  wrapping command cells and reachable controls. Example focused evidence:
  `quality-desktop-dark-100.png`, `inspect-phone-dark-200.png`, and
  `quality-phone-dark-200-context.png`.
- Loaded practice files, ran actual ffprobe cells on both sources, switched
  command builder/edit mode, used the inspection hint and reference command,
  and clicked the inspection check. It reported “An actual ffprobe inspection
  of the unchanged input is recorded” and “The checked properties match.”
- Followed the actual optional Chapter 8 link on desktop and phone. The target
  route was `#/learn/quality/quality`. Switched its first command builder/edit
  control as well.
- Phone: ran inspection, enabled output wrapping, copied `ffprobe bunny-short.mp4`
  and downloaded its `.sh` command; see `phone-controls.json` and
  `phone-inspect-command.sh`.
- Ran both supplied browser CRF commands and edited the independent practice to
  CRF 26. Raw completed logs show final `Lsize` values of 670 kB, 287 kB and
  441 kB respectively, each at eight seconds, with separate output files and
  replay/download controls. The quality check was invoked, but the captured
  snapshot still said “Working”; this review does not claim its eventual result.
  `controls.json` contains the actual raw-output snapshots. No listening assessment
  or subjective full-motion quality judgement is claimed from this headless run.

## Independent native check

After the learner read, I consulted `docs/notes/visual-teaching/02-facts.md` and
`/workspace/scratch/bitrate-purpose/native.json`, then ran these actual commands
from the repository root (the `-y` flag only permits replacing review artifacts):

```sh
ffprobe public/media/notebook/bunny-short.mp4
ffmpeg -y -i public/media/notebook/bunny-short.mp4 -c:v libx264 -crf 18 /workspace/scratch/bitrate-purpose/reader/native-crf18.mp4
ffmpeg -y -i public/media/notebook/bunny-short.mp4 -c:v libx264 -crf 35 /workspace/scratch/bitrate-purpose/reader/native-crf35.mp4
ffprobe -v error -show_entries format=duration,size,bit_rate -of json /workspace/scratch/bitrate-purpose/reader/native-crf18.mp4
ffprobe -v error -show_entries format=duration,size,bit_rate -of json /workspace/scratch/bitrate-purpose/reader/native-crf35.mp4
```

The native probe repeats the displayed reader family, eight-second duration,
352 kb/s whole-file rate and H.264/AAC streams. The two fresh native outputs are
683,879 and 296,097 bytes, both exactly eight seconds; their reported average
whole-file rates are 683,879 and 296,097 bits/s. This agrees with the explanation
that the larger equal-duration file has the higher average whole-file bitrate.
The different fresh sizes versus supplied native illustrations are consistent
with the page’s explicit encoder-build qualification; the illustrations do not
claim to measure the learner’s run. Logs are `native-probe.txt`,
`native-crf18.log` and `native-crf35.log`.

The parent will run the full repository quality gate separately. This report is
a scoped learner review and native/browser evidence, not a full gate declaration.
