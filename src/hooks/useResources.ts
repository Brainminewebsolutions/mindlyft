"use client";

import { useState, useEffect, useCallback } from "react";
import { resourceService } from "@/services/admin/resourceService";
import type { Resource } from "@/types/admin/resource";

export function useResources(status?: string) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourceService.list(status);
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resources");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { fetch(); }, [fetch]);

  const deleteResource = async (id: number) => {
    await resourceService.delete(id);
    await fetch();
  };

  return { resources, loading, error, refetch: fetch, deleteResource };
}
