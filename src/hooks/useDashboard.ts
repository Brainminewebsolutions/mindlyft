"use client";

import { useState, useEffect } from "react";
import { adminService } from "@/services/admin/adminService";
import type {
  DashboardStats,
  RevenueDataPoint,
  EnrollmentDataPoint,
} from "@/types/admin/dashboard";

export function useDashboard(months = 6) {
  const [stats,       setStats]       = useState<DashboardStats | null>(null);
  const [revenue,     setRevenue]     = useState<RevenueDataPoint[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentDataPoint[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      adminService.getDashboard(),
      adminService.getRevenueAnalytics(months),
      adminService.getEnrollmentAnalytics(months),
    ])
      .then(([s, r, e]) => {
        setStats(s);
        setRevenue(r);
        setEnrollments(e);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, [months]);

  return { stats, revenue, enrollments, loading, error };
}
