import apiAxios from "@/lib/api/api-axios";
import type { Tool } from "@/types/admin/tool";

export const toolService = {
  list: (status?: string) =>
    apiAxios
      .get<Tool[]>("/v1/tools", { params: status ? { status } : undefined })
      .then((r) => r.data),

  getById: (id: string) =>
    apiAxios
      .get<Tool>(`/v1/tools/${id}`)
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios
      .post<Tool>("/v1/tools", formData)
      .then((r) => r.data),

  update: (id: string, formData: FormData) =>
    apiAxios
      .patch<Tool>(`/v1/tools/${id}`, formData)
      .then((r) => r.data),

  delete: (id: string) =>
    apiAxios
      .delete(`/v1/tools/${id}`)
      .then((r) => r.data),
};
