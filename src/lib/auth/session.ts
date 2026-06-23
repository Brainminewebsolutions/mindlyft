import { cookies } from "next/headers";
import type { Session } from "./types";
import { AUTH_COOKIE } from "./types";

interface JwtPayload {
  sub?: string;
  id?: string;
  email: string;
  MobilePhone:string;
  exp?: number;
  [key: string]: unknown;
}

// .NET may emit role as the short form or the full ClaimTypes URI
const ROLE_CLAIMS = [
  "role",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
];

// .NET maps ClaimTypes.Name → "unique_name" or the full URI
const NAME_CLAIMS = [
  "name",
  "unique_name",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
];

const MOBILE_PHONE_CLAIMS = [
  "mobile_phone",
  "MobilePhone",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone",
];

function pickClaim(payload: JwtPayload, keys: string[]): string {
  for (const k of keys) {
    const v = payload[k];
    if (v != null) return Array.isArray(v) ? String(v[0]) : String(v);
  }
  return "";
}

function decodeJwtPayload(token: string): JwtPayload {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed JWT");
  const json = Buffer.from(parts[1], "base64url").toString("utf-8");
  return JSON.parse(json) as JwtPayload;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = decodeJwtPayload(token);

    if (payload.exp && payload.exp * 1000 < Date.now()) return null;

    const role = pickClaim(payload, ROLE_CLAIMS).toUpperCase();
    if (!role) return null;

    return {
      user: {
        id:    String(payload.sub ?? payload.id ?? ""),
        email: payload.email,
        phoneNumber: pickClaim(payload, MOBILE_PHONE_CLAIMS) || payload.MobilePhone || "",
        name:  pickClaim(payload, NAME_CLAIMS),
        role:  role as Session["user"]["role"],
      },
      token,
    };
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new Error("Unauthenticated");
  return session;
}
