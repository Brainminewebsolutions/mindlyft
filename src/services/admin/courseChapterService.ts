import apiAxios from "@/lib/api/api-axios";
import type { CourseChapter } from "@/types/admin/courseChapter";

export const courseChapterService = {
  list: (courseId: string) =>
    apiAxios
      .get<CourseChapter[]>(`/v1/courses/${courseId}/chapters`)
      .then((r) => r.data),

  create: (courseId: string, data: { title: string; description?: string; order?: number }) =>
    apiAxios
      .post<CourseChapter>(`/v1/courses/${courseId}/chapters`, data)
      .then((r) => r.data),

  update: (courseId: string, id: string, data: { title?: string; description?: string; order?: number }) =>
    apiAxios
      .patch<CourseChapter>(`/v1/courses/${courseId}/chapters/${id}`, data)
      .then((r) => r.data),

  delete: (courseId: string, id: string) =>
    apiAxios
      .delete(`/v1/courses/${courseId}/chapters/${id}`)
      .then((r) => r.data),
};
