import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { LearningNote } from '../components/LearningNote';
import type { RoutinesStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RoutinesStackParamList, 'RoutineEditor'>;

/**
 * Create / edit one routine and its alarm templates.
 *
 * FORM SHAPE
 * ----------
 * Routine: name (string), color (hex — start with a few hardcoded chips).
 * Each template row: name, hour, minute, enabled switch, snooze minutes.
 *
 * Params: `routineId` missing means create. Present means load + update.
 *
 * SAVE ORDER
 * ----------
 * 1. createRoutine or updateRoutine
 * 2. For templates: diff (new / edited / deleted). Simplest v1: delete all
 *    templates for the routine and insert the form rows. That's OK until
 *    occurrences reference template ids — then you need stable ids.
 * 3. Do NOT call AlarmManager. Templates have no dates yet.
 *
 * TIME PICKER
 * -----------
 * React Native has no built-in time picker on all platforms. For Android
 * you can use a simple two TextInputs (hour, minute) first, then look at
 * @react-native-community/datetimepicker later.
 */
export function RoutineEditorScreen({ route }: Props) {
  const routineId = route.params.routineId;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{routineId ? 'Edit routine' : 'New routine'}</Text>
      <LearningNote>
        Build a form: routine name, color, and a list of templates (hour/minute).
        Save through routinesRepo + alarmTemplatesRepo. route.params.routineId is
        {routineId ? ` ${routineId}` : ' undefined (create mode)'}.
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
