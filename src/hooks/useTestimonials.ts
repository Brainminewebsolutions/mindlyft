"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonialService, type TestimonialListParams } from "@/services/admin/testimonialService";
import type { Testimonial } from "@/types/admin/testimonial";

type Pagination = {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
};

export function useTestimonials(filters: TestimonialListParams = {}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pagination,   setPagination]   = useState<Pagination | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await testimonialService.list(filters);
      setTestimonials(data.testimonials);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const deleteTestimonial = async (id: number) => {
    await testimonialService.delete(id);
    await fetchTestimonials();
  };

  return {
    testimonials,
    pagination,
    loading,
    error,
    refetch:           fetchTestimonials,
    deleteTestimonial,
  };
}
