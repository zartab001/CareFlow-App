import { z } from "zod";

export const patientDtoSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  nhsNumber: z.string().nullable().optional(),
});

export type PatientDto = z.infer<typeof patientDtoSchema>;

export const patientUpdateSchema = z.object({
  id: z.string(),
  displayName: z.string().min(1).max(120),
});

export type PatientUpdateInput = z.infer<typeof patientUpdateSchema>;
