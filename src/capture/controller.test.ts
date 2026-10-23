// Copyright © 2026 Christopher Snow
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { CaptureController } from "./controller";
class Track extends EventTarget {
  stop = vi.fn();
  getSettings = () => ({ width: 1280, height: 720 });
}
let video: Track, audio: Track;
class Recorder {
  static isTypeSupported = vi.fn((type: string) => type === "video/webm");
  static last: Recorder;
  state = "inactive";
  mimeType: string;
  ondataavailable?: (event: { data: Blob }) => void;
  onstop?: () => void;
  onerror?: () => void;
  constructor(_stream: unknown, options: { mimeType: string }) {
    this.mimeType = options.mimeType;
    Recorder.last = this;
  }
  start() {
    this.state = "recording";
  }
  stop() {
    this.state = "inactive";
    this.ondataavailable?.({ data: new Blob(["actual recording bytes"]) });
    this.onstop?.();
  }
}
const state = vi.fn(),
  complete = vi.fn(),
  error = vi.fn();
const stream = () => ({
  getTracks: () => [video, audio],
  getVideoTracks: () => [video],
  getAudioTracks: () => [audio],
});
let request: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.clearAllMocks();
  Recorder.isTypeSupported.mockImplementation((type) => type === "video/webm");
  video = new Track();
  audio = new Track();
  request = vi.fn().mockResolvedValue(stream());
  vi.stubGlobal("navigator", { mediaDevices: { getDisplayMedia: request } });
  vi.stubGlobal("MediaRecorder", Recorder);
});
afterEach(() => vi.unstubAllGlobals());
it("records actual supplied chunks with negotiated MIME and releases all tracks on share-ended", async () => {
  const controller = new CaptureController({ state, complete, error });
  await controller.start(true);
  await controller.start(true);
  expect(request).toHaveBeenCalledTimes(1);
  expect(request.mock.calls[0]?.[0].audio).toBe(true);
  video.dispatchEvent(new Event("ended"));
  expect(video.stop).toHaveBeenCalled();
  expect(audio.stop).toHaveBeenCalled();
  expect(complete).toHaveBeenCalledOnce();
  const result = complete.mock.calls[0]![0];
  expect(result.mime).toBe("video/webm");
  expect(await result.blob.text()).toBe("actual recording bytes");
  expect(result.audio).toBe(true);
  controller.destroy();
});
it("disposes a permission result arriving after navigation without publishing a recording", async () => {
  let accept!: (value: unknown) => void;
  request.mockReturnValue(
    new Promise((resolve) => {
      accept = resolve;
    }),
  );
  const controller = new CaptureController({ state, complete, error });
  const pending = controller.start(false);
  controller.destroy();
  accept(stream());
  await pending;
  expect(video.stop).toHaveBeenCalled();
  expect(audio.stop).toHaveBeenCalled();
  expect(complete).not.toHaveBeenCalled();
});
it("reports denied permission and supports a later explicit retry", async () => {
  request.mockRejectedValueOnce(new DOMException("Denied", "NotAllowedError"));
  const controller = new CaptureController({ state, complete, error });
  await controller.start(false);
  expect(error).toHaveBeenCalledOnce();
  expect(state).toHaveBeenLastCalledWith("idle");
  await controller.start(false);
  expect(state).toHaveBeenLastCalledWith("recording");
  controller.destroy();
  expect(complete).not.toHaveBeenCalled();
});
it("does not expose output from a failed recorder", async () => {
  const controller = new CaptureController({ state, complete, error });
  await controller.start(false);
  Recorder.last.onerror?.();
  expect(error).toHaveBeenCalledOnce();
  expect(complete).not.toHaveBeenCalled();
  expect(video.stop).toHaveBeenCalled();
  controller.destroy();
});

it("chooses a video-only codec when requested audio is not granted", async () => {
  request.mockResolvedValue({
    getTracks: () => [video],
    getVideoTracks: () => [video],
    getAudioTracks: () => [],
  });
  Recorder.isTypeSupported.mockImplementation(
    (type) =>
      type === "video/webm;codecs=vp8,opus" || type === "video/webm;codecs=vp8",
  );
  const controller = new CaptureController({ state, complete, error });
  await controller.start(true);
  expect(Recorder.last.mimeType).toBe("video/webm;codecs=vp8");
  controller.stop();
  expect(complete.mock.calls[0]![0].audio).toBe(false);
  controller.destroy();
});
it("releases granted tracks if no recording MIME is supported", async () => {
  Recorder.isTypeSupported.mockReturnValue(false);
  const controller = new CaptureController({ state, complete, error });
  await controller.start(false);
  expect(error).toHaveBeenCalledOnce();
  expect(video.stop).toHaveBeenCalled();
  expect(audio.stop).toHaveBeenCalled();
  expect(complete).not.toHaveBeenCalled();
});

it("returns to idle and releases tracks when a recorder became inactive without finishing", async () => {
  const controller = new CaptureController({ state, complete, error });
  await controller.start(false);
  Recorder.last.state = "inactive";
  controller.stop();
  expect(state).toHaveBeenLastCalledWith("idle");
  expect(error).toHaveBeenCalledOnce();
  expect(video.stop).toHaveBeenCalled();
  expect(complete).not.toHaveBeenCalled();
  controller.destroy();
});
