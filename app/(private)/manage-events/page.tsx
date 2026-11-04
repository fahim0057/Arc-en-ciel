import type { Metadata } from "next";
import { ManageEvents } from "@/components/events/manage-events";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Manage Events" };

export default function ManageEventsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <SectionHeading
        eyebrow="Your events"
        title="Manage events"
        description="Update the details of events you created, or remove the ones you no longer need."
      />
      <ManageEvents />
    </section>
  );
}