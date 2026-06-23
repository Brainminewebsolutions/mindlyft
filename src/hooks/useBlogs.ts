"use client";

import { useState, useEffect, useCallback } from "react";
import { blogService, type BlogListParams } from "@/services/admin/blogService";
import type { BlogDto } from "@/types/admin/blog";

type Pagination = { total: number; page: number; limit: number; totalPages: number };

export function useBlogs(filters: BlogListParams = {}) {
  const [blogs, setBlogs]           = useState<BlogDto[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogService.list(filters);
      setBlogs(data.blogs);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const deleteBlog = async (id: string) => {
    await blogService.delete(id);
    await fetchBlogs();
  };

  return { blogs, pagination, loading, error, refetch: fetchBlogs, deleteBlog };
}
