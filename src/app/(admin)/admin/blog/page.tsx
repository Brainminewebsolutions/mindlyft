"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Newspaper, Plus, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BlogTable } from "@/components/admin/blog/BlogTable";
import { useBlogs } from "@/hooks/useBlogs";
import type { BlogDto } from "@/types/admin/blog";

function DeleteModal({
  blog,
  onConfirm,
  onCancel,
}: {
  blog: BlogDto;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Article</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{blog.title}"</span>? This cannot be undone.
        </p>
        <Separator className="my-4" />
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" className="flex-1" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [search,       setSearch]       = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BlogDto | null>(null);

  const { blogs, loading, error, deleteBlog } = useBlogs({ search, limit: 50 });

  const published = blogs.filter((b) => b.status === "Active").length;
  const drafts    = blogs.filter((b) => b.status === "Pending").length;

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteBlog(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Blog Articles</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage your blog content</p>
        </div>
        <Button onClick={() => router.push("/admin/blog/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Article
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      {blogs.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total",     value: blogs.length, cls: "text-foreground" },
            { label: "Published", value: published,    cls: "text-emerald-600 dark:text-emerald-400" },
            { label: "Drafts",    value: drafts,       cls: "text-amber-600 dark:text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.cls}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <CardTitle className="text-sm">All Articles</CardTitle>
              {blogs.length > 0 && (
                <Badge variant="secondary" className="text-xs">{blogs.length}</Badge>
              )}
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles…"
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
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Newspaper className="mb-3 h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No articles yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Create your first blog article to get started</p>
              <Button className="mt-5" onClick={() => router.push("/admin/blog/add")}>
                Create Article
              </Button>
            </div>
          ) : (
            <div className="p-4">
              <BlogTable
                blogs={blogs}
                onEdit={(b) => router.push(`/admin/blog/${b.id}/edit`)}
                onDelete={(b) => setDeleteTarget(b)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {deleteTarget && (
        <DeleteModal
          blog={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
