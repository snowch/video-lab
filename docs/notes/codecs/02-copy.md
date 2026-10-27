# Codec appendix copy draft

Copyright © 2026 Christopher Snow.

Separate prose draft from `01-facts.md`, the recorded preparation commands and properties in `src/notebook/codecs-media.json`, the existing Chapter 2 definitions, and the Assembly style checklist at `/workspace/scratch/codecs/workflow/style.md`. The requested `codecGuide` shape is unchanged. No renderer or existing lesson strings were edited.

The appendix starts with container, codec and encoder, then moves from destination compatibility to short video/audio choices. Comparisons are conditional rather than codec rankings. The descriptions do not promise particular encoders in the browser build, a universal quality improvement, or playback on every device.

Audio explanations distinguish lossy omission from lossless reconstruction of input samples and uncompressed PCM storage. Bitrate and sample rate are separate counts. Listening instructions keep device volume fixed, compare the same passage and avoid predicting a particular audible artefact. The reference is explicitly derived from already-lossy AAC and converted to 16-bit PCM, rather than presented as a pristine studio source.

The three player labels identify the reference and the two requested AAC targets in the supplied order. Dynamic formatting uses the renderer's recorded duration, rate, channels and byte count rather than hardcoding those measured values in descriptive prose. The preparation explanation follows the actual three native commands and distinguishes audio targets from whole-file bitrate. It makes no claim that the recipe is runnable in browser cells.

The suggested Chapter 2 replacement retains container and codec definitions, the concrete supplied MP4/H.264/AAC combination, and the filename caveat. The optional link label names the appendix without adding a numbered chapter.

Sentence and idea passes checked short concrete explanations, progressive terminology and limits alongside the claims they qualify. External links include FFmpeg processing/encoder documentation, the Opus and FLAC specifications, original film credits and the practice licence. The separate primary-source comparison brief is still pending at this draft's creation; practical comparison wording and citations must be reconciled with it before final handoff.

Only `src/notebook/codecs.strings.ts` and this note were written. No build, tests, CLI checks or commits were made. This records independent prose drafting, not built-page learner review or a technical validation result.

## Integration clarifications

At the builder's request, the listening introduction identifies Big Buck Bunny as an animated film and includes © 2008 Blender Foundation on this page, alongside the credit/licence source links. The native recipe now tells the reader to download `bunny-short.mp4` through lesson Files into a new working folder, then run the commands separately from that folder. With only the source in a new folder, the three output names introduce new files without an unexplained overwrite step.

The source list includes the builder's planned preparation/provenance record through its repository URL. It is labelled as recorded commands, versions and provenance rather than an interactive result. No claim about browser encoder capability was added to the recipe, even though the builder separately reports successful browser capability checks.

## Primary-source reconciliation and final draft

Read `codec-sources.md` when it became available. Its research was compiled separately while this prose draft was in progress. Revised video entries to describe supported decision contexts and design aims instead of claiming a measured compression or speed ranking. H.264 is the course's established combination, HEVC's efficiency is a design aim, VP9 is tied to WebM/service requirements, and AV1 requires testing the chosen destination and output. No hardware-support or current browser matrix is asserted.

The AAC entry now identifies the actual AAC-LC profile and explains that profile requirements differ. MP3 is a choice for a destination or existing workflow that needs it; its age is not used as evidence of size or quality. PCM explicitly remains distinct from the WAV container. These qualifications are local to the relevant choices rather than repeated as a general warning list.

Added the ITU H.264/H.265, WebM VP9 and AOMedia AV1 primary links, plus the separate source brief containing the audio/PCM primary references and research limitations. The Opus/FLAC specification, FFmpeg processing/encoder, preparation and credit/licence links remain. Codec identities and practical claims now agree with the supplied primary-source brief; there is no numerical codec comparison beyond the actual supplied AAC targets and recorded properties.

This completes the separate prose draft for builder integration and review. No other source files, build, tests, CLI checks or commits were changed or run by this agent.
