/**
 * Root navigator — tabs inside a stack.
 *
 * HOW REACT NAVIGATION FITS TOGETHER
 * ----------------------------------
 * NavigationContainer (in App.tsx)
 *   └─ Root stack
 *        ├─ MainTabs  (bottom tabs)
 *        │    ├─ RoutinesTab  → stack: list + editor
 *        │    ├─ CalendarTab  → stack: month + schedule editor
 *        │    └─ UpcomingTab  → stack: upcoming list
 *        └─ AlarmRinging     (presented over tabs; native Activity is still better)
 *
 * Each tab has its own stack so "back" from RoutineEditor stays on the
 * Routines tab instead of jumping to Calendar.
 *
 * Screens currently render placeholders. Wiring real data is your job;
 * do not start that work by putting SQL in this file.
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AlarmRingingScreen } from '../screens/AlarmRingingScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { RoutineEditorScreen } from '../screens/RoutineEditorScreen';
import { RoutinesScreen } from '../screens/RoutinesScreen';
import { ScheduleEditorScreen } from '../screens/ScheduleEditorScreen';
import { UpcomingScreen } from '../screens/UpcomingScreen';
import type {
  CalendarStackParamList,
  MainTabParamList,
  RootStackParamList,
  RoutinesStackParamList,
  UpcomingStackParamList,
} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const RoutinesStack = createNativeStackNavigator<RoutinesStackParamList>();
const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();
const UpcomingStack = createNativeStackNavigator<UpcomingStackParamList>();

function RoutinesNavigator() {
  return (
    <RoutinesStack.Navigator>
      <RoutinesStack.Screen
        name="RoutinesList"
        component={RoutinesScreen}
        options={{ title: 'Routines' }}
      />
      <RoutinesStack.Screen
        name="RoutineEditor"
        component={RoutineEditorScreen}
        options={{ title: 'Edit routine' }}
      />
    </RoutinesStack.Navigator>
  );
}

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarHome"
        component={CalendarScreen}
        options={{ title: 'Calendar' }}
      />
      <CalendarStack.Screen
        name="ScheduleEditor"
        component={ScheduleEditorScreen}
        options={{ title: 'Schedule' }}
      />
    </CalendarStack.Navigator>
  );
}

function UpcomingNavigator() {
  return (
    <UpcomingStack.Navigator>
      <UpcomingStack.Screen
        name="UpcomingList"
        component={UpcomingScreen}
        options={{ title: 'Upcoming' }}
      />
    </UpcomingStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="RoutinesTab"
        component={RoutinesNavigator}
        options={{ headerShown: false, title: 'Routines' }}
      />
      <Tabs.Screen
        name="CalendarTab"
        component={CalendarNavigator}
        options={{ headerShown: false, title: 'Calendar' }}
      />
      <Tabs.Screen
        name="UpcomingTab"
        component={UpcomingNavigator}
        options={{ headerShown: false, title: 'Upcoming' }}
      />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack.Navigator>
        <RootStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AlarmRinging"
          component={AlarmRingingScreen}
          options={{ title: 'Alarm', presentation: 'fullScreenModal' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
