import apiAxios from "@/lib/api/api-axios";
import type { CourseCategory } from "@/types/admin/courseCategory";

export type CourseCategoryListResponse = {
  categories: CourseCategory[];
};

export const courseCategoryService = {
  list: (params?: { status?: string }) =>
    apiAxios
      .get<CourseCategory[]>("/v1/course-categories", { params })
      .then((r) => r.data),

  getById: (id: number) =>
    apiAxios
      .get<CourseCategory>(`/v1/course-categories/${id}`)
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios
      .post<CourseCategory>("/v1/course-categories", formData)
      .then((r) => r.data),

  update: (id: number, formData: FormData) =>
    apiAxios
      .patch<CourseCategory>(`/v1/course-categories/${id}`, formData)
      .then((r) => r.data),

  delete: (id: number) =>
    apiAxios
      .delete(`/v1/course-categories/${id}`)
      .then((r) => r.data),
};
