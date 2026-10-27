# Codec appendix — verified browser runtime evidence

Copyright © 2026 Christopher Snow.

Verified on 27 October 2026. This is a capability/fact pass, with no product edits. Commands below executed in the pinned browser WASM core, rather than the machine's installed native encoder. This pass does not establish an audible quality preference.

## Method and reproducibility

Read `AGENTS.md`, `docs/plan.md`, `tests/runtime-abort.spec.ts`, `tests/cli-helpers.ts`, the current exit adapter and processing configuration. Started a dedicated built-site preview with `npm run preview -- --port 4181`. Ran standalone Node Playwright, without the Playwright test CLI:

```sh
node /workspace/scratch/codecs/wasm/probe.mjs
```

The script defaults to `http://127.0.0.1:4181/video-lab/`; `CODECS_BASE_URL` can select another built preview. It imports the actual `encoder/0.12.10/ffmpeg-adapter.js` inside a browser module worker, supplies the explicit original WASM URL, and fetches `media/notebook/bunny-short.mp4` from that preview. It runs real `core.exec`/`core.ffprobe`, resetting between invocations. It records complete encoder and processing logs, actual probe reports, output files, hashes and browser decode results.

The runtime is **@ffmpeg/core 0.12.10**, reporting FFmpeg **5.1.4**, with the application's exit adapter. Original vendor provenance is in `src/processing/licences/SOURCE.md`. The generated encoder manifest used for the run is copied to the evidence directory. Both tested browsers ran with `crossOriginIsolated === false`; this single-thread core did not need SharedArrayBuffer or cross-origin isolation.

Tested browsers: Playwright Chromium **156.0.8078.4** and Firefox **157.0**, headless, on this Linux environment. These are bounded observations, not a universal browser/device support guarantee.

## AAC commands and actual results

The source probe reports eight seconds with H.264 video and **AAC audio at 48,000 Hz, two channels**. The committed source's SHA-256 is `b02849f31c6493657af16c54f17d0a8853da4a8de921c377d610775840f08144`. Both commands inherit that audio rate and channel count. They do not force an arbitrary different source to 48 kHz stereo.

```sh
ffmpeg -y -i bunny-short.mp4 -vn -c:a aac -b:a 32k audio-32k.m4a
ffmpeg -y -i bunny-short.mp4 -vn -c:a aac -b:a 128k audio-128k.m4a
```

Both commands returned **0** in both browsers. Each output has one AAC audio stream, no video, sample rate **48,000 Hz**, **two channels** and stream/container duration **8.000000 seconds**. Results were obtained with real core ffprobe arguments:

```sh
ffprobe -v error -show_error -show_streams -show_format -of json audio-32k.m4a -o probe-32k.json
ffprobe -v error -show_error -show_streams -show_format -of json audio-128k.m4a -o probe-128k.json
```

As documented for this pinned wrapper, these ordinary probe calls return **-1** because the binding ignores the native C return value. The script requires actual populated stream/format JSON with no error object; it does not equate -1 with success.

| Requested audio bitrate | Output bytes | Reported audio-stream bitrate | Reported whole-file bitrate | SHA-256, identical across both browsers |
| --- | --- | --- | --- | --- |
| 32 kbit/s | 34,470 | 32,081 bit/s | 34,470 bit/s | `dc8ad514c7cb4c22b206dc29ae0bb1d1fb230c01b33813a98a0fc0f561023069` |
| 128 kbit/s | 130,398 | 127,754 bit/s | 130,398 bit/s | `70f905ce7945db371bfeefdc565482d0959e2a18fd67a4e278aa0d81b01b0aef` |

Whole-file bitrate includes the MP4 container; the request is an audio encoding target, not a promise of identical measured stream or whole-file bitrate. The numerical equality between bytes and whole-file bit/s here follows from an eight-second duration (`bytes × 8 / 8`), not interchangeable units.

Chromium took roughly 0.3 seconds per audio encode and Firefox roughly 0.3–0.4 seconds in this run. These timings are review observations, not a course performance promise. Full timing precision and raw logs are in the evidence JSON.

