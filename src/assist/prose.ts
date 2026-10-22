// Copyright © 2026 Christopher Snow
import { ai } from "./strings";

export const prose = {
  question:
    "An assistant has written a transcript and a cut list for your demo. It sounds confident. How much of it is actually true — and how would you find out?",
  motivation: `The transcript below was written by an assistant that was shown only the caption source — the three lines of caption text, not the recording. Read it beside the real player.

The transcript makes three claims about what the recording shows. Each claim has a timestamp. The recording is real, the player is real, and the claims are text — which of them survives contact with the picture?`,
  prediction: `Before you run the check, predict which of the three claims will be wrong. Read each claim and ask: what would the frame at that moment have to show for this to be true?

Claim 1 says the queue opens in its original order. Claim 2 says the Sort button is pressed twice. Claim 3 says payments is the longest build.`,
  investigation: `The claim check compares each claim's timestamp with the recording's verified frame table — the same measured frame list the inspection lesson used. At each claim's moment it shows the real extracted frame and what that frame actually shows.

Two of the three claims match their frames. One does not: at 4 seconds the queue is still in its original order and the Sort button is only hovered — the button is pressed once, not twice. The assistant invented a detail that sounds plausible (users often click twice) but the recording shows otherwise.`,
  construction: `Run the claim check yourself below. Press **${ai.check}**, and the browser reads the recording's verified frame table, finds the real extracted frame at each claim's timestamp, and reports a verdict for every claim — which claims match their frames and which does not, with the evidence frame beside each.

Below the checker, the assisted cut list is shown with each segment's real duration measured from the recording's frames. The proposed cuts are the assistant's guesses; the durations are facts.`,
  failureExperiment: `The failure mode of assisted production is not that the assistant is obviously wrong — it is that it is confidently, plausibly wrong. Claim 2 sounds reasonable (double-clicking is common) and would pass a casual read. Only checking the claim against the real frame at its timestamp catches it.

The same applies to the cut list: the padding segment (the final 4 seconds) repeats what the viewer has already seen. An assistant that has not watched the recording cannot know that; the measured durations and the frames can.`,
  explanation: `An assistant working from a transcript — or from nothing — can get three kinds of things right and one kind wrong:

- **Structure** it can often get right: a demo has an opening, an action, a result. That is pattern, not evidence.
- **Facts it was given** it can repeat correctly: the caption source says what the captions say.
- **Plausible-sounding details** it will invent: "pressed twice", "the queue was already sorted". These are the dangerous ones, because they read like observation.
- **What the recording actually shows** only the recording can say. The frame at a timestamp is evidence; a sentence is a claim.

The check that separates them is the one you just ran: take the claim's timestamp, look at the real frame, compare. This course has no AI service in it — the transcript is a fixed text, labelled as an assistant's output, and the lesson is the checking habit, not the tool.`,
  generalisation: `Using assistance honestly in a demo workflow:

- Treat every assisted claim about your recording as a claim, not a fact: it needs a timestamp and a frame.
- Check claims at their timestamps against the real frames — the inspection lesson's frame table is exactly that evidence.
- Use assistance for structure (a cut list, a caption draft) and verify the specifics against the recording.
- Measure durations from the recording, not from the assistant's guesses.
- Say what you used assistance for when you publish: the verification lesson's checks apply to assisted work the same as any other.`,
  challenge: `Judge which transcript claim is wrong and which proposed cut is the weak one, then run the claim check and read the verdicts.`,
  reflection: `What is your rule for using assistance in your next demo? Write an optional note; it is not graded.`,
  modelVsReality: ai.modelVsReality,
  modelNote: ai.modelNote,
  challengeTask: `Judge the wrong transcript claim and the weak cut, then run the claim check against the real frames.`,
  hints: [...ai.hints] as readonly string[],
  originality: ai.originality,
};
