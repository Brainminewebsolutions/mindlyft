import { NextRequest, NextResponse } from "next/server";
import { insecureDispatcher } from "@/lib/api/dotnet-client";

// Same-origin passthrough so browser code never has to call the .NET API
// directly (avoids mixed-content blocking when the API is plain http but
// the site is https, and lets the dev self-signed cert bypass apply here too).
const BACKEND = process.env.DOTNET_API_URL ?? "";

async function proxy(req: NextRequest, path: string[]) {
  const url = `${BACKEND}/${path.join("/")}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const hasBody = req.method !== "GET" && req.method !== "HEAD";

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body: hasBody ? req.body : undefined,
      duplex: hasBody ? "half" : undefined,
      redirect: "manual",
      ...(insecureDispatcher ? { dispatcher: insecureDispatcher } : {}),
    } as RequestInit);

    return new NextResponse(res.body, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/octet-stream",
      },
    });
  } catch {
    return NextResponse.json(
      { isSuccess: false, message: "Service unavailable" },
      { status: 503 },
    );
  }
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  return proxy(req, (await params).path);
}
export async function POST(req: NextRequest, { params }: Ctx) {
  return proxy(req, (await params).path);
}
export async function PUT(req: NextRequest, { params }: Ctx) {
  return proxy(req, (await params).path);
}
export async function PATCH(req: NextRequest, { params }: Ctx) {
  return proxy(req, (await params).path);
}
export async function DELETE(req: NextRequest, { params }: Ctx) {
  return proxy(req, (await params).path);
}
