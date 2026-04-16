import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getPatientById } from "@/features/patients/server/get-patient";

type RouteContext = { params: Promise<{ patientId: string }> };

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { patientId } = await context.params;
  const patient = await getPatientById(patientId);
  if (!patient) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(patient);
}
