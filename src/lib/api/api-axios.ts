import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

// Same-origin proxy (see src/app/api/backend/[...path]/route.ts) so the browser
// never calls the .NET API directly — avoids mixed-content blocking when the
// site is https but the API is still plain http.
const apiAxios = axios.create({
  baseURL: "/api/backend",
  headers: { "Content-Type": "application/json" },
});

apiAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : "";
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

apiAxios.interceptors.response.use(
  (response) => {
    const d = response.data;
    if (d && typeof d === "object" && "isSuccess" in d) {
      if (!d.isSuccess) return Promise.reject(new Error(d.message ?? "Request failed"));
      response.data = d.data;
    }
    return response;
  },
  (error: AxiosError<{ error?: string; message?: string; title?: string }>) => {
    const msg =
      error.response?.data?.error ??
      error.response?.data?.message ??
      error.response?.data?.title ??
      error.message ??
      "Something went wrong";
    return Promise.reject(new Error(msg));
  },
);

export default apiAxios;
