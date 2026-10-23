// Copyright © 2026 Christopher Snow
import { referenceAnswers as inspection } from "../media/model";
import { referenceAnswers as editing } from "../module2/model";
import type { ReferenceLab } from "./reference-model";
export const progressKey = "video-lab:cli-lab-checks";
export type CheckedArtifact = { name: string; sha256: string; checked: string };
export type LabProgress = Partial<Record<ReferenceLab, CheckedArtifact>>;
export function loadChecks(): LabProgress {
  try {
    const p = JSON.parse(localStorage.getItem(progressKey) ?? "{}");
    const out: LabProgress = {};
    for (const lab of ["inspect", "edit"] as const) {
      const v = p?.[lab];
      if (
        typeof v?.name === "string" &&
        /^[a-f0-9]{64}$/.test(v.sha256) &&
        typeof v.checked === "string"
      )
        out[lab] = v;
    }
    return out;
  } catch {
    return {};
  }
}
export function legacyProgress(lab: ReferenceLab) {
  const id = lab === "inspect" ? "what-is-video" : "cutting-and-joining",
    challenge = lab === "inspect" ? "inspection" : "edit-plan",
    expected = lab === "inspect" ? inspection : editing;
  try {
    const value = JSON.parse(
      localStorage.getItem(`video-lab:v1:${id}`) ?? "{}",
    );
    const answers = value?.challenges?.[challenge]?.artifact?.answers ?? {};
    const numeric = ["frame", "timestamp", "end", "duration", "join"];
    return {
      complete: Object.entries(expected).every(
        ([key, value]) =>
          typeof answers[key] === "string" &&
          (numeric.includes(key)
            ? answers[key].trim() !== "" &&
              Number(answers[key]) === Number(value)
            : answers[key] === value),
      ),
      note:
        typeof value?.slots?.reflection === "string"
          ? value.slots.reflection
          : "",
    };
  } catch {
    return { complete: false, note: "" };
  }
}
