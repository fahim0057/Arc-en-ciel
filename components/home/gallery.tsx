import { SectionHeading } from "@/components/section-heading";

// PLACEHOLDERS: swap each src for your own photo, e.g. "/gallery/clothes-drive.jpg"
const photos = [
  { src: "/gallery/Winter_Clothes_Distribution_in_Bangladesh.jpg", caption: "Winter clothes distribution" },
  { src: "/gallery/Lakeside cleanup.jpg", caption: "Lakeside cleanup drive" },
  { src: "/gallery/Tree plantation.jpg", caption: "Tree plantation day" },
  { src: "/gallery/Free health checkup.jpg", caption: "Free health checkup camp" },
  { src: "/gallery/Meal packs.jpeg", caption: "Meal packs for families" },
  { src: "/gallery/book-distribution.jpg", caption: "Books for young learners" },
  { src: "/gallery/Blanket distribution.jpg", caption: "Blanket distribution night" },
  { src: "/gallery/Neighbourhood volunteers.jpeg", caption: "Neighbourhood volunteers" },
];

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <SectionHeading
        eyebrow="Gallery"
        title="Moments from our community"
        description="Real people, real neighbourhoods, real impact."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {photos.map((p) => (
          <figure key={p.caption} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}