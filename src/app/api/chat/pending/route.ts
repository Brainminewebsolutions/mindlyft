import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { unwrapDotnet, ApiError } from "@/lib/api/dotnet-client";

export async function GET(_req: NextRequest) {
  try {
    const { token } = await requireSession();
    const data = await unwrapDotnet("/v1/chat/pending", { method: "GET" }, token);
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthenticated")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err instanceof ApiError)
      return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[chat/pending GET]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
