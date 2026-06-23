"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  createTestimonialSchema,
  updateTestimonialSchema,
  type CreateTestimonialSchema,
} from "@/validators/admin/testimonial";
import type { Testimonial } from "@/types/admin/testimonial";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageIcon, VideoIcon, UploadCloud, X } from "lucide-react";

type FormValues = CreateTestimonialSchema;

type Props = {
  mode:           "create" | "edit";
  defaultValues?: Partial<Testimonial>;
  onSubmit:       (data: FormData) => Promise<void>;
  onCancel:       () => void;
  isLoading?:     boolean;
};

const ACCENT_PRESETS = [
  "#6c63ff", "#7c3aed", "#0ea5e9", "#f59e0b",
  "#10b981", "#ef4444", "#ec4899", "#f97316",
];

function FilePickerField({
  label,
  accept,
  previewUrl,
  onFileChange,
  onClear,
  icon: Icon,
  previewType,
}: {
  label:        string;
  accept:       string;
  previewUrl:   string;
  onFileChange: (file: File) => void;
  onClear:      () => void;
  icon:         React.ComponentType<{ className?: string }>;
  previewType:  "image" | "video";
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {previewUrl && (
        <div className="relative inline-block">
          {previewType === "image" ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-muted">
              <Image src={previewUrl} alt={label} fill className="object-cover" unoptimized />
            </div>
          ) : (
            <video
              src={previewUrl}
              className="h-20 w-full rounded-xl border border-border bg-black object-cover"
              controls={false}
              muted
            />
          )}
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
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground transition hover:border-primary/50 hover:bg-muted/60"
      >
        <Icon className="h-4 w-4" />
        <span>{previewUrl ? "Replace file" : `Upload ${label.toLowerCase()}`}</span>
        <UploadCloud className="ml-auto h-4 w-4 opacity-40" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileChange(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}

export function TestimonialForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: Props) {
  const schema = mode === "create" ? createTestimonialSchema : updateTestimonialSchema;

  const [avatarFile,    setAvatarFile]    = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(defaultValues?.avatar || "");
  const [videoFile,     setVideoFile]     = useState<File | null>(null);
  const [videoPreview,  setVideoPreview]  = useState(defaultValues?.video  || "");
  const [accent,        setAccent]        = useState(defaultValues?.accent  || "#6c63ff");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      type:        (defaultValues?.type as "text" | "video") ?? "text",
      name:        defaultValues?.name        ?? "",
      designation: defaultValues?.designation ?? "",
      quote:       defaultValues?.quote       ?? "",
      review:      defaultValues?.review      ?? "",
      rating:      defaultValues?.rating      ?? 5,
      tag:         defaultValues?.tag         ?? "",
      accent:      defaultValues?.accent      ?? "#6c63ff",
      status:      (defaultValues?.status as "ACTIVE" | "INACTIVE") ?? "ACTIVE",
      order:       defaultValues?.order       ?? 0,
    },
  });

  const selectedType  = watch("type");
  const watchName     = watch("name")        ?? "";
  const watchDesig    = watch("designation") ?? "";
  const watchQuote    = watch("quote")       ?? "";
  const watchReview   = watch("review")      ?? "";
  const watchTag      = watch("tag")         ?? "";

  const handleAvatarPick = (file: File) => {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };
  const handleAvatarClear = () => { setAvatarFile(null); setAvatarPreview(""); };

  const handleVideoPick = (file: File) => {
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };
  const handleVideoClear = () => { setVideoFile(null); setVideoPreview(""); };

  const handleAccentChange = (color: string) => { setAccent(color); setValue("accent", color); };

  const handleFormSubmit = async (values: FormValues) => {
    const fd = new FormData();
    fd.append("type",   values.type);
    fd.append("name",   values.name);
    if (values.designation) fd.append("designation", values.designation);
    if (values.quote)        fd.append("quote",       values.quote);
    if (values.review)       fd.append("review",      values.review);
    fd.append("rating", String(values.rating));
    if (values.tag)    fd.append("tag",    values.tag);
    if (values.accent) fd.append("accent", values.accent);
    fd.append("status", values.status ?? "ACTIVE");
    fd.append("order",  String(values.order ?? 0));

    if (avatarFile)         fd.append("avatar", avatarFile);
    else if (avatarPreview) fd.append("avatar", avatarPreview);

    if (videoFile)         fd.append("video", videoFile);
    else if (videoPreview) fd.append("video", videoPreview);

    await onSubmit(fd);
  };

  const selectCls = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition";
  const fieldErr  = (msg?: string) => msg ? <p className="text-xs text-destructive">{msg}</p> : null;
  const charCount = (current: number, max: number) => (
    <p className={`text-right text-xs ${current > max ? "text-destructive" : "text-muted-foreground"}`}>
      {current}/{max}
    </p>
  );

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {isSubmitted && errorCount > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Please fix the {errorCount} error{errorCount > 1 ? "s" : ""} highlighted below before submitting.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left: main info */}
        <div className="space-y-5 lg:col-span-2">

          <SectionCard title="Basic Info" description="Name, role, and type of testimonial">
            <div className="space-y-1.5">
              <Label htmlFor="type">Type <span className="text-destructive">*</span></Label>
              <select id="type" {...register("type")} className={selectCls}>
                <option value="text">Text Review</option>
                <option value="video">Video Review</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="e.g. Sarah Mitchell"
                  className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                <div className="flex items-center justify-between">
                  {fieldErr(errors.name?.message) ?? <span />}
                  {charCount(watchName.length, 100)}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" {...register("designation")} placeholder="e.g. CTO, NovaTech Inc." />
                <div className="flex items-center justify-between">
                  {fieldErr(errors.designation?.message) ?? <span />}
                  {charCount(watchDesig.length, 80)}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tag">Category Tag</Label>
              <Input id="tag" {...register("tag")} placeholder="e.g. AI Services, Learning" />
              <div className="flex items-center justify-between">
                {fieldErr(errors.tag?.message) ?? <span />}
                {charCount(watchTag.length, 40)}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Content" description={selectedType === "video" ? "Quote shown over the video" : "Full review text"}>
            {selectedType === "video" ? (
              <div className="space-y-1.5">
                <Label htmlFor="quote">Video Quote</Label>
                <textarea
                  id="quote"
                  {...register("quote")}
                  rows={3}
                  placeholder="Short quote shown when the video is hovered…"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-y"
                />
                <div className="flex items-center justify-between">
                  {fieldErr(errors.quote?.message) ?? <span />}
                  {charCount(watchQuote.length, 150)}
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label htmlFor="review">Full Review</Label>
                <textarea
                  id="review"
                  {...register("review")}
                  rows={6}
                  placeholder="Write the full testimonial text…"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-y"
                />
                <div className="flex items-center justify-between">
                  {fieldErr(errors.review?.message) ?? <span />}
                  {charCount(watchReview.length, 500)}
                </div>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Right: media + settings */}
        <div className="space-y-5">

          <SectionCard title="Media" description="Avatar photo and optional video">
            <FilePickerField
              label="Avatar Photo"
              accept="image/jpeg,image/png,image/webp"
              previewUrl={avatarPreview}
              onFileChange={handleAvatarPick}
              onClear={handleAvatarClear}
              icon={ImageIcon}
              previewType="image"
            />

            {selectedType === "video" && (
              <FilePickerField
                label="Video"
                accept="video/mp4,video/webm,video/ogg"
                previewUrl={videoPreview}
                onFileChange={handleVideoPick}
                onClear={handleVideoClear}
                icon={VideoIcon}
                previewType="video"
              />
            )}
          </SectionCard>

          <SectionCard title="Settings" description="Rating, accent colour, display order">
            <div className="space-y-1.5">
              <Label htmlFor="rating">Rating (1–5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                {...register("rating", { valueAsNumber: true })}
              />
              {fieldErr(errors.rating?.message)}
            </div>

            <div className="space-y-2">
              <Label>Accent Colour</Label>
              <input type="hidden" {...register("accent")} value={accent} />
              <div className="flex flex-wrap gap-2">
                {ACCENT_PRESETS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleAccentChange(c)}
                    className="h-7 w-7 rounded-full border-2 transition"
                    style={{
                      background:   c,
                      borderColor:  accent === c ? "#fff" : "transparent",
                      outline:      accent === c ? `2px solid ${c}` : "none",
                      outlineOffset: 2,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => handleAccentChange(e.target.value)}
                  className="h-7 w-7 cursor-pointer rounded border border-border bg-transparent"
                />
                <span className="text-xs text-muted-foreground">{accent}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  min={0}
                  {...register("order", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <select id="status" {...register("status")} className={selectCls}>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? (mode === "create" ? "Creating…" : "Saving…")
            : (mode === "create" ? "Create Testimonial" : "Save Changes")}
        </Button>
      </div>
    </form>
  );
}
