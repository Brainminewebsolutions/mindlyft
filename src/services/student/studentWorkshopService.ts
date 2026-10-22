import apiAxios from "@/lib/api/api-axios";

export type LiveState = "Upcoming" | "Live" | "Ended";

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
  state:            LiveState;
  startsAt:         string; // ISO-8601 with +05:30
  hasLiveEvent:     boolean;
  hasRecording:     boolean;
};

export type LiveAccess = {
  workshopId:          number;
  name:                string;
  slug:                string;
  type:                string;
  instructor:          string;
  state:               LiveState;
  startsAt:            string;
  endsAt:              string;
  isInstructor:        boolean;
  playerEmbedUrl:      string | null;
  chatEmbedUrl:        string | null;
  recordingEmbedUrl:   string | null;
  recordingProcessing: boolean;
  externalLink:        string | null;
};

export const studentWorkshopService = {
  getMyWorkshops: (type?: string) =>
    apiAxios
      .get<RegisteredWorkshop[]>("/v1/workshopWebinar/my-workshops", {
        params: type ? { type } : undefined,
      })
      .then((r) => r.data),

  getLiveAccess: (id: number | string) =>
    apiAxios
      .get<LiveAccess>(`/v1/workshopWebinar/${id}/live-access`)
      .then((r) => r.data),
};
