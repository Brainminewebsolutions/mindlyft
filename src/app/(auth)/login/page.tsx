 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { loginUser } from "@/lib/services/authClientService";

const ROLE_HOME: Record<string, string> = {
  ADMIN:      "/admin/dashboard",
  TEACHER:    "/employee/dashboard",
  ACCOUNTANT: "/employee/dashboard",
  STAFF:      "/employee/dashboard",
  EMPLOYEE:   "/employee/dashboard",
  STUDENT:    "/student/dashboard",
};

export default function LoginPage() {
  const router = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { role } = await loginUser(email, password);
      router.push(role && ROLE_HOME[role] ? ROLE_HOME[role] : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f7f7f9]">

      {/* ── Left decorative panel ── */}
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col overflow-hidden">
        {/* Warm gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(150deg, #eef2ff 0%, #e0e7ff 35%, #ede9fe 65%, #f5f3ff 100%)",
          }}
        />

        {/* Geometric accent shapes */}
        <div
          className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #a5b4fc 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-20 -right-10 h-64 w-64 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #c4b5fd 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/3 h-48 w-48 -translate-y-1/2 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
        />

        {/* Subtle grid lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Logo only */}
        <div className="relative z-10 flex  h-75 flex-col justify-between p-12">
          <Link href="/" className="  items-center gap-3">
            <Image
              src="/mindlyftai_logo.png"
              alt="Mindlyft AI"
              width={100}
              height={100}
              className="rounded-xl"
              priority
            />
            <span
              className="text-lg font-bold tracking-tight text-indigo-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Mindlyft AI
            </span>
          </Link>

           {/* Heading */}
            <div className="mb-2 space-y-1">
              <h2
                className="text-[1.75rem] font-bold text-slate-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Welcome  
              </h2>
              <p className="text-sm text-slate-400">Sign in to continue your learning journey</p>
            </div>

        </div>

        
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex w-full flex-col lg:w-[54%] xl:w-[58%]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-4">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <Image src="/mindlyftai_logo.png" alt="Mindlyft AI" width={30} height={30} className="rounded-lg" />
            <span className="text-sm font-bold text-slate-800">Mindlyft AI</span>
          </Link>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">No account?</span>
            <Link
              href="/register"
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Centred form */}
        <div className="flex flex-1 items-center justify-center px-8 py-4">
          <div className="w-full max-w-[360px]">

           

            {/* Error */}
            {error && (
              <div className="mb-2 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Form card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="h-10 rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-xs text-indigo-500 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="h-10 rounded-xl border-slate-200 bg-slate-50 pr-10 text-sm text-slate-800 placeholder:text-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      onClick={() => setShowPass((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs text-slate-300">or</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              {/* Register CTA */}
              <Link
                href="/register"
                className="flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Create a student account
              </Link>
            </div>

             
          </div>
        </div>
      </div>
    </div>
  );
}