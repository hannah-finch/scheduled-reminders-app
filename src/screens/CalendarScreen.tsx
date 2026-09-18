import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { CalendarGrid } from '../components/CalendarGrid';
import { LearningNote } from '../components/LearningNote';
import type { CalendarStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CalendarStackParamList, 'CalendarHome'>;

/**
 * Month calendar: which routine runs on which day.
 *
 * DATA FLOW
 * ---------
 * You need, for visible days:
 *   schedules + routines + exceptions → DayAssignment[]
 * Use eachDay(firstOfMonth, lastOfMonth) and appliesWithExceptions.
 * Then pass colors into CalendarGrid.
 *
 * TAP A DAY
 * ---------
 * Navigate to ScheduleEditor with { date }. The editor decides whether to
 * create a one-off, start a weekly rule, or skip (exception) an existing rule.
 *
 * MONTH PAGING
 * ------------
 * Keep year/month in useState. Prev/next buttons that ±1 month
 * (remember January/December rollover).
 *
 * This screen is read-mostly. Writes happen on ScheduleEditor.
 */
export function CalendarScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Calendar</Text>
      <LearningNote>
        Fill in CalendarGrid, then mark days by joining schedules to routines.
        Tapping a day should open the schedule editor with that YYYY-MM-DD.
      </LearningNote>
      <CalendarGrid />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ScheduleEditor', {})}
      >
        <Text style={styles.buttonLabel}>Open schedule editor stub</Text>
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
