/**
 * alarmTemplatesRepo — CRUD for time-of-day templates that belong to a routine.
 *
 * A template is NOT scheduled. It is a recipe: "when this routine runs, fire
 * at 06:00 with this name." The occurrence generator reads these.
 *
 * Validation you should do here or in the editor screen (pick one place):
 *   hour in 0..23, minute in 0..59, name non-empty.
 * SQLite CHECK constraints are a second line of defense, not the UI.
 *
 * Changing a template's time does not automatically move already-scheduled
 * native alarms. Plan:
 *   1. UPDATE the template row
 *   2. Delete future pending occurrences for this template (occurrencesRepo)
 *   3. Re-run occurrenceGenerator + alarmSync
 * Put that orchestration in a service, not in this file.
 */

import type { AlarmTemplate } from '../../types/models';
import { notImplemented } from '../../utils/notImplemented';

export async function getTemplatesForRoutine(
  _routineId: string,
): Promise<AlarmTemplate[]> {
  // SELECT * FROM alarm_templates WHERE routine_id = ? ORDER BY hour, minute
  return notImplemented('alarmTemplatesRepo.getTemplatesForRoutine');
}

export async function getTemplateById(_id: string): Promise<AlarmTemplate | null> {
  return notImplemented('alarmTemplatesRepo.getTemplateById');
}

export async function createTemplate(
  _input: Omit<AlarmTemplate, 'id'>,
): Promise<AlarmTemplate> {
  return notImplemented('alarmTemplatesRepo.createTemplate');
}

export async function updateTemplate(
  _id: string,
  _patch: Partial<Omit<AlarmTemplate, 'id' | 'routineId'>>,
): Promise<void> {
  return notImplemented('alarmTemplatesRepo.updateTemplate');
}

export async function deleteTemplate(_id: string): Promise<void> {
  return notImplemented('alarmTemplatesRepo.deleteTemplate');
}
