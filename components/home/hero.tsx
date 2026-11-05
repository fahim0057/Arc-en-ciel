import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, HeartHandshake, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickTypes = ["Cleanup", "Plantation", "Donation", "Food Distribution"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-background to-amber-50 dark:from-emerald-950/30 dark:via-background dark:to-amber-950/10">
      {/* Soft dot grid, fading out towards the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      {/* Colour glows */}
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
      {/* Fades the bottom edge into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:py-20 lg:grid-cols-2 lg:py-28">
        {/* Left: message */}
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-7 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Community-driven · Free to join
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Small acts of kindness,{" "}
            <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
              big change
            </span>{" "}
            in your area.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Discover local social service events, from winter clothes drives to neighbourhood
            cleanups. Create your own, invite others, and keep track of every event you join.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 shadow-lg shadow-primary/25">
              <Link href="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 bg-background/60 px-6 backdrop-blur">
              <Link href="/create-event">Create an Event</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {quickTypes.map((type) => (
              <Link
                key={type}
                href={`/events?type=${encodeURIComponent(type)}`}
                className="rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: layered sample cards (desktop only) */}
        <div
          aria-hidden
          className="animate-in fade-in slide-in-from-bottom-6 relative mx-auto hidden h-[440px] w-full max-w-lg duration-1000 lg:block"
        >
          {/* Back card */}
          <div className="absolute left-2 top-0 w-60 -rotate-6 rounded-2xl border bg-card/90 p-4 shadow-lg backdrop-blur">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Plantation
            </span>
            <p className="mt-2 font-semibold">Tree Plantation Drive</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Hatirjheel, Dhaka
            </p>
          </div>

          {/* Front card */}
          <div className="absolute right-0 top-28 w-80 rotate-3 rounded-2xl border bg-card p-4 shadow-2xl shadow-primary/10 transition-transform duration-500 hover:rotate-0">
            <div className="flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 via-primary/10 to-amber-400/30 text-primary">
              <HeartHandshake className="h-10 w-10" />
            </div>
            <span className="mt-4 inline-block rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              Donation
            </span>
            <p className="mt-2 text-lg font-semibold">Winter Clothes Distribution</p>
            <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Mirpur 10, Dhaka
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> Saturday morning
              </p>
            </div>
            <div className="mt-4 rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground">
              Join Event
            </div>
          </div>

          {/* Floating confirmation chip */}
          <div className="absolute bottom-4 left-0 flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            You joined this event
          </div>
        </div>
      </div>
    </section>
  );
}