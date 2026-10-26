# Visual teaching — independent final checker

Copyright © 2026 Christopher Snow.

The `visual_checker` session checked the integrated built candidate served at
`http://127.0.0.1:4173/video-lab/` on 26 October 2026, after the builder's ready
signal. It did not implement or author product changes, rebuild the app, run the
full quality gate, commit or deploy. Read `AGENTS.md` and the visual-teaching
plan, facts, separate copy, reader, sceptic and resolution records.

## Built coverage and artifacts

Ran the scratch browser scripts below from `/workspace/video-lab`. All artifacts
are under `/workspace/scratch/visual-teaching/checker/`.

- `node /workspace/scratch/visual-teaching/checker/sweep.mjs`: all 24 notebook
  routes at desktop 1440 × 1000, tablet 820 × 900, phone 390 × 844 and narrow phone
  320 × 844, light/dark, 100%/200% root text: 384 page states. Captured 272
  individual figure screenshots, covering 17 rendered figure regions including
  retained originals, and full-page desktop/light/100% screenshots of all routes.
  `observations.json` records zero horizontal document overflow and no figure
  overflow beyond the script's two-pixel rounding allowance.
- Inspected the screenshots, rather than treating those metrics as proof of
  legibility: all viewport/theme/text-size contact sheets; the desktop/light
  figures at larger resolution; and individual tablet/enlarged pipeline and
  phone/enlarged dependency, faststart and other control screenshots. Read the
  rendered lesson text saved in `pages.txt` across the 24 routes.
- `node /workspace/scratch/visual-teaching/checker/content.mjs`: passed built
  content assertions for quality prerequisites before the comparison, established
  wording in the copy model, and the changed timestamp practice.
- `node /workspace/scratch/visual-teaching/checker/controls.mjs`: passed at
  desktop/light/100% and 320-pixel phone/dark/200%. Verified source loading,
  selection and playback; builder editing/apply/editor switching; real ffprobe
  output; source replay hide/show; Files preview, keyboard focus containment,
  Escape and focus restoration; overview/back navigation and draft retention;
  real FFmpeg cut, saved output replay and absence of document overflow after
  results loaded. `controls-result.json` records the results.
- `node /workspace/scratch/visual-teaching/checker/extra.mjs`: passed at the same
  control sizes. Keyboard Home/End/ArrowLeft changes the amplitude model while
  leaving the command unchanged. Raw requested output remains plain text,
  unchanged by wrapping and byte-for-byte equal to its persisted log evidence.
  `extra-result.json` contains the results.

## Accepted findings checked on the built candidate

1. **Annotated dimensions:** the literal video excerpt now reads
   `Stream #0:0 … Video: h264 … 854x480 … 24 fps`. The interpretation and actual
   source picture agree. The hexadecimal stream identifier no longer occupies
   the dimensions position. Genuine edited-command output remains separate.
2. **Pipeline and enlarged captions:** copy and decode/encode paths have readable
   ordinary words at desktop and tablet, including enlarged text. They stack on
   phones. Dependency captions have full width, and faststart's beginning/end
   labels sit above/below the vertical layout on phones; their ordinary words no
   longer fragment at 200%. Individual screenshot inspection confirmed this.
3. **Prerequisites and prose:** libx264's encoder role and constant rate factor
   (CRF), with lower/higher direction, precede the quality image comparison.
   Copy's model uses “encoded data”. Targeted duplicate mechanism prose has been
   trimmed while definitions, model boundaries, command observations and fade's
   start-plus-duration reasoning remain. The fade still clearly relates its
   5-second start and 3-second duration to an 8-second finish.
4. **Independent timestamp practice:** the figure teaches one 512-tick interval;
   practice asks from first picture to third, two consecutive intervals. It
   requires a changed calculation rather than copying the displayed answer.
5. **Stream selection:** stacked phone diagrams omit the downward source-output
   arrows. The two separately labelled outputs and accompanying explanation no
   longer suggest a serial conversion between video and audio.

