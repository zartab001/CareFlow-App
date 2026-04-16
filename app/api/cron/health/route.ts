import { NextResponse } from "next/server";

import { env } from "@/config/env";
import { nowIso } from "lib";

export async function GET(request: Request): Promise<NextResponse> {
  const secret = request.headers.get("authorization");
  const expected = env.CRON_SECRET ? `Bearer ${env.CRON_SECRET}` : null;
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, ranAt: nowIso() });
}
