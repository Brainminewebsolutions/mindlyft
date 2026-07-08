import { NextRequest, NextResponse } from "next/server";
import { insecureDispatcher } from "@/lib/api/dotnet-client";

// Strip trailing /api so static files at /uploads/... are reachable
const BACKEND = (process.env.DOTNET_API_URL ?? "").replace(/\/api\/?$/, "");

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${BACKEND}/uploads/${path.join("/")}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      ...(insecureDispatcher ? { dispatcher: insecureDispatcher } : {}),
    } as RequestInit);
    if (!res.ok) return new NextResponse(null, { status: 404 });

    return new NextResponse(res.body, {
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/octet-stream",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
