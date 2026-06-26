"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag, Plus, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button }    from "@/components/ui/button";
import { Input }     from "@/components/ui/input";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseCategoryTable } from "@/components/admin/course-categories/CourseCategoryTable";
import { useCourseCategories }  from "@/hooks/useCourseCategories";
import type { CourseCategory } from "@/types/admin/courseCategory";

function DeleteConfirmModal({
  category,
  onConfirm,
  onCancel,
}: {
  category:  CourseCategory;
  onConfirm: () => void;
  onCancel:  () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Category</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{category.name}"</span>?
          This action cannot be undone.
        </p>
        <Separator className="my-4" />
        <div className="flex gap-3">
          <Button variant="outline"     className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" className="flex-1" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCourseCategoriesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { categories, loading, error, deleteCategory } = useCourseCategories();

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const [deleteTarget, setDeleteTarget] = useState<CourseCategory | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteCategory(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Course Categories</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage your course category catalog</p>
        </div>
        <Button onClick={() => router.push("/admin/course-categories/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      {categories.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xs">
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{categories.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">
              {categories.filter((c) => c.status === "Active").length}
            </p>
          </div>
        </div>
      )}

      {/* Table card */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-violet-600 dark:text-violet-400" />
              <CardTitle className="text-sm">All Categories</CardTitle>
              {categories.length > 0 && (
                <Badge variant="secondary" className="text-xs">{categories.length}</Badge>
              )}
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Tag className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No categories yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Create your first category to get started</p>
              <Button className="mt-5" onClick={() => router.push("/admin/course-categories/add")}>
                Create Category
              </Button>
            </div>
          ) : (
            <div className="p-4">
              <CourseCategoryTable
                categories={filtered}
                onEdit={(c) => router.push(`/admin/course-categories/${c.id}/edit`)}
                onDelete={(c) => setDeleteTarget(c)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {deleteTarget && (
        <DeleteConfirmModal
          category={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
