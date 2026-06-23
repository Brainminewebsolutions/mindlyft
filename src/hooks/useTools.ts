"use client";

import { useState, useEffect, useCallback } from "react";
import { toolService } from "@/services/admin/toolService";
import type { Tool } from "@/types/admin/tool";

export function useTools(status?: string) {
  const [tools,   setTools]   = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetchTools = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await toolService.list(status);
      setTools(Array.isArray(data) ? data : (data as { data: Tool[] }).data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { fetchTools(); }, [fetchTools]);

  const deleteTool = async (id: string) => {
    await toolService.delete(id);
    await fetchTools();
  };

  return { tools, loading, error, refetch: fetchTools, deleteTool };
}
