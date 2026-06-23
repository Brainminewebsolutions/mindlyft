const BASE_URL = process.env.DOTNET_API_URL;

if (!BASE_URL && process.env.NODE_ENV !== "test") {
  console.warn("[dotnet-client] DOTNET_API_URL is not set");
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function dotnetFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  // Don't set Content-Type for FormData — the runtime adds the multipart boundary
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, { ...options, headers, signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message: string =
        body?.message ?? body?.error ?? body?.title ?? res.statusText;
      throw new ApiError(res.status, message);
    }

    // 204 No Content — return empty object
    if (res.status === 204) return {} as T;

    return res.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);

    // Re-throw ApiError as-is
    if (err instanceof ApiError) throw err;

    // Abort / timeout
    if (err instanceof Error && (err.name === "AbortError" || (err as NodeJS.ErrnoException).code === "ETIMEDOUT")) {
      throw new ApiError(504, "Request timeout");
    }

    // Network unreachable / connection refused
    if (err instanceof Error && (err as NodeJS.ErrnoException).code != null) {
      throw new ApiError(503, "Service unavailable");
    }

    throw err;
  }
}

// Unwraps the standard { isSuccess, message, data } envelope the .NET API uses.
export async function unwrapDotnet<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const envelope = await dotnetFetch<{
    isSuccess: boolean;
    message: string;
    data: T;
    errors?: string[];
  }>(path, options, token);

  if (!envelope.isSuccess) {
    throw new ApiError(400, envelope.message);
  }
  return envelope.data;
}
