"use client";

import { useState, useEffect, useCallback } from "react";
import { courseService, type CourseListParams } from "@/services/admin/courseService";
import type { Course } from "@/types/admin/course";

type Pagination = {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
};

export function useCourses(filters: CourseListParams = {}) {
  const [courses,    setCourses]    = useState<Course[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.list(filters);
      setCourses(data.courses);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const deleteCourse = async (id: string) => {
    await courseService.delete(id);
    await fetchCourses();
  };

  const toggleCourseStatus = async (course: Course) => {
    const nextStatus = course.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await courseService.updateStatus(course.id, nextStatus);
    await fetchCourses();
  };

  return { courses, pagination, loading, error, refetch: fetchCourses, deleteCourse, toggleCourseStatus };
}
