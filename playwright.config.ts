// Copyright © 2026 Christopher Snow
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  globalSetup: "./tests/app-status-setup.ts",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173/video-lab/",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop-light",
      use: { ...devices["Desktop Chrome"], colorScheme: "light" },
    },
    {
      name: "desktop-dark",
      use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
    },
    {
      name: "phone-light",
      use: { ...devices["Pixel 7"], colorScheme: "light" },
    },
    { name: "phone-dark", use: { ...devices["Pixel 7"], colorScheme: "dark" } },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], colorScheme: "light" },
    },
  ],
  webServer: {
    command: "npm run preview -- --port 4173",
    url: "http://127.0.0.1:4173/video-lab/",
    reuseExistingServer: !process.env.CI,
  },
});
