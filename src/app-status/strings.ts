// Copyright © 2026 Christopher Snow
export const appStatusStrings = {
  title: "App status",
  version: "Version",
  offline: "Offline access",
  running: "Running version",
  development: "No source commit recorded",
  checking: "Checking for updates",
  latest: "Up to date",
  outdated: "Update available",
  downloading: "Downloading update",
  ready: "Update ready",
  offlineCheck: "Cannot check for updates",
  failedCheck: "Couldn’t check for updates",
  check: "Check for updates",
  retry: "Retry",
  update: "Update",
  restart: "Restart to update",
  later: "Later",
  cancel: "Cancel",
  cancelling: "Stopping download",
  restarting: "Restarting Video Lab",
  restartFailed:
    "Restart could not finish. In every Video Lab tab or window, finish processing and typing, and save or download any unsaved work. Save and close any older tabs, then retry.",
  restartExplanation:
    "Restart updates all open Video Lab tabs and windows when they are ready. Saved files, command drafts, notes and answers remain. Finish processing and save any unsaved work first.",
  offlineIdle: "Not saved for offline use",
  offlineSaving: "Saving for offline use",
  offlineReady: "Available offline",
  offlineIncomplete: "Offline download incomplete",
  offlineUnavailable: "Offline access unavailable",
  download: "Download for offline use",
  resume: "Resume download",
  repair: "Retry download",
  remove: "Remove offline copy",
  removing: "Removing offline copy",
  retryRemoval: "Retry removal",
  removeTitle: "Remove the offline copy?",
  removeExplanation:
    "This removes Video Lab’s downloaded lessons, practice media and processing tools. Your imported and generated files, command drafts, notes and answers stay. Other apps and courses are not affected.",
  confirmRemove: "Remove offline copy",
  keep: "Keep offline copy",
  removed: "Offline copy removed. Your work remains in this browser.",
  downloadFailed:
    "The download did not finish. Check your connection and available browser storage, then retry.",
  retained: "Your previous complete offline copy is still available.",
  unsupported:
    "This browser cannot save Video Lab for offline use. You can continue using it online.",
  description:
    "Save lessons, practice media and FFmpeg/ffprobe tools together in one download. You can then read, play media and process files offline.",
  limits:
    "The saved copy belongs to this browser on this device. Browser storage can be cleared, so download important work. Downloads, updates and external links need an internet connection. Native tools are separate from this browser app.",
  offlineCannotDownload: "Connect to the internet to download Video Lab.",
  progressLabel: "Saved and checked",
  sizeUnknown:
    "The download size is unavailable. Connect to the internet and choose Check for updates.",
  prepareUnavailable:
    "The update could not be prepared. Your current version stays open. Check your connection and available browser storage, then retry.",
  paused: "Download stopped. Resume to finish the saved copy.",
  updatePaused:
    "Update download stopped. Your current version stays open. Choose Update to resume.",
  removalFailed:
    "The offline copy could not be completely removed. Retry when no download is running.",
  offlineCheckExplanation:
    "Connect to the internet to check the published version. Your offline availability is shown separately.",
  failedCheckExplanation:
    "The published version could not be checked. Check your connection and retry.",
  open: "Open App status",
  close: "Close App status",
  offlineSummary: {
    offlineIdle: "Not saved offline",
    offlineSaving: "Saving offline copy",
    offlineReady: "Saved offline",
    offlineIncomplete: "Offline copy incomplete",
    offlineUnavailable: "Offline unavailable",
  },
  phaseSummary: {
    prepareUnavailable: "Update unavailable",
    updatePaused: "Update paused",
    restartFailed: "Restart paused",
  },
} as const;
