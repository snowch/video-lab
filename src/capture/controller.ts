// Copyright © 2026 Christopher Snow
export const RECORDING_TYPES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
  "video/mp4",
] as const;
export const SILENT_RECORDING_TYPES = [
  "video/webm;codecs=vp9",
  "video/webm;codecs=vp8",
  "video/webm",
  "video/mp4",
] as const;
export type CaptureState = "idle" | "requesting" | "recording" | "stopping";
export type CaptureResult = {
  blob: Blob;
  mime: string;
  seconds: number;
  width?: number;
  height?: number;
  audio: boolean;
};
type CaptureCallbacks = {
  state: (state: CaptureState) => void;
  complete: (result: CaptureResult) => void;
  error: (error: unknown) => void;
};
export class CaptureController {
  private stream?: MediaStream;
  private recorder?: MediaRecorder;
  private timer?: ReturnType<typeof setTimeout>;
  private generation = 0;
  private disposed = false;
  private current: CaptureState = "idle";
  constructor(private callbacks: CaptureCallbacks) {}
  private state(state: CaptureState) {
    this.current = state;
    if (!this.disposed) this.callbacks.state(state);
  }
  private release() {
    clearTimeout(this.timer);
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
  }
  async start(audio: boolean) {
    if (this.disposed || this.current !== "idle") return;
    const generation = ++this.generation;
    this.state("requesting");
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: { ideal: 12, max: 24 },
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
        },
        audio,
      });
      if (this.disposed || generation !== this.generation) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      const video = stream.getVideoTracks()[0];
      if (!video) throw new Error("no-video-track");
      const settings = video.getSettings();
      const hasAudio = stream.getAudioTracks().length > 0;
      // Negotiate for the tracks actually granted, not the requested audio option.
      // Firefox advertises VP8+Opus but cannot finish a silent stream with it.
      const mimeType = (
        hasAudio ? RECORDING_TYPES : SILENT_RECORDING_TYPES
      ).find((type) => MediaRecorder.isTypeSupported(type));
      if (!mimeType) throw new Error("unsupported-mime");
      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 1_500_000,
      });
      this.recorder = recorder;
      const chunks: Blob[] = [];
      let bytes = 0;
      let tooLarge = false;
      const started = performance.now();
      recorder.ondataavailable = (event) => {
        bytes += event.data.size;
        if (bytes > 20 * 1024 * 1024) {
          tooLarge = true;
          this.stop();
        } else if (event.data.size) chunks.push(event.data);
      };
      recorder.onerror = () => {
        if (!this.disposed && generation === this.generation) {
          this.generation++;
          this.stop();
          this.release();
          this.state("idle");
          this.callbacks.error(new Error("recorder-error"));
        } else stream.getTracks().forEach((track) => track.stop());
      };
      recorder.onstop = () => {
        if (this.stream === stream) this.release();
        else stream.getTracks().forEach((track) => track.stop());
        if (this.disposed || generation !== this.generation) return;
        this.state("idle");
        const mime = recorder.mimeType || mimeType;
        const blob = new Blob(chunks, { type: mime });
        if (tooLarge || !blob.size) {
          this.callbacks.error(
            new Error(tooLarge ? "recording-too-large" : "empty-recording"),
          );
          return;
        }
        this.callbacks.complete({
          blob,
          mime,
          seconds: (performance.now() - started) / 1000,
          width: settings.width,
          height: settings.height,
          audio: hasAudio,
        });
      };
      video.addEventListener("ended", () => this.stop(), { once: true });
      recorder.start(250);
      this.state("recording");
      this.timer = setTimeout(() => this.stop(), 15_000);
    } catch (error) {
      this.release();
      if (!this.disposed && generation === this.generation) {
        this.state("idle");
        this.callbacks.error(error);
      }
    }
  }
  stop() {
    if (this.current === "stopping") return;
    clearTimeout(this.timer);
    if (this.recorder && this.recorder.state !== "inactive") {
      this.state("stopping");
      const generation = this.generation;
      // Let the recorder deliver its final chunk before ending the live tracks.
      // Retain a timeout so a broken recorder cannot leave sharing active.
      this.timer = setTimeout(() => {
        this.release();
        if (
          !this.disposed &&
          generation === this.generation &&
          this.current === "stopping"
        ) {
          this.generation++;
          this.state("idle");
          this.callbacks.error(new Error("recording-finalisation-timeout"));
        }
      }, 3000);
      this.recorder.stop();
    } else {
      this.release();
      if (this.current === "recording") {
        this.generation++;
        this.state("idle");
        if (!this.disposed) this.callbacks.error(new Error("recorder-error"));
      }
    }
  }
  destroy() {
    this.disposed = true;
    this.generation++;
    this.stop();
    this.release();
    if (this.recorder) {
      this.recorder.ondataavailable = null;
      this.recorder.onstop = null;
      this.recorder.onerror = null;
    }
  }
}
