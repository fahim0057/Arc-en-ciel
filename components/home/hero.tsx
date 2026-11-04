import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-background to-amber-50 dark:from-emerald-950/40 dark:via-background dark:to-amber-950/20">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
        {/* Left: message + buttons */}
        <div className="space-y-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Community-driven · Free to join
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Small acts of kindness,{" "}
            <span className="text-primary">big change</span> in your area.
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Discover local social service events, from winter clothes drives to neighbourhood
            cleanups. Create your own, invite others, and keep track of every event you join.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/create-event">Create an Event</Link>
            </Button>
          </div>
        </div>

        {/* Right: decorative sample cards (desktop only) */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div className="absolute -left-8 top-24 w-72 rotate-[-4deg] rounded-2xl border bg-card p-5 shadow-lg">
            <Badge variant="secondary">Donation</Badge>
            <p className="mt-3 font-semibold">Blanket Distribution for the Needy</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Mohammadpur, Dhaka
            </p>
          </div>

          <div className="relative ml-auto w-80 rotate-[3deg] rounded-2xl border bg-card p-6 shadow-xl">
            <Badge>Donation</Badge>
            <p className="mt-3 text-lg font-semibold">Winter Clothes Distribution</p>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Mirpur 10, Dhaka
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> Saturday morning
              </p>
            </div>
            <div className="mt-5 rounded-md bg-primary py-2 text-center text-sm font-medium text-primary-foreground">
              Join Event
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}