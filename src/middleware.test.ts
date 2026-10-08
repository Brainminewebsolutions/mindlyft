import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";
import { AUTH_COOKIE } from "@/lib/auth/types";

const ORIGIN = "https://example.test";
const HOUR = 60 * 60;

function makeToken(payload: Record<string, unknown>): string {
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "HS256", typ: "JWT" })}.${encode(payload)}.signature`;
}

function tokenFor(role: string, expiresInSeconds = HOUR): string {
  return makeToken({ role, exp: Math.floor(Date.now() / 1000) + expiresInSeconds });
}

function visit(path: string, token?: string) {
  const headers = token ? { cookie: `${AUTH_COOKIE}=${token}` } : undefined;
  return middleware(new NextRequest(`${ORIGIN}${path}`, { headers }));
}

// A redirect carries a Location header; a pass-through (NextResponse.next()) does not.
function redirectTarget(res: Response): string | null {
  const location = res.headers.get("location");
  if (!location) return null;
  const url = new URL(location);
  return url.pathname + url.search;
}

describe("middleware — signed-out visitors", () => {
  it("lets them browse the public site", () => {
    expect(redirectTarget(visit("/courses"))).toBeNull();
  });

  it("lets them open the login page", () => {
    expect(redirectTarget(visit("/login"))).toBeNull();
  });

  it.each(["/admin/dashboard", "/employee/support", "/student/courses"])(
    "sends them to login from %s, remembering where they were going",
    (path) => {
      expect(redirectTarget(visit(path))).toBe(`/login?from=${encodeURIComponent(path)}`);
    },
  );
});

describe("middleware — signed-in users", () => {
  it("lets each role into its own area", () => {
    expect(redirectTarget(visit("/admin/dashboard", tokenFor("ADMIN")))).toBeNull();
    expect(redirectTarget(visit("/employee/support", tokenFor("TEACHER")))).toBeNull();
    expect(redirectTarget(visit("/student/courses", tokenFor("STUDENT")))).toBeNull();
  });

  it("sends a student away from the admin area to their own dashboard", () => {
    expect(redirectTarget(visit("/admin/dashboard", tokenFor("STUDENT")))).toBe("/student/courses");
  });

  it("sends an employee away from the student area to their own dashboard", () => {
    expect(redirectTarget(visit("/student/courses", tokenFor("STAFF")))).toBe("/employee/support");
  });

  it("sends them from the login page to their dashboard", () => {
    expect(redirectTarget(visit("/login", tokenFor("STUDENT")))).toBe("/student/courses");
  });

  it("keeps admins out of the public site", () => {
    expect(redirectTarget(visit("/courses", tokenFor("ADMIN")))).toBe("/admin/dashboard");
  });

  it("lets students browse the public site", () => {
    expect(redirectTarget(visit("/courses", tokenFor("STUDENT")))).toBeNull();
  });

  it("reads the role from the .NET claim URI and ignores its casing", () => {
    const token = makeToken({
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Admin",
      exp: Math.floor(Date.now() / 1000) + HOUR,
    });
    expect(redirectTarget(visit("/admin/dashboard", token))).toBeNull();
  });
});

describe("middleware — invalid tokens", () => {
  it("treats an expired token as signed out", () => {
    const expired = tokenFor("ADMIN", -HOUR);
    expect(redirectTarget(visit("/admin/dashboard", expired))).toBe("/login?from=%2Fadmin%2Fdashboard");
  });

  it("treats a malformed token as signed out", () => {
    expect(redirectTarget(visit("/student/courses", "not-a-jwt"))).toBe("/login?from=%2Fstudent%2Fcourses");
  });
});
