# Export format lesson copy

- Drafted separately from the builder using the verified export-format brief. Retained the single worked command and the four-second practice solution unchanged.
- Native and WASM evidence in `docs/notes/notebook/commands*.json` records eight-second worked and four-second practice outputs, each H.264/yuv420p with AAC audio in MP4.
- Introduces container, per-stream codec, then pixel storage in separate short paragraphs. Command syntax and each explicit export choice are explained once beside the worked command. The pixel-format option defines luma, colour differences, half horizontal/vertical chroma sampling, planar storage and 8-bit samples without confusing sampling with dimensions or frame rate.
- The builder supplies a labelled explanatory Y/U/V sampling diagram. Copy avoids narrating its individual sample cells or implying that it measures the source.
- Existing source already has these formats, so observation focuses on the actual output log and playback; it makes no claim of an isolated visual subsampling comparison. Compatibility is qualified only after the result.
- Practice adds the previously taught duration limit while retaining the export choices. Automated check scope remains explicit: AAC, pixel format and real destination playback need the stated manual checks.
- No forced prediction: the format relationships are explained directly, so a guess adds no investigation.
