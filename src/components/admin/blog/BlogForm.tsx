"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { notify } from "@/lib/notify";
import { toSlug } from "@/lib/slug";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";
import { ImageIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { blogCategoryService, blogTagService } from "@/services/admin/blogService";
import { employeeService } from "@/services/admin/employeeService";
import type { BlogDto, BlogCategoryDto, BlogTagDto } from "@/types/admin/blog";
import type { Employee } from "@/types/admin/employee";

function ImagePicker({
  existingUrl,
  file,
  onFile,
  onClear,
}: {
  existingUrl: string;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const src = preview || existingUrl;

  return (
    <div className="space-y-2">
      <Label>Cover Image</Label>
      {src && (
        <div className="relative inline-block">
          <div className="relative h-28 w-48 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={src} alt="cover" fill className="object-cover" unoptimized />
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
        onClick={() => ref.current?.click()}
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground transition hover:border-primary/50 hover:bg-muted/60"
      >
        <ImageIcon className="h-4 w-4" />
        {src ? "Replace image" : "Upload cover image"}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          prepareImageFile(f)
            .then(onFile)
            .catch((err) => notify.error(err instanceof ImageUploadError ? err.message : "Could not process image"));
        }}
      />
    </div>
  );
}

type Props = {
  mode:          "create" | "edit";
  defaultValues?: Partial<BlogDto>;
  onSubmit:      (data: FormData) => Promise<void>;
  onCancel:      () => void;
  isLoading?:    boolean;
}; 

export function BlogForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: Props) {
  const [categories, setCategories] = useState<BlogCategoryDto[]>([]);
  const [tags,       setTags]       = useState<BlogTagDto[]>([]);
  const [employees,  setEmployees]  = useState<Employee[]>([]);

  const [title,           setTitle]          = useState(defaultValues?.title ?? "");
  const [slug,            setSlug]           = useState(defaultValues?.slug ?? "");
  const [slugTouched,     setSlugTouched]    = useState(false);
  const [excerpt,         setExcerpt]        = useState(defaultValues?.excerpt ?? "");
  const [categoryId,      setCategoryId]     = useState(defaultValues?.blogCategoryId ?? "");
  const [employeeId,      setEmployeeId]     = useState(defaultValues?.employeeId ?? "");
  const [readTime,        setReadTime]       = useState(String(defaultValues?.readTimeMinutes ?? 0));
  const [status,          setStatus]         = useState(defaultValues?.status ?? "Pending");
  const [selectedTagIds,  setSelectedTagIds] = useState<string[]>(
    defaultValues?.tags?.map((t) => t.id) ?? []
  );
  const [imageFile,       setImageFile]      = useState<File | null>(null);
  const [existingImage,   setExistingImage]  = useState(defaultValues?.coverImageUrl ?? "");
  const [errors,          setErrors]         = useState<Record<string, string>>({});

  useEffect(() => {
    blogCategoryService.list("Active").then(setCategories).catch(() => {});
    blogTagService.list().then(setTags).catch(() => {});
    employeeService.list({ limit: 200 }).then((r) => setEmployees(r.employees)).catch(() => {});
  }, []);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(toSlug(v));
  };

  const toggleTag = (id: string) =>
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim())      e.title      = "Title is required";
    if (!slug.trim())       e.slug       = "Slug is required";
    if (!categoryId)        e.categoryId = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append("Title",           title.trim());
    fd.append("Slug",            slug.trim());
    fd.append("BlogCategoryId",  categoryId);
    if (excerpt)    fd.append("Excerpt",         excerpt.trim());
    if (employeeId) fd.append("EmployeeId",      employeeId);
    fd.append("ReadTimeMinutes", readTime || "0");
    if (mode === "edit") fd.append("Status", status);
    selectedTagIds.forEach((id) => fd.append("TagIds", id));
    if (imageFile)  fd.append("CoverImage", imageFile, imageFile.name);

    await onSubmit(fd);
  };

  const selectCls = cn(
    "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
    "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition"
  );

  const fieldCls = (key: string) =>
    cn("h-9 rounded-md border bg-background px-3 text-sm text-foreground w-full",
      "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition",
      errors[key] ? "border-destructive" : "border-input");

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
        <input
          id="title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. Getting Started with AI"
          className={fieldCls("title")}
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
        <input
          id="slug"
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
          placeholder="getting-started-with-ai"
          className={fieldCls("slug")}
        />
        {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Brief summary of the article…"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none"
        />
      </div>

      {/* Category + Author */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Category <span className="text-destructive">*</span></Label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={cn(selectCls, errors.categoryId ? "border-destructive" : "")}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Author</Label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className={selectCls}
          >
            <option value="">Select author (optional)</option>
            {employees.map((e) => (
              <option key={e.id} value={e.employeeId}>{e.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Read time + Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="readTime">Read Time (minutes)</Label>
          <Input
            id="readTime"
            type="number"
            min={0}
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            placeholder="5"
          />
        </div>

        {mode === "edit" && (
          <div className="space-y-1.5">
            <Label>Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BlogDto["status"])}
              className={selectCls}
            >
              <option value="Pending">Draft</option>
              <option value="Active">Published</option>
              <option value="Inactive">Archived</option>
            </select>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition border",
                  selectedTagIds.includes(tag.id)
                    ? "bg-violet-600 text-white border-violet-600"
                    : "border-border bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cover Image */}
      <ImagePicker
        existingUrl={existingImage}
        file={imageFile}
        onFile={setImageFile}
        onClear={() => { setImageFile(null); setExistingImage(""); }}
      />

      <Separator />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? (mode === "create" ? "Creating…" : "Saving…")
            : (mode === "create" ? "Create Article" : "Save Changes")}
        </Button>
      </div>
    </form>
  );
}
