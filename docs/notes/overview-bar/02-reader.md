# Overview bar: fresh learner review

Copyright © 2026 Christopher Snow.

## Scope and evidence

Independent reader pass against the existing built preview at `http://127.0.0.1:4173/video-lab/`, without rebuilding or changing product files. Read `AGENTS.md` and `01-facts-and-copy.md`. Scope is the overview-bar removal, retained lesson navigation, Files access/focus, routine status visibility and background processing controls; course prose was not audited.

Used Chromium at desktop 1440 × 1000 and phone 390 × 844, light and dark, with root text size 100% and 200%. Screenshots and executable observation scripts are external evidence in `/workspace/scratch/overview-bar/reader/`. The complete matrix and focus results are in `observations.json`; representative images include `desktop-light-100-home.png`, `phone-light-100-home.png`, `phone-dark-200-home.png`, `phone-dark-200-lesson.png` and `phone-light-200-files-home.png`.

## Findings

**R1 — Low; existing Files-dialog presentation, outside the narrow removal.** At phone width 390 and 200% text, the heading “Files” splits visually into “File” / “s”, and “Close” into “Clos” / “e”. See `phone-light-200-files-home.png`. Both controls retain their complete accessible names, the dialog remains usable and Escape returns focus. This is a concrete readability blemish, not a blocker for removing the overview bar. Suggested direction for a later Files-dialog pass: preserve readable header words at enlarged text; no product edit was made here.

No blocking finding was observed in the requested change.

## Built-page observations

- On the overview, “Start chapter 1 →” and “Files · 0” sit together in the introduction. The redundant self-link and toolbar are absent in every matrix case.
- On a lesson, “Course overview” and “Files · 0” remain reachable in ordinary static navigation. Computed toolbar position is `static`; there is no sticky overlay.
- The routine workspace status has the `sr-only` class in every settled matrix case. No routine saved/loading strip appears above the introduction.
- Opening Files on home and lesson, then pressing Escape, returned keyboard focus to the initiating Files button in all 16 cases. The contextual storage note remains visible in the dialog.
- No page horizontal overflow was observed on home or lesson at any matrix size/theme/text setting.
- A real command was submitted from the first worked cell after loading practice files: `ffmpeg -stream_loop 100 -i bunny-short.mp4 -t 600 -vf scale=1280:720 processing-review.mp4`. Navigating to the overview retained visible “Working”, “FFmpeg or ffprobe command” and “Cancel processing”. The command link targeted the originating lesson. Cancellation removed the active controls. See `processing-home.png`, `processing.json` and `processing.mjs`. This verifies submission/navigation/cancellation, not successful completion or resulting-media facts.

The reader did not inject a storage failure; that exceptional-state check belongs to the independent sceptic and regression evidence. Automated observations are not a full assistive-technology audit.
