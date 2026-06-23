export type TestimonialType   = "video" | "text";
export type TestimonialStatus = "ACTIVE" | "INACTIVE";

export type Testimonial = {
  id:           number;
  type:         TestimonialType;
  name:         string;
  designation?: string;
  avatar?:      string;
  video?:       string;
  quote?:       string;
  review?:      string;
  rating:       number;
  tag?:         string;
  accent?:      string;
  status:       TestimonialStatus;
  order:        number;
  createdAt:    string;
  updatedAt:    string;
};
