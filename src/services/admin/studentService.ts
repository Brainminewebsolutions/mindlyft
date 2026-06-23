import apiAxios from "@/lib/api/api-axios";
import type { Student, UpdateStudentInput } from "@/types/admin/student";

export type StudentListParams = {
  search?: string;
  status?: string;
  page?:   number;
  limit?:  number;
};

export type StudentListResponse = {
  students:   Student[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
};

export const studentService = {
  list: (params?: StudentListParams) =>
    apiAxios
      .get<StudentListResponse>("/v1/students", { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiAxios
      .get<Student>(`/v1/students/${id}`)
      .then((r) => r.data),

  update: (id: string, data: UpdateStudentInput) =>
    apiAxios
      .patch<Student>(`/v1/students/${id}`, data)
      .then((r) => r.data),

  delete: (id: string) =>
    apiAxios
      .delete(`/v1/students/${id}`)
      .then((r) => r.data),
};
