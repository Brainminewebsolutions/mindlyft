import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth/types";

const ROLE_PREFIX: Record<string, string> = {
  ADMIN:      "/admin",
  TEACHER:    "/employee",
  ACCOUNTANT: "/employee",
  STAFF:      "/employee",
  EMPLOYEE:   "/employee",
  STUDENT:    "/student",
};

const PROTECTED_PREFIXES: Record<string, string[]> = {
  "/admin":    ["ADMIN"],
  "/employee": ["TEACHER", "ACCOUNTANT", "STAFF", "EMPLOYEE"],
  "/student":  ["STUDENT"],
};

const AUTH_PATHS = ["/login", "/register"];

function getRoleFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const json    = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json) as Record<string, unknown>;
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) return null;
    const raw =
      payload["role"] ??
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (raw == null) return null;
    return String(Array.isArray(raw) ? raw[0] : raw).toUpperCase();
  } catch { return null; }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const role  = token ? getRoleFromToken(token) : null;

  if (AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    if (role) {
      const home = ROLE_PREFIX[role] ?? "/";
      return NextResponse.redirect(new URL(home + "/dashboard", req.url));
    }
    return NextResponse.next();
  }

  for (const [prefix, allowedRoles] of Object.entries(PROTECTED_PREFIXES)) {
    if (pathname.startsWith(prefix)) {
      if (!role) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }
      if (!allowedRoles.includes(role)) {
        const home = ROLE_PREFIX[role] ?? "/";
        return NextResponse.redirect(new URL(home + "/dashboard", req.url));
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/employee/:path*",
    "/student/:path*",
    "/login",
    "/register",
  ],
};
