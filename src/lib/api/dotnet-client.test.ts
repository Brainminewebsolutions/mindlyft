import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const BASE = "https://api.example.test";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// BASE_URL is read when the module loads, so set the env var first and import fresh.
async function loadClient() {
  vi.resetModules();
  vi.stubEnv("DOTNET_API_URL", BASE);
  return import("./dotnet-client");
}

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("dotnetFetch", () => {
  it("calls the backend URL and returns the parsed JSON", async () => {
    const { dotnetFetch } = await loadClient();
    fetchMock.mockResolvedValue(jsonResponse({ id: 1 }));

    await expect(dotnetFetch("/v1/courses")).resolves.toEqual({ id: 1 });
    expect(fetchMock.mock.calls[0][0]).toBe(`${BASE}/v1/courses`);
  });

  it("sends the bearer token when one is given", async () => {
    const { dotnetFetch } = await loadClient();
    fetchMock.mockResolvedValue(jsonResponse({}));

    await dotnetFetch("/v1/orders", {}, "abc123");

    const headers = fetchMock.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer abc123");
  });

  it("does not set a JSON content type for form uploads", async () => {
    const { dotnetFetch } = await loadClient();
    fetchMock.mockResolvedValue(jsonResponse({}));

    await dotnetFetch("/v1/uploads", { method: "POST", body: new FormData() });

    const headers = fetchMock.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers["Content-Type"]).toBeUndefined();
  });

  it("returns an empty object for 204 No Content", async () => {
    const { dotnetFetch } = await loadClient();
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));

    await expect(dotnetFetch("/v1/courses/1", { method: "DELETE" })).resolves.toEqual({});
  });

  it("throws an ApiError with the backend's status and message", async () => {
    const { dotnetFetch, ApiError } = await loadClient();
    fetchMock.mockResolvedValue(jsonResponse({ message: "Course not found" }, 404));

    const error = await dotnetFetch("/v1/courses/999").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 404, message: "Course not found" });
  });

  it("reports a timeout as 504", async () => {
    const { dotnetFetch } = await loadClient();
    fetchMock.mockRejectedValue(Object.assign(new Error("aborted"), { name: "AbortError" }));

    await expect(dotnetFetch("/v1/courses")).rejects.toMatchObject({ status: 504 });
  });

  it("reports an unreachable backend as 503", async () => {
    const { dotnetFetch } = await loadClient();
    fetchMock.mockRejectedValue(Object.assign(new Error("connect failed"), { code: "ECONNREFUSED" }));

    await expect(dotnetFetch("/v1/courses")).rejects.toMatchObject({ status: 503 });
  });
});

describe("unwrapDotnet", () => {
  it("returns the data inside a successful envelope", async () => {
    const { unwrapDotnet } = await loadClient();
    fetchMock.mockResolvedValue(jsonResponse({ isSuccess: true, message: "", data: { id: 7 } }));

    await expect(unwrapDotnet("/v1/courses/7")).resolves.toEqual({ id: 7 });
  });

  it("throws the envelope's message when isSuccess is false", async () => {
    const { unwrapDotnet } = await loadClient();
    fetchMock.mockResolvedValue(jsonResponse({ isSuccess: false, message: "Signature mismatch", data: null }));

    await expect(unwrapDotnet("/v1/payments/verify")).rejects.toMatchObject({
      status: 400,
      message: "Signature mismatch",
    });
  });
});
