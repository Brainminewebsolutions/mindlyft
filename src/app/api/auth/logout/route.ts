import { NextResponse } from "next/server";
import { AUTH_COOKIE, ACCESS_TOKEN_COOKIE } from "@/lib/auth/types";

export async function POST() {
  const res = NextResponse.json({ success: true });
  // path must match what login/route.ts used when setting these cookies —
  // omitting it defaults to this route's own path ("/api/auth/logout"),
  // which doesn't match the "/"-scoped session cookie and silently no-ops.
  res.cookies.delete({ name: AUTH_COOKIE,         path: "/" });
  res.cookies.delete({ name: ACCESS_TOKEN_COOKIE, path: "/" });
  return res;
}
