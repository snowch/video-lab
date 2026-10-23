// Copyright © 2026 Christopher Snow
export const releaseStrings = {
  commit: "Running build",
  checking: "Checking the published version…",
  latest: "Matches the published version",
  outdated: "A different version is published",
  offline: "Offline: cannot check the published version",
  unavailable: "The published version could not be checked",
  development: "Development build: no commit recorded",
  updateHint:
    "If you saved an offline copy, open Offline access and app installation, select Check for updates, then use Reload to use update when offered. Otherwise, refresh the page while connected.",
} as const;
