# Built-page reader and browser execution evidence

Copyright © 2026 Christopher Snow.

Reviewed on 6 November 2026 by an agent separate from the prose author. This agent
produced the browser evidence and regression test described below; those checks
are not presented as an independent review of its own test implementation. A
separate sceptic and final checker review the result.

## Reading review

Inspected the built `#/learn/frames-time/rate` lesson in Chromium at 390 and 1365
CSS pixels, light and dark themes. Captured and visually inspected the practice
panel in all four combinations. The task states “the opening four seconds at
1 frame per second, with sound”; the comparison states “four video frames in
total, each shown for one second”. These give the learner both the requested
change and the visible effect to seek. The wording distinguishes larger jumps
between pictures from slowing down the scene or sound.

The preceding worked command remains at 12 fps, and the practice editor still
starts at 12 fps for the learner to change. That is consistent with the exercise;
it is not evidence that the new target failed to load. The existing definition
and worked filter explanation introduce the frame-rate mechanism before the
practice. The fourth and fifth hints now identify `fps=1`; no new unexplained
command option is introduced. No additional reading or layout defect was found
within this focused review.

There was no horizontal document overflow. Keyboard Tab from the practice editor
retained visible button focus. A manually entered six-fps draft survived reload
in all four combinations, confirming that the update does not silently replace a
learner's saved command.

Command: `node /workspace/scratch/one-fps/reader.cjs` — passed four viewport/theme
probes. Screenshots are `practice-{390,1365}-{light,dark}.png` and measurements are
`reader.json` in that directory. The final separate checker covers additional
states and enlarged text.

## Genuine browser output

Executed this command in the actual built practice cell using the pinned WASM
core, then used the app's technical check and downloaded its real output:

```sh
ffmpeg -i bunny-short.mp4 -t 4 -vf "fps=1" practice-rate.mp4
```

`commands-wasm.json` records the actual saved CellRecord/RunRecord, raw FFmpeg log,
input and output hashes, native count-frames probe, playback state and decoded
sound measurement. The downloaded file's SHA-256 matched the RunRecord:
`d86f54dce07a0c06d7c6b9f38ca9552b13cca8269f0f072d72c16fde2f5999cc`.
Historical six-fps evidence was left intact.

Native `ffprobe -count_frames -show_streams -show_format -of json` measured:

- H.264 video, average rate `1/1`, four decoded pictures, duration 4.000000 seconds;
- AAC audio, duration 4.000000 seconds;
- container duration 4.000000 seconds.

Native FFmpeg fully decoded the output without an error. Decoded mono audio had
RMS 0.03334698 (approximately -29.54 dB), so the retained stream contains sound
samples rather than silence. This measurement alone does not establish identical
sound content or pace; the separate sceptic's comparison addresses that question.

Chromium playback was unmuted at volume 1, advanced beyond one second and reached
`currentTime: 4`, `duration: 4`, `ended: true`, `readyState: 4`. These are actual
browser playback observations. They do not certify audible output on a physical
phone or every device/browser combination.

Evidence script: `/workspace/scratch/one-fps/evidence.cjs`. Downloaded output:
`/workspace/scratch/one-fps/practice-rate.mp4`; playback details: `playback.json`.
The method and tool version are also retained in `commands-wasm.json`.

## Acceptance and rejection regression

Added a focused browser test to `tests/sample-rate.spec.ts`. It executes and
checks three genuine outputs: the former six-fps answer is rejected for its rate;
a one-fps output without audio is rejected for the missing stream; a one-fps
output with sound is accepted. The accepted downloaded file is independently
probed for four decoded pictures, `1/1` rate, two streams, and four-second video,
audio and container durations.

After the final singular “1 frame” check-label correction, ran:

```sh
npx playwright test sample-rate.spec.ts --grep 'picture-rate practice' --config /workspace/scratch/one-fps/playwright.config.ts
```

Result: **2 passed in 15.3 seconds**, Chromium desktop-light and Firefox. The
scratch configuration inherits the repository settings and omits only the
unrelated alternate-release global setup; it isolates output under this slice's
scratch directory. Exact configuration and final log are retained there as
`playwright.config.ts` and `test-run-final.log`. The parent agent owns the full
quality-gate result. No broader-suite success is claimed by this note.
