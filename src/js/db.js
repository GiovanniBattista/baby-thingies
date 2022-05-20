import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  tracking_history: '++id, from, to, type', // Primary key and indexed props
});
