# Desktop and home-screen icon

Copyright © 2026 Christopher Snow.

The owner requested a desktop icon after offline support was delivered. Extend the app with a stable web-app identity, original icons derived from the existing teal/orange play mark, a standalone launch manifest, browser installation controls and concise fallback instructions. The standing main deployment authorisation applies. Follow the existing separate draft → reader → sceptic → fix → checker process in `docs/notes/install/review/`.

The manifest stays within `/video-lab/`, uses a stable id/start URL/scope, and supplies 192/512 PNG icons plus a maskable 512 icon. SVG and 32-pixel favicons and a 180-pixel Apple touch icon cover browser tabs and Apple home screens. Original geometry is in public/icons/video-lab.svg; scripts/generate-icons.mjs reproduces the PNGs without new dependencies. The central mark fits within the maskable 80%-diameter safe circle.

Install is offered only after a real browser beforeinstallprompt event. Prompt cancellation, acceptance, failure, appinstalled and already-standalone state are distinct; a synthetic test must never be represented as an actual OS installation. Manual browser instructions remain available when prompting is unsupported or not offered. Installation does not prove an offline download is complete; the existing explicit offline download/readiness flow remains required. Manifest and icons join the generated offline bundle automatically.

Verification: built manifest/base URLs and PNG dimensions; browser-reported Chromium installability; controlled prompt lifecycle tests; responsive light/dark UI; offline manifest/icon availability; unchanged full check. Actual OS desktop icon placement and Safari/iOS shell installation cannot be automated by this Linux browser environment and must not be claimed. Use the browser's normal install/save action; do not create a shortcut on this remote workspace and imply it is the user's desktop.
