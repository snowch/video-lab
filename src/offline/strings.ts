// Copyright © 2026 Christopher Snow
// Legacy consumers share the unified labels; no separate offline/update UI remains.
import { appStatusStrings as s } from "../app-status/strings";
export const offline = {
  title: s.title,
  description: s.description,
  download: s.download,
  ready: s.offlineReady,
  offlineReady: s.offlineReady,
  partial: s.offlineIncomplete,
  retry: s.repair,
  check: s.check,
  reload: s.restart,
  unsupported: s.offlineUnavailable,
  idle: s.offlineIdle,
  failed: s.downloadFailed,
  updateReady: s.ready,
  updateFailed: s.prepareUnavailable,
  current: s.latest,
  activating: s.restarting,
  activationFailed: s.restartFailed,
} as const;
