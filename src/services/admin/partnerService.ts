import apiAxios from "@/lib/api/api-axios";
import type { Partner } from "@/types/admin/partner";

export const partnerService = {
  list: (status?: string) =>
    apiAxios
      .get<Partner[]>("/v1/partners", { params: status ? { status } : undefined })
      .then((r) => r.data),

  getById: (id: number) =>
    apiAxios
      .get<Partner>(`/v1/partners/${id}`)
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios
      .post<Partner>("/v1/partners", formData)
      .then((r) => r.data),

  update: (id: number, formData: FormData) =>
    apiAxios
      .patch<Partner>(`/v1/partners/${id}`, formData)
      .then((r) => r.data),

  delete: (id: number) =>
    apiAxios
      .delete(`/v1/partners/${id}`)
      .then((r) => r.data),
};
