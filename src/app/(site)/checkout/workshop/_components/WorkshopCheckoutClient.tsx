"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Wifi, MapPin, User, ShieldCheck, Lock, Zap } from "lucide-react";
import type { Webinar } from "@/types/admin/webinar";
import { toUploadUrl } from "@/lib/api/image-url";

interface Props {
  webinar:         Webinar;
  userName:        string;
  userEmail:       string;
  userPhoneNumber: string;
}

interface RazorpayOrderData {
  razorpayOrderId: string;
  amountInPaise:   number;
  currency:        string;
  productName:     string;
  keyId:           string;
}

const GRADIENTS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#11998e,#38ef7d)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
  "linear-gradient(135deg,#fa709a,#fee140)",
  "linear-gradient(135deg,#a18cd1,#fbc2eb)",
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

export default function WorkshopCheckoutClient({ webinar, userName, userEmail, userPhoneNumber }: Props) {
  const router              = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const gradient     = GRADIENTS[Number(webinar.id) % GRADIENTS.length] ?? GRADIENTS[0];
  const proxiedImage = toUploadUrl(webinar.image);
  const gst          = Math.round(webinar.price * 0.18);
  const total        = Math.round(webinar.price * 1.18);

  const dateFormatted = new Date(webinar.date).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

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
        body:    JSON.stringify({ productId: webinar.id, productType: webinar.type }),
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

      const rzp = new (
        (window as unknown as Record<string, unknown>).Razorpay as new (
          opts: Record<string, unknown>
        ) => { open(): void }
      )({
        key:         order.keyId,
        amount:      order.amountInPaise,
        currency:    order.currency,
        name:        "Mindlyftai",
        description: order.productName,
        order_id:    order.razorpayOrderId,
        prefill: {
          name:    userName,
          email:   userEmail,
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
              router.push("/checkout/success");
            } else {
              const vJson = await vRes.json();
              setError(vJson.error ?? "Payment verification failed. Contact support.");
            }
          } catch {
            setError("Payment verification failed. Contact support.");
          } finally {
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });

      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[20px] bg-white border border-[rgba(108,99,255,0.15)] shadow-[0_16px_48px_rgba(108,99,255,0.10)] overflow-hidden">
      {/* Thumbnail */}
      <div className="h-[180px] relative overflow-hidden">
        {proxiedImage ? (
          <Image src={proxiedImage} alt={webinar.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: gradient }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-white/20 backdrop-blur-sm text-white border border-white/30">
            {webinar.type}
          </span>
        </div>
        <div className="absolute bottom-3.5 left-[18px] right-[18px]">
          <h3 className="text-white text-[1.05rem] font-bold m-0 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
            {webinar.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-[22px]">
        {/* Meta */}
        <div className="flex gap-2.5 flex-wrap mb-5">
          {[
            { icon: Calendar,                                 text: dateFormatted       },
            { icon: Clock,                                    text: webinar.time        },
            { icon: webinar.mode === "Online" ? Wifi : MapPin, text: webinar.mode      },
            { icon: User,                                     text: webinar.instructor  },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-1 text-[#888] text-[11.5px]">
              <Icon className="w-[11px] h-[11px] text-[#6c63ff]" />
              {text}
            </span>
          ))}
        </div>

        {/* Price breakdown */}
        <div className="border-t border-[rgba(108,99,255,0.10)] pt-4 mb-4">
          {[
            { label: "Price",    value: `₹${webinar.price.toLocaleString("en-IN")}` },
            { label: "Discount", value: "₹0"                                         },
            { label: "GST (18%)", value: `₹${gst.toLocaleString("en-IN")}`           },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between mb-2">
              <span className="text-[#999] text-[13px]">{label}</span>
              <span className="text-[#444] text-[13px] font-semibold">{value}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-[rgba(108,99,255,0.10)] pt-3 mt-2">
            <span className="text-[#1a1046] text-sm font-bold">Total</span>
            <span className="text-[#6c63ff] text-[1.2rem] font-extrabold">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
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
        >
          <Zap className="w-4 h-4" />
          {loading ? "Processing…" : "Pay & Register"}
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

        <p className="text-[#ccc] text-[11px] text-center mt-3 mb-0 leading-relaxed">
          By completing your purchase you agree to our{" "}
          <span className="text-[#6c63ff] cursor-pointer hover:underline">Terms of Service</span>
        </p>
      </div>
    </div>
  );
}
