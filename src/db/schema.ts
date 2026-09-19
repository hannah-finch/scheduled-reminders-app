/**
 * SQLite schema — YOU write the CREATE TABLE statements.
 *
 * WHY SQLITE (not AsyncStorage, not a cloud DB)
 * ---------------------------------------------
 * - Alarms have relations (routine → templates, schedule → exceptions).
 *   That's what SQL is for.
 * - After reboot, something has to remember every pending occurrence.
 *   A local file the OS doesn't wipe is required. SQLite is that file.
 * - expo-sqlite talks to the same kind of database Android itself uses,
 *   so later a BootReceiver *could* read it from Kotlin if JS hasn't started.
 *
 * HOW MIGRATIONS WORK (you will implement client.ts to run these)
 * --------------------------------------------------------------
 * 1. Open the database.
 * 2. Read PRAGMA user_version;  (an integer SQLite keeps for you)
 * 3. If user_version < 1, execute MIGRATION_001, then PRAGMA user_version = 1;
 * 4. Later, when you add a column, write MIGRATION_002 and bump to 2.
 * Never edit an already-shipped CREATE TABLE in place if the DB might
 * already exist on a phone — add a new migration instead (ALTER TABLE).
 *
 * FOREIGN KEYS
 * ------------
 * SQLite does NOT enforce foreign keys unless you run:
 *   PRAGMA foreign_keys = ON;
 * Do that every time you open the database (see client.ts).
 *
 * SUGGESTED TABLE ORDER (parents first)
 *   routines
 *   alarm_templates   (FK routine_id)
 *   schedules         (FK routine_id)
 *   schedule_exceptions (FK schedule_id)
 *   alarm_occurrences (FK template + schedule)
 *   settings          (single-row key/value or one row id=1)
 *
 * Copy the sketches below into real SQL. Types cheat-sheet:
 *   TEXT     strings, ISO dates, JSON arrays
 *   INTEGER  0/1 booleans, unix ms, request codes, user_version
 *   REAL     unused here
 */

/** Bump this when you add MIGRATION_002, etc. client.ts should set PRAGMA user_version to this. */
export const SCHEMA_VERSION = 1;

export function getMigration001Statements(): string[] {
  // Return the CREATE TABLE / CREATE INDEX / seed INSERT strings, in order.
  // client.ts will loop and exec each one inside a transaction.
  return [
  `CREATE TABLE IF NOT EXISTS routines (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    created_at_ms INTEGER NOT NULL,
    updated_at_ms INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS alarm_templates (
    id TEXT PRIMARY KEY NOT NULL,
    routine_id TEXT NOT NULL,
    name TEXT NOT NULL,
    hour INTEGER NOT NULL,
    minute INTEGER NOT NULL,
    enabled INTEGER NOT NULL DEFAULT 1,
    vibrate INTEGER NOT NULL DEFAULT 1,
    snooze_minutes INTEGER NOT NULL DEFAULT 10,
    sound_key TEXT,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_templates_routine ON alarm_templates(routine_id);
  CREATE TABLE IF NOT EXISTS schedules (
    id TEXT PRIMARY KEY NOT NULL,
    routine_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT,
    days_of_week TEXT NOT NULL,
    enabled INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS schedule_exceptions (
    id TEXT PRIMARY KEY NOT NULL,
    schedule_id TEXT NOT NULL,
    date TEXT NOT NULL,
    kind TEXT NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE,
    UNIQUE(schedule_id, date)
  );
  CREATE TABLE IF NOT EXISTS alarm_occurrences (
    id TEXT PRIMARY KEY NOT NULL,
    alarm_template_id TEXT NOT NULL,
    schedule_id TEXT NOT NULL,
    fire_at_ms INTEGER NOT NULL,
    native_request_code INTEGER NOT NULL UNIQUE,
    status TEXT NOT NULL,
    FOREIGN KEY (alarm_template_id) REFERENCES alarm_templates(id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_occ_fire ON alarm_occurrences(fire_at_ms);
  CREATE INDEX IF NOT EXISTS idx_occ_status ON alarm_occurrences(status);
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    horizon_days INTEGER NOT NULL,
    default_snooze_minutes INTEGER NOT NULL,
    default_sound_key TEXT,
    next_request_code INTEGER NOT NULL
  );
  INSERT OR IGNORE INTO settings (id, horizon_days, default_snooze_minutes, next_request_code)
    VALUES (1, 21, 10, 1);
  `,

  ];
}

/**
 * TODO (later): function getMigration002Statements() { ... }
 * Example when you need a new column:
 *   ALTER TABLE alarm_templates ADD COLUMN volume INTEGER NOT NULL DEFAULT 100;
 */
