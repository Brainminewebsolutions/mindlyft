import apiAxios from "@/lib/api/api-axios";

export type UploadResponse = { url: string };

export const uploadService = {
  upload: (file: File, type: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);
    return apiAxios
      .post<UploadResponse>("/v1/admin/upload", fd)
      .then((r) => r.data.url);
  },
};
