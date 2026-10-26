// Copyright © 2026 Christopher Snow
import { afterEach, expect, test, vi } from "vitest";
import { hasEarlierWork } from "./earlier-work";

function storage(values: Record<string, string> = {}) {
  vi.stubGlobal("localStorage", {
    length: Object.keys(values).length,
    key: (index: number) => Object.keys(values)[index] ?? null,
    getItem: (key: string) => values[key] ?? null,
  });
}

type Legacy = { store: string; rows: unknown[] };
function databases(entries: Record<string, Legacy> = {}) {
  const aborted = vi.fn();
  const transactions = vi.fn();
  const closed = vi.fn();
  const open = vi.fn((name: string) => {
    const request = {
      transaction: { abort: aborted },
    } as unknown as IDBOpenDBRequest;
    queueMicrotask(() => {
      const entry = entries[name];
      if (!entry) {
        request.onupgradeneeded?.(
          new Event("upgradeneeded") as IDBVersionChangeEvent,
        );
        return;
      }
      const db = {
        close: closed,
        objectStoreNames: {
          contains: (store: string) => store === entry.store,
        },
        transaction: (store: string, mode: string) => {
          transactions(store, mode);
          const transaction = {
            objectStore: () => ({
              openCursor: () => {
                const cursor = {} as IDBRequest<IDBCursorWithValue | null>;
                let index = 0;
                const next = () =>
                  queueMicrotask(() => {
                    const row = entry.rows[index++];
                    Object.defineProperty(cursor, "result", {
                      configurable: true,
                      value:
                        row === undefined
                          ? null
                          : { value: row, continue: next },
                    });
                    cursor.onsuccess?.(new Event("success"));
                    if (row === undefined) transaction.oncomplete?.();
                  });
                next();
                return cursor;
              },
            }),
            oncomplete: undefined as (() => void) | undefined,
          };
          return transaction;
        },
      };
      Object.defineProperty(request, "result", { value: db });
      request.onsuccess?.(new Event("success"));
    });
    return request;
  });
  vi.stubGlobal("indexedDB", { open });
  return { open, aborted, transactions, closed };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

test("fresh storage ignores theme and migration markers and aborts absent database creation", async () => {
  storage({ "video-lab:theme": "dark", "video-lab:cli-migrated": "1" });
  const db = databases();
  expect(await hasEarlierWork()).toBe(false);
  expect(db.aborted).toHaveBeenCalledTimes(2);
  expect(db.open.mock.calls).toEqual([
    ["video-lab-cli"],
    ["video-lab-project"],
  ]);
  expect(db.transactions).not.toHaveBeenCalled();
});

test.each(["video-lab-cli", "video-lab-project"])(
  "finds an old file in %s after migration",
  async (name) => {
    storage({ "video-lab:cli-migrated": "1" });
    const db = databases({
      [name]: {
        store: name === "video-lab-cli" ? "files" : "media",
        rows: [{ name: "old.mp4", blob: new Blob(["saved bytes"]) }],
      },
    });
    expect(await hasEarlierWork()).toBe(true);
    expect(db.transactions).toHaveBeenCalledWith(
      name === "video-lab-cli" ? "files" : "media",
      "readonly",
    );
    expect(db.closed).toHaveBeenCalled();
  },
);

test("empty stores, unrelated stores and invalid empty records are not earlier work", async () => {
  storage();
  databases({
    "video-lab-cli": {
      store: "files",
      rows: [{ name: "empty.txt", blob: new Blob() }, {}],
    },
    "video-lab-project": {
      store: "metadata",
      rows: [{ key: "migrated", value: true }],
    },
  });
  expect(await hasEarlierWork()).toBe(false);
});

test.each([
  ["video-lab:course-command-draft", "ffprobe old.mp4"],
  ["video-lab:cli-history", JSON.stringify(["ffprobe old.mp4"])],
  ["video-lab:review:inspect:streams", "My saved explanation"],
  [
    "video-lab-workbench-v1",
    JSON.stringify({
      drafts: { 1: { text: "ffmpeg -i source.mp4 output.mp4" } },
    }),
  ],
  [
    "video-lab:v1:what-is-video",
    JSON.stringify({ slots: { reflection: "My reflection" } }),
  ],
  [
    "video-lab:v1:cutting-and-joining",
    JSON.stringify({
      challenges: { "edit-plan": { artifact: { answers: { duration: "0" } } } },
    }),
  ],
  [
    "video-lab:cli-lab-checks",
    JSON.stringify({
      inspect: {
        name: "checked.mp4",
        sha256: "a".repeat(64),
        checked: "2026-10-26",
      },
    }),
  ],
])("detects actual work at %s", async (key, value) => {
  storage({ [key]: value });
  databases();
  expect(await hasEarlierWork()).toBe(true);
});

test("initial empty answers, drafts, reviews, history and checks do not count", async () => {
  storage({
    "video-lab:v1:what-is-video": JSON.stringify({
      version: 1,
      updatedAt: "2026-10-26",
      slots: { reflection: " " },
      challenges: {
        inspection: {
          artifact: { answers: { duration: "" } },
          attempts: 0,
          hintsRevealed: 0,
        },
      },
    }),
    "video-lab-workbench-v1": JSON.stringify({
      sourceName: "",
      options: { rate: 30 },
      drafts: { 1: { mode: "builder", text: "", restored: "" } },
    }),
    "video-lab:review:inspect:streams": " ",
    "video-lab:course-command-draft": " ",
    "video-lab:cli-history": '["", " "]',
    "video-lab:cli-lab-checks": '{"inspect":{}}',
  });
  databases();
  expect(await hasEarlierWork()).toBe(false);
});

test("malformed or denied storage does not prevent legacy file detection", async () => {
  vi.stubGlobal("localStorage", {
    getItem: () => {
      throw new Error("denied");
    },
  });
  databases({
    "video-lab-cli": {
      store: "files",
      rows: [{ name: "note.txt", blob: new Blob(["A note"]) }],
    },
  });
  expect(await hasEarlierWork()).toBe(true);
});

test("blocked, failed and silent opens settle without hanging", async () => {
  storage();
  vi.useFakeTimers();
  vi.stubGlobal("indexedDB", {
    open: () => {
      const request = {} as IDBOpenDBRequest;
      queueMicrotask(() =>
        request.onblocked?.(new Event("blocked") as IDBVersionChangeEvent),
      );
      return request;
    },
  });
  expect(await hasEarlierWork()).toBe(false);
  vi.stubGlobal("indexedDB", { open: () => ({}) });
  const pending = hasEarlierWork();
  await vi.advanceTimersByTimeAsync(1500);
  expect(await pending).toBe(false);
  vi.stubGlobal("indexedDB", {
    open: () => {
      throw new Error("denied");
    },
  });
  expect(await hasEarlierWork()).toBe(false);
});

test.each([
  ["video-lab:course-command-draft", "ffprobe session.mp4"],
  [
    "video-lab-workbench-v1",
    JSON.stringify({
      drafts: { 1: { text: "", restored: "ffprobe session.mp4" } },
    }),
  ],
])(
  "detects session-only work at %s when local storage is denied",
  async (key, value) => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("denied");
      },
    });
    vi.stubGlobal("sessionStorage", {
      getItem: (name: string) => (name === key ? value : null),
    });
    databases();
    expect(await hasEarlierWork()).toBe(true);
  },
);

test("empty session drafts do not count as earlier work", async () => {
  storage();
  vi.stubGlobal("sessionStorage", {
    getItem: (key: string) =>
      key === "video-lab-workbench-v1"
        ? JSON.stringify({
            drafts: { 1: { mode: "builder", text: "", restored: "" } },
          })
        : " ",
  });
  databases();
  expect(await hasEarlierWork()).toBe(false);
});
