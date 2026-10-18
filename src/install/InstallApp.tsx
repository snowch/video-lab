// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { isAppWindow, type InstallPrompt } from "./model";
import { install } from "./strings";
export function InstallApp() {
  const prompt = useRef<InstallPrompt | null>(null);
  const [available, setAvailable] = useState(false);
  const [installed, setInstalled] = useState(isAppWindow);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<
    "pending" | "accepted" | "dismissed" | "failed" | null
  >(null);
  useEffect(() => {
    const offered = (event: Event) => {
      event.preventDefault();
      prompt.current = event as InstallPrompt;
      setAvailable(true);
      setNotice(null);
    };
    const complete = () => {
      prompt.current = null;
      setAvailable(false);
      setInstalled(true);
    };
    const display = matchMedia("(display-mode: standalone)");
    const displayChanged = () => setInstalled(isAppWindow());
    addEventListener("beforeinstallprompt", offered);
    addEventListener("appinstalled", complete);
    display.addEventListener("change", displayChanged);
    return () => {
      removeEventListener("beforeinstallprompt", offered);
      removeEventListener("appinstalled", complete);
      display.removeEventListener("change", displayChanged);
    };
  }, []);
  async function requestInstall() {
    const event = prompt.current;
    if (!event) return;
    prompt.current = null;
    setAvailable(false);
    setBusy(true);
    setNotice("pending");
    try {
      await event.prompt();
      setNotice((await event.userChoice).outcome);
    } catch {
      setNotice("failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="install-access" aria-labelledby="install-heading">
      <h2 id="install-heading">{install.heading}</h2>
      <p>{install.description}</p>
      {(installed || notice) && (
        <p role="status">{installed ? install.installed : install[notice!]}</p>
      )}
      {!installed && (available || busy) && (
        <button disabled={busy} onClick={() => void requestInstall()}>
          {install.button}
        </button>
      )}
      <p>{install.offlineReminder}</p>
      {!installed && (
        <details>
          <summary>{install.help}</summary>
          <ul>
            {[
              install.chromium,
              install.android,
              install.safariMac,
              install.appleMobile,
              install.firefox,
            ].map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
