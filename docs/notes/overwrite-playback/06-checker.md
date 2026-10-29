# Overwrite playback: independent built checker

Copyright © 2026 Christopher Snow.

29 October 2026. Separate checker agent; did not author the fix or change product code. Read AGENTS.md and notes 01–05. Tested the fixed built app at `http://127.0.0.1:4198/video-lab/` using real pinned FFmpeg WASM through normal command cells and Files controls. No processing adapter or generated-media stub was used. Scratch evidence is under `/workspace/scratch/overwrite-audio-checker/`.

## Result

No blocking lifecycle or preview regression found. The unchanged source keeps its resource, changed bytes replace retained players, old resources stop and detach before URL revocation, and synthetic errors on retired players cannot hide the replacement. The clarified same-name 8000 → failed 6000 → 8000 sequence recovers in the controlled failure test. This does not establish that the reported physical device's 6000 Hz silence has been reproduced or its audio output repaired.

## Independent Chromium evidence

`node /workspace/scratch/overwrite-audio-checker/check.mjs` completed successfully. Its first attempt stopped because the scratch assertion selected both app dialogs; narrowing that assertion to the open dialog fixed the harness. The complete rerun passed. `check.log` and `evidence.json` record the final run.

- **Unchanged source:** played `bunny-short.mp4` through a connected MediaElementSource/AnalyserNode, ran real `ffprobe bunny-short.mp4`, and dispatched window focus to invoke the app's actual refresh handler. The same DOM node and URL remained; currentTime advanced from 0.5 to 2.310667 seconds, paused remained false and maximum sampled RMS after inspection was 0.0130253. The AudioContext stayed connected throughout this measurement.
- **Equal-size changed content:** generated four seconds of 16000 Hz PCM using `ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 checker.wav`, then overwrote the same filename using `ffmpeg -y -i bunny-short.mp4 -t 4 -vn -ar 16000 -af "volume=0.25" checker.wav`. The Files preview stayed open in another window. Both downloads are 256078 bytes, with different SHA-256 hashes; the replacement has a new URL and HTMLAudioElement. Maximum sampled live RMS changed from 0.0325144 to 0.00854894. A synthetic error on the retired player left the replacement visible and playable.
- **Clarified sequence:** generated the same four-second `checker.wav` at 8000, 6000, then 8000 Hz. All naturally produced signal in desktop Chromium, with maximum sampled RMS 0.0325133, 0.0331550 and 0.0325133, and clocks advancing 0.816, 0.811 and 0.822 seconds. After measuring 6000 Hz, deliberately dispatched an error on that current player and confirmed the existing download fallback. The next 8000 Hz overwrite mounted a fresh player and recovered. Its bytes match the first 8000 Hz output exactly (SHA-256 `a1f90fa24d79657187709bf210a25c95f3b0b392433cd94b59c882f2a752d0b1`). Errors dispatched afterwards on retired nodes did not hide it. The simulated error is a state-recovery test, not a natural decoder failure.
- **Actual cleanup order:** instrumented media `pause()`, `removeAttribute("src")`, `load()` and `URL.revokeObjectURL`. At each of eight revocations with a matching retired audio/video node, the last three operations on that node were pause → remove src → load. At revocation each was disconnected, paused, had no src attribute and readyState 0. Chromium sometimes still exposed the old currentSrc string; this checker does not claim currentSrc is synchronously cleared.
- **Changed video:** generated `checker.mp4` with copied video and AAC audio at 16000 Hz, then overwrote it with 8000 Hz AAC. The retained Files preview received a new video element and URL; synthetic old-node errors did not affect it. Live RMS was 0.0334750 before and 0.0334784 after replacement, with advancing clocks. Its retired node passed the same cleanup audit.
- **Other preview branches:** real FFmpeg produced `checker.png`, displayed complete at natural size 854 × 480 with filename alternative text. `ffprobe -v error -show_streams -of json -o checker.json bunny-short.mp4` produced an inline FilePreview `<pre>` whose JSON parsed and contained the actual video stream, directly exercising the text-preview branch rather than the Files text editor. An imported unsupported `.bin` showed the existing download fallback; selecting the saved audio afterwards produced RMS 0.0325133.
- **Controls and layout:** Shift+Enter executed the real commands; Enter opened Files and selected a file, and Escape closed Files. Pixel 7 emulation used tap for source replay, Files and audio-file selection. Desktop 1440 × 1000 and phone 412 × 839 were checked in light and dark. Document width equalled viewport width in all four combinations; native audio and video controls fitted the dialog. Independently inspected the four viewport audio screenshots. `visual.mjs`, `visual.json`, `*-audio.png` and the full-page screenshots record this pass. No Chromium page errors occurred.

## Saved bytes and native decoding

Downloaded each checked audio output and the replacement video through the app UI. Native `ffprobe -v error -show_streams -show_format -of json FILE` confirmed stereo PCM signed 16-bit WAV at the requested 16000/8000/6000 Hz rates and exactly four seconds. The replacement MP4 contains H.264 and 8000 Hz AAC, with container duration 4.083333 seconds.

Native FFmpeg version `7.1.5-0+deb13u1` decoded every downloaded artifact successfully using `ffmpeg -hide_banner -i FILE -vn -af volumedetect -f null -`. Normal WAVs measured mean −31.7 dB/max −16.0 dB; the equal-size quarter-volume WAV measured −43.8/−28.0 dB; replacement MP4 measured −31.8/−16.0 dB. `native-levels.json`, downloaded artifacts and `evidence.json` retain the exact results. These checks establish actual non-silent saved content independently of browser player state.

## Qualified Firefox check

`node /workspace/scratch/overwrite-audio-checker/firefox-metadata.mjs` passed. It independently ran real WASM 8000 → 6000 → 8000 same-name generation, retained Files in another window, checked fresh nodes/URLs, detached paused retired nodes and stale-error isolation, deliberately failed the current 6000 Hz preview, and confirmed the next 8000 Hz preview recovered. Every resource reached readyState 4 with duration four seconds. No page errors occurred. Evidence: `firefox-metadata.log` and `firefox-metadata.json`.

The earlier supplemental `firefox.mjs` attempted ordinary HTML playback without AudioContext: metadata loaded, play() resolved, but the clock did not advance and the preview subsequently failed. It did not complete its lifecycle assertions. The investigator separately confirmed this host lacks an audio sink (`03-firefox-test-environment.md`); that explains why the final Firefox check intentionally measures metadata/lifecycle only. This checker makes no Firefox live-signal, clock-progress or hardware-output claim. The independently measured native bytes and Chromium live signal remain distinct evidence.

## Limits and integration gate

Nonzero live analyser data establishes decoded signal inside Chromium's media pipeline, not human hearing, speaker output or hardware routing. Phone viewport/touch emulation does not reproduce an Android audio backend. No natural permanent same-name silence was reproduced in Chromium. Firefox's unavailable host sink prevents an independent live-output result here. The pre-existing minor error-log direction recorded by the reader and sceptic is not changed by this fix.

This checker did not run the complete quality gate; the author/integrator must record the final `npm run check` result separately. No claim of a green full build or completed deployment is made by this note.
