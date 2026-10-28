# Stream option labels — independent final checker

Copyright © 2026 Christopher Snow.

28 October 2026. Separate checker; no product edits, builds, command test runs, new encodes, commits, merge or push. Reviewed the existing built page at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/streams` **before** reading the facts, prose, reader, sceptic and resolution notes. Initial rendered text and screenshot are preserved as `first-read.txt` and `first-read.png` under `/workspace/scratch/stream-option-labels/checker/`.

## Decision and first reading

No finding or further fix required within this small presentation change.

On the first read, the diagram clearly describes two independent choices from `bunny-short.mp4`. Each path begins “From bunny-short.mp4”, then names its option and absent stream, its own output filename, and the retained stream:

- `-an — audio: none` → `silent.mp4`, “Video only”.
- `-vn — video: none` → `sound.wav`, “Audio only”.

The source container above contains both streams. “Both commands read the original file. The source stays unchanged.” reinforces that neither output becomes the next command's input. The phone's stacked layout retains the repeated source label and separation; no connecting arrow suggests a sequence between the two results. The mnemonic and retained-stream labels complement each other: “audio: none” explains what is absent, while “Video only” states what remains. The page also explains the difference between an absent audio stream and recorded silence. No unshown technical prerequisite was introduced by this change.

## Built layout coverage

Ran the independent external script:

```sh
node /workspace/scratch/stream-option-labels/checker/check.mjs
```

All eight Chromium cases passed: desktop 1440 × 1000 and phone 393 × 851, each light/dark, at normal and 200% document CSS zoom. Asserted the exact two path texts, document width equal to viewport width, and no diagram scroll-width overflow. Captured each complete diagram. Inspected the initial desktop-light full-page screenshot and the desktop-light/phone-dark doubled-size diagram screenshots. The enlarged phone labels wrap without clipping; both repeated source identities and destination filenames remain legible. These checks use doubled document CSS zoom, not browser-menu zoom or physical pinch zoom.

Evidence: external `check.mjs`, `results.json` and eight named PNGs in `/workspace/scratch/stream-option-labels/checker/`. All generated artifacts remain outside the repository.

## Facts and scope confirmation

After the first read, reviewed notes `01`–`05`, the complete three-file product diff, the unchanged command definitions and existing native/browser command records. The product diff is confined to `InspectDiagrams.tsx`, `inspect.css` and `inspect.strings.ts`; no command, media, measurement, processing or notebook persistence change appears. The existing records independently agree with the labels: the `-an` example writes one eight-second H.264 video stream, and the `-vn` example writes one eight-second PCM audio stream. Both browser records have status 0. A concise extraction is saved in external `existing-facts.json`. These are inspected prior execution records, not new encodes by this checker.

No reader or sceptic finding requires resolution. The reader disclosed reading the fact brief first; this check supplies the requested separate page-before-notes reading. The approved mnemonic wording does not claim a formal expansion of either option name. The source labels and unchanged full commands make the independent paths explicit.

This proportional check covers the changed static diagram, surrounding explanation, existing fact agreement and responsive presentation. It does not claim full-course, assistive-technology, other-browser or new command execution coverage. No interactions changed, so none were rerun. The parent owns the still-running full gate and branch-only delivery; this record does not declare its outcome or authorise merging or pushing.
