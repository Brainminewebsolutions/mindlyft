import { NextResponse } from "next/server";
import { AUTH_COOKIE, ACCESS_TOKEN_COOKIE } from "@/lib/auth/types";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(AUTH_COOKIE);
  res.cookies.delete(ACCESS_TOKEN_COOKIE);
  return res;
}
