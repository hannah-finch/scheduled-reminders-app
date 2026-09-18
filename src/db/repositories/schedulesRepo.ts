/**
 * schedulesRepo — when a routine is supposed to run.
 *
 * kind 'once'   → one calendar date (startDate). daysOfWeek is ignored
 *                 (store `[]` anyway so the column is never NULL).
 * kind 'weekly' → every matching weekday from startDate through endDate.
 *
 * Overlapping schedules (two routines on the same date) is a product
 * decision. V1 suggestion: allow it, show both on the calendar, fire both
 * sets of alarms. You can add "only one routine per day" later in the UI.
 */

import type { Schedule } from '../../types/models';
import { notImplemented } from '../../utils/notImplemented';

export async function getAllSchedules(): Promise<Schedule[]> {
  return notImplemented('schedulesRepo.getAllSchedules');
}

export async function getSchedulesForRoutine(
  _routineId: string,
): Promise<Schedule[]> {
  return notImplemented('schedulesRepo.getSchedulesForRoutine');
}

export async function getScheduleById(_id: string): Promise<Schedule | null> {
  return notImplemented('schedulesRepo.getScheduleById');
}

export async function createSchedule(
  _input: Omit<Schedule, 'id'>,
): Promise<Schedule> {
  // Persist daysOfWeek with weekdaysToJson() from mappers.ts
  return notImplemented('schedulesRepo.createSchedule');
}

export async function updateSchedule(
  _id: string,
  _patch: Partial<Omit<Schedule, 'id'>>,
): Promise<void> {
  return notImplemented('schedulesRepo.updateSchedule');
}

export async function deleteSchedule(_id: string): Promise<void> {
  // Cascade should remove exceptions + occurrences. Then alarmSync.
  return notImplemented('schedulesRepo.deleteSchedule');
}
