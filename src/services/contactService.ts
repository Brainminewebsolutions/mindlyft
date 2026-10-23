import apiAxios from "@/lib/api/api-axios";

export type ContactSubmission = {
  name:    string;
  email:   string;
  phone:   string;
  subject: string;
  message: string;
  website: string; // honeypot
};

export const contactService = {
  submit: (data: ContactSubmission) =>
    apiAxios.post("/v1/contact", data).then((r) => r.data),
};
