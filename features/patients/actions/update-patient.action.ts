"use server";

import { revalidatePath } from "next/cache";

import { patientUpdateSchema } from "../schemas/patient.schema";
import { updatePatientDisplayName } from "../server/get-patient";

export type UpdatePatientActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function updatePatientDisplayNameAction(
  _prev: UpdatePatientActionState,
  formData: FormData,
): Promise<UpdatePatientActionState> {
  const parsed = patientUpdateSchema.safeParse({
    id: formData.get("id"),
    displayName: formData.get("displayName"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.flatten().fieldErrors.displayName?.[0] ?? "Invalid input" };
  }

  const updated = await updatePatientDisplayName(
    parsed.data.id,
    parsed.data.displayName,
  );

  if (!updated) {
    return { status: "error", message: "Patient not found" };
  }

  revalidatePath("/patients");
  revalidatePath(`/patients/${parsed.data.id}`);

  return { status: "success", message: "Saved" };
}
