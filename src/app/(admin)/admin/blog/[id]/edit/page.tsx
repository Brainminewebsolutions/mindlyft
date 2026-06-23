"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, ChevronDown, ChevronRight, Trash2, Pencil, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { blogService, blogChapterService, blogContentService } from "@/services/admin/blogService";
import type { BlogDto, BlogChapterDto, BlogContentDto } from "@/types/admin/blog";

// ── Chapter / Content inline editors ─────────────────────────────────────────

function ContentRow({
  content,
  onDelete,
  onSave,
}: {
  content: BlogContentDto;
  onDelete: () => void;
  onSave: (title: string, body: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [title,   setTitle]   = useState(content.title);
  const [body,    setBody]    = useState(content.content ?? "");
  const [saving,  setSaving]  = useState(false);

  const save = async () => {
    setSaving(true);
    await onSave(title, body);
    setSaving(false);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{content.title}</p>
          {content.content && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{content.content}</p>
          )}
        </div>
        <button onClick={() => setEditing(true)} className="shrink-0 text-muted-foreground hover:text-foreground transition">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button onClick={onDelete} className="shrink-0 text-muted-foreground hover:text-destructive transition">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-lg border border-violet-200 dark:border-violet-900 bg-muted/30 p-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Content title"
        className="h-8 text-sm"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Write content here…"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none"
      />
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditing(false)}>Cancel</Button>
        <Button size="sm" className="h-7 text-xs" onClick={save} disabled={saving || !title.trim()}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}

function AddContentForm({
  chapterId,
  onAdded,
  onCancel,
}: {
  chapterId: string;
  onAdded: (c: BlogContentDto) => void;
  onCancel: () => void;
}) {
  const [title,  setTitle]  = useState("");
  const [body,   setBody]   = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("BlogChapterId", chapterId);
      fd.append("Title", title.trim());
      if (body.trim()) fd.append("Content", body.trim());
      const c = await blogContentService.create(fd);
      onAdded(c);
      setTitle("");
      setBody("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2 rounded-lg border border-violet-200 dark:border-violet-900 bg-muted/30 p-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Content title"
        className="h-8 text-sm"
        autoFocus
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Write content here…"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none"
      />
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onCancel}>Cancel</Button>
        <Button size="sm" className="h-7 text-xs" onClick={save} disabled={saving || !title.trim()}>
          {saving ? "Adding…" : "Add Content"}
        </Button>
      </div>
    </div>
  );
}

