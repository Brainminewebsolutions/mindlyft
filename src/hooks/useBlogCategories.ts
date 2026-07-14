"use client";

import { useState, useEffect, useCallback } from "react";
import { blogCategoryService } from "@/services/admin/blogService";
import type { BlogCategoryDto } from "@/types/admin/blog";

export function useBlogCategories(status?: string) {
  const [categories, setCategories] = useState<BlogCategoryDto[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogCategoryService.list(status);
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const deleteCategory = async (id: string) => {
    await blogCategoryService.delete(id);
    await fetchCategories();
  };

  return { categories, loading, error, refetch: fetchCategories, deleteCategory };
}
