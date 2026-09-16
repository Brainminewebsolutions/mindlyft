import { notFound } from "next/navigation";
import { unwrapDotnet, ApiError } from "@/lib/api/dotnet-client";
import PaymentClient from "./_components/PaymentClient";
import PaymentStatusCard from "./_components/PaymentStatusCard";

export interface PaymentOrder {
  orderId:         number;
  razorpayOrderId: string;
  amount:          number;
  currency:        string;
  keyId:           string;
  status:          string;
  productName:     string;
  userName:        string | null;
  userEmail:       string | null;
  userPhoneNumber: string | null;
}

type PaymentOrderResult =
  | { kind: "ok"; order: PaymentOrder }
  | { kind: "invalid" }
  | { kind: "expired" }
  | { kind: "not_found" };

async function getPaymentOrder(orderId: string, token?: string): Promise<PaymentOrderResult> {
  try {
    const query = token ? `?token=${encodeURIComponent(token)}` : "";
    const order = await unwrapDotnet<PaymentOrder>(`/v1/payments/${orderId}${query}`);
    return { kind: "ok", order };
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 404) return { kind: "not_found" };
      if (err.status === 401) return { kind: "invalid" };
      if (err.status === 410) return { kind: "expired" };
    }
    throw err;
  }
}

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params:       Promise<{ orderId: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { orderId }  = await params;
  const { token }     = await searchParams;

  const result = await getPaymentOrder(orderId, token);
  if (result.kind === "not_found") notFound();

  return (
    <div
      className="min-h-screen bg-[#f9f9fb] flex items-center justify-center px-[6vw] py-10"
      style={{ fontFamily: "var(--primaryFont, sans-serif)" }}
    >
      <div className="max-w-[440px] w-full">
        {result.kind === "ok" ? (
          <PaymentClient order={result.order} token={token} />
        ) : (
          <PaymentStatusCard
            variant="error"
            title={result.kind === "expired" ? "Link Expired" : "Invalid Link"}
            message={
              result.kind === "expired"
                ? "This payment link has expired. Please request a new one."
                : "This payment link is invalid. Please check the link and try again."
            }
          />
        )}
      </div>
    </div>
  );
}
