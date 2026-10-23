# Guided labs — independent final built checker

Copyright © 2026 Christopher Snow.

23 October 2026. Independent gpt-6.1-sol checker, high reasoning effort; I authored neither this layout, its prose nor its fixes/tests. Read `AGENTS.md`, the plan and reviews 01–03. Checked the final production preview at `http://127.0.0.1:4173/video-lab/`, bundle **`index-BGedS5tn.js`**, fetched SHA-256 **`cd9d437c41e80dfb77e22e3b8ccb8b22d26f0591211e274ce129fc476e489e4b`**. No application edits.

**R1 accepted as resolved. No new independent-review blocker within this focused layout/interaction coverage.**

## Final placement, help and layout

Checked all **seven available routes** at **1440 × 1000** and **390 × 844**, in both actual application themes: **28 route/size/theme states**. The task panel is left of the workspace on desktop and above it on phone. Each route retains one Command field and no media-parameter/challenge answer form. Document widths always matched the viewport.

Previous/Next are inside `.command-workspace`, after the form and result, **16 px below the status** in the actual flow measurements. Their placement was also checked throughout the 28 states. The final production lesson link is inside that same workspace when offered. Thus advancing after a command does not require returning to the task panel. Keyboard Enter on Next focused `current-task` and brought its heading to the top of the phone viewport. First Previous and final Next correctly disabled; selecting tasks did not run commands or mark an artifact checked.

R1's welcome distinguishes contextual `help` from complete-reference `help all`. Executed contextual help contained the active replay command and a pointer to `help all`. Executed `help all` contained the complete vocabulary, limits, hints and checks. Both reference opening tasks visibly use `help all`; Build's replay task visibly says “Run help all for file and processing limits.” “Encode the picture sequence” and the other distinct task titles replace the superseded generic headings.

I opened workspace usage and lesson background disclosures: shell/quoting boundaries, Ctrl+C, storage guidance and capture's 15-second constraint remained accessible. Source inspection of the pure task mapping corroborated that existing lesson paragraphs/section content remain mapped to the relevant task or available background; I directly checked Build's codec/container explanation beside its actual encode/probe tasks. This is not a new line-by-line factual audit of every lesson.

## Actual source and command flow

Independent flows passed in **Chromium phone-light** and **Firefox phone-dark**:

- With `getDisplayMedia` deliberately absent, Capture explained sample/import fallback and omitted Record. Switching source choices changed examples only: output stayed identical and no source media was fetched.
- Typed `sample`, then used the four tasks to list, replay and download `capture.mp4`. It played as ten-second media and downloaded with the original source hash. Running a command did not advance the task.
- Returned through Previous and used the actual `import` chooser to select previously recorded checker WebM bytes as **`guided-own.webm`**. Both task examples and contextual help used that exact filename for replay/download. Visible replay worked; the actual downloaded filename and SHA-256 matched the selected bytes. The provided sample was not silently substituted.
- A new note, imported/sample files and command history survived route changes/reload. `cat` returned the new note; ArrowUp recalled the most recent command. Seeded earlier answer-based edit achievement/reflection remained separately labelled in `progress`; manual navigation still left both current artifact checks unpassed.
- Legacy `#/module-2/failureExperiment` selected task 6 of 10 and its canonical route. Choosing the challenge selected task 9; browser Back restored the failure task. `#/module-0/investigation` selected “Locate a picture by presentation time”.

Chromium additionally ran `fixtures` and a custom typed **2 fps** encode to `guided-rate.mp4`, then an actual ffprobe JSON command. Browser report and native ffprobe of the downloaded bytes agreed on **1.500000 s**. The task stayed on encoding until I manually selected Next; custom arguments still reach real processing.

The layout sweep checked task counts **4/6/4/4/5/10/10**, opened task lists, and exercised final-task selection and appropriate final lesson links. It did not claim every intermediate task completed. Existing cues still moved long output and focused the terminal; keyboard wrapping hid the cues without changing raw output. Populated output stayed bounded to at most 24% of viewport height. Completed scripts reported no uncaught page errors. Visually inspected retained [desktop-light](evidence/checker-desktop-light.png) and [phone-dark](evidence/checker-phone-dark.png) captures show the final result/navigation placement.

## Evidence and limits

```sh
node /workspace/scratch/guided-checker/flow.mjs
node /workspace/scratch/guided-checker/layout.mjs
```

Final executions exited **0**. `flow-results.json` retains build identity, replay/download hashes and placement; `layout-results.json` retains all 28 states and task counts. Actual downloads and captures remain alongside them. Exploratory checker assumptions were corrected: revisiting an identical hash need not reset its task, and already-open disclosures/wrap state survive route/theme changes. Correcting those harness assumptions required no app change.

I inspected the builder's final `/workspace/scratch/guided-check.log`: **75 unit tests and 130 browser cases passed**, browser stage **3.0 minutes**; the builder reported full-command exit 0. I did not execute or claim that complete quality gate as my own.

Limits: browser-emulated sizes and absent-API capability simulation, not physical touch, screen readers or an actual OS recording chooser. The imported WebM was genuinely recorded in an earlier checker pass; no fresh screen recording is claimed here. I did not repeat the complete media/checker, offline, storage-failure, cancellation, public update or deployment matrix, nor every prior progress-schema permutation. This local verdict does not certify later CI/public deployment or infer learning success from Next.
