"use client";

import { useState, useEffect, useCallback } from "react";
import { courseContentService } from "@/services/admin/courseContentService";
import type { CourseContent } from "@/types/admin/courseContent";

export function useCourseContent(chapterId: string) {
  const [contents, setContents] = useState<CourseContent[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetchContents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseContentService.list(chapterId);
      setContents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => { fetchContents(); }, [fetchContents]);

  const createContent = async (formData: FormData): Promise<CourseContent> => {
    const data = await courseContentService.create(chapterId, formData);
    await fetchContents();
    return data;
  };

  const updateContent = async (id: string, formData: FormData): Promise<CourseContent> => {
    const data = await courseContentService.update(chapterId, id, formData);
    await fetchContents();
    return data;
  };

  const deleteContent = async (id: string): Promise<void> => {
    await courseContentService.delete(chapterId, id);
    await fetchContents();
  };

  return { contents, loading, error, refetch: fetchContents, createContent, updateContent, deleteContent };
}
