# Route focus CI repair

Copyright © 2026 Christopher Snow.

Pages run [40928691291](https://github.com/snowch/video-lab/actions/runs/40928691291) failed one desktop-dark keyboard navigation assertion; 444 browser tests passed and 90 were intentionally skipped. The failed link is correctly addressed, but route heading focus runs in a later animation frame and can take focus after the learner selects that link.

The independent investigation reproduced this on the built app by holding animation frames, focusing the link, then releasing the frame: the heading took focus and Enter stayed on the container page. This is a product timing defect, not grounds for retries or weaker assertions.

Scope: complete route focus/scroll in React's layout phase, keeping canonical routes, initial focus policy, legacy section scrolling and existing heading targets. Add a delayed-frame regression that fails before the change, retain the normal keyboard/Back/draft tests, and check the built site independently. No learner-facing strings change, so separate prose drafting is not applicable. Shared platform, files, commands and lesson content remain unchanged.

Validation: red/green regression, repeated affected tests across all five browser projects, independent reader/sceptic/checker evidence and full npm run check. Merge and verify both main quality checks and Pages deployment before reporting completion.
