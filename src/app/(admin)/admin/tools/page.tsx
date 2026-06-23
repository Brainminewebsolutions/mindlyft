"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wrench, Plus, Pencil, Trash2, ArrowUp, ArrowDown, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTools }  from "@/hooks/useTools";
import { toolService } from "@/services/admin/toolService";
import type { Tool } from "@/types/admin/tool";

// ─── Delete confirm modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({
  tool,
  onConfirm,
  onCancel,
}: {
  tool:      Tool;
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
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Tool</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{tool.title}"</span>?
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminToolsPage() {
  const router = useRouter();
  const { tools, loading, error, refetch, deleteTool } = useTools();

  const [deleteTarget, setDeleteTarget] = useState<Tool | null>(null);
  const [togglingId,   setTogglingId]   = useState<string | null>(null);

  const activeCount   = tools.filter((t) => t.status === "ACTIVE").length;
  const inactiveCount = tools.filter((t) => t.status === "INACTIVE").length;

  const handleToggleStatus = async (tool: Tool) => {
    setTogglingId(tool.id);
    try {
      const fd = new FormData();
      fd.append("status", tool.status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
      await toolService.update(tool.id, fd);
      await refetch();
    } finally {
      setTogglingId(null);
    }
  };

  const handleMoveOrder = async (tool: Tool, direction: "up" | "down") => {
    const sorted  = [...tools].sort((a, b) => a.displayOrder - b.displayOrder);
    const idx     = sorted.findIndex((t) => t.id === tool.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const other   = sorted[swapIdx];
    const fdA     = new FormData(); fdA.append("displayOrder", String(other.displayOrder));
    const fdB     = new FormData(); fdB.append("displayOrder", String(tool.displayOrder));
    await Promise.all([
      toolService.update(tool.id,  fdA),
      toolService.update(other.id, fdB),
    ]);
    await refetch();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteTool(deleteTarget.id);
    setDeleteTarget(null);
  };

  const sorted = [...tools].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Tool Cards</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage the rotating carousel on the homepage
          </p>
        </div>
        <Button onClick={() => router.push("/admin/tools/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tool
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      {tools.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total",    value: tools.length,  color: "text-foreground"                        },
            { label: "Active",   value: activeCount,   color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Inactive", value: inactiveCount, color: "text-amber-600 dark:text-amber-400"     },
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
            <Wrench className="size-4 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-sm">All Tools</CardTitle>
            {tools.length > 0 && (
              <Badge variant="secondary" className="text-xs">{tools.length}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Wrench className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No tools yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add tools to show them on the homepage carousel
              </p>
              <Button className="mt-5" onClick={() => router.push("/admin/tools/add")}>
                Add First Tool
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {sorted.map((tool, idx) => (
                <div
                  key={tool.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
                >
                  {/* Order controls */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => handleMoveOrder(tool, "up")}
                      disabled={idx === 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(tool, "down")}
                      disabled={idx === sorted.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Thumbnail */}
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-muted flex items-center justify-center">
                    {tool.image ? (
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tool.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                    <p className="text-xs text-muted-foreground/70 truncate mt-0.5">{tool.link}</p>
                  </div>

                  {/* Status toggle */}
                  <button
                    onClick={() => handleToggleStatus(tool)}
                    disabled={togglingId === tool.id}
                    className="shrink-0"
                  >
                    <Badge
                      variant={tool.status === "ACTIVE" ? "default" : "secondary"}
                      className="cursor-pointer text-xs"
                    >
                      {togglingId === tool.id ? "…" : tool.status}
                    </Badge>
                  </button>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => router.push(`/admin/tools/${tool.id}/edit`)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(tool)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirm */}
      {deleteTarget && (
        <DeleteConfirmModal
          tool={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
