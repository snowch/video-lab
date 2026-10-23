# Verified command facts

Copyright © 2026 Christopher Snow.

Native FFmpeg/ffprobe 7.1.5-0+deb13u1. From the repository root, create an empty temporary directory and run `VIDEO_LAB_FACTS_DIR=/path/to/empty-directory node docs/notes/all-labs-cli/evidence/native-run.mjs`. This executes the source command constants rather than copying predicted outputs; `native-facts.json` records this review's result. Node 24 supports the TypeScript/JSON imports used here.

The original report passes all six checks. The reset audio/video concat yields four seconds and 48 pictures; maximum reduced-RGB RMS 0.5173159003362846 passes the threshold of 2. Reversing the concatenation retains 48 pictures but maximum RMS 5.471916940159089 fails. Removing both video/audio timestamp-reset filters from the command produced eight seconds/96 pictures in native and WASM tests. These are measurements of these sources, versions and commands.

Browser tests additionally execute real WASM report creation, frame extraction, stream removal, accurate trim, copy, reset and unreset concat, wrong-order rejection, saved artifacts, archived achievements, notes and hints. The checker tests bytes and recorded execution provenance; this is a learning workspace, not an anti-cheating security boundary against deliberate browser-storage manipulation.
