import authAxios from "@/lib/api/auth-axios";
import type { RegisterRequest } from "@/lib/auth/types";

export async function loginUser(email: string, password: string): Promise<{ role: string }> {
  const { data } = await authAxios.post<{ role: string }>("/login", { email, password });
  return data;
}

export async function registerUser(payload: RegisterRequest): Promise<void> {
  await authAxios.post("/register", payload);
}
