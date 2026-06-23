import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div
      className="min-h-screen bg-[#f9f9fb] flex items-center justify-center px-[6vw] py-10"
      style={{ fontFamily: "var(--primaryFont, sans-serif)" }}
    >
      <div className="max-w-[440px] w-full bg-white rounded-[24px] border border-[rgba(108,99,255,0.15)] shadow-[0_16px_48px_rgba(108,99,255,0.10)] px-9 py-12 text-center">

        {/* Icon */}
        <div className="w-[72px] h-[72px] rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>

        <h1
          className="text-[#1a1046] text-2xl font-extrabold mb-2.5"
          style={{ fontFamily: "var(--secondaryFont, sans-serif)" }}
        >
          Payment Successful!
        </h1>

        <p className="text-[#888] text-sm leading-[1.7] mb-8">
          You&apos;re now enrolled. Head to your dashboard to start learning.
        </p>

        <Link
          href="/student/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-[14px] bg-[#6c63ff] text-white text-sm font-bold no-underline transition-all duration-200 hover:bg-[#5b52e0] hover:-translate-y-0.5"
          style={{ fontFamily: "var(--primaryFont, sans-serif)" }}
        >
          Go to Dashboard
        </Link>

        <Link
          href="/courses"
          className="block mt-4 text-[#999] text-[13px] no-underline hover:text-[#6c63ff] transition-colors"
        >
          Browse more courses
        </Link>
      </div>
    </div>
  );
}
