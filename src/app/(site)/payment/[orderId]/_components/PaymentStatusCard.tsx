import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  variant: "success" | "error";
  title:   string;
  message: string;
}

export default function PaymentStatusCard({ variant, title, message }: Props) {
  const isSuccess = variant === "success";

  return (
    <div className="rounded-[20px] bg-white border border-[rgba(108,99,255,0.15)] shadow-[0_16px_48px_rgba(108,99,255,0.10)] overflow-hidden px-6 py-10 text-center">
      <div
        className={`w-[64px] h-[64px] rounded-full flex items-center justify-center mx-auto mb-5 ${
          isSuccess ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        ) : (
          <XCircle className="w-8 h-8 text-red-500" />
        )}
      </div>
      <h1
        className="text-[#1a1046] text-xl font-extrabold mb-2"
        style={{ fontFamily: "var(--secondaryFont, sans-serif)" }}
      >
        {title}
      </h1>
      <p className="text-[#888] text-sm leading-relaxed">{message}</p>
    </div>
  );
}
