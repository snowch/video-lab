// Copyright © 2026 Christopher Snow
export const install = {
  heading: "Add a Video Lab icon",
  description:
    "Add Video Lab to your device so you can open it from an app icon.",
  button: "Install Video Lab",
  help: "Installation instructions for your browser",
  pending: "Complete or dismiss the installation prompt in your browser.",
  accepted:
    "You accepted the installation request. Check your browser's apps or your device for the Video Lab icon.",
  dismissed:
    "Installation was cancelled. You can keep using this browser tab or follow the instructions below.",
  failed:
    "The browser could not complete installation. Use the instructions below or continue in this tab.",
  installed: "Video Lab is installed or already open in its own app window.",
  offlineReminder:
    "An app icon does not save the course offline. Use Download for offline use above to save lessons, media and tools.",
  chromium:
    "Look for an install icon in the address bar, or an install or save-as-app option in the browser menu. The wording varies by browser version.",
  android:
    "Open the browser menu and look for Install app or Add to Home screen. Follow its instructions; the wording varies by browser version.",
  safariMac: "In Safari, choose File > Add to Dock.",
  appleMobile:
    "On iPhone or iPad: open Share, then choose Add to Home Screen. Turn on Open as Web App if that option is offered.",
  firefox:
    "Open the browser menu and look for an install or web-app option. If your Firefox version does not offer one, you can keep using this tab.",
  unknown:
    "Open your browser menu and look for Install app, Add to Home screen or a web-app option. If none is offered, you can keep using this tab.",
} as const;
