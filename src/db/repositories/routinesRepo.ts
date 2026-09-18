/**
 * routinesRepo — the ONLY file that should run SQL against `routines`.
 *
 * LAYER RULE
 * ----------
 * Screens call repositories.
 * Repositories call getDb() and SQL.
 * Repositories do NOT import React, navigation, or AlarmManager.
 *
 * After you INSERT/UPDATE/DELETE a routine, the calendar may be stale:
 * deleting a routine should cascade-delete templates, schedules, and
 * occurrences (if you set ON DELETE CASCADE). You still must *cancel*
 * those occurrences in AlarmManager — SQL cannot talk to Android.
 * The screen/service that called deleteRoutine() should then call
 * alarmSync.syncAll() (you will wire that later).
 *
 * ID GENERATION
 * -------------
 * Crypto.randomUUID() exists in modern Hermes. Use it in createRoutine
 * before INSERT, so you already know the id (no lastInsertRowId needed).
 */

import type { Routine } from '../../types/models';
import { notImplemented } from '../../utils/notImplemented';

export async function getAllRoutines(): Promise<Routine[]> {
  // SELECT * FROM routines ORDER BY name COLLATE NOCASE
  return notImplemented('routinesRepo.getAllRoutines');
}

export async function getRoutineById(_id: string): Promise<Routine | null> {
  return notImplemented('routinesRepo.getRoutineById');
}

export async function createRoutine(
  _input: Pick<Routine, 'name' | 'color'>,
): Promise<Routine> {
  // 1. randomUUID()
  // 2. Date.now() for created/updated
  // 3. INSERT
  // 4. return the object (don't SELECT it back unless you want to practice)
  return notImplemented('routinesRepo.createRoutine');
}

export async function updateRoutine(
  _id: string,
  _patch: Partial<Pick<Routine, 'name' | 'color'>>,
): Promise<void> {
  // UPDATE routines SET ... , updated_at_ms = ? WHERE id = ?
  return notImplemented('routinesRepo.updateRoutine');
}

export async function deleteRoutine(_id: string): Promise<void> {
  // DELETE FROM routines WHERE id = ?
  // If FOREIGN KEYS + ON DELETE CASCADE are on, children go away too.
  // Then YOU still need to cancel native alarms for any leftover request codes.
  return notImplemented('routinesRepo.deleteRoutine');
}
