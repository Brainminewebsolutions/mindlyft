import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { unwrapDotnet, ApiError } from "@/lib/api/dotnet-client";

// The backend's verify endpoint is [AllowAnonymous] (payments made via the
// anonymous /payment/{orderId} link have no session), so a session here is
// used to attribute the request when present, but is never required.
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body    = await req.json();

    await unwrapDotnet<void>(
      "/v1/payments/verify",
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          razorpayOrderId:   body.razorpayOrderId,
          razorpayPaymentId: body.razorpayPaymentId,
          razorpaySignature: body.razorpaySignature,
        }),
      },
      session?.token,
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof ApiError)
      return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[payments/verify POST]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
