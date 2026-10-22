// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  detectSupport,
  pickMimeType,
  MIME_CANDIDATES,
  describeError,
  extensionFor,
  sourceLabel,
  trackReport,
} from "./capture";

describe("capture support detection", () => {
  it("detects getDisplayMedia, secure context and MediaRecorder", () => {
    expect(
      detectSupport(
        { mediaDevices: { getDisplayMedia() {} }, isSecureContext: true },
        function MediaRecorder() {},
      ),
    ).toEqual({ displayMedia: true, secureContext: true, mediaRecorder: true });
    expect(detectSupport({}, undefined)).toEqual({
      displayMedia: false,
      secureContext: true,
      mediaRecorder: false,
    });
    expect(
      detectSupport({ mediaDevices: {} }, function MediaRecorder() {})
        .displayMedia,
    ).toBe(false);
  });
  it("picks the first supported MIME type in preference order", () => {
    expect(pickMimeType((m) => m === "video/webm")).toBe("video/webm");
    expect(pickMimeType((m) => m === "video/mp4")).toBe("video/mp4");
    expect(pickMimeType(() => false)).toBeUndefined();
    expect(MIME_CANDIDATES[0]).toContain("webm");
  });
  it("names the container honestly from the MIME type", () => {
    expect(extensionFor("video/webm;codecs=vp9,opus")).toBe("webm");
    expect(extensionFor("video/mp4")).toBe("mp4");
    expect(sourceLabel("video/webm")).toBe("WebM");
    expect(sourceLabel("video/mp4")).toBe("MP4");
  });
});

describe("capture error mapping", () => {
  it("maps DOMException names to honest messages", () => {
    expect(describeError(new DOMException("x", "NotAllowedError"))).toContain(
      "denied",
    );
    expect(describeError(new DOMException("x", "SecurityError"))).toContain(
      "secure context",
    );
    expect(describeError(new DOMException("x", "NotFoundError"))).toContain(
      "No screen",
    );
    expect(describeError(new Error("boom"))).toBe("boom");
    expect(describeError("weird")).toContain("refused");
  });
});

describe("track report", () => {
  it("reports track labels and measured sizes", () => {
    const stream = {
      getVideoTracks: () => [
        { label: "Screen", getSettings: () => ({ width: 1920, height: 1080 }) },
        { label: "", getSettings: () => ({}) },
      ],
      getAudioTracks: () => [{ label: "Tab audio" }],
    };
    expect(trackReport(stream)).toEqual({
      video: ["Screen 1920×1080", "Video track"],
      audio: ["Tab audio"],
    });
  });
});
