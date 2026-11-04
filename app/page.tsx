import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { UpcomingEventsSection } from "@/components/home/upcoming-events";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <UpcomingEventsSection />
    </>
  );
}