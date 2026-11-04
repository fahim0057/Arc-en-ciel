import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EventFilters } from "@/components/events/event-filters";
import { EventCard } from "@/components/event-card";
import { EventsSkeleton } from "@/components/home/events-skeleton";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/api";
import type { CommunityEvent } from "@/lib/types";

export const metadata: Metadata = { title: "Upcoming Events" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function EventsResults({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const type = typeof sp.type === "string" ? sp.type : undefined;
  const search = typeof sp.search === "string" ? sp.search : undefined;

  // Only the fetch goes inside try/catch
  let events: CommunityEvent[] | null = null;
  try {
    events = await getUpcomingEvents({ type, search });
  } catch (err) {
    console.error("Events fetch failed:", err);
    events = null;
  }

  if (events === null) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-10 text-center">
        <p className="font-medium">We could not load events right now.</p>
        <p className="mt-1 text-sm text-muted-foreground">Please refresh the page in a moment.</p>
      </div>
    );
  }

  const isFiltered = Boolean((type && type !== "All") || search);

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">
          {isFiltered ? "No events match your search." : "No upcoming events yet."}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isFiltered
            ? "Try a different word or event type."
            : "Be the first to create one and bring your community together."}
        </p>
        <Button asChild className="mt-4" variant={isFiltered ? "outline" : "default"}>
          <Link href={isFiltered ? "/events" : "/create-event"}>
            {isFiltered ? "Clear filters" : "Create an Event"}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {events.length} upcoming {events.length === 1 ? "event" : "events"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </>
  );
}

export default function EventsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <SectionHeading
        eyebrow="Explore"
        title="Upcoming events"
        description="Every event below is still ahead of us. Pick one, view the details and join in."
      />

      <Suspense fallback={<div className="mb-10 h-24" />}>
        <EventFilters />
      </Suspense>

      <Suspense fallback={<EventsSkeleton count={9} />}>
        <EventsResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}