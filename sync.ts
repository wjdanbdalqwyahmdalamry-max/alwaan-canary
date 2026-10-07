import { db } from './db';

export async function enqueue(method: 'POST'|'PUT'|'DELETE', url: string, body: unknown) {
  await db.syncQueue.add({ method, url, body, createdAt: Date.now(), retries: 0 });
}

export async function syncNow(apiBase: string) {
  if (!navigator.onLine) return;
  const rows = await db.syncQueue.orderBy('createdAt').toArray();
  for (const item of rows) {
    try {
      const res = await fetch(`${apiBase}${item.url}`, {
        method: item.method,
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(item.body),
      });
      if (res.ok && item.id) await db.syncQueue.delete(item.id);
      else if (item.id) await db.syncQueue.update(item.id, { retries: item.retries + 1 });
    } catch {
      break;
    }
  }
}
