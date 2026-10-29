# Independent post-fix built-site check

Copyright © 2026 Christopher Snow.

29 October 2026. Separate checker session; did not author the product changes, lesson prose or ranked fixes. Read `AGENTS.md`, `05-reader.md`, `06-sceptic.md` and `07-fixes.md`. Inspected the completed, stable built copy served from `/workspace/scratch/resolution-audio/review-dist` at `http://localhost:4193/video-lab/`. No product files were edited and no commit was made by this checker.

## Result

**R1 is resolved. No remaining blocker or additional product finding was established.** The persistent HTML legend identifies all three nested outlines as smallest, middle and largest, with their 480p/720p/1080p labels and exact stored dimensions. It remains present for every selection. Its text wraps readably at 320 CSS pixels with the root font enlarged to 200% in both themes: each item has a computed 32-pixel font and equal client/scroll width of 206 pixels. Inspected the enlarged legend screenshots directly; neither clipping nor horizontal scrolling was present.

The live selected output and SVG rectangle agree at all settings: 854 × 480 = 409,920; 1280 × 720 = 921,600; 1920 × 1080 = 2,073,600 pixels per frame. The three comparison outlines have those same dimensions under the shared 1920 × 1080 viewBox. The visible definition states that the number in 720p is frame height and p means progressive scan, with each frame a complete picture. The calculated-model caveat remains visible. Guidance continues to state the 854 × 480 source limit, conditional destination choices and short-export testing; it does not present the rectangles as measured picture quality, promise HD/UHD original detail from upscaling, or equate more pixels with a fixed compressed file-size increase.

## Built-page coverage

Chromium covered resolution, frame-rate and sample-rate routes at 1440 × 1000 and 390 × 844 in light and dark: **all twelve route/viewport/theme combinations passed**, with document scroll width equal to viewport width. All three routes also passed 320 × 800 with 200% root text in both themes. Full-page screenshots and text were captured for every combination; selected desktop, phone and enlarged-text captures were visually inspected. Firefox additionally covered the resolution selector by keyboard, frame-rate separation and the complete live sample-rate lab at 1440 × 1000.

Both desktop and phone resolution/sample selectors accepted Arrow/Enter keyboard input. The audio model produced 8/16/32 dots over the unchanged 2 ms interval at 4000/8000/16000 samples/s, with spacing 0.25/0.125/0.0625 ms; its smooth curve was unchanged. The invented one-channel signal and non-recommended low model rates remain explicit. The frame-rate route contains no sample-rate model or audio-sample-rate teaching section. The new audio page is Chapter 3 page 2/3, between the frame-rate and timestamp pages. The actual glossary Audio sample rate link opens the new route. Clicked all four resolution practice/continuation links and confirmed their real destination headings; tested audio-to-timestamps continuation and browser back/forward.

On desktop and phone, verified source replay, source play/pause/seek, editable commands, keyboard Shift+Enter execution, command copying and downloading, actual output audio play/pause/seek and notes. Changed the worked audio builder's `-ar` value to 22050, applied it to the fully visible command, then restored/applied 24000 before execution. All five practice hints and the reference command disclosure opened. A saved existing frame-rate worked-cell draft changed to `fps=10` survived visiting the new audio route, reloading and returning to its original route.

## Actual processing and output evidence

Ran the genuine WASM worked encode, bare `ffprobe resampled.wav`, wrong-rate practice and corrected practice in **Chromium at phone size and Firefox at desktop size**. Automatic setup fetched the required practice source and reached ready state without requesting encoder assets before Run. The worked output and raw probe reported four seconds of PCM audio at 24000 Hz. Raw tool output remained separate from app feedback.

The untouched practice starter produced a real output and failed with `✗ Audio sample rate: expected 16000 Hz per channel; found 24000`. Editing the command made the old check unavailable until rerun. These independently executed commands then passed the four actual-artifact checks:

```text
ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 chromium-checker.wav
ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 firefox-checker.wav
```

Each check reported actual duration 4.000000, audio present, no video and 16000 Hz per channel. Downloaded both generated WAVs and independently inspected them with native `ffprobe -hide_banner FILE` and `ffprobe -v error -show_streams -show_format -of json FILE`. Each contains exactly one `pcm_s16le` audio stream, 16000 samples/s, two channels, and duration 4.000000. No page errors were observed during either full processing sequence. Separate playback checks confirmed the worked audio has a four-second duration and working controls, and the source has an eight-second duration and working controls.

No subjective listening or pitch comparison is claimed by this headless-browser check. The page correctly distinguishes that learner judgement from metadata verification, and does not claim that resampling necessarily improves quality, changes loudness, speeds the sound or guarantees identical audible detail.

## Reproducible checker evidence and limits

Scratch artifacts are outside the repository at `/workspace/scratch/resolution-audio-checker/`. Commands run successfully:

```text
node /workspace/scratch/resolution-audio-checker/check.mjs
node /workspace/scratch/resolution-audio-checker/detail.mjs
node /workspace/scratch/resolution-audio-checker/processing.mjs
node /workspace/scratch/resolution-audio-checker/supplement.mjs
```

`layouts.json` records the twelve combinations, model dimensions, enlarged checks and saved draft. `legend-enlarged.json` plus `legend-320-200-light.png` and `legend-320-200-dark.png` record R1 readability. `processing.json`, both `*-wrong-rate.txt`, `*-passed.txt`, `*-raw-probe.txt`, downloaded `*-checker.wav` and `*-native-probe.json`/`.txt` record the actual command, rejected rate, passing checks and independent native measurements. `supplement.json` records keyboard execution, clipboard, media controls, all four appendix destinations and glossary/history navigation. The three final script logs report success.

The preview initially refused IPv4 connections because direct Vite preview was bound to localhost/IPv6; using its actual `localhost:4193` address resolved this setup issue. This was not a product defect. Initial supplementary-script locator assumptions were corrected to the existing controls, then the complete scripts passed. This check is the post-fix content/interaction review, not the repository-wide `npm run check`; the coordinator records that separate quality gate.
