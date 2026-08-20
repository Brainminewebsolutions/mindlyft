import apiAxios from "@/lib/api/api-axios";
import type { OurJourney, OurJourneyMedia } from "@/types/admin/ourJourney";

export const ourJourneyService = {
  list: (type?: string, status?: string) =>
    apiAxios
      .get<OurJourney[]>("/v1/our-journey", { params: { type, status } })
      .then((r) => r.data),

  getById: (id: string | number) =>
    apiAxios
      .get<OurJourney>(`/v1/our-journey/${id}`)
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios
      .post<OurJourney>("/v1/our-journey", formData)
      .then((r) => r.data),

  update: (id: string | number, formData: FormData) =>
    apiAxios
      .patch<OurJourney>(`/v1/our-journey/${id}`, formData)
      .then((r) => r.data),

  delete: (id: string | number) =>
    apiAxios
      .delete(`/v1/our-journey/${id}`)
      .then((r) => r.data),

  addMedia: (ourJourneyId: string | number, formData: FormData) =>
    apiAxios
      .post<OurJourneyMedia>(`/v1/our-journey/${ourJourneyId}/media`, formData)
      .then((r) => r.data),

  deleteMedia: (ourJourneyId: string | number, id: string | number) =>
    apiAxios
      .delete(`/v1/our-journey/${ourJourneyId}/media/${id}`)
      .then((r) => r.data),
};
