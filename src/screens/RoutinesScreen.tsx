import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { getDb } from '../db/client';

import { LearningNote } from '../components/LearningNote';
import type { RoutinesStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RoutinesStackParamList, 'RoutinesList'>;

/**
 * Routines list.
 *
 * YOUR IMPLEMENTATION
 * -------------------
 * 1. useEffect + useState to call getAllRoutines() once the repo works.
 * 2. FlatList of routine names + color swatch.
 * 3. Tap → navigation.navigate('RoutineEditor', { routineId: item.id })
 * 4. FAB / header button → navigate without routineId (create mode).
 *
 * Empty state: "No routines yet. Create Work day."
 *
 * Do not generate occurrences here. Saving the editor is the moment to
 * think about sync, and even then it belongs in a service call.
 */
export function RoutinesScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Routines</Text>
      <LearningNote>
        A routine is a named group of time-of-day alarms, not a calendar event.
        Implement src/db/schema.ts and routinesRepo.ts, then replace this list.
      </LearningNote>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('RoutineEditor', {})}
      >
        <Text style={styles.buttonLabel}>Open editor stub (create)</Text>
      </Pressable>

      <Pressable
  style={styles.button}
  onPress={async () => {
    try {
      const db = await getDb();
      const versionRow = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
      );
      const tables = await db.getAllAsync<{ name: string }>(
        `SELECT name FROM sqlite_master
         WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
         ORDER BY name`
      );
      const settings = await db.getFirstAsync<{ id: number; horizon_days: number }>(
        'SELECT id, horizon_days FROM settings WHERE id = 1'
      );
      const names = tables.map((t) => t.name).join(', ');
      const message =
        `user_version=${versionRow?.user_version}\n` +
        `tables: ${names}\n` +
        `settings.horizon_days=${settings?.horizon_days}`;
      console.log(message);
      Alert.alert('DB ok', message);
    } catch (err) {
      console.error(err);
      Alert.alert('DB failed', String(err));
    }
  }}
>
  <Text style={styles.buttonLabel}>Test SQLite</Text>
</Pressable>



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
  button: {
    backgroundColor: '#1D4ED8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: '600',
  },
});
