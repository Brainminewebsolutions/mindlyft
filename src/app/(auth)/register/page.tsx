"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { Button }     from "@/components/ui/button";
import { Input }      from "@/components/ui/input";
import { Label }      from "@/components/ui/label";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { registerUser } from "@/lib/services/authClientService";

const COURSES = [
  "Artificial Intelligence", "Machine Learning", "Data Science",
  "Cyber Security", "Web Development", "Cloud Computing",
  "DevOps", "Blockchain",
];

const selectCls =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm " +
  "text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    courseInterest: "", password: "", confirmPassword: "",
  });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [success,     setSuccess]     = useState(false);

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      await registerUser({
        name:           form.name,
        email:          form.email,
        password:       form.password,
        phone:          form.phone          || undefined,
        courseInterest: form.courseInterest || undefined,
      });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Success state ── */
  if (success) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-8 text-primary" />
          </div>
          <p className="text-xl font-semibold">Account created!</p>
          <p className="text-sm text-muted-foreground">Redirecting you to sign in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">

      {/* ── Navbar ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-border px-8 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/mindlyftai_logo.png"
            alt="Mindlyft AI"
            width={50}
            height={32}
            className="  object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Have an account?</span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Form area — fills remaining height ── */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-lg">

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Free student registration — takes 30 seconds</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-medium">Full name</Label>
                <Input id="name" value={form.name} onChange={set("name")} placeholder="Jane Doe" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium">Email address</Label>
                <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="jane@example.com" required />
              </div>
            </div>

            {/* Row 2: Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-medium">
                Phone <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
            </div>

            {/* Row 3: Course */}
            <div className="space-y-1.5">
              <Label htmlFor="course" className="text-xs font-medium">
                Course interest <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <select id="course" value={form.courseInterest} onChange={set("courseInterest")} className={selectCls}>
                <option value="">Select a course…</option>
                {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Row 4: Password + Confirm */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password" type={showPass ? "text" : "password"}
                    value={form.password} onChange={set("password")}
                    placeholder="Min 8 chars" required className="pr-9"
                  />
                  <button type="button" tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPass((v) => !v)}>
                    {showPass ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm" className="text-xs font-medium">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirm" type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword} onChange={set("confirmPassword")}
                    placeholder="••••••••" required className="pr-9"
                  />
                  <button type="button" tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirm((v) => !v)}>
                    {showConfirm ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? <><Loader2 className="mr-2 size-4 animate-spin" />Creating account…</>
                : "Create Student Account"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
