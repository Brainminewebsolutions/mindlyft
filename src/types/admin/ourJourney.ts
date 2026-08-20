export type OurJourneyMedia = {
  id:           string;
  ourJourneyId: string;
  url:          string;
  type:         "Image" | "Video";
  displayOrder: number;
};

export type OurJourney = {
  id:           string;
  type:         "Event" | "OurImpact";
  name:         string;
  description?: string | null;
  date:         string; // yyyy-MM-dd
  timeSlot?:    string | null;
  address?:     string | null;
  attendees?:   string | null;
  mainImage?:   string | null;
  status:       "Active" | "Inactive" | "Pending" | "Suspended" | "Deleted" | "Upcoming";
  displayOrder: number;
  media:        OurJourneyMedia[];
};
