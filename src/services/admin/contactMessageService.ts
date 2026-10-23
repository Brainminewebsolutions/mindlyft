import apiAxios from "@/lib/api/api-axios";

export type ContactStatus = "New" | "Read" | "Replied";

export type ContactMessage = {
  id:        number;
  name:      string;
  email:     string;
  phone:     string | null;
  subject:   string | null;
  message:   string;
  status:    ContactStatus;
  createdAt: string; // ISO-8601 with +05:30
  repliedAt: string | null;
};

export const contactMessageService = {
  list: (params?: { status?: string; search?: string }) =>
    apiAxios
      .get<ContactMessage[]>("/v1/contact", { params })
      .then((r) => r.data),

  /** Also marks a New message as Read. */
  open: (id: number | string) =>
    apiAxios
      .get<ContactMessage>(`/v1/contact/${id}`)
      .then((r) => r.data),

  setStatus: (id: number | string, status: ContactStatus) =>
    apiAxios
      .patch(`/v1/contact/${id}/status`, { status })
      .then((r) => r.data),

  delete: (id: number | string) =>
    apiAxios
      .delete(`/v1/contact/${id}`)
      .then((r) => r.data),
};
