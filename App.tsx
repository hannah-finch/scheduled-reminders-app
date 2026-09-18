/**
 * App entry.
 *
 * STARTUP SEQUENCE YOU WILL ADD
 * -----------------------------
 * 1. await getDb()            — create tables on first launch
 * 2. await getPermissionSnapshot() — optional banner if exact alarms are off
 * 3. await syncAll()          — extend the occurrence window, re-register
 *                               native alarms (AlarmManager forgets nothing
 *                               while the phone stays up, but YOUR horizon
 *                               needs extending every few days)
 *
 * Don't do step 3 until the native module is implemented; it will throw.
 *
 * Keep this file thin. Navigation lives in RootNavigator. Side effects
 * belong in a small `bootstrap()` function you can try/catch without
 * unmounting the UI.
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  // TODO: useEffect(() => { void bootstrap(); }, []);
  // async function bootstrap() {
  //   await getDb();
  // }
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
