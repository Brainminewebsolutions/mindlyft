"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, Trash2, Pencil, ExternalLink, Link2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useResources } from "@/hooks/useResources";
import type { Resource } from "@/types/admin/resource";

function DeleteModal({
  resource, onConfirm, onCancel,
}: { resource: Resource; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Resource</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{resource.name}"</span>?
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

const STATUS_COLORS: Record<string, string> = {
  Active:    "bg-emerald-100 text-emerald-700",
  Inactive:  "bg-neutral-100 text-neutral-600",
  Pending:   "bg-amber-100 text-amber-700",
  Suspended: "bg-red-100 text-red-700",
};

export default function AdminResourcesPage() {
  const router = useRouter();
  const { resources, loading, error, deleteResource } = useResources();
  const [deleteTarget, setDeleteTarget] = useState<Resource | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteResource(deleteTarget.id);
    setDeleteTarget(null);
  };

  const activeCount = resources.filter((r) => r.status === "Active").length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Resources</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage downloadable files and links on the resources page</p>
        </div>
        <Button onClick={() => router.push("/admin/resources/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add Resource
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      {resources.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: "Total",  value: resources.length, color: "text-foreground" },
            { label: "Active", value: activeCount,       color: "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-violet-600" />
            <CardTitle className="text-sm">All Resources</CardTitle>
            {resources.length > 0 && (
              <Badge variant="secondary" className="text-xs">{resources.length}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No resources yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Add your first downloadable file or link</p>
              <Button className="mt-5" onClick={() => router.push("/admin/resources/add")}>
                Add Resource
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {resources.map((r) => (
                <div key={r.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">

                  {/* Thumbnail */}
                  <div className="h-12 w-12 shrink-0 rounded-lg border border-border bg-muted overflow-hidden flex items-center justify-center">
                    {r.image
                      ? <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
                      : r.type === "Link"
                        ? <Link2 className="h-5 w-5 text-muted-foreground/40" />
                        : <FileText className="h-5 w-5 text-muted-foreground/40" />
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">{r.name}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                        {r.type === "Link" ? <Link2 className="h-2.5 w-2.5" /> : <Download className="h-2.5 w-2.5" />}
                        {r.type}
                      </span>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[r.status] ?? "bg-neutral-100 text-neutral-600"}`}>
                        {r.status}
                      </span>
                    </div>
                    {r.description && (
                      <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-1">{r.description}</p>
                    )}
                  </div>

                  {/* Order */}
                  <div className="hidden sm:block text-center shrink-0">
                    <p className="text-xs text-muted-foreground">Order</p>
                    <p className="text-sm font-semibold text-foreground">{r.displayOrder}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {r.url && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={r.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/resources/${r.id}/edit`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(r)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {deleteTarget && (
        <DeleteModal
          resource={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
