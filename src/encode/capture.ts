// Copyright © 2026 Christopher Snow
// Pure state machine for the screen-capture exercise: feature detection,
// recorder MIME negotiation, start/stop/replay/download lifecycle, and honest
// error mapping. Unit-tested separately from the browser component.

export interface CaptureSupport {
  readonly displayMedia: boolean;
  readonly secureContext: boolean;
  readonly mediaRecorder: boolean;
}

export function detectSupport(
  nav: {
    mediaDevices?: { getDisplayMedia?: unknown };
    isSecureContext?: boolean;
  },
  recorder: unknown,
): CaptureSupport {
  return {
    displayMedia: typeof nav.mediaDevices?.getDisplayMedia === "function",
    secureContext: nav.isSecureContext ?? true,
    mediaRecorder: typeof recorder === "function",
  };
}

/** Candidate MIME types in preference order; the first supported one wins. */
export const MIME_CANDIDATES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
  "video/mp4",
] as const;

export function pickMimeType(
  isTypeSupported: (mime: string) => boolean,
): string | undefined {
  return MIME_CANDIDATES.find((m) => isTypeSupported(m));
}

export type CaptureState =
  | { readonly kind: "idle" }
  | { readonly kind: "requesting" }
  | { readonly kind: "recording" }
  | { readonly kind: "stopped"; readonly blob: Blob; readonly mimeType: string }
  | { readonly kind: "denied"; readonly message: string }
  | { readonly kind: "unsupported"; readonly message: string }
  | { readonly kind: "ended"; readonly message: string };

export const DENIED_MESSAGE =
  "Permission was denied or the picker was dismissed. Nothing was recorded.";

export function describeError(error: unknown): string {
  const name =
    error && typeof error === "object" && "name" in error
      ? String((error as { name: unknown }).name)
      : "";
  if (name === "NotAllowedError") return DENIED_MESSAGE;
  if (name === "NotFoundError")
    return "No screen, window or tab source was available to capture.";
  if (name === "NotReadableError")
    return "The selected source could not be read. It may be busy or protected.";
  if (name === "AbortError")
    return "The capture source was unavailable before recording started.";
  if (name === "SecurityError")
    return "This page is not in a secure context, so screen capture is not allowed here.";
  if (error instanceof Error && error.message) return error.message;
  return "The browser refused the capture request.";
}

/** The file extension that honestly matches a recorder MIME type. */
export function extensionFor(mimeType: string): string {
  return mimeType.includes("mp4") ? "mp4" : "webm";
}

export function sourceLabel(mimeType: string): string {
  return mimeType.includes("mp4") ? "MP4" : "WebM";
}

/** Human-readable track report from a captured MediaStream. */
export function trackReport(stream: {
  getVideoTracks(): readonly {
    label: string;
    getSettings?: () => MediaTrackSettings;
  }[];
  getAudioTracks(): readonly { label: string }[];
}): { video: string[]; audio: string[] } {
  return {
    video: stream.getVideoTracks().map((t) => {
      const s = t.getSettings?.() ?? {};
      const size = s.width && s.height ? ` ${s.width}×${s.height}` : "";
      return `${t.label || "Video track"}${size}`;
    }),
    audio: stream.getAudioTracks().map((t) => t.label || "Audio track"),
  };
}
