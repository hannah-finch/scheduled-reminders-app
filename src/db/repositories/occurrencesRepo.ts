/**
 * occurrencesRepo — materialized upcoming (and recent) alarm fires.
 *
 * WHY THIS TABLE EXISTS
 * ---------------------
 * Computing "what fires in the next 21 days" is cheap, but:
 *   - the Upcoming screen wants a list
 *   - alarmSync needs a stable nativeRequestCode per fire
 *   - after an alarm rings, you want to mark it fired/dismissed/snoozed
 *
 * If you only stored schedules and re-derived fires every time, you would
 * lose request codes and status. Persist them.
 *
 * REPLACING THE WINDOW
 * --------------------
 * A simple v1 strategy whenever schedules/templates change:
 *   1. SELECT native_request_code FROM alarm_occurrences WHERE status = 'pending'
 *   2. Cancel those codes in AlarmManager (alarmSync)
 *   3. DELETE FROM alarm_occurrences WHERE status = 'pending' AND fire_at_ms >= now
 *   4. Insert the generator's new rows
 *   5. Schedule each new row natively
 *
 * Don't delete fired/dismissed rows immediately — the Upcoming screen can
 * show "this morning's alarms". Add a cleanup that deletes rows older than
 * N days when you feel like it.
 */

import type { AlarmOccurrence, OccurrenceStatus } from '../../types/models';
import { notImplemented } from '../../utils/notImplemented';

export async function getPendingOccurrences(): Promise<AlarmOccurrence[]> {
  // WHERE status = 'pending' ORDER BY fire_at_ms
  return notImplemented('occurrencesRepo.getPendingOccurrences');
}

export async function getOccurrencesInRange(
  _fromMs: number,
  _toMs: number,
): Promise<AlarmOccurrence[]> {
  return notImplemented('occurrencesRepo.getOccurrencesInRange');
}

export async function insertOccurrences(_rows: AlarmOccurrence[]): Promise<void> {
  // Use a transaction. Loop runAsync INSERT.
  return notImplemented('occurrencesRepo.insertOccurrences');
}

export async function deletePendingFrom(_fromMs: number): Promise<void> {
  return notImplemented('occurrencesRepo.deletePendingFrom');
}

export async function updateOccurrenceStatus(
  _id: string,
  _status: OccurrenceStatus,
): Promise<void> {
  return notImplemented('occurrencesRepo.updateOccurrenceStatus');
}

export async function getOccurrenceByRequestCode(
  _code: number,
): Promise<AlarmOccurrence | null> {
  // The BroadcastReceiver will send this int back into JS (or you look it up
  // from Kotlin). Either way you need a reverse lookup.
  return notImplemented('occurrencesRepo.getOccurrenceByRequestCode');
}
