# Command reference: independent technical sceptic

Copyright © 2026 Christopher Snow.

Reviewed 30 October 2026 by a separate sceptic agent who did not draft or implement the appendix. Read `AGENTS.md`, the plan, `02-facts.md`, the current notebook command definitions and lesson copy, optional codec/capture guides, command parsing/staging code and the actual built appendix. Challenged every finding in `04-reader.md` against the page and its sources. No production file was edited and no full quality suite was run.

## Evidence and review boundary

The inspected build was `http://127.0.0.1:4199/video-lab/#/appendix/commands`, showing 52 entries. Independently inspected rendered text, search results and layout in desktop light (1440 × 1000) and phone dark (390 × 844); neither had page-level horizontal overflow. Scratch text and screenshots are in `/tmp/command-reference-sceptic/`. The reader separately tested four desktop/phone and light/dark contexts and all 30 unique internal targets; this review does not claim to have repeated that entire sweep.

Compared the current 29-page, 11-chapter notebook in `src/notebook/structure.ts`, `src/notebook/pages/`, optional codec recipes and `src/capture/native.ts` with the reference entries. The older `src/course/structure.ts` is not the current notebook inventory. Archived labs were excluded as the plan requires.

Read official FFmpeg documentation captured in `/tmp/command-reference-facts/`: command placement, stream selection, seeking, ffprobe reports, image2/null/MP4 formats, the ten named filters and capture devices. Cross-checked the captured native 7.1.5 help, including `subtitles` parameters. Stable sources include:

- <https://ffmpeg.org/ffmpeg.html#Description>, <https://ffmpeg.org/ffmpeg.html#Main-options> and <https://ffmpeg.org/ffmpeg.html#Stream-selection>.
- <https://ffmpeg.org/ffprobe.html#Main-options>.
- <https://ffmpeg.org/ffmpeg-filters.html#Filtergraph-syntax> and its individual filter sections, particularly <https://ffmpeg.org/ffmpeg-filters.html#subtitles>.
- <https://ffmpeg.org/ffmpeg-formats.html#image2>, <https://ffmpeg.org/ffmpeg-formats.html#null> and the MP4 muxer documentation.
- <https://ffmpeg.org/ffmpeg-devices.html> and <https://ffmpeg.org/ffmpeg-codecs.html>.

The builder added a new `-h` entry/help-cell extension to live source during this audit. That addition was absent from the inspected 52-entry build and the original 33-option brief. It needs its own built-page/checker verification; the findings below describe the inspected baseline.

## Adjudication and ranked fix directions

### S1 — Medium, accepted independent addition: “Native tools only” overstates an option restriction

The built section and Purpose choice read “Native tools only: capture, preparation and batch”. Searching `-b:a` returns that heading and the AAC bitrate entry. The same group contains `-encoders` and `-n` alongside genuinely native capture devices and shell syntax.

The examples' origins are native guides, but these option names are general FFmpeg facilities. The official documentation defines `-encoders` as showing available encoders, `-b:a` as an audio bitrate selection and `-n` as refusing overwrite; their meanings are not intrinsically native-only. The browser validator in `src/cli/command.ts` explicitly accepts standalone `ffmpeg -encoders`. The heading therefore invites an incorrect availability rule, even though the group introduction correctly restricts “capture devices and shell constructs”.

Direction, rank 1: name the category after the examples' native context rather than claiming every included option is native-only. Preserve the explicit restrictions on capture devices, shell variables and loops. A brief note can distinguish the common options from the native recipes in which they are taught. Do not promise every device or encoder exists in every build.

### R2 — Low, accepted: unnecessary ASS terminology in the subtitle lookup

Verified the exact built sentence: “force_style supplies ASS style overrides, here the font name.” Official filter documentation confirms the technical claim: `force_style` accepts ASS-format key/value overrides, and the renderer converts input subtitle formats to ASS. This is accurate terminology, not a factual error.

