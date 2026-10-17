# Independent checker — rebuilt introduction and Module 0

Copyright © 2026 Christopher Snow.

Checked 17 October 2026 by a fresh-context gpt-6.1-sol agent with high reasoning effort, as assigned by the parent. This checker did not author the lesson, the learner/sceptic findings or their fixes. I read `AGENTS.md`, `01-reader.md`, `02-sceptic.md` and `03-ranked-fixes.md`, then inspected the actual production page at `http://127.0.0.1:4173/video-lab/`. I did not use `04-resolution.md` as evidence. I changed no course source, fixtures or tests; this report is my only repository edit.

## Finding decisions

### F1 — Accepted; no unresolved correction

Construction now defines a codec before the stream diagram: “A codec specifies how a stream is encoded for storage and decoded, or reconstructed, for playback.” It then identifies H.264 and AAC and says both encodings compress the stored data. The explicit qualification, “Compression is a property of these encodings, not a requirement of every codec”, removes the generalisation identified by the reader and upheld by the sceptic.

I observed this text rendered in all five contexts below, rather than merely finding it in a content file. MP4 remains the container for both streams, and the branch codec labels remain `h264` and `aac`. The later Explanation distinguishes container organisation from each stream's representation without repeating the incorrect definition.

### P1 — Accepted; no unresolved correction

The first explorer readout now contains the local paragraph: “A timestamp tick is one unit of a stream’s clock. The time base gives seconds per tick: multiply the tick count by this fraction to obtain seconds.” It is directly beneath the first timing/dimension/rate values, inside their panel, in both the desktop two-column layout and the phone stack. The fractional-rate interpretation follows in its own paragraph. A nonzero spot check in Chromium and Firefox displayed 3072 ticks, a time base of 1/12288 and 0.25 seconds; the displayed multiplication agrees exactly.

The codec meaning appears before the diagram's first `Codec` labels. Samples and channels are introduced before the diagram, while the audio branch explains its sample rate and decoded blocks locally. The browser playback position remains separately labelled; the explorer caption and provenance paragraph identify the extracted pictures and recorded timestamps as the inspection evidence and describe the browser time estimate. The fix therefore supplies the meanings where needed without equating browser position with a reliable decoded-frame index.

### I1 — Accepted; no unresolved correction

I deliberately submitted a neighbouring frame index while keeping the other five answers correct. Each context produced exactly one failed field, whose rendered feedback says: “Move the recorded-frame slider while watching PTS, then use Previous frame or Next frame until it matches the requested time. Read the frame index; seconds and picture indexes have different units.”

After opening the first three hints, the third rendered hint likewise instructs moving the recorded-frame slider while watching PTS, then using Previous frame or Next frame until the recorded PTS matches. These controls exist and work. I followed that route through the return link, slider and next-frame button, corrected the frame field and reran the challenge. The old failure cleared on edit, the new result was “All 6 tests passed”, and completion plus the corrected answer survived reload in every context. Reference answers are intentionally omitted here.

The return link lands at the top of the explorer figure. Its frame slider can require scrolling below the player, particularly on a phone; the link does not claim to focus the slider. This is consistent with its label and is not a new defect.

### P2 — Accepted within the sceptic's narrowed scope; no unresolved correction

Investigation now separates frame/index meaning, the operating instruction, and PTS meaning into three paragraphs. Fractional-rate detail sits in the readout panel; FFmpeg/ffprobe provenance and the browser limitation sit beneath the measured evidence. Construction opens with the action and container purpose, then separates codec meaning from samples/channels. The audio-block mechanism is attached to the audio branch.

I visually inspected both whole sections in Chromium desktop/phone, light/dark, and Firefox desktop light. The instruction is easy to locate as its own paragraph. The phone still requires normal vertical reading and scrolling, but the prior uninterrupted paragraph is gone and the technical explanations remain available. The diagram stacks its branches on the phone, with readable wrapped text and controls; neither theme clips the explanations. No deletion of necessary teaching material or control redesign is warranted by the retained finding.

