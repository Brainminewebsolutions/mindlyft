import apiAxios from "@/lib/api/api-axios";
import type { Employee } from "@/types/admin/employee";

export type EmployeeListParams = {
  search?:     string;
  status?:     string;
  department?: string;
  category?:   string;
  page?:       number;
  limit?:      number;
};

export type EmployeeListResponse = {
  employees:  Employee[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
};

export const employeeService = {
  list: (params?: EmployeeListParams) =>
    apiAxios
      .get<EmployeeListResponse>("/v1/employees", { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiAxios
      .get<Employee>(`/v1/employees/${id}`)
      .then((r) => r.data),

  create: (data: FormData) =>
    apiAxios
      .post<Employee>("/v1/employees", data)
      .then((r) => r.data),

  update: (id: string, data: FormData) =>
    apiAxios
      .patch<Employee>(`/v1/employees/${id}`, data)
      .then((r) => r.data),

  delete: (id: string) =>
    apiAxios
      .delete(`/v1/employees/${id}`)
      .then((r) => r.data),
};
