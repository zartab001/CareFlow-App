import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: false, message: "Upload handler stub — wire storage + auth." },
    { status: 501 },
  );
}
