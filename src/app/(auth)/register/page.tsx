"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";
import { registerUser } from "@/lib/services/authClientService";

const COURSES = [
  "Artificial Intelligence", "Machine Learning", "Data Science",
  "Cyber Security", "Web Development", "Cloud Computing",
  "DevOps", "Blockchain",
];

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
      <div className="flex h-screen items-center justify-center bg-[#f7f7f9]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <CheckCircle2 className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="text-xl font-semibold text-slate-800">Account created!</p>
          <p className="text-sm text-slate-400">Redirecting you to sign in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#f7f7f9]">

      {/* ── Left decorative panel ── */}
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, #eef2ff 0%, #e0e7ff 35%, #ede9fe 65%, #f5f3ff 100%)" }} />

        {/* Animated orbs */}
        <div className="animate-float-slow pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-40" style={{ background: "radial-gradient(circle, #a5b4fc 0%, transparent 70%)" }} />
        <div className="animate-float pointer-events-none absolute bottom-20 -right-10 h-64 w-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #c4b5fd 0%, transparent 70%)", animationDelay: "1.5s" }} />
        <div className="animate-float-slow pointer-events-none absolute top-1/2 left-1/3 h-48 w-48 -translate-y-1/2 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", animationDelay: "0.8s" }} />

        {/* Grid lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        {/* Logo + Heading */}
        <div className="relative z-10 p-10 pb-0 flex flex-col items-center gap-4">
          <Link href="/" className="flex flex-col items-center gap-2">
            <Image src="/mindlyftai_logo.png" alt="Mindlyft AI" width={100} height={100} className="rounded-2xl" priority />
            <span className="text-2xl font-bold tracking-tight text-indigo-900" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Mindlyft AI
            </span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-indigo-900">Create your account</h1>
            <p className="mt-1 text-sm text-indigo-400">Free student registration — takes 30 seconds</p>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative z-10 flex flex-1 items-center justify-center p-10 -mt-6">
          <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[360px]">
            {/* Floating card — profile */}
            <rect x="60" y="60" width="130" height="90" rx="16" fill="white" opacity="0.9" />
            <circle cx="100" cy="95" r="22" fill="#c7d2fe" />
            <circle cx="100" cy="88" r="10" fill="#818cf8" />
            <rect x="80" y="104" width="40" height="6" rx="3" fill="#a5b4fc" />
            <rect x="132" y="82" width="46" height="8" rx="4" fill="#e0e7ff" />
            <rect x="132" y="96" width="36" height="7" rx="3.5" fill="#ede9fe" />
            <rect x="132" y="110" width="28" height="7" rx="3.5" fill="#f5f3ff" />

            {/* Floating card — course */}
            <rect x="210" y="50" width="140" height="80" rx="16" fill="white" opacity="0.9" />
            <rect x="228" y="68" width="48" height="28" rx="8" fill="#ede9fe" />
            <rect x="232" y="74" width="40" height="4" rx="2" fill="#818cf8" />
            <rect x="232" y="82" width="32" height="4" rx="2" fill="#a5b4fc" />
            <rect x="284" y="68" width="50" height="8" rx="4" fill="#e0e7ff" />
            <rect x="284" y="82" width="40" height="7" rx="3.5" fill="#ede9fe" />
            <rect x="284" y="95" width="30" height="7" rx="3.5" fill="#f5f3ff" />

            {/* Central laptop */}
            <rect x="90" y="190" width="220" height="140" rx="14" fill="#4f46e5" />
            <rect x="100" y="200" width="200" height="122" rx="10" fill="#eef2ff" />
            {/* Laptop hinge */}
            <rect x="70" y="328" width="260" height="12" rx="6" fill="#c7d2fe" />
            <rect x="140" y="340" width="120" height="8" rx="4" fill="#a5b4fc" />

            {/* Screen — form UI */}
            <rect x="116" y="216" width="168" height="10" rx="4" fill="#c7d2fe" />
            <rect x="116" y="232" width="168" height="18" rx="5" fill="white" />
            <rect x="120" y="236" width="80" height="10" rx="3" fill="#e0e7ff" />
            <rect x="116" y="256" width="168" height="18" rx="5" fill="white" />
            <rect x="120" y="260" width="60" height="10" rx="3" fill="#e0e7ff" />
            <rect x="116" y="280" width="168" height="18" rx="5" fill="white" />
            <rect x="120" y="284" width="100" height="10" rx="3" fill="#e0e7ff" />
            <rect x="150" y="304" width="100" height="12" rx="6" fill="#4f46e5" />

            {/* Floating badges */}
            <circle cx="60" cy="260" r="22" fill="#e0e7ff" />
            <text x="49" y="268" fontSize="18">🎓</text>

            <circle cx="340" cy="180" r="22" fill="#ede9fe" />
            <text x="329" y="188" fontSize="18">⭐</text>

            <circle cx="340" cy="280" r="20" fill="#f5f3ff" />
            <text x="330" y="288" fontSize="16">📚</text>

            {/* Tagline */}
            <text x="200" y="368" textAnchor="middle" fontSize="13" fontWeight="600" fill="#6366f1" fontFamily="Times New Roman, Times, serif">Join thousands of learners today</text>
          </svg>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex w-full flex-col lg:w-[54%] xl:w-[58%]">

        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between px-8 pt-3 pb-1">
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <Image src="/mindlyftai_logo.png" alt="Mindlyft AI" width={28} height={28} className="rounded-lg" />
            <span className="text-sm font-bold text-slate-800">Mindlyft AI</span>
          </Link>
          <div className="hidden lg:block" />
          <Link
            href="/"
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
          >
            ← Back to Website
          </Link>
        </div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-8 py-2">
          <div className="w-full max-w-[420px]">

            {error && (
              <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
              <form onSubmit={handleSubmit} className="space-y-2.5">

                {/* Full name */}
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-slate-400">Full name</Label>
                  <Input
                    id="name" value={form.name} onChange={set("name")}
                    placeholder="Jane Doe" required
                    className="h-8 w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-slate-400">Email</Label>
                  <Input
                    id="email" type="email" value={form.email} onChange={set("email")}
                    placeholder="jane@example.com" required
                    className="h-8 w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Phone <span className="font-normal normal-case text-slate-300">(optional)</span>
                  </Label>
                  <Input
                    id="phone" type="tel" value={form.phone} onChange={set("phone")}
                    placeholder="+91 98765 43210"
                    className="h-8 w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Course interest */}
                <div className="space-y-1">
                  <Label htmlFor="course" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Course interest <span className="font-normal normal-case text-slate-300">(optional)</span>
                  </Label>
                  <select
                    id="course" value={form.courseInterest} onChange={set("courseInterest")}
                    className="h-8 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                  >
                    <option value="">Select a course…</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest text-slate-400">Password</Label>
                  <div className="relative">
                    <Input
                      id="password" type={showPass ? "text" : "password"}
                      value={form.password} onChange={set("password")}
                      placeholder="Min 8 chars" required
                      className="h-8 w-full rounded-xl border-slate-200 bg-slate-50 pr-9 text-sm text-slate-800 placeholder:text-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                    <button type="button" tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      onClick={() => setShowPass((v) => !v)}>
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="space-y-1">
                  <Label htmlFor="confirm" className="text-xs font-semibold uppercase tracking-widest text-slate-400">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirm" type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword} onChange={set("confirmPassword")}
                      placeholder="••••••••" required
                      className="h-8 w-full rounded-xl border-slate-200 bg-slate-50 pr-9 text-sm text-slate-800 placeholder:text-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                    <button type="button" tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      onClick={() => setShowConfirm((v) => !v)}>
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={loading}
                  className="flex h-8 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Creating account…</>
                  ) : "Create Student Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs text-slate-300">or</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <Link
                href="/login"
                className="flex h-8 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Sign in to existing account
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
