// Copyright © 2026 Christopher Snow
export const install = {
  heading: "Add a Video Lab icon",
  description:
    "A supporting browser can add Video Lab as an app that opens in its own window. Where its icon appears depends on your browser and device.",
  button: "Install Video Lab",
  help: "Installation instructions for your browser",
  pending: "Complete or dismiss the installation prompt in your browser.",
  accepted:
    "You accepted the installation request. Check your browser's apps or your device for the Video Lab icon.",
  dismissed:
    "Installation was cancelled. You can keep using Video Lab in this browser tab or follow the browser instructions below later.",
  failed:
    "The browser could not open or complete the installation request. Try the browser instructions below.",
  installed: "Video Lab is installed or already open in its own app window.",
  offlineReminder:
    "Installing Video Lab adds an app icon. It does not save the lessons or processing tools for offline use; choose Download for offline use above.",
  chromium:
    "Chrome or Edge on a computer: look for an install icon in the address bar, or an install or save-as-app option in the browser menu. The wording and location vary by version.",
  android:
    "Chrome on Android: open More beside the address bar, then choose Install and create shortcut > Install. Follow the on-screen instructions. Menu wording can vary by version.",
  safariMac: "Safari on Mac: choose File > Add to Dock.",
  appleMobile:
    "On iPhone or iPad: open Share, then choose Add to Home Screen. Turn on Open as Web App if that option is offered.",
  firefox:
    "Firefox: use the browser's web-app option if available. Otherwise, open Video Lab in Chrome, Edge or Safari and follow the instructions above.",
} as const;
