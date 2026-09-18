import { NativeModule, registerWebModule } from 'expo';

/**
 * Web stub — this app is Android-only. Methods throw so you notice if you
 * accidentally `npm run web` and expect alarms.
 */
class AlarmNativeModule extends NativeModule {
  canScheduleExactAlarms(): boolean {
    return false;
  }

  async requestExactAlarmSettings(): Promise<void> {
    throw new Error('AlarmNative is Android-only');
  }

  async scheduleExact(
    _requestCode: number,
    _fireAtMs: number,
    _title: string,
    _body: string,
  ): Promise<void> {
    throw new Error('AlarmNative is Android-only');
  }

  async cancel(_requestCode: number): Promise<void> {
    throw new Error('AlarmNative is Android-only');
  }
}

export default registerWebModule(AlarmNativeModule, 'AlarmNativeModule');
