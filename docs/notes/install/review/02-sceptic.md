# Independent sceptic review — app installation and icon

Copyright © 2026 Christopher Snow.

Reviewed 18 October 2026 by the existing independent sceptic. I did not author this feature or its learner review. This pass covers the manifest/icon/install controls and their offline boundary only. I read `AGENTS.md`, the install plan, feature source/tests and `01-reader.md`, then tested both proposed findings against the served production build and authoritative references. No product files were edited.

## F1 — Upheld, medium; rank 1

The built manifest supplies `"id": "./"`. My independent Chromium `Page.getAppManifest` call on `http://127.0.0.1:4173/video-lab/` returned:

```text
id:       http://127.0.0.1:4173/
startUrl: http://127.0.0.1:4173/video-lab/
scope:    http://127.0.0.1:4173/video-lab/
```

Manifest errors and installability errors were empty. That agrees with the reader's evidence.

**Challenge to the finding:** This is a valid identity, and an identity is not required to be within the app's navigation scope. The launch URL and scope are correct. Reject any stronger claim that the manifest is invalid, installation necessarily fails, the icon launches the origin root, or an existing installed app was actually overwritten. None of those outcomes was observed.

**Why it survives:** The plan specifically requires a stable course identity within `/video-lab/`. The parsed identity is the shared origin root. The [W3C processing algorithm](https://www.w3.org/TR/appmanifest/#id-member) says to use the start URL's **origin** as the base when parsing `id`; the [MDN id reference](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/id) states the same rule. Relative start/scope/icon URLs do not all share that identity rule. A root identity can collide with another app choosing the same identity on this shared origin; this is a risk, not an observed collision.

The current manifest unit test passes, but it resolves `id`, `start_url` and `scope` against the manifest file URL alike. That does not model the browser's `id` algorithm, so the green test does not establish the planned identity.

**Smallest direction:** Use an identity that actually resolves to the course path, such as the root-relative `/video-lab/`, and keep it stable across releases. Correct the unit test's identity base and assert the browser's parsed `manifest.id` separately from its eligibility/errors. Do not change the already correct launch/scope URLs merely to compensate for this identity error.

## P1 — Upheld, low; rank 2

The complete rendered help lists “Chrome or Edge on a computer”, “Safari on Mac”, “On iPhone or iPad”, and Firefox. No instruction explicitly applies to Chrome on Android when the app-specific prompt is absent. I saw that same list on desktop Chromium, phone-width Chromium and desktop Firefox.

**Challenge to the finding:** The owner's initial request concerned a desktop icon, and an eligible Android browser can offer a real prompt without needing manual instructions. The absence of a prompt in Linux headless testing does not establish Android installation failure. Reject that stronger inference and do not claim physical Android coverage.

**Why it survives:** The adopted feature plan includes home-screen icons and a manual route when a prompt is unsupported or not offered. Its existing help already covers Apple phones/tablets. The computer-specific route is deliberately not an Android instruction; the Apple Share route is not an Android substitute.

Google's current [Chrome Android web-app instructions](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid) describe the browser's More menu, then “Install and create shortcut” and “Install”. This provides an authoritative applicable fallback, while exact wording can vary across versions.

**Smallest direction:** Add one concise, explicitly Android/browser-scoped menu route, qualified for version-dependent wording. Preserve the separate computer and Apple routes and the reminder that installation does not itself save every lesson. No new installation API or simulated button is needed.

## Independent narrow checks and rejected assumptions

No additional ranked defect emerged from this pass.

- The install button is offered from the browser-event path. Controlled acceptance, dismissal and prompt error lead to distinct messages. Acceptance does not itself mark offline storage ready or assert successful OS placement. A subsequent controlled installed event produces the installed/app-window status and removes the button.
- App-window detection checks standalone display mode/Apple's standalone signal. It is not advertised as a universal query of all installed apps in the operating system.
- The manifest icon URLs parsed under the correct course path. The icon unit test passed for the required PNG dimensions and entries. The original SVG mark fits within the stated maskable safe circle; no observed OS mask or desktop/Dock rendering is claimed.
- The visible offline reminder names the existing download action and requires a complete ready copy. In my synthetic acceptance/installed cases, offline readiness remained false. Installing and downloading are therefore not conflated by those controls.
- The revised Firefox fallback avoids the superseded blanket claim that all Firefox desktops lack web-app facilities. No unresolved finding is made about that earlier wording.
- Ordinary menus, browser tabs/app windows and device icons are reasonable prerequisites. Manifest identities, service workers and installation-event names are kept out of the user instructions. P1 is missing applicable guidance, not missing technical vocabulary.

## Ranked outcome and checker criteria

| Rank | Finding | Required built-page evidence after correction |
| --- | --- | --- |
| 1 | F1 — medium, upheld | Chromium's parsed identity is the intended course identity; start URL/scope/icons remain correct; identity testing follows the origin-based rule instead of accepting a false positive from manifest-relative resolution. |
| 2 | P1 — low, upheld | Expanded help offers an Android route when no prompt is available, with browser/version qualifications. Prompt lifecycle and the offline reminder remain accurate. |

No reader finding is rejected in full. The rejected stronger claims are recorded under each item. The builder received the two dispositions before this note was completed; any subsequently applied fixes require a separate checker's review of the rebuilt page.

## Exact evidence and limits

- Actual production preview: Chromium 156.0.8078.4, 1440 × 1000/light. Expanded both disclosures, read the full fallback, queried the actual manifest and installability through CDP, and captured my own desktop screenshot. Both error lists were empty, which does not prove the identity requirement.
- Chromium 156.0.8078.4 at 390 × 844/dark with touch enabled, plus Firefox 157.0 at 1440 × 1000/light: opened disclosures with keyboard interaction, read fallback text, supplied controlled dismissed/error/accepted prompt events, activated the button with Enter, then supplied a controlled installed event. Both had no page errors/overflow; offline readiness remained false. These were synthetic lifecycle checks, not OS installations.
- `npx vitest run src/install/manifest.test.ts`: passed, one test, before the recommended identity correction. Its false-base limitation is part of F1.
- Freshly fetched W3C manifest, MDN id and Google Chrome Android references; local copies are under `/workspace/scratch/install-sceptic-sources/`. Screenshots are `/workspace/scratch/install-sceptic-*`; I visually inspected my phone-dark status screenshot as well as the rendered page.

I did not accept a real browser/OS installation prompt, create a shortcut, test a physical Android/iOS device, test Safari or Windows Firefox, run a screen reader, repeat the offline/media suite, run the full quality check or verify deployed metadata. Actual icon placement is controlled by the user's browser and operating system. This review does not certify fixes applied after its observations.
