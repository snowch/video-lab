# text/subtitles copy decisions

- Retained one worked command and the existing practice output, duration and audio/video expectations. Commands are owned elsewhere and unchanged.
- Checked the relevant native and WASM command records: the WASM log loads fonts/DejaVuSans.ttf and selects the DejaVu Sans family. Kept both folder availability and explicit family selection; a folder alone is insufficient. Explained quotes, colons and the family/file distinction beside the command.
- Checked the actual supplied SRT: cues run 0–3 and 3–6 seconds. Introduced cue structure and burned-in picture pixels before the command, without repeating option syntax in the concept.
- Preserved the original instructional-text credit and explicit non-transcription statement. Omitted library and encoding jargon that is unnecessary to use this example.
- Practice now edits the second cue while preserving timings, then uses the existing rendering solution. This demonstrates that changed input text can require rerendering with an identical command. Automated checks remain limited to duration and stream presence; text, timing, readability and sound need replay.
- Prerequisites: input/output filenames, video filters and ordinary Files controls from preceding pages. No prediction because cue visibility is already explained. This is a drafting note, not independent review.
