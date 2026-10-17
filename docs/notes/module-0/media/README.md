# Original media and measurement record

Copyright © 2026 Christopher Snow.

`public/media/build-queue.mp4` is an original, scripted screen capture of the functioning app in `media-source/demo.html`. It contains invented build records, not customer data. Playwright opens the actual HTML in Chromium, clicks its Sort button at capture index 48, and captures 120 screenshots. FFmpeg assembles the pictures at 12 frames per second. The capture advances a visible clock deterministically rather than recording wall-clock execution speed. The sorting itself executes the app's JavaScript comparator. This is a software demonstration, not footage of a production service.

The audio is a generated 440 Hz sine tone, attenuated before AAC encoding. It is explicitly identified as synthetic, with no speech. There is no stock video, music, narration, font download or third-party artwork. The original HTML, captured images, sound, diagrams and lesson text are Copyright © 2026 Christopher Snow. They were created for this repository; the source permits reproducing the fixtures by the commands below. No general repository licence is implied.

## Reproduce

Prerequisites: Node 24, npm, native FFmpeg with libx264/AAC support, and Playwright Chromium. Run from the repository root:

```sh
npm ci
npx playwright install --with-deps chromium
npm run media:generate
npm run media:verify
```

`generation.json` records the exact encoding and probing argument arrays and the versions used. The full raw `ffprobe -show_format -show_streams -show_frames` output is `ffprobe.json`; a public copy is available through the lesson. `src/media/fixture.json` is the selected evidence used by the TypeScript model. The command extracts every JPEG from the encoded MP4, not from the pre-encode screenshots. Do not hand-edit the generated evidence.

Reproduction preserves the intended actions, media properties and timestamps. It is not promised to produce identical encoded bytes across Chromium, font, OS or FFmpeg versions. The committed MP4's SHA-256 is recorded in the fixture; verification checks those bytes and independently inspects them with the local FFmpeg. Regeneration intentionally updates the hash and measurement record. The lockfile pins the Playwright version; platform font rendering remains an OS dependency.

## What verification establishes

`npm run media:verify` requires native FFmpeg and ffprobe; absence fails rather than skips. It compares stream indexes, types, codecs, time bases, dimensions, sample rates, channels and durations, plus every video PTS and decoded audio block PTS/sample count. It decodes the MP4 and the complete JPEG sequence to RGB and checks the mean absolute pixel error of every paired frame (less than 4 on an 8-bit scale, allowing JPEG quantisation).

This is constant-frame-rate footage: 120 pictures over 10 seconds. Video ticks use 1/12288 second; successive pictures differ by 1024 ticks. The recorded decimal seconds are rounded. AAC has a separate sample clock at 48000 Hz and decoded blocks of 1024 samples; codec padding is not evidence of extra intended audible duration. The UI's sample position is a calculation from sample rate and selected time, not a browser measurement or a count of decoded codec padding.

The browser's `currentTime` describes its playback position. The separately extracted still is the authoritative inspection picture. Browser seeking, decoder scheduling and reduced timer precision can temporarily make the player differ from that still. The diagram is an explanatory model of the recorded streams, not a waveform or byte-layout diagram.
