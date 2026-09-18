# Scheduled Reminders

An Android app (Expo + TypeScript) for grouping alarms into **routines** and placing those routines on a **calendar**. This repository is a **learning scaffold**: files, types, dependencies, and comments are in place. The SQL, date math, and `AlarmManager` code are **not implemented** — that is your practice.

The app is independent of the built-in Clock app. Do not use `ACTION_SET_ALARM`.

## What you are building

Three nested ideas:

1. **Alarm template** — a time-of-day reminder inside a routine (`Wake up` at 06:00). No calendar date.
2. **Routine** — a named group of templates (`Work day` = wake up + leave).
3. **Schedule** — when a routine applies (`Work day` every Monday–Friday).

The app then **materializes** upcoming fire times (`alarm_occurrences`) and registers each one with Android `AlarmManager`.

```
Screens  →  repositories (SQL)  →  SQLite
         →  occurrence generator (pure TS)
         →  alarmSync  →  AlarmModule.js  →  Kotlin  →  AlarmManager
                                                    →  Receiver → sound service + ringing Activity
BootReceiver  →  reschedule pending occurrences
```

## Why a development build (not Expo Go)

Expo Go cannot include a custom Kotlin module. This app uses `expo-dev-client`. You compile a real APK/emulator image with `npx expo run:android`. After that, `npm start` talks to **that** install, not Expo Go.

JS timers and `expo-notifications` scheduled triggers are not good enough for an alarm clock (process death, Doze, OEM battery savers). Exact alarms belong in `AlarmManager`.

## How to run

You need Node, JDK 17+, and Android Studio (SDK + an emulator or a device with USB debugging).

```bash
npm install
npx expo run:android
```

That generates the `android/` folder (gitignored), compiles the local module under `modules/alarm-native`, and installs a dev client.

Then:

```bash
npm start
```

You can navigate the placeholder tabs. Nothing persists and nothing rings until you fill in the TODOs.

Changing **Kotlin** or `app.config.ts` requires another `npx expo run:android`. Fast Refresh only updates JavaScript/TypeScript.

## Learning order

Do these in order. Each step is a closed loop you can test before the next.

1. **SQLite** — `src/db/schema.ts` then `src/db/client.ts`. Call `getDb()` from a temporary button and log success.
2. **Routine CRUD** — `src/db/mappers.ts`, `routinesRepo.ts`, `alarmTemplatesRepo.ts`, then the Routines screens.
3. **Pure date logic** — `src/domain/recurrence.ts`. Log `scheduleAppliesOnDate` for a fake M–F schedule. No UI required.
4. **Occurrence generator** — `src/domain/occurrenceGenerator.ts`. Feed it fake templates + schedules, print timestamps.
5. **Schedules + calendar** — remaining repos, `CalendarGrid.tsx`, Calendar / Schedule editor screens.
6. **Persist occurrences + Upcoming tab** — `occurrencesRepo.ts`, `settingsRepo.ts` (request codes).
7. **Native schedule/cancel** — Kotlin `AlarmNativeModule`, then `src/native/AlarmModule.ts`, then `src/services/alarmSync.ts`.
8. **Ringing** — `AlarmReceiver`, `AlarmSoundService`, `AlarmRingingActivity`, uncomment the module `AndroidManifest.xml`.
9. **Boot + permissions** — `BootReceiver`, `src/services/permissions.ts`, exact-alarm settings UX.

## Layer rules (how things communicate)

| Layer | May talk to | Must not |
| --- | --- | --- |
| Screens | repos, domain (for display), services | SQL strings, Kotlin, `AlarmManager` |
| Repositories | `getDb()`, mappers | React, navigation, native module |
| Domain (`recurrence`, `occurrenceGenerator`) | only their arguments | `getDb()`, React, native |
| `alarmSync` | repos + domain + `AlarmModule` | UI components |
| `AlarmModule.ts` | Expo native module | SQL, recurrence |
| Kotlin | `AlarmManager`, receivers, services | deciding which weekdays are work days |

**Rule:** native code receives a timestamp (`fireAtMs`) and a `requestCode`. JavaScript already decided *which* days are work days.

When a screen saves a schedule, the sequence is:

1. Repository `INSERT`/`UPDATE`
2. `alarmSync.syncAll()` (regenerate occurrences, cancel/schedule native)
3. UI re-reads from the DB (Upcoming, calendar marks)

## Folder map

```
App.tsx                          entry — add getDb() bootstrap later
app.config.ts                    package id, permissions, plugins
src/types/models.ts              shared TypeScript types
src/db/schema.ts                 CREATE TABLE sketches (you write the SQL)
src/db/client.ts                 open DB + migrations
src/db/mappers.ts                SQLite rows ↔ domain types
src/db/repositories/             CRUD per table
src/domain/                      pure functions (dates, occurrence list)
src/services/alarmSync.ts        DB ↔ native orchestration
src/services/permissions.ts      exact alarms, notifications, battery
src/native/AlarmModule.ts        JS façade over Kotlin
src/navigation/                  React Navigation (tabs + stacks)
src/screens/                     placeholder screens
src/components/CalendarGrid.tsx  month grid you will build
modules/alarm-native/            Expo local module (Android only)
  android/.../AlarmNativeModule.kt
  android/.../AlarmReceiver.kt
  android/.../AlarmSoundService.kt
  android/.../AlarmRingingActivity.kt
  android/.../BootReceiver.kt
```

## Database

Local SQLite via `expo-sqlite`. No cloud, no login.

Suggested tables (comments in `src/db/schema.ts`):

- `routines`
- `alarm_templates` — hour/minute, belongs to a routine
- `schedules` — `once` or `weekly` + `days_of_week` JSON
- `schedule_exceptions` — skip a holiday
- `alarm_occurrences` — materialized fires + `native_request_code`
- `settings` — horizon days, snooze default, next request code

Use `PRAGMA foreign_keys = ON` on every open. Store booleans as `0/1`. Store weekdays as JSON text `'[1,2,3,4,5]'` (JS `Date.getDay()`, Monday = 1). Store calendar days as `YYYY-MM-DD` strings, never `Date` objects.

Recurrence v1 is weekly day flags only. Do not start with iCal `RRULE`.

## Native Android

The local module lives in `modules/alarm-native` and is autolinked. Method names:

- `canScheduleExactAlarms()`
- `requestExactAlarmSettings()`
- `scheduleExact(requestCode, fireAtMs, title, body)`
- `cancel(requestCode)`

Uncomment the `<receiver>` / `<activity>` / `<service>` block in the module manifest when those classes actually do work.

Permissions are already listed in `app.config.ts`. Listing a permission is not the same as using it; some still need a runtime prompt or a Settings screen (`SCHEDULE_EXACT_ALARM`).

## What is intentionally unfinished

- Every `notImplemented(...)` call
- `CREATE TABLE` SQL
- Calendar day cells
- Alarm sound, lock-screen UI, boot reschedule
- iOS

Placeholder navigation **does** work so you can click around while you learn.

## Expo docs

Read the version that matches this project (SDK 57): https://docs.expo.dev/versions/v57.0.0/
