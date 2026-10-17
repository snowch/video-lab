// Copyright © 2026 Christopher Snow
import type { Artifact, Challenge } from "@platform/lesson-schema";
import type { Verdict, VerdictFailure } from "@platform/lesson-runtime";
import { m2 } from "./strings";
export function gradeEdit(challenge: Challenge, artifact: Artifact): Verdict {
  if (challenge.tests.kind !== "answers")
    return {
      passed: false,
      total: 0,
      failures: [],
      blocked: "Unsupported edit challenge",
    };
  const failures: VerdictFailure[] = [];
  challenge.tests.cases.forEach((test, index) => {
    for (const [field, expected] of Object.entries(test.expect)) {
      const raw = artifact.answers?.[field] ?? "";
      const numeric = ["end", "duration", "join"].includes(field);
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
          detail: m2.feedback[field as keyof typeof m2.feedback],
        });
    }
  });
  return {
    passed: failures.length === 0,
    total: challenge.tests.cases.length,
    failures,
  };
}
