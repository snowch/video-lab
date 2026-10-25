# Compact App status: fresh learner review

Copyright © 2026 Christopher Snow.

Reviewed the existing built preview at `http://127.0.0.1:4173/video-lab/` on 25 October 2026. This reviewer read `AGENTS.md`, `01-facts.md` and `02-prose.md`; made no product changes; did not rebuild or stop the preview. This is a reader finding record, not a claim that fixes or an independent checker have passed.

## Coverage and evidence

Both the main entry and `optional/command-workbench.html` were inspected in Chromium at 1440×900 desktop, 768×1024 tablet, 390×844 phone and 812×375 short landscape sizes, with light/dark themes and normal/200% root font size: 32 cases. Screenshots and raw bounds/font/focus observations are retained outside the product at `/workspace/scratch/compact-status/reader/`; `review.cjs` and `results.json` record the matrix, and `state.cjs` and `states.json` record genuine transfer/cancellation and nested confirmation observations. Enlarged text here means setting the root font size to 200%, not a claim of browser zoom testing.

The ordinary closed state is discreet: one header disclosure reading “App status”, “Up to date” and “Not saved offline”, with no commit/build string. Opening reveals “Version”, “Running version”, its source link and build suffix, “Offline access” and the existing controls. These labels distinguish release freshness from saved availability clearly, without assumed media knowledge. Default desktop, tablet and phone layouts avoid document horizontal overflow. Light/dark screenshots show readable text and visible focus.

Native Enter activation, Escape dismissal with focus returned to the summary, explicit “Close App status” with focus returned, and an outside pointer click all worked in the 32 cases. In both entries, Escape from “Remove the offline copy?” dismisses the nested confirmation, keeps App status open and returns focus to “Remove offline copy”; another Escape closes App status. Actual download then cancellation produced “Saving offline copy” then “Offline copy incomplete” while the release badge remained “Up to date”. Browser offline mode produced “Cannot check for updates” with separate saved availability. No fake app facts or mock state were introduced. A complete saved copy, pending release and coordinated restart were not exercised by this reader; this is not a full update-engine audit.

## Findings for sceptic assessment

### R1 — Medium: the floating panel can extend below the viewport

At main-entry 390×844 normal text, the freshly opened panel starts at y=160.86 and is 700px high, ending at 860.86. At 200% text it starts at y=379.31 and is 556px high, ending at 935.31. At main-entry 1440×900 with 200% text, it ends at 966.02. Tablet dark at 200% ends at 1054.19 on a 1024px screen. These are measured panel bounds before moving focus among controls.

The consequence is visible content clipping, not just an abstract bounding-box discrepancy: after a genuine cancelled download at phone/200%, scrolling the panel to its maximum (`scrollTop=4318`, client height 554, scroll height 4872) leaves the final installation paragraph ending below the screen at y=938.47. The screenshot `main-phone-200-bottom.png` cuts the sentence after “varies by”. The panel itself ends at y=971.14 because the genuine incomplete-copy badge wraps the header further. Its own scrollbar cannot expose the final words within the visible viewport.

Suggested direction: constrain panel height against its actual top position and viewport bottom, accounting for wrapping header rows and safe margins; verify the final text and each action can be reached at maximum panel scroll. Evidence: `results.json`, `states.json`, `main-phone-200-bottom.png`, `main-desktop-200-open.png`.

### R2 — Medium: enlarged desktop text makes the closed main header dominant

At main-entry 1440×900/200%, the closed “App status” summary is only 169.89px wide and 299.22px high. The title and ordinary badges wrap into a tall narrow card because the header allocates insufficient width. This contradicts the requested discreet header treatment and pushes the main content down substantially. At 390×844/200%, even the ordinary closed summary is 191.73px high; the longer genuine “Offline copy incomplete” badge increases it further.

Suggested direction: let the header move the complete status disclosure onto an appropriate row at enlarged text/intermediate available widths, and let each badge retain a sensible readable width. Keep comfortable touch targets and enlarged text rather than reducing the font to force a single line. Evidence: `main-desktop-200-closed.png`, `main-phone-200-closed.png`, `results.json`.

