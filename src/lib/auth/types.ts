export type Role = "ADMIN" | "TEACHER" | "ACCOUNTANT" | "STAFF" | "EMPLOYEE" | "STUDENT";

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: Role;
  avatar?: string;
}

export interface Session {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  courseInterest?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const AUTH_COOKIE = "auth_token";
// Non-httpOnly: readable by client-side JS for direct DOTNET axios calls
export const ACCESS_TOKEN_COOKIE = "access_token";

export const ROLE_DASHBOARD: Record<Role, string> = {
  ADMIN:      "/admin/dashboard",
  TEACHER:    "/employee/dashboard",
  ACCOUNTANT: "/employee/dashboard",
  STAFF:      "/employee/dashboard",
  EMPLOYEE:   "/employee/dashboard",
  STUDENT:    "/student/dashboard",
};
