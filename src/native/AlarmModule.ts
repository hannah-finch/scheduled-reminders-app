/**
 * JS façade over the Kotlin Expo module.
 *
 * WHY A WRAPPER
 * -------------
 * Screens and services import THIS file, not `modules/alarm-native/...`.
 * If you rename native methods, you fix them in one place.
 *
 * Do not call requireNativeModule at module load if you still want the JS
 * bundle to open in Expo Go — the native module only exists after
 * `npx expo run:android`. The lazy getter below avoids crashing the
 * placeholder UI. Once you exclusively use a dev build, you can simplify it.
 *
 * NATIVE CONTRACT (implement on both sides)
 *   scheduleExact(requestCode, fireAtMs, title, body)
 *   cancel(requestCode)
 *   canScheduleExactAlarms() → boolean
 *   requestExactAlarmSettings() → opens system settings (Android 12+)
 *
 * Native code receives a timestamp, not "every Monday". JS already decided
 * the instant. Keep it that way.
 */

import { notImplemented } from '../utils/notImplemented';

export type ScheduleExactArgs = {
  requestCode: number;
  fireAtMs: number;
  title: string;
  body: string;
};

function getNative(): {
  scheduleExact: (requestCode: number, fireAtMs: number, title: string, body: string) => Promise<void>;
  cancel: (requestCode: number) => Promise<void>;
  canScheduleExactAlarms: () => boolean;
  requestExactAlarmSettings: () => Promise<void>;
} | null {
  /**
   * TODO: lazy-load so placeholder screens still run before you rebuild native:
   *
   *   try {
   *     const { default: AlarmNative } = require('../../modules/alarm-native/src/AlarmNativeModule');
   *     return AlarmNative;
   *   } catch (e) {
   *     console.warn('AlarmNative missing. Use a development build.', e);
   *     return null;
   *   }
   *
   * `requireNativeModule('AlarmNative')` lives inside AlarmNativeModule.ts.
   */
  return null;
}

export async function scheduleExact(_args: ScheduleExactArgs): Promise<void> {
  const native = getNative();
  if (!native) {
    return notImplemented(
      'AlarmModule.scheduleExact — load the Expo module and call native.scheduleExact',
    );
  }
  return notImplemented('AlarmModule.scheduleExact — native.scheduleExact(code, fireAtMs, title, body)');
}

export async function cancel(_requestCode: number): Promise<void> {
  return notImplemented('AlarmModule.cancel');
}

export function canScheduleExactAlarms(): boolean {
  return notImplemented('AlarmModule.canScheduleExactAlarms');
}

export async function requestExactAlarmSettings(): Promise<void> {
  // On Android 12+ this should open ACTION_REQUEST_SCHEDULE_EXACT_ALARM.
  return notImplemented('AlarmModule.requestExactAlarmSettings');
}
