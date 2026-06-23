import apiAxios from "@/lib/api/api-axios";
import type { CourseContent } from "@/types/admin/courseContent";

export const courseContentService = {
  list: (chapterId: string) =>
    apiAxios
      .get<CourseContent[]>(`/v1/chapters/${chapterId}/contents`)
      .then((r) => r.data),

  create: (chapterId: string, formData: FormData) =>
    apiAxios
      .post<CourseContent>(`/v1/chapters/${chapterId}/contents`, formData)
      .then((r) => r.data),

  update: (chapterId: string, id: string, formData: FormData) =>
    apiAxios
      .patch<CourseContent>(`/v1/chapters/${chapterId}/contents/${id}`, formData)
      .then((r) => r.data),

  delete: (chapterId: string, id: string) =>
    apiAxios
      .delete(`/v1/chapters/${chapterId}/contents/${id}`)
      .then((r) => r.data),
};
