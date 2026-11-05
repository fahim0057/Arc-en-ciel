import type { Metadata } from "next";
import { ProfileView } from "@/components/profile/profile-view";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-12 md:py-16">
      <SectionHeading
        eyebrow="Account"
        title="My profile"
        description="Update how you appear to the rest of the community."
      />
      <ProfileView />
    </section>
  );
}