/**
 * Database client — one open SQLite connection for the whole app.
 *
 * WHAT YOU WILL USE (expo-sqlite)
 * -------------------------------
 *   import * as SQLite from 'expo-sqlite';
 *   const db = await SQLite.openDatabaseAsync('reminders.db');
 *
 * Useful methods on `db` (read the expo-sqlite docs for your SDK version):
 *   await db.execAsync('PRAGMA foreign_keys = ON;');
 *   await db.execAsync('PRAGMA user_version;')  // or getFirstAsync
 *   await db.withTransactionAsync(async () => { ... });
 *   await db.runAsync('INSERT INTO ... VALUES (?, ?)', [a, b]);
 *   const rows = await db.getAllAsync<MyRow>('SELECT * FROM routines');
 *   const row = await db.getFirstAsync<MyRow>('SELECT * FROM settings WHERE id = 1');
 *
 * `?` placeholders are how you avoid SQL injection. Never concatenate
 * user-typed strings into SQL.
 *
 * WHEN TO OPEN
 * ------------
 * Open once at app start (see App.tsx) and reuse. Don't open/close per query.
 *
 * THREADING
 * ---------
 * expo-sqlite async APIs are safe to await from React. Do not block the JS
 * thread with giant loops — that's the occurrence generator's problem, keep
 * the horizon small (14–30 days).
 *
 * ANDROID FILE LOCATION
 * ---------------------
 * The file lives in the app sandbox. Uninstalling the app deletes it.
 * Backup/export is a later feature (you would copy this file or dump SQL).
 */

import { getMigration001Statements } from "./schema";
import * as SQLite from "expo-sqlite";

export type Database = SQLite.SQLiteDatabase;

let dbPromise: Promise<Database> | null = null;

/**
 * Open (or reuse) the database, enable foreign keys, run pending migrations.
 *
 * Suggested steps:
 * 1. If dbPromise is already set, return it. (singleton)
 * 2. openDatabaseAsync('reminders.db')
 * 3. PRAGMA foreign_keys = ON
 * 4. Read PRAGMA user_version
 * 5. If user_version < 1, run getMigration001Statements() in a transaction,
 *    then PRAGMA user_version = 1
 * 6. Cache and return the db
 */

export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = openAndMigrate();
  }
  return dbPromise;
}

async function openAndMigrate(): Promise<Database> {
  const db = await SQLite.openDatabaseAsync("reminders.db");
  await db.execAsync("PRAGMA foreign_keys = ON;");
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  const currentDbVersion = result?.user_version ?? 0;
  if (currentDbVersion < 1) {
    await db.withTransactionAsync(async () => {
      for (const sql of getMigration001Statements()) {
        await db.execAsync(sql);
      }
      await db.execAsync("PRAGMA user_version = 1");
    });
  }
  return db;
}

/**
 * Test helper: drop the singleton so the next getDb() opens fresh.
 * Useful once you write tests; not needed for the UI.
 */
export function resetDbSingleton(): void {
  dbPromise = null;
}
