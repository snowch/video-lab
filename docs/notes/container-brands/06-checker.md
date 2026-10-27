# Independent built-page checker

Copyright © 2026 Christopher Snow.

Checked 27 October 2026 by a separate checker agent that did not author or change the product. Read `01-facts.md`, `03-reader.md`, `04-sceptic.md` and `05-resolution.md`, then inspected the actual built app at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect` and `#/learn/export/format`. No product edits or commits were made.

## Result

Pass for the approved slice. No unresolved finding or requested product fix.

| Requirement | Built evidence and assessment |
| --- | --- |
| Demuxer defined when needed | The main inspection introduction says “It uses a **demuxer** to read the container and make its individual streams available.” Container, streams and codecs precede this definition. It does not claim decoding or writing separate files. |
| Contextual optional brands explanation | One native `details` starts closed. It is directly inside the Input row's explanation, after the warning that the shared format names do not identify an exact container. It introduces “The supplied file’s Metadata” and shows `major_brand     : isom` and `compatible_brands: isomiso2avc1mp41`. The four existing main guide rows remain. |
| Accurate local explanation | Four-character codes, primary and compatible declarations are explained. The text explicitly says `isom` does not uniquely identify MP4, identifies `mp41` as MP4 version 1 compatibility, distinguishes specifications from streams, and says declarations alone do not verify conformance. |
| Authoritative optional reference | Accessible link text is exactly “MP4 Registration Authority brand registry (external)”; href is exactly `https://mp4ra.org/registered-types/brands`. Its connection requirement is stated locally. |
| Muxer tied to the export | The export explanation distinguishes the libx264/AAC encoders from the muxer, defines muxing as writing streams into a container, and ties `.mp4` selection to the actual shown `compatible.mp4` command. |
| Existing commands and scope | Built command values remain the existing ffprobe inspection commands and FFmpeg exports. The source diff changes explanations, the native disclosure and relevant verification only; no command declaration or storage implementation change was found. No encode or storage lifecycle test was repeated. |

## Interaction, layout and offline checks

Ran the independent standalone Node Playwright script:

```sh
node /workspace/scratch/container-brands/checker/check.mjs
```

It passed without invoking Playwright CLI or duplicating the builder's full gate.

- Desktop 1440 × 1000 and touch-enabled phone 320 × 844; both routes; actual `html[data-theme]` light and dark; computed root text 16 px and 32 px. All 16 combinations had document width equal to viewport width. Saved visual evidence was inspected across both themes, devices and routes, including enlarged text. The prose remains readable and code wraps within its block. At the narrowest doubled-text size, long metadata identifiers wrap across lines without hiding their contents.
- The disclosure began closed on each device. Enter and Space each opened and closed it, pointer clicks opened and closed it, and phone taps opened and closed it. The visible keyboard focus outline is retained.
- Disabled networking after loading the inspection route. The disclosure still closed, reopened and displayed its complete explanation on both devices. No external requests were observed while reading these pages. This verifies the local explanation after load; it does not claim a fresh cold offline installation or successful offline access to the registry.

Artifacts: `/workspace/scratch/container-brands/checker/check.mjs`, `results.json`, extracted route/disclosure text, and route/disclosure PNG screenshots under `/workspace/scratch/container-brands/checker/`. `results.json` records actual viewport/document widths, root sizes, themes, command values, interaction results, link destination and offline-after-load observations.

This focused checker confirms the learner/sceptic resolution against the built UI. The builder's separate full quality gate and publication evidence belong in the subsequent record; this report does not claim to run them.
