# Stream option labels — independent sceptic review

Copyright © 2026 Christopher Snow.

28 October 2026. Separate technical reviewer; no product edits, build, test CLI, new encodes, commits or merge. Scope is the three changed inspection-diagram files and their fact/copy records.

## Evidence and decision

No technical finding established. `src/notebook/structure.ts` retains the exact commands `ffmpeg -i bunny-short.mp4 -an silent.mp4` and `ffmpeg -i bunny-short.mp4 -vn sound.wav`; each independently reads the original source. The unchanged authored option notes define disabling audio/video **in the output**, and take no option value.

Existing native `docs/notes/notebook/commands.json` records the first result as one eight-second H.264 video stream and the second as one eight-second PCM audio stream. Existing actual-browser `commands-wasm.json` records status 0 and the same stream presence/duration for both exact commands. These are prior verified results, not newly executed encodes in this review. The diagram's “Video only”/“Audio only” labels agree with that evidence. The approved “audio: none”/“video: none” strings work as memory aids; the copy does not claim they are formal option-name expansions or source mutations.

Inspected the actual built route `#/learn/inside-video/streams` on the reader's port 4182 using standalone Node Playwright, then visually inspected figure screenshots. Desktop light (1440 px) has two sibling columns; phone dark (393 px) stacks those siblings. Each begins “From bunny-short.mp4”, then its correct flag/mnemonic, destination arrow/filename and retained stream. There are no arrows connecting one result to the next. The source container still contains both streams, and the note states: “Both commands read the original file. The source stays unchanged.” The repeated original-source labels preserve independence when stacked.

Both screenshots show legible, unclipped labels. Document width equals viewport width in both checks. The removed `.visual-source-arrow` selector has no remaining source references, so its removal does not affect another diagram. This bounded DOM/screenshot check makes no claim about new keyboard interactions; the changed diagram adds none.

Independent check script, DOM observations and screenshots: `/workspace/scratch/stream-options/sceptic/check.mjs`, `results.json`, `desktop.png`, `phone.png`. Existing commands, media, notebook records, measurements and other diagrams are unchanged in the reviewed diff. Parent verification and built-site reader/checker records remain separate.

## Reader findings

Read the completed `03-reader.md`: no findings or fixes were proposed, so none require acceptance or rejection. Its observed flag/output pairings, explicit repeated source, stacked-path independence and lack of overflow agree with the actual built diagram and existing command evidence. The distinction between doubled document CSS zoom and browser/pinch zoom is stated correctly; no broader zoom claim is warranted.

The reader read the fact/copy brief before the page, so its interpretation was informed rather than blind. That limitation is explicitly recorded and does not invalidate the reported visual observations. The parent's separate checker will inspect the actual page before the notes. This sceptic's independent source/built-diagram checks establish no technical fix requirement; no product changes are requested.
