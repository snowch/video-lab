// Copyright © 2026 Christopher Snow
export const ai = {
  lessonNumber: "MODULE 9 / AI-ASSISTED PRODUCTION (OPTIONAL)",
  title: "AI-assisted production (optional)",
  objectives: [
    "Read an assisted transcript critically against what the recording actually shows.",
    "Spot the claims an assistant gets wrong about a real demo.",
    "Judge an assisted cut list against the moments that actually matter.",
  ],
  sections: {
    question:
      "An assistant wrote a transcript and a cut list for your demo — how much of it is true?",
    motivation: "Read the assisted transcript beside the real recording",
    prediction: "Predict which claims will be wrong",
    investigation: "Check every claim against the real frames",
    construction: "Run the claim check yourself",
    failureExperiment: "When an assistant sounds confident and is wrong",
    explanation: "What an assistant can and cannot know about your recording",
    generalisation: "Using assistance honestly in a demo workflow",
    challenge: "Judge the wrong claim and the weak cut",
    reflection: "Note your assistance rule",
  },
  captions: {
    transcript:
      "An assisted transcript of the recording, shown beside a real player. Some claims match the recording; some do not.",
    frames:
      "The real extracted frames of the recording at the moments the transcript talks about. These are the evidence the check runs against.",
    checker:
      "A claim checker that runs in this browser: it compares each transcript claim with the real extracted frame at the claim's timestamp and reports what it finds.",
    cuts: "An assisted cut list for the same recording, with the real duration of each proposed segment measured from the recording's frames.",
    challenge:
      "Judge which transcript claim is wrong and which proposed cut is weak, then run the claim check.",
    reflection:
      "Optional notes for your next assisted workflow; these are not graded.",
  },
  transcriptLabel: "The assisted transcript",
  transcriptNote:
    "Written by an assistant that was shown only the caption source — not the recording. Read it beside the player.",
  claimsLabel: "Claims in the transcript",
  claimRow: (index: number, text: string, time: string) =>
    `Claim ${index} at ${time}: “${text}”`,
  evidenceLabel: "Evidence frame at the claim's timestamp",
  evidenceAlt: (time: string) =>
    `The real extracted frame of the recording at ${time}`,
  check: "Check the claims against the frames",
  cancel: "Cancel",
  statusIdle: "Ready. Nothing has run yet.",
  statusRunning: "Checking the claims in your browser...",
  statusDone: "Done. Every claim has been checked against a real frame.",
  statusFailed: "The checker failed in this browser.",
  claimVerdict: (index: number, ok: boolean) =>
    `Claim ${index}: ${ok ? "matches the frame" : "does not match the frame"}`,
  matches: "matches the frame",
  contradicts: "does not match the frame",
  verdictLabel: "Checker verdicts",
  cutsLabel: "The assisted cut list",
  cutRow: (name: string, start: string, end: string, seconds: string) =>
    `${name}: from ${start} to ${end} (${seconds} s)`,
  cutNote:
    "Segment lengths are measured from the recording's real frames. The proposed cuts are an assistant's guesses; the durations are facts.",
  note: "The checker compares each claim's timestamp with the real extracted frame at that moment, using the recording's verified frame table. The frames are real; the transcript is the assistant's text.",
  unavailable:
    "This browser cannot run the checker. The transcript, the real player and the real frames still show.",
  modelNote:
    "The claim check reads the recording's verified frame table (real extracted frames with measured timestamps) and compares it with the transcript's claims. The transcript is a fixed text; the frames and timestamps are real measurements.",
  modelVsReality:
    "There is no AI service in this course: no model runs anywhere. The transcript and cut list are fixed texts labelled as an assistant's output, and the lesson's point is to check them. The claim check is a real computation in this browser over the recording's verified frame table — the same table the inspection lesson measured. The player plays the real recording; the evidence frames are the real extracted frames.",
  originality: {
    textbookExample:
      "A list of tips about using AI tools, with no transcript checked against real evidence.",
    howThisDiffers:
      "Read a fixed assisted transcript beside the real recording, check every claim against the real extracted frame at its timestamp, and judge an assisted cut list against measured durations.",
  },
  challengeTitle: "Judge the wrong claim and the weak cut",
  fieldLabels: {
    wrong: "Which transcript claim does not match the recording?",
    cut: "Which proposed cut is the weak one?",
  },
  options: {
    wrong: {
      first: "Claim 1: the queue is shown in original order",
      second: "Claim 2: the Sort button is pressed twice",
      third: "Claim 3: the longest build is Payments",
    },
    cut: {
      opening: "Keep the opening 3 seconds (before the action)",
      action: "Keep the Sort action and its result",
      padding: "Keep the final 4 seconds of the sorted queue",
    },
  },
  feedback: {
    wrong:
      "Check claim 2 against the frame at 4 seconds: the queue is still in original order and the Sort button is only hovered — it has been pressed once, not twice. Claims 1 and 3 match their frames: the queue starts in original order, and Payments is the longest build.",
    cut: "Measure the segments from the recording's frames: the Sort action (3 to 6 seconds) and its held result (6 to 10 seconds) carry the demo. The final 4 seconds repeat the sorted queue the viewer has already seen — a viewer who gets only that learns nothing about the action. The weak cut is the one that keeps the padding and drops the action.",
  },
  hints: [
    "Play the recording and read each claim at its timestamp.",
    "Claim 2 says Sort is pressed twice; look at the frame at 4 seconds — the queue is still in original order and the button is only hovered.",
    "The cut list's durations are measured from the recording's frames; compare what each segment actually shows.",
    "A demo cut keeps the action and its result; trailing padding repeats what the viewer has already seen.",
    "Reference: claim 2 is wrong; the weak cut is the one that keeps the trailing padding and drops the action.",
  ],
} as const;
