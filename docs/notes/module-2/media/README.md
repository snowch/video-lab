# Cutting and joining media

Copyright © 2026 Christopher Snow.

All pictures, app source and synthetic tone originate in this repository's [Module 0 recording](../../module-0/media/README.md). No third-party media or new licence is introduced. Module 2 generates a controlled-keyframe derivative, six cut comparisons and four joined results. All assets are served locally under `/video-lab/media/module-2/`.

Run `node scripts/module2-media.mjs --generate` to regenerate and verify, then `npm run format` to apply repository formatting to generated JSON. Run `node scripts/module2-media.mjs` to verify committed outputs without changing them. Native FFmpeg/ffprobe are mandatory; no skips. `generation.json` records every generation command, exact tool versions and the ffprobe command. `src/module2/fixture.json` and the identical public `evidence.json` record SHA-256, stream properties, PTS ticks/seconds, keyframes, decoded audio blocks, intended source-picture mapping and extracted stills.

The verifier checks every record against fresh native probing and every output picture against its mapped source picture. Copied decoded pixels must be identical; re-encoded pixels must have mean absolute RGB error below 3 (0–255 scale). Extracted JPEG references allow error below 4. The source derivative is also compared to the original recording. These checks validate the committed assets, not bit-for-bit encoder reproducibility across FFmpeg versions.

Explicit `-r 12 -fps_mode cfr` preserves this known constant-frame-rate fixture's final picture duration after filtering. This is a deliberate fixture setting, not a recommendation to force arbitrary variable-frame-rate input to 12 fps. Copied streams retain small measured audio/video start offsets and may have container duration longer than the video stream. The UI reports those differences.

The browser selects recorded outputs and shows a mathematical source/output timeline. It does not run FFmpeg or render arbitrary edits. The failure experiment is a labelled clock model, not a recorded failure output. Audio is the quiet synthetic tone inherited from the source, not speech; listening is optional.
