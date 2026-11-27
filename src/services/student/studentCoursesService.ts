import apiAxios from "@/lib/api/api-axios";
import type {
  PurchasedCourse, PlayerChapterItem, LessonProgressResult, CertificateInfo,
} from "@/types/student/course";

export const studentCoursesService = {
  getMyCourses: () =>
    apiAxios.get<PurchasedCourse[]>("/v1/courses/my-courses").then((r) => r.data),

  /** Purchase-checked player data; locked lessons come back with videoUrl = null. */
  getCourseChapters: (courseId: number) =>
    apiAxios
      .get<PlayerChapterItem[]>(`/v1/learning/courses/${courseId}`)
      .then((r) => r.data),

  updateProgress: (courseId: number, contentId: string, watchedPercent: number) =>
    apiAxios
      .post<LessonProgressResult>(
        `/v1/learning/courses/${courseId}/contents/${contentId}/progress`,
        { watchedPercent },
      )
      .then((r) => r.data),

  completeLesson: (courseId: number, contentId: string) =>
    apiAxios
      .post<LessonProgressResult>(`/v1/learning/courses/${courseId}/contents/${contentId}/complete`)
      .then((r) => r.data),

  /** Issues the certificate on first call (course must be fully completed). */
  getCertificate: (courseId: number) =>
    apiAxios
      .get<CertificateInfo>(`/v1/learning/courses/${courseId}/certificate`)
      .then((r) => r.data),

  downloadCertificate: (courseId: number) =>
    apiAxios
      .get<Blob>(`/v1/learning/courses/${courseId}/certificate/download`, { responseType: "blob" })
      .then((r) => r.data),
};
