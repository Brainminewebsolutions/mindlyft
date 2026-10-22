export type Webinar = {
  id:               string;
  name:             string;
  slug:             string;
  duration:         number;
  mode:             "Online" | "Offline";
  image?:           string | null;
  description?:     string | null;
  price:            number;
  instructor:       string;
  language:         string;
  highlightsJson?:  string | null;
  subscriptionType: "Free" | "Paid";
  status:           "Active" | "Inactive" | "Pending" | "Suspended" | "Upcoming";
  discount?:        number | null;
  discountAmount:   number;
  discountPrice:    number;
  gstPer:           number;
  gstAmount:        number;
  finalPrice:       number;
  type:             "Workshop" | "Webinar";
  category?:        string | null;
  date:             string; // "YYYY-MM-DD"
  time:             string; // "HH:mm"
  link?:            string | null;
  address?:         string | null;
  instructorId?:    number | null;
  hasLiveEvent:     boolean;
  hasRecording:     boolean;
};

export type StreamDetails = {
  workshopId:        number;
  name:              string;
  state:             LiveState;
  vimeoLiveEventId:  string | null;
  rtmpLink:          string | null;
  rtmpsLink:         string | null;
  streamKey:         string | null;
  eventLink:         string | null;
  playerEmbedUrl:    string | null;
  chatEmbedUrl:      string | null;
  recordingVideoId:  string | null;
  recordingEmbedUrl: string | null;
  error:             string | null;
  /** false on Vimeo Advanced: no stream key or automatic recording via the API */
  liveApiEnabled:    boolean;
};

export type LiveState = "Upcoming" | "Live" | "Ended";
