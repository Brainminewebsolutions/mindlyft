"use client";

import { useState, useEffect, useCallback } from "react";
import { adminService, type OrderListParams } from "@/services/admin/adminService";
import type { AdminOrder } from "@/types/admin/dashboard";

type Pagination = {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
};

export function useOrders(filters: OrderListParams = {}) {
  const [orders,     setOrders]     = useState<AdminOrder[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.getOrders(filters);
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  return { orders, pagination, loading, error, refetch: fetchOrders };
}
