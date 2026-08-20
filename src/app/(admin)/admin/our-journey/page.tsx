"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Milestone, Plus, Trash2, Pencil, Calendar, MapPin, ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import { useOurJourney } from "@/hooks/useOurJourney";
import type { OurJourney } from "@/types/admin/ourJourney";

function DeleteModal({
  entry, onConfirm, onCancel,
}: { entry: OurJourney; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Entry</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{entry.name}"</span>?
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
  Upcoming:  "bg-blue-100 text-blue-700",
};

const TYPE_TABS = [
  { label: "All",        value: undefined },
  { label: "Events",     value: "Event" },
  { label: "Our Impact", value: "OurImpact" },
] as const;

export default function AdminOurJourneyPage() {
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const { entries, loading, error, deleteEntry } = useOurJourney(typeFilter);
  const [deleteTarget, setDeleteTarget] = useState<OurJourney | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteEntry(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Our Journey</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage timeline events and impact milestones</p>
        </div>
        <Button onClick={() => router.push("/admin/our-journey/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add Entry
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Type tabs */}
      <div className="flex gap-1.5 rounded-lg border border-border bg-muted/30 p-1 w-fit">
        {TYPE_TABS.map((t) => (
          <button
            key={t.label}
            onClick={() => setTypeFilter(t.value)}
            className={cn(
              "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
              typeFilter === t.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <Milestone className="size-4 text-violet-600" />
            <CardTitle className="text-sm">All Entries</CardTitle>
            {entries.length > 0 && (
              <Badge variant="secondary" className="text-xs">{entries.length}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Milestone className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No entries yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Add your first event or impact milestone</p>
              <Button className="mt-5" onClick={() => router.push("/admin/our-journey/add")}>
                Add Entry
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {entries.map((e) => (
                <div key={e.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">

                  {/* Thumbnail */}
                  <div className="h-12 w-12 shrink-0 rounded-lg border border-border bg-muted overflow-hidden flex items-center justify-center">
                    {e.mainImage
                      ? <img src={e.mainImage} alt={e.name} className="h-full w-full object-cover" />
                      : <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">{e.name}</p>
                      <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                        {e.type === "OurImpact" ? "Our Impact" : "Event"}
                      </span>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[e.status] ?? "bg-neutral-100 text-neutral-600"}`}>
                        {e.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {e.date}
                      </span>
                      {e.address && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                          <MapPin className="h-3 w-3 shrink-0" /> {e.address}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order */}
                  <div className="hidden sm:block text-center shrink-0">
                    <p className="text-xs text-muted-foreground">Order</p>
                    <p className="text-sm font-semibold text-foreground">{e.displayOrder}</p>
                  </div>

                  {/* Media count */}
                  <div className="hidden sm:block text-center shrink-0">
                    <p className="text-xs text-muted-foreground">Media</p>
                    <p className="text-sm font-semibold text-foreground">{e.media.length}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/our-journey/${e.id}/edit`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(e)}>
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
          entry={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
