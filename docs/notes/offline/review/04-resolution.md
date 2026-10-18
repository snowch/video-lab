# Offline review resolution

Copyright © 2026 Christopher Snow.

The independent reader identified two medium status issues; the sceptic upheld both with the pre-fix/current-build distinction retained. No loss of saved media or work was observed.

- **R1:** A completed background update now clears an obsolete “up to date” notice. The update explanation and reload action agree. A regression performs a no-change check followed by a separately detected complete update. Connection changes preserve in-progress download/check notices.
- **R2:** A failed operation rechecks the active worker's complete asset set. If that copy remains complete, separately drafted text explicitly confirms offline availability and names Check for updates as the retry action. If it is incomplete or cannot be verified, the UI uses the ordinary failure message. Both a failed asset fetch during update and a disconnected check without a waiting update are covered. The readiness claim is not inferred from an old React state value.
- **Additional wording correction:** The drafter broadened the no-copy offline message so it also describes a browser that never downloaded a copy.
- **Waiting explanation guard:** When an operation notice coexists with a complete waiting update, the waiting update's existing multi-tab reload explanation remains visible separately. This prevents the action from losing its stated consequence.

## Dissent and test correction

The builder initially expected a disconnected update check to fail even when another worker was already waiting. The sceptic did not reproduce that assumption: Chromium retained its waiting-ready message and enabled reload action. The added regression independently demonstrated the same result. That failed assertion was a test assumption, not a product regression, and is not claimed as evidence of a lost waiting explanation. The revised test uses an actual new worker revision with an unavailable required asset while the prior complete revision waits, establishing a genuine failed operation alongside a waiting copy.

The checker is responsible for the final built-page verdict. Full-check results are in `06-validation.md`; this author-authored resolution is not independent approval.

## Final update-check truthfulness follow-up

The checker's preview observation also showed that `ServiceWorkerRegistration.update()` can resolve with its recently checked worker while the browser is disconnected. Its completion alone therefore cannot justify the UI's “up to date” claim. The update action now first fetches `sw.js` with `cache: no-store` and a bounded timeout, requiring a successful HTTP result. That coordination file is outside the saved-asset manifest and is never served from the worker's offline cache. A disconnected check therefore reports the separately drafted retained-copy failure message rather than a fresh-success claim. Automatic background updates and offline lessons are unchanged. The checker was asked to independently verify this narrow follow-up, and the complete quality suite was rerun.
