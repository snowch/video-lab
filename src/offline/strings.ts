// Copyright © 2026 Christopher Snow
export const offline = {
  activating:
    "Switching to the downloaded update. This page will reload when it is ready.",
  activationFailed:
    "The update could not be opened. This tab remains open. Retry Reload to use update, or select Check for updates.",
  title: "Offline access and app installation",
  description:
    "Download lessons, practice media and FFmpeg/ffprobe tools together for offline use.",
  idle: "Video Lab is not saved for offline use yet.",
  downloading:
    "Downloading Video Lab for offline use. Keep this page open until it is ready.",
  ready:
    "Ready offline: lessons, practice media and FFmpeg/ffprobe tools are saved in this browser.",
  offlineReady:
    "You can read lessons, play practice media and run FFmpeg/ffprobe offline.",
  partial:
    "Some files are saved, but the offline download is incomplete. Download again while connected to finish.",
  offlineMissing:
    "The offline download is incomplete. Connect to the internet and download Video Lab to finish.",
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
    "Saved files stay in this browser on this device. Browser storage can be cleared, so download important work. Downloads, updates and external links need an internet connection.",
} as const;
