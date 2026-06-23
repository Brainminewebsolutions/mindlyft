"use client";

import { useState } from "react";
import { Search, RefreshCw, CalendarCheck } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { Button }  from "@/components/ui/button";
import { Input }   from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import type { AdminOrder } from "@/types/admin/dashboard";

function formatCurrency(n: number) {
  if (n === 0) return "Free";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

const TYPE_STYLES: Record<string, string> = {
  Workshop: "bg-blue-50 text-blue-700",
  Webinar:  "bg-violet-50 text-violet-700",
};

const STATUS_COLORS: Record<string, string> = {
  PAID:    "border-emerald-500/30 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-500/30 bg-amber-50 text-amber-700",
  FAILED:  "border-red-500/30 bg-red-50 text-red-700",
};

type TabType = "Workshop" | "Webinar";

export default function WebinarRegistrationsPage() {
  const [search, setSearch] = useState("");
  const [tab,    setTab]    = useState<TabType>("Workshop");
  const [page,   setPage]   = useState(1);

  const { orders, pagination, loading, error, refetch } = useOrders({
    search,
    productType: tab,
    page,
    limit: 15,
  });

  const tabs: TabType[] = ["Workshop", "Webinar"];

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Registrations</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Students registered for workshops &amp; webinars
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refetch}>
          <RefreshCw className={`mr-2 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Registrations", value: pagination?.total ?? 0,                          color: "text-foreground"  },
          { label: "Free (this page)",    value: orders.filter(o => o.amount === 0).length,       color: "text-blue-600"    },
          { label: "Paid (this page)",    value: orders.filter(o => o.amount > 0).length,         color: "text-emerald-600" },
          { label: "Confirmed",           value: orders.filter(o => o.status === "PAID").length,  color: "text-violet-600"  },
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

      {/* Tabs + Search */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type tabs */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPage(1); }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-52 flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search student or event name…"
            className="pl-9"
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
      {loading ? <TableSkeleton /> : <RegistrationsTable orders={orders} />}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Showing {(page - 1) * 15 + 1}–{Math.min(page * 15, pagination.total)} of {pagination.total}
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

function RegistrationsTable({ orders }: { orders: AdminOrder[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-14 text-center">
        <CalendarCheck className="mb-3 size-8 text-muted-foreground/40" />
        <p className="font-medium text-muted-foreground">No registrations found</p>
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
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Event</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Registered On</th>
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
                <td className="px-4 py-3 max-w-[200px]">
                  <p className="text-foreground text-xs font-medium truncate">{order.product.name}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                    TYPE_STYLES[order.product.type] ?? "bg-gray-50 text-gray-600"
                  }`}>
                    {order.product.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-xs font-semibold ${order.amount === 0 ? "text-emerald-600" : "text-foreground"}`}>
                    {formatCurrency(order.amount)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] ?? ""}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(order.createdAt)}
                </td>
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
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-border/60 bg-background px-4 py-3">
          <div className="h-3 w-8 animate-pulse rounded bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            <div className="h-2.5 w-48 animate-pulse rounded bg-muted/60" />
          </div>
          <div className="h-3 w-36 animate-pulse rounded bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-12 animate-pulse rounded bg-muted" />
          <div className="h-5 w-14 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
