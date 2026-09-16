"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Zap } from "lucide-react";
import type { PaymentOrder } from "../page";
import PaymentStatusCard from "./PaymentStatusCard";

interface Props {
  order: PaymentOrder;
  token?: string;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).Razorpay) {
      resolve(true);
      return;
    }
    const script   = document.createElement("script");
    script.src     = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentClient({ order, token }: Props) {
  const router                = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const retryUrl = `/payment/${order.orderId}${token ? `?token=${encodeURIComponent(token)}` : ""}`;

  // This order already went through a different terminal state — nothing to pay here.
  if (order.status !== "Pending") {
    const isPaid = order.status === "Paid";
    return (
      <PaymentStatusCard
        variant={isPaid ? "success" : "error"}
        title={isPaid ? "Already Paid" : `Order ${order.status}`}
        message={
          isPaid
            ? "This order has already been paid for."
            : "This order can no longer be paid. Please contact support if you need help."
        }
      />
    );
  }

  async function handlePay() {
    setError(null);
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError("Failed to load payment gateway. Check your internet connection.");
        setLoading(false);
        return;
      }

      const rzp = new (
        (window as unknown as Record<string, unknown>).Razorpay as new (
          opts: Record<string, unknown>
        ) => { open(): void; on(event: string, cb: (response: unknown) => void): void }
      )({
        key:         order.keyId,
        amount:      order.amount,
        currency:    order.currency,
        name:        "Mindlyftai",
        description: order.productName,
        order_id:    order.razorpayOrderId,
        prefill: {
          name:    order.userName ?? "",
          email:   order.userEmail ?? "",
          contact: order.userPhoneNumber ?? "",
        },
        theme: { color: "#6c63ff" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id:   string;
          razorpay_signature:  string;
        }) => {
          try {
            const vRes = await fetch("/api/payments/verify", {
              method:  "POST",
              headers: { "Content-Type": "application/json" },
              body:    JSON.stringify({
                razorpayOrderId:   response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (vRes.ok) {
              router.push("/checkout/success");
            } else {
              const vJson = await vRes.json();
              router.push(
                `/checkout/failed?reason=${encodeURIComponent(vJson.error ?? "We couldn't verify your payment. If any amount was deducted, contact support with your payment ID.")}&retryUrl=${encodeURIComponent(retryUrl)}`,
              );
            }
          } catch {
            router.push(
              `/checkout/failed?reason=${encodeURIComponent("We couldn't verify your payment. If any amount was deducted, contact support with your payment ID.")}&retryUrl=${encodeURIComponent(retryUrl)}`,
            );
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      // Hard failures inside Razorpay's own UI (card declined, etc.).
      rzp.on("payment.failed", (response: unknown) => {
        const description =
          (response as { error?: { description?: string } })?.error?.description;
        setLoading(false);
        router.push(
          `/checkout/failed?reason=${encodeURIComponent(description || "Your payment could not be completed. Please try again.")}&retryUrl=${encodeURIComponent(retryUrl)}`,
        );
      });

      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[20px] bg-white border border-[rgba(108,99,255,0.15)] shadow-[0_16px_48px_rgba(108,99,255,0.10)] overflow-hidden">
      <div className="px-6 py-[22px]">
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <Lock className="w-3 h-3 text-[#6c63ff]" />
          <span className="text-[#999] text-xs font-semibold tracking-wide uppercase">Secure Payment</span>
        </div>

        <div className="text-center mb-6">
          <p className="text-[#1a1046] text-sm font-semibold mb-1">{order.productName}</p>
          <p className="text-[#999] text-xs mb-1">Order #{order.orderId}</p>
          <p
            className="text-[#1a1046] text-[2rem] font-extrabold"
            style={{ fontFamily: "var(--secondaryFont, sans-serif)" }}
          >
            ₹{(order.amount / 100).toLocaleString("en-IN")}
          </p>
        </div>

        {error && (
          <div className="px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[12.5px] mb-3.5 leading-relaxed">
            {error}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-[14px] border-none bg-[#6c63ff] text-white text-sm font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#5b52e0] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--primaryFont, sans-serif)" }}
        >
          <Zap className="w-4 h-4" />
          {loading ? "Processing…" : "Pay Now"}
        </button>

        <div className="flex gap-4 justify-center mt-4 flex-wrap">
          {[
            { icon: ShieldCheck, text: "256-bit SSL" },
            { icon: Lock,        text: "PCI-DSS"     },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon className="w-3 h-3 text-[#6c63ff]" />
              <span className="text-[#bbb] text-[11px]">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
