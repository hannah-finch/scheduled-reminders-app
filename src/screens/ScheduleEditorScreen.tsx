import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { LearningNote } from '../components/LearningNote';
import type { CalendarStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CalendarStackParamList, 'ScheduleEditor'>;

/**
 * Attach a routine to the calendar.
 *
 * FIELDS
 * ------
 *   routineId     picker of existing routines (you cannot schedule a
 *                 routine that doesn't exist — create that first)
 *   kind          'once' | 'weekly'
 *   startDate     default to route.params.date
 *   endDate       optional; hide when kind is 'once'
 *   daysOfWeek    7 toggles; hide when kind is 'once'
 *   enabled       switch
 *
 * AFTER SAVE
 * ----------
 * 1. createSchedule / updateSchedule
 * 2. alarmSync.syncAll()  — THIS is the moment JS must talk to Android.
 *    Until AlarmManager is implemented, step 2 will throw. That's expected.
 *    You can comment it out until the native module is ready.
 *
 * WEEKLY PRESET
 * -------------
 * A "M–F" chip that sets daysOfWeek to [1,2,3,4,5] will make the Work day
 * example fast to enter.
 */
export function ScheduleEditorScreen({ route }: Props) {
  const { scheduleId, date } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Schedule editor</Text>
      <LearningNote>
        Form: pick a routine, once vs weekly, days of week, start/end. Params:
        scheduleId={scheduleId ?? 'none'}, date={date ?? 'none'}. After a real
        save, call alarmSync.syncAll() so occurrences get registered natively.
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
