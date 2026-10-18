// Copyright © 2026 Christopher Snow
export function workerMessage(
  worker: ServiceWorker,
  message: string,
): Promise<{ ready: boolean }> {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = setTimeout(
      () => {
        channel.port1.close();
        reject(new Error("Offline worker timeout"));
      },
      message === "STATUS" ? 10000 : 180000,
    );
    channel.port1.onmessage = (event) => {
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