### R3 — Medium: the optional panel can be horizontally clipped at enlarged text

At optional-entry 1440×900/200%, the panel is 1280px wide but begins at x=−12. Its left border and part of the content area lie outside the viewport even though the document itself reports no horizontal overflow. Its position is therefore not constrained to the viewport consistently with its width.

Suggested direction: anchor or clamp both panel edges to the viewport/containing header bounds, including a centred max-width optional header. Evidence: `optional-desktop-200-open.png`, `results.json`.

### R4 — Medium: optional-entry text enlargement is inconsistent inside the new disclosure

With root text enlarged from 16px to 32px, the optional-entry “App status” title remains 16px while both badges grow from 12.8px to 25.6px. The optional panel body, running identity and action labels likewise retain their inherited fixed entry font: the identity's measured line box is 19px high rather than the main entry's 43px at the same setting. This is visible as oversized badges attached to an unchanged title and substantially smaller explanatory text. The reader cannot rely on the same enlarged-text treatment in the two entries.

Suggested direction: make the shared component inherit a scalable base in both entries, including its body and buttons, then repeat bounds checks because correcting that inheritance will change the panel's content height. This may originate in the optional entry's existing base styles; it is still directly relevant to introducing this header/panel there. Evidence: `results.json` font measurements, `optional-desktop-200-closed.png`, `optional-desktop-200-open.png`.

## Reader follow-up after R1–R4 changes

Rechecked the rebuilt preview on 25 October 2026 without product edits, rebuilding or stopping the preview. The same 32-case matrix passed viewport bounds, no document horizontal overflow, Escape/focus return, explicit close/focus return and outside-pointer dismissal. Follow-up measurements wait for the popup's position calculation to settle. Evidence is retained separately in `/workspace/scratch/compact-status/reader/followup/` (`results.json`, `states.json`, scripts and screenshots).

- **R1 resolved in the reviewed cases.** Main phone normal panel now ends at y=836 on an 844px screen; main phone/200% likewise ends at 836. Main desktop/200% ends at 892 on a 900px screen. Both entries' genuine incomplete-download panels at phone/200% can scroll to the final complete installation sentence: final content bottom is 803.67px main and 803.11px optional, within panels ending at 836. The screenshots `followup/main-phone-200-bottom.png` and `followup/optional-phone-200-bottom.png` show the final “browser version.” words. Keyboard focus still reaches each existing action.
- **R2 resolved for the excessive desktop column collapse.** Main desktop/200% closed summary is now 651.94×78.39px, preserving title and badges on a readable row, rather than the original 169.89×299.22px card. Phone/200% remains naturally wrapped (ordinary summary 191.73px high), with readable enlarged labels and no horizontal overflow; it is not a newly narrowed desktop column. Default closed presentation remains discreet.
- **R3 resolved in the reviewed cases.** Optional desktop/200% panel is x=128, width=1280, within the 1440px viewport. No case in the repeated matrix places the panel outside horizontal viewport bounds.
- **R4 resolved.** Both entries' App status titles now measure 32px at root/200%, with badges 25.6px. The optional disclosure's explanation and controls enlarge along with its title. Correcting this inheritance did not reintroduce clipping in the repeated matrix or genuine incomplete-download follow-up.

Nested removal confirmation Escape, focus return to Remove, and parent-panel retention were also rechecked in both entries after the changes. Actual saving/cancellation still shows independent truthful update/offline labels.

Evidence retention caveat: the first follow-up invocation accidentally reused the original ordinary screenshot/output paths before it was stopped and redirected. Those ordinary matrix images were replaced and its partial output is named `interrupted-followup-results.json`; they must not be presented as original-build evidence. The original findings and measurements above remain unchanged, as do original `states.json` and the named 200% screenshots from the separate initial state/extra probes. All completed follow-up evidence is under `followup/`.
