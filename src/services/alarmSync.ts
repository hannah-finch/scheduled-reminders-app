/**
 * alarmSync.ts — glue between SQLite occurrences and Android AlarmManager.
 *
 * THIS IS ORCHESTRATION, NOT MATH
 * --------------------------------
 * recurrence.ts decides *which days*.
 * occurrenceGenerator.ts decides *which timestamps*.
 * repositories persist rows.
 * AlarmModule.ts talks to Kotlin.
 * THIS file calls those pieces in the right order.
 *
 * WHEN TO RUN
 * -----------
 * After any write that changes future alarms:
 *   create/update/delete routine, template, schedule, or exception
 * Also on app start, and (later) from a BootReceiver / headless JS task.
 *
 * V1 ALGORITHM (cancel everything pending, regenerate)
 *   1. pending = getPendingOccurrences()
 *   2. for each pending: AlarmModule.cancel(nativeRequestCode)
 *   3. deletePendingFrom(nowMs)
 *   4. Load templates, schedules, exceptions, settings
 *   5. drafts = generateOccurrences({ ..., from: today, to: today+horizon })
 *   6. codes = allocateRequestCodes(drafts.length)
 *   7. rows = drafts mapped with id, codes, status 'pending'
 *   8. insertOccurrences(rows)
 *   9. for each row: AlarmModule.scheduleExact(...)
 *      title = template.name, body = routine.name
 *
 * V2 (optional): diff by (templateId, fireAtMs) and only schedule/cancel
 * the delta so you don't churn PendingIntents.
 *
 * FAILURES
 * --------
 * If canScheduleExactAlarms() is false, stop and let the UI send the user
 * to system settings (permissions.ts). Scheduling without that permission
 * silently delays alarms into "inexact" windows — useless for a wake-up.
 *
 * Do not import this file from App.tsx until you are ready: it will pull
 * the native module into the bundle.
 */

import { notImplemented } from '../utils/notImplemented';

export async function syncAll(): Promise<void> {
  return notImplemented('alarmSync.syncAll — see v1 algorithm in the file header');
}

/**
 * Snooze: cancel the current native alarm if it is still scheduled,
 * write a new occurrence (or update fireAtMs) at now + snoozeMinutes,
 * scheduleExact that new time.
 *
 * Call this from the ringing UI (native or JS) after you know which
 * requestCode fired.
 */
export async function snooze(_occurrenceId: string): Promise<void> {
  return notImplemented('alarmSync.snooze');
}

export async function dismiss(_occurrenceId: string): Promise<void> {
  // cancel native + status = 'dismissed'
  return notImplemented('alarmSync.dismiss');
}
