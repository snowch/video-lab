// Copyright © 2026 Christopher Snow
// The final project's reference recipe: three steps, each the exact command an
// earlier module ran, in the order that keeps the text readable and the
// captions intact. The recorded outputs are real files in
// public/media/edit/recipe-step*.mp4 with measured facts in provenance.json.
import {
  buildCropScale,
  buildBurnCaptions,
  buildReencode,
  buildProbe,
} from "../encode/commands";

export interface RecipeStep {
  readonly n: number;
  readonly name: string;
  readonly module: string;
  readonly why: string;
  readonly args: readonly string[];
  readonly command: string;
  readonly output: string;
  readonly recordedFile: string;
  readonly recordedBytes: number;
  readonly recordedFacts: string;
}

const cropArgs = buildCropScale({
  input: "source.mp4",
  crop: { w: 480, h: 270, x: 240, y: 135 },
  scale: { w: 960, h: 540 },
  output: "step1-crop.mp4",
});
const burnArgs = buildBurnCaptions({
  input: "step1-crop.mp4",
  subtitles: "captions.srt",
  output: "step2-captioned.mp4",
});
const reencodeArgs = buildReencode({
  input: "step2-captioned.mp4",
  width: 640,
  height: 360,
  crf: 23,
  output: "final.mp4",
});

export const recipeSteps: readonly RecipeStep[] = [
  {
    n: 1,
    name: "Crop and zoom for readability",
    module: "Module 4",
    why: "The crop keeps only the centre region — where the action is — and scales it back to full size, so the queue text stays readable.",
    args: cropArgs,
    command: `ffmpeg ${cropArgs.join(" ")}`,
    output: "step1-crop.mp4",
    recordedFile: "edit/recipe-step1-crop.mp4",
    recordedBytes: 105492,
    recordedFacts: "960 × 540, video + audio, 105492 bytes",
  },
  {
    n: 2,
    name: "Burn the captions in",
    module: "Module 7",
    why: "The captions are drawn into the full-size picture, so they are as large as the text they accompany.",
    args: burnArgs,
    command: `ffmpeg ${burnArgs.join(" ")}`,
    output: "step2-captioned.mp4",
    recordedFile: "edit/recipe-step2-captioned.mp4",
    recordedBytes: 116187,
    recordedFacts: "960 × 540, video + audio, 116187 bytes",
  },
  {
    n: 3,
    name: "Re-encode at the chosen size",
    module: "Module 6",
    why: "The re-encode sets the final resolution and quality: 640 × 360 at CRF 23, small enough to share, large enough to read.",
    args: reencodeArgs,
    command: `ffmpeg ${reencodeArgs.join(" ")}`,
    output: "final.mp4",
    recordedFile: "edit/recipe-step3-final.mp4",
    recordedBytes: 105834,
    recordedFacts: "640 × 360, video + audio, 105834 bytes",
  },
];

export const recipeFinalProbe = buildProbe("final.mp4");

export interface RecipeJobStep {
  readonly type: "EXEC" | "FFPROBE";
  readonly args: readonly string[];
}

/** The recipe as a runner job's step list: three EXEC steps and a final probe. */
export function recipeJobSteps(): readonly RecipeJobStep[] {
  return [
    ...recipeSteps.map((s) => ({ type: "EXEC" as const, args: s.args })),
    { type: "FFPROBE" as const, args: recipeFinalProbe },
  ];
}