However, the entry's SRT example does not require learners to understand that internal subtitle format. The linked lesson already explains the practical mechanism directly: overriding the subtitle font choice with the font's internal family name. Introducing an undefined acronym weakens the otherwise useful local explanation.

Direction, rank 2: describe the appearance/font override in ordinary words. Preserve the distinction between a font folder, font-family name and `.ttf` filename if elaborating. No additional subtitle-format lesson is needed.

### R1 — Low, accepted: Back discards the active lookup

Independently reproduced with search `-ar sample` and purpose `streams-encoding`, followed the result to “Count sound samples through time”, waited for that lesson's actual heading, then used Back. The returned appendix had empty search/purpose controls and all 52 entries. An immediate click-and-Back can misleadingly retain controls if React has not yet rendered/unmounted the lesson; that timing does not rebut the reader's realistic round trip.

The linked destination is correct and the controls still work. The consequence is repeated lookup work in the expressly encouraged reference → lesson → reference flow, so the reader's low severity is appropriate.

Direction, rank 3: preserve the query and purpose across navigation, with clear still clearing both. URL state is reasonable; updates should not create one browser-history entry per keystroke. Verify reload, Back/Forward and malformed/unknown purpose values in the implemented approach.

## Rejected concerns and limits

- **Linux `printf` escape defect — rejected.** Both source strings contain two source backslashes after `%s`, which JavaScript parses into one runtime backslash followed by `n`. Direct built-page character codes are `[92, 110]`. That is the intended `printf` newline escape. The reader independently checked and retracted the suspicion. Reducing the JavaScript source to one backslash would insert an actual newline into the displayed format string.
- **Missing current options or filters — not substantiated.** The baseline includes all 33 literal option forms in the verified inventory, all ten distinct filters (`fps`, `scale`, `crop`, `pad`, `overlay`, `concat`, `volume`, `afade`, `drawtext`, `subtitles`) and the taught parameters. Native `scale=trunc(...)` is covered separately without pretending to be an eleventh filter. No requirement to index archived `trim`, `setpts`, `-shortest`, `-r` or every option exposed by tool help was found.
- **Fragments mistaken for runnable commands — not substantiated as a general defect.** The introduction explicitly distinguishes examples beginning with a tool name from fragments. Entries explain graph placement, quote grouping, numeric image patterns, output labels, the final null-output dash and native variables. The native `-n` command explicitly says its variables come from the linked loop. Full commands still require the stated source/font/subtitle files; the appendix does not promise otherwise.
- **Incorrect option placement/meaning — not substantiated beyond S1's context ambiguity.** Input options precede their own `-i`; output settings precede output paths; global `-filter_complex`, `-xerror`, `-n` and `-y` are identified. Input/output `-ss` behaviour and stream-copy boundaries are qualified. Mapping is distinguished from encoding, image input pace from output `fps`, and sample rate from bitrate. `-show_entries` field selection is distinguished from separate CLI options. The null output is not presented as a saved playable file.
- **Every specialised word needs a new definition — rejected as a blanket expansion.** This is an optional lookup linked to teaching pages and technical appendices, rather than a replacement course. The demonstrated ASS problem is a needless extra term with no benefit to the example; it does not justify expanding every entry into a lesson. Pixel representation, stream-copy limits, build dependence and filter prerequisites are materially qualified already.

No high-severity factual or functional blocker was established in the inspected baseline. Apply the ranked fixes and have an independent checker inspect the rebuilt page, including the later help-cell addition. This review does not establish physical-device capture, browser execution of every indexed command, external-site availability or a green full quality suite.

## Addendum: runnable help, resolved findings and timestamp diagram

Inspected the rebuilt 4199 page after the builder's ready message, and the subsequent ready build with the first-to-sixth practice correction. Read and challenged the reader's addendum and its new R3 finding. This extension now has 53 reference entries and 34 indexed option forms: the original 33 plus the explicitly requested and now taught `-h`. The ten-filter inventory is unchanged.

