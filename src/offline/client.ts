// Copyright © 2026 Christopher Snow
export function workerMessage(
  worker: ServiceWorker,
  message:
    string | { type: string; full?: boolean; build?: string; version?: string },
  progress?: (value: { done: number; total: number }) => void,
): Promise<{
  ready: boolean;
  count?: number;
  bytes?: number;
  total?: number;
  toolsReady?: boolean;
  offlineWanted?: boolean;
  build?: string;
  version?: string;
  prepared?: boolean;
}> {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = setTimeout(
      () => {
        channel.port1.close();
        reject(new Error("Offline worker timeout"));
      },
      typeof message === "string" &&
        ["STATUS", "DETAILS", "ENCODER_STATUS", "CANCEL", "ACTIVATE"].includes(
          message,
        )
        ? 10000
        : 180000,
    );
    channel.port1.onmessage = (event) => {
      if (event.data?.progress) {
        progress?.(event.data);
        return;
      }
      clearTimeout(timeout);
      channel.port1.close();
      resolve(event.data as { ready: boolean });
    };
    worker.postMessage(message, [channel.port2]);
  });
}
export function installed(worker: ServiceWorker): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      worker.removeEventListener("statechange", check);
      reject(new Error("Download timeout"));
    }, 180000);
    function check() {
      if (["installed", "activated", "redundant"].includes(worker.state)) {
        clearTimeout(timeout);
        worker.removeEventListener("statechange", check);
        if (worker.state === "redundant") reject(new Error("Download failed"));
        else resolve();
      }
    }
    worker.addEventListener("statechange", check);
    check();
  });
}

/** Receipt alone is insufficient: wait for the new worker to control this tab. */
export function activateWaiting(
  worker: ServiceWorker,
  container: ServiceWorkerContainer,
  timeoutMs = 10000,
): Promise<void> {
  const previous = container.controller;
  return new Promise((resolve, reject) => {
    let acknowledged = false;
    const channel = new MessageChannel();
    const finish = (error?: Error) => {
      clearTimeout(timer);
      worker.removeEventListener("statechange", check);
      container.removeEventListener("controllerchange", check);
      channel.port1.close();
      if (error) reject(error);
      else resolve();
    };
    const check = () => {
      if (worker.state === "redundant")
        finish(
          new Error(
            "The waiting update was replaced. Check for updates again.",
          ),
        );
      else if (
        acknowledged &&
        container.controller &&
        container.controller !== previous
      )
        finish();
    };
    const timer = setTimeout(
      () => finish(new Error("The update did not take control.")),
      timeoutMs,
    );
    worker.addEventListener("statechange", check);
    container.addEventListener("controllerchange", check);
    channel.port1.onmessage = (event) => {
      if (event.data?.ready !== true)
        finish(new Error("The update was not accepted."));
      else {
        acknowledged = true;
        check();
      }
    };
    try {
      worker.postMessage("ACTIVATE", [channel.port2]);
    } catch (error) {
      finish(
        error instanceof Error
          ? error
          : new Error("The update could not be activated."),
      );
    }
  });
}