function ChapterPanel({
  chapter,
  onDelete,
  onTitleSave,
  onContentSave,
  onContentDelete,
  onContentAdded,
}: {
  chapter:         BlogChapterDto;
  onDelete:        () => void;
  onTitleSave:     (title: string) => Promise<void>;
  onContentSave:   (id: string, title: string, body: string) => Promise<void>;
  onContentDelete: (id: string) => void;
  onContentAdded:  (c: BlogContentDto) => void;
}) {
  const [open,         setOpen]         = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [chapterTitle, setChapterTitle] = useState(chapter.title);
  const [savingTitle,  setSavingTitle]  = useState(false);
  const [addingContent, setAddingContent] = useState(false);

  const saveTitle = async () => {
    if (!chapterTitle.trim()) return;
    setSavingTitle(true);
    await onTitleSave(chapterTitle);
    setSavingTitle(false);
    setEditingTitle(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Chapter header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 text-muted-foreground hover:text-foreground transition"
        >
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {editingTitle ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              className="h-7 flex-1 text-sm"
              autoFocus
            />
            <Button size="sm" className="h-7 text-xs" onClick={saveTitle} disabled={savingTitle}>
              {savingTitle ? "Saving…" : "Save"}
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingTitle(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <p className="flex-1 text-sm font-medium text-foreground">{chapter.title}</p>
            <span className="text-xs text-muted-foreground">{chapter.contents.length} items</span>
            <button
              onClick={() => setEditingTitle(true)}
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onDelete}
              className="text-muted-foreground hover:text-destructive transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Contents */}
      {open && (
        <div className="border-t border-border px-4 py-3 space-y-2">
          {chapter.contents.map((c) => (
            <ContentRow
              key={c.id}
              content={c}
              onDelete={() => onContentDelete(c.id)}
              onSave={(title, body) => onContentSave(c.id, title, body)}
            />
          ))}

          {addingContent ? (
            <AddContentForm
              chapterId={chapter.id}
              onAdded={(c) => { onContentAdded(c); setAddingContent(false); }}
              onCancel={() => setAddingContent(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setAddingContent(true)}
              className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition"
            >
              <Plus className="h-3.5 w-3.5" />
              Add content item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main edit page ─────────────────────────────────────────────────────────────

export default function EditBlogPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();

  const [blog,       setBlog]       = useState<BlogDto | null>(null);
  const [chapters,   setChapters]   = useState<BlogChapterDto[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  // Chapter add form state
  const [addingChapter,     setAddingChapter]     = useState(false);
  const [newChapterTitle,   setNewChapterTitle]   = useState("");
  const [savingChapter,     setSavingChapter]     = useState(false);

  useEffect(() => {
    setLoading(true);
    blogService.getById(id)
      .then((data) => {
        setBlog(data);
        setChapters(data.chapters ?? []);
      })
      .catch(() => setError("Failed to load article"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleMetaSave = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const updated = await blogService.update(id, data);
      setBlog(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const addChapter = async () => {
    if (!newChapterTitle.trim()) return;
    setSavingChapter(true);
    try {
      const ch = await blogChapterService.create({
        blogId:      parseInt(id),
        title:       newChapterTitle.trim(),
        order:       chapters.length,
      });
      setChapters((prev) => [...prev, { ...ch, contents: [] }]);
      setNewChapterTitle("");
      setAddingChapter(false);
    } finally {
      setSavingChapter(false);
    }
  };

  const deleteChapter = async (chapterId: string) => {
    await blogChapterService.delete(chapterId);
    setChapters((prev) => prev.filter((c) => c.id !== chapterId));
  };

  const saveChapterTitle = async (chapterId: string, title: string) => {
    await blogChapterService.update(chapterId, { title });
    setChapters((prev) => prev.map((c) => (c.id === chapterId ? { ...c, title } : c)));
  };

  const saveContent = async (chapterId: string, contentId: string, title: string, body: string) => {
    const fd = new FormData();
    fd.append("Title",   title);
    fd.append("Content", body);
    await blogContentService.update(contentId, fd);
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === chapterId
          ? {
              ...ch,
              contents: ch.contents.map((c) =>
                c.id === contentId ? { ...c, title, content: body } : c
              ),
            }
          : ch
      )
    );
  };

  const deleteContent = async (chapterId: string, contentId: string) => {
    await blogContentService.delete(contentId);
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === chapterId
          ? { ...ch, contents: ch.contents.filter((c) => c.id !== contentId) }
          : ch
      )
    );
  };

  const addContent = (chapterId: string, content: BlogContentDto) => {
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === chapterId ? { ...ch, contents: [...ch.contents, content] } : ch
      )
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-[480px] animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Article not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/blog")}>
          Back to articles
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/blog")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Article</h1>
          <p className="mt-0.5 truncate text-sm text-muted-foreground max-w-sm">
            {blog.title}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Metadata form */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-5 text-sm font-semibold text-foreground">Article Details</h2>
        <BlogForm
          mode="edit"
          defaultValues={blog}
          onSubmit={handleMetaSave}
          onCancel={() => router.push("/admin/blog")}
          isLoading={submitting}
        />
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Chapters</h2>
            <p className="text-xs text-muted-foreground">Organise your article into chapters and content items</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={() => setAddingChapter(true)}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Chapter
          </Button>
        </div>

        {/* Add chapter inline form */}
        {addingChapter && (
          <div className="flex items-center gap-2 rounded-xl border border-violet-200 dark:border-violet-900 bg-card p-4">
            <Input
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              placeholder="Chapter title"
              className="flex-1 h-8 text-sm"
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") addChapter(); }}
            />
            <Button size="sm" className="h-8 text-xs" onClick={addChapter} disabled={savingChapter || !newChapterTitle.trim()}>
              {savingChapter ? "Adding…" : "Add"}
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => { setAddingChapter(false); setNewChapterTitle(""); }}>
              Cancel
            </Button>
          </div>
        )}

        {chapters.length === 0 && !addingChapter ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
            <p className="text-sm text-muted-foreground">No chapters yet</p>
            <p className="mt-1 text-xs text-muted-foreground">Add a chapter to start organising your content</p>
          </div>
        ) : (
          <div className="space-y-3">
            {chapters.map((ch) => (
              <ChapterPanel
                key={ch.id}
                chapter={ch}
                onDelete={() => deleteChapter(ch.id)}
                onTitleSave={(title) => saveChapterTitle(ch.id, title)}
                onContentSave={(cid, title, body) => saveContent(ch.id, cid, title, body)}
                onContentDelete={(cid) => deleteContent(ch.id, cid)}
                onContentAdded={(c) => addContent(ch.id, c)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
