import apiAxios from "@/lib/api/api-axios";
import type {
  DashboardStats,
  RevenueDataPoint,
  EnrollmentDataPoint,
  AdminOrderListResponse,
} from "@/types/admin/dashboard";

export type OrderListParams = {
  search?:      string;
  status?:      string;
  productType?: string;
  fromDate?:    string;
  toDate?:      string;
  page?:        number;
  limit?:       number;
};

export const adminService = {
  getDashboard: () =>
    apiAxios
      .get<DashboardStats>("/v1/admin/dashboard")
      .then((r) => r.data),

  getRevenueAnalytics: (months = 6) =>
    apiAxios
      .get<RevenueDataPoint[]>("/v1/admin/analytics/revenue", { params: { months } })
      .then((r) => r.data),

  getEnrollmentAnalytics: (months = 6) =>
    apiAxios
      .get<EnrollmentDataPoint[]>("/v1/admin/analytics/enrollments", { params: { months } })
      .then((r) => r.data),

  getOrders: (params?: OrderListParams) =>
    apiAxios
      .get<AdminOrderListResponse>("/v1/admin/orders", { params })
      .then((r) => r.data),

  toggleUserStatus: (userId: string) =>
    apiAxios
      .patch(`/v1/admin/users/${userId}/toggle-status`)
      .then((r) => r.data),
};
