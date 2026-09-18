import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * CalendarGrid — a month of days, which you will build.
 *
 * DO NOT install react-native-calendars on day one. A month grid is:
 *   - 7 weekday headers
 *   - leading blank cells so the 1st lands on the right weekday
 *   - 28–31 day cells
 *   - trailing blanks to fill the last row
 *
 * ALGORITHM
 *   const first = new Date(year, monthIndex, 1);
 *   const startPad = first.getDay(); // 0=Sun if you want weeks to start Sunday
 *   const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
 *   cells = [...Array(startPad).fill(null), 1, 2, ..., daysInMonth]
 *
 * Render with flexWrap: 'wrap' and each cell width: '14.28%' (100/7),
 * or a 7-column approach. Pressing a day should navigate to ScheduleEditor
 * with `{ date: 'YYYY-MM-DD' }`.
 *
 * Marks: once you can query which routine applies on a date (domain +
 * repos), pass a map of IsoDate → color and draw a dot under the number.
 *
 * This stub only shows weekday headers so you can see where the grid goes.
 */

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarGrid({
  onPressDay: _onPressDay,
}: {
  onPressDay?: (isoDate: string) => void;
}) {
  return (
    <View>
      <View style={styles.weekHeader}>
        {WEEKDAYS.map((label, index) => (
          <Text key={`${label}-${index}`} style={styles.weekLabel}>
            {label}
          </Text>
        ))}
      </View>
      <Pressable style={styles.placeholder} disabled>
        <Text style={styles.placeholderText}>
          TODO: render day cells for the current month. See the comment at the
          top of CalendarGrid.tsx. Hook onPressDay(iso) when a cell is tapped.
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  weekHeader: {
    flexDirection: 'row',
  },
  weekLabel: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: '700',
    color: '#64748B',
    paddingVertical: 8,
  },
  placeholder: {
    minHeight: 180,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  placeholderText: {
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
  },
});
