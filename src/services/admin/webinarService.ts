import apiAxios from "@/lib/api/api-axios";
import type { Webinar } from "@/types/admin/webinar";

export type WebinarListParams = {
  type?:   string;
  status?: string;
};

export const webinarService = {
  list: (params?: WebinarListParams) =>
    apiAxios
      .get<Webinar[]>("/v1/workshopWebinar", { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiAxios
      .get<Webinar>(`/v1/workshopWebinar/${id}`)
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios
      .post<Webinar>("/v1/workshopWebinar", formData)
      .then((r) => r.data),

  update: (id: string, formData: FormData) =>
    apiAxios
      .patch<Webinar>(`/v1/workshopWebinar/${id}`, formData)
      .then((r) => r.data),

  delete: (id: string) =>
    apiAxios
      .delete(`/v1/workshopWebinar/${id}`)
      .then((r) => r.data),
};
