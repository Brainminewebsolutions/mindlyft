import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { unwrapDotnet, ApiError } from "@/lib/api/dotnet-client";

interface CreateOrderResponse {
  razorpayOrderId: string;
  amountInPaise:   number;
  currency:        string;
  productName:     string;
  keyId:           string;
}

export async function POST(req: NextRequest) {
  try {
    const { token } = await requireSession();
    const body      = await req.json();

    const data = await unwrapDotnet<CreateOrderResponse>(
      "/v1/payments/create-order",
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          productId:   body.productId,
          productType: body.productType,
        }),
      },
      token,
    );

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthenticated")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err instanceof ApiError)
      return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[payments/create-order POST]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
