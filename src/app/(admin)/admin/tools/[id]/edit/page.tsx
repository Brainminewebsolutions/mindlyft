"use client";

import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ImageIcon, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Button }    from "@/components/ui/button";
import { Input }     from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import { toolService } from "@/services/admin/toolService";
import type { Tool } from "@/types/admin/tool";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";

// ─── Image picker ─────────────────────────────────────────────────────────────
function ImagePickerField({
  existingUrl,
  imageFile,
  onFileSelected,
  onImageError,
  onClear,
}: {
  existingUrl:    string;
  imageFile:      File | null;
  onFileSelected: (file: File) => void;
  onImageError:   (message: string) => void;
  onClear:        () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState("");

  useEffect(() => {
    if (!imageFile) { setBlobUrl(""); return; }
    const url = URL.createObjectURL(imageFile);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const previewUrl = blobUrl || existingUrl;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Image</label>

      {previewUrl && (
        <div className="relative inline-block">
          <div className="relative h-32 w-52 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
          </div>
          <button
            type="button"
            onClick={onClear}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground",
          "transition hover:border-primary/50 hover:bg-muted/60"
        )}
      >
        <ImageIcon className="h-4 w-4" />
        <span>{previewUrl ? "Replace image" : "Upload tool image"}</span>
        <UploadCloud className="ml-auto h-4 w-4 opacity-40" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          prepareImageFile(file)
            .then(onFileSelected)
            .catch((err) => onImageError(err instanceof ImageUploadError ? err.message : "Could not process image"));
        }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EditToolPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();

  const [tool,         setTool]         = useState<Tool | null>(null);
  const [title,        setTitle]        = useState("");
  const [description,  setDescription]  = useState("");
  const [link,         setLink]         = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [existingImage, setExistingImage] = useState("");
  const [imageFile,    setImageFile]    = useState<File | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [submitting,   setSubmitting]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  useEffect(() => {
    toolService.getById(id)
      .then((data) => {
        setTool(data);
        setTitle(data.title);
        setDescription(data.description);
        setLink(data.link);
        setDisplayOrder(data.displayOrder);
        setExistingImage(data.image ?? "");
      })
      .catch(() => setError("Failed to load tool"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("title",        title);
      fd.append("description",  description);
      fd.append("link",         link);
      fd.append("displayOrder", String(displayOrder));
      if (imageFile) fd.append("image", imageFile, imageFile.name);

      await toolService.update(id, fd);
      router.push("/admin/tools");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-80 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Tool not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/tools")}>
          Back to tools
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/tools")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Tool</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Editing <span className="font-medium text-foreground">"{tool.title}"</span>
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Form card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Agentic AI"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Display Order</label>
              <Input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Description</label>
              <span className={`text-xs ${description.length > 150 ? "text-destructive" : "text-muted-foreground"}`}>
                {description.length} / 150
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description shown on the card…"
              rows={3}
              maxLength={150}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Link</label>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="/courses or https://…"
              required
            />
          </div>

          <ImagePickerField
            existingUrl={existingImage}
            imageFile={imageFile}
            onFileSelected={setImageFile}
            onImageError={setError}
            onClear={() => { setImageFile(null); setExistingImage(""); }}
          />

          <Separator />

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/tools")}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save Changes"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
