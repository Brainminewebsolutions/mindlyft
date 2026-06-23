"use client";

import {
  Users, GraduationCap, BookOpen, IndianRupee,
  TrendingUp, ShoppingCart, Clock, RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/hooks/useDashboard";
import { useState } from "react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_COLORS: Record<string, string> = {
  PAID:    "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  PENDING: "border-amber-500/30 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  FAILED:  "border-red-500/30 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

export default function AdminDashboardPage() {
  const [months, setMonths] = useState(6);
  const { stats, revenue, enrollments, loading, error } = useDashboard(months);

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-6 py-4 text-center">
          <p className="font-medium text-destructive">Failed to load dashboard</p>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const topStats = [
    {
      label: "Total Students",
      value: stats?.totalStudents ?? 0,
      sub:   `${stats?.activeStudents ?? 0} active`,
      icon:  GraduationCap,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Employees",
      value: stats?.totalEmployees ?? 0,
      sub:   "team members",
      icon:  Users,
      color: "text-primary",
    },
    {
      label: "Courses",
      value: stats?.totalCourses ?? 0,
      sub:   `${stats?.activeCourses ?? 0} active`,
      icon:  BookOpen,
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue ?? 0),
      sub:   `${stats?.totalOrders ?? 0} orders`,
      icon:  IndianRupee,
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Welcome back, Admin</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening on your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
            <option value={12}>Last 12 months</option>
          </select>
          <Badge variant="outline" className="gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            System Online
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {topStats.map(({ label, value, sub, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{label}</CardDescription>
                <Icon className={`size-4 ${color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Total Orders",   value: stats?.totalOrders   ?? 0, color: "text-foreground"                         },
          { label: "Pending Orders", value: stats?.pendingOrders  ?? 0, color: "text-amber-600 dark:text-amber-400"     },
          { label: "Paid Orders",    value: (stats?.totalOrders ?? 0) - (stats?.pendingOrders ?? 0), color: "text-emerald-600 dark:text-emerald-400" },
        ].map((p) => (
          <div key={p.label} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5">
            <ShoppingCart className="size-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{p.label}:</span>
            <span className={`text-sm font-semibold ${p.color}`}>{p.value}</span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Revenue Chart */}
        <Card>
          <CardHeader className="border-b pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-sm">Revenue (INR)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {revenue.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenue} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="fill-muted-foreground"
                  />
                  <Tooltip
                    formatter={(v) => [formatCurrency(Number(v ?? 0)), "Revenue"]}
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
                No revenue data yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enrollments Chart */}
        <Card>
          <CardHeader className="border-b pb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-emerald-600 dark:text-emerald-400" />
              <CardTitle className="text-sm">Enrollments</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {enrollments.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={enrollments} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="fill-muted-foreground"
                  />
                  <Tooltip
                    formatter={(v) => [Number(v ?? 0), "Enrollments"]}
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#enrollGrad)"
                    dot={{ r: 3, fill: "#10b981" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
                No enrollment data yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <CardTitle className="text-sm">Recent Orders</CardTitle>
            </div>
            <a href="/admin/orders" className="flex items-center gap-1 text-xs text-primary hover:underline">
              View all <ArrowUpRight className="size-3" />
            </a>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {(stats?.recentOrders?.length ?? 0) === 0 ? (
            <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
              No orders yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Student</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Product</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{order.studentName}</p>
                        <p className="text-xs text-muted-foreground">{order.studentEmail}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mr-1.5 ${
                          order.product.type === "Course"
                            ? "bg-violet-50 text-violet-600"
                            : "bg-blue-50 text-blue-600"
                        }`}>
                          {order.product.type}
                        </span>
                        <span className="text-muted-foreground">{order.product.name}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] ?? ""}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Employees", href: "/admin/employees", icon: Users,         color: "text-primary" },
            { label: "Students",  href: "/admin/students",  icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Courses",   href: "/admin/courses",   icon: BookOpen,      color: "text-violet-600 dark:text-violet-400"  },
            { label: "Orders",    href: "/admin/orders",    icon: ShoppingCart,  color: "text-amber-600 dark:text-amber-400"    },
          ].map(({ label, href, icon: Icon, color }) => (
            <a key={href} href={href}>
              <Card className="flex flex-col items-center justify-center gap-2 py-5 text-center transition hover:ring-1 hover:ring-primary/30">
                <Icon className={`size-5 ${color}`} />
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </Card>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-5 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted/60" />
        </div>
        <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-7 w-20 animate-pulse rounded bg-muted" />
            <div className="h-2.5 w-16 animate-pulse rounded bg-muted/60" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <div className="h-4 w-32 animate-pulse rounded bg-muted mb-4" />
            <div className="h-[220px] animate-pulse rounded bg-muted/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
