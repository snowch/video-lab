// Copyright © 2026 Christopher Snow
import type { Artifact, Challenge } from "@platform/lesson-schema";
import type { Verdict, VerdictFailure } from "@platform/lesson-runtime";
import { labels } from "./content/module0.labels";
export function grade(challenge: Challenge, artifact: Artifact): Verdict {
  if (challenge.tests.kind !== "answers")
    return {
      passed: false,
      total: 0,
      failures: [],
      blocked: "Unsupported challenge test kind",
    };
  const failures: VerdictFailure[] = [];
  challenge.tests.cases.forEach((test, index) => {
    for (const [field, expected] of Object.entries(test.expect)) {
      const raw = artifact.answers?.[field] ?? "";
      const numeric = field === "timestamp" || field === "frame";
      const valid = numeric
        ? raw.trim() !== "" &&
          Number.isFinite(Number(raw)) &&
          Number(raw) === Number(expected)
        : raw === String(expected);
      if (!valid)
        failures.push({
          index,
          label: test.label,
          inputs: {},
          actual: { [field]: raw },
          expected: { [field]: String(expected) },
          detail: labels.feedback[field as keyof typeof labels.feedback],
        });
    }
  });
  return {
    passed: failures.length === 0,
    total: challenge.tests.cases.length,
    failures,
  };
}
