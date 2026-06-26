"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { ImageIcon, UploadCloud, X } from "lucide-react";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import type { CourseCategory } from "@/types/admin/courseCategory";

const schema = z.object({
  name:        z.string().min(1, "Name is required"),
  description: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

type Props = {
  mode:           "create" | "edit";
  defaultValues?: Partial<CourseCategory>;
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
      <Label>Image</Label>
      {previewUrl && (
        <div className="relative inline-block">
          <div className="relative h-32 w-52 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={previewUrl} alt="Category image" fill className="object-cover" unoptimized />
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
          if (file) onFileSelected(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function CourseCategoryForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: Props) {
  const [imageFile,     setImageFile]     = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState(defaultValues?.image || "");

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        defaultValues?.name        || "",
      description: defaultValues?.description || "",
    },
  });

  const handleFormSubmit = async (values: FormValues) => {
    const fd = new FormData();
    fd.append("name", values.name);
    if (values.description) fd.append("description", values.description);
    if (imageFile) {
      fd.append("image", imageFile, imageFile.name);
    } else if (existingImage) {
      fd.append("imageUrl", existingImage);
    }
    await onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="e.g. Programming"
          className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
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