The first sweep found one additional issue at 320 pixels with 200% text: the
six-picture dependency rows gave each box only about 20 pixels while several
letters were wider before padding/borders (D was 23.69 pixels). Letters extended
into arrow gaps despite the document fitting. Reported promptly to the builder
with `narrow-dark-2-cut-join-keyframes-fig0.png` and `geometry.mjs` evidence.
A second small residual was the existing keyframes option explanation's
undefined “packets”, outside the now-correct copy model. Both were returned for
integration; the final built follow-up is recorded below.

## Real local offline check

The extra script observed zero encoder asset requests during initial reading.
It verified inclusion of all six PNGs and both complete quality MP4s in the
lesson offline manifest, then used the actual App status **Download for offline
use** action. Readiness became true. Disconnected the browser context, reloaded
successfully under the actual service worker, and fetched each of those eight
assets with `cache: no-store`. Every response had the committed byte count and
SHA-256 hash. Navigated to scale, crop, pad and quality while offline, checked
loaded image dimensions and captured their displayed figures. This checks the
new visual assets in a real local offline app; it is not a claim to repeat every
update/restart or storage-recovery test.

## Limits

The matrix uses Chromium and enlarged root text, not browser zoom, physical
phones, a screen reader or an automated contrast certification. Firefox and the
full repository quality gate belong to the integrator's run. Native FFmpeg
source/hash/fact verification was independently covered by the sceptic; this
checker did not rerun the native generator or claim a second native build.

The ordinary source/measurements link points to the expected GitHub record.
An attempted live GET failed with `ECONNREFUSED` to GitHub in this environment;
the external hosted destination was therefore not verified. Local supplied
assets and the recorded offline checks do not depend on that link.

An incidental existing extreme-layout limitation remains outside these figure
changes: at 320 pixels/200% the Files dialog title and Close button split words.
Files keyboard containment, Escape and focus restoration passed. No changes
were made to that component or unrelated learner-audit work.

## Final built follow-up

After the builder's final ready signal, ran
`node /workspace/scratch/visual-teaching/checker/followup.mjs` against the rebuilt
site: 320/390/820/1440 pixels × light/dark × 100%/200% text, 16 focused states.
All passed, with geometry in `followup-result.json`. At 320 pixels/200%, every
picture box is now at least 32 pixels wide with a 12.8-pixel gap; all glyphs fit
inside their own boxes, with at least 3.81 pixels to the right edge. Inspected
both theme screenshots and enlarged phone/tablet comparisons directly. Letters,
borders and the smaller left-pointing arrowheads are distinct, and the arrows
still communicate reference direction. The unsupported “packets” noun is absent
from all authored keyframes-page text.

Reran `content.mjs` on the final build: all 24 routes loaded, and the quality
prerequisites, copy wording and independent timestamp practice assertions passed.
The final `pages.txt` contains that build's rendered text. The full 384-state
matrix predates these two narrowly scoped follow-ups; it was not repeated.

The screenshot sweep also identified fragmented captions in the retained 4:2:0
figure at enlarged phone sizes. The builder included this figure in the visual
revision and stacked its three component groups on phones. After that build's
ready signal, ran
`node /workspace/scratch/visual-teaching/checker/colour-followup.mjs`: 320/390/820/
1440 pixels × light/dark at 200%, eight states. All passed. The four Y positions
remain a 2 × 2 grid, with one U and one V sample. Every ordinary caption word
occupies a single line fragment; phone columns stack and wider columns remain
side by side. Inspected the final phone screenshots in both themes and the wider
comparison directly. `colour-followup-result.json` records the geometry and
`final-colour-*.png` the displayed result. No horizontal document overflow was
present.

All accepted reader/sceptic findings and the checker follow-ups are resolved in
the built candidate. No blocker remains for this visual-teaching revision within
the coverage above. The integrator still owns the complete quality gate and
hosted deployment verification.
