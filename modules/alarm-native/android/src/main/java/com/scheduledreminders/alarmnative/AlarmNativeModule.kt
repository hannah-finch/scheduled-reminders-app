package com.scheduledreminders.alarmnative

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * Expo native module — the JS-facing door into Android.
 *
 * HOW EXPO MODULES WORK
 * ---------------------
 * JS calls `requireNativeModule('AlarmNative')` (see src/AlarmNativeModule.ts).
 * The string in Name("AlarmNative") MUST match.
 *
 * Function("foo") { }          — synchronous, keep it tiny (no IO).
 * AsyncFunction("bar") { }     — runs off the UI thread; use for AlarmManager.
 *
 * `appContext.reactContext` is a Context you can pass to AlarmManager.
 * It can be null if JS hasn't attached yet — BootReceiver will not have it,
 * which is why reboot rescheduling should not depend on this module being
 * constructed. See BootReceiver.kt.
 *
 * WHAT YOU MUST NEVER DO HERE
 * ---------------------------
 * - android.provider.AlarmClock / ACTION_SET_ALARM
 *   That writes into the system Clock app. This project is independent.
 * - Rely on JS setTimeout / setInterval / expo-notifications triggers
 *   as the *source of truth*. Those are killed with the process / delayed
 *   by Doze. AlarmManager.setExactAndAllowWhileIdle is the API you want.
 *
 * ALARMMANAGER CHEAT SHEET (fill in scheduleExact)
 * ------------------------------------------------
 *   val am = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
 *   val intent = Intent(context, AlarmReceiver::class.java).apply {
 *     putExtra("requestCode", requestCode)
 *     putExtra("title", title)
 *     putExtra("body", body)
 *   }
 *   val pi = PendingIntent.getBroadcast(
 *     context,
 *     requestCode,               // uniqueness key — collisions replace
 *     intent,
 *     PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
 *   )
 *   am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, fireAtMs, pi)
 *
 * RTC_WAKEUP = wall-clock time, wake the device.
 * ELAPSED_REALTIME_WAKEUP = ms since boot; wrong for "6:00 AM Tuesday".
 *
 * Android 12+: if !am.canScheduleExactAlarms(), setExactAndAllowWhileIdle
 * throws or degrades. Expose canScheduleExactAlarms() to JS so the UI can
 * send the user to Settings.
 *
 * Rebuild native after changing this file: `npx expo run:android`.
 * Fast Refresh does not update Kotlin.
 */
class AlarmNativeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("AlarmNative")

    /**
     * TODO: return alarmManager.canScheduleExactAlarms()
     * On API < 31 you can just return true.
     */
    Function("canScheduleExactAlarms") {
      false
    }

    /**
     * TODO: start Activity with
     *   Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM
     *   and data Uri.parse("package:" + context.packageName)
     */
    AsyncFunction("requestExactAlarmSettings") {
    }

    /**
     * TODO: AlarmManager.setExactAndAllowWhileIdle as in the header.
     *
     * fireAtMs is epoch milliseconds from JS (Number). Kotlin sees Double
     * unless you convert: fireAtMs.toLong().
     */
    AsyncFunction("scheduleExact") { _requestCode: Int, _fireAtMs: Double, _title: String, _body: String ->
    }

    /**
     * TODO: build the same PendingIntent (same requestCode, same component)
     * and AlarmManager.cancel(pi). Also cancel the matching notification.
     */
    AsyncFunction("cancel") { _requestCode: Int ->
    }
  }
}
