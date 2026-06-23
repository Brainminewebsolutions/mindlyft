"use client";

import { useState, useEffect, useCallback } from "react";
import { courseChapterService } from "@/services/admin/courseChapterService";
import type { CourseChapter } from "@/types/admin/courseChapter";

export function useCourseChapters(courseId: string) {
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetchChapters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseChapterService.list(courseId);
      setChapters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => { fetchChapters(); }, [fetchChapters]);

  const createChapter = async (data: { title: string; description?: string; order?: number }): Promise<CourseChapter> => {
    const result = await courseChapterService.create(courseId, data);
    await fetchChapters();
    return result;
  };

  const updateChapter = async (id: string, data: { title?: string; description?: string; order?: number }): Promise<CourseChapter> => {
    const result = await courseChapterService.update(courseId, id, data);
    await fetchChapters();
    return result;
  };

  const deleteChapter = async (id: string): Promise<void> => {
    await courseChapterService.delete(courseId, id);
    await fetchChapters();
  };

  return { chapters, loading, error, refetch: fetchChapters, createChapter, updateChapter, deleteChapter };
}
