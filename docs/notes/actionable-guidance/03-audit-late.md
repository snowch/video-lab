# Later notebook pages: source audit

Copyright © 2026 Christopher Snow.

Read `AGENTS.md` and `01-plan.md`, then all authored text in the 15 pages below, in the order declared by `src/notebook/structure.ts`. Checked their worked/starter/solution commands, assets, expected checks and native script in that structure file. Also read the prerequisite inspection, stream-copy and join pages, `copy-types.ts`, chapter summaries, and the relevant source/result/native-script rendering in `Notebook.tsx` and `Cell.tsx` to distinguish absent teaching from an available app control.

This is a source audit by a separate agent. It is not a built-site learner, sceptic or checker review. No production edits, tests or commits were made for this audit.

## Coverage: 15 pages

| Order | Page | Result |
| --- | --- | --- |
| 1 | `framing/scale` | No material gap: supplied dimensions and automatic-height rule; same-size comparison names fine edges, texture and proportions. |
| 2 | `framing/crop` | No material gap: supplied crop values and centring behaviour; compare lost objects/background and follow the entire action. |
| 3 | `framing/pad` | No material gap: explains scale-before-pad and position arithmetic; check scene edges, bands and centring. |
| 4 | `sound/level` | No material gap: supplied multipliers; fixed device volume and same-passage comparison isolate the intended observation. |
| 5 | `sound/fade` | No material gap: start plus duration gives silence time; compare specified seconds at unchanged volume. |
| 6 | `text/title` | No material gap: word, font, size and colour supplied; inspect readability as the background changes. |
| 7 | `text/subtitles` | No material gap: file format, editor location, font and cue times taught; check exact visibility intervals and edited words. |
| 8 | `quality/quality` | No material gap: three prescribed CRF values; Lsize, same-scene texture/edges and sound supply an observable basis for the learner's preference. |
| 9 | `quality/speed` | No material gap: prescribed presets and fixed CRF; explains speed units and asks for measured sizes/rates and moving edges. |
| 10 | `export/format` | Retain finding L1: external delivery test is prescribed without teaching the procedure. |
| 11 | `export/faststart` | No material gap: exact layout/copy log messages; explicitly limits what local replay establishes. |
| 12 | `export/verify` | No material gap: JSON object locations and units are taught; hints name every requested field. |
| 13 | `export/decode` | No material gap: stream mapping, final time and completion status form the stated test; content and other-player limits are explicit. |
| 14 | `workflows/reuse` | No material gap: create folder in Files first; names exactly which job values change and how to verify source/content. |
| 15 | `workflows/batch` | No material gap: browser exercise is complete; optional native exercise declares its environment and explains the whole script. |

## Ranked retained finding

### L1 — Medium: export delivery still assumes the learner knows how to test a receiving app

Evidence: `src/notebook/pages/export-format.ts:51` says:

> “This combination is widely supported. Playback here confirms that this browser can play this file; test the actual destination player before delivering an export.”

The check limitation at line 67 repeats:

> “Confirm yuv420p and AAC in the output log; replay with sound and test your destination player separately.”

The page gives a defensible concrete starting point: H.264 through libx264, AAC audio and yuv420p in MP4. Its four-second practice also already asks the learner to verify the intended start and end in this browser. The unshown step is carrying that test to the app, device or service that will receive the export. Neither the explanation nor the hints identify the receiving context, say to download and open/import/upload the file there, or state which observations count as success there. `Cell.tsx` supplies a result Download button, so this needs teaching copy rather than a new control. The optional codec-guide link is present but does not make the nearby instruction self-explanatory.

Direction: retain the command and practice. Explain that the receiving app/device/service means where the learner or recipient will actually watch, import or upload the video. Tell the learner to download the short export, open/import/upload it there, and check recognisable picture, audible sound and intended start/end. Bound the conclusion to the tested file and receiving setup. If published submission rules apply, use the codec guide for locating them and relating codec/container/dimensions/size limits to inspection; avoid making every export require an open-ended research task. Replace the repeated abstract destination reminder with a concise reference to the taught procedure.

This is the same underlying gap as the primary codec-guide issue, appearing in a main-path lesson. It does not justify rewriting the other export exercises or adding a compatibility database.

## Rejected candidates and why

- **Quality preference is not unexplained guessing.** `quality/quality` asks whether a smaller file saves enough space to justify visible loss, but first supplies CRF 18/35/26, Lsize, same-moment comparisons, moving/detailed regions, softened texture and changed edges. The final preference is intentionally qualitative; a universal acceptable-quality threshold would defeat that exercise.
- **Encoder presets are not an unbounded selection task.** `quality/speed` prescribes ultrafast and fast, fixes the source and CRF, explains Lsize and processing speed, and explicitly says repeated comparable runs are needed for useful timing evidence. It does not demand knowing the best preset in advance.
- **“Judge whether” in framing is supported.** The crop page asks whether the remaining view makes the action clear after telling the learner to identify lost objects/background and follow the full motion. Scale and pad similarly name edges, proportions, full field of view and placement. No generic replacement of comparison language is warranted.
- **Sound checks do not pretend metadata measures loudness.** Both sound pages give concrete listening conditions and time ranges. The level page asks the learner to check the exact multiplier and states that automatic checks do not measure gain/loudness. The fade page explains why a mathematically complete fade can still cut across a musical phrase; no separate musical-analysis assignment is required.
- **Text readability has an observation criterion.** Both title/subtitle pages ask the learner to watch lettering against the changing scene. The title task supplies font size and colour rather than asking them to invent a typography standard. A full contrast/style tutorial is outside this exercise.
- **Faststart does not outsource a network test.** The goal is metadata placement; the page supplies the exact second-pass and stream-copy messages as evidence and explicitly says local replay cannot demonstrate network startup. It does not ask learners to measure a benefit without tools.
- **Structured inspection does teach field selection.** `export/verify` names `codec_type`, `codec_name`, video width/height, audio `sample_rate`, and `format.duration`/`format.size`; the hints explain their locations and seconds/bytes. The comparison has specific shorter/smaller questions.
- **Decode limitations are appropriate.** `export/decode` teaches which streams were selected, the expected processing endpoint and completion status. Its warning that this cannot establish another player's compatibility is a truthful limit, not a missing external test assignment on this page.
- **Native shell prerequisites are explicit and optional.** `workflows/batch` declares a POSIX shell and installed FFmpeg, tells the learner to download script and sources into a dedicated folder, gives `sh previews.sh`, explains every shell construct and FFmpeg flag, and separates browser verification from terminal results. “Different sources may need different edits” follows explicit picture/sound/framing checks and is a bounded caution; the required browser practice only inspects the two known files. No native installation guide or general-purpose batch framework is needed for this slice.
- **Workflow reuse has a starting point.** The source note tells the learner to create `previews` with Files → New folder; commands and hints specify input, duration, size and distinct output path. Its preservation/download advice is accompanied by existing controls, not an assumed storage mechanism.

Only L1 meets the requested material assumed-decision/how-to-verify threshold among these 15 pages.
