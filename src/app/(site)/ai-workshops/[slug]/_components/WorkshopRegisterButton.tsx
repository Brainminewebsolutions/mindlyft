"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface Props {
  webinarId:   string;
  slug:        string;
  productType: "Workshop" | "Webinar";
  price:       number;
  isPast?:     boolean;
  status?:     string;
}

export default function WorkshopRegisterButton({ webinarId, slug, productType, price, isPast = false, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  if (status === "Upcoming") {
    return (
      <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_100%)] text-white text-sm font-bold">
        <Sparkles className="w-4 h-4" />
        Coming Soon
      </div>
    );
  }

  if (isPast) {
    return (
      <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 text-sm font-bold">
        Registration Closed — Session Ended
      </div>
    );
  }

  if (price > 0) {
    return (
      <Link
        href={`/checkout/workshop/${webinarId}`}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#6c63ff] hover:bg-[#5b52e0] text-white text-sm font-bold transition-all hover:-translate-y-0.5"
      >
        Pay &amp; Register
      </Link>
    );
  }

  if (done) {
    return (
      <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold">
        ✓ Registered Successfully
      </div>
    );
  }

  async function handleRegister() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/payments/register-free", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ productId: webinarId, productType }),
      });

      if (res.status === 401) {
        router.push(`/login?next=/ai-workshops/${slug}`);
        return;
      }

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Registration failed. Please try again.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleRegister}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#6c63ff] hover:bg-[#5b52e0] text-white text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Registering…" : "Register Now"}
      </button>
      {error && (
        <p className="text-red-500 text-[12px] text-center">{error}</p>
      )}
    </div>
  );
}
