/**
 * exceptionsRepo — punch holes in a repeating schedule.
 *
 * Example: Work day is Mon–Fri, but Monday 2026-12-25 is a holiday.
 * Insert { scheduleId, date: '2026-12-25', kind: 'skip' }.
 * occurrenceGenerator must consult this table before emitting fires.
 *
 * `add` is optional. Implement `skip` first.
 */

import type { ScheduleException } from '../../types/models';
import { notImplemented } from '../../utils/notImplemented';

export async function getExceptionsForSchedule(
  _scheduleId: string,
): Promise<ScheduleException[]> {
  return notImplemented('exceptionsRepo.getExceptionsForSchedule');
}

export async function getExceptionsInRange(
  _from: string,
  _to: string,
): Promise<ScheduleException[]> {
  // SELECT ... WHERE date >= ? AND date <= ?
  // ISO dates YYYY-MM-DD sort lexicographically. That's why we chose that format.
  return notImplemented('exceptionsRepo.getExceptionsInRange');
}

export async function addException(
  _input: Omit<ScheduleException, 'id'>,
): Promise<ScheduleException> {
  return notImplemented('exceptionsRepo.addException');
}

export async function removeException(_id: string): Promise<void> {
  return notImplemented('exceptionsRepo.removeException');
}
