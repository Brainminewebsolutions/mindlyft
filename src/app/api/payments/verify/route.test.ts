import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { getSession, unwrapDotnet } = vi.hoisted(() => ({
  getSession:   vi.fn(),
  unwrapDotnet: vi.fn(),
}));

vi.mock("@/lib/auth/session", () => ({ getSession }));
vi.mock("@/lib/api/dotnet-client", () => {
  class ApiError extends Error {
    constructor(public readonly status: number, message: string) {
      super(message);
    }
  }
  return { ApiError, unwrapDotnet };
});

import { ApiError } from "@/lib/api/dotnet-client";
import { POST } from "./route";

const PAYMENT = {
  razorpayOrderId:   "order_1",
  razorpayPaymentId: "pay_1",
  razorpaySignature: "sig_1",
};

function verifyRequest(body: unknown) {
  return new NextRequest("https://example.test/api/payments/verify", {
    method: "POST",
    body:   JSON.stringify(body),
  });
}

beforeEach(() => {
  getSession.mockReset();
  unwrapDotnet.mockReset();
});

describe("POST /api/payments/verify", () => {
  it("forwards only the three Razorpay fields to the backend", async () => {
    getSession.mockResolvedValue(null);
    unwrapDotnet.mockResolvedValue(undefined);

    const res = await POST(verifyRequest({ ...PAYMENT, amount: 1, isPaid: true }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });

    const [path, options] = unwrapDotnet.mock.calls[0];
    expect(path).toBe("/v1/payments/verify");
    expect(JSON.parse(options.body)).toEqual(PAYMENT);
  });

  it("works without a session, for the anonymous payment link", async () => {
    getSession.mockResolvedValue(null);
    unwrapDotnet.mockResolvedValue(undefined);

    await POST(verifyRequest(PAYMENT));

    expect(unwrapDotnet.mock.calls[0][2]).toBeUndefined();
  });

  it("passes the user's token when they are signed in", async () => {
    getSession.mockResolvedValue({ token: "student-token" });
    unwrapDotnet.mockResolvedValue(undefined);

    await POST(verifyRequest(PAYMENT));

    expect(unwrapDotnet.mock.calls[0][2]).toBe("student-token");
  });

  it("returns the backend's status and message when verification fails", async () => {
    getSession.mockResolvedValue(null);
    unwrapDotnet.mockRejectedValue(new ApiError(400, "Signature mismatch"));

    const res = await POST(verifyRequest(PAYMENT));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Signature mismatch" });
  });

  it("returns a generic 500 for unexpected errors, without leaking details", async () => {
    getSession.mockResolvedValue(null);
    unwrapDotnet.mockRejectedValue(new Error("internal detail that must not reach the client"));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(verifyRequest(PAYMENT));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Something went wrong" });
    consoleError.mockRestore();
  });
});
