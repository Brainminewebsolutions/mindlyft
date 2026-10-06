"use client";

import { useState } from "react";
import {
  Plus, Pencil, Trash2, ChevronDown, ChevronRight,
  BookOpen, Check, X, Loader2,
} from "lucide-react";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn }       from "@/lib/utils";
import { useCourseChapters } from "@/hooks/useCourseChapters";
import { ChapterContentList } from "@/components/admin/courses/ChapterContentList";
import type { CourseChapter } from "@/types/admin/courseChapter";

interface Props { courseId: string; }

type ChapterFormState = {
  title:       string;
  description: string;
  order:       number;
};

const emptyChapterForm = (): ChapterFormState => ({ title: "", description: "", order: 0 });

export function ChapterSection({ courseId }: Props) {
  const { chapters, loading, error, createChapter, updateChapter, deleteChapter } =
    useCourseChapters(courseId);

  const [expandedId,   setExpandedId]   = useState<string | null>(null);
  const [showAddForm,  setShowAddForm]  = useState(false);
  const [editingId,    setEditingId]    = useState<string | null>(null);
  const [form,         setForm]         = useState<ChapterFormState>(emptyChapterForm());
  const [saving,       setSaving]       = useState(false);
  const [formError,    setFormError]    = useState<string | null>(null);
  const [deletingId,   setDeletingId]   = useState<string | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyChapterForm(), order: chapters.length + 1 });
    setFormError(null);
    setShowAddForm(true);
  };

  const openEdit = (ch: CourseChapter) => {
    setEditingId(ch.id);
    setForm({ title: ch.title, description: ch.description ?? "", order: ch.order });
    setFormError(null);
    setShowAddForm(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setForm(emptyChapterForm());
    setFormError(null);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setFormError("Title is required"); return; }
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        title:       form.title.trim(),
        description: form.description.trim() || undefined,
        order:       form.order,
      };
      if (editingId) {
        await updateChapter(editingId, payload);
        closeForm();
      } else {
        const created = await createChapter(payload);
        closeForm();
        setExpandedId(created.id);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    if (expandedId === id) setExpandedId(null);
    try { await deleteChapter(id); } catch { /* no-op */ }
    finally { setDeletingId(null); }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const sorted = chapters.slice().sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Course Curriculum</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {chapters.length} chapter{chapters.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" onClick={openAdd} disabled={showAddForm}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Chapter
        </Button>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Add/Edit chapter form */}
      {showAddForm && (
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">
            {editingId ? "Edit Chapter" : "New Chapter"}
          </p>
          <div className="space-y-1">
            <Label className="text-xs">Title *</Label>
            <Input
              placeholder="e.g. Getting Started"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea
              placeholder="What students will learn in this chapter..."
              rows={2}
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

      {/* Chapter list */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : sorted.length === 0 && !showAddForm ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <BookOpen className="mb-2 h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No chapters yet</p>
          <p className="mt-0.5 text-xs text-muted-foreground/60">Click "Add Chapter" to structure the course</p>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {sorted.map((ch) => {
            const isExpanded = expandedId === ch.id;
            return (
              <div key={ch.id} className="bg-background">
                {/* Chapter header row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleExpand(ch.id)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {ch.order}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{ch.title}</p>
                      {ch.description && (
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{ch.description}</p>
                      )}
                    </div>
                    {isExpanded
                      ? <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                      : <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
                  </button>

                  <div className={cn("flex shrink-0 items-center gap-1", showAddForm && "opacity-50 pointer-events-none")}>
                    <Button
                      size="icon" variant="ghost" className="h-7 w-7"
                      onClick={() => openEdit(ch)}
                      disabled={showAddForm || !!deletingId}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon" variant="ghost"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(ch.id)}
                      disabled={deletingId === ch.id || showAddForm}
                    >
                      {deletingId === ch.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>

                {/* Expanded content area */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/10 px-4 pb-4">
                    <ChapterContentList chapterId={ch.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
