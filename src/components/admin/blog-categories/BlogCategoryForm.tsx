"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { notify } from "@/lib/notify";
import { toSlug } from "@/lib/slug";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";
import { ImageIcon, UploadCloud, X } from "lucide-react";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import type { BlogCategoryDto } from "@/types/admin/blog";
import {
  createBlogCategorySchema,
  type CreateBlogCategorySchema,
} from "@/validators/admin/blogCategory";

type Props = {
  mode:           "create" | "edit";
  defaultValues?: Partial<BlogCategoryDto>;
  onSubmit:       (data: FormData) => Promise<void>;
  onCancel:       () => void;
  isLoading?:     boolean;
};

function ImagePickerField({
  existingUrl,
  imageFile,
  onFileSelected,
  onClear,
}: {
  existingUrl:    string;
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

  const previewUrl = blobUrl || existingUrl;

  return (
    <div className="space-y-2">
      <Label>Cover Image</Label>
      {previewUrl && (
        <div className="relative inline-block">
          <div className="relative h-32 w-52 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={previewUrl} alt="Category cover" fill className="object-cover" unoptimized />
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
        <span>{previewUrl ? "Replace image" : "Upload image"}</span>
        <UploadCloud className="ml-auto h-4 w-4 opacity-40" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          prepareImageFile(file)
            .then(onFileSelected)
            .catch((err) => notify.error(err instanceof ImageUploadError ? err.message : "Could not process image"));
        }}
      />
    </div>
  );
}

export function BlogCategoryForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: Props) {
  const [imageFile,     setImageFile]     = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState(defaultValues?.coverImageUrl || "");
  const [slugTouched,   setSlugTouched]   = useState(false);
  const [status,        setStatus]        = useState(defaultValues?.status || "Active");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CreateBlogCategorySchema>({
    resolver: zodResolver(createBlogCategorySchema),
    defaultValues: {
      name:        defaultValues?.name        || "",
      slug:        defaultValues?.slug        || "",
      description: defaultValues?.description || "",
    },
  });

  const watchedName = watch("name");
  useEffect(() => {
    if (!slugTouched) setValue("slug", toSlug(watchedName || ""));
  }, [watchedName]);

  const handleFormSubmit = async (values: CreateBlogCategorySchema) => {
    const fd = new FormData();
    fd.append("Name", values.name);
    fd.append("Slug", values.slug);
    if (values.description) fd.append("Description", values.description);
    if (mode === "edit") fd.append("Status", status);
    if (imageFile) fd.append("CoverImage", imageFile, imageFile.name);
    await onSubmit(fd);
  };

  const selectCls = cn(
    "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
    "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition"
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="e.g. AI & Machine Learning"
          className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
        <Input
          id="slug"
          {...register("slug")}
          onChange={(e) => { setSlugTouched(true); register("slug").onChange(e); }}
          placeholder="ai-machine-learning"
          className={errors.slug ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register("description")}
          rows={3}
          placeholder="Brief description of this category…"
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
            "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none"
          )}
        />
      </div>

      {/* Status — edit mode only, new categories default to Active */}
      {mode === "edit" && (
        <div className="space-y-1.5">
          <Label>Status</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={selectCls}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      )}

      {/* Image */}
      <ImagePickerField
        existingUrl={existingImage}
        imageFile={imageFile}
        onFileSelected={setImageFile}
        onClear={() => { setImageFile(null); setExistingImage(""); }}
      />

      <Separator />
      <div className="flex items-center justify-end gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? (mode === "create" ? "Creating…" : "Saving…")
            : (mode === "create" ? "Create Category" : "Save Changes")}
        </Button>
      </div>
    </form>
  );
}
