import Dexie, { Table } from 'dexie';

export type SyncItem = {
  id?: number;
  method: 'POST'|'PUT'|'DELETE';
  url: string;
  body: unknown;
  createdAt: number;
  retries: number;
};

class OfflineDB extends Dexie {
  syncQueue!: Table<SyncItem, number>;
  constructor() {
    super('canary-oee');
    this.version(1).stores({
      syncQueue: '++id, createdAt',
    });
  }
}
export const db = new OfflineDB();
