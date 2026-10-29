# Actionable guidance: independent final checker

Copyright © 2026 Christopher Snow.

29 October 2026. Independent checker who did not draft or implement these changes. Read `AGENTS.md` and notes 01–04, 06–08, then checked the actual built app at `http://127.0.0.1:4188/video-lab/`. Reviewed bundle: `assets/course-DHI1q0I-.js`. No production edits, commits, new tests or compatibility database.

## Result

No material finding or blocker retained. The reader and sceptic conclusions hold against the built result. The changes resolve R1–R3, E1 and L1 without making research into every codec a prerequisite to the first export.

- The codec reference gives MP4/H.264/AAC as the ordinary starting point, defines the receiving app/device with concrete examples and links to the existing export lesson. HEVC, VP9 and AV1 have specific request/workflow/compression reasons to investigate. Native `ffmpeg -encoders` explicitly describes the installed build's capabilities; the reference does not promise those encoders in this notebook.
- Its numbered procedure teaches short export → Download → open/import/upload in the actual receiving app/device/site → picture, expected sound and intended start/end. Website guidance explicitly checks processed playback after upload. A successful check applies to that file and setup. The export lesson teaches these same minimum actions locally, with the original worked command and practice still present.
- Recovery uses a receiving-app message and published upload/import requirements to identify a concrete change. Bare `ffprobe` Video/Audio lines provide codecs and picture size; Files displays size. The text identifies the course output command as selecting MP4 and warns that renaming an existing file does not convert it. It does not treat a filename or generic probe container-family label as proof of an existing file's exact container.
- Format/container/pixel pages provide starting choices and contextual links to the taught receiving-app test. The distinction between storing/importing, processing and browser preview remains explicit.
- Both personal-image disclosures are closed initially, after the complete worked example and before supplied practice. They give one fixed 640 × 360 canvas, consistent 8-bit RGB PNG/transparency export settings, per-file bare `ffprobe` checks for PNG/pixel format/dimensions, re-export recovery, consecutive names, specific input patterns and distinct output filenames. They separate nominal still-image 25 fps from explicit sequence timing. The supplied practice remains primary.
- Recording starts with a neutral device choice; all four selections remain available. Both return links lead to the current overview. Files → Import files opens the actual chooser; an imported practice MP4 can be selected and replayed. Guidance names the 20 MiB limit and replacing lesson inputs with the exact recording filename. Legacy `#/capture` still resolves. An edited export draft survives the codec-reference/CTA round trip and reload in every context.

## Built checks and evidence

Standalone Node Playwright, Chromium, isolated contexts, service workers blocked. All nine routes were captured at desktop 1440 × 1000 and phone 390 × 844 in light and dark: codec root and `check-playback`; format root, `video-containers` and `pixel-formats`; `learn/export/format`; both `learn/image-video/sequence` and `animation`; and recording. Repeated all 36 combinations at 200% document text, with computed body font 32 px, expanded personal-media disclosures and Windows recording instructions. Every document stayed within viewport width. Visually inspected the route screenshot sheets in all four contexts, enlarged focal views and separate full-size personal-media/mobile-recording/import-replay screenshots. Text, focus indicators and controls remain legible; the native recording command retains its intentional internally scrollable region.

Keyboard activation of each format page's export-test link focuses the actual `#check-playback` H2. Reload retains that focus and Back returns to the source page. Opening that deep link as the first document in a fresh page also focuses it in all four contexts. The export CTA preserves the edited command rather than replacing it with the default. Personal disclosures respond to Enter/Space and phone taps. Pixel-format radios, alpha range and precision/storage disclosure remain operable. All four recording selections and both return links were exercised. Actual file chooser, import, filename selection and advancing video replay passed at both sizes in both themes.

All three existing native audio players retain controls and source URLs; the first clip played and advanced in each context. This confirms availability and loading, not sound quality or every encoder operation. Reading and these controls caused **zero `/encoder/` requests** and **zero page errors** in every context.

Evidence is entirely outside the repository at `/workspace/scratch/actionable-guidance/checker/`: `results.json`, `focused.json`, route text, full-page screenshots, `*-200pct-view.png`, `sheet-*.png`, `*-personal.png`, `*-mobile-instructions.png` and `*-visible-replay.png`.

Commands run from `/workspace/video-lab`:

```sh
node /workspace/scratch/actionable-guidance/checker/check.mjs
python /workspace/scratch/actionable-guidance/checker/sheets.py
node /workspace/scratch/actionable-guidance/checker/focused.mjs
node /workspace/scratch/actionable-guidance/checker/replay-evidence.mjs
```

Final runs passed. Initial checker-harness mistakes used tap in a non-touch desktop context, a guessed phone selector value instead of `mobile`, and a percentage instead of the alpha input's actual 0–1 range. Corrected the harness and reran. Also reset document font size before each normal-size capture because hash navigation preserves an injected style. These were harness issues, not product findings.

## Limits

This is the independent focused checker gate, not full CI. Did not run `npm run check`, execute lesson encodes/native OS capture commands, assess audible quality, certify external recipients or published service policies, or retest offline/update behaviour. Isolated browser contexts test draft retention created during this review, not every pre-existing user's storage. No claim of universal codec compatibility or automatic visual correctness is made. The builder's full final-revision quality gate remains required.
