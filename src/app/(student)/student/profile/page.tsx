"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, Pencil, X, Check,
  Phone, BookOpen, Mail, User, GraduationCap,
} from "lucide-react";

import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { studentProfileService, type UpdateProfileInput } from "@/services/student/studentProfileService";
import type { Student } from "@/types/admin/student";

const COURSES = [
  "Artificial Intelligence", "Machine Learning", "Data Science",
  "Cyber Security", "Web Development", "Cloud Computing",
  "DevOps", "Blockchain",
];

export default function StudentProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<UpdateProfileInput>({
    firstName: "", lastName: "", phone: "", courseInterest: "",
  });

  useEffect(() => {
    studentProfileService.get()
      .then((data) => {
        setProfile(data);
        setForm({ firstName: data.firstName, lastName: data.lastName, phone: data.phone ?? "", courseInterest: data.courseInterest ?? "" });
      })
      .catch((err: Error) => {
        if (err.message === "Unauthorized") router.push("/login");
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [router]);

  function startEdit() {
    if (!profile) return;
    setForm({ firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone ?? "", courseInterest: profile.courseInterest ?? "" });
    setSuccess(false);
    setError(null);
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setError(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const updated = await studentProfileService.update({
        firstName:      form.firstName      || undefined,
        lastName:       form.lastName       || undefined,
        phone:          form.phone          || undefined,
        courseInterest: form.courseInterest || undefined,
      });
      setProfile(updated);
      setEditing(false);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  /* ── Error ── */
  if (!profile) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {error ?? "Failed to load profile."}
      </div>
    );
  }

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="max-w-2xl space-y-5">

      {/* ── Hero card ── */}
      <div className="rounded-2xl border border-border overflow-hidden shadow-sm">

        {/* Gradient banner */}
        <div className="h-28 bg-gradient-to-br from-violet-100 via-violet-200/60 to-blue-100" />

        {/* Avatar + info row */}
        <div className="px-6 pb-5">
          <div className="flex items-end justify-between -mt-10">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-2xl font-extrabold text-white shadow-[0_4px_16px_rgba(139,92,246,0.40)] border-4 border-white">
              {initials}
            </div>

            {!editing && (
              <Button variant="outline" size="sm" onClick={startEdit} className="gap-1.5 mb-1">
                <Pencil className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="mt-3">
            <h2 className="text-xl font-bold text-foreground">{profile.name || "—"}</h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold text-violet-700 uppercase tracking-wider">
              <GraduationCap className="h-3 w-3" />
              Student
            </span>
          </div>
        </div>
      </div>

      {/* ── Feedback banners ── */}
      {success && !editing && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
          <Check className="h-4 w-4 shrink-0" />
          Profile updated successfully.
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* ── Details / Edit form ── */}
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">

        {/* Section header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gray-50">
          <p className="text-sm font-semibold text-gray-800">Personal Information</p>
          {editing && (
            <span className="text-xs text-violet-700 font-medium bg-violet-100 px-2 py-0.5 rounded-full">
              Editing
            </span>
          )}
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Row 1: First Name + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id="firstName" label="First Name" icon={User}
              value={editing ? form.firstName ?? "" : profile.firstName}
              editing={editing}
              placeholder="First name"
              onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
            />
            <Field
              id="lastName" label="Last Name" icon={User}
              value={editing ? form.lastName ?? "" : profile.lastName}
              editing={editing}
              placeholder="Last name"
              onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
            />
          </div>

          {/* Row 2: Email (read-only) + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id="email" label="Email" icon={Mail}
              value={profile.email}
              editing={false}
              readOnly
            />
            <Field
              id="phone" label="Phone" icon={Phone}
              value={editing ? form.phone ?? "" : (profile.phone ?? "")}
              editing={editing}
              placeholder="+91 98765 43210"
              type="tel"
              onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
            />
          </div>

          {/* Row 3: Course Interest — full width */}
          <div>
            <Label htmlFor="course" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Course Interest
            </Label>
            {editing ? (
              <select
                id="course"
                value={form.courseInterest}
                onChange={(e) => setForm((f) => ({ ...f, courseInterest: e.target.value }))}
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
              >
                <option value="">Select a course…</option>
                {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            ) : (
              <p className="text-sm font-medium text-gray-800 px-1">
                {profile.courseInterest || <span className="text-gray-400">—</span>}
              </p>
            )}
          </div>

        </div>

        {/* Action bar (only when editing) */}
        {editing && (
          <div className="flex items-center gap-3 px-6 py-4 border-t border-border bg-gray-50">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={cancelEdit} disabled={saving} className="gap-1.5">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Reusable field row ── */
function Field({
  id, label, icon: Icon, value, editing, placeholder, type = "text", readOnly, onChange,
}: {
  id:           string;
  label:        string;
  icon:         React.ComponentType<{ className?: string }>;
  value:        string;
  editing:      boolean;
  placeholder?: string;
  type?:        string;
  readOnly?:    boolean;
  onChange?:    (v: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </Label>
      {editing && !readOnly ? (
        <Input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="focus-visible:ring-violet-500/30 focus-visible:border-violet-500"
        />
      ) : (
        <p className="text-sm font-medium text-gray-800 px-1">
          {value || <span className="text-gray-400">—</span>}
        </p>
      )}
    </div>
  );
}
