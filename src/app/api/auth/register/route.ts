import { NextRequest, NextResponse } from "next/server";
import { registerWithDotnet, ApiError } from "@/lib/services/authService";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.password) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  try {
    await registerWithDotnet({
      name:           body.name,
      email:          body.email,
      password:       body.password,
      phone:          body.phone,
      courseInterest: body.courseInterest,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[auth/register]", err);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 },
    );
  }
}
