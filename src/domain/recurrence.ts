/**
 * recurrence.ts — pure date logic. No React. No SQLite. No Android.
 *
 * THIS IS THE BEST FILE TO IMPLEMENT FIRST AFTER THE DATABASE
 * -----------------------------------------------------------
 * You can unit-test it in Node/Jest later, or temporarily call it from
 * a button and console.log the result. There is no device flakiness here.
 *
 * TIMEZONE RULE
 * -------------
 * Alarm clocks mean *wall clock* on the phone: 6:00 in whatever timezone
 * the user is in. Use local Date getters (getFullYear, getMonth, getDate,
 * getDay, getHours), never getUTC*.
 *
 * ISO DATES
 * ---------
 * Store and compare YYYY-MM-DD strings. They sort as strings.
 * To turn an IsoDate into a Date at local midnight:
 *   const [y, m, d] = iso.split('-').map(Number);
 *   const date = new Date(y, m - 1, d); // month is 0-based in JS
 * Do NOT `new Date('2026-09-21')` — that is interpreted as UTC midnight
 * and will be the previous evening in the US.
 *
 * DST
 * ---
 * Combining a date with hour/minute via `new Date(y, m-1, d, hour, minute)`
 * is correct. The epoch ms you get is the instant that wall clock occurs.
 * Spring-forward missing hours: that Date will skip forward; acceptable for v1.
 */

import type { IsoDate, Schedule, ScheduleException, Weekday } from '../types/models';
import { notImplemented } from '../utils/notImplemented';

/** `2026-09-21` → Date at local midnight. */
export function parseIsoDate(_iso: IsoDate): Date {
  return notImplemented('recurrence.parseIsoDate — split YYYY-MM-DD, new Date(y, m-1, d)');
}

/** Date → `2026-09-21` using local getters. Pad month/day to 2 digits. */
export function toIsoDate(_date: Date): IsoDate {
  return notImplemented('recurrence.toIsoDate');
}

/** Add n calendar days, returning a new Date (don't mutate the input). */
export function addDays(_date: Date, _days: number): Date {
  return notImplemented('recurrence.addDays');
}

export function getWeekday(_date: Date): Weekday {
  return notImplemented('recurrence.getWeekday — date.getDay() as Weekday');
}

/**
 * Does this schedule apply on `date` (calendar day only, ignore time)?
 *
 * Suggested logic:
 *   1. If schedule.enabled is false → false
 *   2. iso = toIsoDate(date)
 *   3. if iso < startDate → false
 *   4. if endDate is not null and iso > endDate → false
 *   5. if kind === 'once' → iso === startDate
 *   6. if kind === 'weekly' → daysOfWeek includes getWeekday(date)
 *   7. Exceptions are NOT applied here — see appliesWithExceptions
 */
export function scheduleAppliesOnDate(_schedule: Schedule, _date: Date): boolean {
  return notImplemented('recurrence.scheduleAppliesOnDate');
}

/**
 * Like scheduleAppliesOnDate, then:
 *   if any skip exception for this schedule+date → false
 *   if kind is weekly and an `add` exception matches → true
 *     (even if that weekday is not in daysOfWeek)
 */
export function appliesWithExceptions(
  _schedule: Schedule,
  _date: Date,
  _exceptions: ScheduleException[],
): boolean {
  return notImplemented('recurrence.appliesWithExceptions');
}

/**
 * Inclusive list of local dates from `from` to `to`.
 * Used by the calendar month grid and by the occurrence generator.
 */
export function eachDay(_from: IsoDate, _to: IsoDate): Date[] {
  return notImplemented('recurrence.eachDay — loop addDays until toIsoDate > to');
}
