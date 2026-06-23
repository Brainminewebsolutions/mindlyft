import apiAxios from "@/lib/api/api-axios";

export type RegisteredWorkshop = {
  orderId:          string;
  workshopId:       number;
  name:             string;
  image:            string | null;
  mode:             string;
  duration:         number;
  instructor:       string;
  language:         string;
  subscriptionType: string;
  type:             string;
  category:         string | null;
  date:             string;
  time:             string;
  link:             string | null;
  address:          string | null;
  amount:           number;
  registeredAt:     string;
};

export const studentWorkshopService = {
  getMyWorkshops: (type?: string) =>
    apiAxios
      .get<RegisteredWorkshop[]>("/v1/workshopWebinar/my-workshops", {
        params: type ? { type } : undefined,
      })
      .then((r) => r.data),
};
