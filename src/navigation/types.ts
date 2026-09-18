/**
 * Navigation types — the TypeScript source of truth for screen params.
 *
 * React Navigation uses these so `navigation.navigate('RoutineEditor', { routineId })`
 * is type-checked. If you add a screen, add it here first.
 *
 * We use a root stack wrapping tabs so a full-screen AlarmRinging route
 * can sit on top of the tabs later. For now it is just another stub screen.
 */

export type RoutinesStackParamList = {
  RoutinesList: undefined;
  RoutineEditor: { routineId?: string };
};

export type CalendarStackParamList = {
  CalendarHome: undefined;
  ScheduleEditor: { scheduleId?: string; date?: string };
};

export type UpcomingStackParamList = {
  UpcomingList: undefined;
};

export type MainTabParamList = {
  RoutinesTab: undefined;
  CalendarTab: undefined;
  UpcomingTab: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  AlarmRinging: { occurrenceId?: string; requestCode?: number };
};
