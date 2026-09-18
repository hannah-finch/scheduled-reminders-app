package com.scheduledreminders.alarmnative

import android.app.Activity
import android.os.Bundle

/**
 * Full-screen ringing UI that can appear over the lock screen.
 *
 * WHY NOT THE REACT SCREEN
 * ------------------------
 * src/screens/AlarmRingingScreen.tsx is for design practice. This Activity
 * is what the user actually sees at 6am if you implement it. You can later
 * host a React root inside this Activity if you want, but sound must already
 * be playing in AlarmSoundService before JS loads.
 *
 * LOCK SCREEN FLAGS (in onCreate, before setContentView)
 * ------------------------------------------------------
 *   setShowWhenLocked(true)
 *   setTurnScreenOn(true)
 *   window.addFlags(
 *     WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
 *   )
 *
 * Also post a Notification with:
 *   setFullScreenIntent(pendingIntentToThisActivity, true)
 *   setCategory(CATEGORY_ALARM)
 *   setPriority(PRIORITY_MAX)
 *   foregroundServiceBehavior / a dedicated alarm channel
 *     (IMPORTANCE_HIGH, setSound(null) on the channel if the Service plays
 *      the sound — avoid two sounds)
 *
 * BUTTONS
 * -------
 * Dismiss: stop service, cancel notification, finish(), tell JS/SQLite
 *          the occurrence is dismissed (or write SQLite from Kotlin).
 * Snooze:  stop service, scheduleExact(now + snoozeMs) with a new or reused
 *          requestCode, finish().
 *
 * Register this Activity in AndroidManifest (see the commented block).
 */
class AlarmRingingActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // TODO: lock-screen flags, layout with title + Dismiss + Snooze.
    // Do not call finish() here once you implement it — the activity must stay
    // until the user dismisses or snoozes.
  }
}
