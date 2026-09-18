import { NativeModule, requireNativeModule } from 'expo';

import type { AlarmNativeEvents } from './AlarmNative.types';

/**
 * Typed JS view of the Kotlin module.
 *
 * requireNativeModule('AlarmNative') looks up Name("AlarmNative") in Kotlin.
 * This throws if you are in Expo Go or a build that didn't compile the
 * local module. The app wrapper (src/native/AlarmModule.ts) should lazy-load
 * this so placeholder screens still open.
 *
 * After you change Kotlin method names, update this class to match or
 * TypeScript will lie to you.
 */
declare class AlarmNativeModule extends NativeModule<AlarmNativeEvents> {
  canScheduleExactAlarms(): boolean;
  requestExactAlarmSettings(): Promise<void>;
  scheduleExact(requestCode: number, fireAtMs: number, title: string, body: string): Promise<void>;
  cancel(requestCode: number): Promise<void>;
}

export default requireNativeModule<AlarmNativeModule>('AlarmNative');
