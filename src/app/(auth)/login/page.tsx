 "use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { loginUser } from "@/lib/services/authClientService";
import { ROLE_DASHBOARD, type Role } from "@/lib/auth/types";

// Only allow same-site relative paths — a raw "//evil.com" or absolute URL
// from the query string could otherwise be used as an open redirect.
function safeRedirect(path: string | null): string | null {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : null;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("next")) ?? safeRedirect(searchParams.get("from"));

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
      const home = role ? ROLE_DASHBOARD[role as Role] : undefined;
      router.push(redirectTo ?? home ?? "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full">

      {/* ── Full-page background image ── */}
      <div className="absolute inset-0" style={{ backgroundImage: "url('/Sign_in.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-black/40" />

      {/* ── Logo ── */}
      <div className="absolute top-0 left-0 z-20 p-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/mindlyftai_logo.png" alt="Mindlyft AI" width={40} height={40} className="rounded-xl" priority />
          <span className="text-lg font-bold tracking-tight text-white drop-shadow" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Mindlyft AI
          </span>
        </Link>
      </div>

      {/* ── Top bar ── */}
      <div className="absolute top-0 right-0 z-20 p-5">
        <Link
          href="/"
          className="rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/30"
        >
          ← Back to Website
        </Link>
      </div>

      {/* ── Centered form ── */}
      <div className="relative z-10 flex w-full items-center justify-center lg:justify-end lg:pr-[8vw]">
        <div className="w-full max-w-[380px] px-6 lg:px-0">

           

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
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}