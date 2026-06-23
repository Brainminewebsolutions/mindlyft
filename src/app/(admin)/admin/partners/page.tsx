"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Handshake, Plus, Trash2, Pencil, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePartners } from "@/hooks/usePartners";
import type { Partner } from "@/types/admin/partner";

function DeleteModal({
  partner, onConfirm, onCancel,
}: { partner: Partner; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Partner</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{partner.name}"</span>?
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

export default function AdminPartnersPage() {
  const router = useRouter();
  const { partners, loading, error, deletePartner } = usePartners();
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deletePartner(deleteTarget.id);
    setDeleteTarget(null);
  };

  const activeCount = partners.filter((p) => p.status === "Active").length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Recruiting Partners</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage companies displayed on the home page</p>
        </div>
        <Button onClick={() => router.push("/admin/partners/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add Partner
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      {partners.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: "Total",  value: partners.length, color: "text-foreground" },
            { label: "Active", value: activeCount,      color: "text-emerald-600" },
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
            <Handshake className="size-4 text-violet-600" />
            <CardTitle className="text-sm">All Partners</CardTitle>
            {partners.length > 0 && (
              <Badge variant="secondary" className="text-xs">{partners.length}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : partners.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Handshake className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No partners yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Add your first recruiting partner</p>
              <Button className="mt-5" onClick={() => router.push("/admin/partners/add")}>
                Add Partner
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {partners.map((p) => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">

                  {/* Logo */}
                  <div className="h-12 w-12 shrink-0 rounded-lg border border-border bg-muted overflow-hidden flex items-center justify-center">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="h-full w-full object-contain p-1" />
                      : <Handshake className="h-5 w-5 text-muted-foreground/40" />
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[p.status] ?? "bg-neutral-100 text-neutral-600"}`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.sector}</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-1">{p.overview}</p>
                  </div>

                  {/* Order */}
                  <div className="hidden sm:block text-center shrink-0">
                    <p className="text-xs text-muted-foreground">Order</p>
                    <p className="text-sm font-semibold text-foreground">{p.displayorder}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {p.websiteUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/partners/${p.id}/edit`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(p)}>
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
          partner={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
