"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, X, Check, Phone, Briefcase, Building2, FileText, Mail, Shield, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge }   from "@/components/ui/badge";
import { Button }  from "@/components/ui/button";
import { Input }   from "@/components/ui/input";
import { Label }   from "@/components/ui/label";
import { employeeProfileService, type UpdateEmployeeProfileInput } from "@/services/employee/employeeProfileService";
import type { Employee } from "@/types/admin/employee";

const STATUS_COLORS: Record<string, string> = {
  ACTIVE:    "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  INACTIVE:  "border-amber-500/30 text-amber-700 dark:text-amber-400",
  SUSPENDED: "border-red-500/30 text-red-600 dark:text-red-400",
};

export default function EmployeeProfilePage() {
  const [profile,  setProfile]  = useState<Employee | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState(false);

  const [form, setForm] = useState<UpdateEmployeeProfileInput>({
    name: "", phone: "", designation: "", department: "", description: "",
  });

  useEffect(() => {
    employeeProfileService.get()
      .then((data) => {
        setProfile(data);
        setForm({
          name:        data.name        ?? "",
          phone:       data.phone       ?? "",
          designation: data.designation ?? "",
          department:  data.department  ?? "",
          description: data.description ?? "",
        });
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function startEdit() {
    if (!profile) return;
    setForm({
      name:        profile.name        ?? "",
      phone:       profile.phone       ?? "",
      designation: profile.designation ?? "",
      department:  profile.department  ?? "",
      description: profile.description ?? "",
    });
    setSuccess(false);
    setError(null);
    setEditing(true);
  }

  function cancelEdit() { setEditing(false); setError(null); }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const updated = await employeeProfileService.update({
        name:        form.name        || undefined,
        phone:       form.phone       || undefined,
        designation: form.designation || undefined,
        department:  form.department  || undefined,
        description: form.description || undefined,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">{error ?? "Failed to load profile."}</p>
      </div>
    );
  }

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "EP";

  const joinedDate = profile.joinedAt
    ? new Date(profile.joinedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">View and update your account information</p>
      </div>

      {/* Avatar card */}
      <Card>
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xl font-bold text-violet-600 dark:text-violet-400">
                {initials}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className={`gap-1.5 ${STATUS_COLORS[profile.status] ?? ""}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {profile.status}
                  </Badge>
                  {profile.designation && (
                    <Badge variant="outline" className="text-muted-foreground">
                      {profile.designation}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {!editing && (
              <Button variant="outline" size="sm" onClick={startEdit} className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      {success && !editing && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-700">
          Profile updated successfully.
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Details */}
      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-sm">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">

          {/* Read-only: Email */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium">{profile.email}</p></div>
          </div>

          {/* Read-only: Role */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
            <div><p className="text-xs text-muted-foreground">Role</p><p className="text-sm font-medium">{profile.role}</p></div>
          </div>

          {/* Read-only: Joined */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div><p className="text-xs text-muted-foreground">Joined</p><p className="text-sm font-medium">{joinedDate}</p></div>
          </div>

          {/* Editable: Name */}
          <div className="flex items-start gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            {editing ? (
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your full name" />
              </div>
            ) : (
              <div><p className="text-xs text-muted-foreground">Full Name</p><p className="text-sm font-medium">{profile.name || "—"}</p></div>
            )}
          </div>

          {/* Editable: Phone */}
          <div className="flex items-start gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>
            {editing ? (
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" />
              </div>
            ) : (
              <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{profile.phone || "—"}</p></div>
            )}
          </div>

          {/* Editable: Designation */}
          <div className="flex items-start gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            {editing ? (
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="designation" className="text-xs text-muted-foreground">Designation</Label>
                <Input id="designation" value={form.designation} onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))} placeholder="e.g. Senior Instructor" />
              </div>
            ) : (
              <div><p className="text-xs text-muted-foreground">Designation</p><p className="text-sm font-medium">{profile.designation || "—"}</p></div>
            )}
          </div>

          {/* Editable: Department */}
          <div className="flex items-start gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
            {editing ? (
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="department" className="text-xs text-muted-foreground">Department</Label>
                <Input id="department" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} placeholder="e.g. AI & Machine Learning" />
              </div>
            ) : (
              <div><p className="text-xs text-muted-foreground">Department</p><p className="text-sm font-medium">{profile.department || "—"}</p></div>
            )}
          </div>

          {/* Editable: Description */}
          <div className="flex items-start gap-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            {editing ? (
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="description" className="text-xs text-muted-foreground">About</Label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="A short bio about yourself"
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
            ) : (
              <div><p className="text-xs text-muted-foreground">About</p><p className="text-sm font-medium">{profile.description || "—"}</p></div>
            )}
          </div>

        </CardContent>
      </Card>

      {/* Edit actions */}
      {editing && (
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
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
  );
}
