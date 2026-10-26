// Copyright © 2026 Christopher Snow

const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
function parse(value: string | null): unknown {
  try {
    return JSON.parse(value ?? "null");
  } catch {
    return null;
  }
}
function storedDrafts(storage: Storage): boolean {
  if (nonempty(storage.getItem("video-lab:course-command-draft"))) return true;
  const workbench = record(parse(storage.getItem("video-lab-workbench-v1")));
  return Object.values(record(workbench.drafts)).some((value) => {
    const draft = record(value);
    return nonempty(draft.text) || nonempty(draft.restored);
  });
}
function storedNotes(): boolean {
  try {
    if (storedDrafts(globalThis.sessionStorage)) return true;
  } catch {
    // Session storage may be unavailable while local storage still works.
  }
  try {
    const storage = globalThis.localStorage;
    if (storedDrafts(storage)) return true;
    const history = parse(storage.getItem("video-lab:cli-history"));
    if (Array.isArray(history) && history.some(nonempty)) return true;
    const checks = record(parse(storage.getItem("video-lab:cli-lab-checks")));
    if (
      [checks.inspect, checks.edit].some((value) => {
        const check = record(value);
        return (
          nonempty(check.name) &&
          typeof check.sha256 === "string" &&
          /^[a-f0-9]{64}$/.test(check.sha256) &&
          nonempty(check.checked)
        );
      })
    )
      return true;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (!key) continue;
      if (key.startsWith("video-lab:review:") && nonempty(storage.getItem(key)))
        return true;
      if (!key.startsWith("video-lab:v1:")) continue;
      const lesson = record(parse(storage.getItem(key)));
      if (nonempty(record(lesson.slots).reflection)) return true;
      if (
        Object.values(record(lesson.challenges)).some((value) => {
          const challenge = record(value);
          const answers = record(record(challenge.artifact).answers);
          return (
            Object.values(answers).some(nonempty) ||
            (typeof challenge.attempts === "number" &&
              challenge.attempts > 0) ||
            nonempty(challenge.firstPassedAt)
          );
        })
      )
        return true;
    }
  } catch {
    // Storage can be disabled independently of IndexedDB.
  }
  return false;
}

/** Inspect an existing legacy store, never create or upgrade one. */
function savedFiles(name: string, store: string): Promise<boolean> {
  return new Promise((resolve) => {
    let db: IDBDatabase | undefined;
    let transaction: IDBTransaction | undefined;
    let finished = false;
    const finish = (found: boolean) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      db?.close();
      resolve(found);
    };
    // Blocked opens and broken browser storage must not keep Files pending.
    const timeout = setTimeout(() => {
      try {
        transaction?.abort();
      } catch {
        // The readonly transaction may already have finished.
      }
      finish(false);
    }, 1500);
    try {
      const request = globalThis.indexedDB.open(name);
      request.onupgradeneeded = () => {
        // Opening an absent database would create it. Abort rolls creation back.
        request.transaction?.abort();
        finish(false);
      };
      request.onerror = request.onblocked = () => finish(false);
      request.onsuccess = () => {
        db = request.result;
        if (finished || !db.objectStoreNames.contains(store)) {
          db.close();
          finish(false);
          return;
        }
        db.onversionchange = () => {
          db?.close();
          finish(false);
        };
        try {
          transaction = db.transaction(store, "readonly");
          const cursor = transaction.objectStore(store).openCursor();
          transaction.onerror = transaction.onabort = () => finish(false);
          transaction.oncomplete = () => finish(false);
          cursor.onerror = () => finish(false);
          cursor.onsuccess = () => {
            const item = cursor.result;
            if (!item) return;
            const value = record(item.value);
            if (
              nonempty(value.name) &&
              value.blob instanceof Blob &&
              value.blob.size > 0
            )
              finish(true);
            else item.continue();
          };
        } catch {
          finish(false);
        }
      };
    } catch {
      finish(false);
    }
  });
}

/** Actual earlier work, independent of notebook/CLI migration and theme flags. */
export async function hasEarlierWork(): Promise<boolean> {
  if (storedNotes()) return true;
  const files = await Promise.all([
    savedFiles("video-lab-cli", "files"),
    savedFiles("video-lab-project", "media"),
  ]);
  return files.some(Boolean);
}
