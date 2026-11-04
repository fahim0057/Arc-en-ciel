import Link from "next/link";
import { HeartHandshake, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/social-icons";
import { SITE } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/login", label: "Login" },
];

const categories = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Health Camp",
  "Education",
];

const socials = [
  { label: "X", href: "https://x.com", Icon: XIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-primary/5 dark:bg-card">
      {/* Thin colored line along the top */}
      <div className="h-1 bg-gradient-to-r from-primary via-emerald-400 to-amber-400" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand + social */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartHandshake className="h-5 w-5" />
            </span>
            {SITE.name}
          </Link>
          <p className="text-sm text-muted-foreground">{SITE.description}</p>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Event types */}
        <div>
          <h3 className="mb-4 font-semibold">Event Types</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href={`/events?type=${encodeURIComponent(c)}`}
                  className="transition-colors hover:text-primary"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              {SITE.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {SITE.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {SITE.address}
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-muted-foreground">
          © {SITE.year} {SITE.name}. Built for communities, by volunteers.
        </p>
      </div>
    </footer>
  );
}