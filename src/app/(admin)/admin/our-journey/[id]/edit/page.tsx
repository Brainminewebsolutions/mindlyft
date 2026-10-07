"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ourJourneyService } from "@/services/admin/ourJourneyService";
import type { OurJourney, OurJourneyMedia } from "@/types/admin/ourJourney";
import { OUR_JOURNEY_TYPES, OUR_JOURNEY_STATUSES } from "@/constants/ourJourney";
import { prepareImageFile, ImageUploadError } from "@/lib/image-upload";
import { MediaGallery } from "@/components/admin/ourJourney/MediaGallery";

export default function EditOurJourneyPage() {
  const { id }    = useParams<{ id: string }>();
  const router    = useRouter();
  const imageRef  = useRef<HTMLInputElement>(null);

  const [entry,      setEntry]      = useState<OurJourney | null>(null);
  const [media,      setMedia]      = useState<OurJourneyMedia[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const [preview,   setPreview]   = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const [form, setForm] = useState({
    type:         "Event" as (typeof OUR_JOURNEY_TYPES)[number],
    name:         "",
    description:  "",
    date:         "",
    timeSlot:     "",
    address:      "",
    attendees:    "",
    displayOrder: 0,
    status:       "Active",
  });

  useEffect(() => {
    ourJourneyService.getById(id)
      .then((data) => {
        setEntry(data);
        setMedia(data.media);
        setForm({
          type:         data.type,
          name:         data.name,
          description:  data.description ?? "",
          date:         data.date,
          timeSlot:     data.timeSlot ?? "",
          address:      data.address ?? "",
          attendees:    data.attendees ?? "",
          displayOrder: data.displayOrder,
          status:       data.status,
        });
        if (data.mainImage) setPreview(data.mainImage);
      })
      .catch(() => setError("Failed to load Our Journey entry"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "displayOrder" ? Number(value) : value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    prepareImageFile(file)
      .then((processed) => {
        setImageFile(processed);
        setRemoveImage(false);
        setPreview(URL.createObjectURL(processed));
      })
      .catch((err) => setError(err instanceof ImageUploadError ? err.message : "Could not process image"));
  };

  const clearImage = () => {
    setPreview(null);
    setImageFile(null);
    setRemoveImage(true);
    if (imageRef.current) imageRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fd = new FormData();
    fd.append("type",         form.type);
    fd.append("name",         form.name);
    fd.append("description",  form.description);
    fd.append("date",         form.date);
    fd.append("timeSlot",     form.timeSlot);
    fd.append("address",      form.address);
    fd.append("attendees",    form.attendees);
    fd.append("displayOrder", String(form.displayOrder));
    fd.append("status",       form.status);
    if (imageFile) fd.append("mainImage", imageFile);
    if (removeImage) fd.append("removeMainImage", "true");

    setSubmitting(true);
    try {
      await ourJourneyService.update(id, fd);
      router.push("/admin/our-journey");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-[500px] animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Entry not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/our-journey")}>
          Back to Our Journey
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0"
          onClick={() => router.push("/admin/our-journey")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Our Journey Entry</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Editing <span className="font-medium text-foreground">"{entry.name}"</span>
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Type *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40">
              {OUR_JOURNEY_TYPES.map((t) => <option key={t} value={t}>{t === "OurImpact" ? "Our Impact" : "Event"}</option>)}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
            <input name="name" required value={form.name} onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none" />
          </div>

          {/* Date & Time slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Date *</label>
              <input name="date" type="date" required value={form.date} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Time Slot</label>
              <input name="timeSlot" value={form.timeSlot} onChange={handleChange}
                placeholder="e.g. 10:00 AM – 4:00 PM"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
          </div>

          {/* Address & Attendees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
              <input name="address" value={form.address} onChange={handleChange}
                placeholder="e.g. Mumbai Convention Centre, Mumbai"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Attendees</label>
              <input name="attendees" value={form.attendees} onChange={handleChange}
                placeholder="e.g. 300+"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
          </div>

          {/* Main image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Main Image <span className="text-muted-foreground font-normal">(leave blank to keep existing)</span>
            </label>
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:border-violet-400 transition-colors"
              onClick={() => imageRef.current?.click()}
            >
              {preview ? (
                <div className="relative">
                  <Image src={preview} alt="preview" width={0} height={0} sizes="200px" unoptimized className="h-24 w-auto object-contain rounded-lg" />
                  <button type="button" className="absolute -top-2 -right-2 rounded-full bg-destructive p-0.5"
                    onClick={(e) => { e.stopPropagation(); clearImage(); }}>
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground text-center">
                    Click to upload new image<br />
                    <span className="text-xs">JPG, PNG, WEBP — max 300 KB</span>
                  </p>
                </>
              )}
            </div>
            <input ref={imageRef} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" className="hidden" onChange={handleImage} />
          </div>

          {/* Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Display Order</label>
              <input name="displayOrder" type="number" min={0} value={form.displayOrder} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40">
                {OUR_JOURNEY_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/our-journey")}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>

      <MediaGallery journeyId={entry.id} media={media} onChange={setMedia} />
    </div>
  );
}
