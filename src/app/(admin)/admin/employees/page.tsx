"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Search, RefreshCw } from "lucide-react";
import { useEmployees }         from "@/hooks/useEmployees";
import { EmployeeTable }        from "@/components/admin/employees/EmployeeTable";
import { DeleteConfirmModal }   from "@/components/admin/employees/DeleteConfirmModal";
import { Button }  from "@/components/ui/button";
import { Input }   from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import type { Employee } from "@/types/admin/employee";

const DEPARTMENTS = ["Engineering", "Design", "Marketing", "Content", "Sales", "Support"];

export default function EmployeesPage() {
  const router = useRouter();

  const [search,     setSearch]     = useState("");
  const [status,     setStatus]     = useState("");
  const [department, setDepartment] = useState("");
  const [page,       setPage]       = useState(1);

  const {
    employees, pagination, loading, error,
    refetch, deleteEmployee,
  } = useEmployees({ search, status, department, page, limit: 10 });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected,   setSelected]   = useState<Employee | null>(null);
  const [deleting,   setDeleting]   = useState(false);

  const openDelete = (emp: Employee) => {
    setSelected(emp);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await deleteEmployee(selected.id);
      toast.success(`"${selected.name}" deleted.`);
      setDeleteOpen(false);
      setSelected(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete employee.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Employees</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage employee accounts and permissions
          </p>
        </div>
        <Button onClick={() => router.push("/admin/employees/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total",     value: pagination?.total ?? 0,                                   color: "text-foreground"                        },
          { label: "Active",    value: employees.filter(e => e.status === "ACTIVE").length,       color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Inactive",  value: employees.filter(e => e.status === "INACTIVE").length,     color: "text-muted-foreground"                  },
          { label: "Suspended", value: employees.filter(e => e.status === "SUSPENDED").length,    color: "text-destructive"                       },
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
            placeholder="Search name or email..."
            className="pl-9"
          />
        </div>

        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        <select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

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
      {loading ? <TableSkeleton /> : (
        <EmployeeTable
          employees={employees}
          onEdit={(emp) => router.push(`/admin/employees/${emp.id}/edit`)}
          onDelete={openDelete}
        />
      )}

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

      {/* Delete confirmation */}
      <DeleteConfirmModal
        employee={selected}
        isOpen={deleteOpen}
        isLoading={deleting}
        onClose={() => { setDeleteOpen(false); setSelected(null); }}
        onConfirm={handleDelete}
      />
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
          <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            <div className="h-2.5 w-48 animate-pulse rounded bg-muted/60" />
          </div>
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
