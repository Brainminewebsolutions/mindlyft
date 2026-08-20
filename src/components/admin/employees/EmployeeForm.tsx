"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { notify } from "@/lib/notify";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  type CreateEmployeeSchema,
} from "@/validators/admin/employee";
import type { Resolver } from "react-hook-form";
import type { Employee } from "@/types/admin/employee";
import { EMPLOYEE_CATEGORIES, EMPLOYEE_DEPARTMENTS } from "@/constants/employee";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import { ImageIcon, VideoIcon, UploadCloud, X } from "lucide-react";

type FormValues = CreateEmployeeSchema & { status?: "ACTIVE" | "INACTIVE" | "SUSPENDED" };

type Props = {
  mode:           "create" | "edit";
  defaultValues?: Partial<Employee>;
  onSubmit:       (data: FormData) => Promise<void>;
  onCancel:       () => void;
  isLoading?:     boolean;
};

const CATEGORIES  = EMPLOYEE_CATEGORIES;
const DEPARTMENTS = EMPLOYEE_DEPARTMENTS;

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
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground",
          "transition hover:border-primary/50 hover:bg-muted/60"
        )}
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
          e.target.value = "";
          if (!file) return;
          if (previewType !== "image") { onFileChange(file); return; }
          prepareImageFile(file)
            .then(onFileChange)
            .catch((err) => notify.error(err instanceof ImageUploadError ? err.message : "Could not process image"));
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

export function EmployeeForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: Props) {
  const schema = mode === "create" ? createEmployeeSchema : updateEmployeeSchema;

  const [photoFile,    setPhotoFile]    = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState(defaultValues?.avatar || "");
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const [videoFile,    setVideoFile]    = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState(defaultValues?.video  || "");
  const [videoRemoved, setVideoRemoved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      name:         defaultValues?.name         || "",
      email:        defaultValues?.email        || "",
      phone:        defaultValues?.phone        || "",
      category:     defaultValues?.category     || "",
      department:   defaultValues?.department   || "",
      designation:  defaultValues?.designation  || "",
      description:  defaultValues?.description  || "",
      displayOrder: defaultValues?.displayOrder ?? 0,
      password:     "",
    },
  });

  const handlePhotoPick  = (file: File) => { setPhotoFile(file); setPhotoPreview(URL.createObjectURL(file)); setPhotoRemoved(false); };
  const handlePhotoClear = () => { setPhotoFile(null); setPhotoPreview(""); setPhotoRemoved(true); };

  const handleVideoPick  = (file: File) => { setVideoFile(file); setVideoPreview(URL.createObjectURL(file)); setVideoRemoved(false); };
  const handleVideoClear = () => { setVideoFile(null); setVideoPreview(""); setVideoRemoved(true); };

  const handleFormSubmit = async (values: FormValues) => {
    const fd = new FormData();
    fd.append("name",  values.name ?? "");
    fd.append("email", values.email ?? "");
    // Always send these — even empty — so clearing a previously-set value in
    // edit mode actually clears it instead of the field just being omitted
    // (which the backend treats as "leave the existing value alone").
    fd.append("phone",       values.phone       ?? "");
    fd.append("category",    values.category    ?? "");
    fd.append("department",  values.department  ?? "");
    fd.append("designation", values.designation ?? "");
    fd.append("description", values.description ?? "");
    if (values.password)              fd.append("password",    values.password);
    if (values.status)                fd.append("status",      values.status);
    if (values.displayOrder !== undefined) fd.append("displayOrder", String(values.displayOrder));

    if (photoFile)         fd.append("avatar", photoFile);
    else if (photoRemoved) fd.append("removeAvatar", "true");
    // else: no new file and not removed -> omit the field so the backend keeps the existing avatar

    if (videoFile)         fd.append("video", videoFile);
    else if (videoRemoved) fd.append("removeVideo", "true");
    // else: no new file and not removed -> omit the field so the backend keeps the existing video

    await onSubmit(fd);
  };

  const selectCls = cn(
    "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
    "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition"
  );

  const fieldErr = (msg?: string) =>
    msg ? <p className="text-xs text-destructive">{msg}</p> : null;

  const charCount = (current: number, max: number) => (
    <p className={`text-right text-xs ${current > max ? "text-destructive" : "text-muted-foreground"}`}>
      {current}/{max}
    </p>
  );

  const watchDescription = watch("description") ?? "";

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {isSubmitted && errorCount > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Please fix the {errorCount} error{errorCount > 1 ? "s" : ""} highlighted below before submitting.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left panel */}
        <div className="space-y-5 lg:col-span-2">

          <SectionCard title="Personal Information" description="Basic contact details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {fieldErr(errors.name?.message)}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="john@mindlyftai.com"
                  className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {fieldErr(errors.email?.message)}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} placeholder="+91 98765 43210" />
              {fieldErr(errors.phone?.message)}
            </div>
          </SectionCard>

          <SectionCard title="Work Details" description="Role and department information">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <select id="category" {...register("category")} className={selectCls}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="department">Department</Label>
                <select id="department" {...register("department")} className={selectCls}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  {...register("designation")}
                  placeholder="e.g. Senior Developer"
                  className={errors.designation ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {fieldErr(errors.designation?.message)}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  min={0}
                  {...register("displayOrder", { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                maxLength={350}
                placeholder="Brief bio or role description…"
                className={cn(
                  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
                  "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none",
                  errors.description ? "border-destructive focus:ring-destructive" : ""
                )}
              />
              <div className="flex items-center justify-between">
                {fieldErr(errors.description?.message) ?? <span />}
                {charCount(watchDescription.length, 350)}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right panel */}
        <div className="space-y-5">

          <SectionCard title="Media" description="Profile photo and intro video">
            <FilePickerField
              label="Photo"
              accept="image/jpeg,image/png,image/webp,image/gif"
              previewUrl={photoPreview}
              onFileChange={handlePhotoPick}
              onClear={handlePhotoClear}
              icon={ImageIcon}
              previewType="image"
            />
            <FilePickerField
              label="Video"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              previewUrl={videoPreview}
              onFileChange={handleVideoPick}
              onClear={handleVideoClear}
              icon={VideoIcon}
              previewType="video"
            />
          </SectionCard>

          <SectionCard title="Account" description="Login credentials and access">
            <div className="space-y-1.5">
              <Label htmlFor="password">
                {mode === "create" ? "Password" : "New Password"}
              </Label>
              <Input
                id="password"
                {...register("password")}
                type="password"
                placeholder="Leave blank to skip — min 8 chars, 1 uppercase, 1 number"
                className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {fieldErr(errors.password?.message)}
            </div>

            {mode === "edit" && (
              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  {...register("status")}
                  defaultValue={defaultValues?.status}
                  className={selectCls}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            )}
          </SectionCard>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? (mode === "create" ? "Creating…" : "Saving…")
            : (mode === "create" ? "Create Employee" : "Save Changes")}
        </Button>
      </div>
    </form>
  );
}
