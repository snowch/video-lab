# Sources, media provenance, and licences

Copyright © 2026 Christopher Snow.

Record precise source URLs, versions, access dates, generated-fixture provenance and dependency licences here as the implementation is built. Do not substitute undocumented memory for a technical fact.

Initial primary references to verify:
- FFmpeg documentation: https://ffmpeg.org/ffmpeg.html
- ffprobe documentation: https://ffmpeg.org/ffprobe.html
- FFmpeg formats: https://ffmpeg.org/ffmpeg-formats.html
- FFmpeg codecs: https://ffmpeg.org/ffmpeg-codecs.html
- HTMLMediaElement documentation: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
- VideoFrame and WebCodecs documentation where relevant: https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame

Do not claim that the browser player exposes frame-by-frame decode timings unless implemented and verified. Include tool commands and versions used for every recorded sample.

## Sources checked for this implementation

Accessed 17 October 2026. Definitions are original teaching text; no source prose or tutorial examples are copied.

| Source | Claim used and verification |
| --- | --- |
| https://ffmpeg.org/ffprobe.html | `-show_streams`, `-show_frames`, `-show_format`, JSON output and inspection scope. Captured output, command and version are committed in `docs/notes/module-0/media/`. |
| https://ffmpeg.org/ffmpeg-formats.html | MP4 container/muxer distinction from codec. Raw fixture reports the MOV/MP4 family with `major_brand=isom`; generated filename and encoder command establish MP4. |
| https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime | Playback position is in seconds, setting it seeks, and timer precision can be reduced. UI distinguishes browser time from the native extracted-frame reference. |
| https://ffmpeg.org/ffmpeg-codecs.html | Encoder/decoder roles. Actual H.264/AAC use is verified from streams rather than inferred from extension. |
| https://github.com/snowch/learning-platform/tree/9ab98e999f3566d415b56e975b77e899ba9036d3 | Lesson schema, ten sections, five hint rungs, term gate, challenge verdict contract and unchanged runtime. Checked-copy adoption documented in upstream `docs/adoption.md`. |
| https://github.com/snowch/assembly-lab/blob/main/CLAUDE.md and `docs/{plan,authoring,style}.md` | Required separate drafting and independent reader → sceptic → ranked fixes → checker process; adapted to media without ARM claims. |
| https://github.com/snowch/digital-design/blob/main/docs/platform.md | Shared packages and checked-copy workflow. |

The first three web references were fetched during the implementation. Codec identity, frame timing, decoded audio block structure and all displayed fixture numbers are executable claims checked against the committed media with native tools. The sources above do not imply the browser exposes a reliable frame index. No WebCodecs API is used.

## Asset and software rights

The complete sample source, generation commands, version record, measurement output and rights statement are in [the media record](notes/module-0/media/README.md). The build-queue data, original captures, synthetic tone and original diagrams are Copyright © 2026 Christopher Snow. The optional Big Buck Bunny excerpt is a separately credited CC BY 3.0 asset, described below. No proprietary tutorial text is copied. Fonts are served locally; bundled KaTeX assets retain their MIT licence, while ordinary interface text uses system fonts.

The copied learning platform and adapted sync script retain Christopher Snow's copyright headers; no upstream licence file was present in the referenced checkout. Their reuse is explicitly required by this repository's owner. No new blanket software licence is invented here.

