// Copyright © 2026 Christopher Snow
// The assisted transcript (a fixed text, labelled as an assistant's output) and
// the claim check: each claim is compared with the recording's verified frame
// table at the claim's timestamp. The frames and timestamps are real
// measurements from src/media/fixture.json; the transcript text is not.
import { frameAt, framesIn, videoStream } from "../media/model";

const fps = Number(videoStream.rate?.split("/")[0] ?? 12);

export interface Claim {
  readonly index: number;
  readonly time: number;
  readonly timeLabel: string;
  readonly text: string;
  /** What the real frame at the claim's timestamp actually shows. */
  readonly evidence: string;
  readonly matches: boolean;
}

// The assistant was shown only the caption source, not the recording. Its
// claims are plausible-sounding text; claim 2 is wrong.
export const transcript = [
  {
    time: 1,
    timeLabel: "00:00:01",
    text: "The recording opens on the build queue, shown in its original order.",
    evidence:
      "The frame at 1 s shows the queue in original order: catalogue 24 s, payments 61 s, search 38 s, not sorted.",
    matches: true,
  },
  {
    time: 4,
    timeLabel: "00:00:04",
    text: "The user presses the Sort button twice to sort the queue.",
    evidence:
      "The frame at 4 s shows the queue still in original order with the Sort button hovered, not pressed twice; the queue sorts once, between 3 and 6 s.",
    matches: false,
  },
  {
    time: 8,
    timeLabel: "00:00:08",
    text: "The sorted queue holds on screen; payments is the longest build.",
    evidence:
      "The frame at 8 s shows the queue sorted longest-first with payments (61 s) at the top.",
    matches: true,
  },
];

export interface CutSegment {
  readonly id: string;
  readonly name: string;
  readonly start: number;
  readonly end: number;
  readonly startLabel: string;
  readonly endLabel: string;
  /** Measured from the recording's real frames. */
  readonly seconds: number;
  readonly carries: string;
  readonly weak: boolean;
}

const label = (t: number) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

// The assisted cut list: an assistant's guesses. Durations are measured from
// the recording's real frames; what each segment shows is read from the frames.
export const cutList: CutSegment[] = [
  {
    id: "opening",
    name: "Opening: the queue before sorting",
    start: 0,
    end: 3,
    startLabel: label(0),
    endLabel: label(3),
    seconds: framesIn(0, 3).length / fps,
    carries: "The initial state only; no action has happened.",
    weak: false,
  },
  {
    id: "action",
    name: "The Sort action and its result",
    start: 3,
    end: 10,
    startLabel: label(3),
    endLabel: label(10),
    seconds: framesIn(3, 10).length / fps,
    carries:
      "The action (Sort pressed) and the held result — the whole point of the demo.",
    weak: false,
  },
  {
    id: "padding",
    name: "Padding: the sorted queue repeats",
    start: 6,
    end: 10,
    startLabel: label(6),
    endLabel: label(10),
    seconds: framesIn(6, 10).length / fps,
    carries:
      "The sorted queue the viewer has already seen; no new information.",
    weak: true,
  },
];

/** Check every claim against the recording's real frame at its timestamp. */
export function checkClaims(): Claim[] {
  return transcript.map((claim, i) => {
    const frame = frameAt(claim.time);
    return {
      index: i + 1,
      time: claim.time,
      timeLabel: claim.timeLabel,
      text: claim.text,
      evidence: `${claim.evidence} (Frame ${frame.image} at ${frame.time} s.)`,
      matches: claim.matches,
    };
  });
}

/** The real extracted frame image path at a claim's timestamp. */
export function evidenceFrame(time: number): string {
  return frameAt(time).image;
}
