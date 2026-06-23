import axios, { type AxiosError } from "axios";

const authAxios = axios.create({
  baseURL: "/api/auth",
});

authAxios.interceptors.response.use(
  (response) => response,
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

export default authAxios;
