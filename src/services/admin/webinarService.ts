import apiAxios from "@/lib/api/api-axios";
import type { StreamDetails, Webinar } from "@/types/admin/webinar";

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

  // ── Vimeo live streaming ────────────────────────────────────────────────
  getStreamDetails: (id: string) =>
    apiAxios
      .get<StreamDetails>(`/v1/workshopWebinar/${id}/stream-details`)
      .then((r) => r.data),

  createVimeoEvent: (id: string) =>
    apiAxios
      .post(`/v1/workshopWebinar/${id}/vimeo-event`)
      .then((r) => r.data),

  setVimeoEvent: (id: string, eventLink: string | null) =>
    apiAxios
      .put(`/v1/workshopWebinar/${id}/vimeo-event`, { eventLink })
      .then((r) => r.data),

  syncRecording: (id: string) =>
    apiAxios
      .post<string | null>(`/v1/workshopWebinar/${id}/recording/sync`)
      .then((r) => r.data),

  setRecording: (id: string, videoId: string | null) =>
    apiAxios
      .put(`/v1/workshopWebinar/${id}/recording`, { videoId })
      .then((r) => r.data),
};
