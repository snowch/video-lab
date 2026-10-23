// Copyright © 2026 Christopher Snow
export const offline = {
  activating:
    "Switching to the downloaded update. This page will reload when it is ready.",
  activationFailed:
    "The update could not be opened. This tab remains open. Retry Reload to use update, or select Check for updates.",
  title: "Offline access and app installation",
  description:
    "Download the available lessons, recordings and pictures so you can use them without an internet connection in this browser.",
  idle: "No complete offline copy has been saved yet. Connect to the internet and download it before going offline.",
  downloading:
    "Downloading the complete site. Keep this page open until the download is ready.",
  ready:
    "The complete offline copy is ready in this browser on this device. Lessons, recordings and challenges can now work without an internet connection.",
  offlineReady:
    "Your saved copy is ready for offline use. You can open lessons, play recordings and complete challenges.",
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
