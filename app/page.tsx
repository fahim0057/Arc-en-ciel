import { Features } from "@/components/home/features";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { UpcomingEventsSection } from "@/components/home/upcoming-events";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <UpcomingEventsSection />
      <Gallery />
      <Newsletter />
    </>
  );
}