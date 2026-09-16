"use client";

import { useState }  from "react";
import { useRouter } from "next/navigation";
import Image         from "next/image";
import {
  Clock, Wifi, MapPin, Globe, User,
  ShieldCheck, Lock, Zap,
} from "lucide-react";
import type { Course } from "@/types/admin/course";
import { toUploadUrl } from "@/lib/api/image-url";

interface Props {
  course:    Course;
  userName:  string;
  userEmail: string;
  userPhoneNumber: string;
}

interface RazorpayOrderData {
  orderId:         number;
  razorpayOrderId: string;
  amountInPaise:   number;
  currency:        string;
  productName:     string;
  keyId:           string;
  paymentUrl:      string;
}

const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
];

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

export default function CheckoutClient({ course, userName, userEmail, userPhoneNumber }: Props) {
  const router              = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const gradient        = GRADIENTS[Number(course.id) % GRADIENTS.length] ?? GRADIENTS[0];
  const proxiedImage    = toUploadUrl(course.image);
  // Pricing (discount/GST/total) comes straight from the API — server is the
  // single source of truth, so this never has to be recomputed/duplicated here.
  const discountPercent = course.discount ?? 0;
  const discountAmount  = course.discountAmount;
  const gst              = course.gstAmount;
  const total             = course.finalPrice;

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

      const res = await fetch("/api/payments/create-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ productId: course.id, productType: "Course" }),
      });

      if (res.status === 401) {
        router.push("/auth/login");
        return;
      }

      const json: { error?: string } & Partial<RazorpayOrderData> = await res.json();

      if (!res.ok || !json.razorpayOrderId) {
        setError(json.error ?? "Could not initiate payment. Please try again.");
        setLoading(false);
        return;
      }

      const order = json as RazorpayOrderData;
      const retryUrl = `/checkout/${course.id}`;

      const rzp = new (
        (window as unknown as Record<string, unknown>).Razorpay as new (
          opts: Record<string, unknown>
        ) => { open(): void; on(event: string, cb: (response: unknown) => void): void }
      )({
        key:         order.keyId,
        amount:      order.amountInPaise,
        currency:    order.currency,
        name:        "Mindlyftai",
        description: order.productName,
        order_id:    order.razorpayOrderId,
        prefill: {
          name:  userName,
          email: userEmail,
          contact: userPhoneNumber,
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
              router.push("/checkout/success?type=course");
            } else {
              // Payment succeeded at Razorpay but our verification failed —
              // this is a payment-result outcome, not a checkout-form error,
              // so it gets its own screen rather than an inline message.
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

      // Hard failures inside Razorpay's own UI (card declined, etc.) — the
      // user attempted payment, so this is a payment-result outcome too.
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
    <div
      className="rounded-[20px] bg-white border border-[rgba(108,99,255,0.15)] shadow-[0_16px_48px_rgba(108,99,255,0.10)] overflow-hidden"
    >
      {/* Course thumbnail */}
      <div className="h-[180px] relative overflow-hidden">
        {proxiedImage ? (
          <Image src={proxiedImage} alt={course.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: gradient }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3.5 left-[18px] right-[18px]">
          <h3
            className="text-white text-[1.05rem] font-bold m-0 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "var(--secondaryFont, sans-serif)" }}
          >
            {course.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-[22px]">

        {/* Meta badges */}
        <div className="flex gap-2.5 flex-wrap mb-5">
          {[
            { icon: course.mode === "Online" ? Wifi : MapPin, text: course.mode },
            { icon: Clock, text: `${course.duration}h`   },
            { icon: Globe, text: course.language         },
            { icon: User,  text: course.instructor       },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1 text-[#888] text-[11.5px]"
            >
              <Icon className="w-[11px] h-[11px] text-[#6c63ff]" />
              {text}
            </span>
          ))}
        </div>

        {/* Price breakdown */}
        <div className="border-t border-[rgba(108,99,255,0.10)] pt-4 mb-4">
          {[
            { label: "Course price", value: `₹${course.price.toLocaleString("en-IN")}` },
            {
              label: discountPercent > 0 ? `Discount (${discountPercent}%)` : "Discount",
              value: discountAmount > 0 ? `− ₹${discountAmount.toLocaleString("en-IN")}` : "₹0",
            },
            { label: `GST (${course.gstPer}%)`, value: `₹${gst.toLocaleString("en-IN")}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between mb-2">
              <span className="text-[#999] text-[13px]">{label}</span>
              <span className="text-[#444] text-[13px] font-semibold">{value}</span>
            </div>
          ))}

          <div className="flex justify-between border-t border-[rgba(108,99,255,0.10)] pt-3 mt-2">
            <span className="text-[#1a1046] text-sm font-bold">Total</span>
            <span
              className="text-[#6c63ff] text-[1.2rem] font-extrabold"
              style={{ fontFamily: "var(--secondaryFont, sans-serif)" }}
            >
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[12.5px] mb-3.5 leading-relaxed">
            {error}
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-[14px] border-none bg-[#6c63ff] text-white text-sm font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#5b52e0] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--primaryFont, sans-serif)" }}
        >
          <Zap className="w-4 h-4" />
          {loading ? "Processing…" : "Pay Now"}
        </button>

        {/* Trust badges */}
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

        <p className="text-[#ccc] text-[11px] text-center mt-3 mb-0 leading-relaxed">
          By completing your purchase you agree to our{" "}
          <span className="text-[#6c63ff] cursor-pointer hover:underline">
            Terms of Service
          </span>
        </p>
      </div>
    </div>
  );
}
