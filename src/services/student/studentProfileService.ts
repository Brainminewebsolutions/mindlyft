import apiAxios from "@/lib/api/api-axios";
import type { Student } from "@/types/admin/student";

export type UpdateProfileInput = {
  firstName?:      string;
  lastName?:       string;
  phone?:          string;
  courseInterest?: string;
};

export const studentProfileService = {
  get: () =>
    apiAxios.get<Student>("/v1/students/profile").then((r) => r.data),

  update: (data: UpdateProfileInput) =>
    apiAxios.patch<Student>("/v1/students/profile", data).then((r) => r.data),
};
