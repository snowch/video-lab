// Copyright © 2026 Christopher Snow
import { expect, type Page } from "@playwright/test";

export async function expectSavedCell(
  page: Page,
  id: string,
  expected: Record<string, string>,
) {
  await expect
    .poll(() =>
      page.evaluate(async (cellId) => {
        const db = await new Promise<IDBDatabase>((resolve, reject) => {
          const request = indexedDB.open("video-lab-notebook", 1);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
        try {
          return await new Promise<Record<string, unknown> | undefined>(
            (resolve, reject) => {
              const transaction = db.transaction("cells");
              const request = transaction.objectStore("cells").get(cellId);
              transaction.oncomplete = () => resolve(request.result);
              transaction.onerror = () => reject(transaction.error);
              transaction.onabort = () => reject(transaction.error);
            },
          );
        } finally {
          db.close();
        }
      }, id),
    )
    .toMatchObject(expected);
}
