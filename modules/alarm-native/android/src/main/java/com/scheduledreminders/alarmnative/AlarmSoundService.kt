package com.scheduledreminders.alarmnative

import android.app.Service
import android.content.Intent
import android.os.IBinder

/**
 * Foreground service that holds a wake lock-ish notification and plays sound.
 *
 * WHY A SERVICE
 * -------------
 * BroadcastReceiver.onReceive is not allowed to run for long. A started
 * foreground service tells Android "the user is looking at an alarm; do
 * not kill me". Use:
 *   android:foregroundServiceType="mediaPlayback"
 * on the <service> tag (Android 14+ will crash without a valid type).
 *
 * onStartCommand
 * --------------
 * 1. Build a high-priority notification (same channel as the full-screen
 *    intent) and call startForeground(id, notification).
 * 2. Start MediaPlayer / ExoPlayer looping the alarm sound.
 *    Use AudioAttributes.USAGE_ALARM so volume follows the alarm stream,
 *    not media (silent media / DND nuances — learn this when you get there).
 * 3. Optionally vibrate with VibrationEffect.
 *
 * onDestroy / stop path: stop the player, stopForeground, stopSelf.
 *
 * Do not do this with a JS BackgroundFetch. It will not be on time.
 */
class AlarmSoundService : Service() {
  override fun onBind(_intent: Intent?): IBinder? = null

  override fun onStartCommand(_intent: Intent?, _flags: Int, _startId: Int): Int {
    // TODO: startForeground + play looping USAGE_ALARM sound.
    // Return START_NOT_STICKY — if the OS kills you after dismiss, stay dead.
    return START_NOT_STICKY
  }
}
