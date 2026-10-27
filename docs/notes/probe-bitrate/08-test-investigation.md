# Independent investigation of the first full-gate failure

Copyright © 2026 Christopher Snow.

Reviewed the preserved first-run log, failure archive, trace events, exact archived test sources, current application/helper source and the builder's unchanged focused-rerun log on 27 October 2026. I made no application or test edits and ran no Playwright CLI, build or full gate during this investigation.

## Established observations

- The first full gate reached the browser suite and ended with 335 passed, 49 skipped and one failed: Firefox `tests/course.spec.ts:100`, “incomplete or imported report fails; progressive command hints and corrected real evidence work”. The other four projects passed that same test. The explanatory-guide browser tests passed.
- The failed test visits the older `#/inspect/reference/challenge` route. It loaded its controlled reference, produced an incomplete report, checked that report and confirmed the expected failure feedback. Hint levels 1–4 then each passed both the helper's `Completed.` status assertion and the test's expected hint-content assertion.
- The trace identifies the next action as **Hint 5**. Its click completed without an action error in 97.031 ms. The following `toHaveText` call expected `Completed.` and returned a mismatch in **3.448 ms**, displaying `Received: ""`. This was not a 120-second assertion timeout or the 180-second test timeout; the test lasted about 3.3 seconds.
- The ZIP contains the test-runner `test.trace`, two source files and the error-context attachment. It contains no browser-context trace, screenshot, DOM snapshot or console/process evidence establishing what happened inside Firefox. The error-context attachment repeats the assertion and source, without a page snapshot. Both archived source files match the current `course.spec.ts` and `course-actions.ts` exactly.
- The builder reran the unchanged focused test with `npx playwright test tests/course.spec.ts --project=firefox --grep 'incomplete or imported report'`. The preserved `reference-rerun.log` reports one pass: the test completed in 5.9 seconds, with 10.5 seconds total. This investigator did not launch that rerun or independently repeat it.

The immediate mismatch is unusual for the helper's explicit 120000 ms retry allowance. It warrants preserving the failure, but does not establish a particular browser or application fault. The installed Playwright text matcher's implementation formats a missing received value as an empty string too; therefore the printed empty string alone does not prove that a live status element remained empty. The available trace cannot distinguish a transient browser/automation interruption from another failure that stopped normal assertion polling.

## Source and scope assessment

The hint helper maps `hint inspect 5` to the actual Hint 5 button. The application renders all five reference hint buttons with the same handler pattern. The `hint` branch in `src/cli/Workspace.tsx` validates the reference and level, prints the corresponding hint, calls `setNotice(cli.done)` and returns. There is no level-5-specific status-clearing branch. The status element renders `notice`, and normal Ready/Completed states use the existing screen-reader-only class. The source does not explain the observed immediate assertion failure.

The bitrate slice changes `ProbeGuide` within the notebook renderer, its strings and `.visual-probe-lines dd p` styles, plus media verification/tests and notes. The failed older route selects `CommandLab` instead of `NotebookCourse` in `src/main.tsx`. Its reference-hint handler, status state, helper, route and raw-processing implementation are unchanged. The new CSS selectors require `.visual-probe-lines` and do not match the old command status. I found no direct code or selector path by which this explanation change would alter Hint 5's status.

This supports classifying the observed failure as an **intermittent failure in the existing reference test, outside the changed explanatory behaviour**. It does not prove that the old application has no intermittent defect, or prove a browser crash, resource shortage, race, timing issue or other root cause. The focused pass establishes non-reproduction under that rerun's conditions; it does not repair or explain the first failure.

## Disposition

No justified product or test fix follows from the available evidence. Increasing a timeout, weakening the assertion or changing hint logic would be speculative: the failed assertion did not consume its existing timeout, and the unchanged focused test completed successfully. Preserve the initial failure and run the full gate again, as the builder is doing. A clean full rerun can establish a recovered gate for this slice while retaining this unexplained intermittent failure in the validation record; it must not be described as a proved root-cause fix. A repeated failure should be investigated with browser-context tracing, page/process errors and the status/hint DOM before choosing a fix.

Evidence: `/workspace/scratch/probe-bitrate/check.log`, `/workspace/scratch/probe-bitrate/first-run-failure/`, `/workspace/scratch/probe-bitrate/reference-rerun.log`. The independently extracted final-action timeline is `/workspace/scratch/probe-bitrate/checker/reference-failure-timeline.json`. The later full-gate result belongs in the builder's validation record; it was not yet known when this investigation was written.
