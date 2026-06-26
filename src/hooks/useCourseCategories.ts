"use client";

import { useState, useEffect, useCallback } from "react";
import { courseCategoryService } from "@/services/admin/courseCategoryService";
import type { CourseCategory } from "@/types/admin/courseCategory";

export function useCourseCategories(filters: { status?: string } = {}) {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseCategoryService.list(filters);
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const deleteCategory = async (id: number) => {
    await courseCategoryService.delete(id);
    await fetchCategories();
  };

  return { categories, loading, error, refetch: fetchCategories, deleteCategory };
}
