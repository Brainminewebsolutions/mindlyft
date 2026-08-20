"use client";

import { useState, useEffect, useCallback } from "react";
import { ourJourneyService } from "@/services/admin/ourJourneyService";
import type { OurJourney } from "@/types/admin/ourJourney";

export function useOurJourney(type?: string, status?: string) {
  const [entries, setEntries] = useState<OurJourney[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ourJourneyService.list(type, status);
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Our Journey entries");
    } finally {
      setLoading(false);
    }
  }, [type, status]);

  useEffect(() => { fetch(); }, [fetch]);

  const deleteEntry = async (id: string) => {
    await ourJourneyService.delete(id);
    await fetch();
  };

  return { entries, loading, error, refetch: fetch, deleteEntry };
}
