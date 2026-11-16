import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { unwrapDotnet, ApiError } from "@/lib/api/dotnet-client";

// Has the signed-in student already purchased / registered for this product?
export async function GET(req: NextRequest) {
  try {
    const { token } = await requireSession();
    const { searchParams } = new URL(req.url);
    const productId   = searchParams.get("productId")   ?? "";
    const productType = searchParams.get("productType") ?? "";

    const owned = await unwrapDotnet<boolean>(
      `/v1/payments/owned?productId=${encodeURIComponent(productId)}&productType=${encodeURIComponent(productType)}`,
      { method: "GET" },
      token,
    );

    return NextResponse.json({ owned });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthenticated")
      return NextResponse.json({ owned: false }, { status: 200 });
    if (err instanceof ApiError)
      return NextResponse.json({ owned: false }, { status: 200 });
    console.error("[payments/owned GET]", err);
    return NextResponse.json({ owned: false }, { status: 200 });
  }
}
