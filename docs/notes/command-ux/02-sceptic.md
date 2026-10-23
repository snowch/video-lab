# Independent sceptic review

Copyright © 2026 Christopher Snow.

The separate `prototype_sceptic` agent tested every finding in `01-reader.md` against the built prototype on 23 October 2026. The reviewer did not draft or implement the interface and made no interface or copy changes. The reviewed HTML at `http://127.0.0.1:4173/video-lab/optional/command-workbench.html` had SHA-256 `0f0a12a27c6f8ef2502ff0f8180d06a7b410b32e6144b58cfbe0ea1a186c11f9`; the served and public files matched. This pass included the builder's keyboard-focus fix, which arrived after the reader's original observation.

## Findings retained and resolved

| Finding | Decision | Independent evidence |
| --- | --- | --- |
| R1: source replay requires leaving Trim | **Keep, medium.** | Trim says `Choose times that suit your own recording`, but its source chip offers only `Change source`. There is no video element or replay button in that task. Reproduced the return to Get video, playback there, then return to Trim. Preserving the command avoids data loss but does not remove the navigation round trip. A collapsed replay beside the current source is a proportionate correction. |
| R2: Preview loses keyboard focus | **Original problem justified; current fix verified.** | Focused `Preview run` and pressed Enter. In all five tested browser/viewport/theme cases, focus now lands on `DIV#result`; the next Tab reaches `Show example report`. It no longer returns to `BODY` or `Skip to lesson`. The final checker should retain this regression check after subsequent edits. |
| R3: inspection badges omit their role | **Keep, low.** | The visible badges remain `H.264 · 960 × 540`, `AAC`, and `10 s`. The surrounding short introduction defines a stream but does not connect these names to pictures or sound, nor label pixels/duration. `codec_type` in expanded JSON supplies the missing meaning only after further discovery. Labelling video, audio, dimensions and duration preserves the useful compact summary without a new lecture. |

## Rejected or limited interpretations

The initial phone scroll is not a separate blocker. At 390 × 844, the start field begins at document y=624.5, the complete command spans y=778.6–901.8, and Preview run ends at y=1011.6. Thus the field → command → action sequence occupies approximately 387 pixels and can be viewed together after an ordinary downward scroll. Requiring the entire lesson to fit in the initial viewport is not supported by this evidence. The replay round trip in R1 is a concrete remaining back-and-forth cost. Physical mobile keyboard behaviour was not tested.

Native processing is deliberately absent from the requested HTML mockup. The persistent prototype notice, `Simulated execution`, recorded report note, custom-command note and unavailable video-export message disclose this limitation. It is not justified to describe the recorded report as fabricated execution: native ffprobe on the embedded original independently reports H.264 video, AAC audio, 960 × 540 pixels, ten seconds and 128737 bytes. Imported media was explicitly shown as unmeasured, and edited commands received no invented output or success claim.

## Other checks and limits

Executed source → Inspect → Trim journeys in Chromium at 390 × 844 light/dark, 768 × 1024 light and 1365 × 900 dark, plus Firefox at 390 × 844 dark. Checked genuine source import, builder duration changes, manual draft preservation across the explicit replacement choice, custom-command preview disclosure, changed-source warning, and absence of document-wide horizontal overflow or page errors. Visually inspected the dark phone screenshot. The source identity is visible while a preserved manual command still names its previous file; the warning explicitly asks the learner to review that filename.

The test script and structured results are `/workspace/scratch/command-ux/sceptic.mjs` and `/workspace/scratch/command-ux/sceptic/results.json`, with screenshots in that directory. These are browser-emulation checks, not a physical touchscreen or screen-reader audit. No additional justified blocker was found for this isolated prototype. R1 and R3 remain for the builder and final independent checker.
