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

import type { AlarmTemplate, Routine, Schedule, ScheduleKind, Weekday } from '../types/models';

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
  kind: ScheduleKind;
  start_date: string;
  end_date: string | null;
  days_of_week: string;
  enabled: number;
};

export function mapRoutine(row: RoutineRow): Routine {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    createdAtMs: row.created_at_ms,
    updatedAtMs: row.updated_at_ms,
  };
}

export function mapAlarmTemplate(row: AlarmTemplateRow): AlarmTemplate {
  return {
    id: row.id,
    routineId: row.routine_id,
    name: row.name,
    hour: row.hour,
    minute: row.minute,
    enabled: row.enabled === 1,
    vibrate: row.vibrate === 1,
    snoozeMinutes: row.snooze_minutes,
    soundKey: row.sound_key,
  };
}

export function mapSchedule(row: ScheduleRow): Schedule {
  return {
    id: row.id,
    routineId: row.routine_id,
    kind: row.kind,
    startDate: row.start_date,
    endDate: row.end_date,
    daysOfWeek: jsonToWeekdays(row.days_of_week),
    enabled: row.enabled === 1,
  };
}

export function weekdaysToJson(days: Weekday[]): string {
  return JSON.stringify(days);
}

export function jsonToWeekdays(json: string): Weekday[] {
  return JSON.parse(json) as Weekday[];
}

export function boolToInt(value: boolean): number {
  return value ? 1 : 0;
}
