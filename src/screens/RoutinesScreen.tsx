import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

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
