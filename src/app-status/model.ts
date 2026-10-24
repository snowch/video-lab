// Copyright © 2026 Christopher Snow
export type Release = {
  commit: string | null;
  build: string;
  version: string;
  bytes: number;
};
export function releaseMetadata(value: unknown): Release {
  const v = value as Partial<Release> | null;
  if (
    !v ||
    !/^[a-f0-9]{64}$/.test(v.build ?? "") ||
    typeof v.version !== "string" ||
    !v.version ||
    !Number.isSafeInteger(v.bytes) ||
    v.bytes! <= 0 ||
    (v.commit !== null && !/^[a-f0-9]{40}$/.test(v.commit ?? ""))
  )
    throw new Error("Invalid release");
  return v as Release;
}
export function ownedCache(name: string, scope: string) {
  return name.startsWith(`video-lab-offline:${new URL(scope).pathname}:`);
}
