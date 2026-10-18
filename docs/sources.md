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

The complete sample source, generation commands, version record, measurement output and rights statement are in [the media record](notes/module-0/media/README.md). All sample data, screen captures, synthetic tone and graphics are original, Copyright © 2026 Christopher Snow. No proprietary tutorial text, stock media or remote image/font assets are used. System fonts are used rather than redistributed.

The copied learning platform and adapted sync script retain Christopher Snow's copyright headers; no upstream licence file was present in the referenced checkout. Their reuse is explicitly required by this repository's owner. No new blanket software licence is invented here.

FFmpeg is used as a build/test tool, not shipped to the browser. FFmpeg licensing depends on its build configuration (LGPL 2.1+ normally, GPL when enabled components such as libx264 are used); https://ffmpeg.org/legal.html. The generation environment's build includes GPL/libx264; see its recorded version and the tool's `ffmpeg -L`/`-buildconf`. Chromium and Firefox are test/capture tools, not redistributed in the site (Chromium BSD-style and third-party notices; Firefox MPL 2.0). Playwright bundles its own FFmpeg helper for browser test video; that helper is not the native media generator.

Direct npm dependencies and their installed declared licences are listed below. Exact transitive versions and package provenance are in `package-lock.json`; each installed package retains its licence notices. No third-party source is relabelled as original course work.

| Package | Installed version | Declared licence |
| --- | --- | --- |
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
