import { CalendarPlus, ListChecks, MapPin, MousePointerClick } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const features = [
  {
    icon: CalendarPlus,
    title: "Create in minutes",
    text: "Post a clothes drive, cleanup or plantation with a title, place, date and photo. Others can find it right away.",
  },
  {
    icon: MousePointerClick,
    title: "Join with one click",
    text: "Found something you care about? Hit Join Event and you are in. No forms, no waiting.",
  },
  {
    icon: MapPin,
    title: "Hyper-local by design",
    text: "Every event lists its exact neighbourhood, so you can help the people living right next to you.",
  },
  {
    icon: ListChecks,
    title: "Track your impact",
    text: "Your joined events live in one place, sorted by date. Manage the events you created just as easily.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <SectionHeading
        eyebrow="Why join"
        title="Everything you need to make a difference"
        description="A simple platform that turns good intentions into organised action."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}