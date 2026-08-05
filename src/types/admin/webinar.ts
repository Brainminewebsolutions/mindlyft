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
  type:             "Workshop" | "Webinar";
  category?:        string | null;
  date:             string; // "YYYY-MM-DD"
  time:             string; // "HH:mm"
  link?:            string | null;
  address?:         string | null;
};
