import { unwrapDotnet, ApiError } from "@/lib/api/dotnet-client";
import type { AuthResponse, RegisterRequest, Role } from "@/lib/auth/types";

// Shape of the `data` field the .NET login endpoint returns
interface DotnetLoginData {
  token: string;
  id:    string;
  name:  string;
  email: string;
}

// .NET uses the long-form ClaimTypes.Role URI in the JWT payload
const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

function extractRoleFromJwt(token: string): Role {
  try {
    const json = Buffer.from(token.split(".")[1], "base64url").toString("utf-8");
    const payload = JSON.parse(json) as Record<string, unknown>;

    const raw = payload["role"] ?? payload[ROLE_CLAIM] ?? "STUDENT";
    const value = Array.isArray(raw) ? raw[0] : raw;
    return String(value).toUpperCase() as Role;
  } catch {
    return "STUDENT";
  }
}

export async function loginWithDotnet(email: string, password: string): Promise<AuthResponse> {
  const data = await unwrapDotnet<DotnetLoginData>("/v1/auth/login", {
    method: "POST",
    body:   JSON.stringify({ email, password }),
  });

  const role = extractRoleFromJwt(data.token);

  return {
    token: data.token,
    user:  { id: data.id, email: data.email, name: data.name, role, phoneNumber: "" },
  };
}

export async function registerWithDotnet(payload: RegisterRequest): Promise<void> {
  await unwrapDotnet<void>("/v1/students/register", {
    method: "POST",
    body:   JSON.stringify({
      name:           payload.name,
      email:          payload.email,
      password:       payload.password,
      phone:          payload.phone          ?? undefined,
      courseInterest: payload.courseInterest ?? undefined,
    }),
  });
}

export { ApiError };
