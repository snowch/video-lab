// Copyright © 2026 Christopher Snow
import type { Artifact, Challenge } from "@platform/lesson-schema";
import type { Verdict, VerdictFailure } from "@platform/lesson-runtime";
import { gradeEdit } from "./module2/grade";
import { labels } from "./content/module0.labels";
import { cap } from "./capture/strings";
import { b } from "./build/strings";
import { ed } from "./edit/strings";
import { sd } from "./sound/strings";
import { q } from "./quality/strings";
import { ca } from "./captions/strings";
import { v } from "./verify/strings";

/** Grade an answers challenge whose fields have per-field feedback text. */
function gradeAnswers(
  challenge: Challenge,
  artifact: Artifact,
  feedback: Record<string, string>,
  numericFields: readonly string[] = [],
): Verdict {
  const failures: VerdictFailure[] = [];
  challenge.tests.kind === "answers" &&
    challenge.tests.cases.forEach((test, index) => {
      for (const [field, expected] of Object.entries(test.expect)) {
        const raw = artifact.answers?.[field] ?? "";
        const numeric = numericFields.includes(field);
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
            detail: feedback[field],
          });
      }
    });
  return {
    passed: failures.length === 0,
    total:
      challenge.tests.kind === "answers" ? challenge.tests.cases.length : 0,
    failures,
  };
}

export function grade(challenge: Challenge, artifact: Artifact): Verdict {
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "cutting-and-joining"
  )
    return gradeEdit(challenge, artifact);
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "capture-plan"
  )
    return gradeAnswers(
      challenge,
      artifact,
      cap.feedback as Record<string, string>,
    );
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "probe-prediction"
  )
    return gradeAnswers(
      challenge,
      artifact,
      b.feedback as Record<string, string>,
      ["pictures", "duration", "size"],
    );
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "readability"
  )
    return gradeAnswers(
      challenge,
      artifact,
      ed.feedback as Record<string, string>,
    );
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "sound-choice"
  )
    return gradeAnswers(
      challenge,
      artifact,
      sd.feedback as Record<string, string>,
    );
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "quality-choice"
  )
    return gradeAnswers(
      challenge,
      artifact,
      q.feedback as Record<string, string>,
    );
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "caption-choice"
  )
    return gradeAnswers(
      challenge,
      artifact,
      ca.feedback as Record<string, string>,
    );
  if (
    challenge.tests.kind === "answers" &&
    challenge.tests.grader === "publish-choice"
  )
    return gradeAnswers(
      challenge,
      artifact,
      v.feedback as Record<string, string>,
    );
  if (challenge.tests.kind !== "answers")
    return {
      passed: false,
      total: 0,
      failures: [],
      blocked: "Unsupported challenge test kind",
    };
  return gradeAnswers(
    challenge,
    artifact,
    labels.feedback as Record<string, string>,
    ["timestamp", "frame"],
  );
}
