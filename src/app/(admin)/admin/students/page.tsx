"use client";

import { useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { useStudents }          from "@/hooks/useStudents";
import { StudentTable }         from "@/components/admin/students/StudentTable";
import { StudentDeleteModal }   from "@/components/admin/students/StudentDeleteModal";
import { StudentEditModal }     from "@/components/admin/students/StudentEditModal";
import { Button }  from "@/components/ui/button";
import { Input }   from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import type { Student } from "@/types/admin/student";

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page,   setPage]   = useState(1);

  const {
    students, pagination, loading, error,
    refetch, updateStudent, deleteStudent,
  } = useStudents({ search, status, page, limit: 10 });

  /* ── Delete state ── */
  const [deleteOpen,    setDeleteOpen]    = useState(false);
  const [deleteTarget,  setDeleteTarget]  = useState<Student | null>(null);
  const [deleting,      setDeleting]      = useState(false);

  const openDelete = (s: Student) => { setDeleteTarget(s); setDeleteOpen(true); };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteStudent(deleteTarget.id);
      setDeleteOpen(false);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  /* ── Edit state ── */
  const [editOpen,   setEditOpen]   = useState(false);
  const [editTarget, setEditTarget] = useState<Student | null>(null);
  const [saving,     setSaving]     = useState(false);

  const openEdit = (s: Student) => { setEditTarget(s); setEditOpen(true); };
  const handleSave = async (id: string, data: Parameters<typeof updateStudent>[1]) => {
    setSaving(true);
    try {
      await updateStudent(id, data);
      setEditOpen(false);
      setEditTarget(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Students</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage registered students, update status and course interests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total",     value: pagination?.total ?? 0,                                   color: "text-foreground"                        },
          { label: "Active",    value: students.filter((s) => s.status === "ACTIVE").length,     color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Inactive",  value: students.filter((s) => s.status === "INACTIVE").length,   color: "text-muted-foreground"                  },
          { label: "Suspended", value: students.filter((s) => s.status === "SUSPENDED").length,  color: "text-destructive"                       },
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
        <StudentTable
          students={students}
          onEdit={openEdit}
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

      {/* Modals */}
      <StudentEditModal
        student={editTarget}
        isOpen={editOpen}
        isLoading={saving}
        onClose={() => { setEditOpen(false); setEditTarget(null); }}
        onSave={handleSave}
      />

      <StudentDeleteModal
        student={deleteTarget}
        isOpen={deleteOpen}
        isLoading={deleting}
        onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
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
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
