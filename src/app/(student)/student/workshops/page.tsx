"use client";

import { Wrench } from "lucide-react";
import { RegisteredEventsView } from "@/components/student/workshops/RegisteredEventsView";

export default function StudentWorkshopsPage() {
  return <RegisteredEventsView type="Workshop" title="My Workshops" icon={Wrench} />;
}
