import "server-only";

import { type PatientDto, patientDtoSchema } from "../schemas/patient.schema";

const MOCK: Record<string, PatientDto> = {
  "p-1": { id: "p-1", displayName: "Alex Taylor", nhsNumber: null },
  "p-2": { id: "p-2", displayName: "Jordan Smith", nhsNumber: "9999999999" },
};

export function listPatients(): PatientDto[] {
  return Object.values(MOCK).map((row) => patientDtoSchema.parse(row));
}

export async function getPatientById(id: string): Promise<PatientDto | null> {
  const row = MOCK[id];
  if (!row) {
    return null;
  }
  return patientDtoSchema.parse(row);
}

export async function updatePatientDisplayName(
  id: string,
  displayName: string,
): Promise<PatientDto | null> {
  const existing = MOCK[id];
  if (!existing) {
    return null;
  }
  const next: PatientDto = { ...existing, displayName };
  MOCK[id] = patientDtoSchema.parse(next);
  return MOCK[id];
}
