# Resolution and implementation

Copyright © 2026 Christopher Snow.

The supplied ffprobe guide now explains why one reader prints several related format names, retaining the independent MP4 identity and the separate Stream lines. An added row quotes the recorded Duration and bitrate fields, with an ellipsis for the omitted start field. Two paragraphs explain whole-file data rate, decimal kilobits, the bit/byte conversion, averaging, per-stream scope and playback-speed distinction. Existing row text and the new paragraphs use the existing inline code/bold renderer; paragraph spacing preserves the previous single-paragraph appearance.

No command, raw log, fixture, processing or storage behaviour changed. The recorded example remains explicitly labelled as the supplied source even when the learner changes the input command. Native media verification now checks the recorded displayed bitrate against the independently probed file-size/duration calculation and the lower sum of the source stream rates. Existing unit and browser checks cover the fourth row and keep the actual log byte-for-byte plain text.

Separate prose drafting: GPT-6.1 Sol / medium. Independent learner, sceptic and checker: separate GPT-6.1 Sol / high agents, following the referenced authoring guidance. The reader found no actionable issue; the sceptic's native/source verification confirmed the facts. No ranked product fix was needed after review. The final built checker and full gate are recorded separately.
