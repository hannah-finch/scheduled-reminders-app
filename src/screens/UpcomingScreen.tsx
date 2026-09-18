import { ScrollView, StyleSheet, Text } from 'react-native';

import { LearningNote } from '../components/LearningNote';

/**
 * Upcoming alarms — reads alarm_occurrences, not schedules.
 *
 * WHY NOT DERIVE THIS ON THE FLY
 * ------------------------------
 * You want the same timestamps that AlarmManager has. If this list came
 * from the generator and the DB/native layer drifted, you'd debug ghosts.
 * Show what's actually in alarm_occurrences WHERE fire_at_ms >= now
 * ORDER BY fire_at_ms.
 *
 * JOIN IN JS
 * ----------
 * Occurrence rows only store ids. Map templateId → name/time and
 * scheduleId → routine name. Either:
 *   - query in the repo with SQL JOINs (good practice), or
 *   - load all three tables and zip in JS (fine while data is small).
 *
 * Format fireAtMs with something like:
 *   new Date(ms).toLocaleString()
 * for v1. Later, split "Tomorrow · 6:00 AM" yourself using recurrence.ts.
 */
export function UpcomingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Upcoming</Text>
      <LearningNote>
        Once occurrenceGenerator + alarmSync write rows, list pending
        occurrences here. Until then this tab is empty on purpose.
      </LearningNote>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
