import Link from "next/link";
import { XCircle } from "lucide-react";

interface Props {
  searchParams: Promise<{ reason?: string; retryUrl?: string }>;
}

export default async function CheckoutFailedPage({ searchParams }: Props) {
  const { reason, retryUrl } = await searchParams;

  return (
    <div
      className="min-h-screen bg-[#f9f9fb] flex items-center justify-center px-[6vw] py-10"
      style={{ fontFamily: "var(--primaryFont, sans-serif)" }}
    >
      <div className="max-w-[440px] w-full bg-white rounded-[24px] border border-[rgba(220,38,38,0.15)] shadow-[0_16px_48px_rgba(220,38,38,0.08)] px-9 py-12 text-center">

        {/* Icon */}
        <div className="w-[72px] h-[72px] rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-9 h-9 text-red-500" />
        </div>

        <h1
          className="text-[#1a1046] text-2xl font-extrabold mb-2.5"
          style={{ fontFamily: "var(--secondaryFont, sans-serif)" }}
        >
          Payment Failed
        </h1>

        <p className="text-[#888] text-sm leading-[1.7] mb-8">
          {reason || "Something went wrong while processing your payment. No amount has been deducted for this attempt."}
        </p>

        <Link
          href={retryUrl || "/courses"}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-[14px] bg-[#6c63ff] text-white text-sm font-bold no-underline transition-all duration-200 hover:bg-[#5b52e0] hover:-translate-y-0.5"
          style={{ fontFamily: "var(--primaryFont, sans-serif)" }}
        >
          Try Again
        </Link>

        <Link
          href="/contact"
          className="block mt-4 text-[#999] text-[13px] no-underline hover:text-[#6c63ff] transition-colors"
        >
          Need help? Contact support
        </Link>
      </div>
    </div>
  );
}
