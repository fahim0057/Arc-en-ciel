"use client";

import { useState, type SyntheticEvent } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault(); // stop the browser from reloading the page

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Thanks for subscribing! We will keep you posted.");
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-16">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-xl">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Mail className="h-6 w-6" />
          </span>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Never miss a good deed
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Get new community events in your inbox every week. No spam, only ways to help.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="h-11 bg-background text-foreground"
            />
            <Button type="submit" size="lg" variant="secondary" className="h-11">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}