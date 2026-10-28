# Formats and images: ranked fixes

Copyright © 2026 Christopher Snow.

## Independent review findings

1. **Medium — teach position syntax before asking for a new position.** The reader and sceptic confirmed that the overlay lesson defined coordinates but first supplied the colon syntax in a hint containing the practice answer. The concept text now introduces `overlay=x:y` and the colon separator before the command and practice. The exercise still asks the learner to choose the required values.
2. **Low — unrelated source credit on image-only pages.** The reader and sceptic confirmed that the existing unconditional Big Buck Bunny footer appeared on pages using only the photograph or original drawings. Lesson credits now follow the actual asset list. The photograph retains its named author, source, licence, adaptation notice and ShareAlike requirements; overlay retains the video attribution.

## Builder corrections before final review

- Identify the checkerboard as a preview aid, not part of the transparent PNG.
- Remove the repeated full overlay command from introductory prose; the editable cell already shows it.
- Preserve real input provenance when replacing outputs: the output argument is not a source dependency. Explicit input references remain dependencies, including a same-name input that FFmpeg itself will reject. Unit and actual browser rerun/check tests cover the distinction.
- The first focused browser run had three test failures because the test expected uppercase `MKV`, while the reference correctly labels the format Matroska and its extension `.mkv`. Corrected the test to inspect the actual extension. The five-project UI rerun passed. This was not a product failure.

A separate checker must verify these changes on the rebuilt site. Full quality checks and merge/deployment outcomes are recorded separately.
