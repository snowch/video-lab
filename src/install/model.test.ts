// Copyright © 2026 Christopher Snow
import { it, expect } from "vitest";
import { installationMethod } from "./model";
it("chooses one relevant fallback including iPad desktop identity and iOS alternative browsers", () => {
  expect(installationMethod("Macintosh AppleWebKit Version/17 Safari", 5)).toBe(
    "appleMobile",
  );
  expect(installationMethod("iPhone AppleWebKit CriOS/120 Safari", 0)).toBe(
    "appleMobile",
  );
  expect(installationMethod("Macintosh AppleWebKit Version/17 Safari", 0)).toBe(
    "safariMac",
  );
  expect(installationMethod("Android Chrome/120 Mobile Safari", 0)).toBe(
    "android",
  );
  expect(installationMethod("Android Firefox/120", 0)).toBe("firefox");
  expect(installationMethod("Windows Chrome/120 Safari Edg/120", 0)).toBe(
    "chromium",
  );
  expect(installationMethod("X11 Linux Firefox/120", 0)).toBe("firefox");
  expect(installationMethod("UnknownBrowser", 0)).toBe("unknown");
});
