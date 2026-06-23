import apiAxios from "@/lib/api/api-axios";
import type { Testimonial } from "@/types/admin/testimonial";

export type TestimonialListParams = {
  status?: string;
  page?:   number;
  limit?:  number;
};

export type TestimonialListResponse = {
  testimonials: Testimonial[];
  pagination:   { total: number; page: number; limit: number; totalPages: number };
};

export const testimonialService = {
  list: (params?: TestimonialListParams) =>
    apiAxios
      .get<TestimonialListResponse>("/v1/testimonials", { params })
      .then((r) => r.data),

  getById: (id: number) =>
    apiAxios
      .get<Testimonial>(`/v1/testimonials/${id}`)
      .then((r) => r.data),

  create: (data: FormData) =>
    apiAxios
      .post<Testimonial>("/v1/testimonials", data)
      .then((r) => r.data),

  update: (id: number, data: FormData) =>
    apiAxios
      .patch<Testimonial>(`/v1/testimonials/${id}`, data)
      .then((r) => r.data),

  delete: (id: number) =>
    apiAxios
      .delete(`/v1/testimonials/${id}`)
      .then((r) => r.data),
};
