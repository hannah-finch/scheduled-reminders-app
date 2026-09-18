package com.scheduledreminders.alarmnative

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/**
 * Fires when AlarmManager thinks it is time.
 *
 * onReceive MUST return quickly. The OS can kill you when this method
 * returns. So do not play a 5-minute sound here.
 *
 * INTENDED FLOW
 * -------------
 * 1. Read extras: requestCode, title, body
 * 2. Start AlarmSoundService as a *foreground* service
 *    (Context.startForegroundService — and the service must call
 *    startForeground(notificationId, notification) within ~5 seconds)
 * 3. Start AlarmRingingActivity with
 *    intent.addFlags(FLAG_ACTIVITY_NEW_TASK)
 *    so it can appear even if there is no current Activity.
 *
 * Do not start a React Activity as the first step. JS may not be alive.
 *
 * This class is not registered in AndroidManifest.xml yet — uncomment
 * the <receiver> when you implement onReceive, otherwise the OS cannot
 * deliver the PendingIntent (you'll see a warning that the receiver
 * doesn't exist).
 */
class AlarmReceiver : BroadcastReceiver() {
  override fun onReceive(_context: Context, _intent: Intent) {
    // TODO: start AlarmSoundService + AlarmRingingActivity.
    // Log.d("AlarmReceiver", "fired requestCode=" + intent.getIntExtra("requestCode", -1))
  }
}
