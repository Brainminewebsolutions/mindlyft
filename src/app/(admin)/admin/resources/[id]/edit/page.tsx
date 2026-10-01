"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resourceService } from "@/services/admin/resourceService";
import type { Resource } from "@/types/admin/resource";
import { RESOURCE_STATUSES, RESOURCE_TYPES } from "@/constants/resource";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";
import { validateDocumentFile, DocumentUploadError, DOCUMENT_EXTENSIONS } from "@/lib/document-upload";

export default function EditResourcePage() {
  const { id }    = useParams<{ id: string }>();
  const router    = useRouter();
  const imageRef  = useRef<HTMLInputElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);

  const [resource,   setResource]   = useState<Resource | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile,    setImageFile]    = useState<File | null>(null);
  const [docFile,      setDocFile]      = useState<File | null>(null);

  const [form, setForm] = useState({
    name:         "",
    description:  "",
    type:         "File" as (typeof RESOURCE_TYPES)[number],
    url:          "",
    displayOrder: 0,
    status:       "Active",
  });

  useEffect(() => {
    resourceService.getById(Number(id))
      .then((data) => {
        setResource(data);
        setForm({
          name:         data.name,
          description:  data.description ?? "",
          type:         data.type,
          url:          data.type === "Link" ? (data.url ?? "") : "",
          displayOrder: data.displayOrder,
          status:       data.status,
        });
        if (data.image) setImagePreview(data.image);
      })
      .catch(() => setError("Failed to load resource"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "displayOrder" ? Number(value) : value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    prepareImageFile(file)
      .then((processed) => {
        setImageFile(processed);
        setImagePreview(URL.createObjectURL(processed));
      })
      .catch((err) => setError(err instanceof ImageUploadError ? err.message : "Could not process image"));
  };

  const handleDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setDocFile(validateDocumentFile(file));
      setError(null);
    } catch (err) {
      setError(err instanceof DocumentUploadError ? err.message : "Could not process file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.type === "Link" && !form.url.trim()) {
      setError("Please enter a URL for this link resource.");
      return;
    }

    const fd = new FormData();
    fd.append("name",         form.name);
    fd.append("description",  form.description);
    fd.append("type",         form.type);
    fd.append("displayOrder", String(form.displayOrder));
    fd.append("status",       form.status);
    if (form.type === "Link") fd.append("url", form.url);
    if (docFile)   fd.append("file",  docFile);
    if (imageFile) fd.append("image", imageFile);

    setSubmitting(true);
    try {
      await resourceService.update(Number(id), fd);
      router.push("/admin/resources");
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

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Resource not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/resources")}>
          Back to resources
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0"
          onClick={() => router.push("/admin/resources")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Resource</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Editing <span className="font-medium text-foreground">"{resource.name}"</span>
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

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Resource Type *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40">
              {RESOURCE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
            <input name="name" required value={form.name} onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none" />
          </div>

          {/* Url (Link type) */}
          {form.type === "Link" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Url *</label>
              <input name="url" value={form.url} onChange={handleChange}
                placeholder="https://example.com/resource"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
          )}

          {/* File upload (File type) */}
          {form.type === "File" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                File <span className="text-muted-foreground font-normal">(leave blank to keep existing)</span>
              </label>

              {resource.type === "File" && resource.url && !docFile && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer"
                  className="mb-2 flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-700">
                  <ExternalLink className="h-3 w-3" /> View current file
                </a>
              )}

              <div
                className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:border-violet-400 transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                {docFile ? (
                  <div className="relative flex items-center gap-2">
                    <FileText className="h-6 w-6 text-violet-600" />
                    <span className="text-sm text-foreground">{docFile.name}</span>
                    <button type="button" className="rounded-full bg-destructive p-0.5"
                      onClick={(e) => { e.stopPropagation(); setDocFile(null); if (fileRef.current) fileRef.current.value = ""; }}>
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground text-center">
                      Click to upload new file<br />
                      <span className="text-xs">{DOCUMENT_EXTENSIONS.join(", ")} — max 10 MB</span>
                    </p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept={DOCUMENT_EXTENSIONS.join(",")} className="hidden" onChange={handleDoc} />
            </div>
          )}

          {/* Thumbnail image (optional, both types) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Thumbnail Image <span className="text-muted-foreground font-normal">(leave blank to keep existing)</span>
            </label>
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:border-violet-400 transition-colors"
              onClick={() => imageRef.current?.click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <Image src={imagePreview} alt="preview" width={0} height={0} sizes="200px" unoptimized className="h-24 w-auto object-contain rounded-lg" />
                  <button type="button" className="absolute -top-2 -right-2 rounded-full bg-destructive p-0.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(resource.image ?? null);
                      setImageFile(null);
                      if (imageRef.current) imageRef.current.value = "";
                    }}>
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground text-center">
                    Click to upload new thumbnail<br />
                    <span className="text-xs">JPG, PNG, WEBP — max 1 MB</span>
                  </p>
                </>
              )}
            </div>
            <input ref={imageRef} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" className="hidden" onChange={handleImage} />
          </div>

          {/* Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Display Order</label>
              <input name="displayOrder" type="number" min={0} value={form.displayOrder} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40">
                {RESOURCE_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/resources")}>
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
