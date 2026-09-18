import type { ExpoConfig } from 'expo/config';

/**
 * Expo app config (TypeScript version of app.json).
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * A development build (expo-dev-client) compiles real Android code. Permissions,
 * the application id, and native plugins all have to be declared here *before*
 * you run `npx expo prebuild` / `npx expo run:android`. Changing this file
 * usually requires a new native rebuild — Fast Refresh will not pick it up.
 *
 * Local modules under ./modules are autolinked by Expo. You do not list
 * alarm-native in `plugins` unless you later add a config plugin
 * (app.plugin.js) that edits the Android Gradle/manifest for you.
 *
 * These permissions are declared now so the generated AndroidManifest contains
 * them. Declaring a permission is NOT the same as using it — your Kotlin code
 * still has to call AlarmManager, and some permissions (notifications, exact
 * alarms) also need a runtime prompt. See src/services/permissions.ts.
 */
const config: ExpoConfig = {
  name: 'Scheduled Reminders',
  slug: 'scheduled-reminders-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  // Used later if the native ringing Activity wants to open a JS screen.
  scheme: 'scheduledreminders',
  ios: {
    supportsTablet: true,
    // iOS is out of scope for v1. Leave this so Expo is happy.
    bundleIdentifier: 'com.scheduledreminders.app',
  },
  android: {
    package: 'com.scheduledreminders.app',
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    /**
     * Permissions the OS must know about. Read each comment before you rely on it.
     *
     * Android 12+: SCHEDULE_EXACT_ALARM — user can revoke this in system settings.
     * Android 14+: USE_EXACT_ALARM — reserved for calendar/alarm apps; Play policy
     *   applies if you publish. For a personal learning app this is the right one.
     * Android 13+: POST_NOTIFICATIONS — runtime request required.
     * Android 14+: USE_FULL_SCREEN_INTENT — needed so the ringing UI can appear
     *   over the lock screen. Also restricted on the Play Store.
     */
    permissions: [
      'android.permission.SCHEDULE_EXACT_ALARM',
      'android.permission.USE_EXACT_ALARM',
      'android.permission.POST_NOTIFICATIONS',
      'android.permission.RECEIVE_BOOT_COMPLETED',
      'android.permission.WAKE_LOCK',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK',
      'android.permission.USE_FULL_SCREEN_INTENT',
      'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
      'android.permission.VIBRATE',
    ],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-sqlite',
    'expo-dev-client',
    /**
     * When you implement the ringing foreground service, you will likely add
     * a config plugin (or edit the prebuild AndroidManifest) to declare:
     *   <service android:foregroundServiceType="mediaPlayback" ... />
     * Expo does not infer that from this permissions list.
     */
  ],
  extra: {
    /**
     * How many days ahead JS should materialize occurrences. Native AlarmManager
     * does not accept "every Monday at 6am" as a repeating exact alarm you can
     * trust — you schedule concrete timestamps, then extend the window when
     * the app opens. Start with 14–30 days.
     */
    occurrenceHorizonDays: 21,
  },
};

export default config;
