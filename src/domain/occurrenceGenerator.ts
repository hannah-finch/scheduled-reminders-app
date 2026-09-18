/**
 * occurrenceGenerator.ts — turn recipes + calendar rules into concrete fires.
 *
 * INPUTS (all in-memory; the service layer loads them from repos)
 *   templates[]   time of day per routine
 *   schedules[]   which days those routines run
 *   exceptions[]  holidays / extra days
 *   from, to      IsoDate range (typically today … today+horizon)
 *   nowMs         Date.now() — skip fires that already passed
 *
 * OUTPUT
 *   A list of occurrence *drafts* without id / nativeRequestCode.
 *   The service assigns those when inserting into SQLite so the counter
 *   stays consistent with the DB.
 *
 * ALGORITHM (implement this, don't invent a fancier one yet)
 *   results = []
 *   for each date in eachDay(from, to):
 *     for each enabled schedule:
 *       if !appliesWithExceptions(schedule, date, exceptions): continue
 *       const templates = templatesByRoutine[schedule.routineId] ?? []
 *       for each enabled template:
 *         fireAtMs = local Date(y, m-1, d, template.hour, template.minute).getTime()
 *         if fireAtMs <= nowMs: continue   // don't schedule the past
 *         results.push({ alarmTemplateId, scheduleId, fireAtMs, status: 'pending' })
 *   return results
 *
 * STABLE IDENTITY
 * ---------------
 * If you regenerate tomorrow, you will get the same fireAtMs values.
 * alarmSync should match on (alarmTemplateId, fireAtMs) so it can keep
 * the same nativeRequestCode instead of cancel+reschedule everything.
 * That's an optimization — v1 can cancel-all-pending and insert fresh.
 *
 * THIS FILE MUST STAY PURE
 * ------------------------
 * No getDb(), no native module. Pass data in, get data out.
 * That way you can log a fake "Work day / M-F" and check the timestamps
 * before any UI exists.
 */

import type { AlarmTemplate, IsoDate, Schedule, ScheduleException } from '../types/models';
import { notImplemented } from '../utils/notImplemented';

export type OccurrenceDraft = {
  alarmTemplateId: string;
  scheduleId: string;
  fireAtMs: number;
};

export function generateOccurrences(_args: {
  templates: AlarmTemplate[];
  schedules: Schedule[];
  exceptions: ScheduleException[];
  from: IsoDate;
  to: IsoDate;
  nowMs: number;
}): OccurrenceDraft[] {
  return notImplemented('occurrenceGenerator.generateOccurrences — see the algorithm in the file header');
}

/**
 * Combine a calendar day with hour:minute in the *local* timezone.
 * Return epoch milliseconds.
 */
export function wallClockToEpochMs(
  _date: Date,
  _hour: number,
  _minute: number,
): number {
  return notImplemented(
    'occurrenceGenerator.wallClockToEpochMs — new Date(y, m, d, hour, minute).getTime()',
  );
}
