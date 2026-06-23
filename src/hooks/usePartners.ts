"use client";

import { useState, useEffect, useCallback } from "react";
import { partnerService } from "@/services/admin/partnerService";
import type { Partner } from "@/types/admin/partner";

export function usePartners(status?: string) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await partnerService.list(status);
      setPartners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load partners");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { fetch(); }, [fetch]);

  const deletePartner = async (id: number) => {
    await partnerService.delete(id);
    await fetch();
  };

  return { partners, loading, error, refetch: fetch, deletePartner };
}
