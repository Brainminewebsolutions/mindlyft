"use client";

import { useRef, useState } from "react";
import { Plus, Trash2, ImageIcon, VideoIcon, Upload, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ourJourneyService } from "@/services/admin/ourJourneyService";
import { OUR_JOURNEY_MEDIA_TYPES } from "@/constants/ourJourney";
import type { OurJourneyMedia } from "@/types/admin/ourJourney";

interface Props {
  journeyId: string;
  media:     OurJourneyMedia[];
  onChange:  (media: OurJourneyMedia[]) => void;
}

export function MediaGallery({ journeyId, media, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [mediaType,   setMediaType]   = useState<(typeof OUR_JOURNEY_MEDIA_TYPES)[number]>("Image");
  const [file,        setFile]        = useState<File | null>(null);
  const [saving,      setSaving]      = useState(false);
  const [formError,   setFormError]   = useState<string | null>(null);
  const [deletingId,  setDeletingId]  = useState<string | null>(null);

  const openAdd = () => {
    setMediaType("Image");
    setFile(null);
    setFormError(null);
    setShowAddForm(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setFile(null);
    setFormError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSave = async () => {
    if (!file) { setFormError("Please select a file"); return; }
    setSaving(true);
    setFormError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", mediaType);
      fd.append("displayOrder", String(media.length));
      const created = await ourJourneyService.addMedia(journeyId, fd);
      onChange([...media, created]);
      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to add media item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await ourJourneyService.deleteMedia(journeyId, id);
      onChange(media.filter((m) => m.id !== id));
    } catch {
      /* no-op */
    } finally {
      setDeletingId(null);
    }
  };

  const sorted = media.slice().sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Media Gallery</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {media.length} item{media.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" onClick={openAdd} disabled={showAddForm}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Media
        </Button>
      </div>

      {/* Add media form */}
      {showAddForm && (
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">New Media Item</p>

          <div className="w-40 space-y-1">
            <label className="block text-xs font-medium text-foreground">Type</label>
            <select
              value={mediaType}
              onChange={(e) => { setMediaType(e.target.value as (typeof OUR_JOURNEY_MEDIA_TYPES)[number]); setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              {OUR_JOURNEY_MEDIA_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">File</label>
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background p-5 cursor-pointer hover:border-violet-400 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {file ? (
                <div className="relative flex items-center gap-2">
                  {mediaType === "Video" ? <VideoIcon className="h-5 w-5 text-violet-600" /> : <ImageIcon className="h-5 w-5 text-violet-600" />}
                  <span className="text-sm text-foreground">{file.name}</span>
                  <button type="button" className="rounded-full bg-destructive p-0.5"
                    onClick={(e) => { e.stopPropagation(); setFile(null); if (fileRef.current) fileRef.current.value = ""; }}>
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground/50" />
                  <p className="text-xs text-muted-foreground">Click to select {mediaType.toLowerCase()}</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept={mediaType === "Video" ? "video/*" : "image/*"}
              className="hidden"
              onChange={handleFile}
            />
          </div>

          {formError && <p className="text-xs text-destructive">{formError}</p>}
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Plus className="mr-1.5 h-3.5 w-3.5" />}
              Add
            </Button>
            <Button size="sm" variant="ghost" onClick={closeForm} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Media grid */}
      {sorted.length === 0 && !showAddForm ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No media yet</p>
          <p className="mt-0.5 text-xs text-muted-foreground/60">Add photos or videos from this event</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sorted.map((m) => (
            <div key={m.id} className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
              {m.type === "Video" ? (
                <video src={m.url} className="h-full w-full object-cover" muted />
              ) : (
                <img src={m.url} alt="" className="h-full w-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <span className="absolute top-1.5 left-1.5 rounded-full bg-black/60 p-1">
                {m.type === "Video" ? <VideoIcon className="h-3 w-3 text-white" /> : <ImageIcon className="h-3 w-3 text-white" />}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(m.id)}
                disabled={deletingId === m.id}
                className="absolute top-1.5 right-1.5 rounded-full bg-destructive p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {deletingId === m.id
                  ? <Loader2 className="h-3 w-3 text-white animate-spin" />
                  : <Trash2 className="h-3 w-3 text-white" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
