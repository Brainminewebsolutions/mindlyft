"use client";

import { useState, useEffect, useCallback } from "react";
import { webinarService, type WebinarListParams } from "@/services/admin/webinarService";
import type { Webinar } from "@/types/admin/webinar";

export function useWebinars(filters: WebinarListParams = {}) {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetchWebinars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await webinarService.list(filters);
      setWebinars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchWebinars(); }, [fetchWebinars]);

  const deleteWebinar = async (id: string) => {
    await webinarService.delete(id);
    await fetchWebinars();
  };

  return { webinars, loading, error, refetch: fetchWebinars, deleteWebinar };
}
