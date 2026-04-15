import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: true, message: "Webhook receiver stub — implement per provider." },
    { status: 501 },
  );
}
