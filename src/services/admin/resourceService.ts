import apiAxios from "@/lib/api/api-axios";
import type { Resource } from "@/types/admin/resource";

export const resourceService = {
  list: (status?: string) =>
    apiAxios
      .get<Resource[]>("/v1/resources", { params: status ? { status } : undefined })
      .then((r) => r.data),

  getById: (id: number) =>
    apiAxios
      .get<Resource>(`/v1/resources/${id}`)
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios
      .post<Resource>("/v1/resources", formData)
      .then((r) => r.data),

  update: (id: number, formData: FormData) =>
    apiAxios
      .patch<Resource>(`/v1/resources/${id}`, formData)
      .then((r) => r.data),

  delete: (id: number) =>
    apiAxios
      .delete(`/v1/resources/${id}`)
      .then((r) => r.data),
};
