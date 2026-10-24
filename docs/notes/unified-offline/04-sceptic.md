# Independent sceptic — one offline download

Copyright © 2026 Christopher Snow.

Read AGENTS, the verified brief, separate prose draft and learner report, then challenged their claims against the actual built application. Reviewed `course-BP3W0lxI.js`, SHA-256 `abfd2859c44940125e41efc8b826e98f7dda5099c8630c9fe357aa68439a9697`. I made no application-source changes. The separate local HTTP origin serves the actual dist bytes and deliberately fails/corrupts selected real responses; it does not fabricate processing output.

## Retained finding

**Minor, truthful status after eviction:** complete one download, select Check for updates and observe “Your saved copy is up to date.” Delete the cached WASM file to model browser eviction, then dispatch the normal focus refresh. The app correctly changes `data-offline-ready` to false and offers Download for offline use, but its live status still says “Your saved copy is up to date.” The stale `current` notice takes precedence over newly verified incomplete readiness. This makes the one visible status unclear about whether the saved copy is complete. Clear that notice on an incomplete refresh, or let the incomplete status take precedence. Reproduction and screenshot: `/workspace/scratch/unified-offline/sceptic.mjs`, `sceptic.json`, `sceptic-current-eviction.png`.

## Independently verified

On Chromium phone/dark, opening the panel made no encoder-asset requests. The displayed **41,849,659 B** matched the actual manifest sum. One keyboard-activated download failed at a deliberately unavailable WASM response; the app reported failure and incomplete readiness while all **191** lesson-manifest files remained cached. A retry with corrupt WASM bytes also failed integrity validation. Clearing the fault and using the same Retry download action completed both packages. The already cached lesson picture had no additional network requests during either retry.

After the identified eviction state, the same download action repaired the saved copy. Disconnecting and reloading preserved the exact custom `ffprobe -v error mousepad-demo.mp4` draft, and actual WASM ffprobe completed offline. No page exceptions occurred. The selected practice source remained intact; no media or user-storage migration is introduced by this slice.

A further pass changed the real worker cache version on the test origin. The update waited for the actual Reload to use update control, reloaded two open tabs together, and retained the exact command draft and an unrelated cache. A subsequent deliberately incomplete lesson-update download reported that the saved copy remains available and retained complete readiness. This verifies both the successful and failed update paths independently; it is separate from the retained stale-notice finding.

## Rejected concerns and limits

The reader's core claim that the single action supports real offline processing is supported independently. Keeping two internal manifests and worker operations does not expose two learner downloads; this implementation presents one action and reserves readiness for both. Keeping Check for updates and optional installation controls does not reintroduce a competing processing-tools download. Engine assets remain unfetched when merely reading, until the learner explicitly chooses the complete download or processes media.

I did not repeat all four size/theme combinations or native output measurements, nor claim public deployment, Firefox or unsupported-browser verification. The learner, full quality gate and separate checker/deployment passes record their own coverage. The retained finding needs builder resolution and checker verification before closure.