## Independent browser evidence

| Browser | Viewport | Theme | Completed targeted check |
| --- | --- | --- | --- |
| Chromium 156.0.8078.4 | 1440 × 1000 | light | Rendered fixes, affected controls, wrong-frame attempt, hints, correction and reload |
| Chromium 156.0.8078.4 | 1440 × 1000 | dark | Same |
| Chromium 156.0.8078.4 | 390 × 844, touch-enabled context | light | Same |
| Chromium 156.0.8078.4 | 390 × 844, touch-enabled context | dark | Same |
| Firefox 157.0 | 1440 × 1000 | light | Same |

In each case I exercised the frame range, both step buttons, keyboard left/right stepping, the first thumbnail, disabled endpoint states, both stream selections, the final one-second interval, the recorded-evidence disclosure and its visible JSON link, three progressive hints, a meaningful wrong-frame challenge, correction, completion persistence and the return link. The recorded target was located by searching the rendered PTS output, rather than calculating an answer from an assumed frame rate. The stream readout changed between video codec/picture evidence and audio sample evidence. Challenge feedback and hints were checked for visibility and captured as images, not just compared as hidden DOM strings.

Document scroll width equalled viewport width in all five contexts: 1440 or 390 pixels. No uncaught page errors occurred during these five complete targeted runs.

A supplementary Chromium/Firefox desktop-light run checked the nonzero tick conversion above, real preview play/pause, mute/unmute and all six thumbnail images after scrolling them into view. The preview advanced beyond 0.5 seconds; mute state changed as requested. Playback updates the recorded selection, whose still matches the selected index; it does not expose a native browser frame index. All six thumbnail images completed with natural width 960 in both browsers. An initial Firefox section screenshot captured lazy thumbnails before their loading; the supplementary screenshot after scrolling and waiting shows all six, so this did not survive as a regression.

Executed commands, using standalone Playwright scripts written by this checker outside the repository:

```sh
node /workspace/scratch/checker-inspect.mjs
node /workspace/scratch/checker-dom.mjs
node /workspace/scratch/checker-verify.mjs
node /workspace/scratch/checker-supplement.mjs
```

The final two commands exited 0. The five-context results are recorded in `/workspace/scratch/checker-results.json`; screenshots are `/workspace/scratch/checker-{chromium,firefox}-{desktop,phone}-{light,dark}-{investigation,construction,feedback,hints}.png` for the executed contexts, plus `checker-firefox-desktop-light-investigation-loaded.png`. These are temporary checker evidence, not committed course assets. I visually inspected all ten Investigation/Construction captures, the loaded Firefox capture and the phone-dark failure/hint captures.

Earlier exploratory script runs failed on my assumptions: an exact label lookup for a select, an incorrect evidence-link name, expecting the slider itself in the viewport after returning to the top of its larger figure, and expecting playback not to update the selected recorded picture. I corrected those assertions to match the rendered controls and their actual contract, then reran the reported checks. They are not site failures. I also read the existing browser test file to locate established control names; the independent attempt and observations above came from my own browser script.

## Limits and disposition

All four ranked findings are accepted as resolved on the rebuilt page. I found no additional substantive regression in this targeted verification.

This is headless browser emulation, not a physical-phone, screen-reader or exhaustive keyboard-only audit. Touch-enabled contexts used automation clicks and range input changes; I do not claim a physical touch gesture sweep. I did not verify deployed hosting, listen to the synthetic tone, exercise native media menus/fullscreen, follow external GitHub destinations or download the media. I did not regenerate media, repeat the native verifier or rerun the full quality suite. The builder's separately reported `npm run check` is not claimed as my execution. This check verifies the local copy/placement and guidance fixes and their affected interactions; the wider reader and sceptic coverage remains separately attributed in their reports.
