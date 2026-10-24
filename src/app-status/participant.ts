// Copyright © 2026 Christopher Snow
import { safeToRestart } from "./safety";
export function participate() {
  let composing = false,
    token = "",
    committed = false,
    target: ServiceWorker | null = null,
    timer: ReturnType<typeof setTimeout> | undefined;
  const release = () => {
    document.documentElement.inert = false;
    token = "";
    committed = false;
    clearTimeout(timer);
    target?.removeEventListener("statechange", reload);
    target = null;
  };
  const reload = () => {
    if (
      token &&
      committed &&
      navigator.serviceWorker.controller === target &&
      target?.state === "activated"
    )
      location.reload();
  };
  const start = () => {
      composing = true;
    },
    end = () => {
      composing = false;
    };
  const message = (event: MessageEvent) => {
    if (
      !(event.source instanceof ServiceWorker) ||
      event.source.scriptURL !==
        new URL(`${import.meta.env.BASE_URL}sw.js`, location.href).href
    )
      return;
    const data = event.data;
    if (data?.type === "APP_RESTART_QUERY") {
      const safe = !composing && !token && safeToRestart();
      if (safe) {
        token = data.token;
        document.documentElement.inert = true;
        timer = setTimeout(release, 15000);
      }
      (event.source as ServiceWorker | null)?.postMessage({
        type: "APP_RESTART_ACK",
        token: data.token,
        safe,
      });
    } else if (data?.token === token && data?.type === "APP_RESTART_ABORT")
      release();
    else if (data?.token === token && data?.type === "APP_RESTART_COMMIT") {
      committed = true;
      target = event.source as ServiceWorker;
      target.addEventListener("statechange", reload);
      reload();
    }
  };
  document.addEventListener("compositionstart", start, true);
  document.addEventListener("compositionend", end, true);
  navigator.serviceWorker.addEventListener("message", message);
  navigator.serviceWorker.addEventListener("controllerchange", reload);
  return () => {
    release();
    document.removeEventListener("compositionstart", start, true);
    document.removeEventListener("compositionend", end, true);
    navigator.serviceWorker.removeEventListener("message", message);
    navigator.serviceWorker.removeEventListener("controllerchange", reload);
  };
}
