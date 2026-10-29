# Independent CI focus investigation

Copyright © 2026 Christopher Snow.

Reviewer: ci_focus_review; no product or test edits made.

## Failure and finding

Pages run 40928691291 failed the desktop-dark case of `tests/codecs.spec.ts:162`, at its keyboard Enter navigation assertion (line 201). The URL stayed on the video-container reference instead of changing to the playback checklist. This is consistent with a real focus race, rather than a wrong hyperlink or a need for a longer timeout.

`src/main.tsx` defers format and codec heading focus with `requestAnimationFrame` inside the route effect. The rendered link can already receive focus before that callback runs. When the callback subsequently focuses the heading, Enter no longer activates the link. The code also does not cancel obsolete scheduled frames on route-effect cleanup.

## Built-site reproduction

Used the current built bundle `course-DHI1q0I-.js` through Vite preview on port 4191, Chromium desktop dark. A controlled scheduling harness holds animation-frame callbacks without changing page DOM, route data, or link behaviour:

1. Open `#/appendix/formats/video-containers`.
2. Wait for the playback-check link, then focus it.
3. Release the held animation-frame callback.
4. Press Enter.

Measured result before releasing the frame: active element `A`, text `How to test an export in the receiving app →`; one frame pending.
Measured result after releasing it: active element `H1`, text `Video containers`.
Measured result after Enter: URL remains `#/appendix/formats/video-containers`.

Harness: `/workspace/scratch/ci-focus-repro.mjs`.
Screenshot: `/workspace/scratch/ci-focus-before.png`.

This reproduces the causal failure deterministically and matches CI. It does not claim to reproduce every uncontrolled CI scheduling condition.

## Recommended smallest correction

Perform route heading focus and scrolling synchronously in a layout effect after React commits the route's DOM, before the browser can expose an interactive frame. Remove the deferred animation-frame callbacks from this route-focus work. Keep the existing canonical-route handling, initial-route focus policy, section IDs, ordinary-route main focus and legacy section scrolling.

Do not replace keyboard Enter with click or add retries/timeouts: those would leave the focus-stealing behaviour in place. Merely waiting for the initial heading in the existing test would avoid the race in that test, but would not correct focus stealing for an early real interaction.

## Meaningful regression

Keep the existing route/Back/draft test. Add a controlled delayed-frame regression: hold callbacks before route load; after the reference link can be focused, release callbacks; verify that focus remains on the link and Enter reaches the checklist. Cover format and codec deep routes, normal navigation/Back and direct load/reload as appropriate. Verify synchronous initial heading focus still works, and no delayed callback overrides learner-chosen focus. This test should fail on the original built version and pass on the corrected build.

## Scope

No new learner-visible copy is needed for this functional repair. Existing guide content, command execution, saved drafts/files and WASM are outside the defect. No reason found to weaken the quality gate or change worker/retry settings.
