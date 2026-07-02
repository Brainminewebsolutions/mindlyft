export type ProductType = "Course" | "Workshop" | "Webinar";

export type OrderProduct = {
  id:   number;
  name: string;
  type: ProductType;
};

export type RecentOrder = {
  id:           number;
  studentName:  string;
  studentEmail: string;
  product:      OrderProduct;
  amount:       number;
  status:       string;
  createdAt:    string;
};

export type DashboardStats = {
  totalStudents:  number;
  activeStudents: number;
  totalEmployees: number;
  totalCourses:   number;
  activeCourses:  number;
  totalRevenue:   number;
  totalOrders:    number;
  pendingOrders:  number;
  recentOrders:   RecentOrder[];
};

export type RevenueDataPoint = {
  month:   string;
  revenue: number;
  orders:  number;
};

export type EnrollmentDataPoint = {
  month:       string;
  enrollments: number;
};

export type AdminOrder = {
  id:                number;
  studentName:       string;
  studentEmail:      string;
  studentPhone:      string | null;
  product:           OrderProduct;
  amount:            number;
  gstAmount:         number;
  currency:          string;
  status:            string;
  razorpayOrderId:   string;
  razorpayPaymentId: string | null;
  createdAt:         string;
};

export type AdminOrderListResponse = {
  orders:     AdminOrder[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
};
