// Copyright © 2026 Christopher Snow
export const offline = {
  activating:
    "Switching to the downloaded update. This page will reload when it is ready.",
  activationFailed:
    "The update could not be opened. This tab remains open. Retry Reload to use update, or select Check for updates.",
  title: "Offline access and app installation",
  description:
    "Save lessons and practice media first. Add the separate processing tools if you want to run FFmpeg and ffprobe offline. Both downloads stay in this browser on this device.",
  lessonsTitle: "Save lessons and practice media",
  idle: "Lessons and practice media are not saved for offline use yet. Download them while connected.",
  downloading:
    "Saving lessons and practice media. Keep this page open until they are ready.",
  ready:
    "Lessons and practice media are saved for offline reading and playback in this browser. Running commands offline also needs the processing tools below.",
  offlineReady:
    "Your saved lessons and practice media are available offline. Running commands also needs the processing tools below.",
  offlineMissing:
    "No complete offline copy is available in this browser. Connect to the internet and download the site before relying on offline access.",
  checking:
    "Checking for an updated copy of Video Lab. This needs an internet connection.",
  current: "Your saved copy is up to date.",
  updateReady:
    "An updated copy is ready. Reload when you are ready to use it. Other open Video Lab tabs will reload too; challenge work and notes already saved in this browser will remain.",
  failed:
    "The download or update could not finish. Check your connection and available browser storage, then retry. You can continue using the site online.",
  updateFailed:
    "Your saved copy remains available offline. The update check or download did not finish. Check your internet connection and available browser storage, then select Check for updates to retry.",
  unsupported:
    "Offline saving is unavailable in this browser. You can continue using Video Lab online.",
  download: "Download for offline use",
  retry: "Retry download",
  check: "Check for updates",
  reload: "Reload to use update",
  limits:
    "The saved copy belongs to this browser on this device. Browser storage can be cleared or removed, and private browsing copies are temporary. Downloading and updating need an internet connection, as do external source links. Challenge work and notes stay in this browser; they do not sync to an account or another device.",
} as const;
