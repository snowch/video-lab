# Firefox audio environment diagnosis

Copyright © 2026 Christopher Snow.

29 October 2026. No product changes. Tested installed Playwright Firefox against the current built application at http://127.0.0.1:4198/video-lab/.

A real application FFmpeg WASM command generated the test WAV:

```
ffmpeg -y -i bunny-short.mp4 -t 4 -vn -ar 16000 audio.wav
```

A second page opened that actual saved WAV in Files. Each asynchronous stage had a five-second in-page timeout. Console instrumentation recorded:

| Stage | Result |
| --- | --- |
| Fetch Blob URL → arrayBuffer | 1 ms, success |
| OfflineAudioContext(1, 1, 48000) | 2 ms, construction succeeds |
| OfflineAudioContext.decodeAudioData | 22 ms, 192000 samples at 48000 Hz; channel RMS 0.0235722085 |
| HTMLMediaElement.play before seek | 2 ms, promise resolves |
| Seek to 0.5 seconds then play | 0 ms, promise resolves |
| Live clock after 900 ms | No advance; paused true; media.error.message = OnMediaSinkAudioError |
| AudioContext construction | 4 ms, suspended |
| AudioContext.resume | Unresolved after five seconds |
| AudioContext.close in this run | 3 ms, succeeds |

Firefox console reports `NS_ERROR_DOM_MEDIA_MEDIASINK_ERR (0x806e000b)` with `Details: OnMediaSinkAudioError`. This is a media output sink failure after successful decoding. Resolving play and observing paused=false does not prove a working sink. A separate simple WAV player sometimes advanced its clock despite the same explicit sink error; clock movement alone is also insufficient.

Host inspection: no PulseAudio or PipeWire process; no pulseaudio, pactl or pipewire executable found; no /dev/snd device directory. The installed Firefox therefore has no working physical audio backend in this execution environment. Offline decoding of the actual generated WAV remains valid evidence of nonzero audio data.

`AudioContext.resume()` can remain pending and stall an uncapped test. A subsequent standalone diagnostic also showed an uncapped AudioContext.close can remain pending after failed resume. Cleanup should not wait indefinitely on a broken audio backend.

Use Firefox to verify actual decoded RMS offline, media metadata and replacement/error isolation. Use Chromium's real MediaElementSource → Analyser measurements for live decoded signal; do not label either as human listening or proof of physical speaker output. Firefox live sink/clock coverage is an explicit environment limitation. No backend installation is needed for this product fix.

Diagnostic script: firefox-stages.mjs. The script emits detailed stage results to console. Its initial JSON return contained an unsupported ArrayBuffer value and consequently omitted stages during Playwright serialization; the timings/results above are the directly observed console output, not that incomplete JSON file.
