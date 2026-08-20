"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { partnerService } from "@/services/admin/partnerService";
import type { Partner } from "@/types/admin/partner";
import { PARTNER_STATUSES } from "@/constants/partner";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";

const STATUS_OPTIONS = PARTNER_STATUSES;

export default function EditPartnerPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [partner,    setPartner]    = useState<Partner | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [preview,    setPreview]    = useState<string | null>(null);
  const [logoFile,   setLogoFile]   = useState<File | null>(null);

  const [form, setForm] = useState({
    name:         "",
    sector:       "",
    overview:     "",
    websiteUrl:   "",
    displayorder: 0,
    status:       "Active",
  });

  useEffect(() => {
    partnerService.getById(Number(id))
      .then((data) => {
        setPartner(data);
        setForm({
          name:         data.name,
          sector:       data.sector,
          overview:     data.overview,
          websiteUrl:   data.websiteUrl ?? "",
          displayorder: data.displayorder,
          status:       data.status,
        });
        if (data.image) setPreview(data.image);
      })
      .catch(() => setError("Failed to load partner"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "displayorder" ? Number(value) : value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    prepareImageFile(file)
      .then((processed) => {
        setLogoFile(processed);
        setPreview(URL.createObjectURL(processed));
      })
      .catch((err) => setError(err instanceof ImageUploadError ? err.message : "Could not process image"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fd = new FormData();
    fd.append("id",           String(id));
    fd.append("name",         form.name);
    fd.append("sector",       form.sector);
    fd.append("overview",     form.overview);
    fd.append("websiteUrl",   form.websiteUrl);
    fd.append("displayorder", String(form.displayorder));
    fd.append("status",       form.status);

    if (logoFile) fd.append("image", logoFile);

    setSubmitting(true);
    try {
      await partnerService.update(Number(id), fd);
      router.push("/admin/partners");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-[500px] animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Partner not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/partners")}>
          Back to partners
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0"
          onClick={() => router.push("/admin/partners")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Partner</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Editing <span className="font-medium text-foreground">"{partner.name}"</span>
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">

          {/* Logo upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company Logo <span className="text-muted-foreground font-normal">(leave blank to keep existing)</span>
            </label>
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:border-violet-400 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="preview" className="h-24 w-auto object-contain rounded-lg" />
                  <button type="button" className="absolute -top-2 -right-2 rounded-full bg-destructive p-0.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(partner.image ?? null);
                      setLogoFile(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}>
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground text-center">
                    Click to upload new logo<br />
                    <span className="text-xs">JPG, PNG, WEBP — max 2 MB</span>
                  </p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" className="hidden" onChange={handleFile} />
          </div>

          {/* Name & Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Company Name *</label>
              <input name="name" required value={form.name} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Sector *</label>
              <input name="sector" required value={form.sector} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
          </div>

          {/* Overview */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Overview *</label>
            <textarea name="overview" required rows={3} value={form.overview} onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none" />
          </div>

          {/* Website & Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-1.5">Website URL</label>
              <input name="websiteUrl" value={form.websiteUrl} onChange={handleChange}
                placeholder="https://company.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Display Order</label>
              <input name="displayorder" type="number" min={0} value={form.displayorder} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40">
                {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/partners")}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
