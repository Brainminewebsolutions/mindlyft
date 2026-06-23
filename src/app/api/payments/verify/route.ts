import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { unwrapDotnet, ApiError } from "@/lib/api/dotnet-client";

export async function POST(req: NextRequest) {
  try {
    const { token } = await requireSession();
    const body      = await req.json();

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
      token,
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthenticated")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err instanceof ApiError)
      return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[payments/verify POST]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
