import type { Metadata } from "next";
import { JoinedEvents } from "@/components/events/joined-events";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Joined Events" };

export default function JoinedEventsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <SectionHeading
        eyebrow="Your activity"
        title="Events you joined"
        description="Everything you have signed up for, ordered by date."
      />
      <JoinedEvents />
    </section>
  );
}