## Encoders advertised by the pinned WASM build

Executed `ffmpeg -hide_banner -encoders` in the actual core in each browser; both returned 0 and the relevant lines agree. The script matches the encoder-name field exactly, so `libx264rgb` is not mistaken for a second `libx264` result.

| Requested name | Actual WASM listing | Scope of evidence |
| --- | --- | --- |
| `libx264` | Present: H.264/AVC | Advertised encoder; no new H.264 encode needed in this audio pass |
| `libx265` | Present: H.265/HEVC | Advertised encoder; no HEVC encode or browser playback test |
| `libvpx-vp9` | Present: VP9 | Advertised encoder; no VP9 encode or browser playback test |
| `libaom-av1` | **Absent** | No AV1 encoder is listed in this core; do not offer this name as a runnable browser encoder |
| `aac` | Present: AAC | Both requested real encodes and browser decodes succeeded |
| `libopus` | Present: Opus | Advertised encoder; no Opus encode or playback test |
| `libmp3lame` | Present: MP3 | Advertised encoder; no MP3 encode or playback test |
| `flac` | Present: FLAC | Advertised encoder; no FLAC encode or playback test |
| `pcm_s16le` | Present: signed 16-bit little-endian PCM | Advertised encoder; no new PCM encode test |

Encoder availability and browser playback compatibility are separate. For example, the presence of `libx265` establishes this build's encoder listing, not that an HEVC result will replay in every browser. No capability claim in this table comes from native `ffmpeg -encoders`.

## Browser decoding and comparison limits

Each browser reported `probably` for `audio/mp4; codecs="mp4a.40.2"`. More substantially, `AudioContext.decodeAudioData` actually decoded both generated M4As in both browsers with two channels and approximately eight seconds. The default AudioContext used **44,100 Hz**, so its decoded AudioBuffer was resampled: that value does not change or contradict the file's measured 48,000 Hz stream rate. Firefox returned exactly 352,800 frames (8 seconds); Chromium returned 352,799 (about 7.999977 seconds). Do not grade the compressed file's duration or sample rate from that browser buffer length.

No audible listening, user-initiated playback, mobile hardware, WebKit/Safari or autoplay-policy test was conducted in this capability pass. The core encodes and file inspection succeeded in both tested browsers. Use ordinary learner-initiated media controls for listening and avoid inferring general playback support from an encoder being listed.

The requested native comparison samples will use a PCM WAV decoded from the same eight-second AAC-bearing practice source, followed by separate native AAC encodes at 32 and 128 kbit/s. Those must be labelled as prepared comparison assets. That PCM WAV is a reference for the comparison derived from an already compressed source, not recovered lossless studio audio. The live commands above separately demonstrate actual browser execution. Their encoded bytes are not promised to match native prepared samples from a different FFmpeg version or input path.

As an independent sanity check, native FFmpeg/ffprobe **7.1.5-0+deb13u1** inspected and fully decoded the two Chromium WASM outputs. `ffprobe -v error -show_streams -show_format -of json FILE` succeeded and `ffmpeg -v error -xerror -i FILE -f null -` decoded each complete output without errors. This checks the browser-produced files; it is not the source of the WASM availability claims.

## Saved evidence

Everything requested is under `/workspace/scratch/codecs/wasm/`:

- `probe.mjs`: reproducible standalone browser harness.
- `chromium.json`, `firefox.json`: full original core logs, source/output probe reports, command statuses, output hashes and browser decode details.
- `chromium-encoders.txt`, `firefox-encoders.txt`: complete actual core encoder listings.
- `chromium-audio-32k.m4a`, `chromium-audio-128k.m4a`, and corresponding Firefox files: actual browser-generated outputs.
- `summary.jsonl`: compact observations from the completed harness run.
- `encoder-manifest.json`: exact built encoder asset manifest.
- `native-cross-check.json`: independent native metadata and full-decode checks of the browser outputs.

This evidence pass does not replace the later appendix's separate prose, built-site reader/sceptic/checker workflow or the full quality gate.
