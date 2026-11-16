"use client";

import { useState } from "react";
import { Search, RefreshCw, ShoppingCart } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { Button }  from "@/components/ui/button";
import { Input }   from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import type { AdminOrder } from "@/types/admin/dashboard";

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
  DUPLICATE: "border-orange-500/30 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
};

// Format using local date parts — d.toISOString() converts to UTC first,
// which shifts the date backwards for any timezone ahead of UTC (e.g. IST).
function toDateInputValue(d: Date) {
  const y   = d.getFullYear();
  const m   = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function firstDayOfThisMonth() {
  const d = new Date();
  return toDateInputValue(new Date(d.getFullYear(), d.getMonth(), 1));
}

function lastDayOfThisMonth() {
  const d = new Date();
  return toDateInputValue(new Date(d.getFullYear(), d.getMonth() + 1, 0));
}

export default function OrdersPage() {
  const [search,   setSearch]   = useState("");
  const [status,   setStatus]   = useState("");
  const [fromDate, setFromDate] = useState(firstDayOfThisMonth);
  const [toDate,   setToDate]   = useState(lastDayOfThisMonth);
  const [page,     setPage]     = useState(1);

  const { orders, pagination, loading, error, refetch } = useOrders({
    search, status, fromDate, toDate, page, limit: 10,
  });

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Orders</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            View and manage all payment orders
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refetch}>
          <RefreshCw className={`mr-2 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total",   value: pagination?.total ?? 0,                              color: "text-foreground"                         },
          { label: "Paid",    value: orders.filter(o => o.status === "PAID").length,    color: "text-emerald-600 dark:text-emerald-400"  },
          { label: "Pending", value: orders.filter(o => o.status === "PENDING").length, color: "text-amber-600 dark:text-amber-400"       },
          { label: "Failed",  value: orders.filter(o => o.status === "FAILED").length,  color: "text-destructive"                         },
        ].map((s) => (
          <Card key={s.label} size="sm">
            <CardHeader className="pb-1">
              <CardDescription>{s.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`text-xl font-semibold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-48 flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search student or course..."
            className="pl-9"
          />
        </div>

        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="">All Status</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="DUPLICATE">Duplicate (refund needed)</option>
        </select>

        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            value={fromDate}
            max={toDate}
            onChange={(e) => { setFromDate(e.target.value); setPage(1); }}
            className="h-9 w-[145px] text-sm"
            aria-label="From date"
          />
          <span className="text-xs text-muted-foreground">to</span>
          <Input
            type="date"
            value={toDate}
            min={fromDate}
            onChange={(e) => { setToDate(e.target.value); setPage(1); }}
            className="h-9 w-[145px] text-sm"
            aria-label="To date"
          />
        </div>

        <Button variant="outline" size="icon" onClick={refetch} aria-label="Refresh">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? <TableSkeleton /> : <OrdersTable orders={orders} />}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total}
          </p>
          <div className="flex items-center gap-1">
            <PaginationBtn label="← Prev" onClick={() => setPage((p) => p - 1)} disabled={page === 1} />
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
              .map((p, i, arr) => (
                <span key={p}>
                  {i > 0 && arr[i - 1] !== p - 1 && (
                    <span className="px-1 text-muted-foreground">…</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={`rounded-md border px-3 py-1.5 text-xs transition ${
                      p === page
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <PaginationBtn label="Next →" onClick={() => setPage((p) => p + 1)} disabled={page === pagination.totalPages} />
          </div>
        </div>
      )}

    </div>
  );
}

function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-14 text-center">
        <ShoppingCart className="mb-3 size-8 text-muted-foreground/40" />
        <p className="font-medium text-muted-foreground">No orders found</p>
        <p className="mt-1 text-sm text-muted-foreground/60">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Product</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground hidden sm:table-cell">GST</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">Razorpay ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border/40 bg-background last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">#{order.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{order.studentName}</p>
                  <p className="text-xs text-muted-foreground">{order.studentEmail}</p>
                  {order.studentPhone && (
                    <p className="text-xs text-muted-foreground">{order.studentPhone}</p>
                  )}
                </td>
                <td className="px-4 py-3 max-w-[180px]">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mb-1 ${
                    order.product.type === "Course"
                      ? "bg-violet-50 text-violet-600"
                      : "bg-blue-50 text-blue-600"
                  }`}>
                    {order.product.type}
                  </span>
                  <p className="text-muted-foreground text-xs truncate">{order.product.name}</p>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-foreground">
                  {formatCurrency(order.amount)}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">
                  {formatCurrency(order.gstAmount)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] ?? ""}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-muted-foreground">{order.razorpayOrderId}</span>
                  {order.razorpayPaymentId && (
                    <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{order.razorpayPaymentId}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaginationBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="border-b border-border bg-muted/40 px-4 py-3" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-border/60 bg-background px-4 py-3">
          <div className="h-3 w-10 animate-pulse rounded bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            <div className="h-2.5 w-48 animate-pulse rounded bg-muted/60" />
          </div>
          <div className="h-3 w-28 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          <div className="h-5 w-14 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
