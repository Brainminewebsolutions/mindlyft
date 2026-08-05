"use client";

import { useRef, useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { notify } from "@/lib/notify";
import { toSlug } from "@/lib/slug";
import { ImageIcon, UploadCloud, X } from "lucide-react";
import { createWebinarSchema, type CreateWebinarSchema } from "@/validators/admin/webinar";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";
import type { Webinar } from "@/types/admin/webinar";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import { employeeService } from "@/services/admin/employeeService";
import { LANGUAGES } from "@/constants/languages";

type EmployeeOption = { id: string; name: string };

function useActiveEmployees() {
  const [options, setOptions] = useState<EmployeeOption[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    employeeService.list({ status: "ACTIVE", limit: 200 })
      .then((data) => setOptions(data.employees.map((e) => ({ id: e.id, name: e.name }))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { options, loading };
}

function ImagePickerField({
  existingUrl, imageFile, onFileSelected, onClear,
}: {
  existingUrl: string; imageFile: File | null;
  onFileSelected: (f: File) => void; onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState("");
  useEffect(() => {
    if (!imageFile) { setBlobUrl(""); return; }
    const url = URL.createObjectURL(imageFile);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);
  const preview = blobUrl || existingUrl;
  return (
    <div className="space-y-2">
      <Label>Image</Label>
      {preview && (
        <div className="relative inline-block">
          <div className="relative h-32 w-52 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={preview} alt="preview" fill className="object-cover" unoptimized />
          </div>
          <button type="button" onClick={onClear}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      <button type="button" onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground",
          "transition hover:border-primary/50 hover:bg-muted/60"
        )}>
        <ImageIcon className="h-4 w-4" />
        <span>{preview ? "Replace image" : "Upload image"}</span>
        <UploadCloud className="ml-auto h-4 w-4 opacity-40" />
      </button>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          prepareImageFile(f)
            .then(onFileSelected)
            .catch((err) => notify.error(err instanceof ImageUploadError ? err.message : "Could not process image"));
        }} />
    </div>
  );
}

type Props = {
  mode:           "create" | "edit";
  defaultValues?: Partial<Webinar>;
  onSubmit:       (data: FormData) => Promise<void>;
  onCancel:       () => void;
  isLoading?:     boolean;
};

export function WebinarForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: Props) {
  const [imageFile,     setImageFile]     = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState(defaultValues?.image ?? "");
  const { options: employees, loading: loadingEmployees } = useActiveEmployees();

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<CreateWebinarSchema>({
    resolver: zodResolver(createWebinarSchema),
    defaultValues: {
      name:             defaultValues?.name             ?? "",
      slug:             defaultValues?.slug             ?? "",
      duration:         defaultValues?.duration         ?? undefined,
      mode:             defaultValues?.mode             ?? undefined,
      description:      defaultValues?.description      ?? "",
      price:            defaultValues?.price            ?? undefined,
      instructor:       defaultValues?.instructor       ?? "",
      language:         defaultValues?.language         ?? undefined,
      subscriptionType: defaultValues?.subscriptionType ?? undefined,
      status:           (defaultValues?.status as "Active" | "Inactive" | "Pending" | "Upcoming") ?? "Active",
      discount:         defaultValues?.discount         ?? undefined,
      type:             defaultValues?.type             ?? undefined,
      category:         defaultValues?.category         ?? "",
      date:             defaultValues?.date             ?? "",
      time:             defaultValues?.time             ?? "",
      link:             defaultValues?.link             ?? "",
      address:          defaultValues?.address          ?? "",
    },
  });

  const watchedMode             = watch("mode");
  const watchedSubscriptionType = useWatch({ control, name: "subscriptionType" });
  const watchedName             = useWatch({ control, name: "name" });
  const isFree                  = watchedSubscriptionType === "Free";

  useEffect(() => {
    if (isFree) setValue("price", 0);
  }, [isFree, setValue]);

  useEffect(() => {
    setValue("slug", toSlug(watchedName || ""));
  }, [watchedName, setValue]);

  const selectCls = cn(
    "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
    "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition"
  );

  const handleFormSubmit = async (values: CreateWebinarSchema) => {
    const fd = new FormData();
    fd.append("name",             values.name);
    fd.append("slug",             values.slug);
    fd.append("duration",         String(values.duration));
    fd.append("mode",             values.mode);
    fd.append("price",            values.subscriptionType === "Free" ? "0" : String(values.price ?? 0));
    fd.append("instructor",       values.instructor);
    fd.append("language",         values.language);
    fd.append("subscriptionType", values.subscriptionType);
    fd.append("status",           values.status);
    fd.append("type",             values.type);
    fd.append("date",             values.date);
    fd.append("time",             values.time);
    if (values.description) fd.append("description", values.description);
    if (values.category)    fd.append("category",    values.category);
    if (values.discount !== undefined) fd.append("discount", String(values.discount));
    if (values.link)        fd.append("link",        values.link);
    if (values.address)     fd.append("address",     values.address);
    if (imageFile) fd.append("image", imageFile, imageFile.name);
    await onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
        <Input id="name" {...register("name")} placeholder="e.g. React Deep Dive Workshop"
          className={errors.name ? "border-destructive" : ""} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      {/* Slug — auto-generated from Name, not directly editable */}
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
        <Input id="slug" {...register("slug")}
          readOnly
          placeholder="react-deep-dive-workshop"
          className={cn("cursor-not-allowed bg-muted text-muted-foreground", errors.slug ? "border-destructive" : "")} />
        <p className="text-xs text-muted-foreground">Auto-generated from the name.</p>
        {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
      </div>

      {/* Type + Mode */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Type <span className="text-destructive">*</span></Label>
          <select {...register("type")} className={cn(selectCls, errors.type ? "border-destructive" : "")}>
            <option value="">Select type</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
          </select>
          {errors.type && <p className="text-xs text-destructive">{errors.type.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Mode <span className="text-destructive">*</span></Label>
          <select {...register("mode")} className={cn(selectCls, errors.mode ? "border-destructive" : "")}>
            <option value="">Select mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          {errors.mode && <p className="text-xs text-destructive">{errors.mode.message}</p>}
        </div>
      </div>

      {/* Online link / Offline address */}
      {watchedMode === "Online" && (
        <div className="space-y-1.5">
          <Label htmlFor="link">Session Link</Label>
          <Input id="link" type="url" {...register("link")}
            placeholder="https://meet.google.com/..."
            className={errors.link ? "border-destructive" : ""} />
          {errors.link && <p className="text-xs text-destructive">{errors.link.message}</p>}
        </div>
      )}
      {watchedMode === "Offline" && (
        <div className="space-y-1.5">
          <Label htmlFor="address">Venue Address</Label>
          <textarea id="address" {...register("address")} rows={2}
            placeholder="e.g. 3rd Floor, Tech Park, Pune 411001"
            className={cn(
              "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
              "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none",
              errors.address ? "border-destructive" : ""
            )} />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>
      )}

      {/* Date + Time */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="date">Date <span className="text-destructive">*</span></Label>
          <Input id="date" type="date" {...register("date")}
            className={errors.date ? "border-destructive" : ""} />
          {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="time">Time <span className="text-destructive">*</span></Label>
          <Input id="time" type="time" {...register("time")}
            className={errors.time ? "border-destructive" : ""} />
          {errors.time && <p className="text-xs text-destructive">{errors.time.message}</p>}
        </div>
      </div>

      {/* Subscription + Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Subscription <span className="text-destructive">*</span></Label>
          <select {...register("subscriptionType")} className={cn(selectCls, errors.subscriptionType ? "border-destructive" : "")}>
            <option value="">Select</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          {errors.subscriptionType && <p className="text-xs text-destructive">{errors.subscriptionType.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Status <span className="text-destructive">*</span></Label>
          <select {...register("status")} className={cn(selectCls, errors.status ? "border-destructive" : "")}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Upcoming">Upcoming</option>
          </select>
          {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
        </div>
      </div>

      {/* Duration + Price (Price hidden when Free) */}
      <div className={cn("grid grid-cols-1 gap-4", isFree ? "" : "sm:grid-cols-2")}>
        <div className="space-y-1.5">
          <Label htmlFor="duration">Duration (hours) <span className="text-destructive">*</span></Label>
          <Input id="duration" type="number" step="0.5" min="0.5"
            {...register("duration", { valueAsNumber: true })}
            placeholder="e.g. 2"
            className={errors.duration ? "border-destructive" : ""} />
          {errors.duration && <p className="text-xs text-destructive">{errors.duration.message}</p>}
        </div>
        {!isFree && (
          <div className="space-y-1.5">
            <Label htmlFor="price">Price (₹) <span className="text-destructive">*</span></Label>
            <Input id="price" type="number" min="0" step="1"
              {...register("price", { valueAsNumber: true })}
              placeholder="e.g. 999"
              className={errors.price ? "border-destructive" : ""} />
            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
          </div>
        )}
      </div>

      {/* Language + Discount */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Language <span className="text-destructive">*</span></Label>
          <select {...register("language")} className={cn(selectCls, errors.language ? "border-destructive" : "")}>
            <option value="">Select language</option>
            {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          {errors.language && <p className="text-xs text-destructive">{errors.language.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input id="discount" type="number" min="0" max="100" step="0.5"
            {...register("discount", { valueAsNumber: true })}
            placeholder="e.g. 10"
            className={errors.discount ? "border-destructive" : ""} />
          {errors.discount && <p className="text-xs text-destructive">{errors.discount.message}</p>}
        </div>
      </div>

      {/* Instructor */}
      <div className="space-y-1.5">
        <Label>Instructor <span className="text-destructive">*</span></Label>
        <select {...register("instructor")} disabled={loadingEmployees}
          className={cn(selectCls, errors.instructor ? "border-destructive" : "", loadingEmployees ? "opacity-60" : "")}>
          <option value="">{loadingEmployees ? "Loading…" : "Select instructor"}</option>
          {employees.map((e) => <option key={e.id} value={e.name}>{e.name}</option>)}
        </select>
        {errors.instructor && <p className="text-xs text-destructive">{errors.instructor.message}</p>}
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="category">Category</Label>
        <Input id="category" {...register("category")} placeholder="e.g. Data Science, Design" />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <textarea id="description" {...register("description")} rows={3}
          placeholder="What will attendees learn…"
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
            "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none"
          )} />
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
            : (mode === "create" ? "Create" : "Save Changes")}
        </Button>
      </div>
    </form>
  );
}