FFmpeg is used natively for fixture generation/tests and is now also shipped as an optional browser WebAssembly core. The pinned `@ffmpeg/core` 0.12.10 package declares GPL-2.0-or-later; wrapper 0.12.15 and util 0.12.2 declare MIT. The distributed files, notices and exact source references are recorded below. Native FFmpeg licensing is build-specific (see https://ffmpeg.org/legal.html); the generation build includes GPL/libx264. Chromium and Firefox are test/capture tools, not redistributed in the site (Chromium BSD-style and third-party notices; Firefox MPL 2.0). Playwright's own FFmpeg helper is separate from the native fixture generator and shipped WASM core.

Direct npm dependencies and their installed declared licences are listed below. Exact transitive versions and package provenance are in `package-lock.json`; each installed package retains its licence notices. No third-party source is relabelled as original course work.

| Package | Installed version | Declared licence |
| --- | --- | --- |
| @ffmpeg/core | 0.12.10 | GPL-2.0-or-later |
| @ffmpeg/ffmpeg | 0.12.15 | MIT |
| @ffmpeg/util | 0.12.2 | MIT |
| @playwright/test | 1.64.1 | Apache-2.0 |
| @types/node | 24.19.2 | MIT |
| @types/react | 19.3.0 | MIT |
| @types/react-dom | 19.3.0 | MIT |
| @vitejs/plugin-react | 5.2.0 | MIT |
| katex | 0.19.0 | MIT |
| prettier | 3.9.10 | MIT |
| react | 19.3.1 | MIT |
| react-dom | 19.3.1 | MIT |
| react-markdown | 10.1.0 | MIT |
| rehype-katex | 7.0.1 | MIT |
| remark-gfm | 4.0.1 | MIT |
| remark-math | 6.0.0 | MIT |
| typescript | 5.9.3 | Apache-2.0 |
| vite | 7.3.7 | MIT |
| vitest | 4.1.12 | MIT |
| zod | 4.6.7 | MIT |

## Module 2 references and media

Accessed 17 October 2026. Original teaching text was drafted from native measurements and these primary references:

- https://ffmpeg.org/ffmpeg.html#Main-options — input `-ss` seeks to an earlier seek point; stream copy preserves pre-request material for the demonstrated command. Transcoding with accurate seek can discard it.
- https://ffmpeg.org/ffmpeg-filters.html#trim and https://ffmpeg.org/ffmpeg-filters.html#atrim — range selection and unchanged timestamps.
- https://ffmpeg.org/ffmpeg-filters.html#setpts_002c-asetpts — resetting a segment's presentation timestamps.
- https://ffmpeg.org/ffmpeg-filters.html#concat — segment timestamps start at zero, video/audio are joined together, corresponding stream parameters must be compatible. Dimensions require explicit conversion when they differ; no claim is made that all frame rates must match.
- https://ffmpeg.org/ffmpeg-formats.html#concat — the concat demuxer is a separate mechanism with matching-stream/time-base requirements, not the concat filter exercised here.

[Module 2 provenance](notes/module-2/media/README.md) records the controlled-keyframe derivative, ten outputs, extracted stills, commands, exact native versions and validation tolerances. All media derives from the original course recording and inherits its rights statement. No new third-party asset or runtime dependency is introduced.

## Offline browser APIs

Accessed 18 October 2026. Original implementation and UI prose; no source prose is copied and no new runtime dependency is added.

- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API — secure contexts, scoped control, installation and update lifecycle. Browser tests exercise installation failure, a waiting update, activation, reload and offline navigation.
- https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage — complete saved responses, scoped cache names and explicit readiness checks. Tests remove an asset and verify repair while preserving an unrelated application's cache.
- https://developer.mozilla.org/en-US/docs/Web/API/Request/integrity — SHA-256 verification against the production manifest. Tests reject a successful HTTP response with incorrect file contents.
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests — single byte ranges, 206 and 416 responses. Unit tests pin boundaries and browser tests seek native MP4 recordings offline.
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria — local browser storage is not permanent; private browsing and eviction limits are stated in the UI.

## App installation and original icon

Accessed 18 October 2026:

- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable — manifest identity, display mode, secure hosting, icons, platform-dependent installation and the browser prompt. Actual Chromium installability is checked via the browser protocol; controlled prompt tests are not represented as OS installation.
- https://www.mozilla.org/en-US/firefox/143.0/releasenotes/ — Firefox143 introduced Windows website apps pinned to the taskbar; this corrects the initial drafting brief's overbroad claim about Firefox desktop. Manifest-based PWA support and generic website apps are distinct.

The icon is an original vector rendering of Video Lab's existing teal/orange play mark, not a third-party asset. `public/icons/video-lab.svg` is the source; `scripts/generate-icons.mjs` reproduces the PNG sizes and maskable version with the existing Playwright dependency. Copyright © 2026 Christopher Snow applies; no new blanket licence is invented. Browser-specific placement of an app icon is controlled by that browser/operating system, not by the web app.
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/id and https://www.w3.org/TR/appmanifest/#id-member — independently checked during review: relative app ids resolve against the start URL's origin, unlike manifest-relative start/scope URLs. The explicit `/video-lab/` id is checked against Chromium's parsed manifest.
- https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid — the separate drafter and sceptic fetched current Android guidance: More → Install and create shortcut → Install. Menu wording is qualified by version.


## Issue 3: local capture, processing and original journey fixtures

Recorded 23 October 2026. [The compatibility spike](notes/issue-3/wasm-spike.md) documents real production-built Chromium/Firefox H.264 encoding, AAC muxing, MP4 playback and ffprobe JSON. The pinned core includes ffprobe; the previous assumption that it lacked the tool is withdrawn. The adapter validates actual returned evidence, including the pinned cleanup-return quirk; it does not infer contents from filenames. [Native capture evidence](notes/issue-3/native-capture.md) separates executed virtual-Linux/X11 and real Chromium display capture from source-reviewed Windows/macOS command forms and untested physical-device permissions.

| Reference | Use and evidence boundary |
| --- | --- |
| https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia | Explicit user-initiated browser chooser and display-capture constraints; no promise that all surfaces supply audio. |
| https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder | Real recording chunks, negotiated MIME and stop lifecycle. Actual observed output is recorded separately from API capability. |
| https://ffmpegwasm.netlify.app/docs/overview/ | Browser wrapper/core architecture; the pinned execution spike, rather than a general support claim, establishes the exercised encoders and probe. |
| https://ffmpeg.org/ffmpeg-filters.html#trim and #atrim, #setpts_002c-asetpts, #concat | Separate video/audio trim, clock reset and consecutive join for actual project output. |
| https://ffmpeg.org/ffmpeg-devices.html | Optional native gdigrab, AVFoundation and x11grab forms. Versioned `n7.1.5/doc/indevs.texi` was checked when the documentation site failed; see native-capture record. |

`media-source/demo.html` and the existing native-verified frames remain original. Build uses 000/048/072: source times 0/4/6 seconds, initial state/sorted result/later hold. They are not continuous action pictures. `scripts/journey-media.mjs` generates and verifies the provided video-only/audio examples, synthetic WAV and six-second edited reference; `public/media/journey/evidence.json` pins their real native measurements and hashes. A provided example is not an encoding produced by the learner's current settings.

### Distributed encoder source and licences

`@ffmpeg/core` **0.12.10** is copied without modification from the pinned npm package into `dist/encoder/0.12.10/`. Runtime identifies FFmpeg **5.1.4**, Emscripten **3.1.40**, single-thread `--disable-pthreads` and `--enable-gpl`. The core package declares **GPL-2.0-or-later**. `@ffmpeg/ffmpeg` **0.12.15** and `@ffmpeg/util` **0.12.2** are **MIT**. Declaring the core a development dependency does not mean its emitted runtime files are absent from the site.

- Exact release source: https://github.com/ffmpegwasm/ffmpeg.wasm/tree/71aa99d37c02a7b4c435275ca9ef50e612f6efa1
- Source archive: https://github.com/ffmpegwasm/ffmpeg.wasm/archive/71aa99d37c02a7b4c435275ca9ef50e612f6efa1.tar.gz
- Build recipe: the Dockerfile, Makefile, `build/` library scripts and `src/` bindings at that commit; run `make prd` as documented in [the shipped source notice](../src/processing/licences/SOURCE.md).
- Published binary package: https://registry.npmjs.org/@ffmpeg/core/-/core-0.12.10.tgz

This is the **January 2025 core release commit**, not the older December 2023 wrapper tag also named v0.12.10. The release recipe references some moving dependency branches, so future byte-identical source rebuilding is not claimed. Package-lock integrity and the emitted manifest separately pin the exact distributed npm bytes.

`scripts/prepare-encoder.mjs` copies `ffmpeg-core.js`, `ffmpeg-core.wasm`, `COPYING.GPLv2.txt`, `FFMPEG-WASM-LICENSE.txt` and `SOURCE.md`, then generates `encoder-manifest.json` with sizes and SHA-256 integrity. The current additional package is **32,367,068 bytes** including notices; the generated manifest remains authoritative if notices change. Licence/source documents originate in `src/processing/licences/` and are published alongside the core under `/video-lab/encoder/0.12.10/`. The MIT wrapper notice also ships in the baseline at `public/legal/FFMPEG-WASM-LICENSE.txt`. No new blanket course licence is invented.

The core files and optional comparison media are excluded from the baseline offline manifest. Explicit processing or an explicit additional-tools download requests the core. The first-run/offline UI distinguishes tool readiness from lesson readiness.

### Optional Big Buck Bunny comparison

**Credit:** © 2008 Blender Foundation | peach.blender.org. **Licence:** [Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/), verified against https://peach.blender.org/about/. No endorsement is implied.

The [complete provenance JSON](notes/issue-3/media/big-buck-bunny.json) records the official source archive https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4.zip, its 64,657,225-byte size and SHA-256, member filename/hash, exact native command and FFmpeg version. The derivative extracts source 60–65 seconds, re-encodes 320×180 H.264/AAC and is **86,088 bytes**, with SHA-256 `d0b7384aaef30fcc97bcfbd3039ebc2c9e06f31e6e1339452efe2c5fc2ce48df`.

The file is served as `optional/big-buck-bunny-5s.mp4`; Publish loads it only after an explicit click and displays credit/licence links. Optional comparison media is excluded from the baseline offline download. The working `optional/command-workbench.html` entry is explicitly included. It is a provided comparison, not the learner's captured source or exported project, and does not make the planned compression module available.

## CLI-first production labs

The owner requested command-line labs on 23 October 2026. [The CLI plan and reviews](notes/cli/plan.md) supersede GUI parameter controls in the production path. Learner-written argument arrays execute in the same pinned FFmpeg/ffprobe core. The command parser handles quoting and continuation, without pretending to supply an operating-system shell, pipes, redirection or expansion. Capture, import, file listing/replay/download and provided-source loading are explicitly browser workspace conveniences.

The command examples rely on the existing primary FFmpeg documentation: [main options](https://ffmpeg.org/ffmpeg.html#Main-options), [stream selection](https://ffmpeg.org/ffmpeg.html#Stream-selection), [image2 input](https://ffmpeg.org/ffmpeg-formats.html#image2-1), [trim](https://ffmpeg.org/ffmpeg-filters.html#trim), [setpts/asetpts](https://ffmpeg.org/ffmpeg-filters.html#setpts_002c-asetpts), [concat filter](https://ffmpeg.org/ffmpeg-filters.html#concat), and [ffprobe](https://ffmpeg.org/ffprobe.html). Real WASM/browser tests pin the supplied command outcomes and inspect downloaded results with native ffprobe. Source timing/dimensions for arbitrary imported media are never inferred from an example's prose.

The exact bare `Aborted()` log line occurs in this pinned core on both successful zero-status executions and genuine nonzero failures. Its JavaScript `exec` catches Aborted-prefixed exceptions and returns `Module.ret`; raw logs remain visible. The workspace adds a narrowly conditional explanation only when the exact bare line was observed and FFmpeg returned zero, while retaining nonzero failures. The different ffprobe -1 cleanup quirk remains accepted only with valid nonempty JSON and no error report. Neither adapter manufactures a native success exit code.

No new media source or runtime dependency is introduced. Provided reference outputs and the opt-in credited comparison retain their provenance; an execution recipe identifies exact tool arguments and hashes of all workspace media, including unrelated available files. Read `-i` arguments to identify the media command's referenced inputs.

## All reference labs use commands

[The all-labs plan and reviews](notes/all-labs-cli/plan.md) extend the workspace to the original inspection and cutting lessons. Native FFmpeg/ffprobe 7.1.5 and the pinned WASM core verify the report, stream extraction, frame 75, accurate trim, audio/video concat and deliberately unreset timestamp examples. `ffprobe -o FILE.json` writes its actual JSON bytes. Check feedback measures submitted artifacts rather than comparing command spelling.

The edit check decodes submitted and original source pictures to 160×90 RGB, requiring 48 pictures in the expected opening-then-result order. Its maximum per-frame RGB RMS tolerance is 2; the verified correct re-encode measures approximately 0.5174, while reversed order exceeds 5.47. This is a bounded comparison for this controlled fixture, not byte identity or a general video-similarity metric. Removing both timestamp resets in the supplied example produces eight seconds/96 pictures in the tested versions; it is not a universal concat duration rule. Existing source provenance remains unchanged. Recipes now snapshot all workspace input files, including reports and notes.


## Working command builder and Mousepad recording

The live workbench at `optional/command-workbench.html` executes the same native FFmpeg/ffprobe argument arrays whether built or typed. The existing pinned WASM core, worker cancellation, quotas and offline tools are reused. Imported filenames containing unsupported characters are explicitly renamed in the browser workspace. Original device files are untouched. Source overwrite is rejected; generated output replacement requires explicit `-y`. JSON recipes record executed commands and hashes of available inputs; `-i` identifies referenced media.

The original sample is actual Mousepad 0.6.3 pixels, not Video Lab or an imitation editor. [Full provenance, source text, native commands, versions and hash](../media-source/mousepad/README.md) accompany the recording. Mousepad: https://gitlab.xfce.org/apps/mousepad ; GPL-2.0-or-later, application not redistributed. The recording and fictional text carry the repository copyright notice; no new blanket licence is declared. Native JSON is in `notes/live-workbench/media/`; `scripts/verify-workbench.mjs` pins the exact source and measured facts. The browser tests independently inspect actual WASM exports using native ffprobe.
