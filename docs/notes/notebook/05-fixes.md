# Notebook course — ranked fixes

Copyright © 2026 Christopher Snow.

The separate reader and sceptic independently reproduced two medium findings on the built course. Both are retained.

1. **R2: inspection feedback disappears.** The file refresh creates new Blob handles; the cell's asynchronous hash effect cleared checks even when bytes and commands were unchanged. Only invalidate checks when relevant evidence actually changes, and reset them when the executed record or edited command changes. Verify inspection-only positive feedback persists, property failures remain visible, and edits/input changes disable stale checks.
2. **R1: raw Aborted() conflicts with completion.** Preserve all raw lines. Record the actual returned engine status with each new run and show a separate browser-runtime explanation only on completed runs with the observed line. FFmpeg completion still requires actual status 0; ffprobe's pinned -1 sentinel still requires independent real JSON validation. No message declares arbitrary aborts harmless or turns native failure into success. Replay/checks remain separate.

Additional author/test fixes: new text files refuse collisions, busy file editors cannot falsely mark concurrent edits saved, edits typed during cell execution survive completion, failed initial storage opening cannot display Saved, folder moves refuse existing destinations, and ZIP exports include standard Unicode path metadata for older native unzip tools. Earlier sources/databases/routes are preserved.

Verification is pending the rebuilt independent checker and final full check; this record does not itself claim those passed.

The independent checker additionally found a blocking executable-truth defect: supplying `fontsdir` loaded DejaVu Sans but did not select it for libass's default Arial style in the pinned browser build. The video encoded and decoded without visible subtitles. The native installation's font fallback masked this difference. Fix: explicitly use `force_style=Fontname=DejaVu Sans`, explained before use, in every subtitle worked/starter/reference command. The checker independently inspected decoded output frames, confirmed the original cue and an edited cue render, and verified native execution as well. A browser regression now downloads the real WASM output and measures the known cue band in a native-decoded frame; the former uncaptioned output fails that check despite being valid MP4. Technical duration/stream checks still explicitly do not grade caption content.
