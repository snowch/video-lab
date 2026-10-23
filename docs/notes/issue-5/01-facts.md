# Verified facts before prose

Copyright © 2026 Christopher Snow.

Source: public/media/mousepad-demo.mp4; independently recorded Mousepad Find/Replace, fictional deployment.ini, twelve seconds, 180 pictures, 15 fps, H.264 yuv420p, 1280 × 720, silent, 74,303 bytes. SHA-256 d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e. Original provenance under media-source/mousepad. No recording of Video Lab.

23 October native FFmpeg 7.1.5 and actual pinned browser FFmpeg 5.1.4/core 0.12.10 executed:

    ffmpeg -i mousepad-demo.mp4 -ss 2 -t 6 simple.mp4

Both produced one H.264 High/yuv420p stream, 1280 × 720, 90 pictures, exactly six seconds. Native 66,169 bytes; WASM 65,977 bytes. Browser Chromium replay started successfully. Native commands/log and actual WASM log/output are under /workspace/scratch/issue5/. Different builds need not produce identical bytes. These defaults are demonstrated for this input/build, not a universal MP4 guarantee. No flags silently added to the requested encode. -ss is after -i; -t means output length. Output names protect sources; output collisions require a new name or explicit -y. The duration-only six-second first cut and the two-second-start/four-second variant are also measured by scripts/verify-workbench.mjs and real-browser tests: 90 and 60 pictures respectively.

Bare ffprobe outputs actual Duration and Stream lines. Stream is a sequence of related media data (pictures or sound); a container organises streams and timing. H.264 is the picture coding format; libx264 is an encoder implementing it. Encoding stores picture/sound data in a coding format; lossy re-encoding can lose detail. A pixel format specifies how colour samples are represented; yuv420p is broadly supported. These concepts belong before explicit -c:v/-pix_fmt. Default stream selection can choose suitable streams without -map; explicit selection is needed in later exercises. Practice has no audio, imported recordings may have it. No claim that defaults preserve every stream or codec.

Build pictures: frame000/001/002.jpg extracted at original times 0/6/10 seconds. Three stills assigned a new schedule, not continuous motion. -framerate 1 -i frame%03d.jpg creates a three-picture sequence at one picture per second. Native filename pattern, no shell. Known verified explicit libx264/yuv420p output is 3 s at rate 1, 1.5 s at rate 2. tone.wav is quiet synthetic sound, not narration. Two inputs video.mp4 and tone.wav: mapping 0:v:0 and 1:a:0 selects video/audio; -c:v copy avoids picture re-encode, -c:a aac encodes sound, -shortest ends at shorter input. MP4 is container, not codec proof.

Joins: trim start inclusive/end exclusive; range [0,2) + [4,7) yields five seconds. Segments retain source presentation times until setpts=PTS-STARTPTS resets each to zero. Filter graph names intermediate outputs and links operations; quote whole graph, map named result. Existing exact native/WASM tests and reference-model pin controlled reference grading. Detailed references retain their original 10 s, 960 × 540, 12 fps H.264/AAC controlled sources and IDs. Do not silently substitute Mousepad.

Actual tool output remains raw. Core's ffprobe cleanup -1 requires independent internal validation; never turn its sentinel into a native success status. Browser feedback and diagnostics are distinct. Bytes and hashes, not navigation or sample outputs, establish executed evidence.

Runtime remains one operation, 120 s, max 20 MiB/file, 32 MiB total, 12 work files plus 12 recipes. Separately saved tools 32,367,068 bytes; baseline lessons do not load them. Browser capture API, no microphone, optional shared sound; unsupported mobile still has practice/import. Same-origin GitHub Pages /video-lab/.