### Actual browser help and previous fixes

Independently ran the actual help cell from its initial `ffmpeg -h` command in a fresh Chromium context. It reached “Command completed”; the raw log identifies browser FFmpeg 5.1.4 built with Emscripten and contains “Getting help:”. No `/media/notebook/` request occurred before navigating to another lesson. Reload retained the executed help log. This verifies a real no-input/no-media-output browser query, rather than a static copy of native help. It does not claim every option listed by that build is taught by the course.

S1 is resolved by “Native terminal examples” and the explicit qualification that some media options also work in the browser. R2 is resolved by explaining that `force_style` overrides subtitle style and chooses the font. R1 is resolved in the tested round trip: query `-ar sample` and purpose `streams-encoding` survive following the lesson, waiting for its actual heading and using Back. The URL retains `q` and `purpose`. The reader independently confirmed the native/cursor round trip in all four contexts.

### Timestamp facts, computation and independent practice

The model reads the first four recorded video timestamps from `visuals/media.json`, rather than inventing them from an average rate. An independent native `ffprobe` of `public/media/notebook/bunny-short.mp4`, selecting video and requesting `frame=pts,pts_time`, confirmed `[0, 512, 1024, 1536]` ticks and `[0, 0.041667, 0.083333, 0.125000]` seconds. The recorded video time base is `1/12288` second per tick.

For every selected adjacent pair, subtraction yields 512 ticks and multiplication by the time base yields `1/24` second, rounded to `0.041667 s`. The diagram computes five clock positions with four gaps: the endpoints and three intermediate marks, each gap 128 ticks. The intermediate positions are expressly labelled calculated clock positions, not extra measured pictures. One tick is separately converted to approximately `0.000081 s`. These claims and the displayed distinction between absolute timestamps and elapsed intervals are technically sound.

On the built page, selecting picture 3→4 updated the highlighted endpoints and calculation to `1536 − 1024 = 512`; the larger view contained three intermediate marks. Read the rendered diagram at desktop width and inspected the phone-width capture; no page-level overflow appeared at 390 px. The reader independently exercised every pair in four contexts. Scratch captures and rendered text are in `/tmp/command-reference-sceptic/`.

**S2 — Medium, accepted and resolved during review:** the initial extension displayed the first four absolute timestamps before a practice asking for first→third. Because picture 1 is at zero, the shown picture 3 values directly exposed the requested result. The builder agreed and changed the practice to first→sixth through a separate prose pass. The final ready build now asks for that span; neither `2560` ticks nor `0.208333` seconds appears in the diagram. Five intervals at 512 ticks yield 2560 ticks, equivalent to `5/24` second; native probe output also confirms the sixth picture's timestamp. The diagram remains a worked adjacent-interval example, and the final practice requires applying it to a different span.

### R3 — Low, observation accepted; mandatory reorder rejected

The help cell does push search below the first screen. Independently measured the fresh search block at approximately y=1049 on desktop and y=1254 on phone; the reader's input positions y=1082/y=1287 are consistent with the input appearing below its label. This is a real extra scroll for a learner arriving solely for lookup, so the low-severity observation is justified.

However, the user expressly requested a runnable command box, and placing it before the search leaves the search, count and matching entries adjacent. Moving it between the controls and results would interrupt every filtered lookup. Neither the current placement nor the reader's suggested alternative establishes a completion blocker. The builder's decision to retain this order is defensible; no mandatory layout fix is ranked. A plain local jump link to search is a small optional improvement if later usage warrants it. A new collapsed help disclosure is not required by this finding.

No material issue remains in the extension inspected here. The independent checker and running full quality gate remain responsible for their own final built-page and suite results. This addendum does not claim physical-device, screen-reader, offline or cross-browser verification by the sceptic.
