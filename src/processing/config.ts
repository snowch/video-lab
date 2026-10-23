// Copyright © 2026 Christopher Snow
export const ENCODER_VERSION = "0.12.10";
export const encoderManifestUrl = `${import.meta.env.BASE_URL}encoder-manifest.json`;
export const encoderBaseUrl = `${import.meta.env.BASE_URL}encoder/${ENCODER_VERSION}/`;
export const limits = {
  inputBytes: 32 * 1024 * 1024,
  outputBytes: 20 * 1024 * 1024,
  timeoutMs: 120_000,
  inputFiles: 12,
} as const;
