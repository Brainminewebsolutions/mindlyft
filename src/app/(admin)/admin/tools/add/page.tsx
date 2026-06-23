"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImageIcon, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Button }    from "@/components/ui/button";
import { Input }     from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import { toolService } from "@/services/admin/toolService";

// ─── Image picker ─────────────────────────────────────────────────────────────
function ImagePickerField({
  imageFile,
  onFileSelected,
  onClear,
}: {
  imageFile:      File | null;
  onFileSelected: (file: File) => void;
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

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Image</label>

      {blobUrl && (
        <div className="relative inline-block">
          <div className="relative h-32 w-52 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={blobUrl} alt="Preview" fill className="object-cover" unoptimized />
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
        <span>{blobUrl ? "Replace image" : "Upload tool image"}</span>
        <UploadCloud className="ml-auto h-4 w-4 opacity-40" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AddToolPage() {
  const router = useRouter();

  const [title,        setTitle]        = useState("");
  const [description,  setDescription]  = useState("");
  const [link,         setLink]         = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [imageFile,    setImageFile]    = useState<File | null>(null);
  const [submitting,   setSubmitting]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);

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

      await toolService.create(fd);
      router.push("/admin/tools");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/tools")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Add New Tool</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in the details to add a card to the homepage carousel
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

          <div className="grid grid-cols-2 gap-4">
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
            imageFile={imageFile}
            onFileSelected={setImageFile}
            onClear={() => setImageFile(null)}
          />

          <Separator />

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/tools")}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating…" : "Create Tool"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
