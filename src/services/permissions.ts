/**
 * permissions.ts — Android runtime / special permissions for alarms.
 *
 * THREE DIFFERENT SYSTEMS (easy to confuse)
 * -----------------------------------------
 * 1. Install-time permissions in app.config.ts (merged into the Manifest).
 *    If it's not in the Manifest, the OS will never grant it.
 *
 * 2. Runtime dangerous permissions, e.g. POST_NOTIFICATIONS on API 33+.
 *    Use expo-sqlite? No — use expo APIs or a small native method.
 *    You will probably add `expo-notifications` later just to create a
 *    NotificationChannel, or request POST_NOTIFICATIONS from Kotlin.
 *
 * 3. Special app-ops that have their own Settings screens:
 *      - Exact alarms (SCHEDULE_EXACT_ALARM) — AlarmManager.canScheduleExactAlarms()
 *      - Ignore battery optimizations — ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
 *      - Full-screen intents — also a settings toggle on Android 14+
 *
 * UX SUGGESTION
 * -------------
 * First launch: explain *why* ("so your 6am alarm still rings if the
 * phone is idle"), then deep-link to the right Settings page. Don't
 * spam the user on every app open; store a "we've asked" flag in settings.
 *
 * OEM GOTCHA
 * ----------
 * Xiaomi, Huawei, Samsung, etc. have extra "autostart" / battery menus
 * that are not standard Android. You cannot fully solve this. Document
 * it in an in-app Help screen later.
 */

import { notImplemented } from '../utils/notImplemented';

export type PermissionSnapshot = {
  exactAlarms: boolean;
  notifications: boolean;
  batteryUnrestricted: boolean;
};

export async function getPermissionSnapshot(): Promise<PermissionSnapshot> {
  return notImplemented('permissions.getPermissionSnapshot');
}

export async function requestNotificationPermission(): Promise<boolean> {
  return notImplemented('permissions.requestNotificationPermission');
}

export async function openExactAlarmSettings(): Promise<void> {
  // Delegate to AlarmModule.requestExactAlarmSettings()
  return notImplemented('permissions.openExactAlarmSettings');
}

export async function openBatteryOptimizationSettings(): Promise<void> {
  return notImplemented('permissions.openBatteryOptimizationSettings');
}
