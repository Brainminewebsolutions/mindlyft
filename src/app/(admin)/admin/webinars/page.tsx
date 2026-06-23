"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Video, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WebinarTable } from "@/components/admin/webinars/WebinarTable";
import { useWebinars }  from "@/hooks/useWebinars";
import type { Webinar } from "@/types/admin/webinar";

function DeleteConfirmModal({
  webinar, onConfirm, onCancel,
}: { webinar: Webinar; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">
          Delete {webinar.type}
        </h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{webinar.name}"</span>?
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

export default function AdminWebinarsPage() {
  const router = useRouter();
  const { webinars, loading, error, deleteWebinar } = useWebinars();
  const [deleteTarget, setDeleteTarget] = useState<Webinar | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteWebinar(deleteTarget.id);
    setDeleteTarget(null);
  };

  const workshopCount = webinars.filter((w) => w.type === "Workshop").length;
  const webinarCount  = webinars.filter((w) => w.type === "Webinar").length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Workshops & Webinars</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Schedule and manage live sessions</p>
        </div>
        <Button onClick={() => router.push("/admin/webinars/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add Session
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      {webinars.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total",     value: webinars.length, color: "text-foreground"                        },
            { label: "Workshops", value: workshopCount,   color: "text-amber-600 dark:text-amber-400"    },
            { label: "Webinars",  value: webinarCount,    color: "text-violet-600 dark:text-violet-400"  },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table card */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <Video className="size-4 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-sm">All Sessions</CardTitle>
            {webinars.length > 0 && (
              <Badge variant="secondary" className="text-xs">{webinars.length}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : webinars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Video className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No sessions yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Add your first workshop or webinar</p>
              <Button className="mt-5" onClick={() => router.push("/admin/webinars/add")}>
                Add Session
              </Button>
            </div>
          ) : (
            <div className="p-4">
              <WebinarTable
                webinars={webinars}
                onEdit={(w) => router.push(`/admin/webinars/${w.id}/edit`)}
                onDelete={(w) => setDeleteTarget(w)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {deleteTarget && (
        <DeleteConfirmModal
          webinar={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
