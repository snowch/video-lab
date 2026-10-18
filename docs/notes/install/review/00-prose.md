# Separate installation UI drafting pass

Copyright © 2026 Christopher Snow.

Read `docs/notes/install/fact-brief.md` and `docs/notes/install-plan.md` on 18 October 2026. Applied the repository's British English and plain-language standard and the Assembly Lab style guide already read during earlier drafting assignments. Created only `src/install/strings.ts` and this record; no app implementation or browser review is claimed.

The verified brief records original icon assets, stable app identity and scope, and a passing manifest unit test. It distinguishes a browser-offered installation request, accepted or dismissed choice, a browser installation report, and a window already running in app display mode. Copy preserves those distinctions without naming browser APIs. Acceptance asks the learner to check for the icon rather than claiming desktop placement succeeded. The installed message accommodates either an installation report or the current app window. No exact icon location is promised across devices.

The manual instructions cover Chrome and Edge on computers, Safari on Mac, iPhone and iPad, and Firefox desktop's lack of a built-in installation flow. Menu wording variation is explicit. The offline reminder uses the existing action label, “Download for offline use”, and requires a complete ready copy before disconnecting. Installation is not presented as a substitute for downloading lessons.

Added `help`, “Installation instructions for your browser”, for the nested manual-instructions disclosure requested by the builder. The installed status explicitly accommodates both a browser installation report and an already-open app window; it does not depend on a permanent saved installation flag or promise a physical desktop icon.

Proposed replacement `index.html` no-script text, sent to the builder rather than editing the HTML: “Video Lab: From Frames to Finished Demos. Modules 0 and 2 are available. JavaScript is required for the interactive lessons. The remaining modules are planned.”

Sentence pass: direct labels and instructions, British English, no implementation terms, marketing or claimed OS installation. Meaning pass: explain what an app icon enables, where the browser may offer installation, how a learner can use manual instructions, and why offline download remains a separate step. The builder must check the installed and prompt-status bindings against the finished UI. This drafting pass does not replace independent reader, sceptic or checker review.

Updated the existing offline disclosure title to “Offline access and app installation”. Installation controls are inside that disclosure, so the summary must name both facilities for learners to find the new icon instructions without opening a panel labelled only for offline use. No other offline copy changed in this follow-up.

Corrected the Firefox guidance after the builder identified an overgeneralisation in the original fact brief: lack of manifest-based installation does not establish that Firefox has no desktop web-app facility. The revised string directs learners to Firefox's web-app option where available, with Chrome, Edge or Safari as alternatives. This supersedes the categorical Firefox limitation described earlier in this note. It makes no OS placement claim; the builder is verifying the browser documentation separately.

Added `install.android` following the reader's finding that manual Android installation instructions were missing. Fetched Google's Chrome Android web-app help successfully on 18 October 2026 and read its installation steps. The current source names More > Install and create shortcut > Install; this differs from the initially proposed Add to home screen wording. Used the observed route with a general version-wording caveat, without unsupported alternative labels. Updated the fact brief with the source and exact distinction. Only the strings and permitted documentation changed; no Android device test, implementation change or independent validation is claimed.
