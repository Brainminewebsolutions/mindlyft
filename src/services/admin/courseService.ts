import apiAxios from "@/lib/api/api-axios";
import type { Course } from "@/types/admin/course";

export type CourseListParams = {
  search?:     string;
  mode?:       string;
  status?:     string;
  courseType?: string;
  page?:       number;
  limit?:      number;
};

export type CourseListResponse = {
  courses:    Course[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
};

export const courseService = {
  list: (params?: CourseListParams) =>
    apiAxios
      .get<CourseListResponse>("/v1/courses", { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiAxios
      .get<Course>(`/v1/courses/${id}`)
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios
      .post<Course>("/v1/courses", formData)
      .then((r) => r.data),

  update: (id: string, formData: FormData) =>
    apiAxios
      .patch<Course>(`/v1/courses/${id}`, formData)
      .then((r) => r.data),

  updateStatus: (id: string, status: "ACTIVE" | "INACTIVE") => {
    const fd = new FormData();
    fd.append("status", status);
    return apiAxios
      .patch<Course>(`/v1/courses/${id}`, fd)
      .then((r) => r.data);
  },

  delete: (id: string) =>
    apiAxios
      .delete(`/v1/courses/${id}`)
      .then((r) => r.data),
};
