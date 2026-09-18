/**
 * Types for the AlarmNative Expo module.
 *
 * Keep these aligned with:
 *   - Kotlin AsyncFunction / Function argument lists
 *   - src/native/AlarmModule.ts in the app
 *
 * JS numbers are IEEE doubles. Request codes should be integers that fit
 * in a signed 32-bit int (PendingIntent). fireAtMs is epoch milliseconds.
 */

export type ScheduleExactParams = {
  requestCode: number;
  fireAtMs: number;
  title: string;
  body: string;
};

export type AlarmNativeEvents = {
  /**
   * Optional: native can emit this when an alarm fires if JS is alive.
   * Do not require it for sound to play — the Service handles that.
   */
  onAlarmFired: (payload: { requestCode: number }) => void;
};
