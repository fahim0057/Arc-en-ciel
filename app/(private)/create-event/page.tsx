import type { Metadata } from "next";
import { CreateEventForm } from "@/components/events/create-event-form";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 md:py-16">
      <SectionHeading
        eyebrow="Organize"
        title="Create an event"
        description="Tell your community what is happening and when. Anyone logged in can join."
      />
      <Card>
        <CardContent>
          <CreateEventForm />
        </CardContent>
      </Card>
    </section>
  );
}
