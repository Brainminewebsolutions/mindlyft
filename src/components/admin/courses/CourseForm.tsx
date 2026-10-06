"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { notify } from "@/lib/notify";
import { toSlug } from "@/lib/slug";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";
import {
  createCourseSchema,
  type CreateCourseSchema,
} from "@/validators/admin/course";
import type { Course } from "@/types/admin/course";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import { ImageIcon, Plus, UploadCloud, X } from "lucide-react";
import { employeeService }          from "@/services/admin/employeeService";
import { courseCategoryService }    from "@/services/admin/courseCategoryService";
import type { CourseCategory }      from "@/types/admin/courseCategory";
import { LANGUAGES }               from "@/constants/languages";
import { COURSE_STATUSES }         from "@/constants/course";

// ─── Instructor dropdown ───────────────────────────────────────────────────────
type EmployeeOption = { id: string; employeeId: number; name: string; designation?: string; category: string };

const INSTRUCTOR_CATEGORIES = ["Instructor", "IIT Instructor", "Upskill"] as const;

function useActiveEmployees() {
  const [options, setOptions] = useState<EmployeeOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeeService.list({ status: "ACTIVE", limit: 200 })
      .then((data) =>
        setOptions(
          data.employees
            .map((e) => ({
              id:          e.id,
              employeeId:  e.employeeId,
              name:        e.name,
              designation: e.designation,
              category:    INSTRUCTOR_CATEGORIES.find((c) => c.toLowerCase() === e.category?.trim().toLowerCase()) ?? "",
            }))
            .filter((e) => e.category !== "")
        )
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { options, loading };
}

// ─── Course categories dropdown ───────────────────────────────────────────────
function useCourseCategories() {
  const [options, setOptions] = useState<CourseCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseCategoryService.list({ status: "Active" })
      .then((data) => setOptions(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { options, loading };
}

type Props = {
  mode:           "create" | "edit";
  defaultValues?: Partial<Course>;
  onSubmit:       (data: FormData) => Promise<void>;
  onCancel:       () => void;
  isLoading?:     boolean;
};

// ─── Image file picker (no pre-upload — file goes with the form submission) ────
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

  // Create/revoke a local object URL for the selected file preview
  useEffect(() => {
    if (!imageFile) { setBlobUrl(""); return; }
    const url = URL.createObjectURL(imageFile);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const previewUrl = blobUrl || existingUrl;

  return (
    <div className="space-y-2">
      <Label>Course Image</Label>

      {previewUrl && (
        <div className="relative inline-block">
          <div className="relative h-32 w-52 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={previewUrl} alt="Course cover" fill className="object-cover" unoptimized />
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
        <span>{previewUrl ? "Replace image" : "Upload course image"}</span>
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

// ─── Public page content (sent to the API as one JSON field) ───────────────────
const CHIP_ICONS = ["briefcase", "shield", "user", "graduation", "refresh"] as const;

const textareaCls = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
  "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-y"
);

const removeBtnCls =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:border-destructive hover:text-destructive transition";

function AddRowButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
      <Plus className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

// Repeatable "short title + longer text" rows — used for audience cards and FAQs.
function PairListField<A extends string, B extends string>({
  label, items, onChange, titleKey, textKey, titlePlaceholder, textPlaceholder, addLabel,
}: {
  label:            string;
  items:            Record<A | B, string>[];
  onChange:         (items: Record<A | B, string>[]) => void;
  titleKey:         A;
  textKey:          B;
  titlePlaceholder: string;
  textPlaceholder:  string;
  addLabel:         string;
}) {
  const update = (i: number, key: A | B, value: string) =>
    onChange(items.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <Input
                value={item[titleKey]}
                onChange={(e) => update(i, titleKey, e.target.value)}
                placeholder={titlePlaceholder}
              />
              <textarea
                value={item[textKey]}
                onChange={(e) => update(i, textKey, e.target.value)}
                rows={2}
                placeholder={textPlaceholder}
                className={textareaCls}
              />
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className={removeBtnCls}>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <AddRowButton
        label={addLabel}
        onClick={() => onChange([...items, { [titleKey]: "", [textKey]: "" } as Record<A | B, string>])}
      />
    </div>
  );
}

// ─── Titled group of related fields ────────────────────────────────────────────
function FormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border border-border p-5 odd:bg-muted even:bg-primary/5 [&_input]:bg-card [&_select]:bg-card [&_textarea]:bg-card">
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}

// ─── Main form ─────────────────────────────────────────────────────────────────
export function CourseForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: Props) {
  const [imageFile,     setImageFile]     = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState(defaultValues?.image || "");
  const [highlights,    setHighlights]    = useState<string[]>(defaultValues?.highlights ?? []);
  const page = defaultValues?.pageContent;
  const [metaTitle,       setMetaTitle]       = useState(defaultValues?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(defaultValues?.metaDescription ?? "");
  const [outcomesText,    setOutcomesText]    = useState(page?.outcomesText ?? "");
  const [audience,        setAudience]        = useState(page?.audience ?? []);
  const [cardChips,       setCardChips]       = useState(
    (page?.cardChips ?? []).map((c) => ({ label: c.label, icon: c.icon ?? "" }))
  );
  const [careerRoles,     setCareerRoles]     = useState<string[]>(page?.careerRoles ?? []);
  const [careersNote,     setCareersNote]     = useState(page?.careersNote ?? "");
  const [faqs,            setFaqs]            = useState(page?.faqs ?? []);
  // In edit mode the course already has a slug — treat it as "touched" so the
  // name-watcher effect below doesn't silently regenerate (and clobber) it on load.
  const [slugTouched,   setSlugTouched]   = useState(mode === "edit" && !!defaultValues?.slug);

  const { options: employeeOptions,  loading: loadingEmployees }  = useActiveEmployees();
  const { options: categoryOptions, loading: loadingCategories } = useCourseCategories();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name:        defaultValues?.name        || "",
      slug:        defaultValues?.slug        || "",
      duration:    defaultValues?.duration    ?? undefined,
      mode:        defaultValues?.mode        || undefined,
      image:       "",
      description: defaultValues?.description || "",
      price:       defaultValues?.price       ?? undefined,
      instructorId: defaultValues?.instructorId ?? undefined,
      language:    defaultValues?.language    || "",
      courseType:  defaultValues?.courseType  || undefined,
      status:      defaultValues?.status      || "ACTIVE",
      discount:     defaultValues?.discount     ?? undefined,
      category:     defaultValues?.category     || "",
      displayOrder: defaultValues?.displayOrder ?? 0,
      accessMonths: defaultValues?.accessMonths ?? undefined,
    },
  });

  useEffect(() => {
    if (!loadingEmployees && defaultValues?.instructorId)
      setValue("instructorId", defaultValues.instructorId);
  }, [loadingEmployees]);

  useEffect(() => {
    if (!loadingCategories && defaultValues?.category)
      setValue("category", defaultValues.category);
  }, [loadingCategories]);

  const watchedName = watch("name");
  useEffect(() => {
    if (!slugTouched) setValue("slug", toSlug(watchedName || ""));
  }, [watchedName]);

  const handleFormSubmit = async (formValues: CreateCourseSchema) => {
    const fd = new FormData();
    fd.append("name",       formValues.name);
    fd.append("slug",       formValues.slug);
    fd.append("duration",   String(formValues.duration));
    fd.append("mode",       formValues.mode);
    fd.append("price",      String(formValues.price));
    if (formValues.instructorId !== undefined) fd.append("instructorId", String(formValues.instructorId));
    fd.append("language",   formValues.language);
    if (formValues.description)                  fd.append("description", formValues.description);
    fd.append("courseType", formValues.courseType);
    if (formValues.status)                        fd.append("status",       formValues.status);
    if (formValues.discount !== undefined)        fd.append("discount",     String(formValues.discount));
    if (formValues.category)                      fd.append("category",     formValues.category);
    if (formValues.displayOrder !== undefined)    fd.append("displayOrder", String(formValues.displayOrder));
    if (formValues.accessMonths !== undefined)    fd.append("accessMonths", String(formValues.accessMonths));

    if (imageFile) {
      fd.append("image", imageFile, imageFile.name);
    } else if (existingImage) {
      fd.append("imageUrl", existingImage);
    }

    highlights.filter(h => h.trim()).forEach(h => fd.append("highlights", h.trim()));

    if (metaTitle.trim())       fd.append("metaTitle",       metaTitle.trim());
    if (metaDescription.trim()) fd.append("metaDescription", metaDescription.trim());

    // Always sent, so removing rows in the form clears them on the server too.
    fd.append("pageContentJson", JSON.stringify({
      outcomesText: outcomesText.trim() || null,
      audience:     audience
        .map((a) => ({ title: a.title.trim(), description: a.description.trim() }))
        .filter((a) => a.title),
      cardChips:    cardChips
        .map((c) => ({ label: c.label.trim(), icon: c.icon || null }))
        .filter((c) => c.label),
      careerRoles:  careerRoles.map((r) => r.trim()).filter(Boolean),
      careersNote:  careersNote.trim() || null,
      faqs:         faqs
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
        .filter((f) => f.question),
    }));

    await onSubmit(fd);
  };

  const selectCls = cn(
    "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
    "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition"
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">

      {/* ── Basic information ── */}
      <FormSection title="Basic Information" description="How the course is named, addressed and listed.">
        <div className="space-y-1.5">
          <Label htmlFor="name">Course Name <span className="text-destructive">*</span></Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="e.g. Full Stack Web Development"
            className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
          <Input
            id="slug"
            {...register("slug")}
            onChange={(e) => { setSlugTouched(true); register("slug").onChange(e); }}
            placeholder="full-stack-web-development"
            className={errors.slug ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="courseType">Course Type <span className="text-destructive">*</span></Label>
            <select
              id="courseType"
              {...register("courseType")}
              className={cn(selectCls, errors.courseType ? "border-destructive" : "")}
            >
              <option value="">Select type</option>
              <option value="Mindlyftai">Mindlyftai</option>
              <option value="IIT">IIT</option>
            </select>
            {errors.courseType && <p className="text-xs text-destructive">{errors.courseType.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              disabled={loadingCategories}
              className={cn(selectCls, errors.category ? "border-destructive" : "", loadingCategories ? "opacity-60" : "")}
            >
              <option value="">
                {loadingCategories ? "Loading categories…" : "Select category"}
              </option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              {...register("status")}
              className={cn(selectCls, errors.status ? "border-destructive" : "")}
            >
              {COURSE_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
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
      </FormSection>

      {/* ── Format & instructor ── */}
      <FormSection title="Format & Instructor" description="How long the course runs, how it is delivered and who teaches it.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="duration">Duration (hours) <span className="text-destructive">*</span></Label>
            <Input
              id="duration"
              type="number"
              step="0.5"
              min="0.5"
              {...register("duration", { valueAsNumber: true })}
              placeholder="e.g. 40"
              className={errors.duration ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.duration && <p className="text-xs text-destructive">{errors.duration.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mode">Mode <span className="text-destructive">*</span></Label>
            <select
              id="mode"
              {...register("mode")}
              className={cn(selectCls, errors.mode ? "border-destructive" : "")}
            >
              <option value="">Select mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.mode && <p className="text-xs text-destructive">{errors.mode.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="language">Language <span className="text-destructive">*</span></Label>
            <select
              id="language"
              {...register("language")}
              className={cn(selectCls, errors.language ? "border-destructive" : "")}
            >
              <option value="">Select language</option>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            {errors.language && <p className="text-xs text-destructive">{errors.language.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="instructorId">Instructor</Label>
            <select
              id="instructorId"
              {...register("instructorId", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
              disabled={loadingEmployees}
              className={cn(selectCls, errors.instructorId ? "border-destructive" : "", loadingEmployees ? "opacity-60" : "")}
            >
              <option value="">
                {loadingEmployees ? "Loading instructors…" : "No instructor"}
              </option>
              {INSTRUCTOR_CATEGORIES.map((cat) => {
                const group = employeeOptions.filter((emp) => emp.category === cat);
                if (group.length === 0) return null;
                return (
                  <optgroup key={cat} label={cat === "Upskill" ? "UpSkill Instructor" : cat}>
                    {group.map((emp) => (
                      <option key={emp.id} value={emp.employeeId}>
                        {emp.name}{emp.designation ? ` — ${emp.designation}` : ""}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
            {errors.instructorId && <p className="text-xs text-destructive">{errors.instructorId.message}</p>}
          </div>
        </div>
      </FormSection>

      {/* ── Pricing & access ── */}
      <FormSection title="Pricing & Access" description="What the course costs and how long a purchase gives access.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="price">Price (₹) <span className="text-destructive">*</span></Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="1"
              {...register("price", { valueAsNumber: true })}
              placeholder="e.g. 4999"
              className={errors.price ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              step="0.5"
              {...register("discount", { valueAsNumber: true })}
              placeholder="e.g. 10"
              className={errors.discount ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.discount && <p className="text-xs text-destructive">{errors.discount.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="accessMonths">Access (months)</Label>
            <Input
              id="accessMonths"
              type="number"
              min="1"
              step="1"
              {...register("accessMonths", { valueAsNumber: true })}
              placeholder="Leave blank for lifetime"
              className={errors.accessMonths ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.accessMonths && <p className="text-xs text-destructive">{errors.accessMonths.message}</p>}
          </div>
        </div>
      </FormSection>

      {/* ── Description & media ── */}
      <FormSection title="Description & Media" description="The summary, highlights and cover image shown on cards and the course page.">
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            placeholder="What will students learn in this course…"
            className={cn(
              "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
              "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition resize-none",
              errors.description ? "border-destructive focus:ring-destructive" : ""
            )}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          {/* Highlights */}
          <div className="space-y-2">
            <Label>Highlights</Label>
            <div className="space-y-2">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...highlights];
                      updated[i] = e.target.value;
                      setHighlights(updated);
                    }}
                    placeholder={`Highlight ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:border-destructive hover:text-destructive transition"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setHighlights([...highlights, ""])}
              className="flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Add Highlight
            </button>
          </div>

          {/* Image picker */}
          <ImagePickerField
            existingUrl={existingImage}
            imageFile={imageFile}
            onFileSelected={setImageFile}
            onClear={() => { setImageFile(null); setExistingImage(""); }}
          />

        </div>
      </FormSection>

      {/* ── SEO ── */}
      <FormSection title="SEO" description="Shown in search results and the browser tab for this course page.">

        <div className="space-y-1.5">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            maxLength={200}
            placeholder="e.g. AI in Cyber Security Course in Pune | IIT Kanpur Certified"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            maxLength={500}
            rows={2}
            placeholder="One or two sentences describing the course for search results"
            className={textareaCls}
          />
        </div>
      </FormSection>

      {/* ── Course page content ── */}
      <FormSection title="Course Page Content" description="Optional sections for the public course page. Leave a section empty to hide it.">

        <div className="space-y-1.5">
          <Label htmlFor="outcomesText">What You Will Be Able To Do</Label>
          <textarea
            id="outcomesText"
            value={outcomesText}
            onChange={(e) => setOutcomesText(e.target.value)}
            rows={5}
            placeholder="By the end of the programme you can… (leave a blank line between paragraphs)"
            className={textareaCls}
          />
        </div>

        <PairListField
          label="Who This Is For"
          items={audience}
          onChange={setAudience}
          titleKey="title"
          textKey="description"
          titlePlaceholder="Audience, e.g. IT professionals moving into security"
          textPlaceholder="Why this course suits them"
          addLabel="Add Audience"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          {/* Card chips */}
          <div className="space-y-2">
            <Label>Course Card Chips</Label>
            <div className="space-y-2">
              {cardChips.map((chip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={chip.label}
                    onChange={(e) => setCardChips(cardChips.map((c, idx) => (idx === i ? { ...c, label: e.target.value } : c)))}
                    placeholder={`Chip ${i + 1}, e.g. IT Professionals`}
                  />
                  <select
                    value={chip.icon}
                    onChange={(e) => setCardChips(cardChips.map((c, idx) => (idx === i ? { ...c, icon: e.target.value } : c)))}
                    className={cn(selectCls, "w-36 shrink-0")}
                    aria-label="Chip icon"
                  >
                    <option value="">No icon</option>
                    {CHIP_ICONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setCardChips(cardChips.filter((_, idx) => idx !== i))} className={removeBtnCls}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <AddRowButton label="Add Chip" onClick={() => setCardChips([...cardChips, { label: "", icon: "" }])} />
          </div>

          {/* Career roles */}
          <div className="space-y-2">
            <Label>Career Roles</Label>
            <div className="space-y-2">
              {careerRoles.map((role, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={role}
                    onChange={(e) => setCareerRoles(careerRoles.map((r, idx) => (idx === i ? e.target.value : r)))}
                    placeholder={`Role ${i + 1}, e.g. SOC Analyst`}
                  />
                  <button type="button" onClick={() => setCareerRoles(careerRoles.filter((_, idx) => idx !== i))} className={removeBtnCls}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <AddRowButton label="Add Role" onClick={() => setCareerRoles([...careerRoles, ""])} />
          </div>

        </div>

        <div className="space-y-1.5">
          <Label htmlFor="careersNote">Careers Note</Label>
          <textarea
            id="careersNote"
            value={careersNote}
            onChange={(e) => setCareersNote(e.target.value)}
            rows={3}
            placeholder="Paragraph shown below the career roles"
            className={textareaCls}
          />
        </div>

        <PairListField
          label="FAQs"
          items={faqs}
          onChange={setFaqs}
          titleKey="question"
          textKey="answer"
          titlePlaceholder="Question"
          textPlaceholder="Answer"
          addLabel="Add FAQ"
        />
      </FormSection>

      {/* ── Actions ── */}
      <Separator />
      <div className="flex items-center justify-end gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? (mode === "create" ? "Creating…" : "Saving…")
            : (mode === "create" ? "Create Course" : "Save Changes")}
        </Button>
      </div>
    </form>
  );
}
