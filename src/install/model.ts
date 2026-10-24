// Copyright © 2026 Christopher Snow
export interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
export function isAppWindow() {
  return (
    matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function installationMethod(
  userAgent = navigator.userAgent,
  touchPoints = navigator.maxTouchPoints,
) {
  if (
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && touchPoints > 1)
  )
    return "appleMobile";
  if (/Android/i.test(userAgent))
    return /Firefox/i.test(userAgent) ? "firefox" : "android";
  if (/Firefox/i.test(userAgent)) return "firefox";
  if (/Chrome|Chromium|Edg\//i.test(userAgent)) return "chromium";
  if (/Macintosh/i.test(userAgent) && /Safari/i.test(userAgent))
    return "safariMac";
  return "unknown";
}
