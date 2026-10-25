# FFmpeg WebAssembly source and licences

Video Lab distributes the unmodified ESM `ffmpeg-core.js` and `ffmpeg-core.wasm` from **@ffmpeg/core 0.12.10**, a single-thread build declared **GPL-2.0-or-later** by its package. Its wrapper, **@ffmpeg/ffmpeg 0.12.15**, and utility package, **@ffmpeg/util 0.12.2**, are MIT-licensed. The included COPYING.GPLv2.txt and FFMPEG-WASM-LICENSE.txt retain the original licence text; this notice does not relicense them.

## Exact upstream build source

The core release commit is **71aa99d37c02a7b4c435275ca9ef50e612f6efa1**, dated 7 January 2025, whose commit message is “RELEASE: @ffmpeg/core and @ffmpeg/core-mt v0.12.10”. Its packages/core/package.json declares 0.12.10. The old wrapper tag v0.12.10, from December 2023, is a different release and is not the source reference for this binary.

- Source tree: https://github.com/ffmpegwasm/ffmpeg.wasm/tree/71aa99d37c02a7b4c435275ca9ef50e612f6efa1
- Source archive: https://github.com/ffmpegwasm/ffmpeg.wasm/archive/71aa99d37c02a7b4c435275ca9ef50e612f6efa1.tar.gz
- Build recipe and dependency source URLs: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/Dockerfile
- Make targets: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/Makefile
- Per-library build scripts: https://github.com/ffmpegwasm/ffmpeg.wasm/tree/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/build
- Bindings and modified FFmpeg tool sources: https://github.com/ffmpegwasm/ffmpeg.wasm/tree/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/src
- Published package: https://registry.npmjs.org/@ffmpeg/core/-/core-0.12.10.tgz

The core identifies itself at runtime as FFmpeg **5.1.4**, built with Emscripten **3.1.40**, with `--enable-gpl`, libx264, libx265, libvpx and the other libraries below. It does not require SharedArrayBuffer or a multithread build.

## Dependency sources selected by the release recipe

The upstream Dockerfile fetches these sources; its build directory supplies the corresponding configuration and installation scripts. References are recorded as upstream specifies them. Moving branch names are not a promise of byte-for-byte future reproduction.

| Source | Reference |
| --- | --- |
| https://github.com/FFmpeg/FFmpeg | n5.1.4 |
| https://github.com/ffmpegwasm/x264 | 4-cores |
| https://github.com/ffmpegwasm/x265 | 3.4 |
| https://github.com/ffmpegwasm/libvpx | v1.13.1 |
| https://github.com/ffmpegwasm/lame | master |
| https://github.com/ffmpegwasm/Ogg | v1.3.4 |
| https://github.com/ffmpegwasm/theora | v1.1.1 |
| https://github.com/ffmpegwasm/opus | v1.3.1 |
| https://github.com/ffmpegwasm/vorbis | v1.3.3 |
| https://github.com/ffmpegwasm/zlib | v1.2.11 |
| https://github.com/ffmpegwasm/libwebp | v1.3.2 |
| https://github.com/ffmpegwasm/freetype2 | VER-2-10-4 |
| https://github.com/fribidi/fribidi | v1.0.9 |
| https://github.com/harfbuzz/harfbuzz | 5.2.0 |
| https://github.com/libass/libass | 0.15.0 |
| https://github.com/sekrit-twc/zimg | release-3.0.5 |

To build from that release, install Docker with Buildx, fetch the source tree at the exact commit, and run `make prd` from its root. The Makefile selects `FFMPEG_ST=yes` and `-O3 -msimd128`; its Dockerfile starts with emscripten/emsdk:3.1.40 and generates both UMD and ESM files. Video Lab uses the ESM files. Docker/build tooling is not needed to use the course.

The Video Lab build copies the original npm package bytes without modification and publishes SHA-256 hashes and sizes in encoder-manifest.json. npm package integrity is pinned by package-lock.json. Changing course input media creates new media output; it does not modify the encoder binary.

## Video Lab exit adapter

Video Lab also ships a separate application adapter, ffmpeg-adapter.js. The build command `npm run build` runs `scripts/prepare-encoder.mjs`, which transpiles `src/processing/core-exit.ts` and adds an ESM factory importing the original ffmpeg-core.js. It writes the adapter and the unchanged vendor JS/WASM to `dist/encoder/0.12.10/`, and includes their individual hashes and sizes in `dist/encoder-manifest.json`. The script verifies the vendor files against pinned SHA-256 hashes before copying them. This does not rebuild or patch the upstream files; the upstream source and licence references above still describe those files.

The adapter handles the pinned native `exit_program` termination sequence. That native function saves the command's return status, then intentionally calls abort to unwind execution. An `onAbort` hook intercepts only an empty abort reason with a recorded nonnegative integer status, before Emscripten prints its shutdown diagnostic. It throws a WebAssembly.RuntimeError that the original binding catches, preserving the recorded status, including nonzero errors. Other aborts retain the original diagnostic path and are propagated as failures. No CLI log text is filtered.

This relies on the pinned binding and Emscripten callback ordering and must be rechecked when upgrading the core. Ordinary ffprobe completion does not use this abort sequence: its binding ignores the native return value and leaves status -1. The adapter does not repair that separate contract; Video Lab continues to validate inspection JSON and errors independently.
