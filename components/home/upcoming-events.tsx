import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { SectionHeading } from "@/components/section-heading";
import { EventsSkeleton } from "@/components/home/events-skeleton";
import { getUpcomingEvents } from "@/lib/api";
import type { CommunityEvent } from "@/lib/types";

async function EventsGrid() {
  // Only the fetch goes inside try/catch
  let events: CommunityEvent[] | null = null;
  try {
    events = await getUpcomingEvents(6);
  } catch {
    events = null;
  }

  // Server unreachable
  if (events === null) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-10 text-center">
        <p className="font-medium">We could not load events right now.</p>
        <p className="mt-1 text-sm text-muted-foreground">Please refresh the page in a moment.</p>
      </div>
    );
  }

  // Server fine, but nothing to show
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">No upcoming events yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Be the first to create one and bring your community together.
        </p>
        <Button asChild className="mt-4">
          <Link href="/create-event">Create an Event</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export function UpcomingEventsSection() {
  return (
    <section className="bg-muted/40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Coming up"
          title="Upcoming community events"
          description="Fresh events from people in your area. Find one that fits your schedule and show up."
        />

        <Suspense fallback={<EventsSkeleton />}>
          <EventsGrid />
        </Suspense>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}