import apiAxios from "@/lib/api/api-axios";
import type { PurchasedCourse, CourseChapterItem } from "@/types/student/course";

export const studentCoursesService = {
  getMyCourses: () =>
    apiAxios.get<PurchasedCourse[]>("/v1/courses/my-courses").then((r) => r.data),

  getCourseChapters: (courseId: number) =>
    apiAxios
      .get<CourseChapterItem[]>(`/v1/courses/${courseId}/chapters-with-contents`)
      .then((r) => r.data),
};
