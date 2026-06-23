import { NextRequest, NextResponse } from "next/server";
import { loginWithDotnet, ApiError } from "@/lib/services/authService";
import { AUTH_COOKIE, ACCESS_TOKEN_COOKIE } from "@/lib/auth/types";

const SEVEN_DAYS = 60 * 60 * 24 * 7;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const { token, user } = await loginWithDotnet(body.email, body.password);

    const res = NextResponse.json({ role: user.role });

    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly:  true,
      secure:    process.env.NODE_ENV === "production",
      sameSite:  "lax",
      path:      "/",
      maxAge:    SEVEN_DAYS,
    });

    // Readable by client-side JS so student-axios can call DOTNET directly
    res.cookies.set(ACCESS_TOKEN_COOKIE, token, {
      httpOnly:  false,
      secure:    process.env.NODE_ENV === "production",
      sameSite:  "strict",
      path:      "/",
      maxAge:    SEVEN_DAYS,
    });

    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[auth/login]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
