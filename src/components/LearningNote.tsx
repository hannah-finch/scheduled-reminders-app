import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Small teaching callout used on every placeholder screen.
 * Delete usages as you replace screens with real UI.
 */
export function LearningNote({ children }: { children: ReactNode }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>Learning note</Text>
      <Text style={styles.body}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  label: {
    fontWeight: '700',
    color: '#3730A3',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  body: {
    color: '#1E1B4B',
    lineHeight: 20,
  },
});
