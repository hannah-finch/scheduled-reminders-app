package com.scheduledreminders.alarmnative

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/**
 * AlarmManager does NOT survive reboot. Every alarm app needs this.
 *
 * FLOW
 * ----
 * 1. Manifest: <receiver> with ACTION_BOOT_COMPLETED (and often
 *    ACTION_LOCKED_BOOT_COMPLETED if you want alarms before the user
 *    unlocks — that requires storing data in device-protected storage,
 *    which is an advanced topic; skip it for v1).
 * 2. onReceive: you must re-register every pending occurrence with
 *    AlarmManager.
 *
 * WHO READS THE DATABASE?
 * -----------------------
 * Option A (more reliable): open the same SQLite file from Kotlin
 *   (`context.getDatabasePath(...)` — expo-sqlite's filename is the one
 *   you passed to openDatabaseAsync). SELECT pending rows, call
 *   setExactAndAllowWhileIdle in a loop. No JS required.
 *
 * Option B: start the application / a headless JS task and call
 *   alarmSync.syncAll(). Simpler mentally, slower, and some OEMs will
 *   not let you start JS in the background.
 *
 * Implement A when you can. B is a stepping stone.
 *
 * QUOTA
 * -----
 * Do not schedule thousands of alarms at boot. Your horizon is 14–30 days.
 */
class BootReceiver : BroadcastReceiver() {
  override fun onReceive(_context: Context, _intent: Intent) {
    // TODO: if intent.action is BOOT_COMPLETED, reschedule pending alarms.
  }
}
