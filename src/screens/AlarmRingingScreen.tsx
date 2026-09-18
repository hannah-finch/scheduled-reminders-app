import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { LearningNote } from '../components/LearningNote';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AlarmRinging'>;

/**
 * JS ringing screen — a placeholder, not the real alarm UX.
 *
 * WHY A NATIVE ACTIVITY SHOULD RING THE ALARM
 * -------------------------------------------
 * When AlarmManager fires, the app process may be dead. A BroadcastReceiver
 * in Kotlin starts a Foreground Service (sound + vibration) and a dedicated
 * Activity with:
 *   window.addFlags(FLAG_SHOW_WHEN_LOCKED | FLAG_TURN_SCREEN_ON)
 *   setShowWhenLocked(true); setTurnScreenOn(true);
 *   a high-priority Notification with a fullScreenIntent
 *
 * A React screen only appears if JS has booted. That's too late for 6am.
 *
 * WHAT THIS FILE IS FOR
 * ---------------------
 * Development: you can navigate here from a debug button to design Dismiss
 * and Snooze. Production: the native Activity can eventually bridge into
 * this screen *after* sound is already playing, or you duplicate the two
 * buttons in XML/Compose. Dismiss/Snooze still call alarmSync from JS or
 * equivalent Kotlin that updates SQLite.
 *
 * Do not play sound with JS Audio APIs for the real alarm path.
 */
export function AlarmRingingScreen({ route }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Alarm (JS placeholder)</Text>
      <LearningNote>
        Implement Dismiss / Snooze UI here for design practice, but the
        lock-screen alarm must be a native Activity. See
        modules/alarm-native/.../AlarmRingingActivity.kt. Params:
        occurrenceId={route.params.occurrenceId ?? 'none'}, requestCode=
        {String(route.params.requestCode ?? 'none')}.
      </LearningNote>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});
