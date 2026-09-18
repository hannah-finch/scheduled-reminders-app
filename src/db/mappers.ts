/**
 * Row mappers — SQLite is dumb, TypeScript is not.
 *
 * SQLite has no boolean, no arrays, no nested objects.
 *   boolean  <->  INTEGER 0/1
 *   Weekday[] <-> TEXT JSON '[1,2,3,4,5]'
 *   null sound <-> SQL NULL
 *
 * Repositories should:
 *   1. SELECT * into a Row type that matches column names (snake_case).
 *   2. Call a mapper to produce the camelCase domain type in models.ts.
 *
 * Keeping SQL column names snake_case and TS camelCase is a common convention.
 * Don't leak `enabled: 1` into React — the UI should see `enabled: true`.
 */

import type { AlarmTemplate, Routine, Schedule, Weekday } from '../types/models';
import { notImplemented } from '../utils/notImplemented';

/** What a `SELECT * FROM routines` row looks like after you create the table. */
export type RoutineRow = {
  id: string;
  name: string;
  color: string;
  created_at_ms: number;
  updated_at_ms: number;
};

export type AlarmTemplateRow = {
  id: string;
  routine_id: string;
  name: string;
  hour: number;
  minute: number;
  enabled: number;
  vibrate: number;
  snooze_minutes: number;
  sound_key: string | null;
};

export type ScheduleRow = {
  id: string;
  routine_id: string;
  kind: string;
  start_date: string;
  end_date: string | null;
  days_of_week: string;
  enabled: number;
};

export function mapRoutine(_row: RoutineRow): Routine {
  return notImplemented('db/mappers.ts mapRoutine');
}

export function mapAlarmTemplate(_row: AlarmTemplateRow): AlarmTemplate {
  return notImplemented('db/mappers.ts mapAlarmTemplate — remember enabled: row.enabled === 1');
}

export function mapSchedule(_row: ScheduleRow): Schedule {
  return notImplemented('db/mappers.ts mapSchedule — JSON.parse days_of_week into Weekday[]');
}

export function weekdaysToJson(_days: Weekday[]): string {
  return notImplemented('db/mappers.ts weekdaysToJson — JSON.stringify');
}

export function boolToInt(_value: boolean): number {
  return notImplemented('db/mappers.ts boolToInt — true→1, false→0');
}
