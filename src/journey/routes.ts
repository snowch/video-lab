// Copyright © 2026 Christopher Snow
export const steps = [
  "capture",
  "build",
  "inspect",
  "edit",
  "publish",
] as const;
export type StepName = (typeof steps)[number];
export function routeFor(hash: string) {
  const parts = hash.replace(/^#\/?/, "").split("/");
  const legacy = parts[0] === "module-0" || parts[0] === "module-2";
  if (legacy) {
    const step = parts[0] === "module-0" ? "inspect" : "edit";
    return {
      step: step as StepName,
      reference: true,
      section: parts[1],
      canonical: `#/${step}/reference${parts[1] ? `/${parts[1]}` : ""}`,
    };
  }
  const step = steps.includes(parts[0] as StepName)
    ? (parts[0] as StepName)
    : undefined;
  return {
    step,
    reference:
      !!step && ["inspect", "edit"].includes(step) && parts[1] === "reference",
    section: parts[2],
    canonical: undefined,
  };
}
