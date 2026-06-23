import apiAxios from "@/lib/api/api-axios";
import type { Employee } from "@/types/admin/employee";

export type UpdateEmployeeProfileInput = {
  name?:        string;
  phone?:       string;
  designation?: string;
  department?:  string;
  description?: string;
};

export const employeeProfileService = {
  get: () =>
    apiAxios.get<Employee>("/v1/employees/profile").then((r) => r.data),

  update: (data: UpdateEmployeeProfileInput) =>
    apiAxios.patch<Employee>("/v1/employees/profile", data).then((r) => r.data),
};
