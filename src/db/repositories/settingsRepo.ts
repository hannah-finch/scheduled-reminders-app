/**
 * settingsRepo — single-row app settings (horizon, snooze default, request codes).
 *
 * nextRequestCode MUST increment and never reuse a code that might still be
 * registered with AlarmManager. When you wrap around 2^31-1, you have a
 * problem; you will not hit that while learning.
 */

import type { AppSettings } from '../../types/models';
import { notImplemented } from '../../utils/notImplemented';

export async function getSettings(): Promise<AppSettings> {
  return notImplemented('settingsRepo.getSettings');
}

export async function updateSettings(_patch: Partial<AppSettings>): Promise<void> {
  return notImplemented('settingsRepo.updateSettings');
}

/**
 * Allocate `count` consecutive request codes and persist the new counter.
 * Return the codes you allocated, e.g. [42, 43, 44].
 *
 * Do this inside a transaction with the INSERT of occurrences so a crash
 * cannot hand the same code out twice.
 */
export async function allocateRequestCodes(_count: number): Promise<number[]> {
  return notImplemented('settingsRepo.allocateRequestCodes');
}
