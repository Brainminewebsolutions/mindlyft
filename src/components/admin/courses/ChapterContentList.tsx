"use client";

import { useRef, useState } from "react";
import { Plus, Pencil, Trash2, Video, UploadCloud, X, Check, Loader2 } from "lucide-react";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn }       from "@/lib/utils";
import { useCourseContent } from "@/hooks/useCourseContent";
import type { CourseContent } from "@/types/admin/courseContent";

interface Props { chapterId: string; }

type FormState = {
  title:            string;
  videoFile:        File | null;
  existingVideoUrl: string | null;
  description:      string;
  order:            number;
};

const emptyForm = (): FormState => ({
  title:            "",
  videoFile:        null,
  existingVideoUrl: null,
  description:      "",
  order:            0,
});

function VideoPicker({
  videoFile,
  existingVideoUrl,
  onFileSelected,
  onClear,
}: {
  videoFile:        File | null;
  existingVideoUrl: string | null;
  onFileSelected:   (f: File) => void;
  onClear:          () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasVideo = !!videoFile || !!existingVideoUrl;
  const label    = videoFile
    ? videoFile.name
    : existingVideoUrl
      ? "Current video (click to replace)"
      : "Upload video";

  return (
    <div className="space-y-1">
      <Label className="text-xs">Video</Label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground",
            "transition hover:border-primary/50 hover:bg-muted/60"
          )}
        >
          <Video className="h-4 w-4 shrink-0" />
          <span className="truncate">{label}</span>
          <UploadCloud className="ml-auto h-4 w-4 shrink-0 opacity-40" />
        </button>
        {hasVideo && (
          <button
            type="button"
            onClick={onClear}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {existingVideoUrl && !videoFile && (
        <a
          href={existingVideoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <Video className="h-3 w-3" />
          View current video
        </a>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
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

export function ChapterContentList({ chapterId }: Props) {
  const { contents, loading, error, createContent, updateContent, deleteContent } =
    useCourseContent(chapterId);

  const [showForm,   setShowForm]   = useState(false);
  const [editingId,  setEditingId]  = useState<string | null>(null);
  const [form,       setForm]       = useState<FormState>(emptyForm());
  const [saving,     setSaving]     = useState(false);
  const [formError,  setFormError]  = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm(), order: contents.length + 1 });
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (c: CourseContent) => {
    setEditingId(c.id);
    setForm({
      title:            c.title,
      videoFile:        null,
      existingVideoUrl: c.videoUrl,
      description:      c.description ?? "",
      order:            c.order,
    });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm());
    setFormError(null);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setFormError("Title is required"); return; }
    setSaving(true);
    setFormError(null);
    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("order", String(form.order ?? 0));
      if (form.description?.trim()) fd.append("description", form.description.trim());
      if (form.videoFile) fd.append("video", form.videoFile, form.videoFile.name);

      if (editingId) {
        await updateContent(editingId, fd);
      } else {
        await createContent(fd);
      }
      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try { await deleteContent(id); } catch { /* no-op */ }
    finally { setDeletingId(null); }
  };

  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {contents.length} lesson{contents.length !== 1 ? "s" : ""}
        </p>
        <Button size="sm" variant="outline" onClick={openAdd} disabled={showForm}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Lesson
        </Button>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {showForm && (
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">
            {editingId ? "Edit Lesson" : "New Lesson"}
          </p>
          <div className="space-y-1">
            <Label className="text-xs">Title *</Label>
            <Input
              placeholder="e.g. Introduction to the topic"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>
          <VideoPicker
            videoFile={form.videoFile}
            existingVideoUrl={form.existingVideoUrl}
            onFileSelected={(file) => setForm((f) => ({ ...f, videoFile: file }))}
            onClear={() => setForm((f) => ({ ...f, videoFile: null, existingVideoUrl: null }))}
          />
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea
              placeholder="What this lesson covers..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="w-28 space-y-1">
            <Label className="text-xs">Order</Label>
            <Input
              type="number"
              min={1}
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
            />
          </div>
          {formError && <p className="text-xs text-destructive">{formError}</p>}
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving
                ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                : <Check className="mr-1.5 h-3.5 w-3.5" />}
              {editingId ? "Update" : "Save"}
            </Button>
            <Button size="sm" variant="ghost" onClick={closeForm} disabled={saving}>
              <X className="mr-1.5 h-3.5 w-3.5" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : contents.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-8 text-center">
          <Video className="mb-2 h-7 w-7 text-muted-foreground/40" />
          <p className="text-xs text-muted-foreground">No lessons yet — click "Add Lesson" to get started</p>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {contents
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((c) => (
              <div key={c.id} className="bg-background p-3 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {c.order}
                  </span>
                  <p className="flex-1 truncate text-sm font-medium text-foreground">{c.title}</p>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      size="icon" variant="ghost" className="h-7 w-7"
                      onClick={() => openEdit(c)}
                      disabled={showForm || !!deletingId}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon" variant="ghost"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(c.id)}
                      disabled={deletingId === c.id || showForm}
                    >
                      {deletingId === c.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
                {c.videoUrl && (
                  c.videoUrl.includes("player.vimeo.com") ? (
                    <div className="w-full overflow-hidden rounded-lg bg-black" style={{ maxHeight: "260px", aspectRatio: "16/9" }}>
                      <iframe
                        src={c.videoUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      src={c.videoUrl}
                      controls
                      className="w-full rounded-lg bg-black"
                      style={{ maxHeight: "260px" }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )
                )}
                {c.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
